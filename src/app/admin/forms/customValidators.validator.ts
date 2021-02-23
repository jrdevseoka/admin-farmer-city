import {AbstractControl, FormGroup} from "@angular/forms";

export function ConfirmPasswordValidator( controlName: string, matchingControlName: string)
{
  return (supplierForm: FormGroup) =>{
    let control = supplierForm.controls[controlName];
    let matchingControl = supplierForm.controls[matchingControlName]
    if(
      matchingControl.errors && !matchingControl.errors.ConfirmPasswordValidator
    ){
      return;
    }
    if(control.value !==matchingControl.value){
      matchingControl.setErrors({confirmPasswordValidator: true});
    }
    else{
      matchingControl.setErrors(null);
    }
  }
}
