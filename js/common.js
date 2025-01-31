/*
 *@Product: Myosotis Theme
 *@Modulename: CommonFunction
 *@Version: V0.1.0Beta
 */


/* 设置固定时长 *单位/毫秒*/
const setTime = (D = 0, H) =>{
	let hour = 1000 * 60 ** 2 * H ;
	let day = 1000 * 60 ** 2 * 24 * D ;
	return hour + day;
}

/* 替换Class函数 目标样式名, 替换后的Class, 要替换的Class*/
function replaceClass(ElementName, addClass, removeClass = '') {
	const start = ElementName.classList.add(addClass);
	const end = ElementName.classList.remove(removeClass);
	return {start, end}
}

/* 对象监听函数 延迟/ms  执行函数 对象Id 获取主轴/width&height(调试用)*/
const resizeWindow = (debounceDelay, func, eleId, axis) => {
	const resizeElement = () =>{
		let rE = document.getElementById(eleId);
		return rE
		}
	const debounce = (fn, delay) => {
		let timer;
	    return function() {
			if (timer){
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				fn();
			}, delay);
		}
	};
	const setDebounce = debounce(func, debounceDelay);
	const resizeObserver = new ResizeObserver((entries) => {
	    for (const entry of entries) {
		  let resizeWidth = entry.contentRect.width;
		  let resizeHeight = entry.contentRect.height;
	      setDebounce();
	    };
	  });
	resizeObserver.observe(resizeElement())
}

/* 控制页面显示 */
const pageState = (state) =>{
	let page = document.getElementById('root');
	if (state == 'visibility'){
		replaceClass(page, 'btl-opacity-enter', 'btl-opacity-leave');
		page.setAttribute('style', 'display: block;')
	} else if (state == 'hidden'){
		page.setAttribute('style', 'display: none; opacity: 0;')
	}
}

