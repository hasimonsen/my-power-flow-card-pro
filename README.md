```markdown
# ⚡ My Power Flow Card Pro

![HACS Custom Card](https://img.shields.io/badge/HACS-Custom-orange.svg)  
En fleksibel strømflyt-kort for Home Assistant basert på `power-flow-card-plus`, med støtte for **kapasitetsledd**, **nettleie**, **energileverandør**, samt **hjem, batteri og solceller**.

---

## ✨ Funksjoner
- Viser strømflyt fra nett → hjem → individuelle forbrukere.  
- Støtte for **kapasitetsledd** (3 høyeste AMS-peaks i måneden).  
- Viser både **nettleie** og **energikostnad**.  
- Mulighet for batteri og solcelle integrasjon.  
- Fullt tilpassbar via YAML.  

---

## 📦 Installasjon

### Via HACS (anbefalt)
1. Gå til **HACS → Frontend → Custom repositories**.
2. Legg til repoet:  
```

[https://github.com/](https://github.com/)<ditt-brukernavn>/my-power-flow-card-pro

````
med kategori **Lovelace**.
3. Installer `My Power Flow Card Pro`.
4. Legg til følgende i din `configuration.yaml` eller via UI (Ressurser):
```yaml
url: /hacsfiles/my-power-flow-card-pro/my-power-flow-card-pro.js
type: module
````

### Manuell

1. Last ned siste release fra [Releases](https://github.com/<ditt-brukernavn>/my-power-flow-card-pro/releases).
2. Pakk ut og legg `my-power-flow-card-pro.js` i `/config/www/`.
3. Legg til ressurs i Home Assistant:

   ```yaml
   url: /local/my-power-flow-card-pro.js
   type: module
   ```

---

## 🛠 Eksempel-konfigurasjon

```yaml
type: custom:my-power-flow-card-pro
title: Energioversikt
entities:
  grid:
    entity: sensor.ams_reader_p
    display_state: one_way
    color_circle: true

  capacity_fee:
    peaks:
      - sensor.ams_reader_peaks0
      - sensor.ams_reader_peaks1
      - sensor.ams_reader_peaks2
    price: sensor.fagne_kapasitetsledd_pris

  supplier:
    entity: sensor.nordpool_kwh_no2_nok_3_10_025
    name: Strømpris
    unit_of_measurement: "kr/kWh"

  home:
    entity: sensor.ams_reader_p
    color_icon: grid

  individual:
    - entity: sensor.vvb_aktiv_forbruk
      name: VVB
      icon: mdi:water-boiler
      color: "#1e88e5"
    - entity: sensor.varmepumpe_aktiv_forbruk
      name: Varmepumpe
      icon: mdi:heat-pump
      color: "#e65100"

  battery:
    entity: sensor.battery_power
    name: Batteri
    icon: mdi:battery
    color: "#00bfa5"

  solar:
    entity: sensor.solar_power
    name: Solcelle
    icon: mdi:solar-power
    color: "#fbc02d"
```

---

## 📊 Kapasitetsledd

Kortet henter **3 høyeste timesverdier (peaks)** fra AMS-sensorer:

* `sensor.ams_reader_peaks0`
* `sensor.ams_reader_peaks1`
* `sensor.ams_reader_peaks2`

Disse gjennomsnittes og brukes til å beregne **kapasitetsgrunnlag**.
Prisreglene kan du definere i Home Assistant `template` sensorer eller `input_number`.

---

## 🔧 Bygging / utvikling

Hvis du vil endre kortet:

```bash
npm install
npm run build
```

Bygget fil legges i `dist/my-power-flow-card-pro.js`.

---

## 📜 Lisens

MIT © 2025 [Håkon Simonsen](https://github.com/<ditt-brukernavn>)

```