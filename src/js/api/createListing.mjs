import { apiUrl, auctionEndpoint, listingsEndpoint } from "./api.mjs";
import { authFetch } from "./authFetch.mjs";
import { createListingListener } from "../listeners/createListing.mjs";

const method = "POST";

export async function createListing(listing) {
  try {
    const createListingUrl = apiUrl + auctionEndpoint + listingsEndpoint + `/`;

    for (const key in listing) {
      if (listing[key] === "") {
        delete listing[key];
      }
    }

    const postData = {
      method,
      body: JSON.stringify(listing),
    };

    const response = await authFetch(createListingUrl, postData);
    const json = await response.json();
    if (response.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
}
