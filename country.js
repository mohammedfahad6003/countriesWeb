const getURLDetails = new URLSearchParams(window.location.search);
const getName = getURLDetails.get("name");

async function fetchCountryBasedAPI() {
  await fetch(`https://restcountries.com/v3.1/name/${getName}?fullText=true`)
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((res) => {
        const countryData = Array.from(res)[0]; 
        console.log(countryData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      cardContainer.innerHTML = `<p>Failed to load countries. Please try again later.</p>`;
    });
}

fetchCountryBasedAPI();
