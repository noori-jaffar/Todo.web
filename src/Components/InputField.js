import React from 'react'
import { useState,useRef } from 'react';
export default function InputField(props) {
  const inputBox = useRef();
  return (
    <div className='p-3 flex justify-around'>
      <input type = "text" placeholder='Enter data here!!' className = "p-3 focus:outline-none w-[90%] border border-slate-400" ref={inputBox}/>
      <div className='w-[50px] h-[50px] bg-[#e74c3c] text-white text-3xl rounded-[50%] flex justify-center items-center' 
      onClick={() => {
        props.handler(inputBox.current.value)
        inputBox.current.value = "";
      } }
      // onClick={props.handler}
      >
        <div>
          <i className='fa fa-add text-xs md:text-2xl 2xl:text-3xl cursor-pointer text-white fa-solid fa-plus" style="color: #ffffff'>
          {/* <i class="fa-solid fa-plus" style="color: #ffffff;"></i> */}
          </i>
        </div>
        
        </div>
    </div>
  )
}
