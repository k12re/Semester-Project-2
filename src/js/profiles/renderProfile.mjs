import { getProfile } from "./getProfiles.mjs";

const profileContainer = document.querySelector(".profile-container");
const path = location.pathname;

export function profileTemplate(profileData) {
  const { name, email, avatar, credits, wins, _count } = profileData;

  const template = document.querySelector("#profile-template");
  const clone = template.content.cloneNode(true);

  if (avatar) {
    const avatarImg = clone.querySelector(".avatar-img");
    avatarImg.src = avatar;
  } else {
    const avatarImg = clone.querySelector(".avatar-img");
    avatarImg.src = "../assets/person-circle.svg";
  }

  const userName = clone.querySelector(".seller-text");
  userName.innerText = name;

  const contactEmail = clone.querySelector(".email-text");
  contactEmail.innerText = email;

  const winsCount = clone.querySelector(".wins-text");
  winsCount.innerText = wins;

  const creditsCount = clone.querySelector(".credits");
  creditsCount.innerText = credits;

  profileContainer.append(clone);

  return clone;
}

export async function profileFetch() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const profile = await getProfile(name);

  renderProfile(profile, profileContainer);
}

function renderProfile(profileData, parent) {
  if (parent) {
    return profileTemplate(profileData);
  }
}

if (path === "/profile/") {
  profileFetch();
}
