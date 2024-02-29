import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IData } from '../types';
import { FAKE_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public getData(): Observable<IData[]> {
    return this.http.get<IData[]>(FAKE_URL);
  }
}
