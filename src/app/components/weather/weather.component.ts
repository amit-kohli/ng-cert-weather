import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { IWeather } from './../../models/weather.interface';

@Component({
  selector: 'ngc-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  @Input() zipCode: string;
  @Output() zipDeleted = new EventEmitter<string>();

  cityName: string;
  currentConditions: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  imageName: string;
  errorMessage: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.displayWeather();
  }

  displayWeather = () => {
    this.weatherService.getWeatherForZipCode(this.zipCode).subscribe({
      next: (res: IWeather) => {
        this.mapDataToUIProps(res);
      },
      error: err => this.useContingencyUrl(),
    }
    );
  }

  useContingencyUrl = () => {
    const backupUrl = 'http://interstate21.com/demos/angular/weather.php';
    this.weatherService.useContingencyUrl(backupUrl).subscribe({
      next: (res: IWeather) => {
        this.mapDataToUIProps(res);
      },
      error: err => this.errorMessage = err,
    });
  }

  mapDataToUIProps = (weatherData: IWeather): void => {
    this.cityName = weatherData.name;
    this.currentConditions = weatherData.weather[0].main;
    this.setImageName(this.currentConditions);
    this.currentTemp = this.weatherService.convertKelvinToFahrenheit(weatherData.main.temp);
    this.minTemp = this.weatherService.convertKelvinToFahrenheit(weatherData.main.temp_min);
    this.maxTemp = this.weatherService.convertKelvinToFahrenheit(weatherData.main.temp_max);
  }

  deleteZip = (zipCode: string): void => {
    // TODO: delete confirmation
    this.zipDeleted.emit(zipCode);
  }

  setImageName(currentConditions) {
    this.imageName = this.weatherService.getImageName(this.currentConditions);
  }
}
