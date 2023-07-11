import React from "react";
import { RGBColor, SketchPicker } from "react-color";
import reactCSS from "reactcss";

interface ColorPickerProps {
  color: RGBColor;
  onChange: (color: RGBColor) => void;
}

interface ColorPickerState {
  displayColorPicker: boolean;
}

class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
  static defaultProps = {
    color: {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    },
  };

  state: ColorPickerState = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color: any) => {
    this.props.onChange(color.rgb);
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          background: `rgba(${this.props.color.r}, ${this.props.color.g}, ${this.props.color.b}, ${this.props.color.a})`,
        },
      },
    });

    return (
      <div className="color-picker-parent">
        <div className="swatch" onClick={this.handleClick}>
          <div className="color-picker-button" style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div className="popover">
            <div className="cover" onClick={this.handleClose} />
            <SketchPicker
              color={this.props.color}
              onChange={this.handleChange}
              className="color-picker"
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorPicker;
