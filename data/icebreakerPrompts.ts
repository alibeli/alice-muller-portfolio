/** Icebreaker openers for the WhatsApp bar — tap the dice to shuffle one in. */
export const icebreakerPrompts: string[] = [
  'Hi Alice, I saw your Swap story. What made you walk away from fashion tech?',
  'Hi Alice, how do you think about privacy-first multi-agent systems? (Runtime)',
  'Hi Alice, tell me about designing a lunar settlement for Domi Inter Astra.',
  "Hi Alice, Starling's take on swarm robotics really stuck with me. What was the core insight?",
  'Hi Alice, what are you building right now with Ailo?',
  'Hi Alice, Imperial + RCA + Parsons is an unusual path. How does that show up in how you work?',
  "Hi Alice, I have a half-baked idea I'd love your take on:",
  'Hi Alice, what did you learn going from product designer to CEO at Superpower?',
  'Hi Alice, how do Yuki and Runtime fit together in what you build at Nillion?',
  'Hi Alice, are you open to chatting about a collaboration or role?',
  'Hi Alice, bootstrapping Swap to an 8-person team is impressive. What would you do differently?',
  'Hi Alice, what drew you to privacy-preserving tech after marketplaces?',
  'Hi Alice, Tact Monster + basketball robots, how real did the prototype get?',
  'Hi Alice, Metavogue was ahead of its time. Would you still ship that thesis today?',
];

let lastPickIndex = -1;

export function pickRandomIcebreaker(): string {
  if (icebreakerPrompts.length === 0) return '';
  if (icebreakerPrompts.length === 1) return icebreakerPrompts[0];

  let index = Math.floor(Math.random() * icebreakerPrompts.length);
  while (index === lastPickIndex) {
    index = Math.floor(Math.random() * icebreakerPrompts.length);
  }

  lastPickIndex = index;
  return icebreakerPrompts[index];
}
