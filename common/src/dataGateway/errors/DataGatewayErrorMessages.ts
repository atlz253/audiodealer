export default {
  getClassMethodNotImplementedErrorMessage: (
    className: string,
    methodName: string,
  ) => `${className}.${methodName} not implemented`,
} as const;
