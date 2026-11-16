# -*- coding: utf-8 -*-
"""
Full generator for questions.js containing 90 rigorous Olympiad tasks.
"""

import json

questions = []

def add_q(q):
    questions.append(q)

# ==============================================================================
# FIELD 1: Geography, physical (15 tasks)
# ==============================================================================

add_q({
    "id": "GEO-B-01",
    "field": "Geography, physical",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Earth's Orbital Geometry and Eccentricity",
    "content": "Which geometric shape most accurately describes the Earth's orbital path around the Sun according to Kepler's First Law?",
    "options": [
        "A true circular orbit with uniform radial distance",
        "An ellipse with low orbital eccentricity ($e \\approx 0.0167$) and the Sun at one focus",
        "An oblate spheroid rotated along the ecliptic plane",
        "A parabolic escape trajectory perturbed by Jupiter's gravitational field"
    ],
    "correctAnswer": "An ellipse with low orbital eccentricity ($e \\approx 0.0167$) and the Sun at one focus",
    "explanation": "According to Kepler's First Law of Planetary Motion, planets revolve around the Sun in elliptical orbits, with the Sun situated at one of the two focal points. Earth's orbit is an ellipse with an eccentricity of approximately 0.0167."
})

add_q({
    "id": "GEO-B-02",
    "field": "Geography, physical",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Major Fluvial Systems by Catchment Discharge",
    "content": "Which river system possesses the world's largest drainage basin area and the greatest average volumetric discharge into the ocean ($> 200,000\\text{ m}^3\\text{/s}$)?",
    "options": [
        "Nile River",
        "Amazon River",
        "Congo (Zaire) River",
        "Mississippi River",
        "Yangtze (Chang Jiang) River"
    ],
    "correctAnswer": "Amazon River",
    "explanation": "The Amazon River has the largest drainage basin in the world (~7.0 million km²) and by far the greatest average volumetric water discharge (~209,000 m³/s), accounting for roughly 20% of global river flow into the ocean."
})

add_q({
    "id": "GEO-B-03",
    "field": "Geography, physical",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Historical Geodesy and Global Navigation",
    "content": "Who was the navigator and captain of the *Victoria*, the remaining vessel of Magellan's expedition that completed the first documented circumnavigation of the globe in 1522?",
    "options": [
        "Ferdinand Magellan",
        "Juan Sebastián Elcano",
        "Vasco da Gama",
        "Francis Drake"
    ],
    "correctAnswer": "Juan Sebastián Elcano",
    "explanation": "While the expedition was initiated by Ferdinand Magellan (who died at Mactan in 1521), Juan Sebastián Elcano took command of the ship Victoria and completed the first continuous global circumnavigation returning to Spain in September 1522."
})

add_q({
    "id": "GEO-B-04",
    "field": "Geography, physical",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Internal Geosphere Density & Discontinuities",
    "content": "The boundary marking the sharp seismic velocity discontinuity between the Earth's silicate crust and ultramafic upper mantle is designated as the:",
    "options": [
        "Gutenberg Discontinuity",
        "Mohorovičić Discontinuity (Moho)",
        "Lehmann Discontinuity",
        "Conrad Discontinuity"
    ],
    "correctAnswer": "Mohorovičić Discontinuity (Moho)",
    "explanation": "The Mohorovičić discontinuity (Moho) is the petrological and seismic boundary separating the crust from the mantle, characterized by an abrupt increase in primary seismic wave (P-wave) velocity from ~6.5 km/s to ~8.0 km/s."
})

add_q({
    "id": "GEO-B-05",
    "field": "Geography, physical",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Satellite Remote Sensing Bands & Vegetation Indices",
    "content": "In satellite multispectral remote sensing (such as Landsat or Sentinel-2), which spectral band combination is contrasted with red light to calculate the Normalized Difference Vegetation Index ($\\text{NDVI} = \\frac{\\text{NIR} - \\text{Red}}{\\text{NIR} + \\text{Red}}$)?",
    "options": [
        "Thermal Infrared (TIR)",
        "Near-Infrared (NIR)",
        "Shortwave Infrared (SWIR-2)",
        "Ultraviolet-A (UVA)"
    ],
    "correctAnswer": "Near-Infrared (NIR)",
    "explanation": "Chlorophyll pigments in healthy green leaves absorb red light for photosynthesis, while the spongy mesophyll leaf structure strongly reflects Near-Infrared (NIR) radiation. Hence, NDVI uses the normalized contrast between NIR and Red reflectance."
})

add_q({
    "id": "GEO-B-06",
    "field": "Geography, physical",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Glacial Landform Morphometry",
    "content": "A knife-edged, steep-sided bedrock ridge formed between two adjacent glacial cirques experiencing headward frost sapping and plucking is termed a(n):",
    "options": [
        "Drumlin",
        "Arête",
        "Esker",
        "Kettle"
    ],
    "correctAnswer": "Arête",
    "explanation": "An arête is a narrow, sharp-crested mountain ridge formed when two opposing glaciers parallel each other or headward cirque erosion hollows out both sides of a mountain crest."
})

add_q({
    "id": "GEO-B-07",
    "field": "Geography, physical",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Cartographic Map Projections and Distortions",
    "content": "Which conformal cylindrical map projection preserves local angles and shape fidelity throughout, making it standard for marine navigation, despite severe areal enlargement towards the polar latitudes?",
    "options": [
        "Gall-Peters Projection",
        "Mercator Projection",
        "Mollweide Projection",
        "Lambert Azimuthal Equal-Area Projection"
    ],
    "correctAnswer": "Mercator Projection",
    "explanation": "The Mercator projection is a conformal cylindrical map projection designed by Gerardus Mercator in 1569. It renders lines of constant compass bearing (rhumb lines / loxodromes) as straight segments, but causes infinite area exaggeration at the poles."
})

add_q({
    "id": "GEO-B-08",
    "field": "Geography, physical",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Exogenous Geomorphology and Karst Landforms",
    "content": "Karst relief features (such as dolines, poljes, and subterranean caves) develop predominantly through the chemical dissolution of which lithology by carbonic acid-rich waters?",
    "options": [
        "Basaltic lava flows",
        "Carbonate rocks (limestone and dolomite)",
        "Quartzose sandstone",
        "Gabbro intrusive complexes"
    ],
    "correctAnswer": "Carbonate rocks (limestone and dolomite)",
    "explanation": "Karst topography forms by the dissolution of soluble rocks, most notably limestone ($\\text{CaCO}_3$) and dolomite ($\\text{CaMg(CO}_3)_2$), mediated by dissolved atmospheric and soil carbon dioxide ($H_2O + CO_2 \\rightleftharpoons H_2CO_3$)."
})

add_q({
    "id": "GEO-I-01",
    "field": "Geography, physical",
    "difficulty": "intermediate",
    "type": "short-answer",
    "points": 3,
    "title": "Fluvial Vector and Cardinal Direction Determination",
    "content": "A major river channel has its source located at coordinates $18^\\circ\\text{S}, 48^\\circ\\text{W}$ and terminates at an ocean estuary located at $28^\\circ\\text{S}, 42^\\circ\\text{W}$. In what general direction relative to the cardinal points does this river flow?\n\nWrite down your answer strictly in the format: **from xxx-xxx to yyy-yyy** (all lowercase, using hyphenated intercardinal points, e.g., *from north-west to south-east*).",
    "correctAnswer": "from north-west to south-east",
    "acceptableAnswers": ["from north-west to south-east", "from northwest to southeast"],
    "explanation": "The source is at 18°S, 48°W and the mouth is at 28°S, 42°W. Latitude changes from 18°S to 28°S (moving South). Longitude changes from 48°W to 42°W (moving East towards the Prime Meridian). Hence the direction of river flow is from north-west to south-east."
})

add_q({
    "id": "GEO-I-02",
    "field": "Geography, physical",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Solar Zenith Geometry Across Terrestrial Latitudes",
    "content": "At which latitudinal zones or parallels does the Sun reach the exact zenith (solar elevation angle $\\alpha = 90^\\circ$ at solar noon) twice during a single calendar year? Select all that apply.",
    "options": [
        "Tropic of Cancer ($23^\\circ 26'\\text{ N}$)",
        "Equatorial zone ($0^\\circ$ latitude)",
        "Between the Tropic of Cancer and the Equator ($0^\\circ < \\phi < 23^\\circ 26'\\text{ N}$)",
        "Between the Equator and the Tropic of Capricorn ($23^\\circ 26'\\text{ S} < \\phi < 0^\\circ$)",
        "Tropic of Capricorn ($23^\\circ 26'\\text{ S}$)",
        "Arctic Circle ($66^\\circ 34'\\text{ N}$)"
    ],
    "correctAnswer": [
        "Equatorial zone ($0^\\circ$ latitude)",
        "Between the Tropic of Cancer and the Equator ($0^\\circ < \\phi < 23^\\circ 26'\\text{ N}$)",
        "Between the Equator and the Tropic of Capricorn ($23^\\circ 26'\\text{ S} < \\phi < 0^\\circ$)"
    ],
    "explanation": "The subsolar point oscillates between $23^\\circ 26'\\text{ N}$ and $23^\\circ 26'\\text{ S}$ over the year. At the Tropics themselves, the Sun reaches zenith exactly once per year (at the solstices). Everywhere strictly between the Tropics (including the Equator), the subsolar point passes overhead twice per year."
})

add_q({
    "id": "GEO-I-03",
    "field": "Geography, physical",
    "difficulty": "intermediate",
    "type": "short-answer",
    "points": 3,
    "title": "Topographic Map Scale and Relief Gradient Calculation",
    "content": "On a topographic map of scale $1 : 50,000$, two trigonometric stations $A$ and $B$ are separated by a measured distance of $6.0\\text{ cm}$. Station $A$ has an elevation of $240\\text{ m}$ a.s.l., while Station $B$ is located on a ridge at $690\\text{ m}$ a.s.l.\n\nCalculate the average topographic gradient ($i = \\frac{\\Delta h}{L}$) along the line $AB$, expressed as a decimal value (e.g., 0.15).",
    "correctAnswer": "0.15",
    "acceptableAnswers": ["0.15", "0.150"],
    "explanation": "Map distance $d = 6.0\\text{ cm} = 0.06\\text{ m}$. Real horizontal distance $L = 0.06 \\times 50,000 = 3,000\\text{ m}$. Elevation difference $\\Delta h = 690 - 240 = 450\\text{ m}$. Gradient $i = \\frac{450\\text{ m}}{3,000\\text{ m}} = 0.15$."
})

add_q({
    "id": "GEO-I-04",
    "field": "Geography, physical",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Glacial Deposition Landforms (Select TWO)",
    "content": "Select TWO landforms that are classified as direct accumulations of glacial or glaciofluvial deposition rather than products of glacial erosion:",
    "options": [
        "Cirque (corrie)",
        "Moraine",
        "Fjord",
        "Esker",
        "Roche moutonnée"
    ],
    "correctAnswer": [
        "Moraine",
        "Esker"
    ],
    "explanation": "Moraines (lateral, medial, terminal) are ridges composed of unsorted glacial till deposited directly by ice. Eskers are winding ridges of stratified sand and gravel deposited by subglacial meltwater streams. Cirques, fjords, and roches moutonnées are erosional landforms."
})

add_q({
    "id": "GEO-I-05",
    "field": "Geography, physical",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Tectonic Origin Lakes of the World (Select TWO)",
    "content": "Select TWO lakes that originated primarily through continental rifting or tectonic graben subsidence:",
    "options": [
        "Lake Baikal",
        "Lake Superior",
        "Lake Tanganyika",
        "Crater Lake (Oregon)",
        "Lake Ladoga"
    ],
    "correctAnswer": [
        "Lake Baikal",
        "Lake Tanganyika"
    ],
    "explanation": "Lake Baikal (Siberia) occupies an active continental rift zone (Baikal Rift System) and is the world's deepest lake. Lake Tanganyika occupies a major graben in the East African Rift System. Lake Superior and Ladoga are of glacial origin, while Crater Lake is a volcanic caldera."
})

add_q({
    "id": "GEO-A-01",
    "field": "Geography, physical",
    "difficulty": "advanced",
    "type": "extended-response",
    "points": 10,
    "title": "Solar Zenith Altitude and Solstice Elevation Angle Derivation",
    "content": """Below is a geographic graticule chart displaying northern Eurasian latitude lines and the location of the maritime port of **Murmansk** ($69^\\circ 00'\\text{ N}$):

<div class="svg-diagram-container" style="text-align:center; margin:15px 0;">
  <svg width="420" height="210" viewBox="0 0 420 210" style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px;">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="420" height="210" fill="url(#grid)" />
    <!-- Parallels -->
    <line x1="30" y1="170" x2="390" y2="170" stroke="#94a3b8" stroke-dasharray="4" />
    <text x="395" y="174" font-size="11" fill="#64748b">50° N</text>
    <line x1="30" y1="120" x2="390" y2="120" stroke="#94a3b8" stroke-dasharray="4" />
    <text x="395" y="124" font-size="11" fill="#64748b">60° N</text>
    <line x1="30" y1="70" x2="390" y2="70" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="4" />
    <text x="395" y="74" font-size="11" fill="#0284c7">66°33' N (Arctic Circle)</text>
    <line x1="30" y1="57" x2="390" y2="57" stroke="#dc2626" stroke-width="2" />
    <text x="395" y="61" font-size="11" fill="#dc2626" font-weight="bold">69°00' N (Murmansk)</text>
    <!-- Point marker -->
    <circle cx="210" cy="57" r="5" fill="#dc2626" />
    <text x="220" y="52" font-size="12" font-weight="bold" fill="#0f172a">Port of Murmansk (φ = 69°00' N)</text>
    <!-- Solstice Ray -->
    <line x1="130" y1="20" x2="210" y2="57" stroke="#eab308" stroke-width="2.5" />
    <text x="100" y="25" font-size="12" fill="#ca8a04" font-weight="bold">Solar Noon Ray (Summer Solstice)</text>
  </svg>
</div>

**Task:**
1. State the fundamental astronomical relationship for calculating the midday solar altitude (elevation angle $\\alpha$) as a function of geographic latitude $\\phi$ and solar declination $\\delta$ when the Sun culminates south of the zenith.
2. Given that on the day of the summer solstice (June 21), the solar declination is $\\delta = +23^\\circ 27'$ (or $+23.5^\\circ$), calculate the exact midday altitude of the Sun ($\\alpha$) above the horizon in Murmansk ($\\phi = 69^\\circ 00'\\text{ N}$).
3. Furthermore, calculate the midday altitude of the Sun in Murmansk on the day of the winter solstice ($\\delta = -23^\\circ 27'$), and explain what physical phenomenon this mathematical result demonstrates regarding polar day and polar night.

Show complete mathematical derivation, formulas, and units in your response.""",
    "requiredKeywords": [
        "90 - phi + delta",
        "69",
        "23.5",
        "44.5",
        "-2.5",
        "below the horizon",
        "polar night"
    ],
    "modelSolution": """1. Calculation formula for culmination south of zenith:
$$\\alpha = 90^\\circ - \\phi + \\delta$$
where $\\phi$ is geographic latitude and $\\delta$ is solar declination.

2. Midday altitude on the Summer Solstice ($\delta = +23^\\circ 27' = +23.5^\\circ$):
$$\\alpha_{\\text{summer}} = 90^\\circ - 69^\\circ 00' + 23^\\circ 27' = 21^\\circ 00' + 23^\\circ 27' = 44^\\circ 27' \\text{ (or } 44.5^\\circ\\text{)}$$

3. Midday altitude on the Winter Solstice ($\delta = -23^\\circ 27' = -23.5^\\circ$):
$$\\alpha_{\\text{winter}} = 90^\\circ - 69^\\circ 00' + (-23^\\circ 27') = 21^\\circ 00' - 23^\\circ 27' = -2^\\circ 27' \\text{ (or } -2.45^\\circ\\text{)}$$

Physical Interpretation:
Because $\\alpha_{\\text{winter}} < 0^\\circ$, the upper limb of the solar disk does not rise above the horizon even at true astronomical noon. This demonstrates that Murmansk, lying north of the Arctic Circle ($66^\\circ 33'\\text{ N}$), experiences the **polar night** during the winter solstice period."""
})

add_q({
    "id": "GEO-A-02",
    "field": "Geography, physical",
    "difficulty": "advanced",
    "type": "extended-response",
    "points": 10,
    "title": "Catchment Hydrologic Water Balance and Runoff Depth Derivation",
    "content": """A river basin has a total catchment surface area of $A = 12,500\\text{ km}^2$. Long-term hydrological monitoring provides the following meteorological and hydrometric averages:
- Annual precipitation: $P = 780\\text{ mm/year}$
- Annual mean river discharge at the closing gauge: $Q = 145\\text{ m}^3\\text{/s}$
- Change in groundwater storage over the long-term balance period: $\\Delta S \\approx 0$

**Tasks:**
1. Calculate the total annual volume of precipitation ($V_P$) falling over the catchment in cubic meters ($\\text{m}^3$).
2. Calculate the total annual runoff volume ($V_R$) discharged through the river mouth in cubic meters ($\\text{m}^3$) assuming a 365-day year ($31,536,000\\text{ s}$).
3. Determine the annual runoff depth ($R$) across the watershed in millimeters ($\\text{mm}$).
4. Calculate the dimensionless runoff coefficient ($\\eta = \\frac{R}{P}$) and the total annual actual evapotranspiration ($E$) in $\\text{mm}$.

Present all formulas, conversion steps, and final numerical values rounded to two decimal places.""",
    "requiredKeywords": [
        "9.75",
        "4.57",
        "365",
        "366",
        "0.47",
        "414"
    ],
    "modelSolution": """1. Precipitation Volume:
$$A = 12,500\\text{ km}^2 = 1.25 \\times 10^{10}\\text{ m}^2$$
$$P = 780\\text{ mm} = 0.780\\text{ m}$$
$$V_P = A \\times P = 1.25 \\times 10^{10}\\text{ m}^2 \\times 0.780\\text{ m} = 9.75 \\times 10^9\\text{ m}^3\\text{ (9.75 billion m}^3\\text{)}$$

2. Annual Runoff Volume:
Seconds in a year = $365 \\times 86,400 = 31,536,000\\text{ s}$
$$V_R = Q \\times t = 145\\text{ m}^3\\text{/s} \\times 31,536,000\\text{ s} = 4,572,720,000\\text{ m}^3 \\approx 4.57 \\times 10^9\\text{ m}^3$$

3. Annual Runoff Depth ($R$):
$$R = \\frac{V_R}{A} = \\frac{4,572,720,000\\text{ m}^3}{1.25 \\times 10^{10}\\text{ m}^2} = 0.3658\\text{ m} \\approx 365.82\\text{ mm}$$

4. Runoff Coefficient ($\\eta$) and Evapotranspiration ($E$):
$$\\eta = \\frac{R}{P} = \\frac{365.82\\text{ mm}}{780\\text{ mm}} \\approx 0.469 \\text{ (or } 46.90\\%\\text{)}$$
From water balance equation ($P = R + E + \\Delta S$, with $\\Delta S = 0$):
$$E = P - R = 780\\text{ mm} - 365.82\\text{ mm} = 414.18\\text{ mm}$$"""
})

print(f"Loaded Field 1. Total questions: {len(questions)}")
