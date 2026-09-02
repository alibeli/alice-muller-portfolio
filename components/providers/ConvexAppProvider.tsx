import { ConvexProvider } from 'convex/react';
import type { ReactNode } from 'react';

import { ProjectAccessProvider } from '@/components/providers/ProjectAccessProvider';
import { convex } from '@/lib/convex';

type Props = {
  children: ReactNode;
};

export function ConvexAppProvider({ children }: Props) {
  return (
    <ConvexProvider client={convex}>
      <ProjectAccessProvider>{children}</ProjectAccessProvider>
    </ConvexProvider>
  );
}
