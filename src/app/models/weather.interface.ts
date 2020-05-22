export interface IWeather {
  main: string; // e.g. Clear, Sunny, etc
}

export interface IMain {
  temp: number;
  temp_min: number;
  temp_max: number;
}

export interface IWeatherSearch {
  weather: Array<IWeather>;
  main: IMain;
  name: string;
}

export interface IForecast extends IMain, IWeather {
  // dayOfWeek: string; // ignored for now since e.g. Monday not in payload
  temperatureDate: string;
  imageName: string;
}
