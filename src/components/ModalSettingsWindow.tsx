import React, { useState, useEffect } from "react";
import { Widget } from "../utils/Widget";
import { clear } from "console";

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
  const [widgetName, setWidgetName] = useState("");
  const [widgetOpenStatus, setWidgetOpenStatus] = useState<boolean[]>([]); // [false, false, false, false, false, false, false, false
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);

  useEffect(() => {
    const widgetOpenStatus = widgets.map((widget, i) => false);
    setWidgetOpenStatus(widgetOpenStatus);
  }, [widgets]);

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidgetName(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // prevent refresh on submit
    //todo- check if widget name is unique and other validations
    if (widgets.length < 8) {
      addNewWidget({
        name: widgetName,
        id: widgetName,
        link: "",
        icon: widgetName,
      });
      setWidgetName("");
    }
  };
  const handleClearClick = (event: React.MouseEvent) => {
    event.preventDefault();
    clearWidgets();
  };

  const handleAddWidgetClick = (event: React.MouseEvent) => {
    event.stopPropagation();
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
        className={`card center add-widget ${isAddWidgetOpen ? "open" : ""}`}
        onClick={handleAddWidgetClick}
      >
        +
      </div>
      <form onSubmit={handleSubmit} className="center column">
        <input value={widgetName} onChange={handleInputChange}></input>
        <button type="submit">Add Widget</button>
        <button onClick={handleClearClick}>Clear</button>
      </form>
    </div>
  );
};

export default ModalSettingsWindow;
