function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }

  const result = {};
  for (const key in obj) {
    result[key] = deepClone(obj[key]);
  }

  return result;
}