import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL
} from "./constants";

export class Model {
  constructor(callback) {
    this.callback = callback;
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
  }

  init() {
    this.state = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.updated();

    this.stateCopie = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
  }

  run(date = new Date().getTime()) {
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();

      if (currentTime - date > RENDER_INTERVAL) {
        this.stateCopie = Array.from(new Array(this.height), () =>
          Array.from(new Array(this.width), () => CELL_STATES.NONE)
        );
        for (var i = 0; i < this.height; i++)
          this.stateCopie[i] = this.state[i].slice();

        for (let i = 0; i < this.height; i++) {
          for (let j = 0; j < this.width; j++) {
            const nbAlive = this.aliveNeighbours(i, j);
            if (
              nbAlive === 3 &&
              (this.state[j][i] === CELL_STATES.DEAD ||
                this.state[j][i] === CELL_STATES.NONE)
            ) {
              this.stateCopie[j][i] = CELL_STATES.ALIVE;
            } else {
              if (
                this.state[j][i] === CELL_STATES.ALIVE &&
                (nbAlive === 2 || nbAlive === 3)
              ) {
                this.stateCopie[j][i] = CELL_STATES.ALIVE;
              } else {
                if (this.state[j][i] === CELL_STATES.ALIVE) {
                  this.stateCopie[j][i] = CELL_STATES.DEAD;
                }
              }
            }
          }
        }
        this.state = this.stateCopie;

        this.updated();
        this.run(currentTime);
      } else {
        this.run(date);
      }
    });
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  reset() {
    this.stop();
    this.init();
  }

  isCellAlive(x, y) {
    return x >= 0 &&
      y >= 0 &&
      y < this.height &&
      x < this.height &&
      this.state[y][x] === CELL_STATES.ALIVE
      ? 1
      : 0;
  }
  aliveNeighbours(x, y) {
    let number = 0;
    number = number + this.isCellAlive(x - 1, y - 1);
    number = number + this.isCellAlive(x - 1, y);
    number = number + this.isCellAlive(x - 1, y + 1);

    number = number + this.isCellAlive(x, y - 1);
    number = number + this.isCellAlive(x, y + 1);

    number = number + this.isCellAlive(x + 1, y - 1);
    number = number + this.isCellAlive(x + 1, y);
    number = number + this.isCellAlive(x + 1, y + 1);
    return number;
  }

  updated() {
    this.callback(this);
  }
}
