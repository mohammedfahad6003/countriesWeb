const getURLDetails = new URLSearchParams(window.location.search);
const getName = getURLDetails.get("name");
const getColorMode = document.querySelector(".colorMode");
const fetchIcon = document.querySelector(".fa-moon");
const iconText = document.querySelector(".modeIcon");

const countryDetails = document.querySelector(".countryDetails");
const headingClick = document.querySelector('.heading');
const bodyClass = document.querySelector('body')
const backButton = document.querySelector('.backButton');

function fetchAllBorders(borderData) {
  const borderContainer = document.querySelector(".borderAllSubCountries");

  borderData?.forEach(async (code) => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
      const [data] = await res.json();

      const borderCountryTag = document.createElement("a");
      borderCountryTag.innerText = data.name?.common;
      borderCountryTag.href = `./country.html?name=${data.name?.common}`;
      borderCountryTag.classList.add("border-link");
      borderContainer.append(borderCountryTag);
    } catch (error) {
      console.error(`Error fetching border country ${code}:`, error);
    }
  });
}

async function fetchCountryBasedAPI() {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${getName}?fullText=true`
    );
    if (!res.ok) throw new Error("Network response was not ok");

    const [countryData] = await res.json();

    const nativeName =
      Object.values(countryData.name?.nativeName || {})
        .map((native) => native.common)
        .join(", ") || "N/A";

    const population = countryData.population?.toLocaleString("en-IN") || "N/A";
    const region = countryData.region || "N/A";
    const subRegion = countryData.subregion || "N/A";
    const capital = countryData.capital?.join(", ") || "N/A";
    const topLevelDomain = countryData.tld?.join(", ") || "N/A";

    const currencies =
      Object.values(countryData.currencies || {})
        .map((currency) => currency.name)
        .join(", ") || "N/A";

    const languages =
      Object.values(countryData.languages || {}).join(", ") || "N/A";

    countryDetails.innerHTML = `
      <img src="${
        countryData.flags?.svg || countryData.flags?.png || ""
      }" alt="${countryData.flags?.alt || "Country flag"}" />
      <div class="detailsInnerContainer">
        <h2>${countryData?.name?.common}</h2>
        <div class="detailsInner">
            <p><b>Native Name: </b>${nativeName}</p>
            <p><b>Population: </b>${population}</p>
            <p><b>Region: </b>${region}</p>
            <p><b>Sub Region: </b>${subRegion}</p>
            <p><b>Capital: </b>${capital}</p>
            <p><b>Top Level Domain: </b>${topLevelDomain}</p>
            <p><b>Currencies: </b>${currencies}</p>
            <p><b>Languages: </b>${languages}</p>
        </div>
        <div class="borderCountries">
          <b>Border Countries:</b>&nbsp;
          <div class='borderAllSubCountries'></div>
        </div>
      </div>`;

    if (countryData.borders?.length) {
      fetchAllBorders(countryData.borders);
    } else {
      const borderContainer = document.querySelector(".borderAllSubCountries");
      borderContainer.innerHTML += `<span>No Borders Present for ${countryData?.name?.common}</span>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    countryDetails.innerHTML = `<p>Failed to load country details. Please try again later.</p>`;
  }
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

  // Redirect to homepage on heading click
  headingClick.addEventListener('click', () => {
    window.location.href = '/';
  });

  backButton.addEventListener('click', () => {
    window.location.href = '/';
  });
};

fetchCountryBasedAPI();
initialUpdate();
