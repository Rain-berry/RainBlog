/*
 *@Product: Myosotis Theme
 *@Modulename: Module.js
 *@Version: V0.1.0Beta
 */

document.addEventListener('DOMContentLoaded', () =>{
	elementPAutoWrapInit();
})

if(firstLoad === 'true'){
	pagePaletteInit();
}

/* Module -ElementAutoWrap- Module S -------
换行符语法 - 将换行符置于预定下一段文本的开头 任何情况必须添加换行符作为单个元素的文本结尾*/
function elementPAutoWrapInit(){
	const p = document.querySelectorAll('p'); //获取所有p元素
	for(let i = 0; i < p.length; i++){ //为所有p元素执行函数 判断是否有定义换行符 if (pText.indexOf('/&') !== -1)
		autoElementP(i);
	}
	
	async function autoElementP(plength){
		let pText = p[plength].innerText;
		if (pText.indexOf('/&') !== -1){
			let textFragment = pText.split('/&');
			let newLine = new Array();
			await new Promise(resolve =>{
				if(textFragment){
					console.log(9);
					p[plength].innerText = textFragment[0]
					resolve()
				}
			})
			for(let i = 1; i < textFragment.length; i++){
				console.log(i);
				if(i === 1){
					newLine[i] = p[plength].insertAdjacentElement("afterend", document.createElement('p'));
				} else{
					newLine[i] = newLine[i - 1].insertAdjacentElement("afterend", document.createElement('p'));
				}
				newLine[i].innerText = textFragment[i];
			}
		}
	}
}
/* Module -ElementAutoWrap- Module E -------*/

/* Module -HomeButton- Module S -------*/
function homeButtonInit(){
	const homeButtonDiv = document.getElementById('home-btn');
	const homeButton = homeButtonDiv.querySelectorAll("li");
	const homeBtnBlock = document.createElement('div');
	for(let i = 0; i < homeButton.length; i++){ 
		homeButton[i].appendChild(homeBtnBlock);
		console.log(homeButton[i]);
	}
}
/* Module -HomeButton- Module E -------*/

/* Module -PagePalette- Module S -------*/
function pagePaletteInit(){
	const pagePaletteOrange = document.getElementById('palette-orange');
	const pagePaletteRainberry = document.getElementById('palette-rainberry');
	const getStyle = document.styleSheets[0];
	console.log(getStyle)
	let selectorsColorMinor = '.logo>a>h2,#top-menu>*>*:hover,#btn-about:after,#btn-article:after'; /*次要元素样式*/
	let selectorsColorMain = '.comm-btn,.intro>h2,p>a'; /*主题色 主要元素样式 通用*/
	let selectorsColorCommon = '#top-menu>*>*,.intro>p,h1,h2,h3,h5,h6'; /*普通色 主要元素样式 通用*/
	let selectorsColorSecondary = '#home-btn>*>*'; /*主题色 次要元素样式 修饰*/
	let selectorsColorBright = '.intro>p.intro-crucial' /*主题色 主要元素样式 高饱和度/高亮度*/
	let selectorsColorBackground = '#root' /*页面背景色*/
	
	const orangePalette = () =>{ //橙色主题
	    getStyle.insertRule(`${selectorsColorBackground} {background-color: var(--color-grey-light);}`)
		getStyle.insertRule(`${selectorsColorMinor} { color: var(--color-grey-medium); }`);
		getStyle.insertRule(`${selectorsColorMain} { color: var(--color-orange-light); }`);
		getStyle.insertRule(`${selectorsColorCommon} { color: var(--color-grey-dark); }`);
		getStyle.insertRule(`${selectorsColorSecondary} { -webkit-text-stroke: .05rem var(--color-orange-dark);text-stroke: .05rem var(--color-orange-dark); }`);
		getStyle.insertRule(`${selectorsColorBright} { color: var(--color-orange-light-hs); }`);
	}
	
	const rainberryPalette = () =>{ //雨莓主题
	    getStyle.insertRule(`${selectorsColorBackground} {background-color: var(--color-rainberry-black);}`)
		getStyle.insertRule(`${selectorsColorMinor} { color: var(--color-rainberry-pink-dark-ls); }`);
		getStyle.insertRule(`${selectorsColorMain} { color: var(--color-rainberry-pink-ls); }`);
		getStyle.insertRule(`${selectorsColorCommon} { color: var(--color-rainberry-pink); }`);
		getStyle.insertRule(`${selectorsColorSecondary} { -webkit-text-stroke: .05rem var(--color-rainberry-pink-dark);text-stroke: .05rem var(--color-rainberry-pink-dark); }`);
		getStyle.insertRule(`${selectorsColorBright} { color: var(--color-rainberry-pink-hs); }`);
	}
	
	const defaultPalette = () =>{
		setTimeout(() =>{ //此处确保过渡效果样式位于末尾
			getStyle.insertRule(`${selectorsColorBackground},${selectorsColorMinor},${selectorsColorMain},${selectorsColorCommon},${selectorsColorSecondary},${selectorsColorBright} { transition: .5s; }`, getStyle.cssRules.length);
		}, 200);
		orangePalette();
	}
	defaultPalette(); //为应用可更改主题色的样式添加过渡效果，并添加默认的主题色到style.css样式表头部
	
	pagePaletteOrange.setAttribute('style', 'background: linear-gradient(145deg, #ecc19e 0%, #eb841d 100%);');
	pagePaletteRainberry.setAttribute('style', 'background: linear-gradient(145deg, #ecd6dd 0%, #f88ec5 100%);');
	
	pagePaletteOrange.addEventListener("click", async function(){
		await new Promise(resolve =>{
			const styleRulesLength = getStyle.cssRules.length;
			for(let i = 5; i >= 0; i--){ //删除默认主题色
				getStyle.deleteRule(i);
			};
			resolve();
		});
		console.log(getStyle);
		orangePalette();
	});
	pagePaletteRainberry.addEventListener("click", async function(){
		await new Promise(resolve =>{
			const styleRulesLength = getStyle.cssRules.length;
			for(let i = 5; i >= 0; i--){//删除默认主题色
				getStyle.deleteRule(i);
			};
			resolve();
		});
		rainberryPalette();
	})
}