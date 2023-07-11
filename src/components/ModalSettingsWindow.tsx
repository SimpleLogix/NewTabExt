import React, { useState, useEffect } from "react";
import { Widget, saveWidgetsToStorage } from "../utils/Widget";
import ColorPicker from "./ColorPicker";
import { RGBColor } from "react-color";
import { RGBColorToCSS, extractDomainFromUrl } from "../utils/utils";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  widgets: Widget[];
  addNewWidget: (widget: Widget) => void;
  setWidgets: (widgets: Widget[]) => void;
  widgetColors: RGBColor[];
  setWidgetColors: (widgetColors: RGBColor[]) => void;
};

const ModalSettingsWindow = ({
  isOpen,
  addNewWidget,
  widgets,
  setWidgets,
  widgetColors,
  setWidgetColors,
}: Props) => {
  const [newWidget, setNewWidget] = useState<Widget>({
    id: "",
    link: "",
    icon: "",
    color: randomColor(),
  }); // widget being added
  // using temp state to keep track of which widgets are open/links are being edited
  // avoid refreshing state until user stops typing/ submits
  const [widgetOpenStatus, setWidgetOpenStatus] = useState<boolean[]>([]);
  //? add states to edit widget link/color without refreshing entire parent state
  const [widgetLinks, setWidgetLinks] = useState<string[]>([]); // links being edited
  // const [widgetColors, setWidgetColors] = useState<RGBColor[]>([]); // colors being edited
  useEffect(() => {
    const widgetOpenStatus = widgets.map((widget, i) => false);
    widgetOpenStatus.push(false); // represents the add widget button
    setWidgetOpenStatus(widgetOpenStatus);
  }, [widgets]);

  useEffect(() => {
    const widgetLinks = widgets.map((widget) => widget.link || "");
    setWidgetLinks(widgetLinks);
  }, [widgets]); // re-render when widgets change

  // useEffect(() => {
  //   if (widgets.length === 0) return;
  //   const colors = widgets.map((widget) => widget.color);
  //   setWidgetColors(colors);
  // }, [widgets]);

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // close all widgets
    const newWidgetOpenStatus = widgetOpenStatus.map(() => false);
    setWidgetOpenStatus(newWidgetOpenStatus);
  };
  // update widget name when user types
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWidget({ ...newWidget, link: event.target.value });
  };
  // validate url and save link - submit new widget to be added
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // prevent refresh on submit
    //todo- check if widget name is unique and other validations
    if (widgets.length < 8) {
      // extract domain from url
      let icon = extractDomainFromUrl(newWidget.link);
      addNewWidget({ ...newWidget, icon: icon });
      setNewWidget({ id: "", icon: "", link: "", color: randomColor() });
      const newWidgetOpenStatus = widgetOpenStatus.map(() => false);
      setWidgetOpenStatus(newWidgetOpenStatus);
    }
  };

  const handleAddWidgetClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (widgets.length >= 8) return; // max 8 widgets
    const newWidgetOpenStatus = widgetOpenStatus.map(() => false);
    newWidgetOpenStatus[-1] = true;
    setWidgetOpenStatus(newWidgetOpenStatus);
  };

  const handleColorPickerChange = (color: RGBColor) => {
    setNewWidget({ ...newWidget, color: color });
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

  const handleLinkEdit = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    event.stopPropagation();
    const newWidgetLinks = [...widgetLinks];
    newWidgetLinks[index] = event.target.value;
    setWidgetLinks(newWidgetLinks);
  };

  const handleSubmitLinkEdit = (event: React.FormEvent, index: number) => {
    event.preventDefault();
    event.stopPropagation();
    const editedWidgets = [...widgets];
    editedWidgets[index].link = widgetLinks[index];
    saveWidgetsToStorage(editedWidgets);
  };

  return (
    <div
      className={`${isOpen ? "modal-window" : "hidden"}`}
      onClick={handleModalClick}
    >
      <h1>Links</h1>

      {widgets.map((widget, i) => {
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
      })}

      <div
        className={`card center add-widget ${
          widgetOpenStatus[-1] ? "open" : ""
        }`}
        onClick={handleAddWidgetClick}
      >
        {widgetOpenStatus[-1] ? (
          <form onSubmit={handleSubmit} className="">
            <div>
              <input
                value={newWidget.link}
                onChange={handleInputChange}
              ></input>
              <ColorPicker
                color={newWidget.color}
                onChange={handleColorPickerChange}
              ></ColorPicker>
            </div>

            <button type="submit">Add Link</button>
          </form>
        ) : (
          "+"
        )}
      </div>
      {/* <button onClick={handleClearClick}>Clear</button> */}
      <h1>Background</h1>
    </div>
  );
};

export default ModalSettingsWindow;

const randomColor = (): RGBColor => {
  return {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255),
    a: 1,
  };
};
