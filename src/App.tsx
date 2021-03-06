import React from "react";
import * as Styles from "./App.style";
import { Settings } from "./components/Settings/Settings";
import { TrackerContainer } from "./components/TrackerContainer/TrackerContainer";
import { defaultSettings, IconNameType, ISettingsProps, ITrackerContainerProps, Toggle } from "./models";
import { ffrTracker } from "./properties/trackerProperties";
import { ModernItemNames, OriginalItemNames } from "./strings";
import { getSavedSettings } from "./utils";

interface IAppState {
  settingCaption: string;
  currentSettings: ISettingsProps;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      settingCaption: "",
      currentSettings: defaultSettings,
    };
  }

  public componentDidMount() {
    // Ensure the default settings are updated with saved settings, if available
    const savedSettings = getSavedSettings();
    this._handleSettingsChange(savedSettings);
  }

  public render() {
    // Establish names and icons to show based on era setting
    const isModern = this.state.currentSettings.era === Toggle.on;
    const nameType = isModern ? IconNameType.modern : IconNameType.original;
    const names = nameType === IconNameType.original ? OriginalItemNames : ModernItemNames;

    // Build tracker props based on settings
    const trackerProps: ITrackerContainerProps = {
      nameType: nameType,
      settings: this.state.currentSettings,
      handleHover: this._handleHoverChange,
      boxes: ffrTracker(names, this.state.currentSettings.goal, this.state.currentSettings.showTimer === Toggle.on, isModern).boxes!,
    };
    return (
      <div className="app" style={Styles.appContainerStyle} onContextMenu={this._captureRightClick}>
        <div className="totalCover" style={Styles.totalCoverStyle}></div>
        <TrackerContainer {...trackerProps} />
        <Settings caption={this.state.settingCaption} handleChange={this._handleSettingsChange} />
      </div>
    );
  }

  private _handleHoverChange = (caption: string) => {
    this.setState({ settingCaption: caption });
  };

  private _handleSettingsChange = (settings: ISettingsProps) => {
    this.setState({ currentSettings: settings });
    // this._updateBoxes(settings);
  };

  /** Prevent context menu popups within our app */
  private _captureRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
  };
}

export default App;
