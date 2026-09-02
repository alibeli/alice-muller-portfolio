import type { StyleProp, ViewStyle } from 'react-native';

import { Button } from '@/components/ui/Button';
import { OpenInNewTabIcon } from '@/components/ui/icons/OpenInNewTabIcon';
import { useTheme } from '@/components/ThemeProvider';
import { openProjectLink } from '@/lib/projectLinks';

type Props = {
  label: string;
  url: string;
  projectTitle: string;
  style?: StyleProp<ViewStyle>;
};

export function ProjectLinkChip({ label, url, projectTitle, style }: Props) {
  const { palette } = useTheme();
  const isHttpLink = url.startsWith('http');

  return (
    <Button
      variant="secondary"
      size="sm"
      label={label}
      onPress={(event) => {
        event?.stopPropagation?.();
        openProjectLink(url, projectTitle).catch(() => {});
      }}
      icon={isHttpLink ? <OpenInNewTabIcon size={12} color={palette.icon.muted} /> : undefined}
      iconPosition="right"
      style={style}
    />
  );
}
