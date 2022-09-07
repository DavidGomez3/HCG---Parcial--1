//Puntos DDA
var X1 = 0, Y1, X2,Y2, dx, dy;

//Funcion que define estados iniciales
function setup() {
  var c = createCanvas(600, 600);
  frameRate(16);
  background(240);
  c.mousePressed(click);
}

//Funcion que se actualiza en tiempo real
function draw() {
  //Rectangulo(X1, Y1, X2, Y2);
  //console.log("X: ", mouseX, " Y: ",mouseY);
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
  diferencia = X2 - X1;
  
  nX2 = X1 + diferencia
  nY2 = Y1

  X3 = X1;
  Y3 = Y1 - diferencia;
  
  X4 = X3 + diferencia;
  Y4 = Y3;
  DDA(X1, Y1, nX2, nY2);
  DDA(X1, Y1, X3, Y3);
  DDA(X3, Y3, X4, Y4);
  DDA(X4, Y4, nX2, nY2);  
}

//DDA Function 
function DDA(X1, Y1, X2, Y2){
  stroke(1)
  let steps;
  
  dx = X2 - X1 
  dy = Y2 - Y1 
  
  if(abs(dx)>abs(dy)) steps=abs(dx)
  else      steps=abs(dy)

  xinc = dx/steps  //if dx>dy: xk+1 = xk + dx/dx   //if dx<dy: xk+1 = xk + dx/dy
  yinc = dy/steps  //if dx>dy: yk+1 = yk + dy/dx   //if dx<dy: yk+1 = yk + dy/dy

  for (let i = 0; i < steps; i++) {
    point(X1, Y1);
    X1 = X1 + xinc;
    Y1 = Y1 +yinc;
  }
}

//Input por clicks
function click(){
    if (!(document.getElementById("Trasladar").checked) && mouseX <= 600 && mouseX >= 0  && mouseY <= 600 && mouseY >=0){
      X1 = mouseX;
      Y1 = mouseY;
      fill(0);
      ellipse(X1, Y1, 5, 5);
      console.log("Punto 1 = X:", X1, " Y", Y1);
    }else if(document.getElementById("Trasladar").checked){
      actualizar();
      traslacion();
    }
  }
  
  function mouseReleased(){
    if (!(document.getElementById("Trasladar").checked) && mouseX <= 600 && mouseX >= 0  && mouseY <= 600 && mouseY >=0) {
      X2 = mouseX;
      Y2 = mouseY;
      fill(0);
      ellipse(X2, Y2,5, 5);
      Cuadrado(X1, Y1, X2, Y2);
      console.log("Punto 2 = X:", X2, " Y", Y2);

    }
}

//actualizar canvas
function actualizar(){
  background(240);
  ellipse(X1, Y1, 5, 5);
  ellipse(X2, Y2,5, 5);
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
  Cuadrado(X1, Y1, X2, Y2);
}

function floodFill(){
  
}