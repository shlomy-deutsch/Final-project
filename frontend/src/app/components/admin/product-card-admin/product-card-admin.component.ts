import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { setProduct } from 'src/app/redux/redux.component';
import store from 'src/app/redux/store';
import ProductModel from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card-admin',
  templateUrl: './product-card-admin.component.html',
  styleUrls: ['./product-card-admin.component.css'],
})
export class ProductCardAdminComponent {
  constructor(private http: HttpClient) {}
  public id: number | any;
  @Input()
  public product: ProductModel | any;

  public imageUrl = 'http://localhost:3000/api/products/images/';

  public async add(p: ProductModel) {
    store.dispatch(setProduct(p));
  }
}
