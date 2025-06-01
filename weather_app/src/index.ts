interface WeatherData{   // fetched data structure
    name:string;
    main:{
        temp: number;
        feels_like: number;
        humidity: number;
    }
    weather:{
        description: string;
        icon: string;
    }[];
}

const API_KEY = "xxxxxxx"

const  BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

class WeatherApp{
    private from : HTMLFormElement;
    private input: HTMLInputElement;
    private resultDiv: HTMLElement;
    constructor(){
        this.from = document.getElementById("weather-form") as HTMLFormElement;
        this.input = document.getElementById("city-input") as HTMLInputElement;
        this.resultDiv = document.getElementById("weather-result") as HTMLElement;

        this.from.addEventListener("submit",this.handleSearch.bind(this));
    }

    private async handleSearch(event: Event): Promise<void>{
            event.preventDefault();
            const city = this.input.value.trim()
            if(!city) return;
            this.resultDiv.innerHTML="Loading...";
            try {
                const data = await this.fetchWeather(city);
                this.displayWeather(data)
            } catch (error) {
                this.showError("City not found or network error.")
            }
    }
    private async fetchWeather(city : string) : Promise<WeatherData>{
        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("City not found");
        }
        return await response.json()
    }
    private displayWeather(data: WeatherApp):void{
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        this.resultDiv.innerHTML=`
         <h2>${data.name}</h2>
         <img src="${iconUrl}" alt="${data.weather[0].description}"/>
         <p><strong>Temperature:</strong>${data.main.temp}&deg;C</p>
         <p><strong>Feels like:</strong>${data.main.feels_like}&deg;C</p>
         <p><strong>Humidity:</strong>${data.main.humidity}%</p>
         <p><strong>Description:</strong>${data.weather[0].description}</p>
        `;
    }
    private showError(message:string):void{
        this.resultDiv.innerHTML = `<p style="color:red;">${message}</p>`
    }
}

new  WeatherApp()
