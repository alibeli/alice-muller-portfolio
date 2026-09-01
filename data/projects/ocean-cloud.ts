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
        body: 'OceanCloud is a low-cost modular carbon capture reaction system turning cargo ships carbon neutral while releasing beneficial marine nutrients and subsequently helping to fight ocean acididity.',
      },
      { type: 'image', uri: images.oceanCloud[0], caption: 'Ocean Cloud — marine nutrient release concept' },
      {
        type: 'text',
        subtitle: 'Context',
        title: 'Ocean Acidification',
        body: "The oceans are the Earth's heart & lungs giving life to all its children including humanity. They play a major role in global CO2 and nutrient cycles. Our oceans absorb approximately a third of global human CO2 emissions, which has rendered their PH level increasingly acidic. Ocean acidification is drastically disrupting the marine life cycle rendering oceans increasingly hostile for diverse marine life.\n\nMore than 90,000 ships move through the oceans a year releasing large quantities of pollutants into the air. Last year (2018) the shipping industry burned approx. 2 billion barrels of oil. A commercial vessel lasts for 25-30 years, making a change to a sustainable vehicle expensive & difficult (Financial Times, 2019). Due to growth & because other industries will cut their emissions with greater ease the shipping industry is expected to account for 17% of global CO2 emissions by 2050 if no change is taken (ICCT, 2015) drastically pressuring the shipping industry to cut their CO2 emissions.",
      },
      { type: 'image', uri: images.oceanCloud[1], caption: 'OceanCloud ship placement' },
      { type: 'image', uri: images.oceanCloud[2], caption: 'OceanCloud systems sketch' },
      {
        type: 'text',
        subtitle: 'Audience',
        title: 'Target audience',
        body: "Ocean Cloud's target audience is to partner with the shipping industry to use olivine to turn cargo ships carbon neutral. OceanCloud is a modular reactor system principle that can be feasibly adapted to any type of ship to ensure that ships do not have to be rebuilt/modified; therefore minimising cost & energy footprint.",
      },
      {
        type: 'text',
        subtitle: 'Practical Feasibility',
        title: 'Olivine carbon capture',
        body: "Olivine is one of the world's most common minerals making up 50% of the Earth's upper mantle. The products created by olivine reacting with water & CO2 are used by plankton, corals & shellfish to ultimately become carbonate rock; safely storing CO2 for the long-term. 1 ton olivine removes 1.25 tons of CO2. To mine, pulverize & transport 1 ton olivine costs $13 today equalling $10.40/ton of CO2 removed with olivine; an extremely low price/CO2-ton-captured compared to other carbon capture technologies.\n\nAn average cargo ship emits approximately 30.4 tons of CO2/day (90'000 ships release ≈ 1 billion tons of CO2 & GHGs / year; ICCT, 2015). Cargo ships hold between 100 - 21,413 TEU. 1 TEU (average container) holds up to 33.2 m3, which will be able to hold approximately 51 tons of olivine powder. During a 10 day ship voyage, such as from the UK to New York, one cargo ship emits approximately 304.4 tons CO2. To carbon neutralize such a 10 day Transatlantic trip 243.6 tons filling 6 TEUs of olivine would be needed. This would represent less than 1% to 6% of the maximum TEU ship capacity, a very small sacrifice to be made to become a carbon neutral ship.",
      },
      {
        type: 'text',
        subtitle: 'Benefits',
        title: 'Marine ecosystem impact',
        body: "The nutrients released from the olivine reaction are fertilizers for phytoplankton, corals & shellfish that make up the foundation of the aquatic food web, beneficially impacting all of marine life from small to large. Mg2+ (Magnesium Ion) is a major ocean cation ion, H4SiO4 (Silicic Acid) is converted by plants & animals into SiO2 (Silicon Dioxide) serving as structural material for biota's hard parts (Intl. Geophysics, 2000) & 4HCO3- (Bicarbonate) are key resources for seashells & coral skeletons. Saving the oceans abundance of life & beauty is vital to keep all of earth's ecosystems healthy & to ensure humanity's long term survival. For humanity the shipping industry is highly important for the global economy, fostering global trade, globalisation and employing over 1.2 million people (Maritime Industry Foundation). With OceanCloud ships will be carbon neutral safeguarding the benefits of shipping, such as economic development & global international cooperation, for the long term.",
      },
    ],
  };
