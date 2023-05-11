import { auctionListingsUrl } from "./api.mjs";

export async function getListings() {
  const getData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${auctionListingsUrl}/?_seller=true&_bids=true&_active=true`,
    getData
  );

  return await response.json();
}

// getListings();

export async function getListing(id) {
  const listingsUrl = `${auctionListingsUrl}/${id}?_seller=true&_bids=true`;
  const response = await fetch(listingsUrl);
  return await response.json();
}

// getListing();
