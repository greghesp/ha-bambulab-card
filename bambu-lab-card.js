import {
    LitElement,
    html,
    css
} from "https://unpkg.com/lit-element@3.3.1/lit-element.js?module";


class Bambu_lab_card extends LitElement {
    static get properties() {
        return {
            hass: {},
            config: {}
        };
    }


    render() {
        const entities = this.hass.entities;
        const possEntities = []
        console.log(entities)
        for(const e in entities) {
            console.log(e)
                if(entities[e].platform == "bambu_lab") {
                    possEntities.push(e)
                }
        }

        console.log(possEntities)


        return html`
    <card>
            <printer>
                <img src="/local/community/bambu-lab-card/images/x1c.png"/>
                <printer-overlay/>
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
            postition: relative;
            z-index: 1; 
            display: inline-block;
          }

          printer img {
            display:block;
            z-index: 2;
            width: 60%;
          }

          printer-overlay {
            width: 80px;
            height: 30px;
            position: absolute;
            z-index: 3;
            top: 60px;
            right: 860px;
            background-color: #ee0808;
          }
        `;
    }
}

customElements.define('bambu-lab-card', Bambu_lab_card);