/* 
  this is an implementation of Wes Bos click & drag scroll algorythm. In his video, he shows how to do the horizontal scroll. I have implemented the vertical scroll for those wondering how to make it as well.
  
  Wes Bos video:
    https://www.youtube.com/watch?v=C9EWifQ5xqA
*/
const container = document.querySelector(".container");

let startY;
let startX;
let originScrollX;
let originScrollY;
let isDown;

container.addEventListener("mousedown", (e) => {
  container.style.cursor = "grabbing";
  isDown = true;
  startY = e.pageY - container.offsetTop;
  startX = e.pageX - container.offsetLeft;
  originScrollX = container.scrollLeft;
  originScrollY = container.scrollTop;

  console.log("mousedown");
});

container.addEventListener("mouseup", (e) => {
  container.style.cursor = "grab";
  isDown = false;
  // console.log("mouseup");
});
container.addEventListener("mouseleave", (e) => {
  isDown = false;
  // console.log("mouseleave");
});
container.addEventListener("mousemove", (e) => {
  if (isDown) {
    e.preventDefault();
    //Move vertcally
    const newY = e.pageY - container.offsetTop;
    const dragDistanceY = startY - newY ;
    container.scrollTop = originScrollY + dragDistanceY;

    //Move Horizontally
    const newX = e.pageX - container.offsetLeft;
    const dragDistanceX = startX - newX;
    container.scrollLeft = originScrollX + dragDistanceX;

    console.log("mousemove start-----", {
      pageX: e.pageX,
      containerOffsetLeft: container.offsetLeft,
      newX,
      startX,
      dragDistanceX,
      originScrollX,
      containerScrollLeft: container.scrollLeft,
    });
  }
});
