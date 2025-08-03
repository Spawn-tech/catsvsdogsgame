var verData = [
  [
    "2.0",
    "July 1, 2026",
    "6DT2eKOuVZAZ3CgdPl-mzxnwHOLRn689ON9xaAsFLi9",
    [
      "first test",
      "yayyyyyyyyyyyyyy  askdja skjdl;aksjd;laksdjf;a lskdjf a;sldk ja;lsdkjfa;lsjajaksjdkflasdfkja;",
      "more text",
      "i ran out of ideas",
      "is this too much yet?",
      "probablynot",
    ],
  ],
  [
    "1.0",
    "May 10, 2025",
    "01010010110010",
    ["Full release", "moar levels", "cool stuff"],
  ],
  ["0.2", "March 28, 2025", "apoeifja903-j2r-0293rj", ["Bug fixes"]],
  ["0.1", "March 27, 2025", "fjaslkdjfaps", ["Demo release"]],
];
var formattedData = "";
for (var i = 0; i < verData.length; i++) {
  formattedData +=
    '<div class="sectionBox"><iframe class="button" align="left" width="150" height="150" src="../animated/smallplaybutton.html?i=' +
    verData[i][2] +
    '"></iframe><h6>v' +
    verData[i][0] +
    " - Released " +
    verData[i][1] +
    '</h6><div class="notes"><p>- ' +
    verData[i][3].join("<br>- ") +
    "</p></div></div>";
}
window.onload = function () {
  document.getElementById("contentBox").innerHTML = formattedData;
};
