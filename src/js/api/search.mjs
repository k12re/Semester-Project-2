import { auctionListingsUrl } from "../api/api.mjs";
import { searchListener } from "../listeners/search.mjs";

const listingsContainer = document.querySelector(".listings-container");

export async function getSearchResults(searchQuery) {
  try {
    const searchListingsUrl = `${auctionListingsUrl}/?_seller=true&_bids=true&_active=true`;
    const response = await fetch(searchListingsUrl);

    const json = await response.json();

    const searchedPosts = json.filter((listing) => {
      return (
        listing.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        listing.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    });

    const listingsContainer = document.querySelector(".listings-container");

    listingsContainer.innerHTML = "";

    searchedPosts.forEach((listingData) => {
      const { title, description, tags, media, seller, created, endsAt, id } =
        listingData;

      const template = document.querySelector("#listing-template");
      const clone = template.content.cloneNode(true);

      const listingTitle = clone.querySelector(".title-text");
      listingTitle.innerText = `Title: ${title}`;
      listingTitle.href = `/listing/?id=${id}`;

      const listingCreated = clone.querySelector(".created-text");
      listingCreated.innerText = `Created: ${created.substring(0, 10)}`;

      const listingDescription = clone.querySelector(".description-text");
      listingDescription.innerText = `Description: ${description}`;

      if (media) {
        const listingImg = clone.querySelector(".listing-img");
        listingImg.src = media;
        listingImg.alt = title;
      }

      if (seller.avatar) {
        const avatarImg = clone.querySelector(".avatar-img");
        avatarImg.src = seller.avatar;
      } else {
        const avatarImg = clone.querySelector(".avatar-img");
        avatarImg.src = "../assets/person-circle.svg";
      }

      const userName = clone.querySelector(".username");
      userName.innerText = seller.name;
      userName.href = `/profile/?name=${seller.name}`;

      const endDate = clone.querySelector(".end-date");
      endDate.innerText = `End date: ${endsAt.substring(0, 10)}`;

      listingsContainer.append(clone);

      return clone;
    });
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
}
