import type { Primitive, ZodLiteral, ZodNever } from "zod";
import { z } from "zod";

// https://stackoverflow.com/a/69756175/13727176
export type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P];
};

// https://github.com/colinhacks/zod/issues/831#issuecomment-997444465
type MappedZodLiterals<T extends readonly Primitive[]> = {
  -readonly [K in keyof T]: ZodLiteral<T[K]>;
};

export function createManyUnion<
  A extends Readonly<[Primitive, Primitive, ...Primitive[]]>
>(literals: A) {
  return z.union(
    literals.map((value) => z.literal(value)) as MappedZodLiterals<A>
  );
}

export function createUnionSchema<T extends readonly []>(values: T): ZodNever;
export function createUnionSchema<T extends readonly [Primitive]>(
  values: T
): ZodLiteral<T[0]>;
export function createUnionSchema<
  T extends readonly [Primitive, Primitive, ...Primitive[]]
>(values: T): z.ZodUnion<MappedZodLiterals<T>>;
export function createUnionSchema<T extends readonly Primitive[]>(values: T) {
  if (values.length > 1) {
    return createManyUnion(
      values as typeof values & [Primitive, Primitive, ...Primitive[]]
    );
  } else if (values.length === 1) {
    return z.literal(values[0]);
  } else if (values.length === 0) {
    return z.never();
  }
  throw new Error("Array must have a length");
}
