$using('FunUI.css');
$using('FunListView.js');

/*构造函数*/
var FunInput = function(para) {
	check(para);
	this.domId = para.domId;
	this.width = para.width || 150;
	this.height = para.height || 26;
	this.disabled = para.disabled || false;
	this.is_pwd = para.is_pwd || false;
	this.value = para.value || '';
	this.label = para.label || '';
	this.chkText = para.chkText || '';
	this.onclick = para.onclick;
	this.oninput = para.oninput;
	this.onblur = para.onblur;
	this.field = para.field;

	this.fixIEcount = 0;//修复IE下问题多加入的一个控制参数
}

/*画出控件结构*/
FunInput.prototype.draw = function(domId) {

	var dom = document.getElementById(checkDom(this.domId, domId));

	var funinput = document.createElement('div');
	funinput.id = 'fun_input_div_' + createControlId('.fun_input_div');
	funinput.className = 'fun_input_div';
	dom.appendChild(funinput);

	var input = document.createElement('input');
	input.id = 'fun_input_' + createControlId('.fun_input');
	input.className = 'fun_input';
	input.disabled = this.disabled;
	input.value = this.value;
	if (this.is_pwd)
		input.type = 'password';
	$(input).width(this.width);

	funinput.input = input;

	var label = document.createElement('span');
	label.id = input.id + '_label';
	label.className = 'fun_input_label';
	$(label).text(this.label);
	funinput.appendChild(label);

	funinput.label = label;

	funinput.appendChild(input);
	var chk = document.createElement('span');
	chk.id = input.id + '_chk';
	chk.className = 'fun_input_chk';
	$(chk).text(this.chkText);
	funinput.appendChild(chk);
	chk.style.display = 'none';

	funinput.chkSpan = chk;

	this.instance = funinput;

	this.createControl();
}

FunInput.prototype.createControl = function() {
	var input = $(this.instance.input);
	var current = this;

	if (this.onclick) {
		input.bind('click', current.onclick);
	}

	if (this.oninput) {
		input.bind('propertychange input', function() {
			current.value = input.get(0).value;
			current.oninput();
		});
	}

	if (this.onblur) {
		input.bind('blur', current.onblur);
	}
}

FunInput.prototype.getValue = function() {
	return this.value;
}

FunInput.prototype.setValue = function(value) {
	this.value = value;
	var input = this.instance.input;
	input.value = value;
}

FunInput.prototype.clear = function() {
	this.setValue('');
}

FunInput.prototype.setChkSpan = function(text) {
	$(this.instance.chkSpan).text(text);
	this.showChkSpan();
}

FunInput.prototype.clearChkSpan = function() {
	$(this.instance.chkSpan).text('');
	this.hideChkSpan();
}

FunInput.prototype.showChkSpan = function() {
	this.instance.chkSpan.style.display = 'inline';
}

FunInput.prototype.hideChkSpan = function() {
	this.instance.chkSpan.style.display = 'none';
}

FunInput.prototype.reset = function() {
	this.clear();
	this.clearChkSpan();
}

/*输入框的输入事件函数，为了修复IE下的问题才这样封装的*/
FunInput.prototype.bindInput = function(fun) {
	var current = this;
	var input = $(this.instance.input);
	var browser = $.browser;
	if (browser.msie) {
		//为了过滤IE加载页面时就执行一次，和选择搜索结果后，继续弹出搜索框
		input.bind('propertychange', function() {
			if (current.fixIEcount != 0) {
				fun();
			}
			current.fixIEcount++;
		});
	} else {
		input.bind('input', fun);
	}
}



/*搜索输入框*/
var FunSearchInput = function(para) {
	check(para);
	$expands(this, FunInput, para);
	this.url = para.url || '';
	this.oninput = para.oninput;
	this.method = para.method || 'post'//默认post方式请求数据
	this.dataField = para.dataField || 'data';//请求回来数据json的主要数据字段
	this.resultField = para.resultField;
	this.valueField = para.valueField;
	this.maxResult = para.maxResult || 10;
	this.realValue = '';

	this.resultView = new FunListView({});
}

FunSearchInput.prototype.draw = function() {
	this.super_draw(); //父类的draw方法

	this.instance.input.autocomplete = "off"; //将输入框的自动填充提示禁止

	this.resultView.width = $(this.instance.input).width();
	this.resultView.draw(this.instance.id);

	$(this.resultView.instance).hide();

	$(this.resultView.instance).css({
		'margin-left': $(this.instance.input).offset().left - 7 //TODO:要调一下参数
	});
}

FunSearchInput.prototype.createControl = function() {
	var current = this;
	var input = $(this.instance.input);

	this.bindInput(function(){
		current.value = input.get(0).value;
		current.search();
	});

	input.bind('blur', function() {
		//TODO:失去焦点
	});
}

/*生成搜索结果下来列表*/
FunSearchInput.prototype.createListView = function(data) {
	$(this.resultView.instance).hide();
	//先清空前一次的搜索，再添加新的结果
	this.resultView.removeAll();

	var max;
	if (data.length < this.maxResult) {
		max = data.length;
	} else {
		max = this.maxResult;
	}

	var current = this;
	for (var i = 0; i < max; i++) {
		var item = new FunListItem({
			width: this.resultView.width,
			field: this.resultField,
			onclick: function() {
				current.fixIEcount = 0;//修复IE下选择搜索结果后，继续弹出搜索框
				current.setValue(this.text);
				current.realValue = this.value;
				current.cleanResult();
			}
		});
		
		if(Object.prototype.toString.call(data[i])==='[object String]'){//判断data是否为一般的数组
			item.text = data[i];
			item.value = data[i];
		}else{
			item.text = data[i][item.field];
			item.value = data[i][this.valueField];
		}
		this.resultView.add(item);
	}

	$(this.resultView.instance).show(300);
}


FunSearchInput.prototype.search = function() {
	var formatData = [];
	var current = this;
	var sendData = {};
	$(sendData).attr(this.field,this.getValue());
	$.ajax({
		url:this.url,
		dataType: 'json',
		type:current.method,
		data:sendData
	}).done(function(data) {
		formatData = data;
	}).success(function() {
		current.createListView(formatData[current.dataField]);
	});
}

FunSearchInput.prototype.cleanResult = function() {
	$(this.resultView.instance).hide();
	this.resultView.removeAll();
}