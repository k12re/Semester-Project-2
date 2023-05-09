import { authFetch } from "./authFetch.mjs";
import { getListing } from "./getListings.mjs";
// import { listingTemplate } from "./renderListings.mjs";

const listingContainer = document.querySelector(".listing-container");
const path = location.pathname;

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

export async function listingFetch() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const listing = await getListing(id);

  renderListing(listing, listingContainer);
}

function renderListing(listingData, parent) {
  if (parent) {
    return listingTemplate(listingData);
  }
}

if (path === "/listing/") {
  listingFetch();
}
