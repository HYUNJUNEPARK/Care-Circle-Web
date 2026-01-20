export default interface SlideMenuItem {
    id: number;
    text: string;
    action: () => void;
}