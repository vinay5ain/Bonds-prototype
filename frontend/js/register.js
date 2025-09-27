// Handle registration form submission
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, name, email })
    });

    const data = await res.json();

    if(res.ok) {
      alert("User registered successfully!");
      window.location.href = "index.html";
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Please try again later.");
  }
});
