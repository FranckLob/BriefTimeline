import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) { }

  getCardObservable(timelineId) : Observable<Card[]> {
    const url='http://localhost:8080/api/timeline/'+timelineId+'/card';
    return this.httpClient.get<Card[]>(url);
  } 

}
