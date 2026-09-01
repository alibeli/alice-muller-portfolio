import { images } from '../images';
import type { ProjectBase } from './types';

export const poqy: ProjectBase = {
    slug: 'poqy',
    title: 'POQY',
    period: 'Nov 2019 – Jan 2020',
    location: 'London, UK',
    tagline:
      'Human enhancement in 150 years, patomical dust for CERN × Logitech × RCA challenge.',
    roles: ['Team Lead'],
    highlights: ['Finalist CERN × Logitech × Royal College of Art', '3rd Prize'],
    links: [],
    images: [...images.poqy],
    blocks: [
      {
        type: 'text',
        title: 'Summary',
        body: 'POQY, Patomical Oxidoriz Qilex Yuzevix, generally known as patomical dust, is a design fictional synthetic atom that has the ability to morph and simulate nearly any genetic function for a short period of time. POQY is a futuristic innovation that makes controlled autonomous atomic formation possible to empower humanity with abilities previously deemed impossible.',
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
  };
