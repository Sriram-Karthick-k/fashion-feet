function navbarOpen(){
  var menuContainer=document.querySelector(".side-bar-container")
  menuContainer.style.zIndex="1"
  var sideBar=document.querySelector(".side-bar")
  sideBar.style.transform="translate(0%)"
}
function navbarClose(){
  var menuContainer=document.querySelector(".side-bar-container")
  menuContainer.style.zIndex="-1000"
  var sideBar=document.querySelector(".side-bar")
  sideBar.style.transform="translate(100%)"

}