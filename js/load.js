/*
 *@Product: Myosotis Theme
 *@Modulename: animation
 *@Version: V0.1.0Beta
 */

/* 设置本地存储 键名 键值 有效期长*Day, Hour */
const setLocalStore = (key, value, expire = setTime(365, 0)) =>{
	let expires =  (new Date(Date.now() + (expire))).toString();
	localStorage.setItem(key , `${value}|${expires}`);
}

/* 获取本地存储 */
const getLocalStore = (key) =>{
	let store = localStorage.getItem(key);
	let valueNum = store.lastIndexOf('|');
	let now = new Date(Date.now());
	function Expires(){
		let expires = Date.parse(store.substring(valueNum, store.length));
		return expires
	}
	if (now >= Expires()){
		localStorage.removeItem(key);
		return 'expired'
	} else{
		let value = store.substring(0, valueNum);
		return value
	}
}

let firstLoad = getLocalStore("first_load");
if (firstLoad === 'false'){
	btlPageOnloading = 'true';
}

/* 监听加载流 */
const monitorLoad = () =>{
	return new Promise(resolve =>{
		const avater = document.getElementById('avatar');
		avater.src = './assets/img/avatar.png?' + new Date().getTime();
		avater.onload = () =>{
			globalThis.avaterOnload = 'true';
			resolve()
		}
	})
}

/* 资源(迭代资源)首次载入前的加载 */
document.addEventListener('DOMContentLoaded', () =>{
	globalThis.loadState = document.getElementById('load-state');
	if (firstLoad !== 'false'){
		console.log(firstLoad);
		/* 检查资源是否加载 */
		const loadImage = () =>{
			return new Promise(resolve =>{
				if (avaterOnload == 'true'){
					resolve()
				}
		    })
		}
		const loadFonts = () =>{
			return new Promise(resolve =>{
				if (document.fonts.status == 'loaded'){/* 应用缓存且未更改字体文件的情况 */
					resolve()
				} else{/* 未缓存或更改过字体文件的情况 */
					document.fonts.onloadingdone = () =>{
						resolve()
					}
				}
			})
		}
		/* 等待资源加载完毕 */
		loadStart();
		function loadStart(){
			localStorage.setItem("first_load", "false");
			loadAssets();
			async function loadAssets(){
				await monitorLoad();
				await loadImage();
				await loadFonts();
				btlPageOnloading = 'true';
				setLocalStore("first_load", "true", setTime(60, 0));
			}
		}
	}else {
		pageState('visibility');
		console.log(firstLoad);
	}
})

