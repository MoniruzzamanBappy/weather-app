const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");
const suggestionsBox = document.querySelector(".suggestions");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

// List of cities for suggestions
const cities = [
  // North America
  "New York",
  "Los Angeles",
  "Chicago",
  "Toronto",
  "Vancouver",
  "Mexico City",
  "Miami",
  "San Francisco",
  "Houston",
  "Washington D.C.",

  // South America
  "São Paulo",
  "Buenos Aires",
  "Rio de Janeiro",
  "Bogotá",
  "Lima",
  "Santiago",
  "Caracas",
  "Montevideo",
  "Quito",
  "La Paz",

  // Europe
  "London",
  "Paris",
  "Berlin",
  "Rome",
  "Madrid",
  "Amsterdam",
  "Vienna",
  "Prague",
  "Zurich",
  "Brussels",

  // Asia
  "Tokyo",
  "Beijing",
  "Delhi",
  "Dhaka",
  "Comilla",
  "Mumbai",
  "Rajshahi",
  "Khulna",
  "Chittagong",
  "Sylhet",
  "Barisal",
  "Rangpur",
  "Narayanganj",
  "Gazipur",
  "Mymensingh",
  "Narsingdi",
  "Cox's Bazar",
  "Jessore",
  "Tangail",
  "Bogra",
  "Natore",
  "Joypurhat",
  "Nawabganj",
  "Jamalpur",
  "Kishoreganj",
  "Manikganj",
  "Sherpur",
  "Madaripur",
  "Bagerhat",
  "Pirojpur",
  "Jhalokati",
  "Patuakhali",
  "Barguna",
  "Bhola",
  "Narail",
  "Magura",
  "Meherpur",
  "Chuadanga",
  "Kushtia",
  "Jhenaidah",
  "Istanbul",
  "Karachi",
  "Tehran",
  "Guangzhou",
  "Shenzhen",
  "Shanghai",
  "Seoul",
  "Bangkok",
  "Manila",
  "Jakarta",
  "Singapore",

  // Africa
  "Cairo",
  "Lagos",
  "Johannesburg",
  "Nairobi",
  "Casablanca",
  "Addis Ababa",
  "Accra",
  "Cape Town",
  "Algiers",
  "Dakar",

  // Australia and Oceania
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Auckland",
  "Wellington",
  "Canberra",
  "Christchurch",
  "Suva",
  "Port Moresby",

  // Middle East
  "Dubai",
  "Riyadh",
  "Baghdad",
  "Doha",
  "Beirut",
  "Jerusalem",
  "Amman",
  "Muscat",
];

const APIKey = "33bd79e5c641a9b75a23d317e5e43ffc";

function fetchWeather(city) {
  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
}

// Listen for the Enter key
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchWeather(searchInput.value);
    suggestionsBox.style.display = "none"; // Hide suggestions
  }
});

// Listen for click on search button
search.addEventListener("click", () => {
  fetchWeather(searchInput.value);
  suggestionsBox.style.display = "none"; // Hide suggestions
});

// Add city suggestions (autocomplete functionality)
searchInput.addEventListener("input", () => {
  const inputValue = searchInput.value.toLowerCase();
  const suggestions = cities.filter((city) =>
    city.toLowerCase().startsWith(inputValue)
  );

  // Clear previous suggestions
  suggestionsBox.innerHTML = "";

  if (suggestions.length > 0) {
    suggestionsBox.style.display = "block"; // Show suggestions
    suggestions.forEach((suggestion) => {
      const suggestionItem = document.createElement("p");
      suggestionItem.textContent = suggestion;

      // Add click event to select suggestion
      suggestionItem.addEventListener("click", () => {
        searchInput.value = suggestion;
        fetchWeather(suggestion);
        suggestionsBox.style.display = "none"; // Hide suggestions
      });

      suggestionsBox.appendChild(suggestionItem);
    });
  } else {
    suggestionsBox.style.display = "none"; // Hide if no suggestions
  }
});

// Hide suggestions when clicking outside
document.addEventListener("click", (event) => {
  if (!event.target.closest(".search-box")) {
    suggestionsBox.style.display = "none";
  }
});
