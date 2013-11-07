$using('FunUI.css');
$using('FunControl.js');

var FunTableCell = function(para){
	$expands(this, FunControl, para);
	this.text = para.text || '';
	this.align = para.align || 'left';
	this.backColor = para.backColor || '#ffffff';
	this.color = para.color || '#000000';
	this.font = para.font;
	this.fontWeight = para.fontWeight || 'normal';
	this.colspan = para.colspan || 1;
	this.instance = this.build();
}

FunTableCell.prototype.build = function(){
	var cell = newElement('td');
	cell.style.textAlign = this.align; 
	cell.style.color = this.color;
	cell.style.background = this.backColor
	cell.style.font = this.font;
	cell.style.fontWeight = this.fontWeight;
	cell.colSpan = this.colspan;
	$(cell).text(this.text);
	return cell;
}

FunTableCell.prototype.setTextAlign = function(align){
	this.instance.style.textAlign = align;
}

FunTableCell.prototype.setTextColor = function(color){
	this.instance.style.color = color;
}

FunTableCell.prototype.setBackColor = function(color){
	this.instance.style.background = color;
}

FunTableCell.prototype.setFont = function(font){
	this.instance.style.font = font;
}

FunTableCell.prototype.setFontWeight = function(weight){
	this.instance.style.fontWeight = weight;
}

/*表行*/
var FunTableRow = function(para){
	$expands(this, FunControl, para);
	this.cells = [];
	this.instance = this.build();
}

FunTableRow.prototype.build = function(){
	var row = newElement('tr');
	return row;
}


/*表格*/
var FunTable = function(para){
	$expands(this, FunControl, para);
	this.rows = para.rows || [];
	this.heads = para.heads || [];
}

FunTable.prototype.draw = function(domId){
	var dom = getDom(this,domId);

	var table = newElement('table');
	this.instance = table;
	this.resetIdClass('fun_table');
	dom.appendChild(table);

	//绘制表头
	var heads = this.heads;
	for(var i=0;i<heads.length;i++){
		var head = heads[i];
		var tr = new FunTableRow({});
		table.appendChild(tr.instance);
		for(var j=0;j<head.length;j++){
			var cell = new FunTableCell({
				text:head[j].text,
				align:'center',
				color:head[j].color,
				colspan:head[j].colspan,
				backColor:'green'
			});
			tr.cells.push(cell);//将cell存入row中
			tr.instance.appendChild(cell.instance);
		}
	}

	//绘制表内容
	var rows = this.rows;
	for(var i=0;i<rows.length;i++){
		var row = rows[i];
		var tr = new FunTableRow({});
		table.appendChild(tr.instance);
		for(var j=0;j<row.length;j++){
			var cell = new FunTableCell({
				text:row[j].text
			});
			tr.cells.push(cell);//将cell存入row中
			tr.instance.appendChild(cell.instance);
		}
	}

}

// FunTable.prototype.newCell = function(){
// 	return new FunTableCell({});
// }