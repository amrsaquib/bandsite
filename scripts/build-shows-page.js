
/* 
            <div class="shows-list__show">
                <div class="shows-list__section">
                    <p class="shows-list__label">DATE</p>
                    <p class="shows-list__content shows-list__content--bolded"></p>
                </div>
                <div class="shows-list__section">
                    <p class="shows-list__label">VENUE</p>
                    <p class="shows-list__content"></p>
                </div>
                <div class="shows-list__section">
                    <p class="shows-list__label">LOCATION</p>
                    <p class="shows-list__content"></p>
                </div>
                <button class="shows-list__button">BUY TICKETS</button>
            </div>
*/

const shows = [{date: "Mon Sept 06 2021", venue: "Ronald Lane", location: "San Franciso, CA"},
{date: "Tue Sept 21 2021", venue: "Pier 3 East", location: "San Franciso, CA"}, 
{date: "Fri Oct 15 2021", venue: "View Lounge", location: "San Franciso, CA"},
{date: "Sat Nov 06 2021", venue: "Hyatt Agency", location: "San Franciso, CA"},
{date: "Fri Nov 26 2021", venue: "Moscow Center", location: "San Franciso, CA"},
{date: "Wed Dec 15 2021", venue: "Press Club", location: "San Franciso, CA"}]

let showsList = document.querySelector('.shows-list')

function buildShows() {
    for(let show of shows) {
        showsList.appendChild(buildShow(show.date, show.venue, show.location))
    }
}

function buildShow(date, venue, location) {
    let newShow = document.createElement('div')
    newShow.classList.add("shows-list__show")

    let showSectionHolder = document.createElement('div')
    showSectionHolder.classList.add("shows-list__section")
    let label = document.createElement('p');
    label.classList.add("shows-list__label")
    label.innerHTML = "DATE"
    let content = document.createElement('p')
    content.classList.add("shows-list__content")
    content.classList.add("shows-list__content--bolded")
    content.innerHTML = date;
    showSectionHolder.appendChild(label)
    showSectionHolder.appendChild(content)
    newShow.appendChild(showSectionHolder)
    
    showSectionHolder = document.createElement('div')
    showSectionHolder.classList.add("shows-list__section")
    label = document.createElement('p');
    label.classList.add("shows-list__label")
    label.innerHTML = "VENUE"
    content = document.createElement('p')
    content.classList.add("shows-list__content")
    content.innerHTML = venue;
    showSectionHolder.appendChild(label)
    showSectionHolder.appendChild(content)
    newShow.appendChild(showSectionHolder)

    showSectionHolder = document.createElement('div')
    showSectionHolder.classList.add("shows-list__section")
    label = document.createElement('p');
    label.classList.add("shows-list__label")
    label.innerHTML = "LOCATION"
    content = document.createElement('p')
    content.classList.add("shows-list__content")
    content.innerHTML = location;
    showSectionHolder.appendChild(label)
    showSectionHolder.appendChild(content)
    newShow.appendChild(showSectionHolder)

    let button = document.createElement('button')
    button.classList.add("button")
    button.classList.add("shows-list__button")
    button.innerHTML = "BUY TICKETS"
    newShow.appendChild(button)

    return newShow
}

buildShows()