const xmlToObject = xmlStr => {
  const xml = XmlService.parse(xmlStr);
  const obj = {};
  const root = xml.getRootElement();
  obj[root.getName()] = convertXmlToObject(root);
  return obj;
};

const convertXmlToObject = (xml) => {
  const children = xml.getChildren();
  if (children.length === 0) return xml.getText();

  const childGroup = {};
  children.forEach(child => {
    const childName = child.getName();
    if (childGroup[childName] === undefined) childGroup[childName] = [];
    childGroup[childName].push(child);
  });

  const res = {};
  Object.keys(childGroup).forEach(key => {
    if (childGroup[key].length === 1) {
      res[key] = convertXmlToObject(childGroup[key][0]);
    } else {
      res[key] = childGroup[key].map(elm => convertXmlToObject(elm));
    }
  });
  
  return res;
};


