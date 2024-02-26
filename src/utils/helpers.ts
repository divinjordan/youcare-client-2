export function uuid() {
  var d = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export function formatUrlParams(params: any) {
  return (
    "?" +
    Object.entries(params)
      .map(([key, val]) => `${key}=${val}`)
      .join("&")
  );
}

export function drawSvg(
  xa: number,
  ya: number,
  xc: number,
  p: number,
  a: number
) {
  return (
    "M" +
    xa +
    " " +
    ya +
    " Q" +
    (xc - xa) / 2 +
    " " +
    p +
    "," +
    xc +
    " " +
    ya +
    " T" +
    2 * xc +
    " " +
    ya +
    " L" +
    2 * xc +
    " " +
    ya +
    a +
    " L" +
    xa +
    " " +
    ya +
    a +
    " z"
  );
}
