import type { ProjectBase } from './types';
import { domi_inter_astra } from './domi-inter-astra';
import { ailo } from './ailo';
import { metavogue } from './metavogue';
import { nimue } from './nimue';
import { ocean_cloud } from './ocean-cloud';
import { planet } from './planet';
import { poqy } from './poqy';
import { starling } from './starling';
import { superpower } from './superpower';
import { swap } from './swap';
import { swap_studio } from './swap-studio';
import { tact_monster } from './tact-monster';
import { yuki } from './yuki';

export const baseProjects: ProjectBase[] = [
  ailo,
  nimue,
  yuki,
  swap,
  swap_studio,
  superpower,
  tact_monster,
  domi_inter_astra,
  planet,
  metavogue,
  starling,
  ocean_cloud,
  poqy,
];
