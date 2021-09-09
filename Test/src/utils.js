export function trimNewLines(s) {
  return s.replace(/^[\s\n]+/, "").replace(/[\s\n]+$/, "");
}

export function removeAllStyle(el) {
  Array.prototype.forEach.call(el.children, (child) => removeAllStyle(child));
  //部分网站有防抓取的代码
  if (
    el.style.display === "none" ||
    el.style.fontSize === "0px" ||
    el.style.visibility === "hidden"
  ) {
    el.remove();
  } else {
    el.removeAttribute("id");
    el.removeAttribute("color");
    el.removeAttribute("class");
    el.removeAttribute("style");
  }
}

export function getHtml(selector) {
  const el = document.querySelector(selector);
  if (el) {
    return el.innerHTML;
  } else {
    return "";
  }
}

export function getContent(selector) {
  const el = document.querySelector(selector);
  if (!el) {
    return "";
  }
  const n = el.cloneNode(true);
  removeAllStyle(n);
  return trimNewLines(n.innerHTML);
}
