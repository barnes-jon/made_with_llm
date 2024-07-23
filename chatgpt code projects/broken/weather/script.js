async function getWeatherAndLocation() {
    const zipCode = document.getElementById('zipCodeInput').value;
    if (!zipCode) {
        alert('Please enter a ZIP code');
        return;
    }

    try {
        // Fetch weather data
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=YOUR_OPENWEATHERMAP_API_KEY&units=imperial`);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod === '404') {
            alert('Invalid ZIP code');
            return;
        }

        const { main, weather, coord, name } = weatherData;
        const weatherInfo = `
            <h2>Weather in ${name}</h2>
            <p>${weather[0].description}</p>
            <p>Temperature: ${main.temp}°F</p>
            <p>Humidity: ${main.humidity}%</p>
        `;
        document.getElementById('weather').innerHTML = weatherInfo;

        // Display map
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: coord.lat, lng: coord.lon },
            zoom: 10
        });
        new google.maps.Marker({ position: { lat: coord.lat, lng: coord.lon }, map });
    } catch (error) {
        console.error('Error fetching weather or location data:', error);
        alert('There was an error fetching the data. Please try again later.');
    }
}
