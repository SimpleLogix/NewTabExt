import React from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const ModalSettingsWindow = ({ isOpen, setIsOpen }: Props) => {
  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className={`${isOpen ? "modal-window" : ""}`}
      onClick={handleModalClick}
    ></div>
  );
};

export default ModalSettingsWindow;
