import React from "react";

const Color = (props) => {
  const { colorData , setColor} = props;
  console.log("c",setColor)

  const handleColorClick = (item) => {
    setColor(item?._id);

    console.log("c",item)
  };
  return (
    <>
      <ul className="colors ps-0">
        {colorData &&
          colorData.map((item, index) => {
            return (
              <div key={index}>
                <li onClick={() => handleColorClick(item)} style={{ backgroundColor: item?.title }}></li>
              </div>
            );
          })}
      </ul>
    </>
  );
};

export default Color;
