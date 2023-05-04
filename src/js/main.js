import "../scss/styles.scss";
import * as bootstrap from "bootstrap";

import { getListings } from "./api/getListings.mjs";
import { registerFormListener } from "./listeners/register.mjs";
import { registerUser } from "./api/register.mjs";
import { loginFormListener } from "./listeners/login.mjs";
import { loginUser } from "./api/login.mjs";

import { load } from "./storage/storage.mjs";
const stickyBtn = document.querySelector(".stickyBtn");

if (localStorage["accessToken"]) {
  stickyBtn.style.display = "none";
}
