import { css, html, LitElement } from 'lit';
import {ams_models, printer_models} from "./consts";

export class AMSCardEditor extends LitElement {
    static get properties() {
        return {
            hass: {},
            _config: { state: true },
            _devices: { state: true },
        };
    }

    async setConfig(config) {
        const device_list = await this.hass.callWS({type: "config/device_registry/list"})
        const bambu_devices =  device_list.filter(obj => obj.identifiers[0].includes('bambu_lab'))
        this._devices = bambu_devices.filter(obj => ams_models.includes(obj.model))
        this._config = config;
    }

    static styles = css`
      .table {
        display: table;
      }
      .row {
        display: table-row;
      }
      .cell {
        display: table-cell;
        padding: 0.5em;
      }
    `;

    render() {
        console.log("editor card:", this._config)
        return html`
            <form class="table">
                <div class="row">
                    <label class="label cell" for="header">Header:</label>
                    <input
                            @change="${this.handleChangedEvent}"
                            class="value cell" id="header" value="${this._config.header}"></input>
                </div>
                <div class="row">
                    <label class="label cell" for="style">Card:</label>
                    <select name="device" id="style" @change="${this.handleChangedEvent}"
                            class="value cell" id="style" value="${this._config.style}">
                        <option value="vector">Vector</option>
                        <option value="graphic">Graphic</option>
                       
                    </select>
                </div>
                <div class="row">
                    <label class="label cell" for="device">Entity:</label>
                    <select name="device" id="device" @change="${this.handleChangedEvent}"
                            class="value cell" id="device" value="${this._config.device_id}">
                        <option value="none">Select Device...</option>
                        ${this._devices.map(d => html`<option value="${d.id}" selected=${this._config.device_id === d.id}>${d.name}</option>`)}
                    </select>
                </div>
            </form>
        `;
    }

    handleChangedEvent(changedEvent) {
        // this._config is readonly, copy needed
        const newConfig = Object.assign({}, this._config);
        if (changedEvent.target.id === "header") {
            newConfig.header = changedEvent.target.value;
        } else if (changedEvent.target.id === "device") {
            newConfig.device_id = changedEvent.target.value;
        } else if (changedEvent.target.id === "style") {
            newConfig.style = changedEvent.target.value;
        }
        const messageEvent = new CustomEvent("config-changed", {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(messageEvent);
    }
}
