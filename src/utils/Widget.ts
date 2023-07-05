export interface Widget {
    id: string;
    link: string;
    icon: string;
    color: string;
}

export const fetchWidgetsFromStorage = () => {
    const widgets = localStorage.getItem('widgets');
    if (widgets) {
        return JSON.parse(widgets) as Widget[];
    }
    return [];
}

export const saveWidgetsToStorage = (widgets: Widget[]) => {
    localStorage.setItem('widgets', JSON.stringify(widgets));
}