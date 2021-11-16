import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import PostProductModel from 'src/app/models/post-product.model';
import {
  productAddedAction,
  productUpdatedAction,
  setProduct,
  totalUpdatedAction,
} from 'src/app/redux/redux.component';
import store from 'src/app/redux/store';
import ProductModel from '../../models/product.model';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css'],
})
export class ProductsCardComponent {
  constructor(public dialog: MatDialog) {}
  public id: number | any;
  @Input()
  public product: PostProductModel | any;

  openDialog(product: PostProductModel): void {
    store.getState().productsState.product;
    store.dispatch(setProduct(product));

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {
      width: '250px',
    });
  }

  public imageUrl = 'http://localhost:3000/api/products/images/';
}

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
})
export class DialogOverviewExampleDialog1 {
  public myproducts: PostProductModel[] = [];
  public product = new PostProductModel();
  public countControl: FormControl
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog1>,
    private http: HttpClient
  ) {    this.countControl = new FormControl(null, Validators.required);
  }

  public async add() {
    this.product.cart_ID = store.getState().productsState.cart_ID;
    this.product.product_ID = store.getState().productsState.product.id;
    this.product.name = store.getState().productsState.product.name;
    this.product.image = store.getState().productsState.product.image;
    this.product.total_Price =
    this.product.count * store.getState().productsState.product.price;

    this.myproducts = store.getState().productsState.products;
    if (this.myproducts.length != 0) {
      for (let i of this.myproducts) {
        if (i.product_ID == this.product.product_ID) {
          store.dispatch(productUpdatedAction(this.product));
          store.dispatch(totalUpdatedAction(this.product.total_Price));
          try {
            const myFormData = PostProductModel.convertToFormData(this.product);
            await this.http.put<PostProductModel>('http://localhost:3000/api/products/cart/',myFormData).toPromise();
          } catch (err) {
            console.log(err);
          }
          this.onNoClick();return  } }
          store.dispatch(productAddedAction(this.product));
          store.dispatch(totalUpdatedAction(this.product.total_Price));

          try {
            const myFormData = PostProductModel.convertToFormData(this.product);
            await this.http
              .post<PostProductModel>(
                'http://localhost:3000/api/products/cart/',
                myFormData
              )
              .toPromise();
          } catch (err) {
            console.log(err);
          }
        
      
    } else {
      store.dispatch(productAddedAction(this.product));
      store.dispatch(totalUpdatedAction(this.product.total_Price));

      try {
        const myFormData = PostProductModel.convertToFormData(this.product);
        await this.http
          .post<PostProductModel>(
            'http://localhost:3000/api/products/cart/',
            myFormData
          )
          .toPromise();
      } catch (err) {
        console.log(err);
      }
      
    }
    this.onNoClick();
  }
  onNoClick(): void {
    store.dispatch(setProduct(null));
    this.dialogRef.close();
  }


}
