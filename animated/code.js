var p5Inst = new p5(null, "sketch");
window.preload = function () {
  initMobileControls(p5Inst);
  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = { orderedKeys: [], propsByKey: {} };
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
        image,
        props.frameSize.x,
        props.frameSize.y,
        frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] =
        loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay =
        props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === "preload") {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
    // -----
    showMobileControls(false, false, false, false);
    //credit to Green Ghost on KA for the outline text function code
    //the original program was lost to time, but here's his profile if you're intrested
    //https://www.khanacademy.org/profile/GreenGhost1
    function outlineText(t, x, y, size, fillColor, strokeColor) {
      textSize(size);
      fill(strokeColor);
      for (var i = 0; i < 30; i++) {
        text(t, x + (sin(i * 12) * size) / 20, y + (cos(i * 12) * size) / 20);
      }
      fill(fillColor);
      text(t, x, y);
    }
    //draws the robot (main part of the logo)
    //leave the values for the dials and meters on the body empty to animate them
    function robot(
      x,
      y,
      size,
      rotation,
      consoleText,
      temp,
      energyDial,
      fuelDial,
      time,
      radarLine,
      radarPoints
    ) {
      if (x == undefined) {
        x = 0;
      }
      if (y == undefined) {
        y = 0;
      }
      if (size == undefined) {
        size = 1;
      }
      if (rotation == undefined) {
        rotation = 0;
      }
      if (consoleText == undefined) {
        consoleText =
          "TmV2ZXIgZ29ubmEgZ2l2ZSB5b3\nUgdXAgTmV2ZXIgZ29ubmEgbGV0\nIHlvdSBkb3duIE5ldmVyIGdvbm\n5hIHJ1biBhcm91bmQgYW5kIGRl\nc2VydCB5b3UgTmV2ZXIgZ29u";
      }
      if (temp == undefined) {
        temp = 50 * sin(millis() / 8) + 50;
      } else {
        temp = constrain(temp, 0, 100);
      }
      if (energyDial == undefined) {
        energyDial = millis() / 40;
      }
      if (fuelDial == undefined) {
        fuelDial = -millis() / 8;
      }
      if (time == undefined) {
        time = [];
      }
      if (time[0] == undefined) {
        time[0] = hour();
      }
      if (time[1] == undefined) {
        time[1] = minute();
      }
      if (time[2] == undefined) {
        time[2] = second();
      }
      if (radarLine == undefined) {
        radarLine = millis() / 5;
      }
      if (radarPoints == undefined) {
        radarPoints = [];
      }
      translate(x, y);
      rotate(rotation);
      scale(size);
      noStroke();
      //neck
      fill(214, 214, 214);
      quad(25, -24, 39, 21, -39, 21, -25, -24);
      //hover thing
      fill(0, 175, 255);
      ellipse(0, 135, 70, 30);
      fill(145, 145, 145);
      rect(-39, 129, 78, 10);
      //left arm
      beginShape();
      vertex(-95, 85);
      bezierVertex(-140, 10, -100, -30, -25, 15);
      bezierVertex(-95, 15, -95, 15, -95, 85);
      endShape();
      //right arm
      beginShape();
      vertex(95, 85);
      bezierVertex(140, 10, 100, -30, 25, 15);
      bezierVertex(95, 15, 95, 15, 95, 85);
      endShape();
      //body
      fill(145, 145, 145);
      rect(-65, -10, 130, 140, 30);
      //left hand
      stroke(0, 0, 0);
      strokeWeight(9);
      //left thumb
      line(-86, 72, -69, 83);
      //left index
      line(-85, 72, -78, 100);
      //left middle
      line(-96, 72, -89, 100);
      //left ring
      line(-107, 72, -100, 100);
      //left pinky
      line(-116, 80, -111, 100);
      //left forehand
      noStroke();
      fill(255, 0, 0);
      arc(-98, 81, 44, 63, -195, -15);
      fill(255, 255, 0);
      ellipse(-100, 67, 10, 10);
      //right hand
      stroke(0, 0, 0);
      strokeWeight(9);
      //right thumb
      line(85, 72, 68, 83);
      //right index
      line(84, 72, 77, 100);
      //right middle
      line(95, 72, 88, 100);
      //right ring
      line(106, 72, 99, 100);
      //right pinky
      line(115, 80, 110, 100);
      //right forehand
      noStroke();
      fill(255, 0, 0);
      arc(98, 81, 44, 63, -165, 15);
      fill(255, 255, 0);
      ellipse(100, 67, 10, 10);
      //left bolt
      beginShape();
      fill("gold");
      vertex(-30, -91);
      vertex(-48, -92);
      vertex(-48, -119);
      vertex(-63, -120);
      vertex(-64, -129);
      vertex(-90, -150);
      vertex(-49, -150);
      vertex(-47, -132);
      vertex(-30, -127);
      endShape(CLOSE);
      //right bolt
      beginShape();
      vertex(30, -91);
      vertex(48, -92);
      vertex(48, -119);
      vertex(63, -120);
      vertex(64, -129);
      vertex(90, -150);
      vertex(49, -150);
      vertex(47, -132);
      vertex(30, -127);
      endShape(CLOSE);
      //head
      fill(145, 145, 145);
      rect(-53, -111, 106, 89, 25);
      //visor
      beginShape();
      fill(0, 0, 0);
      stroke(0, 0, 255);
      strokeWeight(1);
      curveVertex(0, -81);
      curveVertex(-40, -71);
      curveVertex(-40, -101);
      curveVertex(40, -101);
      curveVertex(40, -71);
      curveVertex(0, -81);
      curveVertex(-40, -71);
      curveVertex(-40, -101);
      endShape();
      //mouth
      stroke(0, 0, 0);
      noFill();
      bezier(-30, -61, -20, -21, 20, -21, 30, -61);
      //console
      fill(30, 30, 30);
      strokeWeight(2);
      stroke(200, 200, 200);
      rect(-30, 0, 80, 40, 10);
      noStroke();
      fill(0, 255, 0);
      textAlign(LEFT, TOP);
      textFont("monospace");
      textSize(5);
      text(consoleText, -25, 5, 73, 31);
      //thermometer
      stroke("white");
      strokeWeight(16);
      line(-45, 10, -45, 110);
      noStroke();
      fill("white");
      ellipse(-45, 106, 25, 25);
      fill(2.55 * temp, 0, 255 - 2.55 * temp);
      ellipse(-45, 106, 18, 18);
      stroke(2.55 * temp, 0, 255 - 2.55 * temp);
      strokeWeight(8);
      line(-45, 100 - 0.9 * temp, -45, 105);
      //energy dial
      translate(-9, 64);
      noStroke();
      fill("white");
      ellipse(0, 0, 35, 35);
      fill(100, 100, 100);
      ellipse(0, 10, 5, 5);
      fill(150, 150, 150);
      rect(-2.9, 0, 5.8, 11, 1);
      fill("yellow");
      ellipse(0, -3, 15, 15);
      quad(-7, 0, 7, 0, 3, 8, -3, 8);
      fill("lightyellow");
      ellipse(3, -5, 4.5, 4.5);
      rotate(energyDial);
      fill("black");
      ellipse(0, 0, 5, 5);
      rect(-1.5, 0, 3, 15);
      ellipse(0, 15, 3, 3);
      rotate(-energyDial);
      stroke(50, 50, 50);
      strokeWeight(2);
      for (var i = 0; i < 360; i += 30) {
        rotate(i);
        line(0, 13, 0, 17);
        rotate(-i);
      }
      stroke("red");
      line(0, 10, 0, 17);
      translate(9, -64);
      //fuel dial
      translate(31, 64);
      noStroke();
      fill("white");
      ellipse(0, 0, 35, 35);
      fill("black");
      arc(9, -2, 12, 12, 180, -90);
      fill("white");
      arc(9, -2, 8, 8, 180, -90);
      fill(220, 0, 0);
      rect(-7.5, -3, 15, 15, 3);
      rect(-7.5, -7, 10, 15, 3);
      triangle(0, 0, 1.1, -6.5, 7, -1.7);
      stroke("white");
      strokeWeight(2);
      line(-5.2, -4.3, 0.8, -4.3);
      noStroke();
      rotate(fuelDial);
      fill("black");
      ellipse(0, 0, 5, 5);
      rect(-1.5, 0, 3, 15);
      ellipse(0, 15, 3, 3);
      rotate(-fuelDial);
      stroke(50, 50, 50);
      strokeWeight(2);
      for (var i = 0; i < 360; i += 30) {
        rotate(i);
        line(0, 13, 0, 17);
        rotate(-i);
      }
      stroke("red");
      line(0, 10, 0, 17);
      translate(-31, -64);
      //clock
      fill("white");
      noStroke();
      translate(-9, 104);
      ellipse(0, 0, 35, 35);
      fill("black");
      textAlign(CENTER, CENTER);
      textFont("monospace");
      textSize(6);
      for (var i = 1; i < 13; i++) {
        text(i, 13 * sin(30 * i), 1 - 13 * cos(30 * i));
      }
      rotate(30 * time[0] + time[1] / 2 + time[2] / 120);
      rect(-1.25, 0, 2.5, -10);
      ellipse(0, -10, 2.5, 2.5);
      rotate(5.5 * time[1] + (11 * time[2]) / 120 - 30 * time[0]);
      rect(-1.25, 0, 2.5, -15);
      ellipse(0, -15, 2.5, 2.5);
      rotate(5.9 * time[2] - 6 * time[1]);
      fill("orange");
      rect(-1, 0, 2, -15);
      ellipse(0, -15, 2, 2);
      rotate(-6 * time[2]);
      fill("black");
      ellipse(0, 0, 5, 5);
      translate(9, -104);
      //radar
      translate(31, 104);
      noStroke();
      fill(1, 66, 37);
      ellipse(0, 0, 35, 35);
      fill(0, 200, 0);
      for (var i = 0; i < 360; i += 45) {
        rotate(i);
        rect(-0.5, 0, 1, 17.5);
        rotate(-i);
      }
      noFill();
      stroke(0, 200, 0);
      strokeWeight(1);
      for (var i = 17.5; i <= 35; i += 8.75) {
        ellipse(0, 0, i, i);
      }
      var tX;
      var tY;
      for (var i = 0; i < radarPoints.length; i++) {
        if (radarPoints[i][2]) {
          tX = -Math.min(17.5, radarPoints[i][1]) * sin(radarPoints[i][0]);
          tY = Math.min(17.5, radarPoints[i][1]) * cos(radarPoints[i][0]);
        } else {
          tX =
            radarPoints[i][0] *
            Math.min(
              1,
              17.5 /
                Math.sqrt(
                  Math.pow(radarPoints[i][0], 2) +
                    Math.pow(radarPoints[i][1], 2)
                )
            );
          tY =
            radarPoints[i][1] *
            Math.min(
              1,
              17.5 /
                Math.sqrt(
                  Math.pow(radarPoints[i][0], 2) +
                    Math.pow(radarPoints[i][1], 2)
                )
            );
        }
        translate(tX, tY);
        stroke(0, 255, 0);
        strokeWeight(1.3);
        line(2, 2, -2, -2);
        line(2, -2, -2, 2);
        translate(-tX, -tY);
      }
      noStroke();
      for (var i = radarLine; i >= radarLine - 60; i -= 4) {
        rotate(i);
        if (i == radarLine) {
          fill(0, 255, 0);
          rect(-1, 0, 2, 16.5);
          ellipse(0, 16.5, 2, 2);
          ellipse(0, 0, 5, 5);
        } else {
          fill(0, 255, 0, 3 * (60 - radarLine + i));
          triangle(0, 0, -2, 17.5, 2, 17.5);
        }
        rotate(-i);
      }
      noFill();
      stroke(145, 145, 145);
      strokeWeight(3);
      ellipse(0, 0, 39, 39);
      translate(-31, -104);
      scale(1 / size);
      rotate(-rotation);
      translate(-x, -y);
    }
    //backdrop for the logo
    //requires the other 2 functions for additional things in the foreground
    function backdrop(x, y, size, rotation, curve, bot, name) {
      //setup
      if (x == undefined) {
        x = 0;
      }
      if (y == undefined) {
        y = 0;
      }
      if (size == undefined) {
        size = 405;
      }
      if (rotation == undefined) {
        rotation = 0;
      }
      if (curve == undefined) {
        curve = 200;
      }
      curve = constrain(curve, 0, 200);
      if (curve == 25) {
        curve += (2 * round(random()) - 1) * 4e-15;
      }
      if (bot == undefined) {
        bot = true;
      }
      if (name == undefined) {
        name = true;
      }
      translate(x, y);
      rotate(rotation);
      scale(size / 405);
      //sky and cropped ground (kinda complicated)
      noStroke();
      fill("cyan");
      rect(-200, -200, 400, 400, curve);
      fill("lime");
      ellipse(200 - curve, 200 - curve, 2 * curve, 2 * curve);
      ellipse(curve - 200, 200 - curve, 2 * curve, 2 * curve);
      fill("cyan");
      stroke("cyan");
      strokeWeight(1);
      arc(
        200 - curve,
        200 - curve,
        2 * curve,
        2 * curve,
        180 - asin((curve - 50) / curve),
        asin((curve - 50) / curve)
      );
      arc(
        curve - 200,
        200 - curve,
        2 * curve,
        2 * curve,
        180 - asin((curve - 50) / curve),
        asin((curve - 50) / curve)
      );
      line(
        200 - curve,
        min(200 - curve, 149),
        200 - curve + sqrt(sq(curve) - sq(150 + curve - 200)),
        150
      );
      line(
        curve - 200,
        min(200 - curve, 149),
        curve - 200 - sqrt(sq(curve) - sq(150 + curve - 200)),
        150
      );
      noStroke();
      triangle(
        200 - curve,
        200 - curve,
        200 - curve - sqrt(sq(curve) - sq(150 + curve - 200)),
        150,
        200 - curve + sqrt(sq(curve) - sq(150 + curve - 200)),
        150
      );
      triangle(
        curve - 200,
        200 - curve,
        curve - 200 + sqrt(sq(curve) - sq(150 + curve - 200)),
        150,
        curve - 200 - sqrt(sq(curve) - sq(150 + curve - 200)),
        150
      );
      fill("lime");
      noStroke();
      rect(200 - curve, 150, curve, max(50 - curve, 0));
      rect(-200, 150, curve, max(50 - curve, 0));
      rect(curve - 200, 150, 400 - 2 * curve, 50);
      //sun
      fill("yellow");
      ellipse(100, -90, 120, 120);
      //clouds
      fill("white");
      ellipse(-45, -120, 140, 70);
      ellipse(-105, -70, 110, 65);
      //robot option
      if (bot) {
        robot(0, 15);
      }
      //username option
      noStroke();
      textAlign(CENTER, CENTER);
      if (name) {
        outlineText("Spawntech\nProgramming", 0, 0, 55, "white", "black");
      }
      //border
      noFill();
      stroke(180, 0, 0);
      strokeWeight(5);
      rect(-200, -200, 400, 400, curve);
      scale(405 / size);
      rotate(-rotation);
      translate(-x, -y);
    }
    function draw() {
      scale(0.5);
      World.frameRate = 60;
      clear();
      backdrop(200, 200, 400, 0, 200);
    }
    // -----
    try {
      window.draw = draw;
    } catch (e) {}
    switch (stage) {
      case "preload":
        if (preload !== window.preload) {
          preload();
        }
        break;
      case "setup":
        if (setup !== window.setup) {
          setup();
        }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode("preload");
};

window.setup = function () {
  window.wrappedExportedCode("setup");
};