import React, { useState, useEffect } from "react";
import { Widget } from "../utils/Widget";
import ColorPicker from "./ColorPicker";
import { RGBColor } from "react-color";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  widgets: Widget[];
  addNewWidget: (widget: Widget) => void;
  clearWidgets: () => void;
};

const ModalSettingsWindow = ({
  isOpen,
  addNewWidget,
  clearWidgets,
  widgets,
}: Props) => {
  const [newWidget, setNewWidget] = useState<Widget>({
    name: "",
    id: "",
    link: "",
    icon: "",
    color: randomColor(),
  }); // widget being added
  const [widgetName, setWidgetName] = useState(""); // widget being added
  const [widgetOpenStatus, setWidgetOpenStatus] = useState<boolean[]>([]);

  useEffect(() => {
    const widgetOpenStatus = widgets.map((widget, i) => false);
    widgetOpenStatus.push(false); // represents the add widget button
    setWidgetOpenStatus(widgetOpenStatus);
  }, [widgets]);

  // useEffect(() => {
  //   setNewWidget({
  //     name: "",
  //     id: "",
  //     link: "",
  //     icon: "",
  //     color: randomColor(),
  //   });
  // }, []); // run once to generate empty widget

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidgetName(event.target.value);
    setNewWidget({ ...newWidget, name: event.target.value });
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // prevent refresh on submit
    //todo- check if widget name is unique and other validations
    if (widgets.length < 8) {
      addNewWidget(newWidget);
      setWidgetName("");
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
              {widget.name}
            </div>
            <div className="link-actions">
              <i className="material-symbols-outlined action">delete</i>
              <i
                className="material-symbols-outlined action"
                onClick={(event: React.MouseEvent) => {
                  // OPEN TO EDIT
                  event.stopPropagation();
                  const newWidgetOpenStatus = widgetOpenStatus.map(() => false);
                  newWidgetOpenStatus[i] = true;
                  setWidgetOpenStatus(newWidgetOpenStatus);
                }}
              >
                settings
              </i>
              <i className="material-symbols-outlined action">north</i>
              <i className="material-symbols-outlined action">south</i>
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
              <input value={widgetName} onChange={handleInputChange}></input>
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
