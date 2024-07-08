import React, { useState } from "react";


const Sidebar = ({active}) => {
  const sidemenus = [
    {
      menu_name: "Idea Generator",
    },
    {
      menu_name: "Writer",
    },
    {
      menu_name: "Video",
    },
    {
      menu_name: "Voiceover",
    },
    {
      menu_name: "Edit",
    },
    {
      menu_name: "Cost per minute video is $0.4",
    },
  ];
  return (
    <>
      <div className="bg-blue-500 w-64 fixed h-full left-0 top-0 flex-1">
        <div className="text-white text-2xl flex justify-center items-center my-10 font-semibold">Youtube Assistant</div>
        <div className="links">
          <ul>
            {sidemenus.map((value, index) => {
              return (
                <li className={`${index === active ? "text-black font-semibold" : "text-white"}`}>
                  <a href="" className="my-8 mx-12 text-xl flex gap-10 hover:border-r-2 hover:border-r-white hover:text-black duration-200">
                    {value.menu_name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
