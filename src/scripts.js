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
  const elements = [];

  function createElement(options) {
    let { item, top, left } = options;
    
    const currentElement = { item, currentPosition: { top, left } };

    elements.push(currentElement);

    const htmlElement = document.createElement('div');
    htmlElement.className = item;
    htmlElement.style.top = `${top}px`;
    htmlElement.style.left = `${left}px`;

    boardElement.appendChild(htmlElement)

    function getDirection( buttonPressed, position ) {
      switch (buttonPressed){
        case 'ArrowUp':
          return { top: position.top - TILE_SIZE, left: position.left };
        case 'ArrowDown':
          return { top: position.top + TILE_SIZE, left: position.left };
        case 'ArrowLeft':
          return { left: position.left - TILE_SIZE, top: position.top };
        case 'ArrowRight':
          return { left: position.left + TILE_SIZE, top: position.top };
        default:
          return position;
      }
    }

    function validateMoviment(position, conflictItem) {
      return (
        position.left >= 48 &&
        position.left <= 864 &&
        position.top >= 96 &&
        position.top <= 816 &&
        conflictItem?.item !== 'forniture'
      )
    }

    function getMovementConflict(position, els) {
      const conflictItem = els.find((currentElement) => {
        return(
          currentElement.currentPosition.top == position.top &&
          currentElement.currentPosition.left == position.left
        )
      });

      return conflictItem;
    }

    function validateConflicts(currentEl, conflictItem){
      function finishGame(message){
        setTimeout(()=>{
          alert(message)
          location.reload();
        }, 100)
      }
      if (currentEl.item === 'hero' ) {
        if (conflictItem?.item === 'mini-demon' ||
            conflictItem?.item === 'trap') {
              finishGame('você morreu');
        }
        if (conflictItem?.item === 'chest'){
          finishGame('você ganhou');
        }
      }

      if (currentEl.item === 'mini-demon' && conflictItem?.item === 'hero') {
        finishGame('você morreu');
      }
    }

    function move(buttonPressed) {
      const newPosition = getDirection(buttonPressed, currentElement.currentPosition );
      const conflictItem = getMovementConflict(newPosition, elements)
      const isValidMovement = validateMoviment(newPosition, conflictItem);
      
      if (isValidMovement) {
        currentElement.currentPosition = newPosition
        htmlElement.style.top = `${newPosition.top}px`;
        htmlElement.style.left = `${newPosition.left}px`;

        validateConflicts(currentElement, conflictItem)
      }
    }

    return{
      move: move
    }
  }
  //-----------------------------------------------------------

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
    const demon = createElement({
      item: 'mini-demon',
      top: options.top,
      left: options.left,
    });

    setInterval(() => {
      const direction = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      const randomIndex = Math.floor(Math.random() * direction.length);
      const randomDirection = direction[randomIndex]
      demon.move(randomDirection);
    }, 1000) 

  }


  return {
    createItem: createItem,
    createHero: createHero,
    createDemon: createDemon,
  }
}


const board = createBoard();

const dificult = parseInt(prompt("Selecione uma dificuldade: \n 1-Fácil \n 2-Médio \n 3-difícil"));

switch (dificult) {
  case 1:
    board.createHero({ top: TILE_SIZE * 17, left: TILE_SIZE * 3 });
    board.createItem({ item: 'chest', top: TILE_SIZE * 10, left: TILE_SIZE * 10 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 12, left: TILE_SIZE * 8 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 14, left: TILE_SIZE * 15 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 15, left: TILE_SIZE * 8 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 10, left: TILE_SIZE * 15 });
    board.createDemon({ top: TILE_SIZE * 14, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 13, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 11, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 9, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 8 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 6 });
    break;
  case 2:
    board.createHero({ top: TILE_SIZE * 17, left: TILE_SIZE * 3 });
    board.createItem({ item: 'chest', top: TILE_SIZE * 2, left: TILE_SIZE * 10 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 12, left: TILE_SIZE * 8 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 14, left: TILE_SIZE * 15 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 15, left: TILE_SIZE * 8 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 10, left: TILE_SIZE * 15 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 5, left: TILE_SIZE * 15 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 10, left: TILE_SIZE * 10 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 5, left: TILE_SIZE * 3 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 12, left: TILE_SIZE * 8 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 10, left: TILE_SIZE * 4});
    board.createDemon({ top: TILE_SIZE * 14, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 14, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 14, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    break;
  case 3:
    board.createHero({ top: TILE_SIZE * 17, left: TILE_SIZE * 1 });
    board.createItem({ item: 'chest', top: TILE_SIZE * 2, left: TILE_SIZE * 18 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 12, left: TILE_SIZE * 8 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 14, left: TILE_SIZE * 15 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 15, left: TILE_SIZE * 8 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 10, left: TILE_SIZE * 15 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 5, left: TILE_SIZE * 15 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 10, left: TILE_SIZE * 10 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 5, left: TILE_SIZE * 3 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 12, left: TILE_SIZE * 8 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 10, left: TILE_SIZE * 4});
    board.createItem({ item: 'trap', top: TILE_SIZE * 12, left: TILE_SIZE * 7 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 14, left: TILE_SIZE * 16 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 16, left: TILE_SIZE * 18 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 12, left: TILE_SIZE * 5 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 5, left: TILE_SIZE * 15 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 16, left: TILE_SIZE * 3 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 10, left: TILE_SIZE * 10 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 5, left: TILE_SIZE * 3 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 6, left: TILE_SIZE * 2 });
    board.createItem({ item: 'trap', top: TILE_SIZE * 6, left: TILE_SIZE * 4});
    board.createDemon({ top: TILE_SIZE * 14, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 14, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 14, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 16, left: TILE_SIZE * 15 });
    board.createDemon({ top: TILE_SIZE * 16, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 16, left: TILE_SIZE * 8 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 16, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    board.createDemon({ top: TILE_SIZE * 14, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 14, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 14, left: TILE_SIZE * 12 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 7, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 7, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 7, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    board.createDemon({ top: TILE_SIZE * 6, left: TILE_SIZE * 10 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    board.createDemon({ top: TILE_SIZE * 15, left: TILE_SIZE * 16 });
    board.createDemon({ top: TILE_SIZE * 16, left: TILE_SIZE * 16 });
    board.createDemon({ top: TILE_SIZE * 17, left: TILE_SIZE * 16 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 10, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 5, left: TILE_SIZE * 7 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    board.createDemon({ top: TILE_SIZE * 3, left: TILE_SIZE * 10 });
    break;
  default:
    alert('valor invalido');
    location.reload();
    break;
}


board.createItem({ item: 'forniture', top: TILE_SIZE * 17, left: TILE_SIZE * 2 });
board.createItem({ item: 'forniture', top: TILE_SIZE * 2, left: TILE_SIZE * 3 });
board.createItem({ item: 'forniture', top: TILE_SIZE * 2, left: TILE_SIZE * 8 });
board.createItem({ item: 'forniture', top: TILE_SIZE * 2, left: TILE_SIZE * 16 });

