// Runs inline in <head>, before anything is drawn, and picks the theme.
// The order is documented in docs/ARCHITECTURE.md ("In the browser"):
//   ?bad=<id>  >  escaped before  >  this visit's theme  >  a random front-door theme
// It's allowed by its hash in the content security policy, which Hugo
// computes at build time, so it can change freely.
(function () {
  var root = document.documentElement;
  root.setAttribute("data-js", "");

  var manifest;
  try {
    manifest = JSON.parse(document.getElementById("tt-manifest").textContent);
  } catch (e) {
    return;
  }

  var ids = [];
  var frontDoor = [];
  manifest.themes.forEach(function (t) {
    ids.push(t.id);
    if (t.front_door && t.id !== "not-bad") frontDoor.push(t.id);
  });
  var valid = function (id) {
    return ids.indexOf(id) > -1;
  };
  var pick = function (list) {
    return list[Math.floor(Math.random() * list.length)];
  };
  var storage = function (name) {
    try {
      var s = window[name];
      s.setItem("tt:probe", "1");
      s.removeItem("tt:probe");
      return s;
    } catch (e) {
      return null;
    }
  };
  var local = storage("localStorage");
  var session = storage("sessionStorage");

  var param = null;
  try {
    param = new URLSearchParams(location.search).get("bad");
  } catch (e) {}

  var theme;
  if (param && valid(param)) {
    theme = param;
    if (session) session.setItem("tt:theme", theme);
  } else if (local && local.getItem("tt:escaped") === "1") {
    theme = "not-bad";
  } else if (session && valid(session.getItem("tt:theme"))) {
    theme = session.getItem("tt:theme");
  } else {
    theme = frontDoor.length ? pick(frontDoor) : "not-bad";
    if (session) session.setItem("tt:theme", theme);
  }

  // A post's front matter can turn the themes off (bad: false) or limit
  // them (bad: [ids]). That changes this page only, not the visit's theme.
  var allow = root.getAttribute("data-bad");
  if (allow === "off") {
    theme = "not-bad";
  } else if (allow && theme !== "not-bad") {
    var allowed = allow.split(" ").filter(valid);
    if (allowed.indexOf(theme) < 0) theme = allowed.length ? pick(allowed) : "not-bad";
  }

  root.setAttribute("data-theme", theme);
})();
