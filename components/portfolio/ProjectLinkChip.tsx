import { Button } from '@/components/ui/Button';
import { OpenInNewTabIcon } from '@/components/ui/icons/OpenInNewTabIcon';
import { useTheme } from '@/components/ThemeProvider';
import { openProjectLink } from '@/lib/projectLinks';

type Props = {
  label: string;
  url: string;
  projectTitle: string;
};

export function ProjectLinkChip({ label, url, projectTitle }: Props) {
  const { palette } = useTheme();
  const isHttpLink = url.startsWith('http');

  return (
    <Button
      variant="chip"
      label={label}
      onPress={() => openProjectLink(url, projectTitle).catch(() => {})}
      icon={isHttpLink ? <OpenInNewTabIcon size={12} color={palette.muted} /> : undefined}
    />
  );
}
