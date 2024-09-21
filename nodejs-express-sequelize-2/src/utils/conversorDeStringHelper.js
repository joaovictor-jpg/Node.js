module.exports = (objetoParams) => {
  for(let param in objetoParams) {
    if(/Id|id/.test(param)) {
      objetoParams[param] = Number(objetoParams[param]);
    }
  }

  return objetoParams;
};