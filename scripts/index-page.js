 let comments = []

const apiKey = "3999575c-a45f-4a17-99d2-bea70a37e6fa"



function addComment() {
    let form = document.querySelector(".comments__comment-box-container")
    form.addEventListener('submit',
    (e) => {
        e.preventDefault()

        if(e.target.name.value.trim() === "" || e.target.comment.value.trim === "") {
            return
        } else {

            axios.post(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`, {
                name: e.target.name.value,
                comment: e.target.comment.value
            }). then(r => {
                displayComment(r.data)
                updateComments()
            })
        
        }   
        e.target.name.value = ""
        e.target.comment.value = ""
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
function displayComment(comment) {
    let n = comment.name
    let d = new Date(comment.timestamp)
    let c = comment.comment

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
    name.classList.add("comments__name")
    name.innerHTML = n
    let date = document.createElement('p')
    date.classList.add("comments__date")
    if((d.getMonth()+1) < 10) {
        date.innerHTML = `0${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
    } else {
        date.innerHTML = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
    }
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
    axios.get(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`)
    .then(r => {
        comments = r.data
        comments.sort(function(a,b){
            return new Date(b.timestamp) - new Date(a.timestamp);
          });
        console.log(comments)
        let commentSection = document.querySelector(".comments__comments-list")
        commentSection.innerHTML = ""
        for(let comment of comments) {
            displayComment(comment)
        }
    })
    .catch(e => {
        console.log(e)
    })
    
}



addComment()
updateComments()
