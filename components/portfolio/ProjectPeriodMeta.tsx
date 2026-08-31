import { CurrentlyBuildingBadge } from '@/components/ui/CurrentlyBuildingBadge';
import { Text } from '@/components/ui/Text';
import { formatProjectPeriod } from '@/lib/projectLinks';
import type { Project } from '@/data/portfolio';

type Props = {
  project: Pick<Project, 'period' | 'badge'>;
};

export function ProjectPeriodMeta({ project }: Props) {
  if (project.badge === 'currently-building') {
    return <CurrentlyBuildingBadge compact />;
  }

  const period = formatProjectPeriod(project.period);
  if (!period) return null;

  return <Text variant="mono">{period}</Text>;
}
