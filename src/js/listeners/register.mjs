import { registerUser } from "../api/register.mjs";

export function registerFormListener() {
  const form = document.querySelector("#registerForm");
  console.log(form);

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());
      console.log(profile);

      registerUser(profile);
    });
  }
}

registerFormListener();
