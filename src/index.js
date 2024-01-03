import { BambuLabAMSCard } from "./ams-card";
import { AMSCardEditor } from "./ams-editor";

customElements.define(
    "bambu-lab-ams-card",
    BambuLabAMSCard
);

customElements.define(
    "bambu-lab-ams-card-editor",
    AMSCardEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "bambu-lab-ams-card",
    name: "Bambu Lab AMS Card",
    description: "Card for the Bambu Lab AMS",
});

