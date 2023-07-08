import React, { useState, useEffect } from "react";
import { Widget, saveWidgetsToStorage } from "../utils/Widget";
import ColorPicker from "./ColorPicker";
import { RGBColor } from "react-color";
import { extractDomainFromUrl } from "../utils/utils";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  widgets: Widget[];
  addNewWidget: (widget: Widget) => void;
  clearWidgets: () => void;
  setWidgets: (widgets: Widget[]) => void;
};

const ModalSettingsWindow = ({
  isOpen,
  addNewWidget,
  clearWidgets,
  widgets,
  setWidgets,
}: Props) => {
  const [newWidget, setNewWidget] = useState<Widget>({
    id: "",
    link: "",
    icon: "",
    color: randomColor(),
  }); // widget being added
  const [widgetOpenStatus, setWidgetOpenStatus] = useState<boolean[]>([]);

  useEffect(() => {
    const widgetOpenStatus = widgets.map((widget, i) => false);
    widgetOpenStatus.push(false); // represents the add widget button
    setWidgetOpenStatus(widgetOpenStatus);
  }, [widgets]);

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  // update widget name when user types
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWidget({ ...newWidget, link: event.target.value });
  };
  // validate url and save link
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

  const handleClearClick = (event: React.MouseEvent) => {
    event.preventDefault();
    clearWidgets();
  };

  const handleAddWidgetClick = (event: React.MouseEvent) => {
    event.stopPropagation();
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
    newWidgetOpenStatus[index] = true;
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

  return (
    <div
      className={`${isOpen ? "modal-window" : "hidden"}`}
      onClick={handleModalClick}
    >
      <h1>Links</h1>

      {widgets.map((widget, i) => {
        return (
          <div key={i} className={`card ${widgetOpenStatus[i] ? "open" : ""}`}>
            <div className="link-text">
              <i className={`fa-brands fa-${widget.icon}`}></i>
              {widget.link}
            </div>
            <div className="link-actions">
              <i
                className="material-symbols-outlined action"
                onClick={(event) => handleDeleteClick(event, i)}
              >
                delete
              </i>
              <i
                className="material-symbols-outlined action"
                onClick={(event) => handleSettingsClick(event, i)}
              >
                settings
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
      <button onClick={handleClearClick}>Clear</button>
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
