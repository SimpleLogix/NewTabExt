import React, { useState, useEffect } from "react";
import { Widget } from "../utils/Widget";
import ColorPicker from "./ColorPicker";

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
    id: "",
    icon: "",
    link: "",
    color: "",
  }); // new widget being added
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
    setNewWidget((prevWidget) => ({
      ...prevWidget,
      link: event.target.value,
    }));
  };
  //
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // prevent refresh on submit
    //todo- check if widget name is unique and other validations
    if (widgets.length < 8) {
      // extract domain from url
      let icon = "";
      try {
        let url: string = newWidget.link;
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          url = "http://" + url;
        }
        const urlObj = new URL(url);
        const hostname =
          urlObj.host.split(".")[0] === "www"
            ? urlObj.host.split(".")[1]
            : urlObj.host.split(".")[0];
        icon = hostname;
      } catch (error) {
        const regex = /^(?:www\.)?([^./]+(?:\.[^./]+)?)/;
        const match = newWidget.link.match(regex);
        const domain = match ? match[1] : "";
        icon = domain;
      }
      const widget: Widget = {
        link: newWidget.link,
        icon: icon,
        color: newWidget.color,
        id: newWidget.link,
      };
      addNewWidget(widget);
      setNewWidget({ id: "", icon: "", link: "", color: "" });
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
              <input
                value={newWidget.link}
                onChange={handleInputChange}
              ></input>
              <ColorPicker></ColorPicker>
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
