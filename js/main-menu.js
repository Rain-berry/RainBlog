/*
 *@Product: Myosotis Theme
 *@Modulename: Main-Menu
 *@Version: V0.1.0Beta
 */

/* 设置菜单栏总宽 */
setMenuWidth();
function setMenuWidth() {
	globalThis.menuUlElement = document.getElementById('top-menu');
	const countWidth = () => {
		let menuList = document.querySelectorAll('#top-menu>*');
		let vw = (menuList.length - 1) * 3;
		let strVw = vw.toString();
		globalThis.minMenuWidth = vw*40;
		return `width: calc(18rem + ${strVw}vw); min-width: calc(${strVw}px*40)`;
	}
	menuUlElement.setAttribute('style', countWidth())
}

/* 移动端自动折叠菜单 */
let i;
function displayMenu() {
	let topNav = document.querySelector('.top-nav');
	let viewportWidth = window.innerWidth;
	let bodyBox = document.querySelector('.wrapper');
	let styleBodybox = window.getComputedStyle(bodyBox,null);
	let bodyWith = parseFloat(styleBodybox.getPropertyValue('padding-left')) +
	parseFloat(styleBodybox.getPropertyValue('padding-right'));
	let pageHeader = document.querySelector('.page-header');
	if (viewportWidth - bodyWith - topNav.offsetWidth < minMenuWidth && i!=1) {
		replaceClass(menuUlElement, 'btl-opacity-leave', 'btl-opacity-enter');
		replaceClass(pageHeader, 'btl-opacity-leave', 'btl-opacity-enter');
		setTimeout(() => {
			menuUlElement.setAttribute('style', 'display: none');
			pageHeader.setAttribute('style', 'justify-content: flex-start;');
			replaceClass(pageHeader, 'btl-opacity-enter', 'btl-opacity-leave');
		}, 500);
        i = 1
	} else if(i==1 && viewportWidth - bodyWith - topNav.offsetWidth > minMenuWidth){
		replaceClass(pageHeader, 'btl-opacity-leave', 'btl-opacity-enter');
		setTimeout(() => {
			menuUlElement.setAttribute('style', 'display: flex');
			setMenuWidth();
			pageHeader.setAttribute('style', '');
			replaceClass(menuUlElement, 'btl-opacity-enter', 'btl-opacity-leave');
			replaceClass(pageHeader, 'btl-opacity-enter', 'btl-opacity-leave');
		}, 500);
		i--
	}
	
}
resizeWindow(500, displayMenu, 'body-size', 'resizeWidth');


