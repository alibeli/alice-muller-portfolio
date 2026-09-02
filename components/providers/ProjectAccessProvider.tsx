import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useAction } from 'convex/react';

import { api } from '@/convex/_generated/api';
import { getStoredVisitorEmail, setStoredVisitorEmail } from '@/lib/projectAccessStorage';

type RecordViewArgs = {
  email: string;
  projectSlug: string;
  projectTitle: string;
};

type ProjectAccessContextValue = {
  storedEmail: string | null;
  isSubmitting: boolean;
  error: string | null;
  /** Save email locally and record the project view in Convex (fire-and-forget safe). */
  recordView: (args: RecordViewArgs) => Promise<void>;
  clearError: () => void;
};

const ProjectAccessContext = createContext<ProjectAccessContextValue | null>(null);

export function ProjectAccessProvider({ children }: { children: ReactNode }) {
  const recordAccess = useAction(api.portfolioAccess.requestProjectAccess);
  const [storedEmail, setStoredEmailState] = useState<string | null>(() => getStoredVisitorEmail());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recordView = useCallback(
    async ({ email, projectSlug, projectTitle }: RecordViewArgs) => {
      const trimmed = email.trim();
      if (!trimmed) {
        throw new Error('Enter a valid email address');
      }

      setIsSubmitting(true);
      setError(null);
      setStoredVisitorEmail(trimmed);
      setStoredEmailState(trimmed);

      try {
        await recordAccess({ email: trimmed, projectSlug, projectTitle });
      } catch (caught) {
        const message =
          caught instanceof Error ? caught.message : 'Something went wrong. Please try again.';
        setError(message);
        throw caught;
      } finally {
        setIsSubmitting(false);
      }
    },
    [recordAccess],
  );

  const value = useMemo(
    () => ({
      storedEmail,
      isSubmitting,
      error,
      recordView,
      clearError: () => setError(null),
    }),
    [error, isSubmitting, recordView, storedEmail],
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
