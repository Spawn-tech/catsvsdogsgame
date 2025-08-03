var p5Inst = new p5(null, "sketch");
function windowResized() {
  resizeCanvas(max(windowWidth, 875), 400);
}
var onPage = false;
function addEvent(obj, evt, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(evt, fn, false);
  } else if (obj.attachEvent) {
    obj.attachEvent("on" + evt, fn);
  }
}
addEvent(window, "load", function (e) {
  addEvent(document, "mouseout", function (e) {
    e = e ? e : window.event;
    var from = e.relatedTarget || e.toElement;
    if (!from || from.nodeName == "HTML") {
      // stop your drag event here
      // for now we can just use an alert
      onPage = false;
    }
  });
});
window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {
    orderedKeys: [
      "e93d8ae4-46f8-4b4d-a363-c90c43a5b1bf",
      "da502135-8122-4cea-aa87-774454649446",
      "e610a11a-5733-4055-ba02-d5de1c96d637",
    ],
    propsByKey: {
      "e93d8ae4-46f8-4b4d-a363-c90c43a5b1bf": {
        name: "playGame",
        sourceUrl: null,
        frameSize: { x: 392, y: 392 },
        frameCount: 1,
        looping: true,
        frameDelay: 12,
        version: "Z.IdV0M1dTcFSYIJYwtGmSvHULjOE4WX",
        categories: ["icons"],
        loadedFromSource: true,
        saved: true,
        sourceSize: { x: 392, y: 392 },
        rootRelativePath:
          "../assets/playbutton.png",
      },
      "da502135-8122-4cea-aa87-774454649446": {
        name: "cat",
        sourceUrl: null,
        frameSize: { x: 45, y: 28 },
        frameCount: 7,
        looping: true,
        frameDelay: 4,
        version: "2qHYWb6yqE3_UEUYzSBRY6Sk_aSNCiFj",
        categories: [""],
        loadedFromSource: true,
        saved: true,
        sourceSize: { x: 90, y: 112 },
        rootRelativePath:
          "../assets/cat.png",
      },
      "e610a11a-5733-4055-ba02-d5de1c96d637": {
        name: "dog",
        sourceUrl: null,
        frameSize: { x: 47, y: 31 },
        frameCount: 8,
        looping: true,
        frameDelay: 4,
        version: "iD8kmyWCgyPVeAkG_WEuBg6qw8O2wQY9",
        categories: [""],
        loadedFromSource: true,
        saved: true,
        sourceSize: { x: 94, y: 124 },
        rootRelativePath:
          "../assets/dog.png",
      },
    },
  };
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
    World.pInst.drawingContext.imageSmoothingEnabled = false;
    resizeCanvas(max(windowWidth, 875), 400);
    showMobileControls(false, false, false, false);
    var rate;
    var pRate;
    var pW = windowWidth;
    var dogs = createGroup();
    var cats = createGroup();
    var cat1 = createSprite(-400, 150);
    cat1.setAnimation("cat");
    cat1.setFrame(2);
    cat1.rotation = 20;
    cat1.scale = 13.5;
    cat1.pause();
    var dog1 = createSprite(800, 170);
    dog1.setAnimation("dog");
    dog1.setFrame(6);
    dog1.rotation = -20;
    dog1.scale = 9;
    dog1.pause();
    var play = createSprite(200, 200);
    play.setAnimation("playGame");
    play.setCollider("circle", 0, 0);
    play.scale = 0;
    var playBtn = -135;
    var cframeBuffer = [];
    var dframeBuffer = [];
    function updatePositions() {
      if (cats.length < 1) {
        for (var i = 0; i < 20; i++) {
          var dog = createSprite(200, 200);
          dog.setAnimation("dog");
          dog.scale = 1.5;
          dog.x = width + 40 + 80 * random();
          dog.y = 23.25 + 353.5 * random();
          dog.velocityX = -0.5 - random();
          dog.velocityX *= rate;
          dog.pause();
          dog.depth = 0;
          dogs.add(dog);
          dframeBuffer.push(randomNumber(0, 7));
          var cat = createSprite(200, 200);
          cat.setAnimation("cat");
          cat.scale = 2;
          cat.x = -50 - 80 * random();
          cat.y = 28 + 344 * random();
          cat.velocityX = 0.5 + random();
          cat.velocityX *= rate;
          cat.pause();
          cat.depth = 0;
          cats.add(cat);
          cframeBuffer.push(randomNumber(0, 6));
        }
      } else {
        for (var d = 0; d < dogs.length; d++) {
          dogs[d].velocityX /= pRate;
          if (dogs[d].x < -35.25) {
            dogs[d].x = width + 40 + 30 * random();
            dogs[d].y = 23.25 + 353.5 * random();
            dogs[d].velocityX = -0.5 - random();
          }
          dframeBuffer[d] += rate / 4;
          dogs[d].velocityX *= rate;
          dogs[d].setFrame(round(dframeBuffer[d]) % 8);
        }
        for (var c = 0; c < cats.length; c++) {
          cats[c].velocityX /= pRate;
          if (cats[c].x > width + 45) {
            cats[c].x = -50 - 30 * random();
            cats[c].y = 28 + 344 * random();
            cats[c].velocityX = 0.5 + random();
          }
          cframeBuffer[c] += rate / 4;
          cats[c].velocityX *= rate;
          cats[c].setFrame(round(cframeBuffer[c]) % 8);
        }
      }
      if (windowWidth != pW) {
        for (var c = 0; c < cats.length; c++) {
          cats[c].x *= windowWidth / pW;
        }
        for (var d = 0; d < dogs.length; d++) {
          dogs[d].x *= windowWidth / pW;
        }
        pW = windowWidth;
      }
    }
    frameRate(60);
    var start = millis();
    function draw() {
      camera.x = width / 2;
      camera.y = height / 2;
      if (p5Inst.mouseX != p5Inst.pmouseX || p5Inst.mouseY != p5Inst.pmouseY) {
        onPage = true;
      }
      rate = min(4.5, 0.06 * (millis() - p5Inst._lastFrameTime));
      cursor("default");
      noStroke();
      background("black");
      cat1.x = -40;
      dog1.x = width + 10;
      play.x = width / 2;
      play.scale = 0.45 + sin(0.3 * millis()) / 20;
      play.scale *= 1.3;
      drawSprites();
      updatePositions();
      push();
      translate(play.x, play.y);
      //fill(255, 0, 0);
      //ellipse(0, 0, 200, 200);
      rotate(45);
      noFill();
      var shiny = false;
      for (var i = -45; i <= 45; i += 9) {
        strokeWeight(15 * sin(playBtn / 3 + i));
        if (sin(playBtn / 3 + i) > 0) {
          shiny = true;
          stroke(255, 255, 255, 255 * cos(2 * i));
          arc(0, 0, cos(playBtn / 3 + i) * (392 * play.scale + 3.6), 392 * play.scale + 3.6 - 15 * sin(playBtn / 3 + i), -90, 90);
        }
      }
      pop();
      pRate = rate;
      if (onPage && mouseIsOver(play)) {
        cursor(HAND);
        if (mouseWentDown("leftButton")) {
          window.open(
            "https://studio.code.org/projects/gamelab/2RZjqfGg85Kp7HYduICk0LA3Ij5sI5hj-yexZdzFsLg/embed?nosource"
          );
        }
        playBtn += rate * 17;
      } else if (!shiny) {
        playBtn = -135;
      } else {
        playBtn += rate * 30;
      }
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
