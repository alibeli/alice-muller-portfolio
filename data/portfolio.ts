import { images } from './images';
import { swapAppImages, swapStudioImages } from './localProjectImages';
import { getLocalThumbnail } from './localImages';
import type { ImageSourcePropType } from 'react-native';

export type ProjectBlock =
  | { type: 'text'; subtitle?: string; title?: string; body: string }
  | {
      type: 'image';
      uri?: string;
      asset?: ImageSourcePropType;
      caption?: string;
    };

export type TimelineEntry = {
  date: string;
  label: string;
  kind?: 'role' | 'milestone' | 'why';
};

export type Project = {
  slug: string;
  title: string;
  period: string;
  location: string;
  tagline: string;
  roles: string[];
  highlights: string[];
  links: { label: string; url: string }[];
  images: string[];
  outcome?: string;
  decisions?: string[];
  timeline?: TimelineEntry[];
  badge?: 'currently-building';
  blocks?: ProjectBlock[];
};

export type OtherProject = {
  slug: string;
  title: string;
  description: string;
  period: string;
};

export type Paper = {
  slug: string;
  title: string;
  year: string;
  institution: string;
  images: string[];
  tagline?: string;
};

export type GridItem = {
  kind: 'project' | 'paper';
  slug: string;
  title: string;
  period: string;
  tagline: string;
  traction?: string;
  images: string[];
  thumbnailLocal?: ImageSourcePropType;
  badge?: 'currently-building';
};

export const profile = {
  name: 'Alice Müller',
  tagline: 'Builder, Product Team Leader, Ops & Growth, Founder',
  taglineAreas: 'AI, SaaS, Marketplace, Web3, Privacy Tech',
  credentials: 'MSc Imperial, MA RCA, BFA/BA Parsons',
  bio: "I love working on cross disciplinary, collaborative and disruptive projects to foster innovation on the product, system and business level to improve the world for the better.",
  linkedin: 'https://linkedin.com/in/alicesuekomueller/',
  github: 'https://github.com/alibeli',
  whatsappPhone: '41799154475',
  headshot: images.headshot,
  headshotLocal: require('@/assets/images/headshot.png'),
};

export const profileDetails = [
  {
    title: "👒 Hats I've worn",
    lines: [
      'Founder, Co Founder, CEO, Chief of Staff, Head of Growth & Ops, VP of Product, Product Manager, Product Designer, UX/UI Designer',
    ],
  },
  {
    title: "🗺️ Areas I've led teams & built in",
    lines: ['AI, SaaS, Marketplace, Web3, Privacy Preserving Technologies'],
  },
  {
    title: '🎓 Education',
    lines: [
      'MSc Engineering @Imperial College London',
      'MA Design @Royal College of Art London',
      'BFA Fashion @Parsons New York',
      'BA Political Science @Eugene Lang New York',
    ],
  },
  {
    title: '🌍 Languages & places',
    lines: [
      "I speak 🇺🇸🇨🇭🇩🇪🇫🇷🇮🇹🇨🇳 I've lived in 🇨🇭🇺🇸🇫🇷🇬🇧",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: 'ilo',
    title: 'ILO',
    period: '2026',
    location: 'Zürich, Switzerland',
    tagline: 'Bringing people closer together and fostering more community.',
    roles: ['Founder', 'Building'],
    highlights: ['Currently building'],
    links: [],
    images: [],
    badge: 'currently-building',
    outcome: 'Building a product to bring people closer and foster real community.',
    timeline: [{ date: '2026', label: 'Exploring & building', kind: 'milestone' }],
  },
  {
    slug: 'nimue',
    title: 'Nimue',
    period: 'April 2026',
    location: 'Zürich, Switzerland',
    tagline:
      'Private, auditable and interactive multi agent orchestration for individuals & teams, with platform & SDK.',
    roles: ['Defined & built end to end'],
    highlights: [
      'TEEs, MPC, Decentralized Compute',
      'RAG, Agent Identity, Auditability, Immutable Chain Hashing',
      '500+ tools',
      '10+ modular SDK components',
    ],
    links: [{ label: 'Expo App', url: 'https://nimue.expo.app' }],
    images: [...images.nimue],
    outcome:
      'Built a privacy-first multi-agent orchestration platform & SDK on Nillion blind-compute research.',
    decisions: [
      'TEEs + MPC: agent runs stay private yet provably auditable via immutable chain hashes.',
      'Modular SDK (10+ components) so teams embed agents without rebuilding orchestration.',
      'RAG, agent identity & 500+ tools for traceable, interactive workflows.',
    ],
    timeline: [
      { date: 'Apr 2026', label: 'Platform & SDK — defined & built end to end', kind: 'milestone' },
    ],
  },
  {
    slug: 'yuki',
    title: 'Yuki',
    period: 'December 2025 to December 2026',
    location: 'Zürich, Switzerland',
    tagline:
      'Privacy first holistic health aggregator ,  connect wearables, labs, cycles & habits into one AI powered longevity dashboard.',
    roles: ['Entrepreneur in Residence @ Nillion', 'Defined & built end to end'],
    highlights: [
      '15+ health widgets',
      'Encrypted by design ,  health data never sold or shared',
      'Holistic health AI coach',
    ],
    links: [],
    images: [...images.yuki],
    outcome:
      'As EIR @ Nillion, commercializing blind-compute into a privacy-first health aggregator & AI longevity coach.',
    decisions: [
      'Aligned product with Nillion stack: encrypted-by-design, health data never sold or shared.',
      '15+ widgets unify wearables, labs, cycles & habits into one holistic dashboard.',
      'Focused on real commercial use cases for Nillion privacy-preserving infrastructure.',
    ],
    timeline: [
      { date: 'Dec 2025', label: 'EIR @ Nillion — find commercial paths for nilDB stack', kind: 'role' },
      { date: '2026', label: 'Yuki — defined & built end to end', kind: 'milestone' },
    ],
  },
  {
    slug: 'swap',
    title: 'Swap',
    period: 'April 2024  to  August 2025',
    location: 'Zürich, Switzerland',
    tagline:
      '"Airbnb for Fashion" ,  Multi agent infra orchestrating rental & resale B2C & Peer to Peer fashion marketplace.',
    roles: ['Founder', 'Head of Product & Engineering'],
    highlights: ['2k items, 200 businesses served, iOS app, scaled to 8 people team'],
    links: [
      { label: 'swap-store.xyz', url: 'https://swap-store.xyz' },
      { label: 'Contact for pitch deck', url: 'whatsapp-pitch' },
    ],
    images: [...images.swap],
    outcome: 'Founded & built Swap end to end — live at swap-store.xyz.',
    timeline: [
      { date: 'Apr 2024', label: 'Founded — full platform, iOS app, multi-agent infra', kind: 'role' },
      { date: '2024–25', label: 'Bootstrapped to 8 people (sales & social media)', kind: 'milestone' },
      { date: 'Aug 2025', label: 'Stopped — mission no longer fulfilling; pivoted to privacy & AI impact', kind: 'why' },
    ],
    blocks: [
      {
        type: 'text',
        title: 'Platform',
        body: 'Built the full marketplace end to end: consumer app, store dashboards, multi-agent listing infra, community & sustainability tracking. Visit swap-store.xyz.',
      },
      {
        type: 'text',
        subtitle: 'Growth',
        title: 'Bootstrapped to a team of eight',
        body: 'Scaled through outbound sales and social media — mostly salespeople and content, not engineering headcount. 2k items listed, 200 businesses served.',
      },
      {
        type: 'text',
        subtitle: 'Why I stopped',
        title: 'Mission fit',
        body: 'The mission stopped fulfilling me. I wanted problems that help people more deeply — privacy technology and AI impact on society. That led directly to Nillion & what I build now.',
      },
      { type: 'image', asset: swapAppImages[0], caption: 'Outfits for your week, weather & vibe' },
      { type: 'image', asset: swapAppImages[1], caption: 'Fill your Swap store in seconds — AI item detection' },
      { type: 'image', asset: swapAppImages[2], caption: 'Wear more, waste less — sustainability dashboard' },
      { type: 'image', asset: swapAppImages[3], caption: 'Personalize your store, link to grow together' },
      { type: 'image', asset: swapAppImages[4], caption: 'Join a community, connect with others' },
      { type: 'image', asset: swapAppImages[5], caption: 'Rent fashion every day, delivered to you' },
    ],
  },
  {
    slug: 'swap-studio',
    title: 'Swap Studio',
    period: '2024  to  2025',
    location: 'Zürich, Switzerland',
    tagline: 'AI image studio for fashion businesses — before generative AI was mainstream.',
    roles: ['Founder', 'Part of Swap'],
    highlights: ['Built into Swap', 'Business image generation'],
    links: [{ label: 'swap-store.xyz', url: 'https://swap-store.xyz' }],
    images: [],
    outcome: 'Built a studio inside Swap so businesses generated campaign imagery at scale — pre mainstream gen-AI.',
    timeline: [
      { date: '2024', label: 'Launched as part of Swap', kind: 'milestone' },
      { date: '2025', label: 'Studio for 200+ business sellers', kind: 'milestone' },
    ],
    blocks: [
      {
        type: 'text',
        body: 'Swap Studio let fashion sellers produce on-brand model shots and lookbooks without a photo shoot — integrated into the Swap merchant workflow.',
      },
      { type: 'image', asset: swapStudioImages[0], caption: 'Editorial look — beach campaign' },
      { type: 'image', asset: swapStudioImages[1], caption: 'Industrial studio setting' },
      { type: 'image', asset: swapStudioImages[2], caption: 'High-fashion green coat series' },
      { type: 'image', asset: swapStudioImages[3], caption: 'Variant — crimped hair editorial' },
      { type: 'image', asset: swapStudioImages[4], caption: 'Sports jersey — branded teamwear' },
      { type: 'image', asset: swapStudioImages[5], caption: 'Motion capture — dynamic pose' },
    ],
  },
  {
    slug: 'superpower',
    title: 'Superpower',
    period: 'June 2021  to  April 2024',
    location: 'Remote & London, UK',
    tagline:
      'B2B2C SaaS upskilling & recruitment platform making instant recruitment and precise upskilling possible.',
    roles: ['CEO', 'VP of Product', 'Product Designer'],
    highlights: ['40K Members, 14 people team, top industry partners'],
    links: [{ label: 'Demo 2024', url: 'https://www.superpower.tech' }],
    images: [...images.superpower],
    outcome: 'Grew from product designer to VP Product to CEO — 40K members, 3× dev output, Pluralsight partnership.',
    timeline: [
      { date: 'Jun 2021', label: 'Product Designer — platform UX & design system', kind: 'role' },
      { date: 'Feb 2022', label: 'VP of Product — data science, eng, CS, partnerships', kind: 'role' },
      { date: 'Aug 2023', label: 'CEO — vision, fundraising, 3× developer output', kind: 'role' },
      { date: 'Apr 2024', label: 'Pluralsight signed · 40K members · 14-person team', kind: 'milestone' },
    ],
    blocks: [
      {
        type: 'text',
        title: 'Summary',
        body: "In 2021 I joined the team to help repivot the company's product to a B2B2C SaaS marketplace powered by ML matching. As the VP of Product I led the data science, engineering, customer success, community management and partnership team. The board asked me to step up to the role as CEO to speed up the team and strengthen the vision of Superpower. Among other things, under my management developer output increased by 3x, we pitched to leading VCs and we signed Pluralsight as our partner. Please find below a highlevel summary of a few key areas I worked on.",
      },
      { type: 'image', uri: images.superpower[0] },
      {
        type: 'text',
        subtitle: 'Recruitment & Job Seeker Marketplace',
        title: 'How Superpower works',
        body: "With Superpower's founder I designed the whole Superpower platform that includes a job seeker, learner, recruiter and admin experience. You can try it at www.superpower.tech",
      },
      { type: 'image', uri: images.superpower[1] },
      {
        type: 'text',
        subtitle: 'AI Matching',
        title: 'From local to global potential',
        body: 'Under my leadership the data science team and I expanded the matching capabilities from a sector specific taxonomy to a skills taxonomy that covers the whole US and UK economy, allowing Superpower to upskill and match any role to any candidate independent of skillset. This allowed us to become an anti fragile matching system immune to changing skill landscapes and volatile labour demands.',
      },
      {
        type: 'text',
        subtitle: 'Product Management',
        title: '3x Developer Output',
        body: 'When I joined I implemented the first product management framework and further improved it to an agile framework with 2 week sprints. The engineering team started following the DORA framework and implemented automated testing to increase output while minimising bugs.',
      },
      {
        type: 'text',
        subtitle: 'Rename & Rebrand',
        title: 'From Workfinder to Superpower',
        body: "Superpower was originally called Workfinder, which didn't suit our product expansion and mission any longer. I came up with the name Superpower as it better embodied our mission to become a person's lifelong skills companion by helping 1. candidates secure matching jobs quickly, 2. build their skills precisely and 3. help companies fill their open roles instantly ,  granting all of them superpowers.",
      },
      {
        type: 'text',
        title: 'Logo development',
        body: 'I developed the logo based on references to our 3 interlinked services and the meaning of a "superpower" such as images of energy concentrating and moving. The final logo came from further development looking into the continuous recalibration each one of us does throughout life when we learn new skills. References to the infinitely seeming refolding and restructuring of origami inspired our final logo.',
      },
      { type: 'image', uri: images.superpower[2] },
      {
        type: 'text',
        title: 'Visual illustration system',
        body: 'To bring the story of Superpower to life, I developed a visual illustration system for Superpower.',
      },
      { type: 'image', uri: images.superpower[3] },
      {
        type: 'text',
        title: 'New Superpower Design System',
        body: "Workfinder didn't have a design system and used a lime green color for their brand. To build a memorable brand for Superpower and improve the accessibility of it I developed a new design system and color palette that better reflected our mission, our 3-interlinked services and our target audience.",
      },
      { type: 'image', uri: images.superpower[4] },
      {
        type: 'text',
        subtitle: 'Pricing Strategy',
        title: 'From flat rates to flexible commission structure',
        body: "Superpower's pricing used to be a flat rate per role filled. To increase annual revenue per user and to better compete with our market competitors such as Fiverr, Upwork, Linkedin and Indeed, I modelled and introduced a new pricing model based on a 3% commission fee structured tied to the role's compensation, duration and working hours.",
      },
    ],
  },
  {
    slug: 'tact-monster',
    title: 'Tact Monster',
    period: 'June 2021  to  July 2022',
    location: 'London, UK',
    tagline: 'B2B2C autonomous basketball robot democratizing sports education.',
    roles: ['Co Founder'],
    highlights: ['InnovationRCA Incubator'],
    links: [],
    images: [...images.tactMonster],
    timeline: [
      { date: 'Jun 2021', label: 'Co-founded with roboticist co-founder', kind: 'role' },
      { date: '2021–22', label: 'LOIs from Imperial, Cambridge, Oxford, Edinburgh', kind: 'milestone' },
    ],
    blocks: [
      {
        type: 'text',
        subtitle: 'Problem',
        title: '450M players, inaccessible pro training',
        body: '450 million people play basketball globally, but pro-level training is expensive and inaccessible. We set out to democratize it.',
      },
      {
        type: 'text',
        subtitle: 'My role',
        title: 'Ops, business model & app',
        body: 'Co-founded with an incredible roboticist. I led ops, business model, app development & university outreach — a Peloton-like experience for basketball practice.',
      },
      {
        type: 'text',
        subtitle: 'Outcome',
        title: 'Autonomous robot + university interest',
        body: 'Built a fully autonomous portable robot. Letters of interest from Imperial, Cambridge, Oxford & Edinburgh basketball teams. InnovationRCA incubator.',
      },
      { type: 'image', uri: images.tactMonster[0], caption: 'Tact Monster autonomous training robot' },
    ],
  },
  {
    slug: 'domi-inter-astra',
    title: 'Domi Inter Astra',
    period: 'Dec 2020  to  March 2022',
    location: 'Remote, Global Team',
    tagline: '"Home Among the Stars" ,  A modular short to long term lunar settlement system from 2030 onwards.',
    roles: ['Space Architecture Lead'],
    highlights: ['Winner Moon Base Competition'],
    links: [],
    images: [...images.dia],
    blocks: [
      {
        type: 'text',
        title: 'Summary',
        body: "Leading the architecture team ,  a group of students and young professionals ,  to design a near-term lunar settlement capable of sustaining long term crews of up to 30 people. The design achieved 1st place out of 18 teams internationally in the Moon Society's 2020 Moon Base Design Challenge, as well as producing papers for the 2021 International Astronautical Conference.",
      },
      { type: 'image', uri: images.dia[0] },
      {
        type: 'text',
        subtitle: 'Context',
        title: 'DIA 2030',
        body: "The oceans are the Earth's heart & lungs giving life to all its children including humanity. They play a major role in global CO2 and nutrient cycles. Our oceans absorb approximately a third of global human CO2 emissions, which has rendered their PH level increasingly acidic. Ocean acidification is drastically disrupting the marine life cycle rendering oceans increasingly hostile for diverse marine life.",
      },
      { type: 'image', uri: images.dia[1] },
      {
        type: 'text',
        subtitle: 'Context',
        title: 'DIA 2130',
        body: "The oceans are the Earth's heart & lungs giving life to all its children including humanity. They play a major role in global CO2 and nutrient cycles. Our oceans absorb approximately a third of global human CO2 emissions, which has rendered their PH level increasingly acidic. Ocean acidification is drastically disrupting the marine life cycle rendering oceans increasingly hostile for diverse marine life.",
      },
      { type: 'image', uri: images.dia[2] },
    ],
  },
  {
    slug: 'planet',
    title: 'Planet',
    period: 'Aug 2020  to  Jun 2021',
    location: 'Remote',
    tagline: 'B2B2C mobile game where real world sustainable actions drive in-game progress.',
    roles: ['Co Founder'],
    highlights: ['Launched iOS & Android App in 3 weeks'],
    links: [],
    images: [...images.planet],
    blocks: [
      {
        type: 'text',
        title: 'Summary',
        body: 'Planet is a B2B2C social marketplace game where your real life sustainable actions are verified as currency within the game to allow you to unlock worlds, awards and rewards while teaching you sustainable behaviour skills to help you cut your carbon footprint while having fun. App launched in iOS & Android App Store in 3 weeks, 500 users in first month. We built the game using Bubble.io.',
      },
      { type: 'image', uri: images.planet[0] },
    ],
  },
  {
    slug: 'metavogue',
    title: 'Metavogue',
    period: 'Jan 2021  to  May 2021',
    location: 'London, UK',
    tagline: "A digital fashion two-sided marketplace to cut fashion's footprint.",
    roles: ['Solo project', 'MA Thesis, Royal College of Art'],
    highlights: [
      'Nominated ,  No Waste Challenge by IKEA Foundation',
      'Recipient ,  WESLDE Trust Award',
      'Shortlist ,  InnovationRCA',
    ],
    links: [],
    images: [...images.metavogue],
    blocks: [
      {
        type: 'text',
        title: 'Summary',
        body: "METAVOGUE is a two-sided digital fashion marketplace that integrates into everyone's digital lives to reduce the urge for physical fashion consumption and to give individuals the means to generate additional income through digital fashion trade.",
      },
      {
        type: 'text',
        subtitle: 'Problem',
        title: 'Rising Fashion Pollution',
        body: 'Fashion is responsible for 10% of global carbon emissions and 20% of global wastewater. Fashion demand will continue to increase dramatically in the future. Current solutions to cut fashion\'s footprint are important but will not be sufficient in the face of demand and time running out.',
      },
      {
        type: 'text',
        subtitle: 'Process',
        title: 'Micro interactions and Fashion Psychology',
        body: 'Through primary and secondary research I determined why current solutions will not suffice to cut fashion\'s footprint, why we love, buy, and wear fashion, and why digital fashion has not managed to scale in mass adoption yet. Interviews with designers and users, psychological micro interaction analysis, psychological research, technical experiments, ideation, prototyping, user testing, and validation unveiled how digital fashion can excel and what kind of system architecture can work to cut fashion\'s footprint.',
      },
      { type: 'image', uri: images.metavogue[0] },
      { type: 'image', uri: images.metavogue[1] },
      {
        type: 'text',
        subtitle: 'Solution',
        title: 'Digital Fashion Consumption to Reduce the Urge',
        body: "METAVOGUE is a social digital fashion marketplace and closet that seamlessly integrates, indulges, and empowers users to wear digital fashion throughout their whole daily digital life. It is beyond physical fashion by offering a new immersive fashion experience. METAVOGUE satisfies impulsive fast fashion consumption to decrease demand for physical fashion. It seamlessly integrates into one's daily digital life, through social media, online video conferencing tools, and other online communities, reducing the urge to buy more physical fashion.",
      },
      { type: 'image', uri: images.metavogue[2] },
      { type: 'image', uri: images.metavogue[3] },
      { type: 'image', uri: images.metavogue[4] },
    ],
  },
  {
    slug: 'starling',
    title: 'Starling',
    period: 'Jan 2021  to  May 2021',
    location: 'London, UK',
    tagline: 'Consumer swarm robotic system to foster social connection.',
    roles: ['MA Solo Project'],
    highlights: ['UX Design Awards 2020 ,  Nominated'],
    links: [],
    images: [...images.starling],
    blocks: [
      {
        type: 'text',
        title: 'Summary',
        body: 'Starling is a consumer social robotic assistant that can transition from individual to collective utility, play & creation encouraging human engagement, empowerment & a more humanistic robotic future.',
      },
      { type: 'image', uri: images.starling[0], caption: 'Starling family — individual to swarm form factor' },
      {
        type: 'text',
        subtitle: 'Context',
        title: 'Robot Proliferation',
        body: 'User adoption of consumer robotics is expected to proliferate widely within the next decade. According to OMDIA worldwide sales of consumer robots will reach 65.9 million units annually by 2025 from 15.4 million units in 2018 with a market value of $19 billion from $5.6 billion respectively.',
      },
      {
        type: 'text',
        subtitle: 'Problem',
        title: "Today's Consumer Robots",
        body: 'The majority of today\'s consumer robots encourage negative human behavioural outcomes, often using "dark" anthropomorphism, such as: Human to Robot addiction, Human to Robot dependency, Human isolation, Human behavioural modification, Human affective replacement.',
      },
      {
        type: 'text',
        subtitle: 'Research',
        title: 'Areas of research',
        body: 'Key Insights ,  Swarm Robotics: Highly flexible systems that can multiply potential of single agent through connectivity. Not applied within consumer space yet. Play & Creation: Offers range of cognitive & physical health benefits. Utility: Daily utility and assistance with tasks by robot is crucial factor for users.',
      },
      {
        type: 'text',
        subtitle: 'Research Insights',
        title: 'Consumer Robot Guidelines',
        body: 'Human to human Engagement Maximisation, User Empowerment, Product Flexibility, Human Unification, "Light" Cuteness',
      },
      { type: 'image', uri: images.starling[6], caption: 'Guideline: maximise human-to-human engagement' },
      { type: 'image', uri: images.starling[7], caption: 'Guideline: human unification over isolation' },
      { type: 'image', uri: images.starling[8], caption: 'Guideline: user empowerment' },
      { type: 'image', uri: images.starling[9], caption: 'Guideline: product flexibility' },
      { type: 'image', uri: images.starling[10], caption: 'Guideline: light cuteness — no dark anthropomorphism' },
      {
        type: 'text',
        subtitle: 'Composition & Design',
        title: 'Meet Starling',
        body: 'Starling Hardware Design ,  Anthropomorphism limited to a subtle curve of the front LCD screen.',
      },
      { type: 'image', uri: images.starling[1], caption: 'Hardware — anthropomorphism limited to LCD curve' },
      { type: 'image', uri: images.starling[12], caption: 'Material & colour explorations' },
      { type: 'image', uri: images.starling[13], caption: 'Desk companion form' },
      {
        type: 'text',
        subtitle: 'User Controls',
        title: 'Robot Screen & App',
        body: 'Starling Screen for quick controls & interactions. Starling App to control Starling & connect it to other Starlings.',
      },
      { type: 'image', uri: images.starling[2], caption: 'On-device screen for quick controls' },
      {
        type: 'text',
        subtitle: 'User × Robot Interaction',
        title: 'Starling App',
        body: 'UX, Login, Basic features, Pair, Group, Swarm connection.',
      },
      { type: 'image', uri: images.starling[16], caption: 'App — pair, group & swarm connection' },
      { type: 'image', uri: images.starling[17], caption: 'App flows — login & basic features' },
      {
        type: 'text',
        subtitle: 'Case Studies',
        title: 'From Individual to Collective Setting',
        body: 'Individual utility, individual play, pair/group/swarm play, pair/group/swarm creation.',
      },
      { type: 'image', uri: images.starling[3], caption: 'Individual utility & play' },
      { type: 'image', uri: images.starling[4], caption: 'Pair & group play scenarios' },
      { type: 'image', uri: images.starling[5], caption: 'Swarm creation — collective making' },
      {
        type: 'text',
        subtitle: 'Environmental Impact',
        title: 'Repairable, recyclable, biomimicry',
        body: "Starling is a sustainable robotic device, as it can be completely taken apart so that the user or the company can replace and fix a Starling. Starling will be made of recyclable and recycled materials.",
      },
      {
        type: 'text',
        subtitle: 'Anticipated Results & Impact',
        title: 'Open discussion to enrich our common values',
        body: 'The most significant social impact of Starling will be to open up a discussion of what we as users and as a free society want from our consumer robotic smart assistants.',
      },
      {
        type: 'text',
        subtitle: 'Tech Spec',
        title: 'Exploded view',
        body: '',
      },
      { type: 'image', uri: images.starling[11], caption: 'Exploded view — repairable modules' },
      { type: 'image', uri: images.starling[14], caption: 'Internal component layout' },
      { type: 'image', uri: images.starling[15], caption: 'Tech spec — biomimicry references' },
      { type: 'image', uri: images.starling[18], caption: 'Colour system & finish palette' },
    ],
  },
  {
    slug: 'ocean-cloud',
    title: 'Ocean Cloud',
    period: 'April 2020',
    location: 'London, UK',
    tagline:
      'Low cost modular carbon capture system to decarbonise ships while releasing beneficial marine nutrients.',
    roles: ['Solo Project (2019)'],
    highlights: ['Fast Company World Changing Ideas 2020 Finalist'],
    links: [],
    images: [...images.oceanCloud],
    blocks: [
      {
        type: 'text',
        title: 'Summary',
        body: 'OceanCloud is a low cost modular carbon capture reaction system turning cargo ships carbon neutral while releasing beneficial marine nutrients and subsequently helping to fight ocean acididity.',
      },
      {
        type: 'text',
        subtitle: 'Context',
        title: 'Ocean Acidification',
        body: "The oceans are the Earth's heart & lungs giving life to all its children including humanity. They play a major role in global CO2 and nutrient cycles. Our oceans absorb approximately a third of global human CO2 emissions, which has rendered their PH level increasingly acidic.",
      },
      {
        type: 'text',
        subtitle: 'Audience',
        title: 'Target audience',
        body: "Ocean Cloud's target audience is to partner with the shipping industry to use olivine to turn cargo ships carbon neutral.",
      },
      {
        type: 'text',
        subtitle: 'Practical Feasibility',
        title: 'Olivine carbon capture',
        body: 'Olivine is one of the world\'s most common minerals making up 50% of the Earth\'s upper mantle. 1 ton olivine removes 1.25 tons of CO2.',
      },
      {
        type: 'text',
        subtitle: 'Benefits',
        title: 'Marine ecosystem impact',
        body: 'The nutrients released from the olivine reaction are fertilizers for phytoplankton, corals & shellfish that make up the foundation of the aquatic food web.',
      },
      { type: 'image', uri: images.oceanCloud[0] },
      { type: 'image', uri: images.oceanCloud[1] },
      { type: 'image', uri: images.oceanCloud[2] },
    ],
  },
  {
    slug: 'poqy',
    title: 'POQY',
    period: 'Nov 2019  to  Jan 2020',
    location: 'London, UK',
    tagline:
      'Human enhancement in 150 years ,  patomical dust for CERN × Logitech × RCA challenge.',
    roles: ['Team Lead'],
    highlights: ['Finalist CERN × Logitech × Royal College of Art', '3rd Prize'],
    links: [],
    images: [...images.poqy],
    blocks: [
      {
        type: 'text',
        title: 'Summary',
        body: 'POQY ,  Patomical Oxidoriz Qilex Yuzevix ,  generally known as patomical dust, is a design fictional synthetic atom that has the ability to morph and simulate nearly any genetic function for a short period of time. POQY is a futuristic innovation that makes controlled autonomous atomic formation possible to empower humanity with abilities previously deemed impossible.',
      },
      {
        type: 'text',
        subtitle: 'Context',
        title: 'CERN × Logitech Grand Challenge Brief',
        body: "Humanities' endeavour to discover the possibilities that our world can offer and to push our knowledge and capabilities to the maximum have extended our understanding of life, our planet and space beyond. The Grand Challenge asks 'what more is to come?'",
      },
      { type: 'image', uri: images.poqy[0] },
      { type: 'image', uri: images.poqy[1] },
      { type: 'image', uri: images.poqy[2] },
      { type: 'image', uri: images.poqy[3] },
    ],
  },
];

export const papers: Paper[] = [
  {
    slug: 'swarms',
    title: 'Swarms: On Robotic Emergence and Human Robot Interaction',
    year: '2021',
    institution: 'MSc Thesis, Imperial College London',
    images: [images.starling[0]],
  },
  {
    slug: 'shepherd-and-the-sheep',
    title: 'Shepherd and the Sheep: Democratising AGI',
    year: '2019',
    institution: 'BA Political Science Thesis, Eugene Lang New York',
    images: [images.starling[11]],
  },
  {
    slug: 'biomimetic-hive-minds',
    title: 'Biomimetic Hive Minds for AGI: Creating Value & Reputation Systems',
    year: '2018',
    institution: 'BA Political Science Paper, Eugene Lang New York',
    images: [images.starling[6]],
  },
  {
    slug: 'hegemonic-stability',
    title: 'Hegemonic Stability Theory',
    year: '2017',
    institution: 'BA Political Science Paper, Eugene Lang New York',
    images: [images.oceanCloud[0]],
  },
];

export const otherProjects: OtherProject[] = [
  { slug: 'coolbee', title: 'Coolbee', description: 'Sustainable solar air conditioner', period: '2020, MSc & MA' },
  { slug: 'elefant', title: 'Elefant', description: "Packaging for Samsung's The Frame", period: '2020, MSc & MA' },
  { slug: 'soma-triplets', title: 'Soma Triplets', description: 'Anthropomorphic hardware', period: '2019, MSc & MA' },
  { slug: 'whale', title: 'Whale', description: 'Portable steamer & companion app', period: '2019, MSc & MA' },
  { slug: 'skill-free', title: 'Skill Free', description: 'Skills-based learning concept', period: '2019, MSc' },
  { slug: 'amateur', title: 'Amateur', description: 'Consumer robotics concept', period: '2019, MSc & MA' },
  { slug: 'blitz', title: 'Blitz', description: 'Rapid prototyping hardware sprint', period: '2019, MSc & MA' },
  { slug: 'helvetica', title: 'Helvetica', description: 'On the melting of the Swiss glaciers — BFA thesis', period: '2017, BFA Thesis' },
  { slug: 'lalique', title: 'Lalique', description: 'Consultation project Parsons × Columbia Business School', period: '2017, BA' },
  { slug: 'triforce', title: 'Triforce', description: 'Catheter-accessible jeans — Design for Disability', period: '2017, BA' },
  { slug: 'bulgari', title: 'Bulgari × Luxottica', description: 'Eyewear produced by Luxottica for BVLGARI', period: '2017, BFA' },
];

export const awards = [
  {
    year: '2024',
    title: 'Imperial College Design Engineering Hackathon',
    detail: '3rd Prize for real time saliva monitoring tooth implant',
  },
  {
    year: '2021',
    title: 'Innovation RCA Startup Program',
    detail: 'Participant ,  Tact Monster',
  },
  {
    year: '2021',
    title: 'No Waste Challenge by IKEA',
    detail: 'Nominated, 85 out of 1409',
  },
  {
    year: '2021',
    title: 'Moon Base Design Context',
    detail: 'Winner for Domi Inter Astra',
  },
  {
    year: '2021',
    title: 'WESLDE Trust Award',
    detail:
      'Recipient. Given to 12 students/year at Royal College of Art for outstanding MA thesis.',
  },
  {
    year: '2020',
    title: 'CERN SciComm Hackathon',
    detail: 'Audience Award',
  },
  {
    year: '2020',
    title: 'UX Design Award',
    detail: 'Nominated',
  },
  {
    year: '2020',
    title: 'Fast Company World Changing Ideas',
    detail: 'Finalist',
  },
  {
    year: '2020',
    title: 'CERN × Logitech × Royal College of Art',
    detail: '3rd Prize',
  },
  {
    year: '2018',
    title: 'Civic Liberal Arts Fellowship',
    detail: 'Eugene Lang College Recipient',
  },
  {
    year: '2017',
    title: 'Hugo Boss Stipend',
    detail:
      'Recipient. Given to 4 students/year at Parsons New York for outstanding BFA thesis.',
  },
  {
    year: '2017',
    title: 'Luxury Education Foundation Scholarship',
    detail:
      'Recipient. Given to 2 Parsons students & 2 Columbia Business School students.',
  },
  {
    year: '2017',
    title: 'Shoe Polytechnic Padua × Parsons',
    detail:
      'Scholarship Winner. Given to 10 Parsons students/year for outstanding BFA work.',
  },
  {
    year: '2017',
    title: 'Design for Disability ,  Cerebral Palsy Foundation',
    detail: 'Special Honors',
  },
  {
    year: '2017',
    title: 'Bulgari × Luxottica Parsons',
    detail:
      '6 students selected. Designed eyewear produced by Luxottica for BVLGARI.',
  },
  {
    year: '2015',
    title: "Dean's Scholarship Parsons New York",
    detail: 'Bi annual scholarship for outstanding GPA.',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getPaper(slug: string): Paper | undefined {
  return papers.find((p) => p.slug === slug);
}

export function getGridItems(): GridItem[] {
  const projectItems: GridItem[] = projects.map((p) => ({
    kind: 'project',
    slug: p.slug,
    title: p.title,
    period: p.period,
    tagline: p.tagline,
    traction: p.highlights.length > 0 ? p.highlights.join(', ') : undefined,
    images: p.images,
    thumbnailLocal: getLocalThumbnail(p.slug),
    badge: p.badge,
  }));

  return projectItems;
}
