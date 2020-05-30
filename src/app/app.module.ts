import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ForecastModule } from './forecast/forecast.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './components/search/search.component';
import { AppConstants } from './app.constants';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MinMaxComponent } from './components/min-max/min-max.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    WeatherListComponent,
    WeatherComponent,
    MinMaxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [AppConstants],
  bootstrap: [AppComponent]
})
export class AppModule { }
