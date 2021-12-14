// Style
function stroke(colour) {
  ctx.strokeStyle = colour;
}

function fill(colour) {
  ctx.fillStyle = colour;
}

function lineWidth(width) {
  ctx.lineWidth = width;
}

function font(fontSetting) {
  ctx.font = fontSetting; 
}

function background(colour) {
  fill(colour);
  rect(0, 0, cnv.width, cnv.height, "fill");
}

// Line
function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// Rectangle
function rect(x, y, w, h, mode) {
  if (mode === "fill") {
    ctx.fillRect(x, y, w, h);
  } else if (mode === "stroke") {
    ctx.strokeRect(x, y, w, h);
  }
}

// Circle
function circle(x, y, r, mode) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  if (mode === "fill") {
    ctx.fill();
  } else if (mode === "stroke") {
    ctx.stroke();
  }
}

// Triangle
function triangle(x1, y1, x2, y2, x3, y3, mode) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  if (mode === "fill") {
    ctx.fill();
  } else if (mode === "stroke") {
    ctx.stroke();
  }
}

// Text
function text(message, x, y, mode) {
   if (mode === "fill") {
     ctx.fillText(message, x, y);
   } else if (mode === "stroke") {
     ctx.strokeText(message, x, y, 50);
   }
}

// Ellipse
function ellipse(x, y, xRadius, yRadius, rotation, mode) {
  ctx.beginPath();
  ctx.ellipse(x, y, xRadius, yRadius, rotation, 0, 2 * Math.PI);
  if (mode === "fill") {
    ctx.fill();
  } else if (mode === "stroke") {
    ctx.stroke();
  }
}