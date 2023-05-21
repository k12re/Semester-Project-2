import { apiUrl, auctionEndpoint, listingsEndpoint } from "./api.mjs";
import { authFetch } from "./authFetch.mjs";
import { createListingListener } from "../listeners/createListing.mjs";

const method = "POST";

export async function createListing(listing) {
  try {
    const createListingUrl = apiUrl + auctionEndpoint + listingsEndpoint + `/`;

    const postData = {
      method,
      body: JSON.stringify(
        Object.fromEntries(
          Object.entries(listing)
            .filter(([_, value]) => value !== "")
            .map(([key, value]) => {
              if (key === "tags" || key === "media") {
                return [key, value.split(", ").map((item) => item.trim())];
              } else {
                return [key, value];
              }
            })
        )
      ),
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
