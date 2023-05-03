import { apiUrl, auctionEndpoint, authEndpoint } from "./api.mjs";
import { registerFormListener } from "../listeners/register.mjs";

const action = "/register";
const method = "POST";

export async function registerUser(profile) {
  try {
    const registerUrl = apiUrl + auctionEndpoint + authEndpoint + action;
    console.log(registerUrl);

    const postData = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    };

    const response = await fetch(registerUrl, postData);
    const json = response.json();
    console.log(json);
  } catch {}
}

// registerUser();
