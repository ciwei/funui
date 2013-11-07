$using('FunImage.js');
$using('FunButton.js');

/*表单组件*/
var FunForm = function(para) {
    check(para);
    this.title = para.title || 'FunForm';
    this.imgSrc = para.imgSrc;
    this.imgWidth = para.imgWidth;
    this.imgHeight = para.imgHeight;
    this.imgAlign = para.imgAlign;
    this.domId = para.domId;
    this.action = para.action || '';
    this.actionButtonName = para.actionButtonName || '登录';
    this.beforeSubmit = para.beforeSubmit;
    this.controlList = new Array();//用于存放控件
}

FunForm.prototype.draw = function(domId) {

    var dom = document.getElementById(checkDom(this.domId, domId));

    var form = document.createElement('form');
    form.id = 'fun_form_' + createControlId('.fun_form');
    form.className = 'fun_form';
    form.method = 'post';
    form.action = this.action;
    dom.appendChild(form);

    var imgDom = document.createElement('div');
    imgDom.id = form.id + '_img';
    imgDom.className = 'fun_form_img';
    form.appendChild(imgDom);

    var logo = new FunImage({
        domId: imgDom.id,
        src: this.imgSrc,
        width: this.imgWidth,
        height: this.imgHeight,
        align: this.imgAlign
    });
    logo.draw();

    var titleDom = document.createElement('div');
    titleDom.className = 'fun_form_title';
    $(titleDom).text(this.title);
    form.appendChild(titleDom);

    var contentDom = document.createElement('div');
    contentDom.id = form.id + '_content';
    contentDom.className = 'fun_form_content';
    form.appendChild(contentDom);
    this.contentDom = contentDom;

    var bottomDom = document.createElement('div');
    bottomDom.id = form.id + '_bottom';
    bottomDom.className = 'fun_form_bottom';
    form.appendChild(bottomDom);

    var list = this.controlList;
    var current = this;
    var actionButton = new FunButton({
        text: this.actionButtonName,
        domId: bottomDom.id,
        onclick: function(){
            if(current.beforeSubmit){
                if(current.beforeSubmit())
                    current.submit();
            }else{
                current.submit();
            }
        }
    });

    var resetButton = new FunButton({
        text: '重置',
        domId: bottomDom.id,
        onclick: function(){
            form.reset();
        }
    });

    actionButton.draw();
    resetButton.draw();

    //计算调节按钮摆放位置
    var bdWidth = $(bottomDom).width();
    var b1 = document.getElementById(actionButton.instance.id);
    var b2 = document.getElementById(resetButton.instance.id);
    var b1Width = $(b1).width();
    var b2Width = $(b2).width();
    var margin = (bdWidth - b1Width - b2Width - 100) / 2;
    $(b1).css({
        'margin-left': margin
    });

    $(b2).css({
        'margin-right': margin,
        'float': 'right'
    })

    this.instance = form;

    // this.createControl();
}


/*添加控件*/
FunForm.prototype.add = function(control) {
    var wrap = document.createElement('div');
    wrap.id = 'fun_form_content_wrap_' + createControlId('.fun_form_content_wrap');
    wrap.className = 'fun_form_content_wrap';
    this.contentDom.appendChild(wrap);
    control.draw(wrap.id);

    this.controlList.push(control);
}

/*提交表单*/
FunForm.prototype.submit = function(){
    var data = '?';
    var list = this.controlList;
    for(var i=0;i<list.length;i++){
        data += list[i].field + '=' + list[i].getValue();
        if(i!=list.length-1) 
            data += '&';  
    }
    $.ajax({    
        type:'post',    
        url:this.action+data,    
        data:{},    
        cache:false,    
        dataType:'json',    
        success:function(){
            alert('1');
        }
    });
    
}