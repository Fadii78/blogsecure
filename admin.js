firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "./login.html";
    return;
  } else if (user.email !== ADMIN_EMAIL) {
    window.location.href = "./dashboard.html";
  }
});

let addblog = () => {
  let title = document.getElementById("title").value;
  let category = document.getElementById("category").value;
  let content = document.getElementById("content").value;
  let blog_image = document.getElementById("blog_image").value;

  if (title === "" || category === "" || content === "" || blog_image === "") {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "fill the blank places",
    });
    return;
  } else {
    db.collection("blogs")
      .add({
        mytitle: title,
        mycategory: category,
        myconent: content,
        myblog_image: blog_image,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Blog successfullly added!",
        });
        document.getElementById("title").value = "";
        document.getElementById("category").value = "";
        document.getElementById("content").value = "";
        document.getElementById("blog_image").value = "";
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error adding blog",
        });
      });
  }
};