document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  if (!form) return; // safety if script loads on another page

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username")?.value.trim();
    const email    = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value;
    const file     = document.getElementById("profilePic")?.files?.[0] || null;

    if (!username || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    // data object matches what profile.js reads
    const baseUser = {
      username,
      email,
      password,            // note: plaintext for demo only
      signupYear: new Date().getFullYear(),
      profilePic: null
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        baseUser.profilePic = reader.result; // base64 image
        localStorage.setItem("user", JSON.stringify(baseUser));
        alert("Account created!");
        window.location.href = "profile.html";
      };
      reader.readAsDataURL(file);
    } else {
      localStorage.setItem("user", JSON.stringify(baseUser));
      alert("Account created!");
      window.location.href = "profile.html";
    }
  });
});

