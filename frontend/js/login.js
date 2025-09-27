// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if(res.ok) {
      // Store token and userId in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      // Redirect to profile page
      window.location.href = "profile.html";
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Please try again later.");
  }
});
