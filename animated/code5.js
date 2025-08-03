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
          "https://cdn.glitch.global/07f978dd-567e-4e8f-b80c-384542ce47da/e93d8ae4-46f8-4b4d-a363-c90c43a5b1bf.png",
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
    World.frameRate = 60;
    function draw() {
      if (p5Inst.mouseX != p5Inst.pmouseX || p5Inst.mouseY != p5Inst.pmouseY) {
        onPage = true;
      }
      cursor(AUTO);
      noStroke();
      background(20, 20, 20);
      play.scale = 0.45 + sin(0.3 * millis()) / 20;
      play.scale *= 1.8 * 0.375;
      drawSprites();
      if (onPage) {
        if (mouseIsOver(play)) {
          cursor(HAND);
          push();
          translate(play.x, play.y);
          rotate(45);
          scale(1.8 * 0.375);
          noFill();
          for (var i = -45; i <= 45; i += 9) {
            strokeWeight(15 * sin(millis() / 3 + i));
            if (sin(millis() / 3 + i) > 0) {
              stroke(255, 255, 255, 255 * cos(2 * i));
              arc(
                0,
                0,
                cos(millis() / 3 + i) * (180 + 19.6 * sin(0.3 * millis())),
                180 - 15 * sin(millis() / 3 + i) + 19.6 * sin(0.3 * millis()),
                -90,
                90
              );
            }
          }
          pop();
          if (mouseWentDown("leftButton")) {
            window.open(
              "https://studio.code.org/projects/gamelab/" +
                verID +
                "/embed?nosource"
            );
          }
        }
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