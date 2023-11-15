import { Product } from ".";

export interface ProductAndCartItem {
        quantity: number;
        product: Product;
        cartItemId: number;

}

export interface ProductAndOrderItem {
        product: Product;
        orderItemId: number;
        quantity: number;
}
