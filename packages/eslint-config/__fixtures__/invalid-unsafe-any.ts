// eslint-disable-next-line @typescript-eslint/no-explicit-any -- intentional for fixture
declare const risky: any;

// no-unsafe-assignment: assigning an `any` value to a typed variable.
export const value: number = risky;
