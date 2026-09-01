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
      body: 'POQY, Patomical Oxidoriz Qilex Yuzevix, generally known as patomical dust, is a design fictional synthetic atom that has the ability to morph and simulate nearly any genetic function for a short period of time. This characteristic is similar to water when it turns into snowflakes; same substance, infinite unique atomic structures. POQY is a futuristic innovation that makes controlled autonomous atomic formation possible to empower humanity with abilities previously deemed impossible, such as understanding animals or plants and more.',
    },
    {
      type: 'text',
      subtitle: 'Context',
      title: 'CERN × Logitech Grand Challenge Brief',
      body: "Humanities' endeavour to discover the possibilities that our world can offer and to push our knowledge and capabilities to the maximum have extended our understanding of life, our planet and space beyond. The RCA has played its part in this and has a fantastic legacy of contributing to this knowledge over the last 180+ years with a glittering array of people who have gone on to change the world and our understanding of it. The Grand Challenge asks 'what more is to come?'. As the Design cohort who will graduate in 2021 we ask you to collectively explore where we might be in the next 50 – 180 years. You will not be alone in this challenge as this year we partner with Logitech. Logitech designs products that have an everyday place in people's lives, connecting them to the digital experiences they care about. Created over 35 years ago, Logitech started connecting people through computers; today the company is designing products that bring people together through music, gaming, video and computing, so they can create, achieve and enjoy more. Logitech's CEO, Bracken Darrell, describes Logitech as 'a \"third-generation\" design company, which focuses on superior design and engineering that is influenced by innovation and consumer insights to offer unique and meaningful experiences, not simply products.'\n\nWe will also have support from Cern, last year's Grand Challenge partner. The Large Hadron Collider at the European Organization for Nuclear Research CERN in Geneva is the world's largest and most powerful particle accelerator and possibly the most complex scientific instrument ever built. With a community of around 10,000 scientists from 60 countries, CERN is undoubtedly a beacon of collaborative practice with a common goal to develop and question the philosophy of physics. As students at the RCA, the world's leading art and design institution, you will work with each other, supported by Logitech, Cern and our academic staff in teams and groups to consider and address 'Enhancing the Human: capability and performance', both in, on and around the body and project your thinking to the future, 2070 – 2200. What is the future of the digital experience? What is the future for community endeavour? What is the future for creativity? In the lead up to the project start date, 2nd December, there will be a lecture series to inspire and provoke: 15th, 22nd, 29th Oct. 12th, 19th, 26th Nov. From the 2nd December to the end of term there will be a series of workshops and activities to take you beyond your current perceptions and comfort zones. From the start of the Spring term to the 23rd January you will work intensively in groups to explore these questions and arrive at the following: An illustrated question, design probe, speculative body of work or provocation that can take any form you choose, but must include: 2-minute video and 10 slide digital presentation. This is not a commercial project. It is not about incremental design development. It is not about designing commercial products. We are looking for the radical.",
    },
    { type: 'image', uri: images.poqy[0] },
    { type: 'image', uri: images.poqy[1] },
    { type: 'image', uri: images.poqy[2] },
    { type: 'image', uri: images.poqy[3] },
  ],
};
