/* 
  this is an implementation of Wes Bos click & drag scroll algorythm. In his video, he shows how to do the horizontal scroll. I have implemented the vertical scroll for those wondering how to make it as well.
  
  Wes Bos video:
    https://www.youtube.com/watch?v=C9EWifQ5xqA
*/
const container = document.querySelector(".out-container");

let mousePosY;
let mousePosX;
let scrollBarX;
let scrollBarY;
let isMouseDown;

container.addEventListener("mousedown", (e) => {
  container.style.cursor = "grabbing";
  isMouseDown = true;
  mousePosY = e.pageY - container.offsetTop;
  mousePosX = e.pageX - container.offsetLeft;
  scrollBarX = container.scrollLeft;
  scrollBarY = container.scrollTop;

  console.log("mousedown");
});

container.addEventListener("mouseup", (e) => {
  container.style.cursor = "grab";
  isMouseDown = false;
  // console.log("mouseup");
});
container.addEventListener("mouseleave", (e) => {
  isMouseDown = false;
  // console.log("mouseleave");
});
container.addEventListener("mousemove", (e) => {
  if (isMouseDown) {
    e.preventDefault();
    //Move vertcally
    const newMouseY = e.pageY - container.offsetTop;
    const walkY = mousePosY - newMouseY;
    container.scrollTop = scrollBarY + walkY;

    //Move Horizontally
    const newMouseX = e.pageX - container.offsetLeft;
    const walkX = mousePosX - newMouseX;
    container.scrollLeft = scrollBarX + walkX;

    console.log(walkX);

    // console.log("mousemove start-----", {
    //   pageX: e.pageX,
    //   containerOffsetLeft: container.offsetLeft,
    //   newX,
    //   startX,
    //   dragDistanceX,
    //   originScrollX,
    //   containerScrollLeft: container.scrollLeft,
    // });
  }
});
