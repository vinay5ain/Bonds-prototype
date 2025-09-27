const userId = localStorage.getItem("userId");

async function fetchProfile() {
  try {
    const res = await fetch(`http://localhost:5000/api/user/${userId}`);
    const user = await res.json();

    document.getElementById("name").innerText = user.name;
    document.getElementById("email").innerText = user.email;
    document.getElementById("bondPoints").innerText = user.bondPoints;
    document.getElementById("totalBonds").innerText = user.totalBonds;

    const notifList = document.getElementById("notifications");
    notifList.innerHTML = "";
    user.notifications.forEach(n => {
      const li = document.createElement("li");
      li.innerText = `${n.fromUser?.username || 'User'}: ${n.message}`;
      notifList.appendChild(li);
    });
  } catch(err) {
    console.error(err);
    alert("Failed to load profile.");
  }
}

async function fetchGrantedBonds() {
  try {
    const res = await fetch(`http://localhost:5000/api/bonds/granted/${userId}`);
    const bonds = await res.json();

    const bondList = document.getElementById("grantedBonds");
    bondList.innerHTML = "";
    bonds.forEach(b => {
      const li = document.createElement("li");
      li.innerText = `${b.fromUser.username}: ${b.pointsGranted} pts - "${b.message}"`;
      bondList.appendChild(li);
    });
  } catch(err) {
    console.error(err);
    alert("Failed to load granted bonds.");
  }
}

// Initial fetch
fetchProfile();
fetchGrantedBonds();
