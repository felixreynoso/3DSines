var conLocs = [];
var conTheta = [];

function setup() {
  createCanvas(900, 800, WEBGL);
  angleMode(DEGREES);
  
  for (var i = 0; i < 200; i++) {
    conLocs.push(createVector(random(-500, 500), random(-800, 0), random(-500,500)));
    conTheta.push(createVector(random(0,360),random(0,360),random(0,360)));
  }
}

function draw() {
  background(125);
  normalMaterial();

  stroke(0);
  strokeWeight(2);

  var gridPos = createVector(-400,0,-400);

  // Orbit camera around grid
  var camPos = createVector(800, -600,800);
  camPos.x = cos(frameCount*0.20) * (height)*1.5;
  camPos.z = sin(frameCount*0.20) * (height)*1.5;
  camera(camPos.x,camPos.y,camPos.z, 0,0,0,0,1,0);

  for (var i = 0; i < 16; i++) 
  {
    for (var j = 0; j < 16; j++)
    {
      push();
        // Compute the position of the current box in the grid
        let boxPos = createVector(gridPos.x+(50*j), 0, gridPos.z+(i*50));
        //Compute the distance of this box from the origin

        let distance = dist(0,0,0,boxPos.x,boxPos.y,boxPos.z);

        var length = map(sin(distance+frameCount), -1, 1, 100, 300);
        translate(gridPos.x+(50*j), 0, gridPos.z+(i*50));
        box(50,length,50);

      pop();
    }
  }
  noStroke();
  confetti();  
}

function confetti() {
  for (var i = 0; i < 200; i++) {
    push();
      translate(conLocs[i].x, conLocs[i].y++, conLocs[i].z);
      rotateX(conLocs[i].x+frameCount);
      rotateY(conLocs[i].y+frameCount);
      rotateZ(conLocs[i].z+frameCount);
      plane(15,15);
    pop();
    
    if (conLocs[i].y >= 0)
        conLocs[i].y = -800;
  }
}

