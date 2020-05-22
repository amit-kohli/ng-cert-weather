import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';
import { IForecast } from 'src/app/models/weather.interface';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  zipCode: string;
  forecastData: Array<Partial<IForecast>>;
  imageName: string;
  cityName: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.zipCode = this.activatedRoute.snapshot.paramMap.get('zipcode');
    this.displayForecast(this.zipCode);
    this.forecastData = [];
  }

  displayForecast = (zipCode: string): void => {
    this.weatherService.getForecast(zipCode).subscribe(
      (res: IForecast) => {
        this.buildDailyList(res);
      }
    );
  }

  // buildDailyList = (forecastData: IForecast): void => {
  buildDailyList = (forecasts: any): void => { // TODO: replace any with IForecast data
    // date   cloudy    min max
    // get unique forward days e.g. on 20200522 will be 20200523 to 20200527
    this.cityName = forecasts.city.name;

    const next5days = [...new Set(forecasts.list.map(r => r.dt_txt.substring(0, 10)))].splice(0);
    next5days.forEach(day => {
      const dailyData = forecasts.list.find(d => d.dt_txt.substring(0, 10) === day);
      this.forecastData.push({
        temperatureDate: dailyData.dt_txt,
        main: dailyData.weather[0].main,
        temp_min: this.weatherService.convertKelvinToFahrenheit(dailyData.main.temp_min),
        temp_max: this.weatherService.convertKelvinToFahrenheit(dailyData.main.temp_max),
        imageName: this.setImageName(dailyData.weather[0].main),
      });
    });
  }

  setImageName(currentConditions) {
    return this.weatherService.getImageName(currentConditions);
  }

  navigateToMainPage() {
    this.router.navigate(['/home']);
  }
}
