import { html, LitElement, nothing } from 'lit';
import styles from './card.styles';

export class ToggleCardLit extends LitElement {

    // private property
    _hass;

    // internal reactive states
    static get properties() {
        return {
            _header: { state: true },
            _entity: { state: true },
            _name: { state: true },
            _state: { state: true },
            _status: { state: true }
        };
    }

    // lifecycle interface
    setConfig(config) {
        this._header = config.header === "" ? nothing : config.header;
        this._entity = config.entity;
        // call set hass() to immediately adjust to a changed entity
        // while editing the entity in the card editor
        if (this._hass) {
            this.hass = this._hass
        }
    }

    set hass(hass) {
        this._hass = hass;
        this._states = hass.states;
        this._state = hass.states[this._entity];
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
        if (!this._state) {
            content = html`
                <p class="error">
                    ${this._entity} is unavailable.
                </p>
            `;
        } else {

            content = html`
                <div class="ams-container">
                    <img id="image" src="images/AMS.png" style="display:block;">
                    <span class="spool-badge slot-1" style="box-shadow: 0 0 5px 5px ${this._states['sensor.x1c_00m00a280103660_ams_1_tray_1'].attributes.active ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}">
                        <ha-icon icon=${this._states['sensor.x1c_00m00a280103660_ams_1_tray_1'].state !==
                        'Empty' ? 'mdi:printer-3d-nozzle' : 'mdi:tray'} style="color: ${this._states['sensor.x1c_00m00a280103660_ams_1_tray_1'].attributes.color};"></ha-icon>
                    </span>
                    <span class="spool-badge slot-2" style="box-shadow: 0 0 5px 5px ${this._states['sensor.x1c_00m00a280103660_ams_1_tray_1'].attributes.active ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}">
                         <ha-icon icon=${this._states['sensor.x1c_00m00a280103660_ams_1_tray_2'].state !==
                         'Empty' ? 'mdi:printer-3d-nozzle' : 'mdi:tray'} style="color: ${this._states['sensor.x1c_00m00a280103660_ams_1_tray_2'].attributes.color};"></ha-icon>
                    </span>
                    <span class="spool-badge slot-3" style="box-shadow: 0 0 5px 5px ${this._states['sensor.x1c_00m00a280103660_ams_1_tray_1'].attributes.active ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}">
                         <ha-icon icon=${this._states['sensor.x1c_00m00a280103660_ams_1_tray_3'].state !==
                         'Empty' ? 'mdi:printer-3d-nozzle' : 'mdi:tray'} style="color: ${this._states['sensor.x1c_00m00a280103660_ams_1_tray_3'].attributes.color};"></ha-icon>
                    </span>
                    <span class="spool-badge slot-4" style="box-shadow: 0 0 5px 5px ${this._states['sensor.x1c_00m00a280103660_ams_1_tray_1'].attributes.active ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}">
                         <ha-icon icon=${this._states['sensor.x1c_00m00a280103660_ams_1_tray_4'].state !==
                         'Empty' ? 'mdi:printer-3d-nozzle' : 'mdi:tray'} style="color: ${this._states['sensor.x1c_00m00a280103660_ams_1_tray_4'].attributes.color};"></ha-icon>
                    </span>
                    <div>
                        <span class="spool-type slot-1">${this._states['sensor.x1c_00m00a280103660_ams_1_tray_1'].attributes.type}</span>
                        <span class="spool-type slot-2">${this._states['sensor.x1c_00m00a280103660_ams_1_tray_2'].attributes.type}</span>
                        <span class="spool-type slot-3">${this._states['sensor.x1c_00m00a280103660_ams_1_tray_3'].attributes.type}</span>
                        <span class="spool-type slot-4">${this._states['sensor.x1c_00m00a280103660_ams_1_tray_4'].attributes.type}</span>
                    </div>
                    <div>
                        <span class="ams-temperature">${this._states['sensor.x1c_00m00a280103660_ams_1_ams_temperature'].state}</span>
                        <span class="ams-humidity">${this._states['sensor.x1c_00m00a280103660_ams_1_humidity_index'].state}</span>
<!--                        <img id="image" src="http://localhost:8123/local/bambuprinter/AMS_2.png" style="display:block;">-->

                       
                    </div>
                    
                </div>
            `;
        }
        return html`
            <ha-card header="${this._header}">
                <div class="card-content">
                    ${content}
                </div>
            </ha-card>
        `;
    }

    // event handling
    doToggle(event) {
        this._hass.callService("input_boolean", "toggle", {
            entity_id: this._entity
        });
    }

    // card configuration
    static getConfigElement() {
        return document.createElement("bambu-lab-card-editor");
    }

    static getStubConfig() {
        return {
            entity: "input_boolean.tcl",
            header: "",
        };
    }
}
