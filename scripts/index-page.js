const comments = [];
const apiKey = "3999575c-a45f-4a17-99d2-bea70a37e6fa";

// Function to add a comment
function addComment() {
  const form = document.querySelector(".comments__comment-box-container");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameValue = e.target.name.value.trim();
    const commentValue = e.target.comment.value.trim();

    // Validate name and comment inputs
    if (nameValue === "" || commentValue === "") {
      e.target.name.classList.add("comments__input--error");
      e.target.comment.classList.add("comments__input--error");
      return;
    } else {
      // Remove error class if present
      if (
        e.target.name.classList.contains("comments__input--error") &&
        e.target.comment.classList.contains("comments__input--error")
      ) {
        e.target.name.classList.remove("comments__input--error");
        e.target.comment.classList.remove("comments__input--error");
      }

      // Send POST request to add comment
      axios
        .post(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`, {
          name: nameValue,
          comment: commentValue,
        })
        .then((response) => {
          displayComment(response.data); // Display the new comment
          updateComments(); // Update the comments list
        });
    }

    // Clear input values
    e.target.name.value = "";
    e.target.comment.value = "";
  });
}

// Function to display a comment
function displayComment(comment) {
  const { name, timestamp, comment: text } = comment;
  const d = new Date(timestamp);

  const commentSection = document.querySelector(".comments__comments-list");

  const newComment = document.createElement("div");
  newComment.classList.add("comments__comment");

  const greyCircle = document.createElement("div");
  greyCircle.classList.add("comments__circle");

  const mainBody = document.createElement("div");
  mainBody.classList.add("comments__main");

  const topHalf = document.createElement("div");
  topHalf.classList.add("comments__top");

  const nameElement = document.createElement("p");
  nameElement.classList.add("comments__name");
  nameElement.textContent = name;

  const dateElement = document.createElement("p");
  dateElement.classList.add("comments__date");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const date = d.getDate();
  const year = d.getFullYear();
  dateElement.textContent = `${month}/${date}/${year}`;

  topHalf.appendChild(nameElement);
  topHalf.appendChild(dateElement);

  const content = document.createElement("p");
  content.classList.add("comments__content");
  content.textContent = text;

  mainBody.appendChild(topHalf);
  mainBody.appendChild(content);

  newComment.appendChild(greyCircle);
  newComment.appendChild(mainBody);

  commentSection.appendChild(newComment);
}

// Function to update the comments list
function updateComments() {
  axios
    .get(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`)
    .then((response) => {
      const sortedComments = response.data.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      console.log(sortedComments);

      const commentSection = document.querySelector(".comments__comments-list");
      commentSection.innerHTML = "";

      for (const comment of sortedComments) {
        displayComment(comment);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// Call the functions to add comment and update comments
addComment();
updateComments();
