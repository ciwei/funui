$using('FunUI.css');

var FunButton = function(para) {
    check(para);
    this.text = para.text || '点击';
    this.disabled = para.disabled || false;
    this.onclick = para.onclick;
    this.domId = para.domId;
}

FunButton.prototype.draw = function(domId) {

    var dom = document.getElementById(checkDom(this.domId, domId));

    var button = document.createElement('div');
    button.id = 'fun_button_' + createControlId('.fun_button');
    button.className = 'fun_button';
    $(button).text(this.text);
    dom.appendChild(button);

    this.instance = button;

    this.createControl();
}

FunButton.prototype.createControl = function() {
    var current = this;
    if (this.onclick && !this.disabled) {
        $(this.instance).bind('click', current.onclick);
    }

    if (this.disabled) {
        $(this.instance).css({
            'background-color': 'gray',
            'cursor': 'default'
        });
    }

    $(this.instance).bind('mouseover', function() {
        $(current.instance).css({
            'background-color': '#f08080'
        });
    });

    $(this.instance).bind('mouseout', function() {
        $(current.instance).css({
            'background-color': '#fffacd'
        });
    });
}


FunButton.prototype.setWidth = function(width) {
    $(this.instance).width(width);
}

FunButton.prototype.setHeight = function(height) {
    $(this.instance).height(height);
}

FunButton.prototype.setColor = function(color, action) {
    var current = this;
    if (!action) { //未设置action默认为设置静态背景颜色
        $(current.instance).css({
            'background-color': color
        });
    } else {
        $(this.instance).bind(action, function() {
            $(current.instance).css({
                'background-color': color
            });
        });
    }
}

FunButton.prototype.setFontColor = function(color) {
    $(this.instance).css({
        'color': color
    })
}

FunButton.prototype.setFontFamily = function(family) {
    $(this.instance).css({
        'font-family': family
    })
}


/*图片按钮*/
var FunImageButton = function(para) {
    check(para);
    $expands(this, FunButton, para);
    this.onclick = para.onclick;
    this.img = para.img || 'default';
}

FunImageButton.prototype.draw = function(domId) {
    var dom = document.getElementById(checkDom(this.domId, domId));

    var button = document.createElement('div');
    button.id = 'fun_img_button_' + createControlId('.fun_img_button');
    button.className = 'fun_img_button';
    dom.appendChild(button);

    var img = document.createElement('div');
    var img_path = 'images/' + this.img + '.png';
    img_path = Using.getAbsolutePath(img_path);
    setBackgroundImg(img, img_path);
    if (this.align == 'center') {
        $(img).css({
            'margin': '0 auto'
        });
    }
    button.appendChild(img);

    button.img = img;

    var span = document.createElement('span');
    $(span).text($(span).text() + this.text);
    button.appendChild(span);

    button.textSpan = span;

    this.instance = button;

    this.createControl();
}

FunImageButton.prototype.setHeight = function(height) {
    $(this.instance).height(height);
    var data = height.replace('px', '');
    $(this.instance.img).css({
        'margin-top': (data - $(this.instance.img).height()) / 2 + 'px'
    });
    // $(this.instance.textSpan).css({
    //     'margin-top': 100
    // });
}