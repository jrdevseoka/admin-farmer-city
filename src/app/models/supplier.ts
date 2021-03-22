
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
  roles: Roles | undefined;
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

export interface AccountInfo{
   id: string;
   bankInfo: Bank
   accountType: string;
   accountName: string;
   AccountHolder: string;
}
export interface Bank{
  id: string;
  bankName: string;
  bankCode: string;
}
export class paymentDetails{
  accountHolderName?: string;
  accountNo?: string;
  accountType?: string;
  bankName?: string;
  bankCode?: string;
}
export interface Supplier extends User, CompanyDetails, paymentDetails{
  supplierID: string;
  supplierStatus: string ;
}
export interface Province {
  id: string;
  provinceName: string;
}
export interface Product {
  payload: any;
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
