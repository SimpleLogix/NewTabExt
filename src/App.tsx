import React from "react";

function App() {
  const date = new Date();
  const hours = date.getHours();

  return (
    <div className="center">
      {hours < 12
        ? "Good morning!"
        : hours < 18
        ? "Good afternoon!"
        : "Good evening!"}
    </div>
  );
}

export default App;
