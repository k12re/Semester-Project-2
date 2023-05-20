import "../scss/styles.scss";
import * as bootstrap from "bootstrap";

import { authFetch } from "./api/authFetch.mjs";
import { getListings } from "./api/getListings.mjs";
import { registerFormListener } from "./listeners/register.mjs";
import { registerUser } from "./api/register.mjs";
import { loginFormListener } from "./listeners/login.mjs";
import { loginUser } from "./api/login.mjs";
import { remove } from "./storage/storage.mjs";
import { createListing } from "./api/createListing.mjs";
import { createListingListener } from "./listeners/createListing.mjs";
import { getProfiles, getProfile } from "./profiles/getProfiles.mjs";
import { renderListingTemplates } from "./api/renderListings.mjs";
import { renderProfileTemplates } from "./profiles/renderProfiles.mjs";
import { profileFetch } from "./profiles/renderProfile.mjs";
import { listingFetch } from "./api/renderListing.mjs";
import { bidOnListingListener } from "./listeners/bid.mjs";
import { bidOnListing } from "./api/bidOnListing.mjs";
import { editAvatarListener } from "./listeners/editAvatar.mjs";
import { searchListener } from "./listeners/search.mjs";
import { load } from "./storage/storage.mjs";

const stickyBtn = document.querySelector(".stickyBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const createListingBtn = document.querySelector("#createListing");
const profileBtn = document.querySelector("#profileBtn");
const card = document.querySelector(".card");
const loggedInUseruser = load("profile");

if (localStorage["profile"]) {
  profileBtn.href = `/profile/?name=${loggedInUseruser.name}`;
}

if (localStorage["accessToken"]) {
  stickyBtn.style.display = "none";
}

function logoutListener() {
  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (localStorage["accessToken"]) {
      alert("You have successfully logged out");
      remove("accessToken");
    }
    window.location.replace("/");
  });
}

logoutListener();
bidOnListingListener();
editAvatarListener();
searchListener();
