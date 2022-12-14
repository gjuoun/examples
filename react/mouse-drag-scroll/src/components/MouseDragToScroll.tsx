import { useRef, useState } from "react";

export function MouseDragToScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [scrollBarPos, setScrollBarPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current!;

    setIsMouseDown(true);

    /** window mouse position: {x: e.pageX, y: e.pageY}*/
    /** container mouse X is `mouseX - offsetLeft` */
    const mouseX = e.pageX - container.offsetLeft;
    const mouseY = e.pageY - container.offsetTop;
    setMousePos({ x: mouseX, y: mouseY });

    /** position of the scroll bar */
    setScrollBarPos({ x: container.scrollLeft, y: container.scrollTop });
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return;
    // mouse is down
    e.preventDefault();
    const container = containerRef.current!;

    const newMouseY = e.pageY - container.offsetTop;
    const walkY = newMouseY - mousePos.y;
    
    /** window mouse position: {x: e.pageX, y: e.pageY}*/
    /** container mouse X is `mouseX - offsetX` */
    const newMouseX = e.pageX - container.offsetLeft;

    //* walkX: mouse walk distance, negative -> mouse move left -> scroll right
    const walkX = newMouseX - mousePos.x;

    // nagative walkX means mouse move left, scroll right
    container.scrollLeft = scrollBarPos.x - walkX;
    container.scrollTop = scrollBarPos.y - walkY;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: isMouseDown ? "grabbing" : "grab" }}
      className="flex bg-slate-600 h-[300px] w-full max-w-lg border overflow-scroll mx-auto my-3"
    >
      <div className="flex-shrink-0 w-[300px] bg-blue-600">1</div>
      <div className="flex-shrink-0 w-[300px] bg-red-600">2</div>
      <div className="flex-shrink-0 w-[300px] bg-yellow-600">3</div>
      <div className="flex-shrink-0 w-[300px] bg-violet-600">4</div>
      <div className="flex-shrink-0 w-[300px] bg-green-600">5</div>
    </div>
  );
}