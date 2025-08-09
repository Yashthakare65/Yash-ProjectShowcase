const apiKey = "b349ea4ab028c96d1a22d4e30816d58e"; 

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const resultBox = document.getElementById("weatherResult");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return alert("Please enter a city name!");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const condition = data.weather[0].main.toLowerCase(); // e.g. "clouds"
    const iconCode = data.weather[0].icon;

    // Update DOM
    cityName.textContent = data.name;
    temperature.textContent = `🌡️ ${data.main.temp}°C`;
    description.textContent = `🌥️ ${data.weather[0].description}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Set dynamic background image
    switch (condition) {
      case "clear":
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?sunny')";
        break;
      case "clouds":
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?cloudy')";
        break;
      case "rain":
      case "drizzle":
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?rain')";
        break;
      case "snow":
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?snow')";
        break;
      case "thunderstorm":
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?storm')";
        break;
      default:
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?weather')";
    }

    resultBox.classList.remove("hidden");

  } catch (error) {
    alert("Error: " + error.message);
    resultBox.classList.add("hidden");
  }
});
