// Handle bond form submission
document.getElementById("bondForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fromUserId = localStorage.getItem("userId");
  const toUsername = document.getElementById("toUsername").value.trim();
  const pointsGranted = Number(document.getElementById("points").value);
  const message = document.getElementById("message").value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/bonds/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromUserId, toUsername, pointsGranted, message })
    });

    const data = await res.json();

    if(res.ok) {
      alert("Bond request sent!");
      window.location.href = "profile.html";
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Please try again later.");
  }
});
