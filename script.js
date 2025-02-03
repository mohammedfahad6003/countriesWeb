const cardContainer = document.querySelector(".countriesContainer");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then((countries) => {
    countries.forEach((item) => {
      const createCard = document.createElement("a");
      createCard.classList.add("countryCard");
      createCard.href = `/country.html?name=${item?.name?.common}`;

      createCard.innerHTML = `
        <img src="${item.flags?.svg || item.flags?.png || ''}" alt="${item.flags?.alt || 'Country flag'}" />
        <div class="cardContent">
          <h3 class="cardTitle">${item.name?.common || "Unknown Region"}</h3>
          <p><b>Population:</b> ${item.population?.toLocaleString('en-IN') || "N/A"}</p>
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
