import { Client } from "./client.model";
import { ProductOrder } from "./product.order.model";

export interface Order {
  client: Client,
  orderList: Array<ProductOrder>,
  datePlaced: string,
  paid: boolean
}
