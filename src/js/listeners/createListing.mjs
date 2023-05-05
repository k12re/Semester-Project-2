import { createListing } from "../api/createListing.mjs";

export function createListingListener() {
  const createListingForm = document.querySelector("#createListingForm");

  if (createListingForm) {
    createListingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const createListingForm = event.target;
      const formData = new FormData(createListingForm);
      const listing = Object.fromEntries(formData.entries());
      console.log(listing);

      createListing(listing);
    });
  }
}

createListingListener();
