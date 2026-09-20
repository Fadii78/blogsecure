// Blog container

let container = document.getElementById("blogContainer");

// Get blogs from Firestore

db.collection("blogs")

  .orderBy("createdAt", "desc")

  .onSnapshot(
    // SUCCESS

    (mydata) => {
      // Check if no blogs

      if (mydata.empty) {
        container.innerHTML = `

                <div class="message">

                  <h2>📭 No Blogs Yet</h2>

                  <p>
                    Admin has not added any blog yet.
                    Please check back later.
                  </p>

                </div>

              `;

        Swal.fire({
          icon: "info",
          title: "No Blogs Yet",
          text: "Admin has not added any blog yet. Please check back later.",
        });

        return;
      }

      // Empty HTML

      let html = "";

      // Get every blog

      mydata.forEach((doc) => {
        let b = doc.data();

        // Blog title

        let title = b.mytitle || "Untitled";

        // Blog category

        let category = b.mycategory || "General";

        // Blog content

        let content = b.myconent || "No content.";

        // Blog image

        let image = b.myblog_image || "https://picsum.photos/600/300";

        // Date

        let date = "Recently";

        if (b.createdAt) {
          date = b.createdAt.toDate().toLocaleDateString();
        }

        // Short content

        let shortContent = shortText(content, 120);

        // Create card

        html += `

                <div class="blog-card">

                  <img
                    src="${escapeHtml(image)}"
                    alt="Blog image"
                  />


                  <div class="blog-info">

                    <span class="category">

                      ${escapeHtml(category)}

                    </span>


                    <h2>

                      ${escapeHtml(title)}

                    </h2>


                    <p>

                      ${escapeHtml(shortContent)}

                    </p>

                    <a
                      href="blog.html?id=${doc.id}"
                      class="read-more"
                    >

                      Read More →

                    </a>
                   <br />
                   <br />
                    <small>

                      📅 ${date}

                    </small>


                    

                  </div>

                </div>

              `;
      });

      // Show cards

      container.innerHTML = html;
    },

    // ERROR

    (error) => {
      console.error("Firestore Error:", error);

      container.innerHTML = `

              <div class="message">

                <h2>⚠️ Error</h2>

                <p>
                  Could not load blogs.
                  Please try again later.
                </p>

              </div>

            `;

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not load blogs. Please try again later.",
      });
    },
  );

// Short text function

function shortText(text, limit) {
  if (!text) {
    return "No content.";
  }

  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }

  return text;
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