
export interface Roles {
  id: string;
  roleName: string;
}

export class User {
  id?: string;
  fullName?: string;
  emailAddress?: string;
  phoneNo?: string;
  password?: string;
  confirmpassword?: string;
  roles?: Roles | undefined;
}
export interface Order{
  id: string;
  productImage: string;
  productName: string;
  productPrice: string;
  status: string;
  total: string;

}
export class CompanyDetails{
farmName?: string;
streetAddress?: string;
city?: string;
province?: Province;
zipCode?: string;
status?: string;
farmCertificate?: string;
farmCIPCertificate?:string;
}
export interface Bank{
  id: string;
  bankName: string;
}
export interface Accounts{
  id?: string,
  bankType: string;
}
export class paymentDetails{
  accountHolderName?: string;
  accountNo?: string;
  accountType?: Accounts;
  bankName?: Bank;
  bankCode?: string;
}
export interface Supplier extends User, CompanyDetails, paymentDetails{
  supplierStatus: boolean ;
}
export interface Province {
  id?: string;
  provinceName: string;
}
export interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productQty: string;
  productPrice: string;
  productCategory: string;
  promoPrice: string;
  promoStatus: string;
  dateStarted: Date;
  dateEnded: Date;
  productSupplier: any;
  productImage?: string;
}
