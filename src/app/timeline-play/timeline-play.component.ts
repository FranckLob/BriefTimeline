import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';  
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../card.service';
import { Card } from '../card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timeline-play',
  templateUrl: './timeline-play.component.html',
  styleUrls: ['./timeline-play.component.css']
})
export class TimelinePlayComponent implements OnInit {

  timelinePlayForm;
  currentTimelineId;
  observableCardList : Observable<Card[]>;
  playList=[];
  card : Card;
  cardId;
  cardFound=[];

  constructor( private formBuilder: FormBuilder, private route : ActivatedRoute, private cardService : CardService) {
    this.timelinePlayForm=this.formBuilder.group({
      year : ''
    })
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.currentTimelineId = params.get('timelineId');
      this.cardService.getCardObservable(this.currentTimelineId).subscribe(value => 
          //  { for (let card of value) {
          //      let play = {cardPlay:card,played:false};
          //      this.playList.push(play);
          //   }
          // }
          {
           for (let i=0;i<value.length;i++) {
             let play= {cardPlay:value[i],played:false};
             this.playList.push(play);
             }
           this.getCard();  
          }
        )
      }
    )
  }

  getCard() {
    for (let i=0;i<this.playList.length;i++) {
      if (this.playList[i].played==false) {
        this.card=this.playList[i].cardPlay;
        
        this.cardId=i;
        break;
      }
    } 
    if (this.playList[this.playList.length-1].played==true) {
      let endCard={id:0,name:"BRAVO !",date:"",imageUrl:"https://fotomelia.com/wp-content/uploads/edd/2015/01/symbole-victoire.jpg",description:""};
      this.card=endCard;
    }
  }

  getCardFound() {
    let j=0;
    for (let i=0;i<this.playList.length;i++) {
      if (this.playList[i].played==true) {
          this.cardFound[j]=this.playList[i].cardPlay; 
          j=j+1;
      }
    }
  }

  guess(form){
      if (form.year == this.playList[this.cardId].cardPlay.date.substring(0,4)) {
        this.playList[this.cardId].played=true;
      }
      this.getCard();
      this.getCardFound();
  }
  
}
