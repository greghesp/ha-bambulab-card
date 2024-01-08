import { html, LitElement, nothing } from "lit";
import styles from "./card.styles";
import AMSImage from "../images/ams.png";
import Humidity1 from "../images/humidity-index-1.svg";
import Humidity2 from "../images/humidity-index-2.svg";
import Humidity3 from "../images/humidity-index-3.svg";
import Humidity4 from "../images/humidity-index-4.svg";
import Humidity5 from "../images/humidity-index-5.svg";

export class BambuLabAMSCard extends LitElement {
  // private property
  _hass;

  // internal reactive states
  static get properties() {
    return {
      _header: { state: true },
      _entity: { state: true },
      _device_id: { state: true },
      _name: { state: true },
      _state: { state: true },
      _style: { state: true },
      _status: { state: true },
    };
  }

  // lifecycle interface
  setConfig(config) {
    this._header = config.header === "" ? nothing : config.header;
    this._device_id = config.device_id === "" ? nothing : config.device_id;
    this._style = config.style === "" ? nothing : config.style;
    // call set hass() to immediately adjust to a changed entity
    // while editing the entity in the card editor
    if (this._hass) {
      this.hass = this._hass;
    }
  }

  set hass(hass) {
    this._hass = hass;
    this._states = hass.states;
    // this._entities = Object.values(this._hass.entities).filter(obj => obj.device_id === this._device_id);
    this._device_name = Object.values(this._hass.devices)
      .filter((obj) => obj.id === this._device_id)[0]
      .name.toLowerCase();
    this._state = hass.states[`sensor.${this._device_name}_ams_temperature`];
    this._entity = `sensor.${this._device_name}_ams_temperature`; // set entity to be used in render()
    // console.log("entity", this._entity)
    // console.log("_device_name", this._device_name)
    // console.log("state", this._state)

    if (this._state) {
      this._status = this._state.state;
      let fn = this._state.attributes.friendly_name;
      this._name = fn ? fn : this._entity;
    }
  }

  // declarative part
  static styles = styles;

  render() {
    let content;
    let humidity;

    console.log("style", this._style);

    switch (this._states[`sensor.${this._device_name}_humidity_index`].state) {
      case "1":
        humidity = Humidity1;
        break;
      case "2":
        humidity = Humidity2;
        break;
      case "3":
        humidity = Humidity3;
        break;
      case "4":
        humidity = Humidity4;
        break;
      default:
        humidity = Humidity5;
    }

    if (!this._state) {
      content = html` <p class="error">${this._entity} is unavailable.</p> `;
    }
    if (this._style === "vector") {
      content = html`<div class="ams-container">
        <div class="vector">
          <div class="spools">
            <div class="spool">
              <div class="overlay">PLA</div>
            </div>
            <div class="spool">PLA</div>
            <div class="spool">PLA</div>
            <div class="spool">PLA</div>
          </div>
        </div>
      </div> `;
    } else {
      content = html`
        <div>
          <span>
            <div>2</div>
            <div>2</div>
            <div>3</div>
            <div>1</div>
          </span>
        </div>
        <div class="ams-container graphic">
          <img src=${AMSImage} style="display:block;" id="image" />
          <span
            class="spool-badge slot-1"
            style="box-shadow: 0 0 5px 5px ${this._states[
              `sensor.${this._device_name}_tray_1`
            ].attributes.active
              ? "rgba(255,255,255,0.5)"
              : "rgba(0,0,0,0.5)"}"
          >
            <ha-icon
              icon=${this._states[`sensor.${this._device_name}_tray_1`]
                .state !== "Empty"
                ? "mdi:printer-3d-nozzle"
                : "mdi:tray"}
              style="color: ${this._states[`sensor.${this._device_name}_tray_1`]
                .attributes.color};"
            ></ha-icon>
          </span>
          <span
            class="spool-badge slot-2"
            style="box-shadow: 0 0 5px 5px ${this._states[
              `sensor.${this._device_name}_tray_2`
            ].attributes.active
              ? "rgba(255,255,255,0.5)"
              : "rgba(0,0,0,0.5)"}"
          >
            <ha-icon
              icon=${this._states[`sensor.${this._device_name}_tray_2`]
                .state !== "Empty"
                ? "mdi:printer-3d-nozzle"
                : "mdi:tray"}
              style="color: ${this._states[`sensor.${this._device_name}_tray_2`]
                .attributes.color};"
            ></ha-icon>
          </span>
          <span
            class="spool-badge slot-3"
            style="box-shadow: 0 0 5px 5px ${this._states[
              `sensor.${this._device_name}_tray_3`
            ].attributes.active
              ? "rgba(255,255,255,0.5)"
              : "rgba(0,0,0,0.5)"}"
          >
            <ha-icon
              icon=${this._states[`sensor.${this._device_name}_tray_3`]
                .state !== "Empty"
                ? "mdi:printer-3d-nozzle"
                : "mdi:tray"}
              style="color: ${this._states[`sensor.${this._device_name}_tray_3`]
                .attributes.color};"
            ></ha-icon>
          </span>
          <span
            class="spool-badge slot-4"
            style="box-shadow: 0 0 5px 5px ${this._states[
              `sensor.${this._device_name}_tray_4`
            ].attributes.active
              ? "rgba(255,255,255,0.5)"
              : "rgba(0,0,0,0.5)"}"
          >
            <ha-icon
              icon=${this._states[`sensor.${this._device_name}_tray_4`]
                .state !== "Empty"
                ? "mdi:printer-3d-nozzle"
                : "mdi:tray"}
              style="color: ${this._states[`sensor.${this._device_name}_tray_4`]
                .attributes.color};"
            ></ha-icon>
          </span>
          <img src=${humidity} class="humidity" />

          <span class="spool-type slot-1"
            >${this._states[`sensor.${this._device_name}_tray_1`].attributes
              .type}</span
          >
          <span class="spool-type slot-2"
            >${this._states[`sensor.${this._device_name}_tray_2`].attributes
              .type}</span
          >
          <span class="spool-type slot-3"
            >${this._states[`sensor.${this._device_name}_tray_3`].attributes
              .type}</span
          >
          <span class="spool-type slot-4"
            >${this._states[`sensor.${this._device_name}_tray_4`].attributes
              .type}</span
          >

          <div>
            <span class="ams-temperature"
              >${this._states[`sensor.${this._device_name}_ams_temperature`]
                .state}</span
            >
          </div>
        </div>
      `;
    }

    return html`
      <ha-card header="${this._header}">
        <div class="card-content">${content}</div>
      </ha-card>
    `;
  }

  // event handling
  doToggle(event) {
    this._hass.callService("input_boolean", "toggle", {
      entity_id: this._entity,
    });
  }

  // card configuration
  static getConfigElement() {
    return document.createElement("bambu-lab-ams-card-editor");
  }

  // static getStubConfig() {
  //     return {
  //         entity: "input_boolean.tcl",
  //         header: "",
  //     };
  // }
}
