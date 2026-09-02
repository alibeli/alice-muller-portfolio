export type ProjectSummary = {
  background: string;
  insight: string;
  change: string;
  metric: string;
};

export type ProjectImpact = {
  traction: string;
  summary: ProjectSummary;
};

export const projectImpactBySlug: Record<string, ProjectImpact> = {
  ailo: {
    traction: 'Currently building · Founder',
    summary: {
      background:
        'Social apps promise connection but feel performative; sharing location publicly erodes privacy and trust.',
      insight:
        'A fully private map can unlock real-world community — meeting new people and keeping friends close — without surveillance-style social graphs.',
      change:
        'Building Ailo as founder: private-by-default location, real events, and intentional social design.',
      metric: 'Early stage — currently building.',
    },
  },
  nimue: {
    traction: '500+ tools · 10+ SDK modules · TEEs + MPC · Live demo',
    summary: {
      background:
        "Teams need multi-agent workflows but can't trust cloud-only orchestration with sensitive data.",
      insight: 'Privacy + auditability must be architectural, not policy.',
      change: 'Built platform + SDK with TEEs, MPC, RAG, 500+ tools, immutable audit hashes.',
      metric: '10+ SDK modules · 500+ tool integrations · Live at nimue.expo.app',
    },
  },
  yuki: {
    traction:
      '15+ health widgets · TEEs + MPC · iOS & Android app · EIR @ Nillion · Encrypted by design',
    summary: {
      background:
        "Health data is siloed across wearables, labs, and apps; users don't own their longitudinal picture.",
      insight: 'Privacy-preserving aggregation is the unlock for AI health coaching.',
      change: 'Built 15+ widget dashboard + AI coach on Nillion stack as EIR.',
      metric: '15+ widgets · Encrypted by design · EIR @ Nillion',
    },
  },
  swap: {
    traction: '2k items · 200 businesses · 8-person team · iOS app · Bootstrapped',
    summary: {
      background: 'Fashion overproduction + underutilization; businesses lack rental/resale infra.',
      insight: 'Multi-agent listing + marketplace UX can make circular fashion operational, not ideological.',
      change: 'Built full platform, iOS app, merchant dashboards, bootstrapped sales team.',
      metric: '2k items · 200 businesses · 8-person team · iOS live',
    },
  },
  'swap-studio': {
    traction:
      '200+ business sellers · Custom model & product generation · Scene placement · Brand consistency',
    summary: {
      background: "Fashion sellers couldn't afford campaign photography at scale.",
      insight: 'Gen-AI image generation (pre-mainstream) could replace shoots inside merchant workflow.',
      change: 'Built studio inside Swap for on-brand model shots & lookbooks.',
      metric: '200+ business sellers · Integrated workflow',
    },
  },
  superpower: {
    traction: '40K members · 14-person team · Pluralsight partnership · 3× dev output',
    summary: {
      background: 'Workfinder needed to pivot from sector-specific matching to scalable B2B2C SaaS.',
      insight: 'Skills taxonomy + agile product ops unlock anti-fragile matching across US/UK economy.',
      change: 'Designer → VP Product → CEO; rebranded, new design system, pricing model, Pluralsight deal.',
      metric: '40K members · 3× dev output · Pluralsight signed',
    },
  },
  'tact-monster': {
    traction: '450M players addressable · LOIs from 4 top UK unis · InnovationRCA',
    summary: {
      background: '450M basketball players lack affordable pro-level training.',
      insight: 'Autonomous portable robot + app = Peloton for practice.',
      change: 'Co-founded; led ops, business model, app, university outreach.',
      metric: 'LOIs from 4 top UK unis · InnovationRCA',
    },
  },
  'domi-inter-astra': {
    traction: '1st of 18 teams · Moon Society winner · IAC papers',
    summary: {
      background: 'Near-term lunar settlement needs modular architecture for long-term crews.',
      insight: 'Short-to-long-term modularity is the design constraint for sustainable off-world living.',
      change: 'Led space architecture team of students & young professionals.',
      metric: '1st of 18 international teams · IAC papers',
    },
  },
  planet: {
    traction: '500 users in month 1 · iOS & Android in 3 weeks · Co-founder',
    summary: {
      background: 'Sustainable behavior change needs gamification + real-world verification.',
      insight: 'Real actions as in-game currency makes sustainability tangible and fun.',
      change: 'Co-founded; shipped Bubble.io game to both app stores in 3 weeks.',
      metric: '500 users month 1 · iOS + Android',
    },
  },
  metavogue: {
    traction: 'IKEA No Waste nominee (85/1409) · WESLDE Trust Award · InnovationRCA shortlist',
    summary: {
      background: "Fashion = 10% global emissions; digital fashion hasn't scaled to mass adoption.",
      insight: 'Digital fashion must integrate into daily digital life to reduce physical urge.',
      change: 'MA thesis: research → prototype → two-sided marketplace concept.',
      metric: 'IKEA nominee 85/1409 · WESLDE Trust Award',
    },
  },
  starling: {
    traction: 'UX Design Award nominee · MA solo project',
    summary: {
      background: 'Consumer robots encourage dependency and isolation via dark anthropomorphism.',
      insight: 'Swarm robotics + play/creation can maximize human-to-human engagement.',
      change: 'MA solo project: hardware, app, guidelines, case studies.',
      metric: 'UX Design Award nominee',
    },
  },
  'ocean-cloud': {
    traction: '1.25t CO₂ removed per ton olivine',
    summary: {
      background: 'Ships emit massive CO₂; ocean acidification threatens marine ecosystems.',
      insight: 'Olivine reaction on cargo ships = carbon neutral + beneficial nutrients.',
      change: 'Solo design project: modular capture system for shipping industry.',
      metric: '1.25t CO₂ removed per ton olivine',
    },
  },
  poqy: {
    traction: '3rd prize · CERN × Logitech × RCA · Team lead',
    summary: {
      background: 'CERN × Logitech brief: push human capability boundaries in 150 years.',
      insight: 'Controlled autonomous atomic formation as speculative design fiction.',
      change: 'Team lead for Grand Challenge entry.',
      metric: '3rd prize · CERN × Logitech × RCA',
    },
  },
};

export function getProjectImpact(slug: string): ProjectImpact {
  const impact = projectImpactBySlug[slug];
  if (!impact) {
    return {
      traction: '',
      summary: {
        background: '',
        insight: '',
        change: '',
        metric: '',
      },
    };
  }
  return impact;
}
