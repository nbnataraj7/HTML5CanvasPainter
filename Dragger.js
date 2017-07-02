function Dragger(draggableObject, noDragClasses){
    this.currentObject = $(draggableObject);
    this.noDragClasses = noDragClasses;
}

Dragger.prototype.setDraggable = function(){
    
    if(!this.currentObject)
        console.log("No Object found!");
    
    var currentObject = this.currentObject;
    var noDragClasses = this.noDragClasses;
    currentObject.on("mousedown", function(mouseOriginObject){
        var position = currentObject.position();
        //Return if target is not draggable
        if(noDragClasses && noDragClasses.indexOf(mouseOriginObject.target.className) >= 0)
            return;
        currentObject.css("border", "1px dashed #000");
        var mouseXOrigin = mouseOriginObject.pageX;
        var mouseYOrigin = mouseOriginObject.pageY;
        
        $(document).on("mousemove", function(mouseCurrentObject){
            var mouseXCurrent = mouseCurrentObject.pageX;
            var mouseYCurrent = mouseCurrentObject.pageY;
            var offsetX = mouseXCurrent - mouseXOrigin;
            var offsetY = mouseYCurrent - mouseYOrigin;
            var newPosition = {
                top: position.top + offsetY,
                left: position.left + offsetX
            }
            currentObject.offset(newPosition);
        });
        
    });
    
    $(document).on("mouseup", function(){
        $(document).off("mousemove");
        currentObject.css("border", "none");
    });
    
}