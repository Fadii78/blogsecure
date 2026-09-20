let loginbtn = () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (email === "" || password === "") {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "fill the blank places",
    });
  } else {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        Swal.fire({
          icon: "success",
          title: "Signed In",
          text: email + password,
        });
        // ...
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";

        if (user.email === ADMIN_EMAIL) {
          window.location.href = "./admin.html";
        } else {
          window.location.href = "./dashboard.html";
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        Swal.fire({
          icon: "error",
          title: errorCode,
          text: errorMessage,
        });
      });
  }
};