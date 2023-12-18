const btn = document.querySelector("#btn");
const input = document.querySelector("#input_id");

const searchCity = async () => {
  try {
    let { value } = input;
    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=474bde56d9d22fcb736d14ec0951b2b3&units=metric`
    );

    const cardHTML = res.data ? generateCardHTML(res.data) : "City not found !";

    document.querySelector("#card").innerHTML = cardHTML;
  } catch (error) {
    console.log(error);
    alert(error)
  }
};

const generateCardHTML = (data) => {
  const { main, name, weather, wind } = data;
  const { temp, humidity } = main;
  const { speed } = wind;

  let weatherImgSrc = "";
  if (data.weather[0].main === "Clouds") {
    weatherImgSrc = "/images/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherImgSrc = "/images/clear.png";
  } else if (data.weather[0].main === "Rain") {
    weatherImgSrc = "/images/rain.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherImgSrc = "/images/drizzle.png";
  } else if (data.weather[0].main === "Mist") {
    weatherImgSrc = "/images/mist.png";
  }

  return `<div class="row g-0">
    <div class="col-md-4">
      <img src="${weatherImgSrc}" class="img-fluid rounded-start" alt="..." id="img_id">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <div class="box text-center">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${Math.round(temp)}°C</p>
        </div>
        <div class="cont d-flex justify-content-between">
          <div class="box1">
            <p class="card-text">Wind Speed</p>
            <p class="card-text">${speed} Km/h</p>
            <img src="images/wind.png" alt="wind" width="40px">
          </div>
          <div class="box2">
            <p class="card-text">Humidity</p>
            <p class="card-text">${humidity} %</p>
            <img src="images/humidity.png" alt="humidity" width="40px">
          </div>
        </div>
      </div>
    </div>
  </div>`;
};

btn.addEventListener("click", searchCity);
