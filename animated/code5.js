var p5Inst = new p5(null, "sketch");
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
    orderedKeys: ["e93d8ae4-46f8-4b4d-a363-c90c43a5b1bf"],
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
    var verID = getURLParams().i;
    resizeCanvas(150, 150);
    showMobileControls(false, false, false, false);
    var play = createSprite(75, 75);
    play.setAnimation("playGame");
    play.setCollider("circle", 0, 0);
    play.scale = 0;
    var playBtn = -135;
    World.frameRate = 60;
    function draw() {
      if (p5Inst.mouseX != p5Inst.pmouseX || p5Inst.mouseY != p5Inst.pmouseY) {
        onPage = true;
      }
      var rate = min(4.5, 0.06 * (millis() - p5Inst._lastFrameTime));
      cursor(AUTO);
      noStroke();
      background(20, 20, 20);
      play.scale = 0.45 + sin(0.3 * millis()) / 20;
      play.scale *= 0.675;
      drawSprites();
      push();
      translate(play.x, play.y);
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
      if (onPage && mouseIsOver(play)) {
        cursor(HAND);
        if (mouseWentDown("leftButton")) {
          window.open(
            "https://studio.code.org/projects/gamelab/" +
              verID +
              "/embed?nosource"
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
