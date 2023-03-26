const container = document.querySelector(".container");
const input = document.querySelector("input");
const weatherBox = document.querySelector(".weather-box");
const weatherDet = document.querySelector(".weather-det");
const notFnd = document.querySelector(".not-fnd");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const API = "99ce0b25ec9900c70b68935754f94d07";
    const city = document.querySelector(".search input").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
    if (city === "") return;
    fetch(url)
      .then((res) => {
        return res.json().then((json) => {
          if (json.cod === "404") {
            weatherBox.style.display = "none";
            weatherDet.style.display = "none";
            notFnd.style.display = "block";
            return;
          }
          weatherBox.style.display = "block";
          weatherDet.style.display = "block";
          notFnd.style.display = "none";
          const name = document.querySelector(".name");
          const img = document.querySelector(".weather-box img");
          const temp = document.querySelector(".weather-box .temp");
          const desc = document.querySelector(".weather-box .desc");
          const hum = document.querySelector(".weather-det .hum span");
          const wind = document.querySelector(".weather-det .wind span");
          name.innerHTML = `${json.name}, ${json.sys.country}`;
          img.src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
          const tmp = json.main.temp - 273.15;
          temp.innerHTML = `${tmp.toFixed(2)}°`;
          desc.innerHTML = `${json.weather[0].description}`;
          hum.innerHTML = `${json.main.humidity} %`;
          wind.innerHTML = `${json.wind.speed} km/h`;
        });
      })
      .catch((er) => {
        console.log(er);
      });
  }
});
