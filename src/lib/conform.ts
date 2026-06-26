import type { FieldMetadata } from "@conform-to/react/future";
import type { HTMLInputTypeAttribute } from "react";

/**
 * Conform's future API (`@conform-to/react/future`) dropped the
 * `getInputProps`/`getTextareaProps` helpers from the stable package, which are
 * also type-incompatible with the future `FieldMetadata`. These thin wrappers
 * map the future field metadata onto native input/textarea props so the form
 * markup stays declarative.
 *
 * `field.key` is intentionally left out: React 19 warns when a `key` is passed
 * through a spread object, so callers must apply it directly via
 * `key={field.key}` on the JSX element.
 *
 * @see https://conform.guide/api/react/future/useForm
 */

function getControlProps<Shape>(field: FieldMetadata<Shape>) {
  return {
    id: field.id,
    name: field.name,
    form: field.formId,
    required: field.required,
    minLength: field.minLength,
    maxLength: field.maxLength,
    defaultValue: field.defaultValue,
    "aria-invalid": field.ariaInvalid,
    "aria-describedby": field.ariaDescribedBy,
  } as const;
}

export function getInputProps<Shape>(
  field: FieldMetadata<Shape>,
  { type }: { type: HTMLInputTypeAttribute },
) {
  return {
    ...getControlProps(field),
    type,
    min: field.min,
    max: field.max,
    step: field.step,
    pattern: field.pattern,
    multiple: field.multiple,
  } as const;
}

export function getTextareaProps<Shape>(field: FieldMetadata<Shape>) {
  return getControlProps(field);
}
