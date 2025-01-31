/*
 *@Product: Betula animation
 *@Modulename: LoadPage
 *@Version: V0.1.0  - Functionality
 */

const xmlns = 'http://www.w3.org/2000/svg';
const globalColorDark = '#5e5f68';
const globalColorLight = '#ffffff';
globalThis.btlPageOnloading = 'false';
globalThis.btlLoadPageFinished = 'false';


/* 窗口监听函数 S */
const btlResizeWindow = (debounceDelay, func, eleId) => {
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
/* 窗口监听函数 E */

/* Module -LoadPage- Module ------- S*/
globalThis.btlLoadPageSvg = 'null';
function btlLoadCanvas(){
	let mask = document.getElementById('btl-loadpage-mask');
	const canvas = document.getElementById('btl-load-canvas');
	let loaded = 'false';
	//获取可用尺寸
	function getViewBox(){
	    if (window.innerWidth < 800){
			width = canvas.offsetWidth / 6;
		} else{
			width = canvas.offsetWidth / 7;
		}
		height = canvas.offsetHeight * 12;
		centerPoint = `${width / 2}, ${height / 2}`;
	}
	//绘制图形
	if (window.innerWidth < 600){
		createCanvas(8, '#d8d5ce', '#f0cfab', '#d6e2a0');
		console.log('1')
	}else {
		createCanvas(10, '#d8d5ce', '#f0cfab', '#d6e2a0');
		console.log('2')
	}
	
	function createCanvas(spacing = 10, initialColor = '#d6d5d8', /*加载完毕后*/mainColor = 'grey', minorColor = 'black'){
		let g = new Array();
		let rect = new Array();
		const svg = document.createElementNS(xmlns, 'svg');
		const pSvg = document.createElement('div');
		getViewBox();
		if (loaded !== 'true'){
			btlResizeWindow(300, getViewBox, 'btl-loadpage-mask');
		}
		drawing();
		async function drawing(){
			let animationTime = 5;
			//对页面尺寸变化的响应
			const updateSize = () =>{
				let svgWidth = canvas.offsetWidth;
				let svgHeight = canvas.offsetHeight;
				svg.setAttribute('width', svgWidth);
				svg.setAttribute('height', svgHeight);
				svg.setAttribute('viewBox', `${width / 2 - svgWidth / 2} ${height / 2 - svgHeight / 2} ${svgWidth} ${svgHeight}`);
			}
			await new Promise(resolve =>{
				pSvg.appendChild(svg);
				pSvg.setAttribute('id', 'btl-loadpage-svg')
				canvas.appendChild(pSvg);
				resolve();
			})
			async function copyRect(){
				for (let i = 0; i < spacing; null){
					await new Promise(resolve =>{
						rect[i] = document.createElementNS(xmlns, 'rect');
						rect[i].setAttribute('x', '0');
						rect[i].setAttribute('y', '0');
						rect[i].setAttribute('width', width);
						rect[i].setAttribute('height', height);
						resolve();
					})
					await new Promise(resolve =>{
						g[i] = document.createElementNS(xmlns, 'g');
						g[i].appendChild(rect[i]);
						svg.appendChild(g[i]);
						rect[i].setAttribute('transform', `rotate(45 ${centerPoint})`);
						g[i].setAttribute('style', `animation: btl-load-translateX ${animationTime}s infinite linear`);
						g[i].setAttribute('fill', initialColor);
						setTimeout(() =>{
							resolve();
						}, animationTime * 1000 / spacing + Math.floor((i + 1) / spacing)*120)
					})
					i++;
				}
				
			}
			copyRect();
			svg.setAttribute('style', 'transition: .1s');
			updateSize();
			let loadObserveSvg = setInterval(() =>{
				if (btlPageOnloading === 'true' && g.length === spacing){
					clearInterval(loadObserveSvg);
					LoadedAnimation();
					async function LoadedAnimation(){
						await new Promise(resolve =>{
							pSvg.setAttribute('style', 'height: 15%; filter: blur(10px) saturate(3) ;');
							for (let i = 0; i < g.length; i++){
								console.log(g[i]);
								console.log(i);
								if (i % 2 === 0){
									g[i].setAttribute('fill', minorColor);
								}else {
									g[i].setAttribute('fill', mainColor);
								}
							}
							resolve();
						})
						btlLoadPageSvg = 'loaded';
					}
				}
			}, 700);
			btlResizeWindow(300, updateSize, 'btl-loadpage-mask');
		}
	}
}


document.addEventListener('DOMContentLoaded', () =>{
	//动态控制svg
	if (btlPageOnloading === 'false'){
		btlLoadPage();
	}
	async function btlLoadPage(){
		const loadPage = document.getElementById('btl-loadpage');
		await new Promise(resolve =>{
			const loadPageMask = document.createElement('div');
			loadPageMask.setAttribute('id', 'btl-loadpage-mask');
			loadPage.appendChild(loadPageMask);
			resolve()
		})
		await new Promise(resolve =>{
			const loadPageMask = document.getElementById('btl-loadpage-mask');
			const loadCanvas = document.createElement('div');
			loadCanvas.setAttribute('id', 'btl-load-canvas');
			loadPageMask.appendChild(loadCanvas);
			textLoading(globalColorDark, '#f9cda8');
			function textLoading(color, afterColor){
				const animeMask = document.createElement('div');
				animeMask.setAttribute('class', 'btl-TA-01');
				const textLoading = document.createElement('div');
				textLoading.setAttribute('id', 'btl-loadpage-text');
				let textHeight = window.innerHeight / 100 * 3;
				let textWidth = window.innerWidth /1000 * 3;
				textLoading.setAttribute('style', `font-size: ${textHeight + textWidth}px; font-weight: bold; color: ${color}`)
				textLoading.innerText = 'Loading';
				loadCanvas.appendChild(animeMask);
				animeMask.setAttribute('style', 'display: flex; align-items: center; justify-content: center;')
				animeMask.appendChild(textLoading);
				btlTextAnimation01('btl-load-canvas' , 'btl-loadpage-text' , 1.2);
				let loadObserveText = setInterval(() =>{
					if (btlPageOnloading === 'true' && btlLoadPageSvg === 'loaded'){
						clearInterval(loadObserveText);
						loadedAnimation();
						async function loadedAnimation(){
							await new Promise(resolve =>{
								setTimeout(() =>{
									resolve()
								}, 200)
							})
							await new Promise(resolve =>{
								replaceClass(textLoading, 'btl-opacity-leave', 'btl-opacity-enter');
								setTimeout(() =>{
									resolve()
								}, 500)
							})
							textLoading.innerText = 'Welcom!';
							textLoading.setAttribute('style', `font-size: ${(textHeight + textWidth) * 1.5}px; font-weight: bold; color: ${afterColor}; font-family: Chillax-Medium;`);
							await new Promise(resolve =>{
								replaceClass(textLoading, 'btl-opacity-enter', 'btl-opacity-leave');
								setTimeout(() =>{
									resolve()
								}, 800)
							})
							loadedAnimationBlur();
						}
						async function loadedAnimationBlur(){
							const btlLoadpageFilter = document.createElement('div');
							const round = document.createElement('div');
							await new Promise(resolve =>{
								btlLoadpageFilter.setAttribute('id', 'btl-loadpage-filter');
								loadPage.appendChild(btlLoadpageFilter);
								btlLoadpageFilter.setAttribute('style', 'mask-size: 500%; transition: 1.5s cubic-bezier(0.65, 0.41, 0.29, 0.5)');
								setTimeout(() =>{
									resolve();
								}, 20)
							})
							await new Promise(resolve =>{
								btlLoadpageFilter.setAttribute('style', 'mask-size: 2000%; transition: 1.5s cubic-bezier(0.65, 0.41, 0.29, 0.5)');
								setTimeout(() =>{
									btlLoadpageFilter.setAttribute('style', 'mask-size: 2000%; transition: 0s ; mask-position: right');
									resolve();
								}, 1500)
							})
							pageState('visibility'); //页面显示
							await new Promise(resolve =>{
								setTimeout(() =>{
									btlLoadpageFilter.setAttribute('style', 'mask-size: 180%; transition: 1.2s ease-out; mask-position: right');
								}, 300)
								setTimeout(() =>{
									resolve();
								}, 1550)
							})
							btlLoadPageFinished = 'true';
							loadPage.remove();
						}
					}
				}, 700);
			}
			resolve()
		})
		btlLoadCanvas();
	}
})

/* Module -LoadPage- Module E -------*/

/* Module -TextAnimation- Module S -------*/
//*** Building
async function btlTextAnimation01(parentId, targetId, duration/*css格式 单位/s*/){
	let targetText = document.getElementById(targetId);
	console.log(targetText);
	let width = targetText.offsetWidth;
	let height = targetText.offsetHeight;
	let targetParentEl = document.querySelector(`#${parentId} .btl-TA-01`);
	let animation = document.createElement('div');
	animation.setAttribute('id', 'btl-TA-01');
	animation.setAttribute('style', `width: ${width}px; height: ${height}px;`)
	await new Promise(resolve =>{
		targetParentEl.appendChild(animation);
		resolve();
	})
	display();
	async function display(){
		let boxA = document.createElement('div');
		let boxB = document.createElement('div');
		await new Promise(resolve =>{
			boxA.setAttribute('style', `width: 90%; height: 100%; background-color: ${globalColorLight}; transition: ${duration / 3 * 2}s cubic-bezier(1, -0.02, 0.58, 1);`);
			animation.appendChild(boxA);
			boxB.setAttribute('style', `width: 10%; height: 100%; background-color: ${globalColorDark};`);
			animation.appendChild(boxB);
			resolve();
		})
		boxA.setAttribute('style', `width: 0%; height: 100%; background-color: ${globalColorLight}; transition: ${duration / 3 * 2}s cubic-bezier(1, -0.02, 0.58, 1);`);
		await new Promise(resolve =>{
			setTimeout(() =>{
				boxB.setAttribute('style', `width: 10%; height: 0%; background-color: ${globalColorDark}; transition: ${duration / 3 }s cubic-bezier(0.2, 0.79, 0.23, 0.72);`);
				setTimeout(() =>{
					resolve();
				}, duration / 3 * 1000);
			}, duration / 3 * 2 * 1000);
		})
		setTimeout(() =>{
			animation.remove();
		}, 2000);
	}
}