/*
 *@Product: Myosotis Theme
 *@Modulename: Module.js
 *@Version: V0.1.0Beta
 */

document.addEventListener('DOMContentLoaded', () =>{
	elementPAutoWrap();
})

/* Module -ElementAutoWrap- Module S -------
换行符语法 - 将换行符置于预定下一段文本的开头 任何情况必须添加换行符作为单个元素的文本结尾*/
function elementPAutoWrap(){
	let p = document.querySelectorAll('p'); //获取所有p元素
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