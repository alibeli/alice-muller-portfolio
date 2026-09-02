import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useAction } from 'convex/react';

import { api } from '@/convex/_generated/api';
import { isConvexConfigured } from '@/lib/convex';
import { getStoredVisitorEmail, setStoredVisitorEmail } from '@/lib/projectAccessStorage';

type RequestAccessArgs = {
  email: string;
  projectSlug: string;
  projectTitle: string;
};

type ProjectAccessContextValue = {
  enabled: boolean;
  storedEmail: string | null;
  isSubmitting: boolean;
  error: string | null;
  requestAccess: (args: RequestAccessArgs) => Promise<void>;
  clearError: () => void;
};

const ProjectAccessContext = createContext<ProjectAccessContextValue | null>(null);

function ProjectAccessProviderInner({ children }: { children: ReactNode }) {
  const recordAccess = useAction(api.portfolioAccess.requestProjectAccess);
  const [storedEmail, setStoredEmailState] = useState<string | null>(() => getStoredVisitorEmail());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestAccess = useCallback(
    async ({ email, projectSlug, projectTitle }: RequestAccessArgs) => {
      setIsSubmitting(true);
      setError(null);
      try {
        await recordAccess({ email, projectSlug, projectTitle });
        setStoredVisitorEmail(email);
        setStoredEmailState(email.trim());
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
      enabled: true,
      storedEmail,
      isSubmitting,
      error,
      requestAccess,
      clearError: () => setError(null),
    }),
    [error, isSubmitting, requestAccess, storedEmail],
  );

  return <ProjectAccessContext.Provider value={value}>{children}</ProjectAccessContext.Provider>;
}

const disabledValue: ProjectAccessContextValue = {
  enabled: false,
  storedEmail: null,
  isSubmitting: false,
  error: null,
  requestAccess: async () => {},
  clearError: () => {},
};

export function ProjectAccessProvider({ children }: { children: ReactNode }) {
  if (!isConvexConfigured) {
    return (
      <ProjectAccessContext.Provider value={disabledValue}>{children}</ProjectAccessContext.Provider>
    );
  }

  return <ProjectAccessProviderInner>{children}</ProjectAccessProviderInner>;
}

export function useProjectAccess() {
  const context = useContext(ProjectAccessContext);
  if (!context) {
    throw new Error('useProjectAccess must be used within ProjectAccessProvider');
  }
  return context;
}
