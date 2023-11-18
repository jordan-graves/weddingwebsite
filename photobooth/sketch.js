let cam;
let photostrip;
let photos = [];
let printOut;
let count = 0;
let photoNumber = 0;
let ready = true;
let alreadyTaken = false;
let timerStart = 0;
let serial;
let numCopies = 1;

function setup() {
  // createCanvas(640, 740);
  createCanvas(1920, 1080);
  //fullScreen();
  photostrip = loadImage("photostrip2.png");
  photos[0] = createGraphics(640, 480);
  photos[1] = createGraphics(640, 480);
  photos[2] = createGraphics(640, 480);
  printOut = createGraphics(600, 1800);
  printOut.pixelDensity(1);

  serial = new p5.SerialPort();
  serial.open();

  cam = createCapture(640, 480);
  cam.hide();
  textFont("obviously");
    const firebaseConfig = {
    apiKey: "AIzaSyBGykFtzq2KD3aYZAYDqLQqfgylJdnO_qo",
    authDomain: "apcs-finals.firebaseapp.com",
    databaseURL: "https://apcs-finals-default-rtdb.firebaseio.com",
    projectId: "apcs-finals",
    storageBucket: "apcs-finals.appspot.com",
    messagingSenderId: "990129759654",
    appId: "1:990129759654:web:5f08c0e1a4af8946d59b67",
    measurementId: "G-CQBFFJZJN7",
  };

  //inititalize database
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  photoData = database.ref("photobooth");
}

function draw() {
  //  if (count>2) return;
  push();
  background(255, 0, 0);

  scale(1080 / 740);
  translate(320, 0);

  translate(0, 40);
  push();
  scale(-1, 1);
  image(cam, 0, 0, -640, 480);
  pop();
  stroke(255, 0, 0);
  fill(255, 0, 0);
  rect(0, 0, 52, 480);
  rect(640 - 52, 0, 52, 480);

  push();
  translate(0, 20);
  image(photos[0], 0, 490, 640 / 3, 480 / 3);
  image(photos[1], 213, 490, 640 / 3, 480 / 3);
  image(photos[2], 426, 490, 640 / 3, 480 / 3);

  rect(0, 480, 52 / 3, 480);
  rect(640 / 3 - 52 / 3, 480, 52 / 3, 480);

  push();
  translate(213, 0);
  rect(0, 480, 52 / 3, 480);
  rect(640 / 3 - 52 / 3, 480, 52 / 3, 480);
  translate(213, 0);
  rect(0, 480, 52 / 3, 480);
  rect(640 / 3 - 52 / 3, 480, 52 / 3, 480);
  pop();

  pop();
  stroke(255);
  fill(255);
  if (ready) {
    textSize(70);
    textAlign(CENTER);
    push();
    translate(320, 230);
    rotate(-PI / 20);
    text("Click  to\nstart  timer!", 0, 0);
    pop();
  } else if (count == 3 && !alreadyTaken) {
    textSize(60);
    textAlign(CENTER);
    let countDown = 20 - int((millis() - timerStart) / 1000);
    push();
    translate(320, 150);
    rotate(-PI / 20);
    if (countDown>12) {
      text("Preparing\nYour  Photos!", 0, 0);
    } else {
          textSize(30);
      
      text("Due to technical\ndifficulties the photos\nwill be online!", 0, 0);

    }
    pop();
    textSize(30);
  //  text("Choose number of copies", 320, 320);

    fill(255);
  //  ellipse(320, 400, 80, 80);
  //  ellipse(320 - 160, 400, 80, 80);
  //  ellipse(320 + 160, 400, 80, 80);


    fill(255);
    stroke(255, 100, 100);
    strokeWeight(15);
    if (numCopies == 1) {
 //     ellipse(320 - 160, 400, 120, 120);
    } else if (numCopies == 2) {
//      ellipse(320, 400, 120, 120);
    } else if (numCopies == 3) {
//      ellipse(320 + 160, 400, 120, 120);
    }
    strokeWeight(1);
    
        fill(0);
    textSize(60);
  //  text("1", 160, 420);
  //  text("2", 320, 420);
  //  text("3", 480, 420);
    
    // println(countDown);
    if (countDown == 0) {
      reset();
    }
  } else {
    let countDown = 5 - int((millis() - timerStart) / 1000);
    textSize(150);
    textAlign(CENTER);
    if (countDown>-1)
    text(countDown, 320, 300);
    // println("CD:"+countDown);
    if (countDown == 0) {
      background(255);
      takeNextPicture();
    } else if (countDown == -1) {
      alreadyTaken = false;
      timerStart = millis();
    }
  }
  pop();

  background(0, 0, 0, 50);
}

function mouseClicked() {
  if (ready) {
    ready = false;
    startTimer();
    numCopies = 1;
  } else if (count == 3 && !alreadyTaken) {
    console.log(mouseX);
if (mouseX<(700+932)/2) {
  numCopies = 1;
} else if (mouseX<(1164+932)/2) {
   numCopies = 2;
} else {
   numCopies = 3;
}
  }
}

function startTimer() {
  timerStart = millis();
}

function takeNextPicture() {
  // println(cam);
  if (alreadyTaken) return;
  // println(count);
  photos[count].image(cam, 0, 0, 640, 480);
  count++;
  alreadyTaken = true;

  if (count == 3) {
    printOut.image(photos[0], 0, 50, 600, int((480.0 / 640.0) * 600));
    printOut.image(photos[1], 0, 520, 600, int((480.0 / 640.0) * 600));
    printOut.image(photos[2], 0, 1000, 600, int((480.0 / 640.0) * 600));
    printOut.image(photos[0], 600, 50, 600, int((480.0 / 640.0) * 600));
    printOut.image(photos[1], 600, 520, 600, int((480.0 / 640.0) * 600));
    printOut.image(photos[2], 600, 1000, 600, int((480.0 / 640.0) * 600));
    printOut.image(photostrip, 0, 0, 1200, 1800);

    // image(printOut, 0, 0, 600, 900);
   // printOut.save("img" + photoNumber + ".png");

    // alreadyTaken = false;
    // timerStart = millis();

    printImage();
    //  reset();
  }
}

function reset() {
  if (numCopies == 2) {
    printImage();
  }
   if (numCopies == 3) {
    printImage();
      printImage();
  }
  numCopies = 1;
  photoNumber++;
  count = 0;
  photos[0] = createGraphics(640, 480);
  photos[1] = createGraphics(640, 480);
  photos[2] = createGraphics(640, 480);
  printOut = createGraphics(600, 1800);
  ready = true;
}

function printImage() {
  serial.write(photoNumber);
  //   try {
  //     File file = new File("/Users/jordan.graves/Desktop/Printing_Photobooth/img"+photoNumber+".png");
  //     Desktop.getDesktop().print(file);
  //   }
  //   catch(Exception e) {
  //     System.out.println("Nope");
  //   }
  photoData.push(data);
}
