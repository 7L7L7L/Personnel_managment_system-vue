
export default {
  //截取文件地址中的名字
  getUrlName(val) {
    let str = val.split("/").pop();
    let index = str.indexOf("_");
    str = str.substring(index + 1, str.length);
    return str;
  },
};
