declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T> {
      /**
       * Used when you want to check that two objects are clones
       */
      toBeClone(expected: any): T;
    }
  }
}

export function clonesMatcher(received: any, expected: any) {
  if (typeof received !== "object" || received === null) {
    return {
      pass: false,
      message: () => "Received should be object",
    };
  }

  if (typeof expected !== "object" || expected === null) {
    return {
      pass: false,
      message: () => "Expected should be object",
    };
  }

  expect(received).not.toBe(expected);
  expect(received).toEqual(expected);

  return { pass: true, message: () => "" };
}

export default {
  toBeClone(received: any, expected: any) {
    return clonesMatcher(received, expected);
  },
} as jest.ExpectExtendMap;
