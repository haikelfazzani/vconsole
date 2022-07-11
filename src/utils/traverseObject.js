export default function traverseObject(jsonObj) {
  let result = []; // result contains non-object values
  (function traverse(jsonObj) {
    if (jsonObj !== null && typeof jsonObj == "object") {
      Object.entries(jsonObj).forEach(([key, value]) => {
        traverse(value);
      });
    }
    else {
      result.push(jsonObj);
      return
    }
  })(jsonObj);

  return result;
}