import React from "react";
import { RGBColor, SketchPicker } from "react-color";
import reactCSS from "reactcss";

interface ColorPickerState {
  displayColorPicker: boolean;
  color: RGBColor;
}

class ColorPicker extends React.Component<{}, ColorPickerState> {
  state: ColorPickerState = {
    displayColorPicker: false,
    color: {
      r: 241,
      g: 112,
      b: 19,
      a: 1,
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color: any) => {
    this.setState({ color: color.rgb });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
      },
    });

    return (
      <div>
        <div className="swatch" onClick={this.handleClick}>
          <div className="color-picker" style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div className="popover">
            <div className="cover" onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorPicker;
