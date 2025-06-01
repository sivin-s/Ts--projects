"use strict";
const API_KEY = "xxxxxxx";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
class WeatherApp {
    from;
    input;
    resultDiv;
    constructor() {
        this.from = document.getElementById("weather-form");
        this.input = document.getElementById("city-input");
        this.resultDiv = document.getElementById("weather-result");
        this.from.addEventListener("submit", this.handleSearch.bind(this));
    }
    async handleSearch(event) {
        event.preventDefault();
        const city = this.input.value.trim();
        if (!city)
            return;
        this.resultDiv.innerHTML = "Loading...";
        try {
            const data = await this.fetchWeather(city);
            this.displayWeather(data);
        }
        catch (error) {
            this.showError("City not found or network error.");
        }
    }
    async fetchWeather(city) {
        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        return await response.json();
    }
    displayWeather(data) {
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        this.resultDiv.innerHTML = `
         <h2>${data.name}</h2>
         <img src="${iconUrl}" alt="${data.weather[0].description}"/>
         <p><strong>Temperature:</strong>${data.main.temp}&deg;C</p>
         <p><strong>Feels like:</strong>${data.main.feels_like}&deg;C</p>
         <p><strong>Humidity:</strong>${data.main.humidity}%</p>
         <p><strong>Description:</strong>${data.weather[0].description}</p>
        `;
    }
    showError(message) {
        this.resultDiv.innerHTML = `<p style="color:red;">${message}</p>`;
    }
}
new WeatherApp();
