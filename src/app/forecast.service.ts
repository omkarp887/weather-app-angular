import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http:HttpClient) { }
  getWeatherForecast(){
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position)
        },
        (error) => {
          observer.next(error)
        }
      )
    }).pipe(
      map((value:any) => {
        return new HttpParams()
        .set('lon', value.coords.longitude)
        .set('lat', value.coords.latitude)
        .set('units', 'imperial')
        .set('appid', '196744f40957ae0f60958d07b93f7f8d')
      }),
      switchMap((values) => {
        return this.http.get('https://api.openweathermap.org/data/2.5/forecast',{params: values})
      })
    )
  }
}
