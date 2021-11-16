import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { setAuth, setCart_ID } from 'src/app/redux/redux.component';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import ProductModel from '../../models/auth.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  public password1 : number | any;
  public password2 : number | any;
  public add : any;
  public citys: string[] = ["Tel aviv", "jerusalem", "Afule", "Ashdod", "Haifa", "Beer-Sheva", "Ramat-Gan", "Bnei-Brak", "Petach-Tikva", "Eilat"]
  public auth: ProductModel = new ProductModel()
  secondFormGroup: FormGroup | any;
  firstFormGroup: FormGroup | any;
  public id: FormControl;
  public username: FormControl;
  public password: FormControl;
  public checkpassword: FormControl;
  public city: FormControl;
  public street: FormControl;
  public firstname: FormControl;
  public lastname: FormControl;




  isEditable = false;

  constructor(
    private myRouter: Router,
    private http : HttpClient,
    private notify: NotifyService,
    ) {
      this.id = new FormControl(null, Validators.required);
      this.username = new FormControl(null, Validators.required);
      this.password = new FormControl(null, Validators.required);
      this.checkpassword = new FormControl(null, Validators.required);
      this.city = new FormControl(null, Validators.required);
      this.street = new FormControl(null, Validators.required);
      this.firstname = new FormControl(null, Validators.required);      
      this.lastname = new FormControl(null, Validators.required);

      this.firstFormGroup = new FormGroup({
        id: this.id,
        username: this.username,
        password: this.password,
        checkpassword: this.checkpassword,
      });
      this.secondFormGroup = new FormGroup({
        city: this.city,
        street: this.street,
        firstname: this.firstname,
        lastname: this.lastname,
      });

    }


  public async check(stepper: MatStepper) {
    if (this.password1 !== this.password2){
      this.notify.error("ססמאות לא תואמות");
     return} 
    try {
      const myFormData = ProductModel.convertToFormData(this.auth);
      this.add= await this.http.get<ProductModel>("http://localhost:3000/api/auth/"+this.auth.castumer_ID+"/").toPromise();
     if (this.add=== null){
      stepper.next();}
      else{ this.notify.error("תעודת הזהות כבר קיימת במערכת")
      }
    } catch (err) {
     console.log(err);
    }
  }
 public async send(stepper: MatStepper){
  try {
    const myFormData = ProductModel.convertToFormData(this.auth);
    this.auth = await this.http.post<ProductModel>("http://localhost:3000/api/auth/", myFormData).toPromise();
    this.auth.open = 0;
    store.dispatch(setAuth(this.auth));
    stepper.next();
  } catch (err) {
   console.log(err); 
  }
 }
}
