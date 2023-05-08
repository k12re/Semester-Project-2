import { getListings } from "./getListings.mjs";

const listingsContainer = document.querySelector(".listings-container");
// const path = location.pathname;

export function listingTemplate(listingData) {
  const { title, description, tags, media, seller, created, endsAt } =
    listingData;

  const template = document.querySelector("#listing-template");
  const clone = template.content.cloneNode(true);

  const listingTitle = clone.querySelector(".title-text");
  listingTitle.innerText = `Title: ${title}`;

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

  listingsContainer.append(clone);

  return clone;
}

export function renderListingTemplates(listingDataList, parent) {
  const listingElements = listingDataList.map(listingTemplate);
  parent.append(...listingElements);
}

async function listingsTemplates() {
  const listingTemplate = await getListings();
  const container = document.querySelector(".listings-container");
  renderListingTemplates(listingTemplate, container);
}

listingsTemplates();
