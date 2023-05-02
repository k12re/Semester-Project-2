import { auctionListingsUrl } from "./api.mjs";

export async function getListings() {
  const getData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${auctionListingsUrl}/?_seller=true&_bids=true`,
    getData
  );
  console.log(response);
  const json = await response.json();
  console.log(json);
  // results = json.data;

  const listingsContainer = document.querySelector(".listings-container");
  listingsContainer.innerHTML = "";

  for (let i = 0; i < json.length; i++) {
    listingsContainer.innerHTML += `<div class="card mb-4"><h1>${
      json[i].title
    }</h1>
    <p>Created: ${json[i].created.substring(0, 10)}</p>
    <p>${json[i].description}</p>
    <img src=${json[i].media}>
    <span><img class="image col-1" src="${json[i].seller.avatar}" alt="${
      json[i].seller.name
    }"/><a href=#>${json[i].seller.name}</a></span>
    <p>Ends at: ${json[i].endsAt.substring(0, 10)}</p></div>`;
  }
}

getListings();
