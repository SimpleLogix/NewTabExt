import { RGBColor } from "react-color";

export const RGBColorToCSS = (color: RGBColor) => {
    const { r, g, b, a } = color;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export const extractDomainFromUrl = (url: string) => {
    try {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "http://" + url;
        }
        const urlObj = new URL(url);
        const hostname =
            urlObj.host.split(".")[urlObj.host.split(".").length - 2];
        return hostname;
    } catch (error) {
        const regex = /^(?:www\.)?([^./]+(?:\.[^./]+)?)/;
        const match = url.match(regex);
        const domain = match ? match[1] : "";
        return domain;
    }
}

export const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
