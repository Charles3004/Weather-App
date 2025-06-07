function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'ca9e3e520ff74c52a41112626250406';
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      const result = `
        <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C (Feels like ${data.current.feelslike_c}°C)</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
      `;
      document.getElementById('weatherResult').innerHTML = result;
    })
    .catch(error => {
      document.getElementById('weatherResult').innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}
