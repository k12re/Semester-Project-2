import { authFetch } from "./authFetch.mjs";
import { getListing } from "./getListings.mjs";
import { load } from "../storage/storage.mjs";

const listingContainer = document.querySelector(".listing-container");
const bidListContainer = document.querySelector(".bid-list-container");
const bidFormContainer = document.querySelector("#bidding-form-container");
const path = location.pathname;

const alertMain = document.querySelector(".container");

if (path === "/listing/" && !localStorage["accessToken"]) {
  alertMain.innerHTML = `<div class="card shadow border border-0 mx-auto alert alert-warning" role="alert"">
  <h1 class="title-text m-3 h2 mx-auto"> Please sign in</h1>
  <p class="description-text m-3 mx-auto">You need to be signed in to view this content</p>
</div>`;
}

export function listingTemplate(listingData) {
  const { title, description, tags, media, seller, created, endsAt, id } =
    listingData;

  const template = document.querySelector("#listing-template");
  const clone = template.content.cloneNode(true);

  const listingTitle = clone.querySelector(".title-text");
  listingTitle.innerText = `Title: ${title}`;
  listingTitle.href = `/listing/?id=${id}`;

  const listingCreated = clone.querySelector(".created-text");
  listingCreated.innerText = `Created: ${created.substring(0, 10)}`;

  const listingDescription = clone.querySelector(".description-text");
  listingDescription.innerText = `Description: ${description}`;

  if (media) {
    const listingImg = clone.querySelector(".listing-img");
    listingImg.src = media;
    listingImg.alt = title;

    const ThumbnailImgContainer = clone.querySelector(
      ".thumbnail-img-container"
    );
    for (let i = 1; i < media.length; i++) {
      ThumbnailImgContainer.innerHTML += `<img class="image thumb-img col-2 m-2 object-fit-cover" src="${media[i]}" alt="${media[i]}" />`;
    }
  }

  if (seller.avatar) {
    const avatarImg = clone.querySelector(".avatar-img");
    avatarImg.src = seller.avatar;
  } else {
    const avatarImg = clone.querySelector(".avatar-img");
    avatarImg.src = "../assets/person-circle.svg";
  }

  const userName = clone.querySelector(".username");
  userName.innerText = seller.name;
  userName.href = `/profile/?name=${seller.name}`;

  const endDate = clone.querySelector(".end-date");
  endDate.innerText = `End date: ${endsAt.substring(0, 10)}`;

  listingContainer.append(clone);

  return clone;
}

export function bidTemplate(bidData) {
  const { amount, bidderName, created } = bidData;

  const template = document.querySelector("#listing-bid-template");
  const clone = template.content.cloneNode(true);

  const bidder = clone.querySelector(".bidder-name");
  bidder.innerText = `Bidder: ${bidderName}`;

  const bidDate = clone.querySelector(".bid-date");
  bidDate.innerText = `Bid date: ${created.substring(0, 10)}`;

  const bidAmount = clone.querySelector(".bid-amount");
  bidAmount.innerText = `Bid amount: ${amount}`;

  bidListContainer.append(clone);

  return clone;
}

export async function listingFetch() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const listing = await getListing(id);
  const bidsList = listing.bids;

  const profileName = load("profile");
  const sellerName = listing.seller.name;
  if (profileName.name !== sellerName) {
    bidFormContainer.style.display = "block";
  }

  renderListing(listing, listingContainer);
  renderBids(bidsList, bidListContainer);
}

if (path === "/listing/") {
  listingFetch();
}

function renderListing(listingData, parent) {
  if (parent) {
    return listingTemplate(listingData);
  }
}

function renderBids(bidData, parent) {
  const bidElements = bidData.slice(0).reverse().map(bidTemplate);
  parent.append(...bidElements);
}
