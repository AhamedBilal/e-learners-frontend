import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const password = control.get('password');
    const oldPassword = control.get('confirmPassword');

    if (password?.value === oldPassword?.value) {
      password?.setErrors(null);
      oldPassword?.setErrors(null);
      return null;
    } else {
      password?.setErrors({passwordNotMatch: true});
      oldPassword?.setErrors({passwordNotMatch: true});
    }
    return {passwordNotMatch: true};
  };
}
