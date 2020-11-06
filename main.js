const toggleBtn = document.querySelector('.toggle-button');
const toggleList = document.querySelector('.toggle-list');
const sectionFirstContentWrapper = document.querySelector('.section-first-content-wrapper');
const contentWrapperPlaceHolder = document.querySelector('.content-wrapper-place-holder');
const textBanner = document.querySelector('.banner');
const innerToggleButtons = Array.from(document.querySelectorAll('.toggle-list-item > a'));
const soldierTag = document.querySelector('.soldier-tag');
const innerToggleLists = [];
const htmlElement = document.documentElement;

function toggle(list) {
    list.style.display = list.style.display === 'none' ? 'block' : 'none';
}

function closeAllInnerToggleList(){
    innerToggleLists.forEach(inLst => inLst.style.display = 'none');
}

function getComuptedMargin(element){
    return htmlElement.clientWidth - element.getBoundingClientRect().right;
}

toggleBtn.addEventListener('click',e => {
   toggle(toggleList);
})

innerToggleButtons.forEach(inBtn => {
    const innerToggleList = inBtn.nextElementSibling;
    if(innerToggleList)  innerToggleLists.push(innerToggleList);  
})

innerToggleButtons.forEach(i => {
    i.addEventListener('click',e => {
       const innerToggleList = i.nextElementSibling;
       if(!innerToggleList) return;
       const isOpen =  innerToggleList.style.display === 'block';
       closeAllInnerToggleList();    
       if(!isOpen) toggle(innerToggleList);
    });
})
;
htmlElement.addEventListener('click',e => {
    if(innerToggleButtons.includes(e.target)) return;
    closeAllInnerToggleList();
});

let sectionFirstContentWrapperMargin;
let soldierTagMargin;
let textBannerVerticalMargin = getComuptedMargin(textBanner,'top');

window.addEventListener('scroll',e => {
  if(window.pageYOffset < 50) {
     sectionFirstContentWrapperMargin = getComuptedMargin(sectionFirstContentWrapper);
     soldierTagMargin = getComuptedMargin(soldierTag);
  } 

   if(window.pageYOffset >= 50 && htmlElement.clientWidth >= 943) {
    sectionFirstContentWrapper.style.position = 'fixed';
    sectionFirstContentWrapper.style['z-index'] = 2;
    sectionFirstContentWrapper.style.top = '0';
    sectionFirstContentWrapper.style.left = '0';
    sectionFirstContentWrapper.style.height = '75.4px';
    sectionFirstContentWrapper.style.width = '100%';
    sectionFirstContentWrapper.style.margin = '0 auto';
    sectionFirstContentWrapper.style.padding = '0';
    sectionFirstContentWrapper.style['padding-top'] = '19px';
    sectionFirstContentWrapper.style['padding-right'] = sectionFirstContentWrapperMargin + "px";
    
    soldierTag.style.position = 'fixed';
    soldierTag.style['z-index'] = '500';
    soldierTag.style.top = '0';
    soldierTag.style.right = soldierTagMargin + 'px';

    contentWrapperPlaceHolder.style.height = "55.8px";

    if(window.pageYOffset >= 238) 
         sectionFirstContentWrapper.style.borderBottom = '2px solid #213a7f';
    else sectionFirstContentWrapper.style.borderBottom = 'none';
   } 
   else {
    sectionFirstContentWrapper.style = null;
    soldierTag.style = null;
    contentWrapperPlaceHolder.style.height = "0";
    toggleList.style.top = '1.5rem';
   }
});