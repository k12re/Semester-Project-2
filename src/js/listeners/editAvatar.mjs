import { getProfile } from "../profiles/getProfiles.mjs";
import { editAvatar } from "../api/editAvatar.mjs";
import { load } from "../storage/storage.mjs";

const avatarForm = document.querySelector("#edit-avatar-form");

export async function editAvatarListener() {
  if (avatarForm) {
    const { name, avatar } = load("profile");
    avatarForm.avatar.value = avatar;

    const profile = await getProfile(name);
    avatarForm.avatar.value = profile.avatar;

    avatarForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);

      const profile = Object.fromEntries(formData.entries());
      profile.name = name;

      editAvatar(profile, name);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }
}
