import React, { useEffect, useRef, useState } from "react";
import { Widget } from "../utils/Widget";
import "../styles/grids.css";
import { RGBColorToCSS } from "../utils/utils";

type Props = {
  widgets: Widget[];
};

//? Group of Widgets
const WidgetGrid = ({ widgets }: Props) => {
  const [isIconAvailable, setIsIconAvailable] = useState<
    Record<string, boolean>
  >({});
  const iconRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    widgets.forEach((widget, i) => {
      if (iconRefs.current[i]) {
        const width = window.getComputedStyle(
          iconRefs.current[i] as Element
        ).width;
        setIsIconAvailable((prev) => ({
          ...prev,
          [widget.icon]: width > "1px",
        }));
      }
    });
  }, [widgets]);

  return (
    <div className={`grid size-${widgets.length}`}>
      {widgets.map((widget, i) => {
        return (
          <div
            key={i}
            className="center"
            style={{ borderColor: RGBColorToCSS(widget.color) }}
          >
            {isIconAvailable[widget.icon] ? (
              <i
                ref={(el) => (iconRefs.current[i] = el)}
                className={`grid-icon fa-brands fa-${widget.icon}`}
              />
            ) : (
              widget.icon
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WidgetGrid;
