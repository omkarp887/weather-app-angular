import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.css']
})
export class FutureComponent {
  weatherData : any = [];
  forecastDetails:any;
  primaryDisplay = true;
  secondaryDisplay = false;
  selectedIndex:any;

  constructor (private forecastService: ForecastService){

  }

  ngOnInit(): void {
    this.forecastService.getWeatherForecast().pipe(
      map((x:any) => x?.list)
    )
    .subscribe(data => {
      this.futureForecast(data)
    })
  }
  futureForecast(data:any){
    for (let i = 0; i < data.length; i = i + 8) {
      this.weatherData.push(data[i]);
    }
    console.log(this.weatherData);
  }
  toggle(data:any, index:number) {
    this.primaryDisplay = !this.primaryDisplay;
    this.secondaryDisplay = !this.secondaryDisplay;
    this.forecastDetails = data;
    this.selectedIndex = index;
  }
  showDetails(data : any, i : number){
    this.forecastDetails = data;
    this.selectedIndex = i;
  }
}
