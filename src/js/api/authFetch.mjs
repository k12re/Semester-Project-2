import {
  apiUrl,
  auctionEndpoint,
  listingsEndpoint,
  profilesEndpoint,
} from "./api.mjs";
import { load } from "../storage/storage.mjs";

const accessToken = load("accessToken");

export async function authFetch(url, options) {
  try {
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
}
