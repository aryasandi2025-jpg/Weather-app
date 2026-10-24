const apiKey = 'fb3298ad3416948d074bd08aa254efde';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const errorMessage = document.getElementById('errorMessage');
const weatherIcon = document.getElementById('weatherIcon');

// Variabel baru untuk kelembapan & angin
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

async function getWeather(city) {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;

    try {
        errorMessage.textContent = '';
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Kota tidak ditemukan!');
        }

        const data = await response.json();

        // Tampilkan data utama
        cityName.textContent = data.name;
        temp.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;

        // Tampilkan ikon cuaca
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Tampilkan detail tambahan (Kelembapan & Angin)
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} m/s`;

        weatherInfo.style.display = 'block';
    } catch (error) {
        weatherInfo.style.display = 'none';
        errorMessage.textContent = error.message;
    }
}

searchBtn.addEventListener('click', () => {
    getWeather(cityInput.value);
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getWeather(cityInput.value);
    }
});
