export interface IWeatherType {
  main: string; // e.g. Clear, Sunny, etc
}

export interface IMain {
  temp: number;
  temp_min: number;
  temp_max: number;
}

export interface IWeather {
  weather: Array<IWeatherType>;
  main: IMain;
  name: string;
}

export interface IForecast extends IMain, IWeatherType {
  // dayOfWeek: string; // ignored for now since e.g. Monday not in payload
  temperatureDate: string;
  imageName: string;
}
