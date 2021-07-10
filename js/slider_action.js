$(document).ready(function () {
  //works when clicking the slide next and previous buttons
  $('.slider-control').on('click', function () {
    const type=$(this)[0].classList
    if(type.contains("slide-left")){
      //previous conditions
      var containerParent=$(this)[0].nextElementSibling.children[0]
      var child=$(this)[0].nextElementSibling.children[0].children[0]
      var totalChildren=$(this)[0].nextElementSibling.children[0].children.length
      var childStyle=getComputedStyle(child);
      var childWidth=Number(childStyle.width.split("px")[0])+Number(childStyle.marginRight.split("px")[0])
      var numberOfChild=Math.round(containerParent.offsetWidth/childWidth)
      var toImage=Number(containerParent.dataset.numberimage)-1
      containerParent.style.transform="translate(-"+toImage*childWidth+"px)"
      containerParent.dataset.numberimage=toImage
      //toggles the class when the items reach to 0
      if(0===toImage){
        $(this).toggleClass("slider-control-active")
      }
      //updates the next button to active
      if(!($(this)[0].nextElementSibling.nextElementSibling.children[0].classList.contains("slider-control-active"))){
        $(this)[0].nextElementSibling.nextElementSibling.classList+=" slider-control-active"
      }
    }else{
      //next condition
      var containerParent=$(this)[0].previousElementSibling.children[0]
      var child=$(this)[0].previousElementSibling.children[0].children[0]
      var totalChildren=$(this)[0].previousElementSibling.children[0].children.length
      var childStyle=getComputedStyle(child);
      var childWidth=Number(childStyle.width.split("px")[0])+Number(childStyle.marginRight.split("px")[0])
      var numberOfChild=Math.round(containerParent.offsetWidth/childWidth)
      var toImage=Number(containerParent.dataset.numberimage)+1
      containerParent.style.transform="translate(-"+toImage*childWidth+"px)"
      containerParent.dataset.numberimage=toImage
      //toggles the class when  the items reach to n
      if(totalChildren===toImage+numberOfChild){
        $(this).toggleClass("slider-control-active")
      }
      //updates the previous button to active
      if(!($(this)[0].previousElementSibling.previousElementSibling.children[0].classList.contains("slider-control-active"))){
        $(this)[0].previousElementSibling.previousElementSibling.classList+=" slider-control-active"
      }
    }
  });
  var isDragging = false;
  var startPosition=0;
  var endPosition=0;
  $(".slide-container")
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
        //when we swipe from right to left
        if( Math.floor(startPosition - endPosition) > sensitivityInPx ){
          var nextButton=$(this)[0].parentElement.nextElementSibling
          var containerParent=nextButton.previousElementSibling.children[0]
          var child=nextButton.previousElementSibling.children[0].children[0]
          var totalChildren=nextButton.previousElementSibling.children[0].children.length
          var childStyle=getComputedStyle(child);
          var childWidth=Number(childStyle.width.split("px")[0])+Number(childStyle.marginRight.split("px")[0])
          var numberOfChild=Math.round(containerParent.offsetWidth/childWidth)
          var toImage=Number(containerParent.dataset.numberimage)+1
          //return when the item is at n
          if((toImage-1)+numberOfChild==totalChildren){
            return
          }
          containerParent.style.transform="translate(-"+toImage*childWidth+"px)"
          containerParent.dataset.numberimage=toImage
          //toggles the class when the item reaches to n
          if(totalChildren===toImage+numberOfChild){
            nextButton.classList="slider-control slide-right"
          }
          //updates the previous button to active when the next button is clicked
          if(!(nextButton.previousElementSibling.previousElementSibling.children[0].classList.contains("slider-control-active"))){
            nextButton.previousElementSibling.previousElementSibling.classList+=" slider-control-active"
          }
        }
        else if( Math.floor(startPosition - endPosition) < -sensitivityInPx ){
          var previousBUtton=$(this)[0].parentElement.previousElementSibling
          var containerParent=previousBUtton.nextElementSibling.children[0]
          var child=previousBUtton.nextElementSibling.children[0].children[0]
          var totalChildren=previousBUtton.nextElementSibling.children[0].children.length
          var childStyle=getComputedStyle(child);
          var childWidth=Number(childStyle.width.split("px")[0])+Number(childStyle.marginRight.split("px")[0])
          var numberOfChild=Math.round(containerParent.offsetWidth/childWidth)
          var toImage=Number(containerParent.dataset.numberimage)-1
          //return when the item is at 0
          if((toImage+1)==0){
            return
          }
          containerParent.style.transform="translate(-"+toImage*childWidth+"px)"
          containerParent.dataset.numberimage=toImage
          //toggles the class when the item reaches to 0
          if(0===toImage){
            previousBUtton.classList="slider-control slide-left"
          }
          //updates the next button to active when the previous button is clicked
          if(!(previousBUtton.nextElementSibling.nextElementSibling.children[0].classList.contains("slider-control-active"))){
            previousBUtton.nextElementSibling.nextElementSibling.classList+=" slider-control-active"
          }
        }
      }
  });
});
//used to reset the slides when the size of the the page is changed
function resize(current){
  var containerParent=current[0].target
  if(containerParent.dataset.numberimage==0){
    return
  }else{
    containerParent.style.transform="translate(0px)"
    containerParent.dataset.numberimage=0
    containerParent.parentElement.previousElementSibling.classList=["slider-control slide-left"]
    containerParent.parentElement.nextElementSibling.classList=["slider-control slide-right slider-control-active"]
  }
}
//to pass all the slides to watch on resize
var slides=document.querySelectorAll(".slide-container")
for(var i=0;i<slides.length;i++){
  new ResizeObserver(resize).observe(slides[i])
}
//for swpie action 
$('.slide-container').on('touchstart', function(event){
  const xClick = event.originalEvent.touches[0].pageX;
  $(this).one('touchmove', function(event){
      const xMove = event.originalEvent.touches[0].pageX;
      const sensitivityInPx = 5;
      //when we swipe from right to left
      if( Math.floor(xClick - xMove) > sensitivityInPx ){
        var nextButton=$(this)[0].parentElement.nextElementSibling
        var containerParent=nextButton.previousElementSibling.children[0]
        var child=nextButton.previousElementSibling.children[0].children[0]
        var totalChildren=nextButton.previousElementSibling.children[0].children.length
        var childStyle=getComputedStyle(child);
        var childWidth=Number(childStyle.width.split("px")[0])+Number(childStyle.marginRight.split("px")[0])
        var numberOfChild=Math.round(containerParent.offsetWidth/childWidth)
        var toImage=Number(containerParent.dataset.numberimage)+1
        //return when the item is at n
        if((toImage-1)+numberOfChild==totalChildren){
          return
        }
        containerParent.style.transform="translate(-"+toImage*childWidth+"px)"
        containerParent.dataset.numberimage=toImage
        //toggles the class when the item reaches to n
        if(totalChildren===toImage+numberOfChild){
          nextButton.classList="slider-control slide-right"
        }
        //updates the previous button to active when the next button is clicked
        if(!(nextButton.previousElementSibling.previousElementSibling.children[0].classList.contains("slider-control-active"))){
          nextButton.previousElementSibling.previousElementSibling.classList+=" slider-control-active"
        }
      }
      else if( Math.floor(xClick - xMove) < -sensitivityInPx ){
        var previousBUtton=$(this)[0].parentElement.previousElementSibling
        var containerParent=previousBUtton.nextElementSibling.children[0]
        var child=previousBUtton.nextElementSibling.children[0].children[0]
        var totalChildren=previousBUtton.nextElementSibling.children[0].children.length
        var childStyle=getComputedStyle(child);
        var childWidth=Number(childStyle.width.split("px")[0])+Number(childStyle.marginRight.split("px")[0])
        var numberOfChild=Math.round(containerParent.offsetWidth/childWidth)
        var toImage=Number(containerParent.dataset.numberimage)-1
        //return when the item is at 0
        if((toImage+1)==0){
          return
        }
        containerParent.style.transform="translate(-"+toImage*childWidth+"px)"
        containerParent.dataset.numberimage=toImage
        //toggles the class when the item reaches to 0
        if(0===toImage){
          previousBUtton.classList="slider-control slide-left"
        }
        //updates the next button to active when the previous button is clicked
        if(!(previousBUtton.nextElementSibling.nextElementSibling.children[0].classList.contains("slider-control-active"))){
          previousBUtton.nextElementSibling.nextElementSibling.classList+=" slider-control-active"
        }
      }
  });
  $(this).on('touchend', function(){
      $(this).off('touchmove');
  });
});