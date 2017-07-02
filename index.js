$(document).ready(function(){
    console.log("Ready to rolllllllllllllllllllllll........................ Yeaaaaaaahhhhhhhh");
    var canvas = document.getElementById("canvasDemo");
    var ctx = canvas.getContext("2d");
    canvas.width = $(".canvasBoard").width()-10;
    canvas.height = $(".canvasBoard").height()-10;
    initPainter(canvas);
    initToolBox();
});


var clearCanvas = function(){
    var canvas = document.getElementById("canvasDemo");
    var ctx = canvas.getContext("2d");
    var height = $(".canvasBoard").height();
    var width = $(".canvasBoard").width();
    ctx.clearRect(0, 0, height, width);
}

var painter = null;
var initPainter = function(canvas){
    //Register mouse and keyboard related events
    //register mouse touch enter
    
    canvas.onmousedown = function(mouseTouchOrigin){
        var originX = mouseTouchOrigin.pageX;
        var originY = mouseTouchOrigin.pageY;
        var offsetX = canvas.offsetLeft;
        var offsetY = canvas.offsetTop;
        var selectedColor = $("#colorPickerInput").val();
        var lineWidth = $("#lineWidthSetting").val();
        painter = new Painter(originX, originY, offsetX, offsetY, selectedColor, lineWidth);
        //register mouse move once mouse touched down
        canvas.onmousemove = function(eObj){
            var xPos = eObj.pageX;
            var yPos = eObj.pageY;
            var ctx = canvas.getContext("2d");
            painter.mouseStroke(ctx, xPos, yPos);
            console.log("Mouse moved");
        }
    }
    
    
    
    //register mouse touch leave
    canvas.onmouseup = function(){
        //unregister mouse move once mouse touch is released
        canvas.onmousemove = null;
    }
    
}

var initToolBox = function(){
    var toolbar = $("#toolbar");
    var dragger = new Dragger(toolbar, ["toolbar-item"]);
    dragger.setDraggable();
    
    //register toolbar buttons
    $("#eraseAll").on("click", function(){
        var canvas = document.getElementById("canvasDemo");
        if(painter)
            painter.eraseAll(canvas);
    });
    
    $("#lineWidthSetting").on("change",function(e){
        console.log($(this).val());
        $("#lineWidth").html($(this).val());
    });
    
    $("#lineWidthSetting").hide();
    $("#showSlider").addClass("arrow-right");
    $("#showSlider").on("click", function(){
        if($(this).attr("class").indexOf("arrow-right") >= 0){
            $(this).removeClass("arrow-right");
            $(this).addClass("arrow-left");
            $("#lineWidthSetting").show();
        }
        else{
            $(this).removeClass("arrow-left");
            $(this).addClass("arrow-right");
            $("#lineWidthSetting").hide();
        }
    });
}