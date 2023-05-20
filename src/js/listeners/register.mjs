import { registerUser } from "../api/register.mjs";

export function registerFormListener() {
  const registerForm = document.querySelector("#registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const registerForm = event.target;
      const formData = new FormData(registerForm);
      const profile = Object.fromEntries(formData.entries());

      registerUser(profile);
    });
  }
}

registerFormListener();
