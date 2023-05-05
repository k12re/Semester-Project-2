import { apiUrl, auctionEndpoint, listingsEndpoint } from "./api.mjs";
import { authFetch } from "./authFetch.mjs";
import { createListingListener } from "../listeners/createListing.mjs";

const method = "POST";

export async function createListing(listing) {
  try {
    const createListingUrl = apiUrl + auctionEndpoint + listingsEndpoint + `/`;
    // const accessToken = localStorage.getItem("accessToken");

    const postData = {
      method,
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${accessToken}`,
      // },
      body: JSON.stringify({
        title: listing.title,
        description: listing.description,
        media: listing.media.split(", "),
        tags: listing.tags.split(", "),
        endsAt: listing.endsAt,
      }),
    };

    const response = await authFetch(createListingUrl, postData);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
}
