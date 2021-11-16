import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {
public total: number |any
private unsubscribeMe: Unsubscribe|any


  ngOnInit(){
    this.unsubscribeMe = store.subscribe(() => {
      this.total = store.getState().productsState.total;
  });
  }
}
