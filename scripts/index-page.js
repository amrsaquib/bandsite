let comments = [{ name: 'Connor Walton', comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.", date: "2/17/2021" },
{ name: 'Emilie Beach', comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.", date: "1/9/2021" },
{ name: 'Miles Acosta', comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.", date: "12/20/2020" }]





function addComment() {
    let form = document.querySelector(".comments__comment-box-container")
    form.addEventListener('submit',
    (e) => {
        e.preventDefault()
        let newComment = {}
        newComment.name = e.target.name.value;
        newComment.comment = e.target.comment.value
        let date = new Date()
        newComment.date = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
        comments.unshift(newComment)
        updateComments()
    })
}

/*
<div class="comments__comment">
    <div class="comments__circle"></div>
    <div class="comments__main">
        <div class="comments__top"><p class="comments__name"></p> <p class="comments__date"></p></div>
        <div class="comments__content"></div>
    </div>
</div>
*/
function displayComments(n, d, c) {
    let commentSection = document.querySelector(".comments__comments-list")

    let newComment = document.createElement('div')
    newComment.classList.add("comments__comment")

    let greyCircle = document.createElement('div')
    greyCircle.classList.add("comments__circle")

    let mainBody = document.createElement('div')
    mainBody.classList.add("comments__main")

    let topHalf = document.createElement('div')
    topHalf.classList.add("comments__top")
    let name = document.createElement('p')
    name.innerHTML = n
    let date = document.createElement('p')
    date.innerHTML = d
    topHalf.appendChild(name)
    topHalf.appendChild(date)

    let content = document.createElement('p')
    content.classList.add("comments__content")
    content.innerHTML = c


    mainBody.appendChild(topHalf)
    mainBody.appendChild(content)

    newComment.appendChild(greyCircle)
    newComment.appendChild(mainBody)

    commentSection.appendChild(newComment)
}

function updateComments() {
    let commentSection = document.querySelector(".comments__comments-list")
    commentSection.innerHTML = ""
    for(let comment of comments) {
        displayComments(comment.name, comment.date, comment.comment)
    }
}



addComment()
updateComments()
