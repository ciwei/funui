$using('FunUI.css');
$using('FunControl.js');

var FunBubble = function(para) {
	$expands(this, FunControl, para);
	this.text = para.text;
	this.type = para.type || 'bottom'; //默认类型是箭头在下方的
	this.width = para.width||'150px';
}

FunBubble.prototype.draw = function(domId) {
	var dom = document.getElementById(checkDom(this.domId, domId));

	var bubble = document.createElement('div');
	bubble.id = 'fun_bubble_' + createControlId('.fun_bubble');
	bubble.className = 'fun_bubble';
	dom.appendChild(bubble);

	this.instance = bubble;

	var textbox = document.createElement('div');
	textbox.className = 'fun_bubble_box';
	$(textbox).text(this.text);
	$(textbox).width(this.width);

	var arrow = document.createElement('div');
	arrow.className = 'fun_bubble_arrow_bottom';

	if (this.type == 'bottom') {	
		bubble.appendChild(textbox);
		bubble.appendChild(arrow);	
	}

	if(this.type == 'top'){
		arrow.className = 'fun_bubble_arrow_top';
		bubble.appendChild(arrow);
		bubble.appendChild(textbox);
	}

	if(this.type == 'left'){
		arrow.className = 'fun_bubble_arrow_left';
		$(textbox).css({'margin-left':'20px'});
		bubble.appendChild(arrow);
		bubble.appendChild(textbox);
	}


}