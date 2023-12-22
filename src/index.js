import { ToggleCardLit } from "./card";
import { ToggleCardLitEditor } from "./editor";

customElements.define(
    "bambu-lab-card",
    ToggleCardLit
);

customElements.define(
    "bambu-lab-card-editor",
    ToggleCardLitEditor
);


window.customCards = window.customCards || [];
window.customCards.push({
    type: "bambu-lab-card",
    name: "toggle card based on LitElement",
    description: "Turn an entity on and off",
});
