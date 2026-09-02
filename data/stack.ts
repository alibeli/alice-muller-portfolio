/** Tech skill groupings from Alice Müller CV (Aug 2025), page 2. */
export type StackItem = {
  name: string;
  url: string;
  /** Simple Icons slug — falls back to favicon when omitted. */
  iconSlug?: string;
};

export type StackSection = {
  title: string;
  items: StackItem[];
};

function stack(name: string, url: string, iconSlug?: string): StackItem {
  return iconSlug ? { name, url, iconSlug } : { name, url };
}

export const stackSections: StackSection[] = [
  {
    title: 'User Feedback & Research',
    items: [
      stack('Typeform', 'https://www.typeform.com/'),
      stack('Maze', 'https://maze.co/'),
      stack('Dovetail', 'https://dovetail.com/'),
      stack('UserTesting', 'https://www.usertesting.com/'),
      stack('Lookback', 'https://lookback.io/'),
      stack('Survicate', 'https://survicate.com/'),
    ],
  },
  {
    title: 'Design & Prototyping',
    items: [
      stack('Figma', 'https://www.figma.com/'),
      stack('Adobe Suite', 'https://www.adobe.com/'),
      stack('Cursor', 'https://cursor.com/'),
    ],
  },
  {
    title: 'Frameworks & Product Tools',
    items: [
      stack('Agile', 'https://agilemanifesto.org/'),
      stack('Waterfall', 'https://en.wikipedia.org/wiki/Waterfall_model'),
      stack('Scrum', 'https://www.scrum.org/'),
      stack('Gantt', 'https://en.wikipedia.org/wiki/Gantt_chart'),
      stack('Jira & Confluence', 'https://www.atlassian.com/software/jira'),
      stack('Google Workspace', 'https://workspace.google.com/'),
    ],
  },
  {
    title: 'Frontend & Backend',
    items: [
      stack('Next.js', 'https://nextjs.org/'),
      stack('Node.js', 'https://nodejs.org/'),
      stack('TypeScript', 'https://www.typescriptlang.org/'),
      stack('React', 'https://react.dev/'),
      stack('Python', 'https://www.python.org/'),
      stack('JavaScript', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'),
      stack('HTML', 'https://developer.mozilla.org/en-US/docs/Web/HTML'),
      stack('CSS', 'https://developer.mozilla.org/en-US/docs/Web/CSS'),
    ],
  },
  {
    title: 'Web3',
    items: [
      stack('Solidity', 'https://soliditylang.org/'),
      stack('Ethereum', 'https://ethereum.org/'),
      stack('EVM', 'https://ethereum.org/en/developers/docs/evm/'),
      stack('Hardhat', 'https://hardhat.org/'),
      stack('Foundry', 'https://getfoundry.sh/'),
      stack('MetaMask', 'https://metamask.io/'),
      stack('WalletConnect', 'https://walletconnect.com/'),
      stack('ENS', 'https://ens.domains/'),
    ],
  },
  {
    title: 'AI & LLMs',
    items: [
      stack('OpenAI (GPT, Whisper)', 'https://openai.com/'),
      stack('Claude', 'https://www.anthropic.com/claude'),
      stack('Gemini', 'https://gemini.google.com/'),
      stack('Mistral', 'https://mistral.ai/'),
      stack('Hugging Face', 'https://huggingface.co/'),
      stack('ElevenLabs', 'https://elevenlabs.io/'),
      stack('LangChain', 'https://www.langchain.com/'),
    ],
  },
  {
    title: 'APIs & Webhooks',
    items: [
      stack('REST APIs', 'https://developer.mozilla.org/en-US/docs/Glossary/REST'),
      stack('Stripe', 'https://stripe.com/'),
      stack('Slack', 'https://slack.com/'),
      stack('Shopify', 'https://www.shopify.com/'),
      stack('Meta APIs', 'https://developers.facebook.com/'),
      stack('Veriff', 'https://www.veriff.com/'),
      stack('OAuth', 'https://oauth.net/2/'),
      stack('Postman', 'https://www.postman.com/'),
    ],
  },
  {
    title: 'Cloud & Hosting',
    items: [
      stack('AWS', 'https://aws.amazon.com/'),
      stack('Vercel', 'https://vercel.com/'),
    ],
  },
  {
    title: 'No-code / Automation',
    items: [
      stack('n8n', 'https://n8n.io/'),
      stack('Zapier', 'https://zapier.com/'),
      stack('Bubble.io', 'https://bubble.io/'),
      stack('Base44', 'https://base44.com/'),
    ],
  },
  {
    title: 'Databases & Backend Services',
    items: [
      stack('Supabase', 'https://supabase.com/'),
      stack('Convex', 'https://www.convex.dev/'),
      stack('Airtable', 'https://airtable.com/'),
    ],
  },
  {
    title: 'Analytics',
    items: [
      stack('Tableau', 'https://www.tableau.com/'),
      stack('Amplitude', 'https://amplitude.com/'),
      stack('Mixpanel', 'https://mixpanel.com/'),
      stack('Google Analytics (GA4)', 'https://analytics.google.com/'),
      stack('Hotjar', 'https://www.hotjar.com/'),
      stack('FullStory', 'https://www.fullstory.com/'),
    ],
  },
  {
    title: 'Community',
    items: [
      stack('Replicate', 'https://replicate.com/'),
      stack('Higgsfield', 'https://higgsfield.ai/'),
      stack('Canva', 'https://www.canva.com/'),
      stack('TikTok', 'https://www.tiktok.com/'),
      stack('LinkedIn', 'https://www.linkedin.com/'),
      stack('Instagram', 'https://www.instagram.com/'),
      stack('X', 'https://x.com/'),
      stack('Facebook', 'https://www.facebook.com/'),
      stack('Twilio/Sendgrid', 'https://www.twilio.com/'),
      stack('Bird SMS', 'https://bird.com/'),
      stack('Discord', 'https://discord.com/'),
    ],
  },
  {
    title: 'CRM & Sales Tools',
    items: [
      stack('Hubspot', 'https://www.hubspot.com/'),
      stack('Instantly', 'https://instantly.ai/'),
    ],
  },
];
