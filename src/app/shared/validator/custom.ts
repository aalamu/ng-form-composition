import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function oneOfValidator(value: number[] | string[] | object): ValidatorFn {
  let valuesArray: (string | number)[] = [];
  if (typeof value === 'object' && !Array.isArray(value)) {
    valuesArray = Object.keys(value);
  } else if (Array.isArray(value)) {
    valuesArray = value;
  }

  return (control: AbstractControl): ValidationErrors | null => {
    // Check if the control is valid and has a value
    if (control && control.value) {
      const value: string = control.value;

      // Check if the control's value is not in the list of allowed values
      if (!valuesArray.includes(value)) {
        // Return an object containing the invalid value and allowed values
        return { invalidType: value, allowedValues: valuesArray };
      }
    }
    // Return null if the value is valid or the control is not set
    return null;
  };
}


/**
 * Creates a custom validator that checks if a control's value is one of the valid values from a given enum.
 *
 * @returns A function that takes a FormControl and returns validation errors or null.
 * @param value
 */
export function oneOf(value: number[] | string[] | object): ValidatorFn {
  // Use the oneOf with the values of the provided enum type
  return oneOfValidator(value);
}
