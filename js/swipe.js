$('.carousel').on('touchstart', function(event){
    const xClick = event.originalEvent.touches[0].pageX;
    $(this).one('touchmove', function(event){
        const xMove = event.originalEvent.touches[0].pageX;
        const sensitivityInPx = 5;
        if( Math.floor(xClick - xMove) > sensitivityInPx ){
            $(this).carousel('next');
        }
        else if( Math.floor(xClick - xMove) < -sensitivityInPx ){
            $(this).carousel('prev');
        }
    });
    $(this).on('touchend', function(){
        $(this).off('touchmove');
    });
});
var isDragging = false;
var startPosition=0;
var endPosition=0;
$(".carousel")
.mousedown(function(event) {
    isDragging = false;
    startPosition=event.originalEvent.screenX
})
.mousemove(function(event) {
    isDragging = true;
    endPosition=event.originalEvent.screenX
})
.mouseup(function(event) {
    var wasDragging = isDragging;
    if (wasDragging) {   
        const sensitivityInPx = 5;
        if( Math.floor(startPosition - endPosition) > sensitivityInPx ){
            $(this).carousel('next');
        }
        else if( Math.floor(startPosition - endPosition) < -sensitivityInPx ){
            $(this).carousel('prev');
        }
    }
}
);