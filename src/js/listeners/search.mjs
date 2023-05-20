import { getSearchResults } from "../api/search.mjs";

const searchForm = document.querySelector("#search-form");

export function searchListener() {
  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const searchQuery = document.querySelector("#search").value;
      getSearchResults(searchQuery);
    });
  }
}
