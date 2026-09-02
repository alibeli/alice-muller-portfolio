import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useAction } from 'convex/react';

import { api } from '@/convex/_generated/api';
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

export function ProjectAccessProvider({ children }: { children: ReactNode }) {
  const recordAccess = useAction(api.portfolioAccess.requestProjectAccess);
  const [visitorEmail, setVisitorEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    clearLegacyVisitorEmail();
  }, []);

  const saveEmail = useCallback((email: string) => {
    const trimmed = email.trim();
    if (!trimmed) return;
    setVisitorEmail(trimmed);
  }, []);

  const trackView = useCallback(
    ({ email, projectSlug, projectTitle }: TrackViewArgs) => {
      const trimmed = email.trim();
      if (!trimmed) return;

      setIsSubmitting(true);
      setError(null);

      void recordAccess({ email: trimmed, projectSlug, projectTitle })
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
