import { SimpleValue } from "./variable-def.type";

const primitiveTypes = new Set(["number", "boolean", "string"]);

function isPrimitive(value: unknown): value is number | boolean | string {
  return value === null || primitiveTypes.has(typeof value);
}

function isPlainObject(value: unknown): value is {} {
  return value != null && Object.getPrototypeOf(value) === Object.prototype;
}

export function isSimpleValue(value: unknown): value is SimpleValue {
  if (isPrimitive(value)) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every(isPrimitive);
  }
  if (isPlainObject(value)) {
    return Object.values(value).every(isPrimitive);
  }
  return false;
}
