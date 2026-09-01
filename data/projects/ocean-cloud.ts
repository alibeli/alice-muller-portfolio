import { images } from '../images';
import type { ProjectBase } from './types';

export const ocean_cloud: ProjectBase = {
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
  };
