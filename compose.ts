// Copyright (C) 2022 Russell Clarey. All rights reserved. MIT license.

// deno-fmt-ignore-file
// deno-lint-ignore-file no-explicit-any
import { Middleware as M, Ctx as C, Handler } from "./types.ts";

type Rm<R, P> = Pick<
  R,
  {
    [Key in keyof R]: Key extends keyof P ? P[Key] extends R[Key] ? never : Key
      : Key;
  }[keyof R]
>;

export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>
): M<
  R0 & Rm<R1, P0>,
  P0 & P1
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>
): M<
  R0 & Rm<R1 & R2, P0 & P1>,
  P0 & P1 & P2
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>
): M<
  R0 & Rm<R1 & R2 & R3, P0 & P1 & P2>,
  P0 & P1 & P2 & P3
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>
): M<
  R0 & Rm<R1 & R2 & R3 & R4, P0 & P1 & P2 & P3>,
  P0 & P1 & P2 & P3 & P4
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>
): M<
  R0 & Rm<R1 & R2 & R3 & R4 & R5, P0 & P1 & P2 & P3 & P4>,
  P0 & P1 & P2 & P3 & P4 & P5
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>
): M<
  R0 & Rm<R1 & R2 & R3 & R4 & R5 & R6, P0 & P1 & P2 & P3 & P4 & P5>,
  P0 & P1 & P2 & P3 & P4 & P5 & P6
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>
): M<
  R0 & Rm<R1 & R2 & R3 & R4 & R5 & R6 & R7, P0 & P1 & P2 & P3 & P4 & P5 & P6>,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C, R11 extends C, P11 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>, m11: M<R11, P11>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C, R11 extends C, P11 extends C,
  R12 extends C, P12 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>, m11: M<R11, P11>,
  m12: M<R12, P12>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C, R11 extends C, P11 extends C,
  R12 extends C, P12 extends C, R13 extends C, P13 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>, m11: M<R11, P11>,
  m12: M<R12, P12>, m13: M<R13, P13>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C, R11 extends C, P11 extends C,
  R12 extends C, P12 extends C, R13 extends C, P13 extends C, R14 extends C, P14 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>, m11: M<R11, P11>,
  m12: M<R12, P12>, m13: M<R13, P13>, m14: M<R14, P14>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C, R11 extends C, P11 extends C,
  R12 extends C, P12 extends C, R13 extends C, P13 extends C, R14 extends C, P14 extends C,
  R15 extends C, P15 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>, m11: M<R11, P11>,
  m12: M<R12, P12>, m13: M<R13, P13>, m14: M<R14, P14>, m15: M<R15, P15>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14 & R15,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C, R11 extends C, P11 extends C,
  R12 extends C, P12 extends C, R13 extends C, P13 extends C, R14 extends C, P14 extends C,
  R15 extends C, P15 extends C, R16 extends C, P16 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>, m11: M<R11, P11>,
  m12: M<R12, P12>, m13: M<R13, P13>, m14: M<R14, P14>, m15: M<R15, P15>,
  m16: M<R16, P16>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14 & R15 & R16,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
  & P16
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C, R11 extends C, P11 extends C,
  R12 extends C, P12 extends C, R13 extends C, P13 extends C, R14 extends C, P14 extends C,
  R15 extends C, P15 extends C, R16 extends C, P16 extends C, R17 extends C, P17 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>, m11: M<R11, P11>,
  m12: M<R12, P12>, m13: M<R13, P13>, m14: M<R14, P14>, m15: M<R15, P15>,
  m16: M<R16, P16>, m17: M<R17, P17>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14 & R15 & R16
    & R17,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
    & P16
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
  & P16 & P17
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C, R11 extends C, P11 extends C,
  R12 extends C, P12 extends C, R13 extends C, P13 extends C, R14 extends C, P14 extends C,
  R15 extends C, P15 extends C, R16 extends C, P16 extends C, R17 extends C, P17 extends C,
  R18 extends C, P18 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>, m11: M<R11, P11>,
  m12: M<R12, P12>, m13: M<R13, P13>, m14: M<R14, P14>, m15: M<R15, P15>,
  m16: M<R16, P16>, m17: M<R17, P17>, m18: M<R18, P18>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14 & R15 & R16
    & R17 & R18,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
    & P16 & P17
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
  & P16 & P17 & P18
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C, R11 extends C, P11 extends C,
  R12 extends C, P12 extends C, R13 extends C, P13 extends C, R14 extends C, P14 extends C,
  R15 extends C, P15 extends C, R16 extends C, P16 extends C, R17 extends C, P17 extends C,
  R18 extends C, P18 extends C, R19 extends C, P19 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>, m11: M<R11, P11>,
  m12: M<R12, P12>, m13: M<R13, P13>, m14: M<R14, P14>, m15: M<R15, P15>,
  m16: M<R16, P16>, m17: M<R17, P17>, m18: M<R18, P18>, m19: M<R19, P19>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14 & R15 & R16
    & R17 & R18 & R19,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
    & P16 & P17 & P18
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
  & P16 & P17 & P18 & P19
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C, R11 extends C, P11 extends C,
  R12 extends C, P12 extends C, R13 extends C, P13 extends C, R14 extends C, P14 extends C,
  R15 extends C, P15 extends C, R16 extends C, P16 extends C, R17 extends C, P17 extends C,
  R18 extends C, P18 extends C, R19 extends C, P19 extends C, R20 extends C, P20 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>, m11: M<R11, P11>,
  m12: M<R12, P12>, m13: M<R13, P13>, m14: M<R14, P14>, m15: M<R15, P15>,
  m16: M<R16, P16>, m17: M<R17, P17>, m18: M<R18, P18>, m19: M<R19, P19>,
  m20: M<R20, P20>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14 & R15 & R16
    & R17 & R18 & R19 & R20,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
    & P16 & P17 & P18 & P19
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
  & P16 & P17 & P18 & P19 & P20
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C, R11 extends C, P11 extends C,
  R12 extends C, P12 extends C, R13 extends C, P13 extends C, R14 extends C, P14 extends C,
  R15 extends C, P15 extends C, R16 extends C, P16 extends C, R17 extends C, P17 extends C,
  R18 extends C, P18 extends C, R19 extends C, P19 extends C, R20 extends C, P20 extends C,
  R21 extends C, P21 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>, m11: M<R11, P11>,
  m12: M<R12, P12>, m13: M<R13, P13>, m14: M<R14, P14>, m15: M<R15, P15>,
  m16: M<R16, P16>, m17: M<R17, P17>, m18: M<R18, P18>, m19: M<R19, P19>,
  m20: M<R20, P20>, m21: M<R21, P21>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14 & R15 & R16
    & R17 & R18 & R19 & R20 & R21,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
    & P16 & P17 & P18 & P19 & P20
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
  & P16 & P17 & P18 & P19 & P20 & P21
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C, R11 extends C, P11 extends C,
  R12 extends C, P12 extends C, R13 extends C, P13 extends C, R14 extends C, P14 extends C,
  R15 extends C, P15 extends C, R16 extends C, P16 extends C, R17 extends C, P17 extends C,
  R18 extends C, P18 extends C, R19 extends C, P19 extends C, R20 extends C, P20 extends C,
  R21 extends C, P21 extends C, R22 extends C, P22 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>, m11: M<R11, P11>,
  m12: M<R12, P12>, m13: M<R13, P13>, m14: M<R14, P14>, m15: M<R15, P15>,
  m16: M<R16, P16>, m17: M<R17, P17>, m18: M<R18, P18>, m19: M<R19, P19>,
  m20: M<R20, P20>, m21: M<R21, P21>, m22: M<R22, P22>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14 & R15 & R16
    & R17 & R18 & R19 & R20 & R21 & R22,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
    & P16 & P17 & P18 & P19 & P20 & P21
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
  & P16 & P17 & P18 & P19 & P20 & P21 & P22
>;
export function composeMiddleware<
  R0 extends C, P0 extends C, R1 extends C, P1 extends C, R2 extends C, P2 extends C,
  R3 extends C, P3 extends C, R4 extends C, P4 extends C, R5 extends C, P5 extends C,
  R6 extends C, P6 extends C, R7 extends C, P7 extends C, R8 extends C, P8 extends C,
  R9 extends C, P9 extends C, R10 extends C, P10 extends C, R11 extends C, P11 extends C,
  R12 extends C, P12 extends C, R13 extends C, P13 extends C, R14 extends C, P14 extends C,
  R15 extends C, P15 extends C, R16 extends C, P16 extends C, R17 extends C, P17 extends C,
  R18 extends C, P18 extends C, R19 extends C, P19 extends C, R20 extends C, P20 extends C,
  R21 extends C, P21 extends C, R22 extends C, P22 extends C, R23 extends C, P23 extends C
>(
  m0: M<R0, P0>, m1: M<R1, P1>, m2: M<R2, P2>, m3: M<R3, P3>,
  m4: M<R4, P4>, m5: M<R5, P5>, m6: M<R6, P6>, m7: M<R7, P7>,
  m8: M<R8, P8>, m9: M<R9, P9>, m10: M<R10, P10>, m11: M<R11, P11>,
  m12: M<R12, P12>, m13: M<R13, P13>, m14: M<R14, P14>, m15: M<R15, P15>,
  m16: M<R16, P16>, m17: M<R17, P17>, m18: M<R18, P18>, m19: M<R19, P19>,
  m20: M<R20, P20>, m21: M<R21, P21>, m22: M<R22, P22>, m23: M<R23, P23>
): M<
  R0 & Rm<
    R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14 & R15 & R16
    & R17 & R18 & R19 & R20 & R21 & R22 & R23,
    P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
    & P16 & P17 & P18 & P19 & P20 & P21 & P22
  >,
  P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 & P14 & P15
  & P16 & P17 & P18 & P19 & P20 & P21 & P22 & P23
>;
export function composeMiddleware<T extends M<any>[]>(...middleware: T): M<any> {
  return <U extends C>(handler: Handler<U>) => {
    let f = handler;
    for (let i = middleware.length - 1; i >= 0; i -= 1) {
      const m = middleware[i]!;
      f = m(f);
    }
    return f as any;
  };
}
