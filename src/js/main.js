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

const stickyBtn = document.querySelector(".stickyBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const createListingBtn = document.querySelector("#createListing");

if (localStorage["accessToken"]) {
  stickyBtn.style.display = "none";
}

function logoutListener() {
  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    remove("accessToken");
    window.location.reload();
  });
}

logoutListener();
