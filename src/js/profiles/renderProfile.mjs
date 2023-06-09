import { getProfile } from "./getProfiles.mjs";
import { load } from "../storage/storage.mjs";

const profileContainer = document.querySelector(".profile-container");
const listContainer = document.querySelector(".list-container");
const editProfileFormContainer = document.querySelector(
  "#edit-profile-form-container"
);
const path = location.pathname;

const alertMain = document.querySelector(".container");

if (path === "/profile/" && !localStorage["accessToken"]) {
  alertMain.innerHTML = `<div class="card shadow border border-0 mx-auto alert alert-warning" role="alert"">
  <h1 class="title-text m-3 h2 mx-auto"> Please sign in</h1>
  <p class="description-text m-3 mx-auto">You need to be signed in to view this content</p>
</div>`;
}

export function profileTemplate(profileData) {
  const { name, email, avatar, credits, wins, _count } = profileData;

  const template = document.querySelector("#profile-template");
  const clone = template.content.cloneNode(true);

  if (avatar) {
    const avatarImg = clone.querySelector(".avatar-img");
    avatarImg.src = avatar;
  } else {
    const avatarImg = clone.querySelector(".avatar-img");
    avatarImg.src = "/assets/person-circle.svg";
  }

  const userName = clone.querySelector(".seller-text");
  userName.innerText = `Name: ${name}`;

  const contactEmail = clone.querySelector(".email-text");
  contactEmail.innerText = `Email: ${email}`;

  const winsCount = clone.querySelector(".wins-text");
  winsCount.innerText = `Wins: ${wins.length}`;

  const creditsCount = clone.querySelector(".credits");
  creditsCount.innerText = `Credits: ${credits}`;

  profileContainer.append(clone);

  return clone;
}

export function listTemplate(listData) {
  const { endsAt, title, description, media } = listData;

  const template = document.querySelector("#listing-list-template");
  const clone = template.content.cloneNode(true);

  const mediaItem = clone.querySelector(".list-img");
  mediaItem.src = media;

  const listItem = clone.querySelector(".list-item");
  listItem.innerText = `Title: ${title}`;

  const endDate = clone.querySelector(".end-date");
  endDate.innerText = `End date: ${endsAt.substring(0, 10)}`;

  listContainer.append(clone);

  return clone;
}

export async function profileFetch() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const profile = await getProfile(name);
  const listItems = profile.listings;

  const profileName = load("profile");
  const sellerName = profile;

  if (profileName.name === sellerName.name) {
    editProfileFormContainer.style.display = "block";
  }

  renderProfile(profile, profileContainer);
  renderList(listItems, listContainer);
}

if (path === "/profile/") {
  profileFetch();
}

function renderProfile(profileData, parent) {
  if (parent) {
    return profileTemplate(profileData);
  }
}

function renderList(listData, parent) {
  const listElements = listData.map(listTemplate);
  parent.append(...listElements);
}
