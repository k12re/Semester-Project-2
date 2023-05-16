import { getSearchResults } from "../api/search.mjs";

const searchForm = document.querySelector("#search-form");

export function searchListener() {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchQuery = document.querySelector("#search").value;
    getSearchResults(searchQuery);
  });
}
