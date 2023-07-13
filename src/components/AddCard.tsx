import React, { useState } from "react";
import { Widget } from "../utils/Widget";
import { RGBColor } from "react-color";
import { extractDomainFromUrl } from "../utils/utils";
import ColorPicker from "./ColorPicker";

type Props = {
  widgets: Widget[];
  widgetOpenStatus: boolean[];
  setWidgetOpenStatus: (widgetOpenStatus: boolean[]) => void;
  addNewWidget: (widget: Widget) => void;
};

const AddCard = ({
  widgets,
  widgetOpenStatus,
  setWidgetOpenStatus,
  addNewWidget,
}: Props) => {
  const [newWidget, setNewWidget] = useState<Widget>({
    id: "",
    link: "",
    icon: "",
    color: randomColor(),
  }); // widget being added
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

  return (
    <div
      className={`card center add-widget ${widgetOpenStatus[-1] ? "open" : ""}`}
      onClick={handleAddWidgetClick}
    >
      {widgetOpenStatus[-1] ? (
        <form onSubmit={handleSubmit} className="">
          <div>
            <input value={newWidget.link} onChange={handleInputChange}></input>
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
  );
};

export default AddCard;

const randomColor = (): RGBColor => {
  return {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255),
    a: 1,
  };
};
