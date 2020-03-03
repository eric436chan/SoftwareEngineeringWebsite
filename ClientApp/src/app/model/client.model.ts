import { Address } from "./address.model";
import { CreditCardInfo } from "./creditCard.model";


export interface Client {
  firstName: string,
  lastName: string,
  emailAddress: string,
  address: Address,
  creditCardInfo: CreditCardInfo
}
