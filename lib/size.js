
module.exports = function(string) {

  return Buffer.byteLength(string, 'utf8');

  //parsedData.cssSize = Buffer.byteLength(parsedData.cssString, 'utf8');

};
