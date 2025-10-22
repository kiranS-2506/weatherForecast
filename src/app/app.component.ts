import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WeatherServiceService } from './services/weather-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'weather';
  city = ""
  coun:string =""
  region:string = ""
  temp:number = 0
  FeelTemp = 0
  datetime = ""
  img = ""
  humidity = 0
  windSpeed = 0
  name = ""
  aqi = 0
  wcard: boolean = false; // Controls visibility of the weather card
  hasSearched: boolean = false; // To track if a search has been made
  upday = 0
  UpWeatData:any[] =[]
  constructor(private weather:WeatherServiceService){}

  searchWeather(){
    this.weather.fetchWeather(this.city)
    .then(data=>{
      console.log(data)
      this.coun = data.location.country
      this.region = data.location.region
      this.temp = data.current.temp_c
      this.FeelTemp = data.current.feelslike_c
      this.datetime = data.current.last_updated
      this.img = data.current.condition.icon
      this.windSpeed = data.current.wind_kph
      this.humidity = data.current.humidity
      this.name = data.location.name
      this.aqi = data.current.air_quality["us-epa-index"]

    })
    this.wcard = true; // Show the weather card
    this.hasSearched = true; // Mark that a search has been made
    this.weather.fetcDayhWeather(this.city)
    .then(data=>{
      this.UpWeatData = data.forecastday
      console.log(data.forecastday)
      console.log(typeof(data.forecastday))

    })

  }
}
