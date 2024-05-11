const objectToXml = (obj, root) => {
  const xmlDoc = XmlService.createDocument();
  convertObjectToXml(obj, root ?? "root", xmlDoc);
  return xmlDoc.getRootElement();
}

const convertObjectToXml = (obj, objKey, parentElement) => {
  const element = XmlService.createElement(objKey);
  if (obj instanceof Array) {
    obj.forEach(value => convertObjectToXml(value, objKey, parentElement));
    return;
  } else if (obj instanceof Object) {
    Object.keys(obj).forEach((key, i) => convertObjectToXml(obj[key], key, element));
  } else {
    element.setText(obj);
  }
  parentElement.addContent(element);
}
