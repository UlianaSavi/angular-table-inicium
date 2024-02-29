import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IData, IResponse } from '../types';
import { API_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public getData(): Observable<IResponse> {
    return this.http.get<IResponse>(API_URL);
  }
}
