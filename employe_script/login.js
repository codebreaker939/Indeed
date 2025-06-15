document.addEventListener("DOMContentLoaded", function () {
  const signInBtn = document.getElementById("signIn");


  localStorage.setItem("user", JSON.stringify([
    { Email: "employee@test.com", Password: "emp123", Role: "employee" },
    { Email: "employer@test.com", Password: "hr123", Role: "employer" }
  ]));

  signInBtn?.addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("Password").value.trim();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("user")) || [];

    const user = users.find(
      u => u.Email.toLowerCase() === email && u.Password === password
    );

    if (user) {
      alert("Login successful!");

      if (user.Role === "employee") {
        window.location.href = "homePage.html";
      } else if (user.Role === "employer") {
        window.location.href = "/employer_html/emplyrhome.html";
      }
    } else {
      alert("Wrong credentials. Try again.");
    }
  });
});
