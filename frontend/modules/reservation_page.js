import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let url = `${config.backendEndpoint}/reservations`;
    const reservedData = await fetch(url)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => error);
    // console.log(reservedData)
    return reservedData;
  } catch (e) {
    // alert("Fetching reservations data, check network");
    return null;
  }
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table  
  let reserveTableBody = document.getElementById("reservation-table");

  console.log(reservations);
  reservations.length>0 ? displayTable() : displayNoReservationBanner();

  function displayTable() {
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none";
  }
  function displayNoReservationBanner() {
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
  }


  reservations.forEach((ele) => {
    
    let date = new Date(ele.date);
    let time = new Date(ele.time);
    let localDate = date.toLocaleDateString("en-IN");
    let localTime = time.toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let booktime = time.toLocaleString("en-IN").split(" ");
    // this returns Array in the format 0:"1/2/2023,"  1:"10:39:58"  2:"am", Hence we will take booktime[1] & booktime[2]
    // console.log(booktime);
    // console.log(localTime, localDate);
    //Action button is created by let btn = `<a href="../detail/?adventure=${ele["adventure"]}"><button class="reservation-visit-button">Visit Adventure</button></a>`
    let tableRow = document.createElement("tr");
    reserveTableBody.append(tableRow);

    let rowData = `<td><a href="../detail/?adventure=${ele['adventure']}">${ele["id"]}</a></td>
    <td>${ele["name"]}</td>
    <td>${ele["adventureName"]}</td>
    <td>${ele["person"]}</td>
    <td>${localDate}</td>
    <td>${ele["price"]}</td>
    <td>${localTime}, ${booktime[1]} ${booktime[2]}</td>
    <td id="${ele.id}"><a href="../detail/?adventure=${ele['adventure']}"><button class="reservation-visit-button">Visit Adventure</button></a></td>
    `;
    tableRow.innerHTML = rowData;
  });
  // 1) id
  // 2) name
  // 3) adventureName
  // 4) person
  // 5) date
  // 6) price
  // 7) time
  // 8) action button

  //Conditionally render the no-reservation-banner and reservation-table-parent
  

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
