import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    // let obj = new obj("/backend/db.json")
    const result = await fetch(config.backendEndpoint + "/cities");
    const data2 = await result.json();
    // const data1 = obj.cities;
    console.log(data2);
    return data2;
  } catch (e) {return null;}
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let newEle = document.createElement("div");
  newEle.className = "col-lg-3 col-sm-6 col-xs-12 mb-4";
  newEle.innerHTML = `
  <a href="./pages/adventures/?city=${id}" id="${id}">
            <div class="tile">
              <div class="tile-text text-center text-white">
                <h5>${city}</h5>
                <p>${description}</p>
              </div>
           <img class ="img-fluid" src="${image}" alt="${city}"/>
          </div>
          </a>
          `;
          let existingEle = document.getElementById("data");
          existingEle.append(newEle);
}

export { init, fetchCities, addCityToDOM };
