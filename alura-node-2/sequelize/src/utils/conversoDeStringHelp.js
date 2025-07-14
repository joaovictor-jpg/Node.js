module.exports = (objectoParams) => {
  for (const propriedade in objectoParams) {
    if (/Id|id/.test(propriedade)) {
      objectoParams[propriedade] = Number(objectoParams[propriedade]);
    }
  }

  return objectoParams;
};