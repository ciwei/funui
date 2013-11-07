$using('FunUI.css');

/*构造函数*/
var FunPictureWall = function(para) {
	if(!para)
		para = {};
	this.domId = para.domId;
	this.url = para.url;
	this.cube_width = para.cube_width||50;
	this.rows = para.rows||3;
	this.columns = para.columns||4;
	this.cube_count = para.cube_count||12;
	this.pop_span = para.pop_span||3;
}

/*画出控件结构*/
FunPictureWall.prototype.draw = function(domId) {
	var div = document.getElementById(checkDom(this.domId, domId));
	var wall = document.createElement('div');
	wall.id = 'picture_wall_'+createControlId('.picture_wall');
	wall.className = 'picture_wall';
	for (var i = 0; i < this.cube_count; i++) {
		var cube = document.createElement('div');
		cube.className = 'cube';
		wall.appendChild(cube);
	}
	var shadow = document.createElement('div');
	shadow.className = 'shadow_layer';
	wall.appendChild(shadow);
	var pop = document.createElement('div');
	pop.className = 'pop_layer';
	wall.appendChild(pop);
	var pop_img = document.createElement('div');
	pop_img.className = 'highlight_img';
	pop.appendChild(pop_img);
	var pop_info = document.createElement('div');
	pop_info.className = 'info';
	pop.appendChild(pop_info);
	div.appendChild(wall);

	/*画好控件后产生控制代码*/
	this.createControl(wall.id);
};


/*产生控制代码*/
FunPictureWall.prototype.createControl = function(id) {
	var data;
	var current;
	var cube_index;

	var wall = $('#'+id);
	var cube = $(wall.find('.cube'));
	var shadow = $(wall.find('.shadow_layer').get(0));
	var pop = $(wall.find('.pop_layer').get(0));
	var pop_info = $(pop.find('.info').get(0));
	var pop_img = $(pop.find('.highlight_img').get(0));

	//设置传入的参数
	wall.width(this.columns*this.cube_width+'px');
	wall.height(this.rows*this.cube_width+'px');
	cube.width(this.cube_width+'px');
	cube.height(this.cube_width+'px');
	pop.width(this.cube_width*this.pop_span+'px');
	pop.height(this.cube_width+'px');
	pop_img.width(this.cube_width+'px');
	pop_info.width(this.cube_width*(this.pop_span-1)+'px');

	//获取数据
	$.getJSON(this.url, function(_data) {
		data = _data;
		$.each(data, function(index) {
			// $(wall.children('.cube')[index]).css({
			// 	'background-image': 'url(' + data[index]['image'] + ')'
			// });
			setBackgroundImg(wall.children('.cube')[index],data[index]['image']);
		})
	})


	var hovertime;
	var wall_width = wall.width();
	var cube_width = cube.width();
	var pop_width = pop.width();
	var wall_span = wall_width / cube_width; //墙的跨度
	var pop_span = pop_width / cube_width; //弹出层的跨度
	var cube_count = cube.length;

	cube.mouseover(function() {

		current = $(this);

		var position = current.offset();
		var img = current.css('background-image');
		cube_index = cube.index(current);
		var row_index = cube_index % wall_span;

		hovertime = setTimeout(function() {

			if (wall_span - (row_index + pop_span) < 0) {
				pop.css({
					'left': position.left - (pop_width - cube_width),
					'top': position.top
				}).show();

				pop_img.css({
					'left': pop_width - cube_width,
					'background-image': img
				});

				pop_info.css({
					'left': pop_width - cube_width*(pop_span-1)
				});

				pop_info.html(data[cube_index]['name']);

				pop_info.animate({
					'margin-left': -cube_width
				}, 300);

			} else {
				pop.css({
					'left': position.left,
					'top': position.top
				}).show();


				pop_img.css({
					'left': 0,
					'background-image': img
				});

				pop_info.html(data[cube_index]['name']);

				pop_info.css({
					'left': 0
				});

				pop_info.animate({
					'margin-left': cube_width
				}, 300);

			}


			shadow.fadeTo('fast', 0.6);

		}, 300);

	});


	cube.mouseout(function() {
		clearTimeout(hovertime);
	});


	pop_img.mouseout(function() {
		pop.hide();
		shadow.hide();
		pop_info.css({
			'margin-left': '0'
		});

	});

	//打个补丁，以免卡顿
	shadow.mouseenter(function() {
		pop.hide();
		shadow.hide();
		pop_info.css({
			'margin-left': '0'
		});
	});


	pop_img.click(function() {
		window.open(data[cube_index]['url']);
	});
}