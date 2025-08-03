var p5Inst = new p5(null, "sketch");
window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {
    orderedKeys: ["8c4f66d5-5273-4348-81a8-01f61110452f"],
    propsByKey: {
      "8c4f66d5-5273-4348-81a8-01f61110452f": {
        name: "title",
        sourceUrl: null,
        frameSize: { x: 2913, y: 500 },
        frameCount: 9,
        looping: true,
        frameDelay: 60,
        version: "6s1lk39P_yJHwZW5_RiKSYyulbM7D.5t",
        loadedFromSource: true,
        saved: true,
        sourceSize: { x: 2913, y: 4500 },
        rootRelativePath:
          "https://cdn.glitch.global/07f978dd-567e-4e8f-b80c-384542ce47da/8c4f66d5-5273-4348-81a8-01f61110452f.png",
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
    resizeCanvas(800, 800 / 4);
    var x = 800;
    showMobileControls(false, false, false, false);
    var title = createGroup();
    for (var i = 0; i < 9; i++) {
      title.add(createSprite(0, 0));
      title[i].setAnimation("title");
      title[i].setFrame(i);
      title[i].pause();
    }
    title.setScaleEach(0.13);
    var hover = [];
    for (var i = 0; i < 8; i++) {
      hover.push([2 + 1 * random(), 360 * random()]);
    }
    function draw() {
      push();
      translate(x / 2, x / 8);
      scale(800 / 400);
      noStroke();
      background("black");
      for (var i = 1; i < title.length; i++) {
        title[i].y =
          5 * sin(hover[i - 1][0] * (hover[i - 1][1] + millis() / 4));
      }
      drawSprites();
      pop();
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