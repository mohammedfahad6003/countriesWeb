const cardContainer = document.querySelector(".countriesContainer");
const getColorMode = document.querySelector(".colorMode");
const fetchIcon = document.querySelector(".fa-moon");
const iconText = document.querySelector(".modeIcon");
const headingClick = document.querySelector(".heading");
const filterByRegion = document.querySelector(".filterContainer");
const searchInputContainer = document.querySelector("input");
const crossIcon = document.querySelector(".crossIcon");
const filterCrossIcon = document.querySelector(".filterCrossIcon");
const bodyClass = document.querySelector("body");

async function countriesAPI(
  url = "https://restcountries.com/v3.1/all",
  sortBy = false
) {
  await fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((countries) => {
      if (sortBy) {
        cardContainer.innerHTML = "";
      }

      countries.forEach((item) => {
        const createCard = document.createElement("a");
        createCard.classList.add("countryCard");
        createCard.href = `/country.html?name=${item?.name?.common}`;

        createCard.innerHTML = `
        <img src="${item.flags?.svg || item.flags?.png || ""}" alt="${
          item.flags?.alt || "Country flag"
        }" />
        <div class="cardContent">
          <h3 class="cardTitle">${item.name?.common || "Unknown Region"}</h3>
          <p><b>Population:</b> ${
            item.population?.toLocaleString("en-IN") || "N/A"
          }</p>
          <p><b>Region:</b> ${item.region || "N/A"}</p>
          <p><b>Capital:</b> ${item.capital?.[0] || "N/A"}</p>
        </div>
      `;

        cardContainer.appendChild(createCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      cardContainer.innerHTML = `<p>Failed to load countries. Please try again later.</p>`;
    });
}

const initialUpdate = () => {
 const isDarkMode = localStorage.getItem('darkMode') === 'true';

 if (isDarkMode) {
   bodyClass.classList.add("dark");
   fetchIcon.classList.add("fa-regular");
   fetchIcon.classList.remove("fa-solid");
   iconText.innerText = "Light Mode";
 } else {
   bodyClass.classList.remove("dark");
   fetchIcon.classList.add("fa-solid");
   fetchIcon.classList.remove("fa-regular");
   iconText.innerText = "Dark Mode";
 }

 getColorMode.addEventListener("click", () => {
   const isDark = bodyClass.classList.toggle("dark"); 
   localStorage.setItem('darkMode', isDark);   

   fetchIcon.classList.toggle("fa-solid", !isDark);
   fetchIcon.classList.toggle("fa-regular", isDark);

   iconText.innerText = isDark ? "Light Mode" : "Dark Mode";
 });

  crossIcon.classList.remove("fa-circle-xmark");
  searchInputContainer.value = "";

  filterCrossIcon.classList.remove("fa-circle-xmark");
  filterByRegion.value = "FilterByRegion";

  headingClick.addEventListener("click", () => {
    window.location.href = "/";
  });

  filterByRegion.addEventListener("change", (e) => {
    if (e.target.value !== "FilterByRegion") {
      filterCrossIcon.classList.add("fa-circle-xmark");
      countriesAPI(
        `https://restcountries.com/v3.1/region/${e.target.value}`,
        true
      );
    }
  });

  let debounceTimeout;

  searchInputContainer.addEventListener("input", (e) => {
    const { value } = e.target;

    crossIcon.classList.toggle("fa-circle-xmark", value !== "");

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (value.trim()) {
        countriesAPI(
          `https://restcountries.com/v3.1/name/${value.trim()}`,
          true
        );
      } else {
        searchInputContainer.value = "";
        countriesAPI("https://restcountries.com/v3.1/all", true);
      }
    }, 300);
  });

  searchInputContainer.addEventListener("change", (e) => {
    const { value } = e.target;
    if (value.trim()) {
      countriesAPI(`https://restcountries.com/v3.1/name/${value.trim()}`, true);
    }
  });

  crossIcon.addEventListener("click", () => {
    searchInputContainer.value = "";
    crossIcon.classList.remove("fa-circle-xmark");
    countriesAPI("https://restcountries.com/v3.1/all", true);
  });

  filterCrossIcon.addEventListener("click", () => {
    filterCrossIcon.classList.remove("fa-circle-xmark");
    filterByRegion.value = "FilterByRegion";
    countriesAPI("https://restcountries.com/v3.1/all", true);
  });
};

countriesAPI();
initialUpdate();
