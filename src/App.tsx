import React, { useState, useEffect } from "react";
import ModalSettingsWindow from "./components/ModalSettingsWindow";
import WidgetGrid from "./components/WidgetGrid";
import {
  Widget,
  fetchWidgetsFromStorage,
  saveWidgetsToStorage,
} from "./utils/Widget";

function App() {
  //? States
  const [isOpen, setIsOpen] = useState(false);
  const [widgets, setWidgets] = useState<Widget[]>([]);

  //? useEffects
  useEffect(() => {
    const widgets = fetchWidgetsFromStorage();
    setWidgets(widgets);
  }, []); // inital fetch from storage

  //? Event Handlers
  const handleSettingsClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };
  const handleRootClick = (event: React.MouseEvent) => {
    setIsOpen(false);
  };
  const addNewWidget = (widget: Widget) => {
    saveWidgetsToStorage([...widgets, widget]);
    setWidgets([...widgets, widget]);
  };
  const clearWidgets = () => {
    saveWidgetsToStorage([]);
    setWidgets([]);
  };

  return (
    <div className="root center" onClick={handleRootClick}>
      <WidgetGrid widgets={widgets}></WidgetGrid>

      <ModalSettingsWindow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        widgets={widgets}
        setWidgets={setWidgets}
        clearWidgets={clearWidgets}
        addNewWidget={addNewWidget}
      ></ModalSettingsWindow>

      <i
        className={`material-symbols-outlined settings-icon ${
          isOpen ? "red" : ""
        }`}
        onClick={handleSettingsClick}
      >
        {isOpen ? "close" : "settings"}
      </i>
    </div>
  );
}

export default App;

const getGreeting = () => {
  const date = new Date();
  const hours = date.getHours();
  return hours < 12
    ? "Good morning!"
    : hours < 18
    ? "Good afternoon!"
    : "Good evening!";
};
