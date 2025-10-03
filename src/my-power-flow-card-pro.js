class MyPowerFlowCardPro extends HTMLElement {
  setConfig(config) {
    if (!config.entities) {
      throw new Error("You need to define entities");
    }
    this.config = config;
  }

  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
        <ha-card header="My Power Flow Card Pro">
          <div id="content" style="padding: 16px; font-size:14px; line-height:1.6;">
            <div id="grid"></div>
            <div id="home"></div>
            <div id="extra"></div>
          </div>
        </ha-card>
      `;
      this.content = this.querySelector("#content");
    }

    const cfg = this.config;
    const states = hass.states;

    const grid = states[cfg.entities.grid]?.state || "—";
    const home = states[cfg.entities.home]?.state || "—";
    const cap = cfg.entities.capacity ? states[cfg.entities.capacity]?.state || "—" : null;
    const supplier = cfg.entities.supplier ? states[cfg.entities.supplier]?.state || "—" : null;
    const solar = cfg.entities.solar ? states[cfg.entities.solar]?.state || "—" : null;
    const battery = cfg.entities.battery ? states[cfg.entities.battery]?.state || "—" : null;

    this.content.querySelector("#grid").innerHTML = `
      ⚡ Grid: <b>${grid}</b> kW ${cap ? `• Kapasitetsledd: ${cap}` : ""}
    `;
    this.content.querySelector("#home").innerHTML = `
      🏠 Home: <b>${home}</b> W ${supplier ? `• Supplier: ${supplier}` : ""}
    `;
    this.content.querySelector("#extra").innerHTML = `
      ${solar ? `☀️ Solar: ${solar}` : ""} ${battery ? `• 🔋 Battery: ${battery}` : ""}
    `;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("my-power-flow-card-pro", MyPowerFlowCardPro);
