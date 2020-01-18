import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Timeline } from './timeline';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

    constructor(private httpClient: HttpClient) { }

  getTimelineObservable() : Observable<Timeline[]> {
    return this.httpClient.get<Timeline[]>('http://localhost:8080/api/timeline');
  }
}
