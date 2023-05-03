import { apiUrl, auctionEndpoint, authEndpoint } from "./api.mjs";
import { loginFormListener } from "../listeners/login.mjs";

const action = "/login";
const method = "POST";

export async function loginUser(user) {
  try {
    const loginUrl = apiUrl + auctionEndpoint + authEndpoint + action;
    console.log(loginUrl);

    const postData = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    console.log(postData);

    const response = await fetch(loginUrl, postData);
    const json = response.json();
    console.log(json);
  } catch {}
}

// loginUser();
