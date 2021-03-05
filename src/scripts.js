const TILE_SIZE = 48;
const HELMET_OFFSET = 12;
const GAME_SIZE = TILE_SIZE * 20;

// setando as variaveis no css via js

const root = document.documentElement;
root.style.setProperty('--tile-size', `${TILE_SIZE}px`);
root.style.setProperty('--helmet-offset', `${HELMET_OFFSET}px`);
root.style.setProperty('--game-size', `${GAME_SIZE}px`);

// ---------------------------------------------------------------

function createBoard() {
  const boardElement = document.querySelector('#board');

  function createElement(options) {
    let { item, top, left } = options;

    const htmlElement = document.createElement('div');
    htmlElement.className = item;
    htmlElement.style.top = `${top}px`;
    htmlElement.style.left = `${left}px`;

    boardElement.appendChild(htmlElement)

    function getDirection(buttonPressed) {
      switch (buttonPressed){
        case 'ArrowUp':
          return { top: top - TILE_SIZE, left: left };
        case 'ArrowDown':
          return { top: top + TILE_SIZE, left: left };
        case 'ArrowLeft':
          return { left: left - TILE_SIZE, top: top };
        case 'ArrowRight':
          return { left: left + TILE_SIZE, top: top };
        default:
          return { left: left, top: top };
      }
    }

    function move(buttonPressed) {
      const newDirection = getDirection(buttonPressed);

      top = newDirection.top;
      left = newDirection.left;

      htmlElement.style.top = `${newDirection.top}px`;
      htmlElement.style.left = `${newDirection.left}px`;
    }

    return{
      move: move
    }
  }

  function createItem(options) {
    createElement(options);
  }

  function createHero(options) {
    const hero = createElement(
      {
      item: 'hero',
      top: options.top,
      left: options.left,
      }
    );

    document.addEventListener('keydown', (event) => {
      hero.move(event.key);
    });
  }

  function createDemon(options) {
    createElement({
      item: 'mini-demon',
      top: options.top,
      left: options.left,
    });
  }


  return {
    createItem: createItem,
    createHero: createHero,
    createDemon: createDemon,
  }
}

const board = createBoard();

board.createItem({ item: 'chest', top: TILE_SIZE * 2, left: TILE_SIZE * 18 });
board.createItem({ item: 'trap', top: TILE_SIZE * 12, left: TILE_SIZE * 8 });

board.createHero({ top: TILE_SIZE * 17, left: TILE_SIZE * 3 });
board.createDemon({ top: TILE_SIZE * 7, left: TILE_SIZE * 3 });