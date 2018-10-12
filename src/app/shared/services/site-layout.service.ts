import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category, City, Data} from '../interfaces';


@Injectable({
  providedIn: 'root'
})

export  class SiteLayoutService {
  constructor(private http: HttpClient) {}

  public getAllCities(): Observable<City[]> {
    return this.http.get<City[]>('https://test-page-127ec.firebaseio.com/city.json');
  }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('https://test-page-127ec.firebaseio.com/category.json');
  }

  public getDates(): Observable<Data[]> {
    return this.http.get<Data[]>('https://test-page-127ec.firebaseio.com/data.json');
  }
}
