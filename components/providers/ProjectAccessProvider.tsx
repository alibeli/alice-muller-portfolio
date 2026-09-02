import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useAction } from 'convex/react';

import { api } from '@/convex/_generated/api';
import { normalizeEmail } from '@/lib/validateEmail';
import { clearLegacyVisitorEmail } from '@/lib/projectAccessStorage';

type TrackViewArgs = {
  email: string;
  projectSlug: string;
  projectTitle: string;
};

type ProjectAccessContextValue = {
  /** Email entered this browser session — cleared on refresh. */
  visitorEmail: string | null;
  isSubmitting: boolean;
  error: string | null;
  saveEmail: (email: string) => void;
  /** Record view on server — non-blocking, safe to fire-and-forget. */
  trackView: (args: TrackViewArgs) => void;
  clearError: () => void;
};

const ProjectAccessContext = createContext<ProjectAccessContextValue | null>(null);

const TRACK_DEDUPE_MS = 30_000;

export function ProjectAccessProvider({ children }: { children: ReactNode }) {
  const recordAccess = useAction(api.portfolioAccess.requestProjectAccess);
  const [visitorEmail, setVisitorEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastTrackRef = useRef<{ email: string; projectSlug: string; at: number } | null>(null);

  useEffect(() => {
    clearLegacyVisitorEmail();
  }, []);

  const saveEmail = useCallback((email: string) => {
    const normalized = normalizeEmail(email);
    if (!normalized) return;
    setVisitorEmail(normalized);
  }, []);

  const trackView = useCallback(
    ({ email, projectSlug, projectTitle }: TrackViewArgs) => {
      const normalized = normalizeEmail(email);
      if (!normalized) return;

      const now = Date.now();
      const last = lastTrackRef.current;
      if (
        last &&
        last.email === normalized &&
        last.projectSlug === projectSlug &&
        now - last.at < TRACK_DEDUPE_MS
      ) {
        return;
      }
      lastTrackRef.current = { email: normalized, projectSlug, at: now };

      setIsSubmitting(true);
      setError(null);

      void recordAccess({ email: normalized, projectSlug, projectTitle })
        .catch((caught) => {
          const message =
            caught instanceof Error ? caught.message : 'Could not save your visit. Please try again.';
          setError(message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [recordAccess],
  );

  const value = useMemo(
    () => ({
      visitorEmail,
      isSubmitting,
      error,
      saveEmail,
      trackView,
      clearError: () => setError(null),
    }),
    [error, isSubmitting, saveEmail, trackView, visitorEmail],
  );

  return <ProjectAccessContext.Provider value={value}>{children}</ProjectAccessContext.Provider>;
}

export function useProjectAccess() {
  const context = useContext(ProjectAccessContext);
  if (!context) {
    throw new Error('useProjectAccess must be used within ProjectAccessProvider');
  }
  return context;
}
