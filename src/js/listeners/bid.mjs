// import { bidOnListing } from "../api/getListings.mjs";
import { getListing } from "../api/getListings.mjs";
import { apiUrl, auctionEndpoint, listingsEndpoint } from "../api/api.mjs";
import { authFetch } from "../api/authFetch.mjs";

export async function bidOnListingListener() {
  const bidOnListingForm = document.querySelector("#bidding-form");

  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");

  if (bidOnListingForm) {
    const bid = await getListing(listingId);
    const method = "POST";
    const bidsEndpoint = "/bids";
    const bidListingUrl = `${apiUrl}${auctionEndpoint}${listingsEndpoint}/${listingId}${bidsEndpoint}`;

    bidOnListingForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const bidOnListingForm = event.target;
      const formData = new FormData(bidOnListingForm);
      const bidData = Object.fromEntries(formData.entries());
      const object = new Object();
      object.amount = parseInt(bidData.amount);

      const postData = {
        method,
        body: JSON.stringify(object),
      };
      const response = await authFetch(bidListingUrl, postData);
      location.reload();
      return await response.json();
    });
  }
}
