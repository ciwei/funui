$using('FunUI.css');
$using('FunButton.js');
$using('FunControl.js');
$using('FunListView.js');

var FunToolBar = function(para) {
	$expands(this, FunControl, para);
	this.items = para.items || [];
	this.domId = para.domId;
}

FunToolBar.prototype.draw = function(domId) {
	var dom = document.getElementById(checkDom(this.domId, domId));

	var bar = newElement('div', 'fun_toolbar');
	dom.appendChild(bar);

	this.instance = bar;

	this.instance.items = [];

	for (var i = 0; i < this.items.length; i++) {
		var item = this.items[i];

		var button = new FunImageButton({
			text: item.text,
			onclick: item.onclick,
			img: item.img
		});

		button.draw(bar.id);

		this.instance.items.push(button);

		$(button.instance).css({
			'border': '0px',
			'border-radius': '0px',
			'margin-left': '0px',
			'margin-right': '0px'
		});
		button.setColor('transparent');
		button.setColor('#888888', 'mouseover');
		button.setColor('transparent', 'mouseout');
	}

	//this.createControl();

	return this.instance;
}


FunToolBar.prototype.createControl = function() {

}


FunToolBar.prototype.getSize = function() {
	return this.instance.items.length;
}

FunToolBar.prototype.setBGColor = function(color) {
	for (var i = 0; i < this.getSize(); i++) {
		this.instance.items[i].setColor(color);
		this.instance.items[i].setColor(color, 'mouseout');
	}
}

FunToolBar.prototype.setChangeColor = function(color) {
	for (var i = 0; i < this.getSize(); i++) {
		this.instance.items[i].setColor(color, 'mouseover');
	}
}

FunToolBar.prototype.setFontColor = function(color) {
	for (var i = 0; i < this.getSize(); i++) {
		this.instance.items[i].setFontColor(color);
	}
}

FunToolBar.prototype.setFontFamily = function(family) {
	for (var i = 0; i < this.getSize(); i++) {
		this.instance.items[i].setFontFamily(family);
	}
}


//带下拉列表的工具条
var FunListBar = function(para) {
	$expands(this, FunToolBar, para);
}

FunListBar.prototype.draw = function(domId) {
	var dom = document.getElementById(checkDom(this.domId, domId));

	var listBar = this.super_draw();
	this.instance = listBar;
	this.resetIdClass('fun_listbar');

	dom.appendChild(listBar);

	var bottomDiv = newElement('div');
	bottomDiv.id = this.instance.id + '_bottom';
	bottomDiv.className = 'fun_listbar_bottom';
	listBar.appendChild(bottomDiv);
	listBar.bottomDiv = bottomDiv;

	//bottomDiv.style.top = $(listBar).width()+'px';

	this.subMenuList = [];

	var items = this.items;
	for (var i = 0; i < items.length; i++) {
		if (items[i].sublist) {
			var listView = new FunListView({
				//domId: listBar.items[i].instance.id//???改一下存储位置？
				domId: bottomDiv.id
			});
			listView.draw();
			for (var j = 0; j < items[i].sublist.length; j++) {
				var item = new FunListItem({
					text: items[i].sublist[j].text,
					onclick: items[i].sublist[j].onclick
				});
				listView.add(item);
			}
			listView.setWidth('73px');
			listView.setHeight('35px');
			$(listView.instance).css({
				'margin-left': i * 75 + 'px'
			});
			listView.hide();
			this.subMenuList.push(listView);
		}
	}

	this.createControl();
}


FunListBar.prototype.createControl = function() {
	var bar = this;

	for (var j = 0; j < this.instance.items.length; j++) {
		$(this.instance.items[j].instance).bind('click', function() {

			// var current;
			// current = bar.subMenuList[j];
			// for (var i = 0; i < bar.subMenuList.length; i++) {
				
			// 	if (bar.selectedButton == i) {
			// 		current.show();
			// 	} else {
			// 		current.hide();
			// 	}
			// }
		});
	}

	// $(this.instance.items[0].instance).bind('blur', function() {
	// 	alert(1);
	// });
}