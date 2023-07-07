import React from "react";
import { Widget } from "../utils/Widget";
import "../styles/grids.css";
import { RGBColorToCSS } from "../utils/utils";

type Props = {
  widgets: Widget[];
};

//? Group of Widgets
const WidgetGrid = ({ widgets }: Props) => {
  return (
    <div className={`grid size-${widgets.length}`}>
      {widgets.map((widget, i) => {
        return (
          <div
            key={i}
            className="center"
            style={{ borderColor: RGBColorToCSS(widget.color) }}
          >
            <i className={`grid-icon fa-brands fa-${widget.icon}`}>
            </i>
          </div>
        );
      })}
    </div>
  );
};

export default WidgetGrid;
