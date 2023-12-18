const selector = (sel) => {
  return document.querySelector(sel);
};

const selectorAll = (sel) => {
  return document.querySelectorAll(sel);
};

export { selector, selectorAll };

