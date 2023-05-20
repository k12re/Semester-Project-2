import { auctionProfilesUrl } from "./api.mjs";
import { authFetch } from "./authFetch.mjs";

const method = "PUT";

export async function editAvatar(profile) {
  const editAvatarUrl = `${auctionProfilesUrl}/${profile.name}/media`;

  const response = await authFetch(editAvatarUrl, {
    method,
    body: JSON.stringify(profile),
  });

  return await response.json();
}
