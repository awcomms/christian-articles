export const is_object = (v: unknown) => Object.prototype.toString.call(v) === '[object Object]';
