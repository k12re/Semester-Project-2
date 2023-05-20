import { apiUrl, auctionEndpoint, listingsEndpoint } from "./api.mjs";
import { authFetch } from "./authFetch.mjs";
import { bidOnListingListener } from "../listeners/bid.mjs";

const method = "POST";
const bidsEndpoint = "/bids";

export async function bidOnListing(listingId) {
  try {
    const bidListingUrl = `${apiUrl}${auctionEndpoint}${listingsEndpoint}/${listingId}${bidsEndpoint}?_seller=true&_bids=true`;

    const postData = {
      method,
      body: JSON.stringify(),
    };

    const response = await authFetch(bidListingUrl, postData);
    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
}
