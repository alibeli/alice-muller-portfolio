import { images } from '../images';
import type { ProjectBase } from './types';

export const metavogue: ProjectBase = {
  slug: 'metavogue',
  title: 'Metavogue',
  period: 'Jan 2021 – May 2021',
  location: 'London, UK',
  tagline: "A digital fashion two-sided marketplace to cut fashion's footprint.",
  roles: ['Solo project', 'MA Thesis, Royal College of Art'],
  highlights: [
    'Nominated, No Waste Challenge by IKEA Foundation',
    'Recipient, WESLDE Trust Award',
    'Shortlist, InnovationRCA',
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
    {
      type: 'text',
      subtitle: 'Solution',
      title: 'Digital Fashion Consumption to Reduce the Urge',
      body: "METAVOGUE is a social digital fashion marketplace and closet that seamlessly integrates, indulges, and empowers users to wear digital fashion throughout their whole daily digital life. It is beyond physical fashion by offering a new immersive fashion experience. METAVOGUE satisfies impulsive fast fashion consumption to decrease demand for physical fashion. It seamlessly integrates into one's daily digital life, through social media, online video conferencing tools, and other online communities, reducing the urge to buy more physical fashion.",
    },
    { type: 'image', uri: images.metavogue[0] },
    { type: 'image', uri: images.metavogue[1] },
    { type: 'image', uri: images.metavogue[2] },
    { type: 'image', uri: images.metavogue[3] },
    { type: 'image', uri: images.metavogue[4] },
  ],
};
