import { DarkColor } from "./Redux/DarkColorSlice";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addLightColor } from "./Redux/AddLightColor";

export const DarkColorCom=()=>{
const dispatch=useDispatch();    
const color = useSelector((state) => state.color.color);
   
    useEffect(() => {
        switch (color) {
            case '#ffdbae':
                dispatch(DarkColor('#ffae49'));
                break;
        
                case '#000000':                 
             dispatch(DarkColor('#000000'));
             dispatch(addLightColor("#f2f0f1"))
                break;
        
                case '#071f3f':
                    dispatch(DarkColor('#031021'));
                    dispatch(addLightColor('#d8dfe9'))
                break;
        
                case '#2a3c29':
                    dispatch(DarkColor('#455744'));
                    dispatch(addLightColor("#d7dbb4"));
                break;
        
                case '#613e3e':
                    dispatch(DarkColor('#502e2e'));
                    dispatch(addLightColor("#ebdbc2"))
                break;
        
            default:
                break;
        }
    }, [color])
    
   

}




