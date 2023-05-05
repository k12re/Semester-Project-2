import { loginUser } from "../api/login.mjs";

export function loginFormListener() {
  const loginForm = document.querySelector("#loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const loginForm = event.target;
      const formData = new FormData(loginForm);
      const user = Object.fromEntries(formData.entries());

      loginUser(user);
    });
  }
}

loginFormListener();
