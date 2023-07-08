import React, { useState } from "react";
import { Widget } from "../utils/Widget";
import "../styles/grids.css";
import { RGBColorToCSS, capitalizeFirstLetter } from "../utils/utils";
import { COMPANIES, CUSTOM_COMPANIES } from "../utils/Links";
import { RGBColor } from "react-color";

type Props = {
  widgets: Widget[];
};

//? Group of Widgets
const WidgetGrid = ({ widgets }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };
  const handleMouseLeave = (color: RGBColor) => {
    setHoveredIndex(-1);
  };
  return (
    <div className={`grid size-${widgets.length}`}>
      {widgets.map((widget, i) => (
        <div
          key={i}
          className="center widget-container"
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={() => handleMouseLeave(widget.color)}
          style={{
            backgroundColor:
              hoveredIndex === i
                ? RGBColorToCSS({ ...widget.color, a: 0.125 })
                : "transparent",
            borderColor: RGBColorToCSS(widget.color),
            color: RGBColorToCSS(widget.color),
          }}
        >
          {COMPANIES.includes(widget.icon.toLowerCase()) ? (
            <i
              className={`grid-icon fa-brands fa-${widget.icon}`}
              style={{ color: RGBColorToCSS(widget.color), fontSize: "4vw" }}
            />
          ) : CUSTOM_COMPANIES.includes(widget.icon.toLowerCase()) ? (
            <img
              className="grid-icon"
              src={`${
                process.env.PUBLIC_URL
              }/assets/svgs/${widget.icon.toLowerCase()}.svg`}
              alt={""}
              style={{ color: RGBColorToCSS(widget.color) }}
            />
          ) : (
            capitalizeFirstLetter(widget.icon)
          )}
        </div>
      ))}
    </div>
  );
};

export default WidgetGrid;
