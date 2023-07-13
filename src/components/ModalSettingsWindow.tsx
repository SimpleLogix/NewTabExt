import React, { useState, useEffect } from "react";
import { Widget } from "../utils/Widget";
import { RGBColor } from "react-color";
import Card from "./Card";
import AddCard from "./AddCard";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

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

  useEffect(() => {
    const colors = widgets.map(
      (widget) => widget.color || { r: 0, g: 0, b: 0, a: 1 }
    );
    setWidgetColors(colors);
  }, [widgets, setWidgetColors]); // re-render when widgets change

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // close all widgets
    const newWidgetOpenStatus = widgetOpenStatus.map(() => false);
    setWidgetOpenStatus(newWidgetOpenStatus);
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setWidgets(items);
  };

  useEffect(() => {
    console.log("Droppable mounted");

    return () => {
      console.log("Droppable unmounted");
    };
  }, []);

  return (
    <div
      className={isOpen ? "modal-window" : "hidden"}
      onClick={handleModalClick}
    >
      <h1>Links</h1>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {widgets.map((widget, index) => (
                <Draggable
                  key={widget.link}
                  draggableId={String(widget.link)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card
                        i={index}
                        widget={widget}
                        widgetOpenStatus={widgetOpenStatus}
                        widgetLinks={widgetLinks}
                        widgetColors={widgetColors}
                        setWidgetColors={setWidgetColors}
                        setWidgetLinks={setWidgetLinks}
                        setWidgetOpenStatus={setWidgetOpenStatus}
                        widgets={widgets}
                        setWidgets={setWidgets}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <AddCard
        widgets={widgets}
        widgetOpenStatus={widgetOpenStatus}
        setWidgetOpenStatus={setWidgetOpenStatus}
        addNewWidget={addNewWidget}
      />

      <h1>Background</h1>
    </div>
  );
};

export default ModalSettingsWindow;
