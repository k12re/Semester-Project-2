import {
  apiUrl,
  auctionEndpoint,
  listingsEndpoint,
  profilesEndpoint,
} from "./api.mjs";

export async function authFetch() {
  const accessToken = localStorage.getItem("accessToken");
  const getData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(
      `${apiUrl}${auctionEndpoint}${listingsEndpoint}`,
      getData
    );
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
}

authFetch();
