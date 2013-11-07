var Using = {};

Using.importedFiles = [];

$using = function(url) {

	if (url == null || url == '')
		return false;

	if (Using.isImported(url))
		return false;

	if (Using.getFileType(url) == '')
		return false;

	url = Using.getAbsolutePath(url);

	if (Using.getFileType(url) == 'css')
		Using.importCSS(url);

	if (Using.getFileType(url) == 'js')
		Using.importJS(url);

	Using.addImportedFiles(url);
	return true;
}

/*判断文件是否已经被导入*/
Using.isImported = function(url) {
	for (var i = 0; i < Using.importedFiles.length; i++) {
		if (url == Using.importedFiles[i]) {
			return true;
		}
	}
	return false;
}

/*加入已引入的文件数组*/
Using.addImportedFiles = function(url) {
	if (!Using.isImported(url)) {
		Using.importedFiles.push(url);
	}
}

/*获取导入文件的文件类型*/
Using.getFileType = function(url) {
	var len = url.split('.').length
	if (len > 1) {
		var typeStr = url.split('.')[len - 1];
		if (typeStr == 'js' || typeStr == 'css') {
			return typeStr;
		}
	}
	return '';
}

/*导入js文件*/
Using.importJS = function(url) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.src = url;
	script.type = 'text/javascript';
	if (document.readyState == 'complete') {
		head.appendChild(script);
	} else {
		document.write(script.outerHTML);
	}
}

/*导入css文件*/
Using.importCSS = function(url) {
	var head = document.getElementsByTagName('head')[0];
	var link = document.createElement('link');
	link.href = url;
	link.type = 'text/css';
	link.rel = 'stylesheet';
	if (document.readyState == 'complete') {
		head.appendChild(link);
	} else {
		document.write(link.outerHTML);
	}
}

/*获取绝对路径*/
Using.getAbsolutePath = function(url) {
	//获取FunUtil.js的绝对路径
	var jsPath = document.getElementById('funui').src;
	var dicPath = jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
	return dicPath + url;
}

/*生成控件id*/
createControlId = function(className) {
	return $(className).length + 1;
}


/*类继承的方法*/
$expands = function(thisObj, parentClass, para) {
	check(para);

	obj = new parentClass(para);

	// //继承父类的函数
	// for (var fun in parentClass.prototype) { //遍历父类原型中的函数
	// 	if (!thisObj.__proto__[fun]) {
	// 		thisObj.__proto__[fun] = parentClass.prototype[fun];
	// 	}else{
	// 		//如果子类中方法被重写，原继承自父类的相应方法被放入super中
	// 		thisObj.__proto__['super_'+fun] = parentClass.prototype[fun];
	// 	}
	// }

	//继承父类的函数
	for (var fun in parentClass.prototype) { //遍历父类原型中的函数
		if (!thisObj.constructor.prototype[fun]) {
			thisObj.constructor.prototype[fun] = parentClass.prototype[fun];
		} else {
			//如果子类中方法被重写，原继承自父类的相应方法被放入super中
			thisObj.constructor.prototype['super_' + fun] = parentClass.prototype[fun];
		}
	}

	//继承父类的属性
	for (var attr in obj) {
		if (!thisObj[attr] && (typeof obj[attr] != 'function')) {
			$(thisObj).attr(attr, obj[attr]);
		}
	}


	delete obj;
}

/*封装输出方法*/
out = function(obj) {
	alert(obj);
}

/*封装控制台输出方法*/
// print = function(obj) {
// 	console.log(obj);
// }

/*检查参数*/
check = function(para) {
	if (!para)
		para = {};
}

checkDom = function(obj, domId) {
	if (domId)
		obj = domId;
	return obj;
}

/*解决IE下div背景图片不能缩放的问题*/
setBackgroundImg = function(img, img_path) {
	$(img).css({
		'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + img_path + '" ,sizingMethod= "scale" )'
	});
	var browser = $.browser;
	if (!browser.msie) {
		$(img).css({
			'background-image': 'url("' + img_path + '")'
		});
	}
}

/*将创建元素提取成为一个方法*/
newElement = function(element, cssTag) {
	var obj = document.createElement(element);
	if(cssTag){
		obj.id = cssTag + '_' + createControlId('.' + cssTag);
		obj.className = cssTag;
	}
	return obj;
}


/*获取dom控件绘制对象*/
getDom = function(obj,domId){
	var dom = document.getElementById(checkDom(obj.domId, domId));
	return dom;
}
