import { css, html, LitElement } from 'lit';

export class ToggleCardLitEditor extends LitElement {
    static get properties() {
        return {
            hass: {},
            _config: { state: true },
        };
    }

    async setConfig(config) {
        // console.log("SET CONFIG", config)
        console.log(this.hass.callWS)
        const integrations = await this.hass.callWS({type: "manifest/list"})
        console.log(integrations)

        const device_list = await this.hass.callWS({type: "config/device_registry/list"})
        console.log(device_list)
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
                    <input
                            @change="${this.handleChangedEvent}"
                            class="value cell" id="entity" value="${this._config.entity}"></input>
                </div>
            </form>
        `;
    }

    handleChangedEvent(changedEvent) {
        // this._config is readonly, copy needed
        var newConfig = Object.assign({}, this._config);
        if (changedEvent.target.id == "header") {
            newConfig.header = changedEvent.target.value;
        } else if (changedEvent.target.id == "entity") {
            newConfig.entity = changedEvent.target.value;
        }
        const messageEvent = new CustomEvent("config-changed", {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(messageEvent);
    }
}
