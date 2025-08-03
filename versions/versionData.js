var verData = [
  ["0.0", "May 30, 2025", "2RZjqfGg85Kp7HYduICk0LA3Ij5sI5hj-yexZdzFsLg", ["Initial demo release"]],
];
var formattedData = "";
for (var i = 0; i < verData.length; i++) {
  formattedData +=
    '<div class="sectionBox"><iframe class="button" align="left" width="150" height="150" src="../animated/smallplaybutton.html?i=' +
    verData[i][2] +
    '"></iframe><h6><a href="https://studio.code.org/projects/gamelab/' +
    verData[i][2] +
    '/embed?nosource">v' +
    verData[i][0] +
    " - Released " +
    verData[i][1] +
    '</a></h6><div class="notes"><p>- ' +
    verData[i][3].join("<br>- ") +
    "</p></div></div>";
}
window.onload = function () {
  document.getElementById("contentBox").innerHTML = formattedData;
};
