/*FunControl是fun-ui的控件基类*/
var FunControl = function(para) {
	check(para);
	//DOM
	this.domId = para.domId; //dom的id
	//值
	this.field = para.field;
	//事件
	
	//实体对象
	// this.instance = {
	// 	width: para.width,
	// 	height: para.height
	// };
}

/*画出控件*/
FunControl.prototype.draw = function(domId) {
	
	// this.createControl();
}

/*生成控制代码*/
FunControl.prototype.createControl = function() {

}

/*重新设置一个控件实体对象的id，className*/
FunControl.prototype.resetIdClass = function(cssTag) {
	this.instance.id = cssTag + '_' + createControlId('.' + cssTag);
	this.instance.className = cssTag;
	return this.instance;
}