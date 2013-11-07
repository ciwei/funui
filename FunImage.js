var FunImage = function(para) {
    check(para);
    this.src = para.src || '';
    this.width = para.width || '100px';
    this.height = para.height || '100px';
    this.align = para.align || 'left';
    this.domId = para.domId;
}

FunImage.prototype.draw = function(domId) {
    var dom = document.getElementById(checkDom(this.domId, domId));

    var img = document.createElement('div');
    img.id = 'fun_image_' + createControlId('.fun_image');
    img.className = 'fun_image';
    var img_path = 'images/' + this.src + '.png';
    img_path = Using.getAbsolutePath(img_path);

    $(img).css({
        'width': this.width,
        'height': this.height,
        'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + img_path + '" ,sizingMethod= "scale" )'
    });
    var browser = $.browser;
    if (!browser.msie) {
        $(img).css({
            'background-image': 'url("' + img_path + '")'
        });
    }

    if (this.align == 'center') {
        $(img).css({
            'margin': '0 auto'
        });
    }

    if (this.align == 'right') {
        $(img).css({
            'margin': '0 0 0 auto'
        });
    }

    dom.appendChild(img);

    this.instance = img;
}

FunImage.prototype.setWidth = function(width){
    $(this.instance).width(width);
}

FunImage.prototype.setHeight = function(height){
    $(this.instance).height(height);
}