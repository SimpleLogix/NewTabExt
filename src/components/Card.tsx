import React from "react";
import ColorPicker from "./ColorPicker";
import { RGBColorToCSS } from "../utils/utils";
import { Widget, saveWidgetsToStorage } from "../utils/Widget";
import { RGBColor } from "react-color";

type Props = {
  widgets: Widget[];
  widgetColors: RGBColor[];
  widget: Widget;
  i: number;
  widgetOpenStatus: boolean[];
  widgetLinks: string[];
  setWidgets: (widgets: Widget[]) => void;
  setWidgetLinks: (widgetLinks: string[]) => void;
  setWidgetColors: (widgetColors: RGBColor[]) => void;
  setWidgetOpenStatus: (widgetOpenStatus: boolean[]) => void;
};

const Card = ({
  widget,
  i,
  widgetOpenStatus,
  widgets,
  widgetLinks,
  widgetColors,
  setWidgets,
  setWidgetColors,
  setWidgetLinks,
  setWidgetOpenStatus,
}: Props) => {
  const handleSubmitLinkEdit = (event: React.FormEvent, index: number) => {
    event.preventDefault();
    event.stopPropagation();
    const editedWidgets = [...widgets];
    editedWidgets[index].link = widgetLinks[index];
    saveWidgetsToStorage(editedWidgets);
  };

  const handleLinkEdit = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    event.stopPropagation();
    const newWidgetLinks = [...widgetLinks];
    newWidgetLinks[index] = event.target.value;
    setWidgetLinks(newWidgetLinks);
  };

  const handleWidgetMoveUp = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    if (index > 0) {
      const newWidgets = [...widgets];
      const temp = newWidgets[index - 1];
      newWidgets[index - 1] = newWidgets[index];
      newWidgets[index] = temp;
      saveWidgetsToStorage(newWidgets);
      setWidgets(newWidgets);
    }
  };

  const handleWidgetMoveDown = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    if (index < widgets.length - 1) {
      const newWidgets = [...widgets];
      const temp = newWidgets[index + 1];
      newWidgets[index + 1] = newWidgets[index];
      newWidgets[index] = temp;
      saveWidgetsToStorage(newWidgets);
      setWidgets(newWidgets);
    }
  };

  const handleSettingsClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    const newWidgetOpenStatus = widgetOpenStatus.map(() => false);
    newWidgetOpenStatus[index] = !widgetOpenStatus[index];
    setWidgetOpenStatus(newWidgetOpenStatus);
  };

  const handleDeleteClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    const newWidgets = [...widgets];
    newWidgets.splice(index, 1);
    saveWidgetsToStorage(newWidgets);
    setWidgets(newWidgets);
  };

  return (
    <div
      key={i}
      className={`card ${widgetOpenStatus[i] ? "open" : ""}`}
      style={{
        backgroundColor: RGBColorToCSS({ ...widget.color, a: 0.25 }),
      }}
      onClick={(event) => handleSettingsClick(event, i)}
    >
      <div className="link-text">
        <i
          className={`fa-brands fa-${widget.icon}`}
          style={{ color: RGBColorToCSS(widget.color) }}
        ></i>
        <form onSubmit={(event) => handleSubmitLinkEdit(event, i)}>
          <input
            value={widgetLinks[i] || ""}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => handleLinkEdit(event, i)}
            readOnly={!widgetOpenStatus[i]}
          ></input>
        </form>
        <div
          className={` ${widgetOpenStatus[i] ? "edit-color" : "invis"} `}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <ColorPicker
            color={widgetColors[i]}
            onChange={(color) => {
              const newWidgets = [...widgets];
              newWidgets[i].color = color;
              saveWidgetsToStorage(newWidgets);
              setWidgetColors({ ...widgetColors, [i]: color });
            }}
          ></ColorPicker>
        </div>
      </div>

      <div className="link-actions">
        <i
          className="material-symbols-outlined action red"
          onClick={(event) => handleDeleteClick(event, i)}
        >
          {widgetOpenStatus[i] ? "delete" : ""}
        </i>
        <i
          className="material-symbols-outlined action"
          onClick={(event) => handleWidgetMoveUp(event, i)}
        >
          north
        </i>
        <i
          className="material-symbols-outlined action"
          onClick={(event) => handleWidgetMoveDown(event, i)}
        >
          south
        </i>
      </div>
    </div>
  );
};

export default Card;
