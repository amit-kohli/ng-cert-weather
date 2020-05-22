import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from './../../services/storage.service';
import { AppConstants } from './../../app.constants';

@Component({
  selector: 'ngc-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit {
  @Input() zipCodes: Array<string>;

  constructor(private appConstants: AppConstants, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  deleteZip = (zipCode: string): void => {
    this.zipCodes = this.zipCodes.filter(z => z !== zipCode);
    this.updateStoredZipCodes();
  }

  updateStoredZipCodes = () => {
    this.storageService.removeItem(this.appConstants.ZIP_CODES);
    this.storageService.setItem(this.appConstants.ZIP_CODES, this.zipCodes);
  }
}
