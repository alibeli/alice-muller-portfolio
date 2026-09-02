import type { StackItem } from '@/data/stack';

const SIMPLE_ICON_SLUG: Partial<Record<string, string>> = {
  Typeform: 'typeform',
  Maze: 'maze',
  Dovetail: 'dovetail',
  UserTesting: 'usertesting',
  Lookback: 'lookback',
  Survicate: 'survicate',
  Figma: 'figma',
  'Adobe Suite': 'adobe',
  Cursor: 'cursor',
  'Jira & Confluence': 'jira',
  'Google Workspace': 'google',
  'Next.js': 'nextdotjs',
  'Node.js': 'nodedotjs',
  TypeScript: 'typescript',
  React: 'react',
  Python: 'python',
  JavaScript: 'javascript',
  HTML: 'html5',
  CSS: 'css3',
  Solidity: 'solidity',
  Ethereum: 'ethereum',
  EVM: 'ethereum',
  Hardhat: 'hardhat',
  Foundry: 'foundry',
  MetaMask: 'metamask',
  WalletConnect: 'walletconnect',
  ENS: 'ethereumnameservice',
  'OpenAI (GPT, Whisper)': 'openai',
  Claude: 'anthropic',
  Gemini: 'googlegemini',
  Mistral: 'mistral',
  'Hugging Face': 'huggingface',
  ElevenLabs: 'elevenlabs',
  LangChain: 'langchain',
  Stripe: 'stripe',
  Slack: 'slack',
  Shopify: 'shopify',
  'Meta APIs': 'meta',
  Veriff: 'veriff',
  Postman: 'postman',
  AWS: 'amazonaws',
  Vercel: 'vercel',
  n8n: 'n8n',
  Zapier: 'zapier',
  'Bubble.io': 'bubble',
  Supabase: 'supabase',
  Convex: 'convex',
  Airtable: 'airtable',
  Tableau: 'tableau',
  Amplitude: 'amplitude',
  Mixpanel: 'mixpanel',
  'Google Analytics (GA4)': 'googleanalytics',
  Hotjar: 'hotjar',
  FullStory: 'fullstory',
  Replicate: 'replicate',
  Canva: 'canva',
  TikTok: 'tiktok',
  LinkedIn: 'linkedin',
  Instagram: 'instagram',
  X: 'x',
  Facebook: 'facebook',
  'Twilio/Sendgrid': 'twilio',
  'Bird SMS': 'messagebird',
  Discord: 'discord',
  Hubspot: 'hubspot',
  Instantly: 'instantly',
};

function faviconUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return `https://www.google.com/s2/favicons?domain=${host}&sz=32`;
  } catch {
    return '';
  }
}

export function getStackIconUrl(item: StackItem): string {
  const slug = item.iconSlug ?? SIMPLE_ICON_SLUG[item.name];
  if (slug) {
    return `https://cdn.simpleicons.org/${slug}`;
  }
  return faviconUrl(item.url);
}
