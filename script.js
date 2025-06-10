let isCelsius = true;

function toggleUnits() {
  isCelsius = !isCelsius;
  getWeather();
}

function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'ca9e3e520ff74c52a41112626250406';
  const unit = isCelsius ? "C" : "F";
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;


  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      console.log(data);


      const result = `
        <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C (Feels like ${data.current.feelslike_c}°C)</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" />
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
      `;


      let forecastHTML = "<h3>3-Day Forecast:</h3><div class='forecast-grid'>";
      data.forecast.forecastday.forEach(day => {
      const rawDate = new Date(day.date);

      const options = { weekday: 'long' };
      const weekday = rawDate.toLocaleDateString('en-US', options);

      const dayNum = String(rawDate.getDate()).padStart(2, '0');
      const month = String(rawDate.getMonth() + 1).padStart(2, '0');
      const year = rawDate.getFullYear();

      const formattedDate = `${weekday}, ${dayNum}/${month}/${year}`;

      forecastHTML += `
        <div class="forecast-day">
          <p><strong>${formattedDate}</strong></p>
          <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" />
          <p>${day.day.condition.text}</p>
          <p>Max: ${day.day.maxtemp_c}°C</p>
          <p>Min: ${day.day.mintemp_c}°C</p>
          </div>
          `;
        });
      forecastHTML += "</div>";


      document.getElementById('weatherResult').innerHTML = result + forecastHTML;
    })
    .catch(error => {
      document.getElementById('weatherResult').innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}



