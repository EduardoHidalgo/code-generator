function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

function pascalize(str: string) {
  return str.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1);
  });
}

export { camelize, pascalize };
