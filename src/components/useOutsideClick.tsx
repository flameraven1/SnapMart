import { useEffect } from "react";

export default function useOutsideClick( ref : any, handleEvent : ()=>void) {
  useEffect(()=>{

    function mouseListener(e : MouseEvent){
      if(ref.current && ref.current.contains(e.target as Node)){
        return;
      }else{
        handleEvent();
      }
    }
    document.addEventListener("mousedown" , mouseListener)

    return ()=>document.removeEventListener("mousedown" , mouseListener)
  } , [ref , handleEvent])
}
