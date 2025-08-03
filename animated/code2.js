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
    //Draws my face
    function me(x, y, b, em, ep) {
      push();
      scale(1, 1.06);
      translate(x, y);
      //hair
      push();
      translate(200, 200);
      fill(20, 19, 18);
      strokeWeight(2);
      stroke(173, 173, 173);
      beginShape();
      curveVertex(-90, -142);
      curveVertex(93, -144);
      curveVertex(104, 16);
      curveVertex(-103, 16);
      curveVertex(-95, -144);
      curveVertex(92, -144);
      curveVertex(200, 96);
      endShape();
      pop();
      //ears
      push();
      translate(0, -8);
      fill(216, 204, 176);
      stroke(0, 0, 0);
      strokeWeight(1);
      bezier(76, 154, 91, 161, 73, 225, 119, 222);
      bezier(324, 154, 309, 161, 327, 225, 281, 222);
      stroke(107, 75, 56);
      fill(220, 197, 178);
      bezier(102, 154, 91, 161, 73, 225, 144, 222);
      bezier(300, 154, 309, 161, 327, 225, 248, 222);
      pop();
      //more hair
      fill(20, 19, 18);
      strokeWeight(1);
      stroke(173, 173, 173);
      ellipse(200, 132, 250, 200);
      stroke(85, 77, 50);
      strokeWeight(2);
      arc(200, 132, 250, 200, -180, 0);
      //head
      fill(216, 204, 176);
      stroke(0, 0, 0);
      strokeWeight(1);
      translate(200, 200);
      beginShape();
      curveVertex(-90, -103);
      curveVertex(90, -103);
      curveVertex(63, 83);
      curveVertex(13, 125);
      curveVertex(-43, 112);
      curveVertex(-75, 61);
      curveVertex(-90, -103);
      curveVertex(90, -103);
      curveVertex(67, 96);
      endShape();
      translate(-200, -200);
      stroke(220, 197, 178);
      strokeWeight(3);
      arc(200, 298, 30, 3, -200, 20);
      strokeWeight(1);
      stroke(64, 52, 33);
      arc(200, 300, 30, 3, -200, 20);
      //mouth
      if (em == "smile") {
        stroke(0, 0, 0);
        arc(200, 266, 78, 4, 0, 180);
      }
      if (em == "frown") {
        stroke(0, 0, 0);
        arc(200, 266, 78, 4, 180, 0);
      }
      if (em == "open") {
        fill(74, 0, 0);
        ellipse(200, 267, 78, 10);
        fill(255, 255, 255);
        arc(200, 266, 78, 7, -180, 0);
      }
      //nose
      stroke(107, 75, 56);
      noFill();
      arc(190, 227, 63, 43.5, -20, 20);
      arc(210, 227, 63, 43.5, -200, -160);
      arc(200, 227, 21, 29, -20, 20);
      arc(200, 227, 21, 29, -200, -160);
      arc(190, 237, 14, -2.9, -360, -180);
      arc(210, 237, 14, -2.9, -360, -180);
      //eyes
      stroke(220, 197, 178);
      fill(220, 197, 178);
      strokeWeight(1);
      arc(146, 167, 56, 52, -224, 35);
      fill(216, 204, 176);
      noStroke();
      ellipse(150, 176, 87, 42);
      stroke(220, 197, 178);
      fill(220, 197, 178);
      strokeWeight(1);
      arc(254, 167, 56, 52, -224, 35);
      fill(216, 204, 176);
      noStroke();
      ellipse(250, 176, 87, 42);
      fill(220, 197, 178);
      stroke(107, 75, 56);
      strokeWeight(1);
      arc(151, 169, 54, 33, 40, 162);
      arc(249, 170, 54, 33, 24, 141);
      noFill();
      arc(147, 175, 67, 37, 216, 314);
      arc(252, 176, 64, 37, 216, 314);
      if (b == false) {
        fill(216, 204, 176);
        noStroke();
        ellipse(151, 174, 54, 21);
        ellipse(249, 174, 54, 21);
        fill(220, 197, 178);
        stroke(107, 75, 56);
        arc(147, 175, 67, 7, 190, 350);
        arc(252, 176, 64, 7, 190, 350);
      } else {
        fill(250, 250, 250);
        stroke(0, 0, 0);
        strokeWeight(2);
        push();
        translate(241, 391);
        rotate(-7);
        scale(1.2, 1.5);
        beginShape();
        curveVertex(-90, -154);
        curveVertex(-63, -158);
        curveVertex(-43, -157);
        curveVertex(-37, -147);
        curveVertex(-57, -146);
        curveVertex(-63, -158);
        curveVertex(90, -179);
        endShape();
        pop();
        push();
        translate(159, 392);
        rotate(7);
        scale(-1.2, 1.5);
        beginShape();
        curveVertex(-90, -154);
        curveVertex(-63, -158);
        curveVertex(-43, -157);
        curveVertex(-37, -147);
        curveVertex(-57, -146);
        curveVertex(-63, -158);
        curveVertex(90, -179);
        endShape();
        pop();
        if (ep == "side") {
          fill(122, 101, 67);
          stroke(0, 0, 0);
          strokeWeight(2);
          arc(126, 173, 33, 32, -30, 30);
          push();
          translate(159, 392);
          rotate(7);
          scale(-1.2, 1.5);
          beginShape();
          curveVertex(-90, -154);
          curveVertex(-48, -157);
          curveVertex(-41, -155);
          curveVertex(-37, -147);
          curveVertex(-49, -146);
          curveVertex(-48, -156);
          curveVertex(-31, -188);
          endShape();
          pop();
          noStroke();
          fill(0, 0, 0);
          ellipse(132, 173, 5, 5);
          ellipse(235, 174, 5, 5);
          fill(255, 255, 255);
          ellipse(150, 171, 1, 1);
          ellipse(252, 171, 1, 1);
        } else {
          fill(250, 250, 250);
          stroke(0, 0, 0);
          strokeWeight(2);
          push();
          translate(227, 391);
          rotate(-7);
          scale(1, 1.5);
          beginShape();
          curveVertex(-90, -154);
          curveVertex(-63, -158);
          curveVertex(-43, -157);
          curveVertex(-28, -147);
          curveVertex(-57, -146);
          curveVertex(-63, -158);
          curveVertex(90, -179);
          endShape();
          pop();
          push();
          translate(173, 392);
          rotate(7);
          scale(-1, 1.5);
          beginShape();
          curveVertex(-90, -154);
          curveVertex(-63, -158);
          curveVertex(-43, -157);
          curveVertex(-28, -147);
          curveVertex(-57, -146);
          curveVertex(-63, -158);
          curveVertex(90, -179);
          endShape();
          pop();
          fill(122, 101, 67);
          stroke(0, 0, 0);
          strokeWeight(2);
          ellipse(149, 172, 15, 15);
          ellipse(251, 172, 15, 15);
          noStroke();
          fill(0, 0, 0);
          ellipse(150, 171, 5, 5);
          ellipse(252, 171, 5, 5);
          fill(255, 255, 255);
          ellipse(150, 171, 1, 1);
          ellipse(252, 171, 1, 1);
        }
      }
      noStroke();
      fill(38, 37, 36);
      //eyebrows
      push();
      translate(194, 299);
      beginShape();
      curveVertex(-90, -140);
      curveVertex(-63, -158);
      curveVertex(-28, -152);
      curveVertex(-26, -145);
      curveVertex(-67, -148);
      curveVertex(-82, -139);
      curveVertex(-63, -158);
      curveVertex(33, -154);
      endShape();
      pop();
      push();
      translate(203, 299);
      scale(-1, 1);
      beginShape();
      curveVertex(-90, -140);
      curveVertex(-63, -158);
      curveVertex(-28, -152);
      curveVertex(-26, -145);
      curveVertex(-67, -148);
      curveVertex(-82, -139);
      curveVertex(-63, -158);
      curveVertex(33, -154);
      endShape();
      pop();
      //line from eyes to nose
      noFill();
      stroke(0, 0, 0);
      strokeWeight(1.2);
      push();
      translate(200, 324);
      beginShape();
      curveVertex(2, -87);
      curveVertex(-10, -111);
      curveVertex(-15, -160);
      curveVertex(-61, -27);
      endShape();
      beginShape();
      curveVertex(-2, -87);
      curveVertex(10, -111);
      curveVertex(15, -160);
      curveVertex(61, -27);
      endShape();
      pop();
      //still more hair
      fill(20, 19, 18);
      strokeWeight(2);
      stroke(84, 84, 84);
      push();
      translate(200, 217);
      scale(1, 1.3);
      beginShape();
      curveVertex(78, -76);
      curveVertex(97, -114);
      curveVertex(101, -64);
      curveVertex(77, -74);
      curveVertex(17, -85);
      curveVertex(-94, -82);
      curveVertex(-101, -107);
      curveVertex(-25, -60);
      endShape();
      pop();
      pop();
    }
    //Draws my logo
    function logo(x, y, s) {
      push();
      translate(x, y);
      scale(s);
      fill(0, 0, 255);
      strokeWeight(5);
      stroke(255, 166, 0);
      ellipse(200, 200, 300, 300);
      push();
      rotate(-10);
      scale(0.8);
      me(-74, 97, true, "smile", "middle");
      pop();
      noStroke();
      fill(255, 255, 255);
      textSize(15);
      textFont("Trebuchet MS");
      textAlign(LEFT, BASELINE);
      text("ASTRONAUT", 224, 125);
      textSize(40);
      textLeading(40);
      text("3\n  2\n    1", 240, 191);
      pop();
    }
    function draw() {
      scale(0.5);
      logo(-38, -38, 1.19);
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