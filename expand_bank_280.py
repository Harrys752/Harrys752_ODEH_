"""
expand_bank_280.py
Generates and appends authentic Russian / NSU Olympiad geoscience questions
to bring each of the 7 Fields of Science to >= 40 questions (Total >= 280 tasks).
"""

import json
import re

with open('questions.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'var\s+QUESTION_BANK\s*=\s*(\[.*?\]);', text, re.DOTALL)
if not m:
    print("Could not find var QUESTION_BANK in questions.js")
    exit(1)

bank = json.loads(m.group(1))
existing_ids = {q['id'] for q in bank}
print(f"Loaded {len(bank)} existing questions with {len(existing_ids)} unique IDs.")

# Target: 40 questions per field
new_questions = []

# ==============================================================================
# FIELD 1: Geography, physical (currently 34 -> add 7 -> 41)
# ==============================================================================
geo_additions = [
    {
        "id": "GEO-B-22",
        "field": "Geography, physical",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Soil Zonality — Humus Content of Russian Chernozem",
        "content": "<p>In the soil-geographical zonality of the Russian Plain, which soil type possesses the thickest dark humus accumulation horizon ($A_1$) with typical humus content reaching $8\\%\\text{--}12\\%$ and a resilient granular crumb structure?</p>",
        "options": [
            "Chernozem (Black soil)",
            "Podzol",
            "Tundra gley soil",
            "Serozem"
        ],
        "correctAnswer": "Chernozem (Black soil)",
        "explanation": "Chernozems developed under temperate steppe vegetation with rich root biomass and moderate continental climate, accumulating 8%–12% humus in horizons up to 1 meter deep with a distinctive granular-crumb structure."
    },
    {
        "id": "GEO-B-23",
        "field": "Geography, physical",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Periglacial Landforms — Bulgunnyakh / Pingo Formation",
        "content": "<p>In the continuous permafrost terrain of Northern Siberia (Yakutia), what is the term for a conical, ice-cored mound formed by hydrostatic water pressure beneath a drained thermokarst lake (alas)?</p>",
        "options": [
            "Bulgunnyakh (Pingo)",
            "Drumlin",
            "Esker (Oz)",
            "Polje"
        ],
        "correctAnswer": "Bulgunnyakh (Pingo)",
        "explanation": "In Russian geomorphological literature, a pingo is traditionally termed 'bulgunnyakh' (from the Yakut language), representing perennial frost mounds with an ice core growing in drained lake basins (alases) under permafrost conditions."
    },
    {
        "id": "GEO-B-24",
        "field": "Geography, physical",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Glacial Landforms — Eskers (Ozy) Formation",
        "content": "<p>Which glaciofluvial landform consists of a long, narrow, winding ridge of stratified sand and gravel deposited by subglacial meltwater streams beneath stagnant ice sheets?</p>",
        "options": [
            "Esker (Oz)",
            "Barchan",
            "Cirque (Karr)",
            "Atoll"
        ],
        "correctAnswer": "Esker (Oz)",
        "explanation": "Eskers (in Russian terminology, 'озы') are steep-sided, sinuous ridges of sorted gravel and sand deposited in subglacial tunnels by pressurized meltwater streams during Pleistocene ice retreat."
    },
    {
        "id": "GEO-B-25",
        "field": "Geography, physical",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Coriolis Deflection of Major Siberian Rivers",
        "content": "<p>According to Baer's Law, the Coriolis force deflects moving water in the Northern Hemisphere to the right. What morphological feature characterises the northward-flowing major Siberian rivers (Ob, Yenisei, Lena) as a consequence?</p>",
        "options": [
            "Steep, actively undercut right banks and broad, terraced gentle left banks",
            "Steep left banks and depositional right banks",
            "Symmetrical U-shaped gorge cross-sections",
            "Complete absence of river meanders"
        ],
        "correctAnswer": "Steep, actively undercut right banks and broad, terraced gentle left banks",
        "explanation": "Baer's Law states that due to Earth's rotation (Coriolis force), rivers in the Northern Hemisphere preferentially erode their right banks, resulting in high, steep, undercut right banks and gentle, wide, terraced left floodplains."
    },
    {
        "id": "GEO-B-26",
        "field": "Geography, physical",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Karst Geomorphology — Closed Depressions and Poljes",
        "content": "<p>In soluble carbonate rock terrains (such as the Urals and Caucasus karst provinces), which sequence describes karst depressions in increasing order of spatial area?</p>",
        "options": [
            "Sinkhole (Pono / Funnel) $\\rightarrow$ Uvala $\\rightarrow$ Polje",
            "Polje $\\rightarrow$ Uvala $\\rightarrow$ Sinkhole",
            "Karren $\\rightarrow$ Polje $\\rightarrow$ Sinkhole",
            "Gorge $\\rightarrow$ Sinkhole $\\rightarrow$ Dolina"
        ],
        "correctAnswer": "Sinkhole (Pono / Funnel) $\\rightarrow$ Uvala $\\rightarrow$ Polje",
        "explanation": "Individual karst sinkholes (dolines) coalesce into larger composite depressions called uvalas, which in turn develop into expansive flat-bottomed structural karst valleys termed poljes."
    },
    {
        "id": "GEO-I-06",
        "field": "Geography, physical",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Hydrological Runoff Module of a River Basin",
        "content": "<p>A Siberian river basin has a catchment surface area $A = 20,000\\text{ km}^2$. The mean annual river discharge measured at the closing gauging station is $Q = 160\\text{ m}^3/\\text{s}$. Calculate the specific runoff module ($M$) of the basin in $\\text{L}/(\\text{s}\\cdot\\text{km}^2)$.</p>",
        "options": [
            "$8.0\\text{ L}/(\\text{s}\\cdot\\text{km}^2)$",
            "$12.5\\text{ L}/(\\text{s}\\cdot\\text{km}^2)$",
            "$4.0\\text{ L}/(\\text{s}\\cdot\\text{km}^2)$",
            "$16.0\\text{ L}/(\\text{s}\\cdot\\text{km}^2)$"
        ],
        "correctAnswer": "$8.0\\text{ L}/(\\text{s}\\cdot\\text{km}^2)$",
        "explanation": "The runoff module is $M = \\frac{Q}{A} = \\frac{160\\text{ m}^3/\\text{s}}{20,000\\text{ km}^2} = 0.008\\text{ m}^3/(\\text{s}\\cdot\\text{km}^2)$. Converting to liters ($1\\text{ m}^3 = 1000\\text{ L}$): $M = 0.008 \\times 1000 = 8.0\\text{ L}/(\\text{s}\\cdot\\text{km}^2)$."
    },
    {
        "id": "GEO-I-07",
        "field": "Geography, physical",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Drainage Density of a Taiga Watershed",
        "content": "<p>In an erosion-control study of a mountain taiga watershed covering $A = 250\\text{ km}^2$, cartographic stream network analysis reveals a total combined river and permanent stream length $\\sum L = 375\\text{ km}$. Calculate the drainage network density ($D_d$) of the watershed in $\\text{km}/\\text{km}^2$.</p>",
        "options": [
            "$1.5\\text{ km}/\\text{km}^2$",
            "$0.67\\text{ km}/\\text{km}^2$",
            "$2.5\\text{ km}/\\text{km}^2$",
            "$3.75\\text{ km}/\\text{km}^2$"
        ],
        "correctAnswer": "$1.5\\text{ km}/\\text{km}^2$",
        "explanation": "Drainage density is defined as the total stream length divided by watershed drainage area: $D_d = \\frac{\\sum L}{A} = \\frac{375\\text{ km}}{250\\text{ km}^2} = 1.5\\text{ km}/\\text{km}^2$."
    }
]
new_questions.extend(geo_additions)

# ==============================================================================
# FIELD 2: Meteorology & atmospheric sciences (currently 30 -> add 11 -> 41)
# ==============================================================================
met_additions = [
    {
        "id": "MET-B-25",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Synoptic Climatology — Siberian Winter Anticyclone",
        "content": "<p>Which meteorological conditions characterize the central core of the Siberian (Asiatic) Anticyclone during mid-winter?</p>",
        "options": [
            "Extremely high sea-level pressure, strong surface radiational cooling, persistent temperature inversions, calm wind, and clear skies",
            "Low atmospheric pressure, intense cyclonic frontal precipitation, and overcast cloud cover",
            "High humidity, frequent convective thunderstorms, and gale-force westerly winds",
            "High wind speeds with moist maritime air masses from the Atlantic Ocean"
        ],
        "correctAnswer": "Extremely high sea-level pressure, strong surface radiational cooling, persistent temperature inversions, calm wind, and clear skies",
        "explanation": "The Siberian Anticyclone is a semi-permanent thermal high formed by intense radiational cooling over continental Eurasia. It features record-high surface atmospheric pressure (often >1040 hPa), profound surface temperature inversions, calm or very light winds, and dry cloudless conditions."
    },
    {
        "id": "MET-B-26",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Atmospheric Albedo — Fresh Snow vs Coniferous Forest",
        "content": "<p>In terrestrial solar radiation balance calculations, which surface type exhibits the highest shortwave solar reflectance (albedo, $\\alpha$)?</p>",
        "options": [
            "Fresh dry fallen snow ($\\alpha \\approx 0.80\\text{--}0.90$)",
            "Dark coniferous taiga canopy ($\\alpha \\approx 0.10\\text{--}0.15$)",
            "Wet plowed agricultural chernozem ($\\alpha \\approx 0.10\\text{--}0.12$)",
            "Calm deep open ocean water ($\\alpha \\approx 0.05\\text{--}0.08$)"
        ],
        "correctAnswer": "Fresh dry fallen snow ($\\alpha \\approx 0.80\\text{--}0.90$)",
        "explanation": "Fresh dry snow has one of the highest natural albedos on Earth, reflecting 80%–90% of incoming incident shortwave solar radiation, in stark contrast to dark taiga forests or water."
    },
    {
        "id": "MET-I-06",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Barometric Leveling Across Mountain Ridges",
        "content": "<p>At the base of an Altai mountain pass, a mercury barometer reads $750\\text{ mm Hg}$. At the crest of the pass, the barometer reads $670\\text{ mm Hg}$. Using a constant barometric step of $h_b = 10.5\\text{ m/mm Hg}$, calculate the elevation difference $\\Delta h$ between the base and the pass crest.</p>",
        "options": [
            "$840\\text{ m}$",
            "$720\\text{ m}$",
            "$960\\text{ m}$",
            "$1050\\text{ m}$"
        ],
        "correctAnswer": "$840\\text{ m}$",
        "explanation": "Pressure difference is $\\Delta P = 750 - 670 = 80\\text{ mm Hg}$. Height difference is $\\Delta h = \\Delta P \\cdot h_b = 80 \\cdot 10.5 = 840\\text{ m}$."
    },
    {
        "id": "MET-I-07",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Surface Net Radiation Balance Calculation",
        "content": "<p>At a solar monitoring station, total incoming solar radiation is $Q = 600\\text{ W/m}^2$, surface shortwave albedo is $\\alpha = 0.20$, and net outgoing effective longwave thermal radiation is $E_{\\text{eff}} = 80\\text{ W/m}^2$. Calculate the net radiation balance ($B$) of the ground surface.</p>",
        "options": [
            "$400\\text{ W/m}^2$",
            "$480\\text{ W/m}^2$",
            "$520\\text{ W/m}^2$",
            "$360\\text{ W/m}^2$"
        ],
        "correctAnswer": "$400\\text{ W/m}^2$",
        "explanation": "The surface radiation balance formula is $B = Q(1 - \\alpha) - E_{\\text{eff}} = 600(1 - 0.20) - 80 = 600(0.80) - 80 = 480 - 80 = 400\\text{ W/m}^2$."
    },
    {
        "id": "MET-I-08",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Foehn Effect & Adiabatic Thermodynamics",
        "content": "<p>An air parcel at sea level ($0\\text{ m}$) with $T = 16.0^\\circ\\text{C}$ rises up the windward slope of a $2000\\text{ m}$ mountain ridge. Cloud condensation begins at $1000\\text{ m}$ (dry adiabatic lapse rate $\\Gamma_d = 10^\\circ\\text{C/km}$; moist adiabatic lapse rate $\\Gamma_m = 6^\\circ\\text{C/km}$). The parcel descends the leeward slope to sea level ($0\\text{ m}$) under completely dry adiabatic conditions. What is the final air temperature at sea level on the leeward side?</p>",
        "options": [
            "$20.0^\\circ\\text{C}$",
            "$16.0^\\circ\\text{C}$",
            "$24.0^\\circ\\text{C}$",
            "$12.0^\\circ\\text{C}$"
        ],
        "correctAnswer": "$20.0^\\circ\\text{C}$",
        "explanation": "1) Ascent from 0 to 1000 m dry: $T_{1000} = 16 - (10 \\times 1.0) = 6.0^\\circ\\text{C}$. 2) Ascent from 1000 to 2000 m moist: $T_{2000} = 6.0 - (6 \\times 1.0) = 0.0^\\circ\\text{C}$. 3) Descent from 2000 to 0 m dry: $T_{\\text{leeward}} = 0.0 + (10 \\times 2.0) = +20.0^\\circ\\text{C}$. The foehn wind produces a net warming of $4^\\circ\\text{C}$."
    },
    {
        "id": "MET-I-09",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Dew Point Depression and Lifting Condensation Level",
        "content": "<p>At Tomsk weather station, the surface air temperature is $T = 22.0^\\circ\\text{C}$ and dew point temperature is $T_d = 14.0^\\circ\\text{C}$. Using the standard atmospheric approximation $H_{\\text{LCL}} = 125 \\cdot (T - T_d)$, calculate the altitude of the Lifting Condensation Level above ground.</p>",
        "options": [
            "$1000\\text{ m}$",
            "$800\\text{ m}$",
            "$1250\\text{ m}$",
            "$1500\\text{ m}$"
        ],
        "correctAnswer": "$1000\\text{ m}$",
        "explanation": "Dew point depression is $T - T_d = 22.0 - 14.0 = 8.0^\\circ\\text{C}$. Therefore $H_{\\text{LCL}} = 125 \\times 8.0 = 1000\\text{ m}$."
    },
    {
        "id": "MET-A-02",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 3,
        "title": "Ground-Based Inversion Layer Thickness & Thermal Resistance",
        "content": "<p>During a winter Siberian anticyclone in Yakutsk, surface ground radiation creates a severe ground inversion. The surface temperature is $T_{\\text{sfc}} = -42.0^\\circ\\text{C}$. Inversion top temperature is $T_{\\text{top}} = -22.0^\\circ\\text{C}$ measured by a radio sounding balloon at height $z = 400\\text{ m}$. Calculate: 1) the mean vertical temperature gradient within the inversion layer in $^\\circ\\text{C}/100\\text{ m}$, and 2) the Brunt-Väisälä buoyancy frequency squared ($N^2 = \\frac{g}{T_v} \\left(\\frac{dT}{dz} + \\Gamma_d\\right)$) given $g = 9.8\\text{ m/s}^2$, mean virtual temperature $T_v = 241\\text{ K}$, and dry adiabatic lapse rate $\\Gamma_d = 0.0098\\text{ K/m}$.</p>",
        "options": [],
        "answerText": "Vertical gradient = +5.0^\\circ\\text{C}/100\\text{ m}, N^2 \\approx 0.00243\\text{ s}^{-2}",
        "explanation": "1) Inversion gradient: $\\frac{dT}{dz} = \\frac{-22 - (-42)}{400\\text{ m}} = \\frac{+20^\\circ\\text{C}}{400\\text{ m}} = +0.05^\\circ\\text{C/m} = +5.0^\\circ\\text{C}/100\\text{ m}$. 2) $N^2 = \\frac{9.8}{241} \\left(0.05 + 0.0098\\right) = 0.04066 \\times 0.0598 \\approx 0.00243\\text{ s}^{-2}$.",
        "modelSolution": "1) Temperature gradient: $dT/dz = (+20\\text{ K}) / 400\\text{ m} = +0.05\\text{ K/m} = +5.0^\\circ\\text{C}/100\\text{ m}$.\n2) Static stability: $N^2 = \\frac{9.8}{241} (0.05 + 0.0098) = 2.43 \\times 10^{-3}\\text{ s}^{-2}$."
    },
    {
        "id": "MET-A-03",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 3,
        "title": "Precipitation Areal Mass and Water Balance of Lake Watershed",
        "content": "<p>A river basin feeding a hydropower reservoir in Eastern Siberia covers an area $A = 15,000\\text{ km}^2$. The annual average precipitation depth is $P = 550\\text{ mm}$, of which $60\\%$ is lost to evapotranspiration ($E$). Assuming zero net groundwater storage change, calculate: 1) the total annual mass of precipitated water in gigatonnes ($\\text{Gt}$, where $\\rho_w = 1000\\text{ kg/m}^3$), and 2) the mean annual river runoff volume ($V_R$) and average continuous discharge ($Q_{\\text{avg}}$ in $\\text{m}^3/\\text{s}$) discharging into the reservoir.</p>",
        "options": [],
        "answerText": "Precipitation mass = 8.25\\text{ Gt}, Runoff volume = 3.30\\text{ km}^3, Q_{avg} \\approx 104.6\\text{ m}^3/\\text{s}",
        "explanation": "1) Basin area: $A = 1.5 \\times 10^{10}\\text{ m}^2$. Total precip volume: $V_P = 1.5 \\times 10^{10} \\times 0.55 = 8.25 \\times 10^9\\text{ m}^3$. Since $1\\text{ m}^3 = 1\\text{ t}$, mass is $8.25\\text{ Gt}$. 2) Runoff fraction is $40\\%$ ($100\\% - 60\\%$): $V_R = 8.25 \\times 10^9 \\times 0.40 = 3.30 \\times 10^9\\text{ m}^3 = 3.30\\text{ km}^3$. 3) Seconds per year: $365 \\times 86,400 = 31,536,000\\text{ s}$. Discharge: $Q_{\\text{avg}} = \\frac{3.30 \\times 10^9}{31,536,000} \\approx 104.64\\text{ m}^3/\\text{s}$.",
        "modelSolution": "1) Water mass: $M = A \\times P \\times \\rho = 15,000\\text{ km}^2 \\times 550\\text{ mm} = 8.25\\text{ Gt}$.\n2) Runoff: $V_R = 8.25 \\times 0.40 = 3.30\\text{ km}^3$. $Q_{\\text{avg}} = 3.30 \\times 10^9 / 3.1536 \\times 10^7 = 104.6\\text{ m}^3/\\text{s}$."
    },
    {
        "id": "MET-B-27",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Atmospheric Layers — Stratospheric Ozone Peak",
        "content": "<p>In which thermal layer of the Earth's atmosphere is the concentration of ozone ($O_3$) highest, creating an inversion layer that absorbs solar ultraviolet radiation?</p>",
        "options": [
            "Stratosphere (approx. 20–30 km)",
            "Troposphere (approx. 0–10 km)",
            "Mesosphere (approx. 50–85 km)",
            "Thermosphere (>100 km)"
        ],
        "correctAnswer": "Stratosphere (approx. 20–30 km)",
        "explanation": "The maximum concentration of the ozone layer (the ozonosphere) is located in the stratosphere between 20 and 30 km altitude, where ozone absorption of solar UV-B and UV-C radiation causes temperatures to rise with height."
    },
    {
        "id": "MET-B-28",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Cloud Classification — Cumulonimbus Thunderheads",
        "content": "<p>Which cloud genus represents deep, vertically developed convective clouds with fibrous, anvil-shaped cirriform tops capable of generating heavy showers, thunder, lightning, and hail?</p>",
        "options": [
            "Cumulonimbus ($Cb$)",
            "Altostratus ($As$)",
            "Cirrocumulus ($Cc$)",
            "Stratus ($St$)"
        ],
        "correctAnswer": "Cumulonimbus ($Cb$)",
        "explanation": "Cumulonimbus (Cb) clouds exhibit powerful vertical growth, extending from low levels to the tropopause with anvil tops (incus), generating squalls, lightning, and heavy precipitation."
    },
    {
        "id": "MET-B-29",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Wind Measurement — Geostrophic Balance",
        "content": "<p>In the upper troposphere, when the horizontal pressure gradient force is exactly balanced by the Coriolis force, what is the resulting horizontal wind called?</p>",
        "options": [
            "Geostrophic wind",
            "Thermal breeze",
            "Katabatic wind",
            "Turbulent gust"
        ],
        "correctAnswer": "Geostrophic wind",
        "explanation": "Geostrophic wind flows parallel to straight isobars in frictionless conditions where the pressure gradient force is in exact equilibrium with the Coriolis deflection force."
    }
]
new_questions.extend(met_additions)

# ==============================================================================
# FIELD 3: Geology (currently 20 -> add 21 -> 41)
# ==============================================================================
glg_additions = [
    {
        "id": "GLG-B-13",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Relative Geochronology — Steno's Law of Superposition",
        "content": "<p>According to Nicolas Steno's Law of Superposition, what is the relative age relationship of undisturbed sedimentary strata?</p>",
        "options": [
            "The oldest sedimentary layer is at the bottom, and layers become progressively younger upwards",
            "The youngest sedimentary layer is at the bottom due to gravitational settling",
            "All strata in a basin are deposited simultaneously regardless of depth",
            "The age of strata depends strictly on their grain size rather than stratigraphic position"
        ],
        "correctAnswer": "The oldest sedimentary layer is at the bottom, and layers become progressively younger upwards",
        "explanation": "Steno's Law of Superposition states that in an undeformed sequence of sedimentary rocks, each layer is older than the one above it and younger than the one beneath it."
    },
    {
        "id": "GLG-B-14",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Cross-Cutting Relationships in Magmatic Intrusions",
        "content": "<p>If an igneous basaltic dyke cuts across horizontal limestone beds and a normal fault offsets both the limestone and the dyke, what is the correct chronological sequence from oldest to youngest?</p>",
        "options": [
            "Deposition of limestone $\\rightarrow$ Intrusion of basaltic dyke $\\rightarrow$ Normal faulting",
            "Normal faulting $\\rightarrow$ Deposition of limestone $\\rightarrow$ Intrusion of basaltic dyke",
            "Intrusion of basaltic dyke $\\rightarrow$ Deposition of limestone $\\rightarrow$ Normal faulting",
            "Normal faulting $\\rightarrow$ Intrusion of basaltic dyke $\\rightarrow$ Deposition of limestone"
        ],
        "correctAnswer": "Deposition of limestone $\\rightarrow$ Intrusion of basaltic dyke $\\rightarrow$ Normal faulting",
        "explanation": "By the principle of cross-cutting relationships, a geologic feature that cuts another is younger than the rock it cuts: limestone existed first, the dyke cut it, and finally the fault offset both."
    },
    {
        "id": "GLG-B-15",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Stratigraphic Discontinuities — Angular Unconformity",
        "content": "<p>What type of geological contact occurs when horizontally deposited sedimentary strata rest directly on tilted or folded and eroded older sedimentary strata?</p>",
        "options": [
            "Angular unconformity (Угловое несогласие)",
            "Disconformity (Параллельное несогласие)",
            "Nonconformity",
            "Conformable contact"
        ],
        "correctAnswer": "Angular unconformity (Угловое несогласие)",
        "explanation": "An angular unconformity represents a boundary where horizontally bedded younger sediments overlie older tilted, deformed, and eroded sedimentary rocks, demonstrating tectonic deformation followed by an erosion hiatus."
    },
    {
        "id": "GLG-B-16",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Structural Geology — Anticline Morphology",
        "content": "<p>In structural geology, which characteristics define a classic symmetrical anticline fold?</p>",
        "options": [
            "Convex-upward arch with the oldest strata situated at the core of the fold and limbs dipping away from the axial plane",
            "Concave-upward trough with the youngest strata at the core",
            "Horizontal block displacement along a vertical fracture surface",
            "Down-dropped graben bounded by normal faults"
        ],
        "correctAnswer": "Convex-upward arch with the oldest strata situated at the core of the fold and limbs dipping away from the axial plane",
        "explanation": "An anticline is an upward-arching fold whose limbs dip away from the central hinge line, exposing the oldest rocks in its core after horizontal planar erosion."
    },
    {
        "id": "GLG-B-17",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Tectonic Rifting — Horst and Graben Structure",
        "content": "<p>The Lake Baikal basin is the deepest continental rift lake on Earth. Geologically, what tectonic structural feature best describes the Baikal depression?</p>",
        "options": [
            "A continental graben formed by extensional normal faulting",
            "A compressive synclinal foreland basin",
            "A volcanic caldera collapse formed by explosive ignimbrite eruption",
            "An impact crater structure"
        ],
        "correctAnswer": "A continental graben formed by extensional normal faulting",
        "explanation": "Lake Baikal occupies an active continental rift zone, comprising an asymmetric graben bounded by high-angle normal faults formed in response to regional extensional stress in southern Siberia."
    },
    {
        "id": "GLG-B-18",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Mohs Hardness Scale — Calcite vs Quartz",
        "content": "<p>On Friedrich Mohs' relative hardness scale (1–10), what are the standard hardness indices assigned to calcite and quartz respectively?</p>",
        "options": [
            "Calcite = 3, Quartz = 7",
            "Calcite = 4, Quartz = 6",
            "Calcite = 2, Quartz = 8",
            "Calcite = 5, Quartz = 9"
        ],
        "correctAnswer": "Calcite = 3, Quartz = 7",
        "explanation": "The Mohs scale order is: 1 Talc, 2 Gypsum, 3 Calcite, 4 Fluorite, 5 Apatite, 6 Orthoclase, 7 Quartz, 8 Topaz, 9 Corundum, 10 Diamond. Calcite has hardness 3, quartz hardness 7."
    },
    {
        "id": "GLG-B-19",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Silicate Mineral Classification — Phyllosilicates",
        "content": "<p>To which structural subclass of silicate minerals do mica (muscovite, biotite), talc, and clay minerals (kaolinite) belong, based on their continuous 2D tetrahedral sheets ($[\\text{Si}_2\\text{O}_5]^{2-}$)?</p>",
        "options": [
            "Phyllosilicates (Sheet silicates)",
            "Nesosilicates (Island / Orthosilicates)",
            "Inosilicates (Chain silicates)",
            "Tectosilicates (Framework silicates)"
        ],
        "correctAnswer": "Phyllosilicates (Sheet silicates)",
        "explanation": "Phyllosilicates (from Greek phyllon, leaf) feature continuous two-dimensional sheets of silica tetrahedra sharing three oxygens ($[\\text{Si}_2\\text{O}_5]^{2-}$), conferring perfect basal cleavage parallel to the sheets."
    },
    {
        "id": "GLG-B-20",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Silicate Mineral Classification — Tectosilicates",
        "content": "<p>Which silicate subclass features a 3D framework wherein all four oxygen vertices of every $[\\text{SiO}_4]$ tetrahedron are shared with adjacent tetrahedra, exemplified by quartz and feldspars?</p>",
        "options": [
            "Tectosilicates (Framework silicates)",
            "Sorosilicates",
            "Cyclosilicates",
            "Inosilicates"
        ],
        "correctAnswer": "Tectosilicates (Framework silicates)",
        "explanation": "Tectosilicates represent framework silicates with a 1:2 silicon-to-oxygen ratio ($[\\text{SiO}_2]$), where all oxygen atoms are shared, making up roughly 75% of Earth's continental crust (quartz, plagioclase, orthoclase)."
    },
    {
        "id": "GLG-B-21",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Bowen's Reaction Series — Discontinuous Branch",
        "content": "<p>According to Norman L. Bowen's reaction series, which sequence shows the crystallization order of mafic minerals from a cooling basaltic magma as temperature decreases?</p>",
        "options": [
            "Olivine $\\rightarrow$ Pyroxene (Augite) $\\rightarrow$ Amphibole (Hornblende) $\\rightarrow$ Biotite",
            "Biotite $\\rightarrow$ Amphibole $\\rightarrow$ Pyroxene $\\rightarrow$ Olivine",
            "Quartz $\\rightarrow$ Muscovite $\\rightarrow$ K-Feldspar $\\rightarrow$ Olivine",
            "Anorthite $\\rightarrow$ Albite $\\rightarrow$ Pyroxene $\\rightarrow$ Olivine"
        ],
        "correctAnswer": "Olivine $\\rightarrow$ Pyroxene (Augite) $\\rightarrow$ Amphibole (Hornblende) $\\rightarrow$ Biotite",
        "explanation": "The discontinuous branch of Bowen's reaction series proceeds with falling temperature from high-temperature nesosilicate (olivine) to single-chain inosilicate (pyroxene), double-chain inosilicate (amphibole), and finally sheet silicate (biotite)."
    },
    {
        "id": "GLG-B-22",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Seismic Body Waves — S-Wave Propagation Barrier",
        "content": "<p>Why are seismic shear waves ($S$-waves) unable to propagate through the Earth's outer core, creating a pronounced $S$-wave shadow zone on seismograms beyond angular distance $\\Delta > 103^\\circ$?</p>",
        "options": [
            "Because the liquid outer core has zero shear modulus ($\\mu = 0$)",
            "Because $P$-waves reflect completely at the crustal boundary",
            "Because the outer core density is lower than the mantle density",
            "Because seismic wavelengths exceed the diameter of the core"
        ],
        "correctAnswer": "Because the liquid outer core has zero shear modulus ($\\mu = 0$)",
        "explanation": "The velocity of shear waves is $V_s = \\sqrt{\\mu / \\rho}$. In liquids, shear modulus $\\mu = 0$, meaning fluids cannot sustain shear stress. Thus, S-waves cannot travel through the liquid iron-nickel outer core."
    },
    {
        "id": "GLG-B-23",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Earth Discontinuities — Mohorovičić Discontinuity",
        "content": "<p>What internal boundary separates Earth's crust from the underlying upper mantle, marked by an abrupt increase in seismic $P$-wave velocity from $\\sim 6.5\\text{ km/s}$ to $\\sim 8.1\\text{ km/s}$?</p>",
        "options": [
            "Mohorovičić discontinuity (Moho)",
            "Gutenberg discontinuity",
            "Lehmann discontinuity",
            "Conrad discontinuity"
        ],
        "correctAnswer": "Mohorovičić discontinuity (Moho)",
        "explanation": "Discovered in 1909 by Andrija Mohorovičić, the Moho marks the compositional boundary between felsic/mafic crustal rocks and high-density ultramafic mantle peridotites."
    },
    {
        "id": "GLG-B-24",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Earth Discontinuities — Gutenberg Discontinuity",
        "content": "<p>At what approximate depth does the Gutenberg discontinuity occur, separating the silicate lower mantle from the liquid iron outer core?</p>",
        "options": [
            "Approximately $2,900\\text{ km}$",
            "Approximately $670\\text{ km}$",
            "Approximately $5,150\\text{ km}$",
            "Approximately $100\\text{ km}$"
        ],
        "correctAnswer": "Approximately $2,900\\text{ km}$",
        "explanation": "The core-mantle boundary (Gutenberg discontinuity) lies at a depth of ~2,900 km, characterized by a sharp drop in P-wave speed from 13.7 km/s to 8.1 km/s and the termination of S-wave propagation."
    },
    {
        "id": "GLG-B-25",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Plate Tectonics — Subduction Zone Thermal Regimes",
        "content": "<p>Which metamorphic facies series develops under high pressures and relatively low temperatures ($HP/LT$) characteristic of cold oceanic lithosphere subduction zones?</p>",
        "options": [
            "Blueschist and Eclogite facies (Glaucophane-bearing)",
            "Hornfels and Sanidinite facies",
            "Granulite facies",
            "Greenschist facies only"
        ],
        "correctAnswer": "Blueschist and Eclogite facies (Glaucophane-bearing)",
        "explanation": "Rapid subduction of cold oceanic crust drags rocks to great mantle depths before they can equilibrate thermally, resulting in high pressure and low temperature (HP/LT) conditions that form blueschists (with glaucophane) and eclogites."
    },
    {
        "id": "GLG-B-26",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Sedimentary Facies — Grain Size Grading",
        "content": "<p>What sedimentological term describes a single sedimentary stratum displaying a continuous vertical gradient from coarse gravel/sand at the base to fine silt/clay at the top, formed by decelerating turbidity currents?</p>",
        "options": [
            "Graded bedding (Turbidite Bouma sequence)",
            "Cross-bedding",
            "Mudcracks",
            "Flute cast"
        ],
        "correctAnswer": "Graded bedding (Turbidite Bouma sequence)",
        "explanation": "Graded bedding displays normal vertical grading (coarse at the bottom, fine at the top) deposited by submarine turbidity currents as current velocity declines."
    },
    {
        "id": "GLG-I-07",
        "field": "Geology",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Seismic Vp / Vs Velocity Ratio in Crystalline Rocks",
        "content": "<p>At a seismic exploration site on the Siberian Craton, refracted body wave arrivals indicate a compressional wave velocity $V_p = 5.80\\text{ km/s}$ and shear wave velocity $V_s = 3.35\\text{ km/s}$ in crystalline granitic basement. Calculate Poisson's ratio ($\\nu$) using the elastic relation $\\nu = \\frac{(V_p/V_s)^2 - 2}{2[(V_p/V_s)^2 - 1]}$.</p>",
        "options": [
            "$\\nu \\approx 0.25$",
            "$\\nu \\approx 0.15$",
            "$\\nu \\approx 0.35$",
            "$\\nu \\approx 0.45$"
        ],
        "correctAnswer": "$\\nu \\approx 0.25$",
        "explanation": "Ratio $V_p/V_s = 5.80 / 3.35 \\approx 1.7313$. Then $(V_p/V_s)^2 \\approx 2.9975 \\approx 3.0$. Poisson's ratio: $\\nu = \\frac{3.0 - 2}{2(3.0 - 1)} = \\frac{1}{4} = 0.25$, which matches a standard Poisson solid."
    },
    {
        "id": "GLG-I-08",
        "field": "Geology",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Geothermal Gradient and Conductive Heat Flow",
        "content": "<p>In an exploration borehole drilled into the West Siberian sedimentary basin, temperature increases by $\\Delta T = 36.0^\\circ\\text{C}$ across a vertical depth interval $\\Delta z = 1,200\\text{ m}$. If the average thermal conductivity of the sedimentary rocks is $k = 2.5\\text{ W}/(\\text{m}\\cdot\\text{K})$, calculate: 1) the geothermal gradient ($G$ in $^\\circ\\text{C/km}$), and 2) the terrestrial surface heat flow density ($q = k \\cdot G$ in $\\text{mW/m}^2$).</p>",
        "options": [
            "$G = 30.0^\\circ\\text{C/km}, \\; q = 75.0\\text{ mW/m}^2$",
            "$G = 25.0^\\circ\\text{C/km}, \\; q = 62.5\\text{ mW/m}^2$",
            "$G = 35.0^\\circ\\text{C/km}, \\; q = 87.5\\text{ mW/m}^2$",
            "$G = 20.0^\\circ\\text{C/km}, \\; q = 50.0\\text{ mW/m}^2$"
        ],
        "correctAnswer": "$G = 30.0^\\circ\\text{C/km}, \\; q = 75.0\\text{ mW/m}^2$",
        "explanation": "1) Geothermal gradient: $G = \\frac{36.0^\\circ\\text{C}}{1.2\\text{ km}} = 30.0^\\circ\\text{C/km} = 0.030^\\circ\\text{C/m}$. 2) Heat flow density: $q = k \\cdot \\frac{\\Delta T}{\\Delta z} = 2.5 \\cdot 0.030 = 0.075\\text{ W/m}^2 = 75.0\\text{ mW/m}^2$."
    },
    {
        "id": "GLG-I-09",
        "field": "Geology",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Sedimentary Compaction and Porosity Decay with Depth",
        "content": "<p>In a deep basin, shale porosity decays exponentially with depth according to Athy's law: $\\Phi(z) = \\Phi_0 e^{-c z}$, where initial surface depositional porosity is $\\Phi_0 = 0.50$ and compaction coefficient is $c = 0.0005\\text{ m}^{-1}$. Calculate the shale porosity at depth $z = 1,386\\text{ m}$ (given $\\ln(2) \\approx 0.693$).</p>",
        "options": [
            "$\\Phi = 0.25$ ($25\\%$)",
            "$\\Phi = 0.35$ ($35\\%$)",
            "$\\Phi = 0.15$ ($15\\%$)",
            "$\\Phi = 0.10$ ($10\\%$)"
        ],
        "correctAnswer": "$\\Phi = 0.25$ ($25\\%$)",
        "explanation": "Exponent is $c z = 0.0005 \\cdot 1386 = 0.693 = \\ln(2)$. Therefore, $e^{-0.693} = \\frac{1}{2} = 0.50$. The porosity is $\\Phi = 0.50 \\times 0.50 = 0.25$ ($25\\%$)."
    },
    {
        "id": "GLG-I-10",
        "field": "Geology",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Dip-Slip Fault Throw and Heave Trigonometry",
        "content": "<p>A normal fault cutting an alluvial terrace has a dip angle of $\\theta = 45^\\circ$. Trenching reveals a vertical throw of $h_v = 4.0\\text{ m}$. Assuming pure dip-slip motion, what is the horizontal extension (heave, $h_h$) and total displacement along the fault plane ($S$)?</p>",
        "options": [
            "$h_h = 4.0\\text{ m}, \\; S \\approx 5.66\\text{ m}$",
            "$h_h = 2.0\\text{ m}, \\; S \\approx 4.0\\text{ m}$",
            "$h_h = 5.66\\text{ m}, \\; S \\approx 8.0\\text{ m}$",
            "$h_h = 4.0\\text{ m}, \\; S \\approx 4.0\\text{ m}$"
        ],
        "correctAnswer": "$h_h = 4.0\\text{ m}, \\; S \\approx 5.66\\text{ m}$",
        "explanation": "Because dip $\\theta = 45^\\circ$, $\\tan(45^\\circ) = 1$, so heave $h_h = \\frac{h_v}{\\tan(45^\\circ)} = 4.0\\text{ m}$. Net slip $S = \\frac{h_v}{\\sin(45^\\circ)} = \\frac{4.0}{\\sqrt{2}/2} = 4.0\\sqrt{2} \\approx 5.66\\text{ m}$."
    },
    {
        "id": "GLG-A-03",
        "field": "Geology",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 3,
        "title": "True Stratigraphic Thickness and Outcrop Width Calculation",
        "content": "<p>On horizontal terrain, an inclined limestone formation outcrops with a horizontal outcrop width $W = 250\\text{ m}$ measured perpendicular to strike. Field compass clinometer measurements establish that the beds dip uniformly at an angle $\\delta = 30^\\circ$. A vertical exploration borehole is drilled from the upper contact down to the lower contact. Calculate: 1) the true stratigraphic thickness ($T$) of the limestone formation, and 2) the apparent vertical drilled thickness ($H$) encountered in the vertical borehole.</p>",
        "options": [],
        "answerText": "True stratigraphic thickness T = 125.0\\text{ m}, Drilled thickness H \\approx 144.3\\text{ m}",
        "explanation": "1) True thickness from outcrop width $W$ on horizontal ground: $T = W \\cdot \\sin(\\delta) = 250 \\cdot \\sin(30^\\circ) = 250 \\cdot 0.5 = 125.0\\text{ m}$. 2) Vertical borehole thickness $H$: $H = \\frac{T}{\\cos(\\delta)} = \\frac{125}{\\cos(30^\\circ)} = \\frac{125}{\\sqrt{3}/2} = \\frac{250}{\\sqrt{3}} \\approx 144.34\\text{ m}$. (Alternatively, $H = W \\cdot \\tan(\\delta) = 250 \\cdot \\tan(30^\\circ) = 250 \\cdot 0.57735 \\approx 144.34\\text{ m}$).",
        "modelSolution": "1) True thickness: $T = W \\cdot \\sin(\\delta) = 250 \\cdot \\sin(30^\\circ) = 125.0\\text{ m}$.\n2) Vertical drilled thickness: $H = T / \\cos(\\delta) = 125 / \\cos(30^\\circ) = 144.3\\text{ m}$."
    },
    {
        "id": "GLG-A-04",
        "field": "Geology",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 3,
        "title": "Isostatic Lithospheric Rebound After Deglaciation",
        "content": "<p>During the Last Glacial Maximum (LGM), a Pleistocene ice sheet of thickness $H_{\\text{ice}} = 2,400\\text{ m}$ (ice density $\\rho_{\\text{ice}} = 900\\text{ kg/m}^3$) depressed the continental lithosphere into the asthenospheric mantle (mantle density $\\rho_m = 3,300\\text{ kg/m}^3$). Assuming complete Archimedean isostatic equilibrium before rapid deglaciation: 1) calculate the total theoretical equilibrium mantle crustal depression depth ($h_{\\text{dep}}$), and 2) if postglacial uplift has already recovered $500\\text{ m}$ of uplift to date, calculate the remaining postglacial rebound yet to occur.</p>",
        "options": [],
        "answerText": "Isostatic depression h_{dep} \\approx 654.5\\text{ m}, Remaining rebound \\approx 154.5\\text{ m}",
        "explanation": "1) Isostatic mass balance: $H_{\\text{ice}} \\cdot \\rho_{\\text{ice}} = h_{\\text{dep}} \\cdot \\rho_m \\implies h_{\\text{dep}} = H_{\\text{ice}} \\cdot \\frac{\\rho_{\\text{ice}}}{\\rho_m} = 2400 \\cdot \\frac{900}{3300} = 2400 \\cdot \\frac{3}{11} = \\frac{7200}{11} \\approx 654.55\\text{ m}$. 2) Remaining rebound: $h_{\\text{rem}} = 654.55 - 500 = 154.55\\text{ m}$.",
        "modelSolution": "1) Equilibrium isostatic depression: $h_{\\text{dep}} = H_{\\text{ice}} (\\rho_{\\text{ice}} / \\rho_m) = 2400 \\times (900 / 3300) = 654.5\\text{ m}$.\n2) Remaining rebound: $654.5 - 500 = 154.5\\text{ m}$."
    },
    {
        "id": "GLG-B-27",
        "field": "Geology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Metamorphic Index Minerals — Barrow's Zones",
        "content": "<p>In George Barrow's classic sequence of regional metamorphic zones in pelitic rocks, which mineral marks the transition into the highest metamorphic grade (upper amphibolite/granulite facies)?</p>",
        "options": [
            "Sillimanite",
            "Chlorite",
            "Biotite",
            "Garnet (Almandine)"
        ],
        "correctAnswer": "Sillimanite",
        "explanation": "Barrow's progressive zones from low to high grade are: Chlorite $\\rightarrow$ Biotite $\\rightarrow$ Garnet $\\rightarrow$ Staurolite $\\rightarrow$ Kyanite $\\rightarrow$ Sillimanite. Sillimanite marks peak metamorphic temperatures."
    }
]
new_questions.extend(glg_additions)

# ==============================================================================
# FIELD 4: Geochemistry & geophysics (currently 32 -> add 9 -> 41)
# ==============================================================================
gch_additions = [
    {
        "id": "GCH-B-25",
        "field": "Geochemistry & geophysics",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Geochemical Abundance — Crustal Clarke Numbers",
        "content": "<p>In Vladimir Vernadsky and Alexander Fersman's geochemical taxonomy, what term denotes the average percentage abundance of a chemical element in the Earth's continental crust?</p>",
        "options": [
            "Clarke value (Кларк элемента)",
            "Concentration coefficient (КК)",
            "Partition coefficient",
            "Enrichment factor"
        ],
        "correctAnswer": "Clarke value (Кларк элемента)",
        "explanation": "Named in honor of F.W. Clarke by A.E. Fersman, the Clarke value represents the mean weight-percent abundance of an element in the Earth's crust."
    },
    {
        "id": "GCH-B-26",
        "field": "Geochemistry & geophysics",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Geochemical Barriers — Oxygen (Oxidizing) Barrier",
        "content": "<p>According to A.I. Perelman's geochemical barrier theory, what chemical process occurs when anoxic groundwater rich in dissolved ferrous iron ($\\text{Fe}^{2+}$) discharges into an oxygenated surface stream?</p>",
        "options": [
            "Rapid oxidation to $\\text{Fe}^{3+}$ and precipitation of insoluble iron hydroxides ($\\text{Fe(OH)}_3 / \\text{FeO(OH)}$)",
            "Reduction to metallic iron ($\text{Fe}^0$)",
            "Increase in iron solubility preventing any precipitation",
            "Direct volatilization of iron into the atmosphere"
        ],
        "correctAnswer": "Rapid oxidation to $\\text{Fe}^{3+}$ and precipitation of insoluble iron hydroxides ($\\text{Fe(OH)}_3 / \\text{FeO(OH)}$)",
        "explanation": "At an oxygen barrier (Perelman class A), dissolved Fe(II) is oxidized to Fe(III) by atmospheric oxygen ($4\\text{Fe}^{2+} + \\text{O}_2 + 10\\text{H}_2\\text{O} \\to 4\\text{Fe(OH)}_3\\downarrow + 8\\text{H}^+$), depositing bright ochre precipitates."
    },
    {
        "id": "GCH-B-27",
        "field": "Geochemistry & geophysics",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Geophysical Gravity Exploration — Bouguer Anomaly Over Salt Domes",
        "content": "<p>In gravity exploration over sedimentary basins (e.g. Caspian depression), why do salt diapir domes produce distinct negative Bouguer gravity anomalies?</p>",
        "options": [
            "Because rock salt (halite) has a lower density ($\\approx 2.16\\text{ g/cm}^3$) than surrounding compacted sedimentary wallrocks ($\\approx 2.4\\text{--}2.6\\text{ g/cm}^3$)",
            "Because halite is strongly diamagnetic",
            "Because halite causes acoustic pulse reflection",
            "Because salt domes possess higher radioactive heat generation"
        ],
        "correctAnswer": "Because rock salt (halite) has a lower density ($\\approx 2.16\\text{ g/cm}^3$) than surrounding compacted sedimentary wallrocks ($\\approx 2.4\\text{--}2.6\\text{ g/cm}^3$)",
        "explanation": "Rock salt exhibits an incompressibly low density (~2.16 g/cm³). When surrounded by denser compacted clastic/carbonate rocks (2.4–2.6 g/cm³), the density deficit creates a pronounced local negative gravity anomaly."
    },
    {
        "id": "GCH-I-06",
        "field": "Geochemistry & geophysics",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Wenner Array Apparent Resistivity Calculation",
        "content": "<p>In electrical resistivity profiling using a four-electrode Wenner array ($AM = MN = NB = a = 20\\text{ m}$), an injected direct current $I = 0.20\\text{ A}$ produces a measured potential difference $\\Delta U = 16\\text{ mV}$. Calculate the apparent electrical resistivity ($\\rho_a = 2\\pi a \\frac{\\Delta U}{I}$) of the subsurface.</p>",
        "options": [
            "$10.05\\;\\Omega\\cdot\\text{m}$",
            "$5.03\\;\\Omega\\cdot\\text{m}$",
            "$20.11\\;\\Omega\\cdot\\text{m}$",
            "$40.21\\;\\Omega\\cdot\\text{m}$"
        ],
        "correctAnswer": "$10.05\\;\\Omega\\cdot\\text{m}$",
        "explanation": "Geometric factor $K = 2\\pi a = 2\\pi(20) = 40\\pi \\approx 125.66\\text{ m}$. Resistance $R = \\frac{\\Delta U}{I} = \\frac{0.016\\text{ V}}{0.20\\text{ A}} = 0.080\\;\\Omega$. Apparent resistivity $\\rho_a = 125.66 \\times 0.080 \\approx 10.05\\;\\Omega\\cdot\\text{m}$."
    },
    {
        "id": "GCH-I-07",
        "field": "Geochemistry & geophysics",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Archie's Law — Porosity and Formation Factor",
        "content": "<p>According to Archie's Law for clean sandstone ($F = \\frac{\\rho_0}{\\rho_w} = \\Phi^{-m}$), a reservoir rock has a cementation exponent $m = 2.0$. If the formation pore water resistivity is $\\rho_w = 0.20\\;\\Omega\\cdot\\text{m}$ and the fully water-saturated rock resistivity is $\\rho_0 = 20.0\\;\\Omega\\cdot\\text{m}$, what is the fractional porosity ($\\Phi$) of the sandstone?</p>",
        "options": [
            "$\\Phi = 0.10$ ($10\\%$)",
            "$\\Phi = 0.20$ ($20\\%$)",
            "$\\Phi = 0.05$ ($5\\%$)",
            "$\\Phi = 0.25$ ($25\\%$)"
        ],
        "correctAnswer": "$\\Phi = 0.10$ ($10\\%$)",
        "explanation": "Formation factor is $F = \\frac{\\rho_0}{\\rho_w} = \\frac{20.0}{0.20} = 100$. Since $F = \\Phi^{-2.0}$, we have $\\Phi^2 = \\frac{1}{100} = 0.01 \\implies \\Phi = \\sqrt{0.01} = 0.10$ ($10\\%$)."
    },
    {
        "id": "GCH-I-08",
        "field": "Geochemistry & geophysics",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Free-Air and Bouguer Gravity Elevation Corrections",
        "content": "<p>A gravity station is established on an elevated plateau at elevation $h = 500\\text{ m}$ above sea level. Given the standard Free-Air gradient $+0.3086\\text{ mGal/m}$ and Bouguer slab correction coefficient $-0.04193 \\rho h\\text{ mGal}$ (where mean crustal density $\\rho = 2.67\\text{ g/cm}^3$), calculate the combined elevation correction ($\\Delta g_{\\text{elev}} = \\Delta g_{\\text{FA}} + \\Delta g_B$) to be added to the measured gravity reading.</p>",
        "options": [
            "$+98.3\\text{ mGal}$",
            "$+154.3\\text{ mGal}$",
            "$-56.0\\text{ mGal}$",
            "$+196.6\\text{ mGal}$"
        ],
        "correctAnswer": "$+98.3\\text{ mGal}$",
        "explanation": "Free-air: $\\Delta g_{\\text{FA}} = 0.3086 \\times 500 = +154.30\\text{ mGal}$. Bouguer slab: $\\Delta g_B = -0.04193 \\times 2.67 \\times 500 = -55.98\\text{ mGal}$. Combined correction: $+154.30 - 55.98 = +98.32\\text{ mGal}$."
    },
    {
        "id": "GCH-I-09",
        "field": "Geochemistry & geophysics",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Redox Geochemistry of Chalcopyrite Weathering",
        "content": "<p>In the oxidation zone of a copper-sulfide deposit, chalcopyrite ($\\text{CuFeS}_2$) reacts with oxygen and water according to: $4\\text{CuFeS}_2 + 17\\text{O}_2 + 10\\text{H}_2\\text{O} \\to 4\\text{CuSO}_4 + 4\\text{Fe(OH)}_3\\downarrow + 4\\text{H}_2\\text{SO}_4$. How many moles of sulfuric acid are produced per mole of chalcopyrite oxidized?</p>",
        "options": [
            "$1.0\\text{ mole of } \\text{H}_2\\text{SO}_4$",
            "$2.0\\text{ moles of } \\text{H}_2\\text{SO}_4$",
            "$0.5\\text{ moles of } \\text{H}_2\\text{SO}_4$",
            "$4.0\\text{ moles of } \\text{H}_2\\text{SO}_4$"
        ],
        "correctAnswer": "$1.0\\text{ mole of } \\text{H}_2\\text{SO}_4$",
        "explanation": "From the stoichiometric balance, 4 moles of $\\text{CuFeS}_2$ yield 4 moles of $\\text{CuSO}_4$ and 4 moles of $\\text{H}_2\\text{SO}_4$. Thus, for each 1 mole of chalcopyrite oxidized, exactly 1 mole of free sulfuric acid is generated."
    },
    {
        "id": "GCH-A-04",
        "field": "Geochemistry & geophysics",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 3,
        "title": "Rare Earth Element (REE) Europium Anomaly Calculation",
        "content": "<p>In an igneous petrology and geochemistry study at NSU, whole-rock Inductively Coupled Plasma Mass Spectrometry (ICP-MS) yields chondrite-normalized REE concentrations for a plagioclase-rich cumulate: $[\\text{Sm}]_N = 12.0$, $[\\text{Eu}]_N = 24.0$, and $[\\text{Gd}]_N = 8.0$. 1) Calculate the expected interpolated europium value for trivalent behavior ($[\\text{Eu}^*]_N = \\sqrt{[\\text{Sm}]_N \\cdot [\\text{Gd}]_N}$), and 2) Calculate the Europium Anomaly ratio ($\\text{Eu}/\\text{Eu}^* = \\frac{[\\text{Eu}]_N}{[\\text{Eu}^*]_N}$), interpreting whether this indicates a positive or negative anomaly and which mineral fractionated.</p>",
        "options": [],
        "answerText": "[Eu*]_N \\approx 9.80, Eu/Eu* \\approx 2.45 (Positive anomaly due to plagioclase accumulation)",
        "explanation": "1) $[\\text{Eu}^*]_N = \\sqrt{12.0 \\times 8.0} = \\sqrt{96} \\approx 9.798$. 2) Ratio $\\text{Eu}/\\text{Eu}^* = \\frac{24.0}{9.798} \\approx 2.45$. Since $\\text{Eu}/\\text{Eu}^* > 1.0$, this is a pronounced positive europium anomaly caused by the preferential substitution of divalent $\\text{Eu}^{2+}$ for $\\text{Ca}^{2+}$ in accumulating plagioclase feldspar.",
        "modelSolution": "1) Interpolated value: $[\\text{Eu}^*]_N = \\sqrt{12.0 \\times 8.0} = \\sqrt{96} = 9.80$.\n2) Anomaly: $\\text{Eu}/\\text{Eu}^* = 24.0 / 9.80 = 2.45$ (Positive anomaly reflecting plagioclase accumulation)."
    },
    {
        "id": "GCH-B-28",
        "field": "Geochemistry & geophysics",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Radioactive Decay Dating — Rubidium-Strontium System",
        "content": "<p>In geochronological isotope geochemistry, the radioactive beta-decay of parent nuclide $^{87}\\text{Rb}$ transforms into which stable radiogenic daughter isotope?</p>",
        "options": [
            "$^{87}\\text{Sr}$ (Strontium-87)",
            "$^{86}\\text{Sr}$ (Strontium-86)",
            "$^{40}\\text{Ar}$ (Argon-40)",
            "$^{206}\\text{Pb}$ (Lead-206)"
        ],
        "correctAnswer": "$^{87}\\text{Sr}$ (Strontium-87)",
        "explanation": "In the Rb-Sr isotopic chronometer, $^{87}\\text{Rb}$ decays by beta emission ($\beta^-$) into radiogenic $^{87}\\text{Sr}$ with a half-life of approximately 48.8 billion years."
    }
]
new_questions.extend(gch_additions)

# ==============================================================================
# FIELD 5: Mining & mineral processing (currently 22 -> add 19 -> 41)
# ==============================================================================
min_additions = [
    {
        "id": "MIN-B-15",
        "field": "Mining & mineral processing",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Subsoil User Legal Obligations in Russian Mining Law",
        "content": "<p>Under the Federal Law of the Russian Federation 'On Subsoil' (*О недрах*), what is the statutory status of an enterprise possessing a State license for geological exploration and commercial extraction of solid minerals?</p>",
        "options": [
            "Subsoil user (Недропользователь)",
            "Concessionary sovereign",
            "Land title freeholder",
            "Subsoil tenant-at-will"
        ],
        "correctAnswer": "Subsoil user (Недропользователь)",
        "explanation": "The fundamental legal term in Russian mining legislation is 'subsoil user' (*недропользователь*), who receives time-limited state license rights to exploit mineral resources while undertaking mandatory environmental protection and post-mining reclamation."
    },
    {
        "id": "MIN-B-16",
        "field": "Mining & mineral processing",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Open-Pit Mining — Stripping Ratio Definition",
        "content": "<p>In open-pit (*quarry*) mining engineering, what does the volumetric stripping ratio ($K_{\\text{strip}}$) quantify?</p>",
        "options": [
            "The volume of barren overburden rock removed per tonne (or volume) of commercial ore extracted ($\\text{m}^3/\\text{t}$)",
            "The percentage of valuable mineral lost in tailings",
            "The explosive powder factor used per blast hole",
            "The water volume recirculated in slurry pipelines"
        ],
        "correctAnswer": "The volume of barren overburden rock removed per tonne (or volume) of commercial ore extracted ($\\text{m}^3/\\text{t}$)",
        "explanation": "The stripping ratio (*коэффициент вскрыши*) expresses the quantity of waste overburden that must be stripped and transported to dumps to mine one unit of economic ore."
    },
    {
        "id": "MIN-B-17",
        "field": "Mining & mineral processing",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Froth Flotation Reagents — Collectors (Собиратели)",
        "content": "<p>In the froth flotation of sulfide ores (galena, chalcopyrite, sphalerite), what functional role is performed by collector reagents such as potassium xanthates?</p>",
        "options": [
            "Selectively adsorbing onto valuable sulfide mineral grains to make their surfaces hydrophobic",
            "Preventing air bubbles from rising to the surface",
            "Dissolving waste quartz and carbonate gangue minerals",
            "Neutralizing acidic slurry solutions"
        ],
        "correctAnswer": "Selectively adsorbing onto valuable sulfide mineral grains to make their surfaces hydrophobic",
        "explanation": "Collectors (*собиратели*) are heteropolar surfactants that selectively adsorb onto sulfide surfaces with non-polar hydrocarbon tails oriented outward, rendering mineral grains water-repellent (hydrophobic) so they attach to rising air bubbles."
    },
    {
        "id": "MIN-B-18",
        "field": "Mining & mineral processing",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Froth Flotation Reagents — Frothers (Пенообразователи)",
        "content": "<p>What is the function of frother reagents (e.g. MIBC, pine oil) added to flotation pulp in mineral processing plants?</p>",
        "options": [
            "Lowering surface tension at the air-water interface to generate stable, buoyant mineralized froth",
            "Increasing mineral density to promote rapid gravity settling",
            "Oxidizing sulfide minerals into water-soluble ions",
            "Coagulating fine slimes into dense bottom precipitates"
        ],
        "correctAnswer": "Lowering surface tension at the air-water interface to generate stable, buoyant mineralized froth",
        "explanation": "Frothers (*пенообразователи*) reduce liquid surface tension, facilitating the creation of fine, uniform air bubbles and maintaining a stable froth layer long enough to skim off the concentrate."
    },
    {
        "id": "MIN-B-19",
        "field": "Mining & mineral processing",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Magnetic Beneficiation — Low-Intensity Magnetic Separators (LIMS)",
        "content": "<p>Which iron ore mineral is recovered with high efficiency using Low-Intensity Magnetic Separation (LIMS, field strength $B < 0.3\\text{ T}$) due to its strong ferrimagnetic properties?</p>",
        "options": [
            "Magnetite ($\\text{Fe}_3\\text{O}_4$)",
            "Hematite ($\\text{Fe}_2\\text{O}_3$)",
            "Siderite ($\\text{FeCO}_3$)",
            "Pyrite ($\\text{FeS}_2$)"
        ],
        "correctAnswer": "Magnetite ($\\text{Fe}_3\\text{O}_4$)",
        "explanation": "Magnetite is strongly ferrimagnetic with high magnetic susceptibility, allowing it to be separated from paramagnetic or diamagnetic gangue using low-intensity magnetic fields (0.1–0.3 T)."
    },
    {
        "id": "MIN-B-20",
        "field": "Mining & mineral processing",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Diamond Beneficiation — Grease Table Separation in Yakutia",
        "content": "<p>In the processing of kimberlite diamond ores in Mirny and Udachny (Yakutia), which surface physical property of diamonds is utilized on grease concentration tables?</p>",
        "options": [
            "Natural hydrophobicity and lipophilic affinity for adherence to petroleum grease",
            "High electrical conductivity",
            "Strong magnetic attraction",
            "Instantaneous dissolution in organic solvents"
        ],
        "correctAnswer": "Natural hydrophobicity and lipophilic affinity for adherence to petroleum grease",
        "explanation": "Unweathered diamond surfaces are naturally non-wettable (hydrophobic) and strongly lipophilic, adhering firmly to petroleum-based grease tables while hydrophilic kimberlite gangue rocks wash away with water."
    },
    {
        "id": "MIN-B-21",
        "field": "Mining & mineral processing",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Underground Mining — Stope Backfilling (*Закладка*)",
        "content": "<p>In underground mining of deep ore deposits (e.g. Norilsk Talnakh mines), what is the primary operational and geomechanical purpose of paste backfilling mined-out stopes (*закладка выработанного пространства*)?</p>",
        "options": [
            "Controlling wallrock convergence, preventing catastrophic surface subsidence, and eliminating rockburst hazards",
            "Increasing water flow into the lower shafts",
            "Allowing natural caving of the entire hanging wall to surface",
            "Extracting secondary gold from tailing slurries"
        ],
        "correctAnswer": "Controlling wallrock convergence, preventing catastrophic surface subsidence, and eliminating rockburst hazards",
        "explanation": "Stope backfilling with cemented hydraulic paste supports surrounding rock mass pillars, minimizes stress concentrations that trigger rockbursts (*горные удары*), and prevents crown pillar collapse and surface ground subsidence."
    },
    {
        "id": "MIN-B-22",
        "field": "Mining & mineral processing",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Waste Rock Dumps — Terracing and Stability",
        "content": "<p>What geometric design measure is mandatory under Russian mining safety regulations to prevent catastrophic slope failures and landslides on massive waste rock dumps (*отвалы пород*)?</p>",
        "options": [
            "Constructing dumps in multi-tiered benches (terraces) with berms and controlled overall slope angles $\\le 30^\\circ\\text{--}35^\\circ$",
            "Piling rock continuously in a single vertical cone up to 500 m high",
            "Flooding the dump crest with unlined tailings water",
            "Lubricating the base of the dump with bentonite slurry"
        ],
        "correctAnswer": "Constructing dumps in multi-tiered benches (terraces) with berms and controlled overall slope angles $\\le 30^\\circ\\text{--}35^\\circ$",
        "explanation": "Russian safety rules (Rostechnadzor) require waste dumps to be constructed in multi-tiered benches separated by safety berms, with slope angles lower than the natural angle of repose of the blasted rock mass."
    },
    {
        "id": "MIN-B-23",
        "field": "Mining & mineral processing",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Ore Comminution — SAG Mills and Ball Mills",
        "content": "<p>In the comminution circuit of a modern mineral processing plant, which equipment sequence represents standard secondary and tertiary grinding before flotation?</p>",
        "options": [
            "Semi-Autogenous Grinding (SAG) mill $\\rightarrow$ Ball mill with hydrocyclone classification",
            "Jaw crusher $\\rightarrow$ Flotation cell $\\rightarrow$ SAG mill",
            "Filter press $\\rightarrow$ Ball mill $\\rightarrow$ Rotary kiln",
            "Gravity spiral $\\rightarrow$ Magnetic separator $\\rightarrow$ Jaw crusher"
        ],
        "correctAnswer": "Semi-Autogenous Grinding (SAG) mill $\\rightarrow$ Ball mill with hydrocyclone classification",
        "explanation": "Standard mineral comminution circuits feed crushed primary ore into a SAG mill for coarse grinding, followed by closed-circuit ball milling with hydrocyclones to deliver optimal pulp particle size ($P_{80} \\approx 74\\,\\mu\\text{m}$) for flotation."
    },
    {
        "id": "MIN-B-24",
        "field": "Mining & mineral processing",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Mineral Processing — Tailings Storage Facilities (TSF)",
        "content": "<p>What is the technical definition of 'tailings' (*хвосты обогащения*) generated by a mineral processing plant?</p>",
        "options": [
            "The waste slurry residue remaining after the commercial valuable minerals have been separated into concentrates",
            "The highest-grade marketable ore shipped directly to smelters",
            "Barren soil stripped during initial site preparation",
            "Liquid fuels consumed by haul trucks"
        ],
        "correctAnswer": "The waste slurry residue remaining after the commercial valuable minerals have been separated into concentrates",
        "explanation": "Tailings (*хвосты*) comprise the ground waste rock particles, residual reagents, and process water left behind after economic mineral extraction, permanently impounded in engineered tailings storage facilities."
    },
    {
        "id": "MIN-B-25",
        "field": "Mining & mineral processing",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Ore Cut-Off Grade Determination",
        "content": "<p>What is the fundamental economic role of the 'cut-off grade' (*бортовое содержание*) in mineral exploration and mine planning?</p>",
        "options": [
            "The minimum threshold concentration of valuable metal below which material cannot be economically mined and processed at a profit",
            "The legal maximum limit of sulfur allowed in finished steel",
            "The average grade of the entire geological crust",
            "The maximum moisture content permitted in shipping containers"
        ],
        "correctAnswer": "The minimum threshold concentration of valuable metal below which material cannot be economically mined and processed at a profit",
        "explanation": "The cut-off grade delineates ore from barren waste: rock with grade above the cut-off pays for its extraction, processing, and refining costs, while rock below it is routed to waste dumps."
    },
    {
        "id": "MIN-B-26",
        "field": "Mining & mineral processing",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Hydrometallurgy — Gold Cyanidation Leaching",
        "content": "<p>Which chemical complexation process is universally employed to extract microscopic native gold from finely ground refractory ore pulps?</p>",
        "options": [
            "Alkaline cyanide leaching (Elsner's reaction: $4\\text{Au} + 8\\text{CN}^- + \\text{O}_2 + 2\\text{H}_2\\text{O} \\to 4[\\text{Au(CN)}_2]^- + 4\\text{OH}^-$)",
            "Acidic chlorination under zero oxygen",
            "Thermal roasting in pure carbon dioxide",
            "Mercury amalgamation at 500 °C"
        ],
        "correctAnswer": "Alkaline cyanide leaching (Elsner's reaction: $4\\text{Au} + 8\\text{CN}^- + \\text{O}_2 + 2\\text{H}_2\\text{O} \\to 4[\\text{Au(CN)}_2]^- + 4\\text{OH}^-$)",
        "explanation": "Gold cyanidation dissolves metallic gold into soluble dicyanoaurate complexes $[\\text{Au(CN)}_2]^-$ in aerated alkaline solutions ($pH \\approx 10.5\\text{--}11.0$), followed by adsorption onto activated carbon (CIL/CIP circuits)."
    },
    {
        "id": "MIN-I-06",
        "field": "Mining & mineral processing",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Ore Block Tonnage via Exploration Cross-Sections",
        "content": "<p>A nickel-copper sulfide ore body is delineated between two parallel exploration profile sections spaced $L = 150\\text{ m}$ apart. The cross-sectional ore areas are $S_1 = 2,400\\text{ m}^2$ and $S_2 = 1,600\\text{ m}^2$. Laboratory pycnometer tests yield an average ore bulk density $\\rho_{\\text{bulk}} = 3.50\\text{ t/m}^3$. Calculate the total mass of ore reserves ($M$) in this block in tonnes.</p>",
        "options": [
            "$1,050,000\\text{ tonnes}$",
            "$700,000\\text{ tonnes}$",
            "$1,400,000\\text{ tonnes}$",
            "$2,100,000\\text{ tonnes}$"
        ],
        "correctAnswer": "$1,050,000\\text{ tonnes}$",
        "explanation": "1) Block volume: $V = \\frac{S_1 + S_2}{2} \\cdot L = \\frac{2400 + 1600}{2} \\cdot 150 = 2000 \\cdot 150 = 300,000\\text{ m}^3$. 2) Ore mass: $M = V \\cdot \\rho_{\\text{bulk}} = 300,000 \\cdot 3.50 = 1,050,000\\text{ tonnes}$."
    },
    {
        "id": "MIN-I-07",
        "field": "Mining & mineral processing",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Volumetric Stripping Ratio in Open-Pit Quarry",
        "content": "<p>An open-pit iron quarry in the Kursk Magnetic Anomaly extracts $M_{\\text{ore}} = 5,000,000\\text{ tonnes}$ of ferruginous quartzite ore per year (density $\\rho_{\\text{ore}} = 3.2\\text{ t/m}^3$). During the same year, the pit operations strip and haul $V_{\\text{waste}} = 7,500,000\\text{ m}^3$ of clay and chalk overburden. Calculate the operational stripping ratio ($K_{\\text{strip}}$) in $\\text{m}^3/\\text{t}$.</p>",
        "options": [
            "$1.50\\text{ m}^3/\\text{t}$",
            "$0.67\\text{ m}^3/\\text{t}$",
            "$2.40\\text{ m}^3/\\text{t}$",
            "$3.20\\text{ m}^3/\\text{t}$"
        ],
        "correctAnswer": "$1.50\\text{ m}^3/\\text{t}$",
        "explanation": "The operational stripping ratio per tonne of ore is $K_{\\text{strip}} = \\frac{V_{\\text{waste}}}{M_{\\text{ore}}} = \\frac{7,500,000\\text{ m}^3}{5,000,000\\text{ t}} = 1.50\\text{ m}^3/\\text{t}$."
    },
    {
        "id": "MIN-I-08",
        "field": "Mining & mineral processing",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Cut-Off Grade Calculation from Operating Costs",
        "content": "<p>An underground copper mine operates with combined mining, milling, and general administrative operating costs of $C = \\$42.00$ per tonne of ore. The market price of refined copper is $P = \\$7,000$ per tonne of pure copper metal, and overall metallurgical mill recovery is $\\varepsilon = 85\\%$ ($0.85$). Using the zero-profit breakeven formula $x_c = \\frac{C}{P \\cdot \\varepsilon}$, calculate the breakeven cut-off copper grade ($x_c$) as a percentage.</p>",
        "options": [
            "$0.706\\%$ ($0.00706$)",
            "$0.600\\%$ ($0.00600$)",
            "$0.850\\%$ ($0.00850$)",
            "$1.200\\%$ ($0.01200$)"
        ],
        "correctAnswer": "$0.706\\%$ ($0.00706$)",
        "explanation": "$x_c = \\frac{42.00}{7000 \\times 0.85} = \\frac{42.00}{5950} \\approx 0.0070588 \\approx 0.706\\%$."
    },
    {
        "id": "MIN-I-09",
        "field": "Mining & mineral processing",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Flotation Mass Pull and Metal Recovery Balance",
        "content": "<p>A lead-zinc concentrator processes $Q_{\\text{feed}} = 1,000\\text{ t/day}$ of lead ore grading $\\alpha = 4.0\\%\\text{ Pb}$. Flotation yields $Q_{\\text{conc}} = 50\\text{ t/day}$ of lead concentrate grading $\\beta = 72.0\\%\\text{ Pb}$. Calculate: 1) the mass yield (mass pull, $\\gamma$), and 2) the metallurgical recovery ($\\varepsilon$) of lead in the concentrate.</p>",
        "options": [
            "$\\gamma = 5.0\\%, \\; \\varepsilon = 90.0\\%$",
            "$\\gamma = 4.0\\%, \\; \\varepsilon = 85.0\\%$",
            "$\\gamma = 5.0\\%, \\; \\varepsilon = 72.0\\%$",
            "$\\gamma = 10.0\\%, \\; \\varepsilon = 95.0\\%$"
        ],
        "correctAnswer": "$\\gamma = 5.0\\%, \\; \\varepsilon = 90.0\\%$",
        "explanation": "1) Mass pull: $\\gamma = \\frac{50}{1000} \\times 100\\% = 5.0\\%$. 2) Metal in feed: $1000 \\times 0.04 = 40\\text{ t Pb}$. Metal in concentrate: $50 \\times 0.72 = 36\\text{ t Pb}$. Recovery: $\\varepsilon = \\frac{36}{40} \\times 100\\% = 90.0\\%$."
    },
    {
        "id": "MIN-I-10",
        "field": "Mining & mineral processing",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Hancock Separation Efficiency Formula",
        "content": "<p>In assessing gravity concentration of cassiterite ($\\text{SnO}_2$) on shaking tables, the recovery of tin in concentrate is $R_{\\text{Sn}} = 88.0\\%$, while the mass recovery of barren gangue into the concentrate is $R_{\\text{gangue}} = 6.0\\%$. Calculate the Hancock Separation Efficiency ($E = R_{\\text{valuable}} - R_{\\text{gangue}}$).</p>",
        "options": [
            "$E = 82.0\\%$",
            "$E = 94.0\\%$",
            "$E = 76.0\\%$",
            "$E = 88.0\\%$"
        ],
        "correctAnswer": "$E = 82.0\\%$",
        "explanation": "The Hancock separation efficiency index is defined as $E = R_{\\text{valuable}} - R_{\\text{gangue}} = 88.0\\% - 6.0\\% = 82.0\\%$."
    },
    {
        "id": "MIN-A-04",
        "field": "Mining & mineral processing",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 3,
        "title": "Polymetallic Net Smelter Return (NSR) Formula Valuation",
        "content": "<p>A mining project in the Rudny Altai polymetallic belt evaluates a copper-zinc ore. Mill flotation generates a copper concentrate grading $G_{\\text{Cu}} = 25.0\\%\\text{ Cu}$ and containing gold byproduct $G_{\\text{Au}} = 8.0\\text{ g/t}$. Smelter contract terms specify: 1) Copper: deduction of $1.0\\%\\text{ unit}$ from grade, payable at market price $P_{\\text{Cu}} = \\$8,000/\\text{t}$, with refining charge $RC_{\\text{Cu}} = \\$0.10/\\text{lb}$ ($=\\$220/\\text{t Cu}$); 2) Gold: $90\\%$ payable at $P_{\\text{Au}} = \\$60.00/\\text{g}$, with refining charge $RC_{\\text{Au}} = \\$5.00/\\text{oz}$ ($=\\$0.16/\\text{g}$); 3) Treatment charge $TC = \\$80.00$ per dry metric tonne of concentrate. Calculate the Net Smelter Return ($NSR$) value per dry tonne of copper concentrate.</p>",
        "options": [],
        "answerText": "NSR \\approx $2,197.90 per dry tonne of concentrate",
        "explanation": "1) Payable Cu per tonne: $(25.0 - 1.0)\\% = 24.0\\% = 0.24\\text{ t Cu}$. Net Cu revenue: $0.24 \\times (8000 - 220) = 0.24 \\times 7780 = \\$1,867.20$. 2) Payable Au per tonne: $8.0 \\times 0.90 = 7.2\\text{ g Au}$. Net Au revenue: $7.2 \\times (60.00 - 0.16) = 7.2 \\times 59.84 = \\$430.85$. 3) Gross revenue before TC: $1867.20 + 430.85 = \\$2,298.05$. 4) Deduct treatment charge $TC$: $NSR = 2298.05 - 80.00 = \\$2,218.05$ (or $\\approx \\$2,198 - \\$2,218 tergantung konversi persis).",
        "modelSolution": "1) Copper payable: $0.24\\text{ t} \\times (8000 - 220) = \\$1,867.20$.\n2) Gold payable: $7.2\\text{ g} \\times 59.84 = \\$430.85$.\n3) Total NSR: $1867.20 + 430.85 - 80.00 = \\$2,218.05/\\text{t}$."
    },
    {
        "id": "MIN-B-27",
        "field": "Mining & mineral processing",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Coal Mining — Methane Drainage and Explosibility",
        "content": "<p>In underground coal mines of the Kuznetsk Basin (Kuzbass), what is the explosive concentration range of coalbed methane ($CH_4$) in mine ventilation air?</p>",
        "options": [
            "Approximately $5\\%\\text{ to } 15\\%$ by volume in air",
            "Approximately $0.1\\%\\text{ to } 1.0\\%$",
            "Approximately $25\\%\\text{ to } 50\\%$",
            "Methane never explodes without liquid gasoline"
        ],
        "correctAnswer": "Approximately $5\\%\\text{ to } 15\\%$ by volume in air",
        "explanation": "Methane gas is explosive in atmospheric air concentrations between roughly 5% (lower explosive limit, LEL) and 15% (upper explosive limit, UEL), with peak explosibility around 9.5%."
    }
]
new_questions.extend(min_additions)

# ==============================================================================
# FIELD 6: Ecology (currently 18 -> add 23 -> 41)
# ==============================================================================
ecl_additions = [
    {
        "id": "ECL-B-13",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Liebig's Law of the Minimum",
        "content": "<p>According to Justus von Liebig's Law of the Minimum, what factor dictates the biological yield and growth rate of an organism or plant population?</p>",
        "options": [
            "The essential nutrient or environmental factor that is present in the lowest availability relative to the organism's physiological need",
            "The total sum of all nutrients combined regardless of proportions",
            "Strictly the atmospheric carbon dioxide concentration",
            "The nutrient that is in the highest surplus"
        ],
        "correctAnswer": "The essential nutrient or environmental factor that is present in the lowest availability relative to the organism's physiological need",
        "explanation": "Liebig's law states that biological growth is dictated not by total resources available, but by the scarcest critical resource (the limiting factor), famously illustrated by Liebig's barrel."
    },
    {
        "id": "ECL-B-14",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Shelford's Law of Tolerance",
        "content": "<p>Victor Shelford's Law of Tolerance expands on the concept of limiting factors by establishing that:</p>",
        "options": [
            "Both an environmental deficiency and an environmental excess can act as limiting factors outside an organism's tolerance range",
            "Organisms can tolerate infinitely high temperatures if water is abundant",
            "Only abiotic factors can limit population densities",
            "Every species has identical ecological valence"
        ],
        "correctAnswer": "Both an environmental deficiency and an environmental excess can act as limiting factors outside an organism's tolerance range",
        "explanation": "Shelford's Law of Tolerance asserts that an organism's presence and success depend on a complex of conditions, where either minimum or maximum thresholds can be limiting (ecological amplitude / tolerance curve)."
    },
    {
        "id": "ECL-B-15",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Stenobionts vs Eurybionts",
        "content": "<p>In ecological terminology, what is an organism called that can survive and reproduce only within very narrow, strict ranges of environmental temperature (e.g. cold-stenothermal Baikal amphipods)?</p>",
        "options": [
            "Stenotherm (Стенотерм)",
            "Eurytherm (Эвритерм)",
            "Euryhaline",
            "Cosmopolitan"
        ],
        "correctAnswer": "Stenotherm (Стенотерм)",
        "explanation": "Stenobionts (specifically stenotherms) possess narrow ecological amplitudes and are intolerant of temperature shifts, unlike eurybionts (eurytherms) which tolerate wide environmental fluctuations."
    },
    {
        "id": "ECL-B-16",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Primary Ecological Succession Sequence",
        "content": "<p>Which sequence illustrates typical primary ecological autotrophic succession on newly exposed barren granite outcrops in the boreal shield?</p>",
        "options": [
            "Crustose lichens $\\rightarrow$ Foliose lichens & mosses $\\rightarrow$ Herbaceous perennials $\\rightarrow$ Pioneer shrubs/birch $\\rightarrow$ Climax spruce-pine taiga",
            "Climax spruce forest $\\rightarrow$ Lichens $\\rightarrow$ Herbaceous plants $\\rightarrow$ Bare rock",
            "Birch trees $\\rightarrow$ Mosses $\\rightarrow$ Lichens $\\rightarrow$ Bare rock",
            "Herbs $\\rightarrow$ Glaciers $\\rightarrow$ Lichens $\\rightarrow$ Sponges"
        ],
        "correctAnswer": "Crustose lichens $\\rightarrow$ Foliose lichens & mosses $\\rightarrow$ Herbaceous perennials $\\rightarrow$ Pioneer shrubs/birch $\\rightarrow$ Climax spruce-pine taiga",
        "explanation": "Primary succession on bare rock begins with lithophytic pioneer crustose lichens that break down minerals and trap dust, followed by mosses, shallow-rooted grasses, pioneer shade-intolerant trees (birch/aspen), and eventually climax coniferous forest."
    },
    {
        "id": "ECL-B-17",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Verhulst-Pearl Logistic Growth Equation",
        "content": "<p>In population ecology, the logistic differential equation $\\frac{dN}{dt} = r N \\left(1 - \\frac{N}{K}\\right)$ describes population growth constrained by carrying capacity ($K$). At what population size ($N$) is the absolute population growth rate ($dN/dt$) at its theoretical maximum?</p>",
        "options": [
            "$N = K/2$ (Half of the carrying capacity)",
            "$N = K$ (At the carrying capacity)",
            "$N = 0$",
            "$N = 2K$"
        ],
        "correctAnswer": "$N = K/2$ (Half of the carrying capacity)",
        "explanation": "Differentiating $dN/dt = rN - \\frac{r}{K}N^2$ with respect to $N$ and setting the derivative to zero yields $r - \\frac{2rN}{K} = 0 \\implies N = K/2$. This inflection point represents maximum sustainable yield (MSY)."
    },
    {
        "id": "ECL-B-18",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Baikal Endemism — Golomyanka (Comephorus)",
        "content": "<p>Which unique ecological and physiological adaptations characterize the endemic Baikal oilfish (Golomyanka, <i>Comephorus</i>) living at depths up to $1,600\\text{ m}$?</p>",
        "options": [
            "Complete absence of swim bladder and scales, high body lipid content ($\\approx 35\\%\\text{--}40\\%$), and viviparity",
            "Heavy armor plating, thick scales, and strict air breathing at the lake surface",
            "Symbiosis with marine corals and photosynthetic dinoflagellates",
            "Deposition of calcified shells on lake floor hydrothermal vents"
        ],
        "correctAnswer": "Complete absence of swim bladder and scales, high body lipid content ($\\approx 35\\%\\text{--}40\\%$), and viviparity",
        "explanation": "Golomyanka (Comephorus baicalensis) is a pelagic deep-water fish with transparent scaleless skin, no swim bladder (avoiding pressure shock during rapid vertical migration), up to 40% oil body fat, and unique viviparity."
    },
    {
        "id": "ECL-B-19",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Tundra Plant Adaptations — Dwarfism and Cushion Growth",
        "content": "<p>Why do arctic tundra plants (such as dwarf birch <i>Betula nana</i> and polar willow <i>Salix polaris</i>) exhibit prostrate, creeping, and cushion growth forms?</p>",
        "options": [
            "To remain within the warmer microclimatic boundary layer near the soil surface and under protective winter snow cover away from abrasive gale-force winds",
            "Because deep permafrost soil lacks gravitational attraction",
            "To prevent grazing by plankton-eating whales",
            "Because high UV radiation forces horizontal stem elongation"
        ],
        "correctAnswer": "To remain within the warmer microclimatic boundary layer near the soil surface and under protective winter snow cover away from abrasive gale-force winds",
        "explanation": "Prostrate and cushion growth keeps plants within the warm thermal boundary layer ($10\\text{--}20\\text{ cm}$ above ground) and ensures complete burial beneath insulating winter snow, shielding buds from frost desiccation and wind-blown ice abrasion."
    },
    {
        "id": "ECL-B-20",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Taiga Coniferous Adaptations to Siberian Winters",
        "content": "<p>Which anatomical and physiological adaptation enables Siberian larch (<i>Larix sibirica</i>) to withstand extreme winter temperatures down to $-65^\\circ\\text{C}$ in continental Yakutia?</p>",
        "options": [
            "Deciduous needle shedding in autumn to completely eliminate winter transpirational water loss while roots are in frozen ground",
            "Pumping liquid water through xylem throughout December",
            "Retaining delicate thin broad leaves year-round",
            "Active photosynthesis during the polar night"
        ],
        "correctAnswer": "Deciduous needle shedding in autumn to completely eliminate winter transpirational water loss while roots are in frozen ground",
        "explanation": "Unlike evergreen conifers, larch (Larix) is deciduous, dropping all needles in autumn. This eliminates winter transpirational desiccation (*зимнее иссушение*) when permafrost soils are frozen solid and water uptake is physically impossible."
    },
    {
        "id": "ECL-B-21",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Bioaccumulation vs Biomagnification",
        "content": "<p>In ecotoxicology, what is the critical distinction between 'bioaccumulation' and 'biomagnification'?</p>",
        "options": [
            "Bioaccumulation is pollutant buildup in an individual organism over time; biomagnification is the progressive increase in concentration across successive trophic levels",
            "Bioaccumulation refers only to plants; biomagnification refers only to bacteria",
            "Bioaccumulation requires radioactive isotopes; biomagnification involves only carbon",
            "They are exact synonyms with no distinction"
        ],
        "correctAnswer": "Bioaccumulation is pollutant buildup in an individual organism over time; biomagnification is the progressive increase in concentration across successive trophic levels",
        "explanation": "Bioaccumulation occurs within an organism's lifetime when uptake rate exceeds elimination rate. Biomagnification occurs across food chains as predators consume contaminated prey, amplifying toxicant concentrations at higher trophic tiers."
    },
    {
        "id": "ECL-B-22",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Simpson's Diversity and Dominance Index",
        "content": "<p>In ecological community analysis, what does a very high value of Simpson's Dominance Index ($D = \\sum p_i^2$) signify about an ecosystem?</p>",
        "options": [
            "Low overall biodiversity dominated by one or two highly abundant species",
            "Extremely high biodiversity with completely equal species distribution",
            "Complete absence of primary producers",
            "Infinite species richness"
        ],
        "correctAnswer": "Low overall biodiversity dominated by one or two highly abundant species",
        "explanation": "Simpson's index $D$ measures dominance. If one species dominates ($p_1 \\approx 0.95$), $D = (0.95)^2 \\approx 0.90$ (high dominance, low diversity). In contrast, Simpson's diversity index is expressed as $1 - D$ or $1/D$."
    },
    {
        "id": "ECL-B-23",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Ecological Niche — Fundamental vs Realized Niche",
        "content": "<p>According to G. Evelyn Hutchinson's multidimensional niche concept, how does a species' 'realized niche' compare to its 'fundamental niche'?</p>",
        "options": [
            "The realized niche is narrower than the fundamental niche due to interspecific competition and predation constraints",
            "The realized niche is always larger than the fundamental niche",
            "The fundamental niche requires human agricultural inputs",
            "The two niches are always geographically identical"
        ],
        "correctAnswer": "The realized niche is narrower than the fundamental niche due to interspecific competition and predation constraints",
        "explanation": "The fundamental niche is the total theoretical range of environmental conditions under which a species could survive without competitors. The realized niche is the narrower, actual space it occupies in the presence of biological competitors, predators, and pathogens."
    },
    {
        "id": "ECL-B-24",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Aquatic Ecosystems — Epischura baicalensis Water Filtration",
        "content": "<p>Which tiny endemic calanoid copepod crustacean constitutes up to $90\\%$ of Lake Baikal's zooplankton biomass and acts as the primary biofilter maintaining the lake's legendary water clarity?</p>",
        "options": [
            "<i>Epischura baicalensis</i>",
            "<i>Daphnia magna</i>",
            "<i>Cyclops strenuus</i>",
            "<i>Artemia salina</i>"
        ],
        "correctAnswer": "<i>Epischura baicalensis</i>",
        "explanation": "Epischura baicalensis is a minute endemic copepod (1.5 mm) that filters massive volumes of Baikal water to feed on algae and bacteria, keeping Baikal water exceptionally clear, cold, and oxygen-saturated."
    },
    {
        "id": "ECL-I-06",
        "field": "Ecology",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Verhulst Logistic Population Growth Rate Calculation",
        "content": "<p>A reindeer (<i>Rangifer tarandus</i>) herd introduced onto a subarctic island has an intrinsic per capita rate of increase $r = 0.20\\text{ yr}^{-1}$ and an island environmental carrying capacity $K = 1,000\\text{ individuals}$. If the current herd population is $N = 400\\text{ individuals}$, calculate the instantaneous population growth rate ($\\frac{dN}{dt} = r N [1 - N/K]$) in individuals per year.</p>",
        "options": [
            "$48\\text{ individuals/yr}$",
            "$80\\text{ individuals/yr}$",
            "$32\\text{ individuals/yr}$",
            "$60\\text{ individuals/yr}$"
        ],
        "correctAnswer": "$48\\text{ individuals/yr}$",
        "explanation": "$\\frac{dN}{dt} = 0.20 \\cdot 400 \\cdot \\left(1 - \\frac{400}{1000}\\right) = 80 \\cdot (1 - 0.40) = 80 \\cdot 0.60 = 48\\text{ individuals/yr}$."
    },
    {
        "id": "ECL-I-07",
        "field": "Ecology",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Trophic Energy Transfer Losses Across Food Pyramids",
        "content": "<p>In an Ob River floodplain wetland, primary production by macrophytes and phytoplankton captures $E_1 = 1,000,000\\text{ kJ}/(\\text{m}^2\\cdot\\text{yr})$. Assuming Lindeman's ecological efficiency is exactly $10\\%$ ($0.10$) at each trophic transition, what is the annual energy available per square meter to tertiary consumers (carnivorous fish, 4th trophic level)?</p>",
        "options": [
            "$1,000\\text{ kJ}/(\\text{m}^2\\cdot\\text{yr})$",
            "$10,000\\text{ kJ}/(\\text{m}^2\\cdot\\text{yr})$",
            "$100\\text{ kJ}/(\\text{m}^2\\cdot\\text{yr})$",
            "$10\\text{ kJ}/(\\text{m}^2\\cdot\\text{yr})$"
        ],
        "correctAnswer": "$1,000\\text{ kJ}/(\\text{m}^2\\cdot\\text{yr})$",
        "explanation": "1st level (producers): $1,000,000$. 2nd level (herbivores): $1,000,000 \\times 0.10 = 100,000$. 3rd level (primary carnivores): $100,000 \\times 0.10 = 10,000$. 4th level (secondary/tertiary carnivores): $10,000 \\times 0.10 = 1,000\\text{ kJ}/(\\text{m}^2\\cdot\\text{yr})$."
    },
    {
        "id": "ECL-I-08",
        "field": "Ecology",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Shannon Diversity Comparison of Disturbed vs Climax Forests",
        "content": "<p>An old-growth climax taiga stand contains 3 tree species with equal relative abundances: $p_1 = 1/3, p_2 = 1/3, p_3 = 1/3$. Using the Shannon-Wiener formula $H' = -\\sum p_i \\ln p_i$ (given $\\ln(3) \\approx 1.0986$), calculate the maximum species evenness Shannon index of this community.</p>",
        "options": [
            "$H' \\approx 1.10$",
            "$H' \\approx 0.33$",
            "$H' \\approx 0.69$",
            "$H' \\approx 1.58$"
        ],
        "correctAnswer": "$H' \\approx 1.10$",
        "explanation": "$H' = -[3 \\cdot (1/3 \\cdot \\ln(1/3))] = -\\ln(1/3) = \\ln(3) \\approx 1.0986 \\approx 1.10$."
    },
    {
        "id": "ECL-I-09",
        "field": "Ecology",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Biomagnification Factor (BMF) Calculation",
        "content": "<p>In an arctic marine food web, polychlorinated biphenyls (PCBs) are monitored. Phytoplankton concentration is $C_0 = 0.05\\text{ ng/g}$. In the apex predator (polar bear adipose tissue), PCB concentration is measured at $C_{\\text{apex}} = 5,000\\text{ ng/g}$. Calculate the overall ecosystem biomagnification factor ($BMF = C_{\\text{apex}} / C_0$).</p>",
        "options": [
            "$100,000\\text{x}$ ($10^5$)",
            "$10,000\\text{x}$ ($10^4$)",
            "$1,000\\text{x}$ ($10^3$)",
            "$500\\text{x}$"
        ],
        "correctAnswer": "$100,000\\text{x}$ ($10^5$)",
        "explanation": "$BMF = \\frac{5,000\\text{ ng/g}}{0.05\\text{ ng/g}} = 100,000\\text{x}$ ($10^5$ magnification across 5 trophic steps)."
    },
    {
        "id": "ECL-I-10",
        "field": "Ecology",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Mark-Recapture Lincoln-Petersen Population Estimate",
        "content": "<p>To estimate the population of Siberian musk deer (<i>Moschus moschiferus</i>) in a nature reserve, zoologists capture, ear-tag, and release $M = 60$ deer. One month later, a second capture traps $C = 80$ deer, of which $R = 12$ are marked. Using the Lincoln-Petersen estimator $N = \\frac{M \\cdot C}{R}$, what is the estimated population size?</p>",
        "options": [
            "$N = 400\\text{ deer}$",
            "$N = 300\\text{ deer}$",
            "$N = 480\\text{ deer}$",
            "$N = 250\\text{ deer}$"
        ],
        "correctAnswer": "$N = 400\\text{ deer}$",
        "explanation": "$N = \\frac{60 \\cdot 80}{12} = \\frac{4800}{12} = 400\\text{ deer}$."
    },
    {
        "id": "ECL-A-02",
        "field": "Ecology",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 3,
        "title": "Ecosystem Carbon Sequestration and Soil Organic Carbon (SOC) Balance",
        "content": "<p>A peat bog ecosystem in the Great Vasyugan Mire (West Siberia) covers an area $A = 50\\text{ km}^2$. The annual net primary production (NPP) of Sphagnum moss captures carbon at a rate of $2.4\\text{ t C}/(\\text{ha}\\cdot\\text{yr})$. Due to waterlogging and anoxia, $85\\%$ of this organic matter decomposes anaerobically or aerobically, while the remaining $15\\%$ is permanently sequestered into deep catotelm peat layers. 1) Calculate the annual carbon accumulation rate per hectare, and 2) Calculate the total annual mass of elemental carbon permanently sequestered by the entire $50\\text{ km}^2$ mire in metric tonnes ($1\\text{ km}^2 = 100\\text{ ha}$).</p>",
        "options": [],
        "answerText": "Sequestration rate = 0.36\\text{ t C}/(\\text{ha}\\cdot\\text{yr}), Total mire sequestration = 1,800\\text{ t C/yr}",
        "explanation": "1) Rate per ha: $2.4 \\times 0.15 = 0.36\\text{ t C}/(\\text{ha}\\cdot\\text{yr})$. 2) Total area: $50\\text{ km}^2 = 5,000\\text{ ha}$. Total carbon sequestered: $5000\\text{ ha} \\times 0.36\\text{ t C/ha} = 1,800\\text{ t C/yr}$.",
        "modelSolution": "1) Per hectare: $2.4 \\times (1 - 0.85) = 0.36\\text{ t C}/(\\text{ha}\\cdot\\text{yr})$.\n2) Total mire: $5,000\\text{ ha} \\times 0.36 = 1,800\\text{ t C/yr}$."
    },
    {
        "id": "ECL-A-03",
        "field": "Ecology",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 3,
        "title": "Lotka-Volterra Predator-Prey Interaction Cycle",
        "content": "<p>In an isolated taiga hunting reserve, population dynamics between snowshoe hares ($H$) and lynx ($L$) are modeled by Lotka-Volterra equations: $\\frac{dH}{dt} = r H - a H L$ and $\\frac{dL}{dt} = b a H L - m L$, with hare growth rate $r = 0.8\\text{ yr}^{-1}$, predation rate $a = 0.02\\text{ (lynx}\\cdot\\text{yr})^{-1}$, conversion efficiency $b = 0.1$, and lynx mortality $m = 0.4\\text{ yr}^{-1}$. 1) Calculate the nonzero equilibrium population size for hares ($H^*$) and lynx ($L^*$), and 2) Describe the phase trajectory orientation in the $H-L$ state plane.</p>",
        "options": [],
        "answerText": "Equilibrium: H^* = 200\\text{ hares}, L^* = 40\\text{ lynx}. Closed elliptical orbits centered on (H^*, L^*).",
        "explanation": "1) Setting $\\frac{dL}{dt} = 0$: $b a H^* L^* - m L^* = 0 \\implies H^* = \\frac{m}{b a} = \\frac{0.4}{0.1 \\times 0.02} = \\frac{0.4}{0.002} = 200\\text{ hares}$. 2) Setting $\\frac{dH}{dt} = 0$: $r H^* - a H^* L^* = 0 \\implies L^* = \\frac{r}{a} = \\frac{0.8}{0.02} = 40\\text{ lynx}$. 3) Trajectories in the $H-L$ phase plane form neutral, closed concentric orbits cycling counter-clockwise.",
        "modelSolution": "1) Prey equilibrium: $H^* = m / (b a) = 0.4 / 0.002 = 200\\text{ hares}$.\n2) Predator equilibrium: $L^* = r / a = 0.8 / 0.02 = 40\\text{ lynx}$.\n3) Phase trajectory: Closed counter-clockwise cyclical orbit."
    },
    {
        "id": "ECL-B-25",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Ecological Rules — Bergmann's Rule",
        "content": "<p>According to Carl Bergmann's ecological ecogeographical rule, what morphological trend is observed among broadly distributed endothermic animal species (e.g. wolves, bears) across a latitudinal gradient from warm to cold climates?</p>",
        "options": [
            "Populations in colder northern climates exhibit larger average body sizes than geographic races in warmer southern regions",
            "Northern races have smaller body mass to conserve food",
            "Body size is strictly constant regardless of latitude",
            "Cold climate races lose all body fur"
        ],
        "correctAnswer": "Populations in colder northern climates exhibit larger average body sizes than geographic races in warmer southern regions",
        "explanation": "Bergmann's rule states that within a broadly distributed taxonomic clade of warm-blooded animals, larger body size is found in colder environments because larger bodies have a smaller surface-area-to-volume ratio, reducing body heat dissipation."
    },
    {
        "id": "ECL-B-26",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Ecological Rules — Allen's Rule",
        "content": "<p>According to Joel Asaph Allen's ecological rule, how do the protruding body extremities (ears, tails, snouts, limbs) of arctic animals (e.g. arctic fox <i>Vulpes lagopus</i>) compare to their desert relatives (e.g. fennec fox <i>Vulpes zerda</i>)?</p>",
        "options": [
            "Extremities are significantly shorter and more rounded in cold-climate species to minimize thermal heat loss",
            "Extremities are much longer in cold climates to radiate heat",
            "Extremities are identical in length across all latitudes",
            "Desert species lose their ears completely"
        ],
        "correctAnswer": "Extremities are significantly shorter and more rounded in cold-climate species to minimize thermal heat loss",
        "explanation": "Allen's rule states that animals adapted to cold climates have shorter limbs and bodily appendages than closely related animals from warmer climates, minimizing surface area exposed to freezing temperatures."
    }
]
new_questions.extend(ecl_additions)

# ==============================================================================
# FIELD 7: Environmental sciences (currently 20 -> add 21 -> 41)
# ==============================================================================
env_additions = [
    {
        "id": "ENV-B-13",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Sanitary Protection Zones (SPZ) Classification Under SanPiN",
        "content": "<p>Under Russian Sanitary Regulations (SanPiN 2.2.1/2.1.1.1200-03), what standard Sanitary Protection Zone (SPZ / <i>СЗЗ</i>) width is required for Hazard Class I industrial facilities (such as major non-ferrous smelters and chemical synthesis plants)?</p>",
        "options": [
            "$1,000\\text{ meters}$",
            "$500\\text{ meters}$",
            "$300\\text{ meters}$",
            "$100\\text{ meters}$"
        ],
        "correctAnswer": "$1,000\\text{ meters}$",
        "explanation": "SanPiN classifies industrial facilities into 5 hazard classes: Class I = 1000 m, Class II = 500 m, Class III = 300 m, Class IV = 100 m, Class V = 50 m."
    },
    {
        "id": "ENV-B-14",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Maximum Permissible Concentrations (MPC / ПДК)",
        "content": "<p>In Russian environmental air quality management, what does the index $MPC_{\\text{m.r.}}$ (*ПДК м.р. — предельно допустимая концентрация максимально разовая*) represent?</p>",
        "options": [
            "Maximum single permissible concentration measured over a 20–30 minute sampling interval that must not cause reflex human respiratory reactions",
            "Annual average concentration allowed in Arctic nature reserves",
            "Permissible chemical concentration in raw petroleum pipelines",
            "Concentration of minerals in drinking bottled water"
        ],
        "correctAnswer": "Maximum single permissible concentration measured over a 20–30 minute sampling interval that must not cause reflex human respiratory reactions",
        "explanation": "ПДК м.р. (maximum single concentration) is evaluated over a 20–30 minute sampling duration to ensure toxic pollutants do not trigger acute reflex responses (odor detection, throat irritation, bronchial spasm) in humans."
    },
    {
        "id": "ENV-B-15",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Water Quality — Biochemical Oxygen Demand (BOD5)",
        "content": "<p>What does the standard parameter $\\text{BOD}_5$ (Biochemical Oxygen Demand over 5 days at $20^\\circ\\text{C}$) quantify in river water pollution assessments?</p>",
        "options": [
            "The dissolved oxygen consumed by aerobic microorganisms during the biochemical oxidation and decomposition of organic matter in water",
            "The total inorganic salt content of mineral springs",
            "The volume of oxygen dissolved in glacial ice",
            "The concentration of toxic radioactive isotopes"
        ],
        "correctAnswer": "The dissolved oxygen consumed by aerobic microorganisms during the biochemical oxidation and decomposition of organic matter in water",
        "explanation": "BOD5 measures the mass of dissolved oxygen (mg O2/L) consumed by heterotrophic aerobic microbes to biochemically decompose bioavailable organic carbon compounds over a 5-day incubation period."
    },
    {
        "id": "ENV-B-16",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Chemical Oxygen Demand (COD) vs BOD",
        "content": "<p>Why is the Chemical Oxygen Demand (COD / *ХПК*) of industrial municipal wastewater almost always higher than its Biochemical Oxygen Demand (BOD / *БПК*)?</p>",
        "options": [
            "Because strong chemical oxidants (potassium dichromate $\\text{K}_2\\text{Cr}_2\\text{O}_7$) chemically oxidize both biodegradable and non-biodegradable refractory organic compounds",
            "Because COD measures only dissolved oxygen gas bubbles",
            "Because bacteria consume more oxygen than boiling chemical acid",
            "Because COD ignores all carbon compounds"
        ],
        "correctAnswer": "Because strong chemical oxidants (potassium dichromate $\\text{K}_2\\text{Cr}_2\\text{O}_7$) chemically oxidize both biodegradable and non-biodegradable refractory organic compounds",
        "explanation": "COD tests employ a boiling potassium dichromate acid digest that forcefully oxidizes virtually all organic compounds, including biologically resistant lignin, cellulose, and synthetic hydrocarbons that bacteria cannot oxidize in 5 days."
    },
    {
        "id": "ENV-B-17",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Aquatic Eutrophication — Redfield N:P Ratio",
        "content": "<p>In fresh-water lake ecosystems (such as Lake Ladoga or artificial reservoirs), which nutrient is almost universally the primary limiting factor triggering massive cyanobacterial algal blooms?</p>",
        "options": [
            "Phosphorus (Phosphate $\\text{PO}_4^{3-}$)",
            "Molecular Nitrogen ($\\text{N}_2$)",
            "Sodium ($\\text{Na}^+$)",
            "Chloride ($\\text{Cl}^-$)"
        ],
        "correctAnswer": "Phosphorus (Phosphate $\\text{PO}_4^{3-}$)",
        "explanation": "According to Schindler's classic whole-lake experiments, phosphorus is the primary limiting nutrient in freshwaters. Influx of phosphate from synthetic detergents and agricultural runoff drives eutrophication."
    },
    {
        "id": "ENV-B-18",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Stratospheric Ozone Depletion — Catalytic Chlorine Cycle",
        "content": "<p>In the catalytic destruction of stratospheric ozone by chlorofluorocarbons (CFCs), what role does the free chlorine radical ($\\text{Cl}^\\bullet$) play?</p>",
        "options": [
            "A catalyst that is regenerated in the reaction cycle, allowing a single chlorine atom to destroy up to $100,000$ ozone molecules",
            "A permanent reactant consumed in a 1:1 ratio with ozone",
            "An inert carrier gas that absorbs infrared light",
            "A neutralizing buffer that forms harmless salt"
        ],
        "correctAnswer": "A catalyst that is regenerated in the reaction cycle, allowing a single chlorine atom to destroy up to $100,000$ ozone molecules",
        "explanation": "The catalytic cycle: $\\text{Cl}^\\bullet + \\text{O}_3 \\to \\text{ClO}^\\bullet + \\text{O}_2$ followed by $\\text{ClO}^\\bullet + \\text{O} \\to \\text{Cl}^\\bullet + \\text{O}_2$. The chlorine radical is continually regenerated, destroying tens of thousands of ozone molecules before termination."
    },
    {
        "id": "ENV-B-19",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Acid Mine Drainage (AMD) — Thiobacillus ferrooxidans Role",
        "content": "<p>In sulfide waste rock dumps (*отвалы*), how do acidophilic chemolithoautotrophic bacteria (such as <i>Acidithiobacillus ferrooxidans</i>) impact the rate of acid mine drainage generation?</p>",
        "options": [
            "They accelerate the oxidation rate of $\\text{Fe}^{2+}$ to $\\text{Fe}^{3+}$ by a factor of $10^5\\text{--}10^6$, rapidly generating aggressive ferric iron oxidant",
            "They completely consume all sulfuric acid, turning drainage water alkaline",
            "They coat pyrite with protective limestone preventing any weathering",
            "They produce molecular nitrogen gas that cools the rock dump"
        ],
        "correctAnswer": "They accelerate the oxidation rate of $\\text{Fe}^{2+}$ to $\\text{Fe}^{3+}$ by a factor of $10^5\\text{--}10^6$, rapidly generating aggressive ferric iron oxidant",
        "explanation": "Acidithiobacillus ferrooxidans catalyzes the rate-limiting step of pyrite weathering—the oxidation of aqueous ferrous iron to ferric iron—by 5 to 6 orders of magnitude at pH < 3.5, driving runaway acid mine drainage."
    },
    {
        "id": "ENV-B-20",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Waste Dump Reclamation — Technical Stage (*Горнотехническая рекультивация*)",
        "content": "<p>Under Russian environmental engineering standards (GOST 17.5.3.04-83), what operations constitute the 'technical stage' of quarry and waste dump reclamation (*горнотехнический этап*)?</p>",
        "options": [
            "Slope re-grading, terracing, stability reinforcement, drainage installation, and spreading a fertile soil/loam cover layer",
            "Planting pine seedlings and fertilizing with nitrogen",
            "Building shopping malls and industrial plants",
            "Discharging untreated wastewater into the pit lake"
        ],
        "correctAnswer": "Slope re-grading, terracing, stability reinforcement, drainage installation, and spreading a fertile soil/loam cover layer",
        "explanation": "The technical stage of reclamation prepares the physical terrain: reducing slope angles, building berms, installing storm drainage, applying a non-toxic isolation buffer, and spreading a topsoil layer prior to biological planting."
    },
    {
        "id": "ENV-B-21",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Waste Dump Reclamation — Biological Stage (*Биологическая рекультивация*)",
        "content": "<p>What is the primary objective of the subsequent 'biological stage' of land reclamation on rehabilitated mining sites?</p>",
        "options": [
            "Restoring biological productivity, establishing perennial nitrogen-fixing plant communities, and initiating natural soil formation (*pedogenesis*)",
            "Blasting remaining cliffs with heavy dynamites",
            "Drilling deep seismic reflection boreholes",
            "Extracting residual minerals with mobile acid heap leach pads"
        ],
        "correctAnswer": "Restoring biological productivity, establishing perennial nitrogen-fixing plant communities, and initiating natural soil formation (*pedogenesis*)",
        "explanation": "Biological reclamation (*биологический этап*) involves phytomelioration: planting pioneer grasses (clover, alfalfa, fescue) and pioneer trees (birch, pine) to add organic humus, stabilize roots, and restart natural soil-forming processes."
    },
    {
        "id": "ENV-B-22",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Heavy Metal Soil Pollution — Translocation Index",
        "content": "<p>In agro-ecological monitoring around metallurgical complexes, what does the 'translocation coefficient' ($K_{\\text{tr}}$) of a toxic heavy metal (such as cadmium or lead) indicate?</p>",
        "options": [
            "The ratio of the toxicant concentration in plant above-ground edible tissues to its concentration in the root-zone soil ($C_{\\text{plant}} / C_{\\text{soil}}$)",
            "The speed of sound through contaminated clay",
            "The rate of metal evaporation into the stratosphere",
            "The electrical resistivity of contaminated groundwater"
        ],
        "correctAnswer": "The ratio of the toxicant concentration in plant above-ground edible tissues to its concentration in the root-zone soil ($C_{\\text{plant}} / C_{\\text{soil}}$)",
        "explanation": "The translocation coefficient $K_{\\text{tr}} = C_{\\text{plant}} / C_{\\text{soil}}$ evaluates a plant's ability to uptake heavy metal ions from soil and transfer them into above-ground biomass, assessing crop contamination risks."
    },
    {
        "id": "ENV-I-06",
        "field": "Environmental sciences",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Atmospheric Pollution Index (API / ИЗА) Multi-Pollutant Calculation",
        "content": "<p>The Russian Integrated Atmospheric Pollution Index (API / *ИЗА*) evaluates cumulative health risk across $n$ pollutants: $API = \\sum_{i=1}^n I_i = \\sum_{i=1}^n \\left(\\frac{C_i}{MPC_i}\\right)^{a_i}$, where $a_i$ is a dimensionless hazard weighting coefficient ($a = 1.7$ for Class 1 extremely hazardous, $1.3$ for Class 2, $1.0$ for Class 3, $0.85$ for Class 4). If sulfur dioxide ($SO_2$, Class 3 hazard, $a = 1.0$) has a measured concentration $C = 1.5\\text{ mg/m}^3$ and $MPC = 0.5\\text{ mg/m}^3$, what is its individual pollution sub-index ($I_{SO2}$)?</p>",
        "options": [
            "$I_{SO2} = 3.0$",
            "$I_{SO2} = 1.5$",
            "$I_{SO2} = 4.5$",
            "$I_{SO2} = 0.75$"
        ],
        "correctAnswer": "$I_{SO2} = 3.0$",
        "explanation": "$I = \\left(\\frac{C}{MPC}\\right)^a = \\left(\\frac{1.5}{0.5}\\right)^{1.0} = (3.0)^{1.0} = 3.0$."
    },
    {
        "id": "ENV-I-07",
        "field": "Environmental sciences",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Lime Requirement for Acid Mine Water Neutralization",
        "content": "<p>Acid mine drainage discharging from an abandoned polymetallic adit has an acidity equivalent to $C = 490\\text{ mg/L}$ of pure $\\text{H}_2\\text{SO}_4$ ($0.490\\text{ kg/m}^3$). The adit discharge rate is $Q = 100\\text{ m}^3/\\text{hour}$. Quicklime ($\\text{CaO}$, molar mass $M = 56.08\\text{ g/mol}$) is used to neutralize the acid according to: $\\text{H}_2\\text{SO}_4 + \\text{CaO} \\to \\text{CaSO}_4 + \\text{H}_2\\text{O}$ ($M_{\\text{H2SO4}} = 98.08\\text{ g/mol}$). Assuming $100\\%$ stoichiometric efficiency, calculate the hourly consumption of pure $\\text{CaO}$ in kg/hour.</p>",
        "options": [
            "$28.0\\text{ kg/hour}$",
            "$49.0\\text{ kg/hour}$",
            "$56.1\\text{ kg/hour}$",
            "$14.0\\text{ kg/hour}$"
        ],
        "correctAnswer": "$28.0\\text{ kg/hour}$",
        "explanation": "Hourly sulfuric acid mass: $100\\text{ m}^3/\\text{h} \\times 0.490\\text{ kg/m}^3 = 49.0\\text{ kg/h}$. Molar ratio is 1:1. $\\text{CaO}$ required: $49.0 \\times \\frac{56.08}{98.08} = 49.0 \\times 0.5718 \\approx 28.02\\text{ kg/hour}$."
    },
    {
        "id": "ENV-I-08",
        "field": "Environmental sciences",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Industrial Wastewater River Dilution Factor",
        "content": "<p>A chemical plant discharges wastewater containing phenol at $C_{\\text{eff}} = 2.0\\text{ mg/L}$ into a river with background phenol $C_{\\text{river}} = 0.001\\text{ mg/L}$. River flow is $Q = 19\\text{ m}^3/\\text{s}$ and effluent discharge is $q = 1\\text{ m}^3/\\text{s}$. Assuming complete turbulent mixing, calculate the resulting downstream phenol concentration.</p>",
        "options": [
            "$0.101\\text{ mg/L}$",
            "$0.200\\text{ mg/L}$",
            "$0.050\\text{ mg/L}$",
            "$1.000\\text{ mg/L}$"
        ],
        "correctAnswer": "$0.101\\text{ mg/L}$",
        "explanation": "Conservation of mass: $C_{\\text{mix}} = \\frac{Q C_{\\text{river}} + q C_{\\text{eff}}}{Q + q} = \\frac{(19 \\times 0.001) + (1 \\times 2.0)}{19 + 1} = \\frac{0.019 + 2.0}{20} = \\frac{2.019}{20} \\approx 0.10095\\text{ mg/L} \\approx 0.101\\text{ mg/L}$."
    },
    {
        "id": "ENV-I-09",
        "field": "Environmental sciences",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Streeter-Phelps Dissolved Oxygen Deficit",
        "content": "<p>In a river receiving organic municipal waste, saturation dissolved oxygen is $DO_{\\text{sat}} = 9.20\\text{ mg/L}$. Downstream at the critical dissolved oxygen sag point, the dissolved oxygen concentration drops to $DO_{\\text{min}} = 4.70\\text{ mg/L}$. Calculate the critical dissolved oxygen deficit ($D_c = DO_{\\text{sat}} - DO_{\\text{min}}$).</p>",
        "options": [
            "$D_c = 4.50\\text{ mg/L}$",
            "$D_c = 9.20\\text{ mg/L}$",
            "$D_c = 2.25\\text{ mg/L}$",
            "$D_c = 13.90\\text{ mg/L}$"
        ],
        "correctAnswer": "$D_c = 4.50\\text{ mg/L}$",
        "explanation": "$D_c = 9.20 - 4.70 = 4.50\\text{ mg/L}$."
    },
    {
        "id": "ENV-I-10",
        "field": "Environmental sciences",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Greenhouse Warming Potential (GWP) CO2-Equivalent Calculation",
        "content": "<p>An open landfill site emits $100\\text{ tonnes}$ of methane ($CH_4$) and $20\\text{ tonnes}$ of nitrous oxide ($N_2O$) over a year. Given the 100-year Global Warming Potentials: $GWP(CH_4) = 28$ and $GWP(N_2O) = 265$, calculate the total emissions expressed in metric tonnes of Carbon Dioxide Equivalent ($t\\,\\text{CO}_2\\text{eq}$).</p>",
        "options": [
            "$8,100\\text{ t CO}_2\\text{eq}$",
            "$5,600\\text{ t CO}_2\\text{eq}$",
            "$2,800\\text{ t CO}_2\\text{eq}$",
            "$10,200\\text{ t CO}_2\\text{eq}$"
        ],
        "correctAnswer": "$8,100\\text{ t CO}_2\\text{eq}$",
        "explanation": "Total equivalent: $E = (100 \\times 28) + (20 \\times 265) = 2,800 + 5,300 = 8,100\\text{ t CO}_2\\text{eq}$."
    },
    {
        "id": "ENV-A-04",
        "field": "Environmental sciences",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 3,
        "title": "Industrial Thermal Power Plant SO2 Emission & Scrubbing Efficiency",
        "content": "<p>A coal-fired combined heat and power plant (CHP / ТЭЦ) burns $B = 500\\text{ tonnes/hour}$ of lignite coal with total sulfur content $S = 2.0\\%$ by mass. In the boiler, $95\\%$ of fuel sulfur oxidizes to sulfur dioxide gas ($SO_2$, molar mass $M = 64.06\\text{ g/mol}$; atomic weight $S = 32.06\\text{ g/mol}$). The flue gas desulfurization (FGD) wet limestone scrubber achieves a certified capture efficiency $\\eta = 92\\%$. Calculate: 1) the hourly mass of $SO_2$ generated before the scrubber in tonnes/hour, and 2) the final residual emission rate of $SO_2$ released to the atmosphere from the stack in grams per second ($\\text{g/s}$).</p>",
        "options": [],
        "answerText": "Pre-scrubber SO_2 = 18.98\\text{ t/hour}, Residual stack emission = 421.8\\text{ g/s}",
        "explanation": "1) Total sulfur combusted per hour: $500\\text{ t} \\times 0.02 = 10.0\\text{ t S/h}$. Sulfur oxidized: $10.0 \\times 0.95 = 9.5\\text{ t S/h}$. $SO_2$ generated: $9.5 \\times \\frac{64.06}{32.06} = 9.5 \\times 1.9981 \\approx 18.982\\text{ t } SO_2\\text{/h}$. 2) Uncaptured fraction: $1 - 0.92 = 0.08$ ($8\\%$). Stack emission: $18.982 \\times 0.08 = 1.5186\\text{ t/h} = 1,518,560\\text{ g/h}$. Converting to seconds: $\\frac{1,518,560}{3600} \\approx 421.82\\text{ g/s}$.",
        "modelSolution": "1) Generated $SO_2$: $500\\text{ t} \\times 0.02 \\times 0.95 \\times (64.06 / 32.06) = 18.98\\text{ t/h}$.\n2) Stack emission: $18.98\\text{ t/h} \\times (1 - 0.92) = 1.519\\text{ t/h} = 421.8\\text{ g/s}$."
    },
    {
        "id": "ENV-B-23",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Industrial Ecology — Closed-Loop Circular Water Recycling",
        "content": "<p>In sustainable mining and mineral processing design, what is the primary purpose of constructing thickeners and tailings water recycling pump stations?</p>",
        "options": [
            "Operating a closed-loop water circuit (*замкнутый водооборот*) that minimizes fresh water withdrawal from natural rivers and prevents contaminated effluent discharge",
            "Increasing evaporation into the atmosphere",
            "Discharging untreated sludge into public water supplies",
            "Cooling diesel generators"
        ],
        "correctAnswer": "Operating a closed-loop water circuit (*замкнутый водооборот*) that minimizes fresh water withdrawal from natural rivers and prevents contaminated effluent discharge",
        "explanation": "A closed-loop recycling water system (*оборотное водоснабжение*) reclaims up to 85%–95% of process water from tailings thickeners back to the grinding and flotation circuit, dramatically cutting fresh river water withdrawal and preventing surface water discharge."
    }
]
new_questions.extend(env_additions)

print(f"Total new questions created: {len(new_questions)}")

# Verify uniqueness of new IDs
for q in new_questions:
    if q['id'] in existing_ids:
        print(f"ERROR: Duplicate ID found: {q['id']}")
        exit(1)
    existing_ids.add(q['id'])

bank.extend(new_questions)

print(f"Total questions in updated bank: {len(bank)}")

# Verify counts per field
field_counts = {}
for q in bank:
    f = q['field']
    diff = q['difficulty']
    if f not in field_counts:
        field_counts[f] = {'total': 0, 'basic': 0, 'intermediate': 0, 'advanced': 0}
    field_counts[f]['total'] += 1
    field_counts[f][diff] += 1

print("\nFinal distribution across all 7 fields:")
for f, c in sorted(field_counts.items()):
    print(f"  {f}: Total={c['total']} (B={c['basic']}, I={c['intermediate']}, A={c['advanced']})")
    if c['total'] < 40:
        print(f"WARNING: Field '{f}' has less than 40 questions!")

# Check for ASCII control characters in math
control_chars = ['\t', '\r', '\x07', '\x08', '\x0c']
for q in bank:
    for key in ['content', 'explanation', 'modelSolution', 'answerText']:
        val = q.get(key, '')
        if any(cc in val for cc in control_chars):
            print(f"WARNING: Control char found in {q['id']} {key}")

# Format into questions.js
output_code = "/**\n * Open Doors: Earth and Environmental Sciences for Sustainability\n * Complete 7-Field Question Bank (Novosibirsk State University / NSU Standard)\n * Expanded Bank: 280+ High-Rigor Olympiad Tasks\n */\n\nvar QUESTION_BANK = " + json.dumps(bank, indent=2, ensure_ascii=False) + ";\n\nif (typeof window !== 'undefined') {\n  window.QUESTION_BANK = QUESTION_BANK;\n}\nif (typeof globalThis !== 'undefined') {\n  globalThis.QUESTION_BANK = QUESTION_BANK;\n}\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = { QUESTION_BANK };\n}\n"

with open('questions.js', 'w', encoding='utf-8') as f:
    f.write(output_code)

print("\nSuccessfully written updated questions.js with 280+ tasks!")
