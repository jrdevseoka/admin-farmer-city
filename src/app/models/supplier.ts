export class User {
  fullName?: string;
  emailAddress?: string;
  phoneNo?: string;
  password?: string;
  confirmpassword?: string;
}

export class CompanyDetails{
farmName?: string;
streetAddress?: string;
city?: string;
province?: string;
zipCode?: string;
status?: string;
farmCertificate?: string;
farmCIPCertificate?:string;
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
export interface Product{
  productID?: string,
  productName: string,
  productDescription: string,
  productCategory: string,
  productSupplier?: Supplier,
  productPrice: string,
  productQty: string,
  productImage?: string
}

