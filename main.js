const container = document.querySelector(".container");
const search = document.querySelector(".search");
const weatherBox = document.querySelector(".weather-box");
const weatherDet = document.querySelector(".weather-det");
const notFnd = document.querySelector(".not-fnd");

search.addEventListener("click", () => {
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
        const img = document.querySelector(".weather-box img");
        const temp = document.querySelector(".weather-box .temp");
        const desc = document.querySelector(".weather-box .desc");
        const hum = document.querySelector(".weather-box .hum span");
        const wind = document.querySelector(".weather-box .wind span");
        img.src = `https://openweathermap.org/img/wn/${json.weather[0].main.icon}@2x.png`;
        temp.innerHTML = `${json.main.temp}`;
        desc.innerHTML = `${json.weather[0].description}`;
        wind.innerHTML = `${json.wind.speed}km/h`;
      });
    })
    .catch((er) => {
      console.log(er);
    });
});
