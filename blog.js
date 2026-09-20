// Get blog ID from URL

let urlParams = new URLSearchParams(window.location.search);

let blogId = urlParams.get("id");

let container = document.getElementById("blogContainer");

// Check blog ID

if (!blogId) {
  container.innerHTML = `

          <div class="message">

            <h2>
              ⚠️ Blog Not Found
            </h2>

            <p>
              No blog ID was provided.
            </p>

            <a
              href="dashboard.html"
              class="back-btn"
            >
              ← Back to Blogs
            </a>

          </div>

        `;

  Swal.fire({
    icon: "warning",
    title: "Blog Not Found",
    text: "No blog ID was provided.",
  });
} else {
  // Get single blog

  db.collection("blogs")
    .doc(blogId)
    .get()

    .then((doc) => {
      // Blog does not exist

      if (!doc.exists) {
        container.innerHTML = `

                <div class="message">

                  <h2>
                    📭 Blog Not Found
                  </h2>

                  <p>
                    This blog does not exist
                    or has been deleted.
                  </p>

                  <a
                    href="dashboard.html"
                    class="back-btn"
                  >
                    ← Back to Blogs
                  </a>

                </div>

              `;

        Swal.fire({
          icon: "warning",
          title: "Blog Not Found",
          text: "This blog does not exist or has been deleted.",
        });

        return;
      }

      // Get blog data

      let b = doc.data();

      let title = b.mytitle || "Untitled";

      let category = b.mycategory || "General";

      let content = b.myconent || "No content available.";

      let image = b.myblog_image || "https://picsum.photos/900/500";

      // Date

      let date = "Recently";

      if (b.createdAt) {
        date = b.createdAt.toDate().toLocaleDateString();
      }

      // Show complete blog

      container.innerHTML = `

              <article class="blog">


                <img
                  class="blog-image"
                  src="${escapeHtml(image)}"
                  alt="Blog image"
                />


                <span class="category">

                  ${escapeHtml(category)}

                </span>


                <h1>

                  ${escapeHtml(title)}

                </h1>


                <p class="date">

                  📅 ${date}

                </p>


                <div class="content">

                  ${escapeHtml(content)}

                </div>


                <a
                  href="dashboard.html"
                  class="back-btn"
                >

                  ← Back to Blogs

                </a>


              </article>

            `;
    })

    // Error

    .catch((error) => {
      console.error("Firestore Error:", error);

      container.innerHTML = `

              <div class="message">

                <h2>
                  ⚠️ Error
                </h2>

                <p>
                  Could not load this blog.
                </p>

                <a
                  href="dashboard.html"
                  class="back-btn"
                >
                  ← Back to Blogs
                </a>

              </div>

            `;

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not load this blog.",
      });
    });
}

// Prevent HTML injection

function escapeHtml(text) {
  if (!text) {
    return "";
  }

  return String(text)
    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");
}