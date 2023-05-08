import { auctionProfilesUrl } from "../api/api.mjs";
import { authFetch } from "../api/authFetch.mjs";

export async function getProfiles() {
  const response = await authFetch(auctionProfilesUrl);
  return await response.json();
}

getProfiles();

export async function getProfile(name) {
  const profileUrl = `${auctionProfilesUrl}/${name}`;
  const response = await authFetch(profileUrl);
  return await response.json();
}

getProfile();
