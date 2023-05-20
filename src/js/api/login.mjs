import { apiUrl, auctionEndpoint, authEndpoint } from "./api.mjs";
import { loginFormListener } from "../listeners/login.mjs";
import { save } from "../storage/storage.mjs";

const action = "/login";
const method = "POST";

export async function loginUser(user) {
  try {
    const loginUrl = apiUrl + auctionEndpoint + authEndpoint + action;

    const postData = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(loginUrl, postData);
    const json = await response.json();

    if (response.ok) {
      const accessToken = json.accessToken;
      save("accessToken", accessToken);
      delete json.accessToken;
      save("profile", json);

      window.location.href = "/";
    } else if (!response.ok) {
      alert(json.errors[0].message);
    }
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
}
