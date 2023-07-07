import { RGBColor } from "react-color";

export const RGBColorToCSS = (color: RGBColor) => {
    const { r, g, b, a } = color;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}