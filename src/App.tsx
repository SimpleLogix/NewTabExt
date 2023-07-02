import React, { useState } from "react";
import ModalSettingsWindow from "./components/ModalSettingsWindow";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSettingsClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleRootClick = (event: React.MouseEvent) => {
    setIsOpen(false);
  };

  return (
    <div className="root center" onClick={handleRootClick}>
      {getGreeting()}

      <ModalSettingsWindow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></ModalSettingsWindow>

      <i
        className="material-symbols-outlined settings-icon"
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
