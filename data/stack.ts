/** Tech skill groupings from Alice Müller CV (Aug 2025), page 2. */
export type StackSection = {
  title: string;
  items: string[];
};

export const stackSections: StackSection[] = [
  {
    title: 'User Feedback & Research',
    items: ['Typeform', 'Maze', 'Dovetail', 'UserTesting', 'Lookback', 'Survicate'],
  },
  {
    title: 'Design & Prototyping',
    items: ['Figma', 'Adobe Suite'],
  },
  {
    title: 'Frameworks & Product Tools',
    items: ['Agile', 'Waterfall', 'Scrum', 'Gantt', 'Jira & Confluence', 'Google Workspace'],
  },
  {
    title: 'Frontend & Backend',
    items: ['Next.js', 'Node.js', 'TypeScript', 'React', 'Python', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Web3',
    items: ['Solidity', 'Ethereum', 'EVM', 'Hardhat', 'Foundry', 'MetaMask', 'WalletConnect', 'ENS'],
  },
  {
    title: 'AI & LLMs',
    items: [
      'OpenAI (GPT, Whisper)',
      'Claude',
      'Gemini',
      'Mistral',
      'Hugging Face',
      'ElevenLabs',
      'LangChain',
    ],
  },
  {
    title: 'APIs & Webhooks',
    items: [
      'REST APIs',
      'Stripe',
      'Slack',
      'Shopify',
      'Meta APIs',
      'Veriff',
      'OAuth',
      'Postman',
    ],
  },
  {
    title: 'Cloud & Hosting',
    items: ['AWS', 'Vercel'],
  },
  {
    title: 'No-code / Automation',
    items: ['n8n', 'Zapier', 'Bubble.io', 'Base44'],
  },
  {
    title: 'Databases & Backend Services',
    items: ['Supabase', 'Convex', 'Airtable'],
  },
  {
    title: 'Analytics',
    items: ['Tableau', 'Amplitude', 'Mixpanel', 'Google Analytics (GA4)', 'Hotjar', 'FullStory'],
  },
  {
    title: 'Community',
    items: [
      'Reelarm',
      'Canva',
      'TikTok',
      'LinkedIn',
      'Instagram',
      'X',
      'Facebook',
      'Twilio/Sendgrid',
      'Bird SMS',
      'Discord',
    ],
  },
  {
    title: 'CRM & Sales Tools',
    items: ['Hubspot', 'Instantly'],
  },
];
