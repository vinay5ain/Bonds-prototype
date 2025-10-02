// Smooth scroll for internal anchor links
document.addEventListener("click", function (e) {
  var t = e.target;
  if (t && t.matches('a[href^="#"]')) {
    var href = t.getAttribute("href");
    var el = document.querySelector(href);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
  }
});

function syncAuthButtons() {
  var hasToken = !!localStorage.getItem("token");
  var loginBtn = document.getElementById("loginBtn");
  var registerBtn = document.getElementById("registerBtn");
  var profileBtn = document.getElementById("profileBtn");
  var logoutBtn = document.getElementById("logoutBtn");
  if (loginBtn) loginBtn.style.display = hasToken ? "none" : "inline-flex";
  if (registerBtn) registerBtn.style.display = hasToken ? "none" : "inline-flex";
  if (profileBtn) profileBtn.style.display = hasToken ? "inline-flex" : "none";
  if (logoutBtn) logoutBtn.style.display = hasToken ? "inline-flex" : "none";
}

document.addEventListener("DOMContentLoaded", function () {
  syncAuthButtons();
  var loginBtn = document.getElementById("loginBtn");
  var registerBtn = document.getElementById("registerBtn");
  var profileBtn = document.getElementById("profileBtn");
  var logoutBtn = document.getElementById("logoutBtn");
  if (loginBtn) loginBtn.addEventListener("click", function () { window.location.href = "login.html"; });
  if (registerBtn) registerBtn.addEventListener("click", function () { window.location.href = "register.html"; });
  if (profileBtn) profileBtn.addEventListener("click", function () { window.location.href = "profile.html"; });
  if (logoutBtn) logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    syncAuthButtons();
    window.location.href = "index.html";
  });
});

// Smooth scroll for internal links
document.addEventListener("click", function (e) {
  const target = e.target;
  if (target.matches('a[href^="#"]')) {
    const href = target.getAttribute("href");
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

// Auth-aware navbar buttons
function syncAuthButtons() {
  const hasToken = !!localStorage.getItem("token");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const profileBtn = document.getElementById("profileBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginBtn) loginBtn.style.display = hasToken ? "none" : "inline-flex";
  if (registerBtn) registerBtn.style.display = hasToken ? "none" : "inline-flex";
  if (profileBtn) profileBtn.style.display = hasToken ? "inline-flex" : "none";
  if (logoutBtn) logoutBtn.style.display = hasToken ? "inline-flex" : "none";
}

document.addEventListener("DOMContentLoaded", function () {
  syncAuthButtons();

  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const profileBtn = document.getElementById("profileBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginBtn) loginBtn.addEventListener("click", function () { window.location.href = "login.html"; });
  if (registerBtn) registerBtn.addEventListener("click", function () { window.location.href = "register.html"; });
  if (profileBtn) profileBtn.addEventListener("click", function () { window.location.href = "profile.html"; });
  if (logoutBtn) logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    syncAuthButtons();
    window.location.href = "index.html";
  });
});


