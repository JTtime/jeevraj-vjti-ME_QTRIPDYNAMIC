import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  const adventID = params.get("adventure");
  // console.log(adventID);
  return adventID;
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const result = await fetch(
      `${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`
    );
    const data = await result.json();
    // console.log(data);
    return data;
  } catch (e) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //Populating adventure name
  document.getElementById("adventure-name").append(adventure.name)
  //Populating adventure subtitle
  document.getElementById("adventure-subtitle").append(adventure.subtitle)
  //Populating image gallery
  let imgGal = adventure.images
  for (let i=0; i<imgGal.length; i++) {
    let imgx = document.createElement("div")
    // imgx.className = "activity-card-image"
    imgx.innerHTML = `<img src="${imgGal[i]}" class="activity-card-image"/>`
    document.getElementById("photo-gallery").append(imgx);
  }
  //TO-DO-Task : Populating adventure-content paragraph
  document.getElementById("adventure-content").append(adventure.content)
  // let adventCont = document.createElement("p");
  // console.log(adventure.content)
  // adventCont.innerHTML = `
  // ${adventure.content}
  // `
  // adventParent.append(adventure.content)
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  //creating outer-Carousel HTML
  let outerCarousel = document.createElement("div")
  outerCarousel.className = "carousel slide"
  outerCarousel.setAttribute("id", "indicators")
  outerCarousel.innerHTML = `
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#indicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#indicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#indicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="innerCarousel">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#indicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#indicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>

  `
document.getElementById("photo-gallery").append(outerCarousel)
// populating inner carousel
for (let i=0; i<images.length; i++ ) {
  let imgCarousel = document.createElement("div")
  i==0 ? imgCarousel.className = "carousel-item active" : imgCarousel.className = "carousel-item"
  imgCarousel.innerHTML = `
  <img src="${images[i]}" class="d-block w-100 activity-card-image" alt="image-${i}">
  `
  document.getElementById("innerCarousel").appendChild(imgCarousel)
}




}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure)
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display = "none"
    document.getElementById("reservation-panel-available").style.display = "block"
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else {
    document.getElementById("reservation-panel-sold-out").style.display = "block"
    document.getElementById("reservation-panel-available").style.display = "none"    
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // let cost = adventure.costPerHead*persons;
  // console.log(cost)
  document.getElementById("reservation-cost").innerHTML = adventure.costPerHead*persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  //Capturing User information in newly created object (data)
  let myForm = document.getElementById("myForm")
  async function inp (e) {
    e.preventDefault();
    let userData = {
      name: myForm.elements.name.value.trim(),
      date: myForm.elements.date.value,
      person: myForm.elements.person.value,
      adventure: adventure.id
    }
    console.log(userData)
    //fetching POST API call starts here
    
      let url = `${config.backendEndpoint}/reservations/new`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)

      })
      alert("success");
      // window.location.reload();
      console.log(userData)
      res.json().then(data => console.log(data)).catch((error)=> {
        alert("Check your Network")
        console.log(error) ;      
      });  
      // console.log(res);    
     
  }
  myForm.addEventListener("submit", inp)   
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let resBanner = document.getElementById("reserved-banner")
  if (adventure.reserved) {
    resBanner.style.display = "block"
  }
  else {
    resBanner.style.display = "none"
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
