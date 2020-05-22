import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { IWeatherSearch, IForecast } from './../models/weather.interface';
import { AppConstants } from './../app.constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private appConstants: AppConstants, private httpClient: HttpClient) { }

  getWeatherForZipCode = (zipCode: string): Observable<IWeatherSearch> => {
    const apiUrl = `${environment.weatherApiUrl}weather?zip=${zipCode}&appid=${environment.weatherAppId}`;

    return this.httpClient.get<IWeatherSearch>(apiUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getForecast = (zipCode: string): Observable<IForecast> => {
    // api.openweathermap.org/data/2.5/forecast?zip=94040,us
    const apiUrl = `${environment.weatherApiUrl}forecast?zip=${zipCode},us&appid=${environment.weatherAppId}`;

    return this.httpClient.get<IForecast>(apiUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getImageName = (weather: string): string => {
    switch (weather.toLowerCase()) {
      case 'rain':
        return this.appConstants.RAIN;
      case 'sun': // deliberately showing SUN for clear as well
      case 'clear':
        return this.appConstants.SUN;
      case 'snow':
        return this.appConstants.SNOW;
      case 'clouds':
        return this.appConstants.CLOUDS;

      default:
        // TODO: error handling
        return '';
    }
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  convertKelvinToFahrenheit = (temp: number): number => {
    return (temp - 273.15) * 1.8 + 32;
  }
}
