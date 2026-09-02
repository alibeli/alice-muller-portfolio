import { ConvexProvider } from 'convex/react';
import type { ReactNode } from 'react';

import { ProjectAccessProvider } from '@/components/providers/ProjectAccessProvider';
import { convex, isConvexConfigured } from '@/lib/convex';

type Props = {
  children: ReactNode;
};

export function ConvexAppProvider({ children }: Props) {
  if (!isConvexConfigured) {
    return <ProjectAccessProvider>{children}</ProjectAccessProvider>;
  }

  return (
    <ConvexProvider client={convex}>
      <ProjectAccessProvider>{children}</ProjectAccessProvider>
    </ConvexProvider>
  );
}
