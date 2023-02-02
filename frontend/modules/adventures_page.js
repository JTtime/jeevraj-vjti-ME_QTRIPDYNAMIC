import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const q = params.get("city");
  console.log(q);
  return q;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const result = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    const data = await result.json();
    console.log(data);
    return data;
  } catch (e) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const existingEle = document.getElementById("data");
  // console.log(adventures);
  adventures.forEach((ele) => {
    let newEle = document.createElement("a");
    newEle.className = "col-lg-3 col-sm-6 my-4";
    newEle.setAttribute("href", `./detail/?adventure=${ele.id}`);
    newEle.setAttribute("id", ele.id);
    newEle.innerHTML = `            
            <div class="activity-card position-relative">
              <div class="category-banner">${ele.category}</div>
                <img src=${ele.image} alt="${ele.category}" class="activity-card-image">
              <div class="w-100">            
                <div class="d-lg-flex justify-content-between text-center px-3 pt-2">
                  <h5>${ele.name}</h5>
                  <p>${ele.costPerHead}</p>
                </div>
                <div class="d-lg-flex justify-content-between text-center px-3 pt-2">
                  <h5>Duration</h5>
                  <p>${ele.duration} Hours</p>
                </div>
              </div>
            </div>            
        `;
    existingEle.append(newEle);
    console.log(newEle.innerHTML);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList=list.filter(function(e){
    return (e.duration>=low && e.duration<=high);
  })
  console.log(filteredList);
  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList=[];
  console.log(list);
  list.filter(function (e) {
    if(categoryList.includes(e.category))
      filteredList.push(e);   
      });

      return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  console.log(filters)
  let filteredlist =[]
  let arr=filters["duration"].split("-")

  if(filters["category"].length>0&&filters["duration"].length>0) {

    filteredlist=filterByCategory(list,filters.category)
    filteredlist=filterByDuration(filteredlist,parseInt(arr[0]),parseInt(arr[1]))
   }

   else if(filters["category"].length>0) {

     filteredlist=filterByCategory(list,filters.category);
   }

   else if(filters["duration"].length>0) {

    filteredlist=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
   }

   else {

     return list;
   }

  // Place holder for functionality to work in the Stubs
  return filteredlist;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(window.localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList=filters["category"];
   let x=[];
  for(let i=0;i<categoryList.length;i++)
  {
   // console.log(categoryList[i]);
    x.push(categoryList[i]);
  }
  console.log(x);
  for(let i=0;i<x.length;i++)
  {
    
    var div=document.createElement("div");
    div.setAttribute("class","category-filter");
    // console.log(x[i]);
    div.innerText=x[i];
    document.getElementById("category-list").append(div);
  }
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
