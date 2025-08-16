


document.addEventListener("DOMContentLoaded", () => {
  // achievements (safe-guarded)
  if (window.Ach) {
    window.Ach.unlock('profile_view');
    window.Ach.renderAchievements();
  }

  // load user
  let userRaw = localStorage.getItem("user");
  let userData;
  try { userData = JSON.parse(userRaw || "{}"); } catch { userData = {}; }

  if (!userData || !userData.username) {
    alert("No user found. Please sign up first.");
    window.location.href = "signup.html";
    return;
  }

  // Elements
  const welcomeStrong = document.querySelector(".profile-info p strong");
  const joinLine      = document.getElementById("joinLine");
  const profileImg    = document.getElementById("profileImage");

  const editPanel     = document.getElementById("editPanel");
  const editForm      = document.getElementById("editForm");
  const editUsername  = document.getElementById("editUsername");
  const editEmail     = document.getElementById("editEmail");
  const editPassword  = document.getElementById("editPassword");
  const editProfilePic= document.getElementById("editProfilePic");
  const removePicBtn  = document.getElementById("removePicBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  const logoutBtn     = document.getElementById("logoutBtn");

  // start hidden via class (works with !important)
  editPanel.classList.add("hidden");

  // Fill UI
  welcomeStrong.textContent = `Welcome ${userData.username}`;
  const year = userData.signupYear || new Date().getFullYear();
  joinLine.innerHTML = `Joined ${year} – <a href="#" id="editProfileLink" style="color:#00ff84;">Edit Profile</a>`;

  if (userData.profilePic) {
    profileImg.src = userData.profilePic;
  } else {
    profileImg.removeAttribute("src");
  }

  // Open editor on link click
  document.getElementById("editProfileLink").addEventListener("click", (e) => {
    e.preventDefault();
    openEditor();
  });

  function openEditor() {
    editUsername.value = userData.username || "";
    editEmail.value    = userData.email || "";
    editPassword.value = "";
    editPanel.classList.remove("hidden");
  }

  // No preview behavior on file select
  editProfilePic.addEventListener("change", () => {
    // intentionally empty (no preview)
  });

  // Remove current picture (just clear stored value)
  removePicBtn.addEventListener("click", () => {
    userData.profilePic = null;
  });

  // Save changes
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newUsername = editUsername.value.trim();
    const newEmail    = editEmail.value.trim();
    const newPassword = editPassword.value.trim();

    if (newUsername) userData.username = newUsername;
    if (newEmail)    userData.email    = newEmail;
    if (newPassword) userData.password = newPassword;

    const file = editProfilePic.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        userData.profilePic = reader.result; // base64
        saveAndReload();
      };
      reader.readAsDataURL(file);
    } else {
      // if remove was clicked earlier, profilePic is already null
      saveAndReload();
    }
  });

  function saveAndReload() {
    localStorage.setItem("user", JSON.stringify(userData));
    if (window.Ach) window.Ach.unlock('profile_edit');
    location.reload();
  }

  // Cancel edit
  cancelEditBtn.addEventListener("click", () => {
    editPanel.classList.add("hidden");
    editForm.reset(); // optional: clears inputs
  });

  // Log out
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "signup.html";
  });
});
