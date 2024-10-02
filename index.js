const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apikey = "1d8f8f918b4828a0e5018f9cf6ba4a4c";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherdata = await getWeatherData(city);
            displayWeatherData(weatherdata);
        } catch (error) {
            console.error(error);
            errorMessage("Could not fetch weather data");
        }
    } else {
        errorMessage("Please Enter a City");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherData(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    // Clear previous data
    card.innerHTML = ""; // Clear previous data
    card.style.display = "flex"; // Show the card

    // Create elements for displaying weather data
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    const tempCelsius = (temp - 273.15).toFixed(1); // Convert to Celsius

    // Set content for each element
    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature: ${tempCelsius}°C`;
    humDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = `Weather: ${description}`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // Assign CSS classes
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("temp");
    humDisplay.classList.add("hum");
    descDisplay.classList.add("description");
    weatherEmoji.classList.add("wheather-emoji");

    // Append elements to the card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherid) {
    switch (true) {
        case (weatherid >= 200 && weatherid < 300):
            return "⛈️";
        case (weatherid >= 300 && weatherid < 400):
            return "🌦️";
        case (weatherid >= 500 && weatherid < 600):
            return "🌧️";
        case (weatherid >= 600 && weatherid < 700):
            return "❄️";
        case (weatherid >= 700 && weatherid < 800):
            return "🌫️";
        case (weatherid == 800):
            return "☀️";
        case (weatherid >= 801 && weatherid < 810):
            return "☁️";
        default:
            return "👽";
    }
}

function errorMessage(message) {
    card.innerHTML = ""; // Clear previous data
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error");

    card.style.display = "flex"; // Show the card
    card.appendChild(errorDisplay);
}

// Handle the start button click
document.querySelector('.start-btn').addEventListener('click', function() {
    document.querySelector('.intro').style.display = 'none'; // Hide the intro
    document.querySelector('.weather-form').style.display = 'flex'; // Show the weather form
    card.style.display = 'none'; // Initially hide the card
});
