const apiKey = "3999575c-a45f-4a17-99d2-bea70a37e6fa";

// Function to build the show list
function buildShowList() {
    let showListSection = document.createElement('section');
    showListSection.classList.add("shows-list");

    let showListHeader = document.createElement('h2');
    showListHeader.classList.add("section__header");
    showListHeader.classList.add("shows-list__header");
    showListHeader.innerHTML = "Shows";

    let showListContainer = document.createElement('div');
    showListContainer.classList.add("shows-list__list-container");

    let topLabelContainer = document.createElement('div');
    topLabelContainer.classList.add("shows-list__top-labels-container");

    // Loop to create top labels for DATE, VENUE, LOCATION
    for(let labelType of ["DATE", "VENUE", "LOCATION"]) {
        let labelContainer = document.createElement('div');
        labelContainer.classList.add("shows-list__top-label-container");
        let label = document.createElement('p');
        label.classList.add("shows-list__label");
        label.classList.add("shows-list__top-label");
        label.innerHTML = labelType;
        labelContainer.appendChild(label);
        topLabelContainer.appendChild(labelContainer);
    }

    showListContainer.appendChild(topLabelContainer);

    let showList = document.createElement('div');
    showList.classList.add("shows-list__list");

    showListContainer.appendChild(showList);

    showListSection.appendChild(showListHeader);
    showListSection.appendChild(showListContainer);

    document.querySelector("main").appendChild(showListSection);

    // Fetch show data using Axios and populate the show list
    axios.get(`https://project-1-api.herokuapp.com/showdates?api_key=${apiKey}`)
    .then(r => {
        let shows = [];
        shows = r.data;
        for(let show of shows) {
            let newDate = new Date(show.date).toDateString();
            showList.appendChild(buildShow(newDate, show.place, show.location));
        }
    }).catch(e => {
        console.log(e);
    });
}

// Function to build an individual show
function buildShow(date, venue, location) {
    let newShow = document.createElement('div');
    newShow.classList.add("shows-list__show");

    let showSectionHolder = document.createElement('div');
    showSectionHolder.classList.add("shows-list__section");
    let label = document.createElement('p');
    label.classList.add("shows-list__label");
    label.innerHTML = "DATE";
    let content = document.createElement('p');
    content.classList.add("shows-list__content");
    content.classList.add("shows-list__content--bolded");
    content.innerHTML = date;
    showSectionHolder.appendChild(label);
    showSectionHolder.appendChild(content);
    newShow.appendChild(showSectionHolder);

    showSectionHolder = document.createElement('div');
    showSectionHolder.classList.add("shows-list__section");
    label = document.createElement('p');
    label.classList.add("shows-list__label");
    label.innerHTML = "VENUE";
    content = document.createElement('p');
    content.classList.add("shows-list__content");
    content.innerHTML = venue;
    showSectionHolder.appendChild(label);
    showSectionHolder.appendChild(content);
    newShow.appendChild(showSectionHolder);

    showSectionHolder = document.createElement('div');
    showSectionHolder.classList.add("shows-list__section");
    label = document.createElement('p');
    label.classList.add("shows-list__label");
    label.innerHTML = "LOCATION";
    content = document.createElement('p');
    content.classList.add("shows-list__content");
    content.innerHTML = location;
    showSectionHolder.appendChild(label);
    showSectionHolder.appendChild(content);
    newShow.appendChild(showSectionHolder);

    showSectionHolder = document.createElement('div');
    showSectionHolder.classList.add("shows-list__section");
    let button = document.createElement('button');
    button.classList.add("button");
    button.classList.add("shows-list__button");
    button.innerHTML = "BUY TICKETS";
    showSectionHolder.appendChild(button);
    newShow.appendChild(showSectionHolder);

    return newShow;
}

// Function to handle click event on shows
function showClicked() {
    let lastClicked = undefined;
    let show = document.querySelector(".shows-list__list");
    show.addEventListener("click", (e) => {
        if(lastClicked !== undefined) {
            lastClicked.classList.remove("shows-list__show--clicked");
        }
        lastClicked = e.target.closest(".shows-list__show");
        lastClicked.classList.add("shows-list__show--clicked");
    });
}

// Call the functions to build the show list and handle clicks
buildShowList();
showClicked();
