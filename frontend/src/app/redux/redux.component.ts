import LoginModel from "../models/login.model";
import PostProductModel from "../models/post-product.model";
import ProductModel from "../models/product.model";

export class AuthState {
   
}
// Products State:
export class ProductsState {
    public products: PostProductModel[] | any;
    public product: PostProductModel| ProductModel |any;
    public cart_ID: number = 0;
    public total: number = 0
    public auth: LoginModel|any;

    public constructor() {
        const user = localStorage.getItem("user");
        if (user) {
            this.auth = JSON.parse(user);
        }
        const cart = localStorage.getItem("cart");
        if (cart) {
            this.cart_ID = JSON.parse(cart);
        }
    }
}

// Product Action Types:
export enum ProductActionType {
    setCart_ID = "setCart_ID",
    setTotal = "setTotal",
    setAuth = "setAuth",
    totalUpdated = "totalUpdated",
    setProduct_ID = "setProduct_ID",
    setProduct = "setProduct",
    setProducts = "setProducts",
    setQuantity = "setQuantity",
    productAdded = "productAdded",
    productUpdated = "productUpdated",

    // productUpdated = "productUpdated",
    // productDeleted = "productDeleted"
}

// Product Action:
export interface ProductAction {
    type: ProductActionType;
    payload: any;
}

// Product Action Creators:
export function setCart_ID(cart_ID: any): ProductAction {
  return { type: ProductActionType.setCart_ID, payload: cart_ID };
}
export function setAuth(auth: any): ProductAction {
    return { type: ProductActionType.setAuth, payload: auth };
  }
export function setTotal(total: any): ProductAction {
    return { type: ProductActionType.setTotal, payload: total };
  }
  export function totalUpdatedAction(total: any): ProductAction {
    return { type: ProductActionType.totalUpdated, payload: total };
}

export function setProducts(products: PostProductModel): ProductAction {
    return { type: ProductActionType.setProducts, payload: products };
}
export function setProduct(product: PostProductModel|ProductModel|any): ProductAction {
    return { type: ProductActionType.setProduct, payload: product };
}
export function productUpdatedAction(product: PostProductModel|ProductModel|any): ProductAction {
    return { type: ProductActionType.productUpdated, payload: product };
}

export function productAddedAction(product: PostProductModel): ProductAction {
    return { type: ProductActionType.productAdded, payload: product };
}


// Products Reducer:
export function productsReducer(currentState: ProductsState = new ProductsState(), action: ProductAction): ProductsState {
    const newState = { ...currentState };
    switch (action.type) {
        case ProductActionType.setCart_ID: // payload is all products (ProductModel[])
            newState.cart_ID = action.payload;
            localStorage.setItem("cart", JSON.stringify(newState.cart_ID));
                    break;
            case ProductActionType.setAuth: // payload is all products (ProductModel[])
           
                    newState.auth = action.payload;
                    
                    if (newState.auth?.admin === 1) {
                        newState.auth.admin = true;
                    }
        
                    localStorage.setItem("user", JSON.stringify(newState.auth));
                    break;
             
    
            case ProductActionType.setTotal: // payload is all products (ProductModel[])
            newState.total = action.payload;
            localStorage.setItem("total", JSON.stringify(newState.total));

            break;
            case ProductActionType.setProducts: // payload is all products (ProductModel[])
            newState.products = action.payload;
            break;
            case ProductActionType.productUpdated: { // payload is the updated product (ProductModel)
                const index = newState.products.findIndex((p: { product_ID: any }) => p.product_ID === action.payload.product_ID);
                newState.products[index] = action.payload;
                break;
            }
            case ProductActionType.setProduct: // payload is all products (ProductModel[])
            newState.product = action.payload;
            break;
            
        case ProductActionType.productAdded: // payload is the added product (ProductModel)
            newState.products.push(action.payload);
            break;
        case ProductActionType.totalUpdated: { // payload is the updated product (ProductModel)
            newState.total += action.payload;
            break;
        }
        // case ProductActionType.productDeleted: { // payload is the deleted product's id (number)
        //     const index = newState.product.findIndex(p => p === action.payload.id);
        //     newState.product.splice(index, 1);
        //     break;
        // }
    }
    return newState;
}