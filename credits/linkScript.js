window.onload = function () {
  document
    .getElementById("allCredits")
    .querySelectorAll("a")
    .forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
};