// Variables
var cons = [];
var starClick = {state: false, index: NaN, click: false}; 
var selectedStar = undefined;
var actionLog = []; 
var lastAction; 
var remakeStar = []; 
var undoMove = []; 
var tempUndoMove;

// Define Canvas
var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
cnv.height = 810;
cnv.width = 1080;
cnv.addEventListener('contextmenu', event => {event.preventDefault();})

// Mouse Events
cnv.addEventListener('mousedown', (event) => {
  // Detecting Whether a Star Was Clicked
  for (let i = 0; i < cons.length; i++) {
    if (holdCheck(cons[i], event.clientX - (cnv.offsetLeft - window.scrollX), event.clientY - (cnv.offsetTop - window.scrollY))) {
      starClick.state = true;
      starClick.index = i;
    }
  }

  // Which Mouse Button was Clicked
  if (event.button == 0) {
    // If left click, create new star
    if (starClick.state == false) {
      actionLog.push('madeStar');
      cons.push({
        x: event.clientX - (cnv.offsetLeft - window.scrollX), 
        y: event.clientY - (cnv.offsetTop - window.scrollY), 
        selected: false, 
        hidden: false
      });
      draw();
    } else {
      starClick.click = 'left';
      tempUndoMove = {
        x: cons[starClick.index].x, 
        y: cons[starClick.index].y, 
        index: starClick.index,
        move: false
      }
    }
  } else if (event.button == 2 && starClick.state) {
    // If right click, select this star
    if (cons[starClick.index].selected == false) {
      if (typeof(selectedStar) != 'undefined') {
        cons[selectedStar].selected = false;
      }
      selectedStar = starClick.index
      cons[selectedStar].selected = true;
    } else {selectedStar = undefined; cons[starClick.index].selected == false}
    draw();
  }
})

// Mouse Up, resets click/hold state
document.addEventListener('mouseup', () => {
  if (typeof(tempUndoMove) == 'object') {
    if (tempUndoMove.move == true) {
      undoMove.push({
        x: tempUndoMove.x,
        y: tempUndoMove.y,
        index: tempUndoMove.index
      })
      actionLog.push('moveStar');
      tempUndoMove = undefined;
    }
  }
  starClick.state = false;
  starClick.index = NaN;
  starClick.click = false;
})

// Mouse Move, drags the held star
cnv.addEventListener('mousemove', (event) => {
  if (starClick.state == true && starClick.click == 'left') {
    cons[starClick.index].x = event.clientX - (cnv.offsetLeft - window.scrollX);
    cons[starClick.index].y = event.clientY - (cnv.offsetTop - window.scrollY);
    tempUndoMove.move = true;
    draw();
  }
})

// Click Detection
var dx; var dy;
function holdCheck(obj, x, y) {
  dx = x - obj.x;
  dy = y - obj.y;
  if (dx * dx + dy * dy <= 25) {
    return true;
  } else {
    return false;
  }
}

// Draw Dots and Lines
function draw() {
  background('black')
  for (let i = 0; i < cons.length; i++) {
    if (typeof(cons[i + 1]) == 'object') {
      if (cons[i].hidden == true) {} else {
        stroke('white')
        line(cons[i].x, cons[i].y, cons[i + 1].x, cons[i + 1].y)
      }
    }
    if (cons[i].selected == true) {fill('grey')} else {fill('white')}
    circle(cons[i].x, cons[i].y, 5, 'fill')
  }
}

// Keydown Events
document.addEventListener('keydown', (event) => {
  if (event.key == 'r') {// R key, reset canvas
    actionLog = [];
    remakeStar = [];
    cons = [];
    background('black')
  } else if (event.ctrlKey && event.key == 'z' || event.key == 'u') {// Ctrl Z, undo last action
    undoAction();
  } else if (typeof(selectedStar) != 'undefined') {
    if (event.key == 'h') {// H key while selecting a star, hides the star's line
      if (cons[selectedStar].hidden == false) {
        cons[selectedStar].hidden = true;
      } else if (cons[selectedStar].hidden == true) {
        cons[selectedStar].hidden = false;
      }
      draw();
    } else if (event.key == 'd' || event.key == 'Delete') {// D or Del key, deletes selected star
      actionLog.push('deleteStar');
      remakeStar.push({star: cons[selectedStar], index: selectedStar})
      cons.splice(selectedStar, 1);
      draw();
      selectedStar = undefined;
    }
  }
})

// Undo Actions
function undoAction() {
  lastAction = actionLog[actionLog.length - 1];
  if (lastAction == 'madeStar') {// Deletes last made star
    cons.pop();
  } else if (lastAction == 'deleteStar') {// Remakes last deleted star
    let reIndex = remakeStar.length - 1;
    cons.splice(remakeStar[reIndex].index, 0, remakeStar[reIndex].star);
    cons[remakeStar[reIndex].index].selected = false;
    remakeStar.pop();
  } else if (lastAction == 'moveStar') {
    let unIndex = undoMove.length - 1;
    let mvIndex = undoMove[unIndex].index;
    cons[mvIndex].x = undoMove[unIndex].x;
    cons[mvIndex].y = undoMove[unIndex].y;
    undoMove.pop();
  } else {console.log('nothing')}
  draw();
  actionLog.pop();
}