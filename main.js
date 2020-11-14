import { contentWrapperStyle } from "./desktopFixed.js";
import { soldierTagStyle } from "./desktopFixed.js";

const header = document.querySelector("header");
const sectionFirstContentWrapper = document.querySelector(".section-first-content-wrapper");
const toggleBtn = document.querySelector(".toggle-button");
const toggleList = document.querySelector(".toggle-list");
const contentWrapperPlaceHolder = document.querySelector(".content-wrapper-place-holder");
const textBanner = document.querySelector(".banner");
const innerToggleButtons = Array.from(document.querySelectorAll(".toggle-list-item > a"));
const soldierTag = document.querySelector(".soldier-tag");
const innerToggleLists = [];
const htmlElement = document.documentElement;

function toggle(list) {
  list.style.display = list.style.display === "none" ? "block" : "none";
}

function closeAllInnerToggleList() {
  innerToggleLists.forEach((inLst) => (inLst.style.display = "none"));
}

function getComuptedMargin(element) {
  return htmlElement.clientWidth - element.getBoundingClientRect().right;
}

toggleBtn.addEventListener("click", (e) => {
  toggle(toggleList);
});

innerToggleButtons.forEach((inBtn) => {
  const innerToggleList = inBtn.nextElementSibling;
  if (innerToggleList) innerToggleLists.push(innerToggleList);
});

innerToggleButtons.forEach((i) => {
  i.addEventListener("click", (e) => {
    const innerToggleList = i.nextElementSibling;
    if (!innerToggleList) return;
    const isOpen = innerToggleList.style.display === "block";
    closeAllInnerToggleList();
    if (!isOpen) toggle(innerToggleList);
  });
});

htmlElement.addEventListener("click", (e) => {
  if (innerToggleButtons.includes(e.target)) return;
  closeAllInnerToggleList();
});

let sectionFirstContentWrapperMargin;
let soldierTagMargin;
let textBannerVerticalMargin;

window.addEventListener("scroll", (e) => {
  if (window.pageYOffset < 50) {
    sectionFirstContentWrapperMargin = getComuptedMargin(sectionFirstContentWrapper);
    soldierTagMargin = getComuptedMargin(soldierTag);
    textBannerVerticalMargin = textBanner.getBoundingClientRect().top;
  }

  if (window.pageYOffset >= 50 && htmlElement.clientWidth >= 943) {
    Object.assign(soldierTag.style, {
      right: soldierTagMargin + "px",
      ...soldierTagStyle,
    });
    Object.assign(sectionFirstContentWrapper.style, {
      paddingRight: sectionFirstContentWrapperMargin + "px",
      ...contentWrapperStyle,
    });
    textBanner.style["margin-top"] = textBannerVerticalMargin - header.style.height - 36 + "px";
  } else {
    sectionFirstContentWrapper.style = null;
    soldierTag.style = null;
    textBanner.style = null;
    header.style = null;
    toggleList.style.top = "1.5rem";
  }
});
