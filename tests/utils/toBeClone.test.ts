import { clonesMatcher } from "./toBeClone";

describe("toBeClone matcher", () => {
  test("If received is not an object, then test should fail", () => {
    const { pass, message } = clonesMatcher(undefined, {});
    expect(pass).toBe(false);
    expect(message()).toBe("Received should be object");
  });

  test("If received is null, then test should fail", () => {
    const { pass, message } = clonesMatcher(null, {});
    expect(pass).toBe(false);
    expect(message()).toBe("Received should be object");
  });

  test("If expected is not an object, then test should fail", () => {
    const { pass, message } = clonesMatcher({}, undefined);
    expect(pass).toBe(false);
    expect(message()).toBe("Expected should be object");
  });

  test("If expected is null, then test should fail", () => {
    const { pass, message } = clonesMatcher({}, null);
    expect(pass).toBe(false);
    expect(message()).toBe("Expected should be object");
  });

  test("If objects are clones, then test should pass", () => {
    const object = { foo: "bar" };
    const objectClone = structuredClone(object);
    const { pass } = clonesMatcher(object, objectClone);
    expect(pass).toBe(true);
  });

  test("If same object, then test should fail", () => {
    const object = { foo: "bar" };
    expect(() => clonesMatcher(object, object)).toThrowError();
  });

  test("If objects are not clones, then test should fail", () => {
    const object = { foo: "bar" };
    const anotherObject = { bar: "foo" };
    expect(() => clonesMatcher(object, anotherObject)).toThrowError();
  });
});
