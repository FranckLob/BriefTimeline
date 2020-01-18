import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../timeline.service'
import { Observable } from 'rxjs';
import { Timeline } from '../timeline';

@Component({
  selector: 'app-timeline-list',
  templateUrl: './timeline-list.component.html',
  styleUrls: ['./timeline-list.component.css']
})
export class TimelineListComponent implements OnInit {

  timelineListObservable : Observable<Timeline[]>;

  constructor(private timelineService : TimelineService) {
   }

  ngOnInit() {
    this.timelineListObservable=this.timelineService.getTimelineObservable();
  }

}
