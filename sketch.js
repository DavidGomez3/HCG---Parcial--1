var rdCuadrado = document.getElementById("Cuadrado");
var rdRectangulo = document.getElementById("Rectangulo");
//Puntos DDA
var X1 = 0, Y1, X2,Y2, dx, dy;
canvasSize = 200
//Funcion que define estados iniciales
function setup() {
  var c = createCanvas(canvasSize , canvasSize);
  frameRate(16);
  background(200);
  c.mousePressed(click);
}

//Funcion que se actualiza en tiempo real
function draw() {

}

//Rectangle
function Rectangulo(X1, Y1, X2, Y2){
  actualizar();
  X3 = X1;
  Y3 = Y2;

  X4 = X2;
  Y4 = Y1;

  DDA(X1, Y1, X3, Y3);
  DDA(X3, Y3, X2, Y2);
  DDA(X2, Y2, X4, Y4);
  DDA(X4, Y4, X1, Y1);
}

//cuadrado
function Cuadrado(X1, Y1, X2, Y2){
  actualizar();
  diferencia = Y2 - Y1;
    nX2 = X1 
    nY2 = Y1 + diferencia;
    X3 = X1 - diferencia;
    Y3 = Y1;
    X4 = X3;
    Y4 = Y3 + diferencia;

    DDA(X1, Y1, nX2, nY2);
    DDA(X1, Y1, X3, Y3);
    DDA(X3, Y3, X4, Y4);
    DDA(X4, Y4, nX2, nY2);
  }
    



//DDA Function
function DDA(X1, Y1, X2, Y2){
  stroke(1);
  let steps;

  dx = X2 - X1
  dy = Y2 - Y1

  if(abs(dx)>abs(dy)) steps=abs(dx)
  else      steps=abs(dy)

  xinc = dx/steps  
  yinc = dy/steps 

  for (let i = 0; i < steps; i++) {
    line(X1, Y1, X1, Y1);
    X1 = X1 + xinc;
    Y1 = Y1 +yinc;
  }
}

//Input por clicks
function click(){
    if (!(document.getElementById("Trasladar").checked) && valid(mouseX, mouseY)){
      X1 = mouseX;
      Y1 = mouseY;
      fill(0);
      ellipse(X1, Y1, 0.5, 0.5);
    }else if(document.getElementById("Trasladar").checked){
      actualizar();
      traslacion();
    }
  }

  function mouseReleased(){
    if (!(document.getElementById("Trasladar").checked) && valid(mouseX, mouseY)) {
      X2 = mouseX;
      Y2 = mouseY;
      fill(0);
      ellipse(X2, Y2,0.5, 0.5);
      if (rdCuadrado.checked === true) {
        Cuadrado(X1, Y1, X2, Y2);
      } else if(rdRectangulo.checked === true){
        Rectangulo(X1, Y1, X2, Y2);
      }

    }
}

//actualizar canvas
function actualizar(){
  if (document.getElementById("Trasladar").checked) {
    background(200);
  }
  ellipse(X1, Y1, 0.5, 0.5);
  ellipse(X2, Y2, 0.5, 0.5);
}

//traslacion
function traslacion() {

  TX = mouseX;
  TY = mouseY;

  diferenciaX = TX - X1;
  diferenciaY = TY - Y1;

  X1 = X1 + diferenciaX;
  Y1 = Y1 + diferenciaY;
  X2 = X2 + diferenciaX;
  Y2 = Y2 + diferenciaY;
  if (rdCuadrado.checked === true) {
    Cuadrado(X1, Y1, X2, Y2);
  } else if(rdRectangulo.checked === true){
    Rectangulo(X1, Y1, X2, Y2);
  }
}
 
function keyPressed() {
  floddFill2(mouseX, mouseY);
}

function floddFill2(x, y){
  let fillStack = [];

  fillStack.push([x, y]);

  while(fillStack.length > 0){
    
    let [x, y] = fillStack.pop();
    
    if (!valid(x, y)) {
      continue;
    }
  
    if (isPixel(x, y)) {
      continue;
    }

    setPixel(x, y);

    fillStack.push([x + 1, y]);
    fillStack.push([x - 1, y]);
    fillStack.push([x, y + 1]);
    fillStack.push([x, y - 1]);
  }
}

function floddFill(x, y){
  if (!valid(x, y)) {
    return;
  }

  if (isPixel(x, y)) {
    return;
  }

  setPixel(x, y);

  floddFill(x + 1, y);
  floddFill(x - 1, y);
  floddFill(x, y + 1);
  floddFill(x, y - 1);
}

function setPixel(x, y) {
  stroke('purple');
  line(x, y, x, y);
}

function isPixel(x, y) {
  colorPixel = get(x, y);
  if (colorPixel[0] === 200) {
    return (false)
  }
  return (true)
}

function valid(x, y) {
  return x >= 0 && x <= canvasSize && y >= 0 && y <= canvasSize
}