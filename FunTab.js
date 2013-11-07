$using('FunControl.js');

/*选项*/
var FunTabItem = function(para){
	//$expands(this,FunControl,para);
	this.text = para.text;
	this.url = para.url;
}

FunTabItem.prototype.draw = function(domId){
	//var dom = document.getElementById(checkDom(this.domId, domId));

	var item = document.createElement('li');
	$(item).text(this.text);
	item.href = this.url;
}


/*选项卡*/
var FunTab = function(para){
	$expands(this,FunControl,para);
	this.width = para.width||'600px';
	this.height = para.height||'450px';
}

FunTab.prototype.draw = function(domId){
	var dom = document.getElementById(checkDom(this.domId, domId));

	var tabmenu = document.createElement('div');
	tabmenu.id = 'fun_tab_'+createControlId('fun_tab');
}