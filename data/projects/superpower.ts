import { superpowerHeroImage } from '../localProjectImages';
import { images } from '../images';
import type { ProjectBase } from './types';

export const superpower: ProjectBase = {
  slug: 'superpower',
  title: 'Superpower',
  period: 'June 2021 – April 2024',
  location: 'Remote & London, UK',
  tagline:
    'B2B2C SaaS upskilling & recruitment platform making instant recruitment and precise upskilling possible.',
  roles: ['CEO', 'VP of Product', 'Product Designer'],
  highlights: ['40K Members, 14 people team, top industry partners'],
  links: [
    { label: 'Demo 2024', url: 'https://www.superpower.tech' },
    { label: 'Demo video', url: 'https://youtu.be/MDSaP1WovYw' },
  ],
  images: [...images.superpower],
  outcome: 'Grew from product designer to VP Product to CEO — 40K members, 3× dev output, Pluralsight partnership.',
  blocks: [
    {
      type: 'text',
      title: 'Summary',
      body: "In 2021 I joined the team to help repivot the company's product to a B2B2C SaaS marketplace powered by ML matching. As the VP of Product I led the data science, engineering, customer success, community management and partnership team. The board asked me to step up to the role as CEO to speed up the team and strengthen the vision of Superpower. Among other things, under my management developer output increased by 3x, we pitched to leading VCs and we signed Pluralsight as our partner. Please find below a highlevel summary of a few key areas I worked on.",
    },
    {
      type: 'image',
      asset: superpowerHeroImage,
      caption: 'Superpower brand illustration — lifelong skills companion.',
    },
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
      body: "Superpower was originally called Workfinder, which didn't suit our product expansion and mission any longer. I came up with the name Superpower as it better embodied our mission to become a person's lifelong skills companion by helping 1. candidates secure matching jobs quickly, 2. build their skills precisely and 3. help companies fill their open roles instantly, granting all of them superpowers.",
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
};
