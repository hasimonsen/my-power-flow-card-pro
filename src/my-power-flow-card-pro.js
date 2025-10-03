class MyPowerFlowCardPro extends HTMLElement {
  setConfig(config) {
    if (!config.entities) {
      throw new Error("You need to define entities");
    }
    this.config = config;
  }

  set hass(hass) {
    if (!this.svg) {
      this.innerHTML = `
        <ha-card header="My Power Flow Card Pro">
          <div id="wrapper" style="display:flex; justify-content:center; align-items:center; padding:16px;">
            <svg id="flowchart" width="300" height="300" viewBox="0 0 300 300"
              xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;">
              <!-- Circles -->
              <circle id="gridCircle" cx="80" cy="150" r="40" stroke="#1e88e5" stroke-width="4" fill="none"/>
              <circle id="homeCircle" cx="220" cy="150" r="40" stroke="#e65100" stroke-width="4" fill="none"/>
              <circle id="solarCircle" cx="220" cy="60" r="30" stroke="#fdd835" stroke-width="3" fill="none"/>
              <circle id="batteryCircle" cx="220" cy="240" r="30" stroke="#8e24aa" stroke-width="3" fill="none"/>

              <!-- Labels -->
              <text x="80" y="150" text-anchor="middle" dy="5" font-size="12" id="gridText"></text>
              <text x="220" y="150" text-anchor="middle" dy="5" font-size="12" id="homeText"></text>
              <text x="220" y="60" text-anchor="middle" dy="5" font-size="10" id="solarText"></text>
              <text x="220" y="240" text-anchor="middle" dy="5" font-size="10" id="batteryText"></text>

              <!-- Arrow marker -->
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="currentColor"/>
              </marker>

              <!-- Lines (directions will be updated dynamically) -->
              <line id="gridFlow" stroke-width="2" stroke="#888" marker-end="url(#arrow)">
                <animate attributeName="stroke-dasharray" from="0,200" to="200,0" dur="2s" repeatCount="indefinite"/>
              </line>
              <line id="solarFlow" stroke-width="2" stroke="#888" marker-end="url(#arrow)">
                <animate attributeName="stroke-dasharray" from="0,100" to="100,0" dur="2s" repeatCount="indefinite"/>
              </line>
              <line id="batteryFlow" stroke-width="2" stroke="#888" marker-end="url(#arrow)">
                <animate attributeName="stroke-dasharray" from="0,100" to="100,0" dur="2s" repeatCount="indefinite"/>
              </line>
            </svg>
          </div>
        </ha-card>
      `;
      this.svg = this.querySelector("#flowchart");
    }

    const cfg = this.config;
    const states = hass.states;

    const grid = parseFloat(states[cfg.entities.grid]?.state) || 0;
    const home = parseFloat(states[cfg.entities.home]?.state) || 0;
    const solar = cfg.entities.solar ? parseFloat(states[cfg.entities.solar]?.state) || 0 : null;
    const battery = cfg.entities.battery ? parseFloat(states[cfg.entities.battery]?.state) || 0 : null;

    // Tekst
    this.svg.querySelector("#gridText").textContent = `Grid ${grid} kW`;
    this.svg.querySelector("#homeText").textContent = `Home ${home} W`;
    if (solar !== null) this.svg.querySelector("#solarText").textContent = `Solar ${solar} W`;
    if (battery !== null) this.svg.querySelector("#batteryText").textContent = `Batt ${battery} W`;

    // === Grid flow ===
    const gridFlow = this.svg.querySelector("#gridFlow");
    if (grid >= 0) {
      // Import
      gridFlow.setAttribute("x1", "120");
      gridFlow.setAttribute("y1", "150");
      gridFlow.setAttribute("x2", "180");
      gridFlow.setAttribute("y2", "150");
      gridFlow.setAttribute("stroke", "#1e88e5");
      gridFlow.style.display = "block";
    } else {
      // Eksport
      gridFlow.setAttribute("x1", "180");
      gridFlow.setAttribute("y1", "150");
      gridFlow.setAttribute("x2", "120");
      gridFlow.setAttribute("y2", "150");
      gridFlow.setAttribute("stroke", "#43a047");
      gridFlow.style.display = "block";
    }

    // === Solar flow ===
    const solarFlow = this.svg.querySelector("#solarFlow");
    if (solar > 0) {
      solarFlow.setAttribute("x1", "220");
      solarFlow.setAttribute("y1", "90");
      solarFlow.setAttribute("x2", "220");
      solarFlow.setAttribute("y2", "120");
      solarFlow.setAttribute("stroke", "#fdd835");
      solarFlow.style.display = "block";
    } else {
      solarFlow.style.display = "none";
    }

    // === Battery flow ===
    const batteryFlow = this.svg.querySelector("#batteryFlow");
    if (battery > 0) {
      // Utlading
      batteryFlow.setAttribute("x1", "220");
      batteryFlow.setAttribute("y1", "210");
      batteryFlow.setAttribute("x2", "220");
      batteryFlow.setAttribute("y2", "180");
      batteryFlow.setAttribute("stroke", "#8e24aa");
      batteryFlow.style.display = "block";
    } else if (battery < 0) {
      // Lading
      batteryFlow.setAttribute("x1", "220");
      batteryFlow.setAttribute("y1", "180");
      batteryFlow.setAttribute("x2", "220");
      batteryFlow.setAttribute("y2", "210");
      batteryFlow.setAttribute("stroke", "#26a69a");
      batteryFlow.style.display = "block";
    } else {
      batteryFlow.style.display = "none";
    }
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("my-power-flow-card-pro", MyPowerFlowCardPro);
