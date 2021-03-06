////// Enums //////
export enum Goals {
  regular = "regular",
  shardHunt = "shardHunt",
  chaosRush = "chaosRush",
}

export enum Layouts {
  square = "square",
  geographic = "geographic",
  tall = "tall",
  wide = "wide",
  allInOne = "allInOne",
}

export enum Borders {
  off = "off",
  thin = "thin",
  thick = "thick",
}

export enum Toggle {
  off = "off",
  on = "on",
}

export enum SettingsNames {
  goal = "goal",
  freeOrbs = "freeOrbs",
  layout = "layout",
  border = "border",
  timerMode = "timerMode",
  iconSet = "iconSet",
  showNames = "showNames",
}

export enum ShowNamesSettings {
  always = "always",
  onHover = "onHover",
  never = "never",
}

/** Defines which set of strings to use for the names of icons */
export enum IconNameType {
  original,
  modern,
}

export enum TimerDigits {
  tensHours,
  onesHours,
  tensMinutes,
  onesMinutes,
  tensSeconds,
  onesSeconds,
  tensMilliseconds,
  onesMilliseconds,
}

////// Constants //////
/** The base tweak value to shift icons down by 8 pixels */
export const BASE_Y_TWEAK = 8;
/** The base tweak value to have an 8 pixel gap between each icon */
export const BASE_X_TWEAK = 8;
/** Initial timer array */
export const INITIAL_TIMER = [0, 0, 0, 0, 0, 0, 0, 0];
/** Off state index in the Icon's stateImageLocations */
export const OFF_STATE_INDEX = 0;
/** On state index in the Icon's stateImageLocations */
export const ON_STATE_INDEX = 1;

/** Default options for the settings menu when first loaded */
export const defaultSettings: ISettingsProps = {
  goal: Goals.regular,
  freeOrbs: Toggle.off,
  layout: Layouts.square,
  showTimer: Toggle.on,
  era: Toggle.off,
  showNames: ShowNamesSettings.never,
};

////// Props //////
export interface ICoordinates {
  x: number;
  y: number;
}

export interface ISettingsProps {
  goal: Goals;
  freeOrbs: Toggle;
  layout: Layouts;
  showTimer: Toggle;
  era: Toggle;
  showNames: ShowNamesSettings;
}

export interface ITitle {
  /** x coordinate for title in the underlying image */
  titleImageLocationX: number;
  /** y coordinate for title in the underlying image */
  titleImageLocationY: number;
  /** Pixel width of the title */
  titleWidth: number;
}

export interface IIconProps {
  /** Text to display in the settings menu caption; doubles as div id */
  title: string;
  /** Short name to display over the icon */
  shortName: string;
  /** Current state of the icon: toggled on or off */
  toggleState?: Toggle;
  /** Width of the icon in pixels */
  width: number;
  /** Height of the icon in pixels */
  height: number;
  /** Row the icon will be located in the box */
  row: number;
  /** Column the icon will be located in the box */
  column: number;
  /** Tweaked x position from the row/col location */
  offsetX?: number;
  /** Tweaked y position from the row/col location */
  offsetY?: number;
  /** coordinates for the icon's various states in the underlying image */
  stateImageLocations: ICoordinates[];
  /** App settings */
  settings: ISettingsProps;
  /** Handle icon hover events */
  handleHover: (caption: string) => void;
}

export interface ITrackerBoxProps extends ITitle {
  /** The id attribute to set on this tracker box instance */
  id: string;
  /** This box shows the timer rather than icons */
  isTimer?: boolean;
  /** Box visibility */
  visible: boolean;
  /** x coordinate for left position of box drawn in browser window */
  boxPositionX: number;
  /** y coordinate for top position of box drawn in browser window */
  boxPositionY: number;
  /** Width of the box in the browser window */
  boxWidth: number;
  /** Height of the box in the browser window */
  boxHeight: number;
  /** Font size for timer */
  fontSize?: number;
  /** Font weight for timer */
  fontWeight?: number;
  /** Text alignment for timer */
  textAlign?: string;
  /** Pointer option for timer */
  cursor?: string;
  /** Collection of icons to render in this box */
  icons?: IIconProps[];
  /** App settings */
  settings: ISettingsProps;
  /** Handle icon hover events */
  handleHover: (caption: string) => void;
}

export interface ITrackerContainerProps {
  /** Setting that describes the collection of names to use for objects */
  nameType: IconNameType;
  /** Tracker boxes to show in this container */
  boxes: ITrackerBoxProps[];
  /** App settings */
  settings: ISettingsProps;
  /** Handle icon hover events */
  handleHover: (caption: string) => void;
}

export interface ISettingsItem {
  /** Text label for the setting in the menu */
  name: string;
  /** Text that appears in the settings menu caption */
  caption: string;
  /** This setting is a radio button or a checkbox */
  isRadio: boolean;
  /** Group for the radio buttons or input name attribute for checkboxes */
  group: string;
  /** Value of this setting */
  value: string;
  /** Current value to compare against */
  currentValue: string;
  /** Disable this setting */
  disabled?: boolean;
}

export interface ISettingsGroup {
  /** Title for the group header */
  title: string;
  /** x coordinate in the settings menu */
  xPosition: number;
  /** y coordinate in the settings menu */
  yPosition: number;
  /** Collection of items for this group, to be rendered in the order provided */
  settings: ISettingsItem[];
}

export interface ISettingsMenuProps {
  caption: string;
  handleChange: (settings: ISettingsProps) => void;
}
