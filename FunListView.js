$using('FunUI.css');

var FunListItem = function(para) {
	check(para);
	this.text = para.text || 'listItem';
	this.value = '';
	this.domId = para.domId;
	this.height = para.height || '25px';
	this.width = para.width || '120px';
	this.field = para.field;
	this.onclick = para.onclick;
}

FunListItem.prototype.draw = function(domId) {
	var dom = document.getElementById(checkDom(this.domId, domId));
	var item = document.createElement('div');
	item.id = 'fun_list_item_' + createControlId('.fun_list_item');
	item.className = 'fun_list_item';
	$(item).text(this.text);
	dom.appendChild(item);

	$(item).width(this.width);
	$(item).height(this.height);
	$(item).css({
		'line-height': this.height
	});

	this.instance = item;
	this.createControl();
}

FunListItem.prototype.createControl = function() {
	var item = $(this.instance);
	var current = this;
	item.bind('mouseenter', function() {
		item.css({
			'background-color': '#ffd700',
			'font-weight': '600'
		});
	});

	item.bind('mouseout', function() {
		item.css({
			'background-color': '#ffffff',
			'font-weight': 'normal'
		});
	});

	item.bind('click', function() {
		current.onclick();
	});
}

FunListItem.prototype.setWidth = function(width) {
	$(this.instance).width(width);
}

FunListItem.prototype.setHeight = function(height) {
	$(this.instance).css({
		'height': height,
		'line-height': height
	})
}


/*FunListView*/
var FunListView = function(para) {
	check(para);
	this.domId = para.domId;
	this.width = para.width;
	this.height = para.height;
	this.items = [];
}

FunListView.prototype.draw = function(domId) {
	var dom = document.getElementById(checkDom(this.domId, domId));
	var listView = document.createElement('div');
	listView.id = 'fun_list_view_' + createControlId('.fun_list_view');
	listView.className = 'fun_list_view';
	dom.appendChild(listView);

	$(listView).width(this.width);
	$(listView).height(this.height);

	this.instance = listView;
}

FunListView.prototype.add = function(item) {
	this.items.push(item);
	item.domId = this.instance.id;
	item.draw();
	item.setWidth(this.width);
}

FunListView.prototype.removeAll = function() {
	// var children = this.instance.childNodes;
	// out(this.instance.childNodes.length);
	// //应该倒着删子节点，因为子节点要前移
	// for (var i = children.length; i > 0; i--) {
	// 	this.instance.removeChild(children[i]);
	// }
	$(this.instance).empty();
}


FunListView.prototype.setWidth = function(width) {
	$(this.instance).width(width);
	var children = this.items;
	for (var i = 0; i < children.length; i++) {
		children[i].setWidth(width);
	}
}

FunListView.prototype.setHeight = function(height) {
	var children = this.items;
	$(this.instance).height(height*children.length);
	for (var i = 0; i < children.length; i++) {
		children[i].setHeight(height);
	}
}

FunListView.prototype.hide = function() {
	$(this.instance).hide();
}

FunListView.prototype.show = function() {
	$(this.instance).show();
}