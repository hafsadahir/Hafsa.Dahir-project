const eventsContainer = document.querySelector('.events-container')
const nav = document.querySelector('nav')
const welcomeEvent = document.querySelector('.welcome-event')
const form = document.querySelector('.form')

const showEvents = (event, id) => {
  const {name, attendee, status, description, booked} = event

  const eventStatus = status === 0 ? 'free': 'paid'
  const output = `
        <div class="card">
          <div class="card--details">
            <div>
              <h1>${name}</h1>
              <span>${attendee - booked} attendees</span>
            </div>
            <span class="card--details-ribbon ribbon-${eventStatus}">
                ${eventStatus}
            </span>
             <p>${description}</p>
            <button onclick="bookEvent(${booked} ,'${id}')" class="btn btn-tertiary">Book</button>
          </div>
        </div>
        `
    eventsContainer.innerHTML += output;
}

const showLatestEvent = (latestEvent, id) => {
  
  const {name, attendee, status, description, booked} = latestEvent 
  // Get the first event
    welcomeEvent.innerHTML = `
    <h1>${name}</h1>
    <p>${description.length >= 100 ? `${description.substring(0, 100)}...` : description}</p>
    <div>
      <span>Attendees: ${attendee - booked}</span>
      <span>Status: ${status === 0 ? 'free': 'paid'}</span>
     </div>
     <button onclick="bookEvent(${booked} ,'${id}')" class="btn btn-tertiary">Book</button>
    `
}

form.addEventListener('submit', e => {
  e.preventDefault()
  addNewEvent()
})

window.onscroll = () =>  {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    nav.style.background = 'var(--tertiary-color)';
    nav.style.boxShadow = '0 10px 42px rgba(25,17,34,.1)';
  } else {
    nav.style.background = 'none';
    nav.style.boxShadow = 'none';
  }
}




const encodedParams = new URLSearchParams();
encodedParams.append("appKey", "<REQUIRED>");
encodedParams.append("consumerSecret", "<REQUIRED>");
encodedParams.append("id", "<REQUIRED>");
encodedParams.append("consumerKey", "<REQUIRED>");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': 'c477ee4e62msh916677ffd9361a2p1e44fdjsn41d5d26b8be3',
		'X-RapidAPI-Host': 'Eventfulvolodimir-kudriachenkoV1.p.rapidapi.com'
	},
	body: encodedParams
};

fetch('https://eventfulvolodimir-kudriachenkov1.p.rapidapi.com/getSingleVenue', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

