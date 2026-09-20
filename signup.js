let signbtn = () => {

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
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        Swal.fire({
          icon: "success",
          title: "Signed Up",
          text: email,
        }).then(() => {
          document.getElementById("email").value = "";
          document.getElementById("password").value = "";
          window.location.href = "login.html"
        });
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        Swal.fire({
          icon: "error",
          title: errorCode,
          text: errorMessage,
        });
      });
  }
}

