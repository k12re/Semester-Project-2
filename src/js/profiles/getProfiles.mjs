import { auctionProfilesUrl } from "../api/api.mjs";
import { authFetch } from "../api/authFetch.mjs";

export async function getProfiles() {
  const response = await authFetch(auctionProfilesUrl);
  const json = await response.json();
  console.log(json);
}

getProfiles();

export async function getProfile(name) {
  const profileUrl = `${auctionProfilesUrl}/${name}`;
  const response = await authFetch(profileUrl);
  const json = await response.json();
  console.log(json);
}

getProfile();
