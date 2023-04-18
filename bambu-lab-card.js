import {
    LitElement,
    html,
    css
} from "https://unpkg.com/lit-element@3.3.1/lit-element.js?module";
import 'https://unpkg.com/classnames@2.3.2/index.js'

function cx(...args) {
    return window.classNames(...args);
}

class Bambu_lab_card extends LitElement {
    static get properties() {
        return {
            hass: {},
            config: {}
        };
    }


    render() {

        // console.log(this.hass)
        const entities = this.hass.entities;
        const devices = this.hass.devices;
        const states = this.hass.states;
        const possEntities = []

        let printer, ams = [];
        const params = {
            chamberLight: null,
            nozzleTemp: null,
            bedTemp: null
        }

        for(const d in devices){
            if(devices[d].manufacturer === "Bambu Lab" && devices[d].via_device_id === null) printer = devices[d];
            if(devices[d].manufacturer === "Bambu Lab" && devices[d].via_device_id !== null) ams.push(devices[d])
        }


        // console.log(entities)
        for(const e in entities) {
            // console.log(e)
                if(entities[e].platform == "bambu_lab") {
                    if (e.includes("chamber_light")) params.chamberLight = states[e];
                    if (e.includes("nozzle_temperature")) params.nozzleTemp = states[e];
                    if (e.includes("bed_temperature") && !e.includes("target_bed")) params.bedTemp = states[e];
                    possEntities.push(e)
                }
        }


        if(this.config.entities){
            for(const e in this.config.entities){
                if(params[e]) params[e] = states[this.config.entities[e]]
            }
        }

        console.log(params)

        function printerImage() {
            if(printer.model === "X1C") return `/local/community/bambu-lab-card/images/X1C_${params.chamberLight.state}.png`
            if(printer.model ===" P1P") return `/local/community/bambu-lab-card/images/P1P_on.png`
        }


        return html`
    <card>
            <printer>
                <img class="printer" src="${printerImage()}"/>
                <img class="x1c-screen" src="/local/community/bambu-lab-card/images/x1c_screen_on.png"/>
                <nozzle-temp>${params.nozzleTemp.state}°C</nozzle-temp>
                <bed-temp>${params.bedTemp.state}°C</bed-temp>
            </printer>
        <footer>
            <textStatus>Test</textStatus>
            <icons>
              <ha-state-icon .icon="mdi:battery"></ha-state-icon>
            </icons>
        </footer>
      </background>
    </card>`
    }

    setConfig(config) {
        // if (!config.entities.person) throw new Error('You need to provide a person entity')
        console.log(config)
        this.config = config;
    }

    static get styles() {
        return css`
          card {
            background-color: white;
            font-size: 18px;
            border-radius: 4px;
            width: auto;
            height: auto;
            display: block;
            overflow: hidden;
          }


          printer {
            display:flex;
            position: relative;
            align-items: center;
            justify-content: center;
            z-index: 1;
          }

          printer .printer {
            display: block;
            width: 60%;
          }

          printer .x1c-screen {
            position: absolute;
            top: 0;
            z-index: 4;
            width: 14%;
            top: 3%;
            left: 33%
          }
          
          nozzle-temp {
            position: absolute;
            z-index: 2;
            top: 22%;
            left: 56%;
            background-color: black;
            color: white;
            padding: 0.3em 0.7em;
            font-size: 0.7em;
            border-radius: 20%;
          }

          bed-temp {
            position: absolute;
            z-index: 3;
            top: 78%;
            left: 46%;
            background-color: black;
            color: white;
            padding: 0.3em 0.7em;
            font-size: 0.7em;
            border-radius: 20%;
          }


          
        `;
    }
}

customElements.define('bambu-lab-card', Bambu_lab_card);
