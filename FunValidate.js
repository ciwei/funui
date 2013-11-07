var FunValidate = function(obj) {
	check(obj);
	this.label = obj.label || '该控件的值';
}

/*检验是否为空*/
var ChkEmpty = function(obj) {
	check(obj);
	$expands(this, FunValidate, obj);

	this.msg = obj.chkText || this.label + '不能为空!';
	this.chkValiate(obj, this.msg);
}

ChkEmpty.prototype.chkValiate = function(obj, msg) {
	if (!obj.value) {
		obj.setChkSpan(msg);
		return false;
	} else {
		obj.clearChkSpan();
		return true;
	}
}

/*检验手机号码*/
var ChkMoblie = function(obj, chk) {
	check(obj);
	$expands(this, FunValidate, obj);

	this.msg = '手机号码有误,请重新输入！';
	if (chk)
		obj.chk = chk;
	this.chkValiate(obj, this.msg);
}

ChkMoblie.prototype.chkValiate = function(obj, msg) {
	if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(obj.value))) {
		obj.setChkSpan(msg);
		return false;
	} else {
		if (obj.chk)
			this.chkPlace(obj);
		else
			obj.clearChkSpan();
		return true;
	}
}

/*检测号码归属地*/
ChkMoblie.prototype.chkPlace = function(obj) {
	var url = 'http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=' + obj.value;
	$.ajax({
		url: url,
		dataType:'jsonp'
	}).done(function(data) {
		obj.setChkSpan(data.province + '(' + data.catName + ')');
	});
}