import { css, html, LitElement } from 'lit';
import {ams_models, printer_models} from "./consts";

export class AMSCardEditor extends LitElement {
    static get properties() {
        return {
            hass: {},
            _config: { state: true },
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
        return html`
            <form class="table">
                <div class="row">
                    <label class="label cell" for="header">Header:</label>
                    <input
                            @change="${this.handleChangedEvent}"
                            class="value cell" id="header" value="${this._config.header}"></input>
                </div>
                <div class="row">
                    <label class="label cell" for="entity">Entity:</label>
                    <select name="entity" id="entity" @change="${this.handleChangedEvent}"
                            class="value cell" id="entity" value="${this._config.entity}">
                        <option value="none">Select Device...</option>
                        ${this._devices.map(d => html`<option value="${d.id}">${d.name}</option>`)}
                    </select>
                </div>
            </form>
        `;
    }

    handleChangedEvent(changedEvent) {
        // this._config is readonly, copy needed

        var newConfig = Object.assign({}, this._config);
        if (changedEvent.target.id === "header") {
            newConfig.header = changedEvent.target.value;
        } else if (changedEvent.target.id === "entity") {
            newConfig.device_id = changedEvent.target.value;
        }
        console.log(changedEvent.target)
        const messageEvent = new CustomEvent("config-changed", {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(messageEvent);
    }
}
