export const GAME_SIZE = 10;
export const CELL_SIZE = 20;
export const RENDER_INTERVAL = 500;

export const CELL_STATES = {
  NONE: "darkgrey",
  ALIVE: "chartreuse",
  DEAD: "darkred"
};

export const DEFAULT_ALIVE_PAIRS = [
  /*
  //carré
  [1, 1],
  [2, 1],
  [1, 2],
  [2, 2],

  //grenouille
  [7, 6],
  [4, 7],
  [6, 6],
  [6, 7],
  [5, 6],
  [5, 7]
  */

  [3, 4],
  [5, 6],
  [7, 1],
  [7, 2],
  [8, 5],
  [4, 4],
  [5, 4],
  [6, 4],
  [8, 4]
];
