import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { StorageService } from './../../services/storage.service';
import { AppConstants } from '../../app.constants';

@Component({
  selector: 'ngc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('addLocation', { static: true }) addLocation: any;

  @Output() newZipAdded = new EventEmitter<string>();

  // weatherSubscription$: Subscription;

  constructor(private storageService: StorageService, private appConstants: AppConstants) { }

  ngOnInit(): void {
  }

  storeWeatherData = (): void => {
    const zipCode: string = this.addLocation.nativeElement.value;
    // this is a string and not a number to accomodate the delivery route format zzzzz+dddd,
    // also international are alphanumeric

    if (!this.isZipCodeValid(zipCode)) { return; }

    const storedZipCodes: Array<string> = this.storageService.getItem(this.appConstants.ZIP_CODES);

    let zipCodeIsNew: boolean = false;

    if (storedZipCodes && storedZipCodes.length > 0) {
      const newZipCodes = [...new Set([...storedZipCodes, zipCode])];
      this.storageService.setItem(this.appConstants.ZIP_CODES, newZipCodes);
      zipCodeIsNew = newZipCodes.length > storedZipCodes.length;
    }
    else {
      this.storageService.setItem(this.appConstants.ZIP_CODES, [zipCode]);
      zipCodeIsNew = true;
    }

    this.clearZipCodeField();
    if (zipCodeIsNew) {
      this.newZipAdded.emit(zipCode);
    }
  }

  clearZipCodeField = (): void => {
    this.addLocation.nativeElement.value = '';
  }

  // for now a trivial business rule that checks length of 5 - TODO move to reactive form and use Validators.required and min length
  isZipCodeValid = (zipCode: string): boolean => zipCode.length === 5;

  ngOnDestroy() {
    // if (this.weatherSubscription$) {
    //   this.weatherSubscription$.unsubscribe();
    // }
  }
}
