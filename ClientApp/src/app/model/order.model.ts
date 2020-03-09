import { Client } from "./client.model";
import { ProductOrder } from "./product.order.model";

export interface Order {
  orderId: string,
  client: Client,
  orderList: Array<ProductOrder>,
  datePlaced: string,
  totalPrice: number
}
