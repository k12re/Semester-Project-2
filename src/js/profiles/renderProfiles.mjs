import { getProfiles } from "./getProfiles.mjs";

const profilesContainer = document.querySelector(".profiles-container");
const path = location.pathname;

export function profilesTemplate(profileData) {
  const { name, email, avatar, credits, wins, _count } = profileData;

  const template = document.querySelector("#profiles-template");
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

  profilesContainer.append(clone);

  return clone;
}

export function renderProfileTemplates(profileDataList, parent) {
  const profileElements = profileDataList.map(profilesTemplate);
  parent.append(...profileElements);
}

async function profileTemplates() {
  const profileTemplate = await getProfiles();
  const container = document.querySelector(".profiles-container");
  renderProfileTemplates(profileTemplate, container);
}

if (path === "/profiles/") {
  profileTemplates();
}
