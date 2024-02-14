function objectToArray<T>(obj: T) {
  const result = [];
  for (const key in obj) {
    result.push(obj[key]);
  }
  return result;
}

export default objectToArray;
