/**
 * Open Doors International Olympiad: Earth and Environmental Sciences for Sustainability
 * Dual-Mode Question Bank (Entry Drill + Stage 2 Second Round)
 * Total verified tasks: 115
 */

const QUESTION_BANK = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    "id": "GEO-I-01",
    "field": "Geography, physical",
    "difficulty": "intermediate",
    "type": "short-answer",
    "points": 3,
    "title": "Fluvial Vector and Cardinal Direction Determination",
    "content": "A major river channel has its source located at coordinates $18^\\circ\\text{S}, 48^\\circ\\text{W}$ and terminates at an ocean estuary located at $28^\\circ\\text{S}, 42^\\circ\\text{W}$. In what general direction relative to the cardinal points does this river flow?\n\nWrite down your answer strictly in the format: **from xxx-xxx to yyy-yyy** (all lowercase, using hyphenated intercardinal points, e.g., *from north-west to south-east*).",
    "correctAnswer": "from north-west to south-east",
    "acceptableAnswers": [
      "from north-west to south-east",
      "from northwest to southeast"
    ],
    "explanation": "The source is at 18°S, 48°W and the mouth is at 28°S, 42°W. Latitude changes from 18°S to 28°S (moving South). Longitude changes from 48°W to 42°W (moving East towards the Prime Meridian). Hence the direction of river flow is from north-west to south-east."
  },
  {
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
  },
  {
    "id": "GEO-I-03",
    "field": "Geography, physical",
    "difficulty": "intermediate",
    "type": "short-answer",
    "points": 3,
    "title": "Topographic Map Scale and Relief Gradient Calculation",
    "content": "On a topographic map of scale $1 : 50,000$, two trigonometric stations $A$ and $B$ are separated by a measured distance of $6.0\\text{ cm}$. Station $A$ has an elevation of $240\\text{ m}$ a.s.l., while Station $B$ is located on a ridge at $690\\text{ m}$ a.s.l.\n\nCalculate the average topographic gradient ($i = \\frac{\\Delta h}{L}$) along the line $AB$, expressed as a decimal value (e.g., 0.15).",
    "correctAnswer": "0.15",
    "acceptableAnswers": [
      "0.15",
      "0.150"
    ],
    "explanation": "Map distance $d = 6.0\\text{ cm} = 0.06\\text{ m}$. Real horizontal distance $L = 0.06 \\times 50,000 = 3,000\\text{ m}$. Elevation difference $\\Delta h = 690 - 240 = 450\\text{ m}$. Gradient $i = \\frac{450\\text{ m}}{3,000\\text{ m}} = 0.15$."
  },
  {
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
  },
  {
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
  },
  {
    "id": "GEO-A-01",
    "field": "Geography, physical",
    "difficulty": "advanced",
    "type": "extended-response",
    "points": 10,
    "title": "Solar Zenith Altitude and Solstice Elevation Angle Derivation",
    "content": "Below is a geographic graticule chart displaying northern Eurasian latitude lines and the location of the maritime port of **Murmansk** ($69^\\circ 00'\\text{ N}$):\n\n<div class=\"svg-diagram-container\" style=\"text-align:center; margin:15px 0;\">\n  <svg width=\"420\" height=\"210\" viewBox=\"0 0 420 210\" style=\"background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px;\">\n    <defs>\n      <pattern id=\"grid\" width=\"40\" height=\"40\" patternUnits=\"userSpaceOnUse\">\n        <path d=\"M 40 0 L 0 0 0 40\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"1\"/>\n      </pattern>\n    </defs>\n    <rect width=\"420\" height=\"210\" fill=\"url(#grid)\" />\n    <!-- Parallels -->\n    <line x1=\"30\" y1=\"170\" x2=\"390\" y2=\"170\" stroke=\"#94a3b8\" stroke-dasharray=\"4\" />\n    <text x=\"395\" y=\"174\" font-size=\"11\" fill=\"#64748b\">50° N</text>\n    <line x1=\"30\" y1=\"120\" x2=\"390\" y2=\"120\" stroke=\"#94a3b8\" stroke-dasharray=\"4\" />\n    <text x=\"395\" y=\"124\" font-size=\"11\" fill=\"#64748b\">60° N</text>\n    <line x1=\"30\" y1=\"70\" x2=\"390\" y2=\"70\" stroke=\"#0ea5e9\" stroke-width=\"1.5\" stroke-dasharray=\"4\" />\n    <text x=\"395\" y=\"74\" font-size=\"11\" fill=\"#0284c7\">66°33' N (Arctic Circle)</text>\n    <line x1=\"30\" y1=\"57\" x2=\"390\" y2=\"57\" stroke=\"#dc2626\" stroke-width=\"2\" />\n    <text x=\"395\" y=\"61\" font-size=\"11\" fill=\"#dc2626\" font-weight=\"bold\">69°00' N (Murmansk)</text>\n    <!-- Point marker -->\n    <circle cx=\"210\" cy=\"57\" r=\"5\" fill=\"#dc2626\" />\n    <text x=\"220\" y=\"52\" font-size=\"12\" font-weight=\"bold\" fill=\"#0f172a\">Port of Murmansk (φ = 69°00' N)</text>\n    <!-- Solstice Ray -->\n    <line x1=\"130\" y1=\"20\" x2=\"210\" y2=\"57\" stroke=\"#eab308\" stroke-width=\"2.5\" />\n    <text x=\"100\" y=\"25\" font-size=\"12\" fill=\"#ca8a04\" font-weight=\"bold\">Solar Noon Ray (Summer Solstice)</text>\n  </svg>\n</div>\n\n**Task:**\n1. State the fundamental astronomical relationship for calculating the midday solar altitude (elevation angle $\\alpha$) as a function of geographic latitude $\\phi$ and solar declination $\\delta$ when the Sun culminates south of the zenith.\n2. Given that on the day of the summer solstice (June 21), the solar declination is $\\delta = +23^\\circ 27'$ (or $+23.5^\\circ$), calculate the exact midday altitude of the Sun ($\\alpha$) above the horizon in Murmansk ($\\phi = 69^\\circ 00'\\text{ N}$).\n3. Furthermore, calculate the midday altitude of the Sun in Murmansk on the day of the winter solstice ($\\delta = -23^\\circ 27'$), and explain what physical phenomenon this mathematical result demonstrates regarding polar day and polar night.\n\nShow complete mathematical derivation, formulas, and units in your response.",
    "requiredKeywords": [
      "90 - phi + delta",
      "69",
      "23.5",
      "44.5",
      "-2.5",
      "below the horizon",
      "polar night"
    ],
    "modelSolution": "1. Calculation formula for culmination south of zenith:\n$$\\alpha = 90^\\circ - \\phi + \\delta$$\nwhere $\\phi$ is geographic latitude and $\\delta$ is solar declination.\n\n2. Midday altitude on the Summer Solstice ($\\delta = +23^\\circ 27' = +23.5^\\circ$):\n$$\\alpha_{\\text{summer}} = 90^\\circ - 69^\\circ 00' + 23^\\circ 27' = 21^\\circ 00' + 23^\\circ 27' = 44^\\circ 27' \\text{ (or } 44.5^\\circ\\text{)}$$\n\n3. Midday altitude on the Winter Solstice ($\\delta = -23^\\circ 27' = -23.5^\\circ$):\n$$\\alpha_{\\text{winter}} = 90^\\circ - 69^\\circ 00' + (-23^\\circ 27') = 21^\\circ 00' - 23^\\circ 27' = -2^\\circ 27' \\text{ (or } -2.45^\\circ\\text{)}$$\n\nPhysical Interpretation:\nBecause $\\alpha_{\\text{winter}} < 0^\\circ$, the upper limb of the solar disk does not rise above the horizon even at true astronomical noon. This demonstrates that Murmansk, lying north of the Arctic Circle ($66^\\circ 33'\\text{ N}$), experiences the **polar night** during the winter solstice period."
  },
  {
    "id": "GEO-A-02",
    "field": "Geography, physical",
    "difficulty": "advanced",
    "type": "extended-response",
    "points": 10,
    "title": "Catchment Hydrologic Water Balance and Runoff Depth Derivation",
    "content": "A river basin has a total catchment surface area of $A = 12,500\\text{ km}^2$. Long-term hydrological monitoring provides the following meteorological and hydrometric averages:\n- Annual precipitation: $P = 780\\text{ mm/year}$\n- Annual mean river discharge at the closing gauge: $Q = 145\\text{ m}^3\\text{/s}$\n- Change in groundwater storage over the long-term balance period: $\\Delta S \\approx 0$\n\n**Tasks:**\n1. Calculate the total annual volume of precipitation ($V_P$) falling over the catchment in cubic meters ($\\text{m}^3$).\n2. Calculate the total annual runoff volume ($V_R$) discharged through the river mouth in cubic meters ($\\text{m}^3$) assuming a 365-day year ($31,536,000\\text{ s}$).\n3. Determine the annual runoff depth ($R$) across the watershed in millimeters ($\\text{mm}$).\n4. Calculate the dimensionless runoff coefficient ($\\eta = \\frac{R}{P}$) and the total annual actual evapotranspiration ($E$) in $\\text{mm}$.\n\nPresent all formulas, conversion steps, and final numerical values rounded to two decimal places.",
    "requiredKeywords": [
      "9.75",
      "4.57",
      "365",
      "366",
      "0.47",
      "414"
    ],
    "modelSolution": "1. Precipitation Volume:\n$$A = 12,500\\text{ km}^2 = 1.25 \\times 10^{10}\\text{ m}^2$$\n$$P = 780\\text{ mm} = 0.780\\text{ m}$$\n$$V_P = A \\times P = 1.25 \\times 10^{10}\\text{ m}^2 \\times 0.780\\text{ m} = 9.75 \\times 10^9\\text{ m}^3\\text{ (9.75 billion m}^3\\text{)}$$\n\n2. Annual Runoff Volume:\nSeconds in a year = $365 \\times 86,400 = 31,536,000\\text{ s}$\n$$V_R = Q \\times t = 145\\text{ m}^3\\text{/s} \\times 31,536,000\\text{ s} = 4,572,720,000\\text{ m}^3 \\approx 4.57 \\times 10^9\\text{ m}^3$$\n\n3. Annual Runoff Depth ($R$):\n$$R = \\frac{V_R}{A} = \\frac{4,572,720,000\\text{ m}^3}{1.25 \\times 10^{10}\\text{ m}^2} = 0.3658\\text{ m} \\approx 365.82\\text{ mm}$$\n\n4. Runoff Coefficient ($\\eta$) and Evapotranspiration ($E$):\n$$\\eta = \\frac{R}{P} = \\frac{365.82\\text{ mm}}{780\\text{ mm}} \\approx 0.469 \\text{ (or } 46.90\\%\\text{)}$$\nFrom water balance equation ($P = R + E + \\Delta S$, with $\\Delta S = 0$):\n$$E = P - R = 780\\text{ mm} - 365.82\\text{ mm} = 414.18\\text{ mm}$$"
  },
  {
    "id": "MET-B-01",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Atmospheric Ozone Layer Profile",
    "content": "Which layer of the Earth's atmosphere contains the highest concentration of ozone ($O_3$) responsible for shielding the biosphere from deleterious solar ultraviolet-B radiation?",
    "options": [
      "Troposphere",
      "Stratosphere",
      "Mesosphere",
      "Thermosphere"
    ],
    "correctAnswer": "Stratosphere",
    "explanation": "The stratospheric ozone layer (ozonosphere), situated roughly between 15 km and 35 km altitude, absorbs over 97% of harmful solar UV radiation (UV-B and UV-C) through the Chapman photochemical cycle."
  },
  {
    "id": "MET-B-02",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Global Planetary Wind Systems",
    "content": "Steady prevailing surface winds that blow equatorward from the subtropical high-pressure belts towards the Intertropical Convergence Zone (ITCZ) are termed:",
    "options": [
      "Polar easterlies",
      "Mid-latitude westerlies",
      "Trade winds (tropical easterlies)",
      "Anabatic valley breezes"
    ],
    "correctAnswer": "Trade winds (tropical easterlies)",
    "explanation": "Trade winds are the permanent east-to-west prevailing winds in the equatorial region, driven by the equatorward limb of the Hadley cell and deflected westward by the Coriolis force."
  },
  {
    "id": "MET-B-03",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Rainfall Depth to Areal Mass Conversion",
    "content": "During a cyclonic precipitation event, a meteorological gauge registers $16.5\\text{ mm}$ of rainfall. What total mass of liquid water fell over an agricultural territory of $1.0\\text{ ha}$? (Assume water density $\\rho = 1.0\\text{ g/cm}^3 = 1,000\\text{ kg/m}^3$).",
    "options": [
      "$165\\text{ kg}$",
      "$1,650\\text{ kg}$",
      "$16,500\\text{ kg}$",
      "$165,000\\text{ kg}$"
    ],
    "correctAnswer": "$165,000\\text{ kg}$",
    "explanation": "$1\\text{ ha} = 10,000\\text{ m}^2$. Rainfall depth $= 16.5\\text{ mm} = 0.0165\\text{ m}$. Water volume $V = 10,000\\text{ m}^2 \\times 0.0165\\text{ m} = 165\\text{ m}^3$. Mass $m = 165\\text{ m}^3 \\times 1,000\\text{ kg/m}^3 = 165,000\\text{ kg}$ (165 metric tonnes)."
  },
  {
    "id": "MET-B-04",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Fundamental Driver of Global Climate Zones",
    "content": "Which astronomical and physical factor exerts the primary control on the distribution of latitudinal climate belts on Earth?",
    "options": [
      "Regional differences in ocean water salinity",
      "Spatial variability of the geomagnetic dipole field",
      "Latitudinal gradient in the solar angle of incidence and insolation flux",
      "Tectonic heat dissipation along mid-ocean ridge spreading centers"
    ],
    "correctAnswer": "Latitudinal gradient in the solar angle of incidence and insolation flux",
    "explanation": "Because Earth is a spheroid, solar rays strike the surface nearly perpendicular at the equator and at shallow oblique angles near the poles, causing differential heating that drives global climate zones and planetary atmospheric circulation."
  },
  {
    "id": "MET-B-05",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Natural Greenhouse Radiative Forcing Gases",
    "content": "Which atmospheric constituent contributes the greatest absolute percentage to the natural greenhouse effect through infrared absorption across the terrestrial emission spectrum?",
    "options": [
      "Methane ($CH_4$)",
      "Water vapor ($H_2O$)",
      "Nitrous oxide ($N_2O$)",
      "Tropospheric ozone ($O_3$)"
    ],
    "correctAnswer": "Water vapor ($H_2O$)",
    "explanation": "Water vapor is the most abundant natural greenhouse gas, accounting for roughly 60% of the natural greenhouse warming, followed by carbon dioxide (~26%)."
  },
  {
    "id": "MET-B-06",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Instruments for Atmospheric Pressure Measurement",
    "content": "Which scientific instrument measures atmospheric air pressure without using liquid mercury, relying instead on the mechanical flexing of a partially evacuated metallic capsule?",
    "options": [
      "Psychrometer",
      "Aneroid barometer",
      "Anemometer",
      "Pyranometer"
    ],
    "correctAnswer": "Aneroid barometer",
    "explanation": "An aneroid barometer uses a sealed, flexible, partially evacuated metal capsule (bellows) that compresses or expands with external air pressure variations, mechanically driving a pointer."
  },
  {
    "id": "MET-B-07",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Troposphere Mass and Meteorological Dynamics",
    "content": "In which thermal layer of the atmosphere does approximately $80\\%$ of total atmospheric gaseous mass and virtually all atmospheric water vapor reside?",
    "options": [
      "Stratosphere",
      "Troposphere",
      "Mesosphere",
      "Thermosphere"
    ],
    "correctAnswer": "Troposphere",
    "explanation": "The troposphere contains ~80% of total atmospheric mass and 99% of atmospheric water vapor, and is the turbulent layer where convective storms, clouds, and weather occur."
  },
  {
    "id": "MET-B-08",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Tropical Atmospheric Circulation Cells",
    "content": "The large-scale meridional circulation cell characterized by moist buoyant ascent at the thermal equator and dry subsidence in the subtropics at $\\approx 30^\\circ\\text{ N/S}$ is the:",
    "options": [
      "Ferrel cell",
      "Polar cell",
      "Hadley cell",
      "Walker circulation"
    ],
    "correctAnswer": "Hadley cell",
    "explanation": "The Hadley cell is the tropical atmospheric circulation pattern featuring warm buoyant updrafts at the ITCZ, poleward flow aloft, dry adiabatic subsidence around 30° latitude forming the subtropical deserts, and equatorward surface trade winds."
  },
  {
    "id": "MET-I-01",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "intermediate",
    "type": "short-answer",
    "points": 3,
    "title": "Tropospheric Environmental Lapse Rate Calculation",
    "content": "The environmental lapse rate in a mountainous terrain is measured to be a uniform $6.5^\\circ\\text{C}$ per $1,000\\text{ m}$ of vertical ascent ($0.0065^\\circ\\text{C/m}$). At a meteorological base station located at elevation $400\\text{ m}$ a.s.l., the ambient surface temperature is $+24.0^\\circ\\text{C}$.\n\nCalculate the ambient air temperature at a mountain observatory situated on the summit at elevation $3,400\\text{ m}$ a.s.l. Enter your answer as a numeric temperature in degrees Celsius (e.g., 4.5).",
    "correctAnswer": "4.5",
    "acceptableAnswers": [
      "4.5",
      "4.5°C",
      "4.5 C"
    ],
    "explanation": "Elevation difference $\\Delta z = 3,400\\text{ m} - 400\\text{ m} = 3,000\\text{ m} = 3.0\\text{ km}$. Temperature drop $\\Delta T = 3.0\\text{ km} \\times 6.5^\\circ\\text{C/km} = 19.5^\\circ\\text{C}$. Summit temperature $T = 24.0^\\circ\\text{C} - 19.5^\\circ\\text{C} = 4.5^\\circ\\text{C}$."
  },
  {
    "id": "MET-I-02",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Major Criteria Air Pollutants under WHO Standards (Select TWO)",
    "content": "Select TWO atmospheric pollutants that serve as primary global indicators in WHO air quality guidelines due to their proven pulmonary toxicity and role in urban photochemical smog/acid precipitation:",
    "options": [
      "Fine particulate matter ($PM_{2.5}$)",
      "Nitrogen dioxide ($NO_2$)",
      "Molecular nitrogen ($N_2$)",
      "Argon ($Ar$)",
      "Water vapor ($H_2O$)"
    ],
    "correctAnswer": [
      "Fine particulate matter ($PM_{2.5}$)",
      "Nitrogen dioxide ($NO_2$)"
    ],
    "explanation": "PM2.5 (particles <2.5 micrometers) and Nitrogen dioxide (NO2) are major criteria air pollutants with strict WHO air quality threshold standards. N2 and Ar are inert atmospheric gases, and water vapor is a natural constituent."
  },
  {
    "id": "MET-I-03",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Coriolis Acceleration and Geostrophic Deflection (Select TWO)",
    "content": "Select TWO correct physical statements describing the effect of the Coriolis force on large-scale air mass movement across the Earth's rotating reference frame:",
    "options": [
      "It deflects moving air parcels to the right of their motion vector in the Northern Hemisphere.",
      "It deflects moving air parcels to the left of their motion vector in the Southern Hemisphere.",
      "Its magnitude is maximal along the geographic equator ($0^\\circ$ latitude).",
      "It acts to accelerate the absolute linear speed of the wind without altering its direction.",
      "It causes low-pressure cyclonic systems to rotate clockwise in the Northern Hemisphere."
    ],
    "correctAnswer": [
      "It deflects moving air parcels to the right of their motion vector in the Northern Hemisphere.",
      "It deflects moving air parcels to the left of their motion vector in the Southern Hemisphere."
    ],
    "explanation": "The Coriolis acceleration ($2\\mathbf{\\Omega} \\times \\mathbf{v}$) deflects moving trajectories to the right in the Northern Hemisphere and to the left in the Southern Hemisphere. Its parameter $f = 2\\Omega\\sin\\phi$ is zero at the equator and maximal at the poles. It alters direction only, doing zero work."
  },
  {
    "id": "MET-I-04",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "intermediate",
    "type": "short-answer",
    "points": 3,
    "title": "Dry Adiabatic Lapse Rate Cooling Calculation",
    "content": "An unsaturated (dry) air parcel with an initial temperature of $18.0^\\circ\\text{C}$ is forced upward over an orographic barrier, rising by a vertical displacement of $\\Delta z = 1,500\\text{ m}$. Assuming the dry adiabatic lapse rate is strictly $\\Gamma_d = 9.8^\\circ\\text{C}$ per $1,000\\text{ m}$, calculate the final internal temperature of the parcel upon reaching this elevation, assuming no condensation occurs.\n\nEnter your answer in degrees Celsius rounded to one decimal place (e.g., 3.3).",
    "correctAnswer": "3.3",
    "acceptableAnswers": [
      "3.3",
      "3.3°C",
      "3.3 C"
    ],
    "explanation": "Cooling magnitude $\\Delta T = 1.5\\text{ km} \\times 9.8^\\circ\\text{C/km} = 14.7^\\circ\\text{C}$. Final temperature $T = 18.0^\\circ\\text{C} - 14.7^\\circ\\text{C} = 3.3^\\circ\\text{C}$."
  },
  {
    "id": "MET-A-01",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "advanced",
    "type": "extended-response",
    "points": 10,
    "title": "Thermodynamics of Orographic Precipitation and the Foehn Effect",
    "content": "A moist air parcel encounters a mountain barrier and undergoes orographic lifting, condensation, and leeward descent (the Foehn / Chinook phenomenon).\n\n**Given Parameters:**\n- Windward sea-level base elevation: $z_0 = 0\\text{ m}$, initial parcel temperature: $T_0 = +20.0^\\circ\\text{C}$\n- Dew point temperature at sea level: $T_{d0} = +10.2^\\circ\\text{C}$\n- Lifting Condensation Level (LCL): reaches saturation at elevation $z_{\\text{LCL}} = 1,000\\text{ m}$\n- Mountain crest (ridge) elevation: $z_{\\text{ridge}} = 3,000\\text{ m}$\n- Leeward valley base elevation: $z_{\\text{base}} = 200\\text{ m}$\n- Dry adiabatic lapse rate: $\\Gamma_d = 9.8^\\circ\\text{C/km}$ ($0.0098^\\circ\\text{C/m}$)\n- Saturated (wet) adiabatic lapse rate: $\\Gamma_m = 5.5^\\circ\\text{C/km}$ ($0.0055^\\circ\\text{C/m}$)\n- All condensed moisture precipitates out on the windward slope; the parcel is dry throughout descent.\n\n**Tasks:**\n1. Calculate the parcel temperature at the condensation level ($z = 1,000\\text{ m}$).\n2. Calculate the parcel temperature upon reaching the mountain crest ($z = 3,000\\text{ m}$).\n3. Calculate the temperature of the parcel upon descending adiabatically down the leeward slope to the valley base ($z = 200\\text{ m}$).\n4. Formulate the thermodynamic mechanism explaining why the leeward wind (Foehn) arrives significantly hotter and drier than the original windward air mass.\n\nShow complete calculations, intermediate steps, and clear physical explanations.",
    "requiredKeywords": [
      "10.2",
      "-0.8",
      "26.6",
      "latent heat of condensation",
      "unsaturated",
      "dry adiabatic"
    ],
    "modelSolution": "1. Temperature at Lifting Condensation Level ($z = 1,000\\text{ m}$):\nThe parcel rises unsaturated from $0\\text{ m}$ to $1,000\\text{ m}$ at $\\Gamma_d = 9.8^\\circ\\text{C/km}$:\n$$T_{\\text{LCL}} = T_0 - (\\Gamma_d \\times 1.0\\text{ km}) = 20.0^\\circ\\text{C} - 9.8^\\circ\\text{C} = 10.2^\\circ\\text{C}$$\n\n2. Temperature at Mountain Crest ($z = 3,000\\text{ m}$):\nFrom $1,000\\text{ m}$ to $3,000\\text{ m}$ ($\\Delta z = 2.0\\text{ km}$), the air is saturated and cools at $\\Gamma_m = 5.5^\\circ\\text{C/km}$:\n$$T_{\\text{ridge}} = T_{\\text{LCL}} - (\\Gamma_m \\times 2.0\\text{ km}) = 10.2^\\circ\\text{C} - (5.5 \\times 2.0)^\\circ\\text{C} = 10.2^\\circ\\text{C} - 11.0^\\circ\\text{C} = -0.8^\\circ\\text{C}$$\n\n3. Temperature at Leeward Valley Base ($z = 200\\text{ m}$):\nThe descending parcel undergoes compression and warms dry adiabatically over $\\Delta z = 3,000\\text{ m} - 200\\text{ m} = 2,800\\text{ m} = 2.8\\text{ km}$:\n$$T_{\\text{base}} = T_{\\text{ridge}} + (\\Gamma_d \\times 2.8\\text{ km}) = -0.8^\\circ\\text{C} + (9.8 \\times 2.8)^\\circ\\text{C} = -0.8^\\circ\\text{C} + 27.44^\\circ\\text{C} = 26.64^\\circ\\text{C} \\approx 26.6^\\circ\\text{C}$$\n\n4. Thermodynamic Mechanism:\nDuring ascent above the LCL, water vapor condenses into cloud droplets and precipitates out, releasing the **latent heat of condensation** into the air parcel. This heat buffers the cooling on the windward side ($\\Gamma_m < \\Gamma_d$). During leeward descent, because the condensed water was removed by rain, the parcel remains completely unsaturated and warms along the steeper dry adiabatic lapse rate ($\\Gamma_d$), arriving substantially warmer ($+26.6^\\circ\\text{C}$ vs $+20.0^\\circ\\text{C}$) and extremely dry."
  },
  {
    "id": "GLG-B-01",
    "field": "Geology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Dominant Mineral Class in Earth's Crust",
    "content": "Which mineral class, based structurally on polymerizing silica tetrahedra ($[SiO_4]^{4-}$), constitutes over $90\\%$ of the volume of the continental and oceanic Earth's crust?",
    "options": [
      "Carbonates",
      "Silicates",
      "Halides",
      "Sulfates"
    ],
    "correctAnswer": "Silicates",
    "explanation": "Silicate minerals (including feldspars, quartz, pyroxenes, amphiboles, micas, and clays) comprise greater than 90% of Earth's crust."
  },
  {
    "id": "GLG-B-02",
    "field": "Geology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Metamorphic Protolith Associations",
    "content": "The regional or contact metamorphism of a pure quartzose sandstone protolith, accompanied by complete recrystallization and interlocking of quartz grains, results in:",
    "options": [
      "Marble",
      "Quartzite",
      "Schist",
      "Gneiss"
    ],
    "correctAnswer": "Quartzite",
    "explanation": "Quartzite is a non-foliated metamorphic rock composed almost entirely of quartz, formed when quartz sandstone is subjected to heat, pressure, and recrystallization."
  },
  {
    "id": "GLG-B-03",
    "field": "Geology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Plate Tectonics and Subduction Geomorphology",
    "content": "Which plate tectonic boundary setting is characterized by deep oceanic trenches, Wadati-Benioff seismic zones, and explosive calc-alkaline volcanic island arcs?",
    "options": [
      "Divergent mid-ocean ridge",
      "Transform oceanic fault",
      "Ocean-ocean or ocean-continent convergent subduction zone",
      "Intraplate continental hotspot"
    ],
    "correctAnswer": "Ocean-ocean or ocean-continent convergent subduction zone",
    "explanation": "At convergent subduction boundaries, dense oceanic lithosphere descends beneath an overriding plate into the asthenosphere, forming deep trenches, a Wadati-Benioff zone of inclined seismicity, and a volcanic arc."
  },
  {
    "id": "GLG-B-04",
    "field": "Geology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Mohs Scale of Relative Mineral Hardness",
    "content": "On the empirical Mohs scale of mineral hardness, which index mineral is assigned the exact hardness value of 3?",
    "options": [
      "Talc",
      "Gypsum",
      "Calcite",
      "Fluorite",
      "Apatite"
    ],
    "correctAnswer": "Calcite",
    "explanation": "The Mohs scale order is: 1 Talc, 2 Gypsum, 3 Calcite, 4 Fluorite, 5 Apatite, 6 Orthoclase, 7 Quartz, 8 Topaz, 9 Corundum, 10 Diamond."
  },
  {
    "id": "GLG-B-05",
    "field": "Geology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Mass Wasting Mechanics and Driving Forces",
    "content": "Which fundamental physical body force is predominantly responsible for driving mass wasting processes such as scree development, rock avalanches, and rotational slumps?",
    "options": [
      "Geomagnetic Lorentz force",
      "Gravitational force (shear stress acting down slope)",
      "Centrifugal tidal force",
      "Electrostatic repulsion between clay sheets"
    ],
    "correctAnswer": "Gravitational force (shear stress acting down slope)",
    "explanation": "Mass wasting is the downslope movement of rock, regolith, and soil under the direct influence of gravity when shear stress exceeds the shear strength of the slope material."
  },
  {
    "id": "GLG-B-06",
    "field": "Geology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Extrusive Igneous Textures and Vesicularity",
    "content": "Which felsic-to-intermediate volcanic rock is characterized by an extremely frothy, vesicular glass texture resulting in an apparent bulk density less than $1.0\\text{ g/cm}^3$, allowing it to float on water?",
    "options": [
      "Obsidian",
      "Pumice",
      "Basalt",
      "Peridotite"
    ],
    "correctAnswer": "Pumice",
    "explanation": "Pumice is a light-colored, highly vesicular volcanic rock formed during explosive eruptions when expanding gas bubbles are trapped in rapidly cooling silicic lava. Its bulk density is low enough to float on water."
  },
  {
    "id": "GLG-B-07",
    "field": "Geology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Geological Field Traverse Distance Calculation",
    "content": "A field geologist surveys an exploration transect consisting of three consecutive linear legs measuring $3.2\\text{ km}$, $2.5\\text{ km}$, and $4.3\\text{ km}$. If the geologist must retrace their steps and return to base camp along the exact same path, what total distance will they traverse in that day?",
    "options": [
      "$10.0\\text{ km}$",
      "$15.0\\text{ km}$",
      "$20.0\\text{ km}$",
      "$25.0\\text{ km}$"
    ],
    "correctAnswer": "$20.0\\text{ km}$",
    "explanation": "Outward distance $= 3.2 + 2.5 + 4.3 = 10.0\\text{ km}$. Round trip $= 10.0 \\times 2 = 20.0\\text{ km}$."
  },
  {
    "id": "GLG-B-08",
    "field": "Geology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Structural Geology and Extensional Regimes",
    "content": "A down-dropped fault block bounded on both flanks by conjugate normal faults dipping towards each other is termed a(n):",
    "options": [
      "Horst",
      "Graben",
      "Anticline",
      "Nappe"
    ],
    "correctAnswer": "Graben",
    "explanation": "In extensional tectonics, a graben is a depressed crustal block produced by subsidence along conjugate normal faults, while the adjacent upthrown blocks are termed horsts."
  },
  {
    "id": "GLG-I-01",
    "field": "Geology",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Aseismic Cratonic Shields of the World (Select TWO)",
    "content": "Select TWO geological regions characterized by stable ancient crystalline basement and exceptionally low modern seismic activity:",
    "options": [
      "East European Platform (Baltic Shield)",
      "Pacific Ring of Fire",
      "Canadian Shield",
      "Zagros Fold-and-Thrust Belt",
      "Sunda Island Arc"
    ],
    "correctAnswer": [
      "East European Platform (Baltic Shield)",
      "Canadian Shield"
    ],
    "explanation": "The East European Platform and Canadian Shield are ancient Precambrian continental cratonic nuclei (shields) with tectonically quiescent lithosphere and very low historical seismicity."
  },
  {
    "id": "GLG-I-02",
    "field": "Geology",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Minerals with Invariable Diagnostic Color/Streak (Select TWO)",
    "content": "While color is often variable in minerals due to trace impurities (allochromatic), select TWO minerals for which intrinsic chemical composition gives a highly diagnostic, characteristic streak or mineral color (idiochromatic):",
    "options": [
      "Quartz ($SiO_2$)",
      "Cinnabar ($HgS$)",
      "Fluorite ($CaF_2$)",
      "Malachite ($Cu_2CO_3(OH)_2$)",
      "Calcite ($CaCO_3$)"
    ],
    "correctAnswer": [
      "Cinnabar ($HgS$)",
      "Malachite ($Cu_2CO_3(OH)_2$)"
    ],
    "explanation": "Cinnabar is universally vermilion-red with a distinctive bright scarlet-red streak. Malachite is intrinsically bright emerald to dark green. In contrast, quartz, fluorite, and calcite exhibit a wide array of allochromatic colors."
  },
  {
    "id": "GLG-I-03",
    "field": "Geology",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Sheet Silicates with Perfect Basal Cleavage (Select TWO)",
    "content": "Select TWO minerals belonging to the phyllosilicate group that exhibit eminent, perfect basal cleavage {001} along weakly bonded interlayer cation planes:",
    "options": [
      "Muscovite mica",
      "Biotite mica",
      "Orthoclase feldspar",
      "Hornblende amphibole",
      "Pyroxene (augite)"
    ],
    "correctAnswer": [
      "Muscovite mica",
      "Biotite mica"
    ],
    "explanation": "Muscovite and biotite are micas whose continuous two-dimensional sheets of polymerized $[SiO_4]$ tetrahedra are linked by weak potassium ($K^+$) bonds, permitting splitting into ultra-thin flexible sheets."
  },
  {
    "id": "GLG-I-04",
    "field": "Geology",
    "difficulty": "intermediate",
    "type": "short-answer",
    "points": 3,
    "title": "Fault Throw and Dip Slip Trigonometric Calculation",
    "content": "A planar normal fault exhibits a dip angle of $\\theta = 60^\\circ$ relative to the horizontal. Structural mapping reveals a stratigraphic marker horizon displaced with a vertical throw of $\\Delta z = 150.0\\text{ m}$.\n\nCalculate the net dip-slip displacement ($D$) along the fault surface in meters, rounded to one decimal place (use $\\sin 60^\\circ \\approx 0.8660$).",
    "correctAnswer": "173.2",
    "acceptableAnswers": [
      "173.2",
      "173.2 m"
    ],
    "explanation": "In fault trigonometry: $\\sin\\theta = \\frac{\\text{Throw}}{\\text{Dip Slip}} \\implies D = \\frac{\\Delta z}{\\sin\\theta} = \\frac{150.0}{0.866025} \\approx 173.2\\text{ m}$."
  },
  {
    "id": "GLG-I-05",
    "field": "Geology",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Fundamental Principles of Relative Geological Dating (Select TWO)",
    "content": "Select TWO foundational stratigraphic principles formulated by Nicolas Steno and Charles Lyell used to determine the relative chronostratigraphy of rock bodies:",
    "options": [
      "Principle of Original Horizontality",
      "Law of Universal Gravitational Pull",
      "Principle of Cross-Cutting Relationships",
      "Beer-Lambert Attenuation Law",
      "Principle of Isostasy Equilibrium"
    ],
    "correctAnswer": [
      "Principle of Original Horizontality",
      "Principle of Cross-Cutting Relationships"
    ],
    "explanation": "The Principle of Original Horizontality states that sedimentary layers are initially deposited essentially flat. The Principle of Cross-Cutting Relationships states that any fault, intrusion, or unconformity that cuts through rock strata is younger than the rocks it cuts."
  },
  {
    "id": "GLG-A-01",
    "field": "Geology",
    "difficulty": "advanced",
    "type": "extended-response",
    "points": 10,
    "title": "Structural Geochronology and Fault Displacement Analysis",
    "content": "Analyze the geological cross-section scenario described below:\n\nA succession of undeformed horizontal Paleozoic sedimentary layers (Sandstone $A$, Limestone $B$, and Shale $C$) is deposited in conformable sequence from bottom to top. Subsequently, the entire sequence undergoes:\n1. Intense horizontal tectonic compression producing a symmetrical anticlinal fold.\n2. Intrusion of a vertical granite dyke $D$ that cross-cuts the folded strata and solidifies.\n3. Subaerial uplift and extensive denudation creating a planar regional erosional surface (angular unconformity $U$).\n4. Deposition of horizontal Mesozoic Conglomerate layer $E$ directly overlying unconformity $U$.\n5. A planar normal fault $F$, dipping at an angle of $\\theta = 45^\\circ$, cuts through ALL units (including layer $E$). Drill-core logging shows that the fault displaced the base of Conglomerate $E$ with a vertical stratigraphic throw of $h = 80.0\\text{ m}$.\n\n**Tasks:**\n1. List the complete relative chronological sequence of events from OLDEST to YOUNGEST (including layers $A, B, C, E$, folding event, dyke $D$, unconformity $U$, and fault $F$).\n2. Identify the specific type of unconformity represented by $U$ beneath Conglomerate $E$, and justify your classification.\n3. Calculate the true dip-slip displacement ($S$) along the $45^\\circ$-dipping fault plane in meters, and determine the horizontal extension (heave $H$) associated with this faulting event (use $\\sin 45^\\circ = \\cos 45^\\circ \\approx 0.7071$).\n\nShow all steps of relative dating and trigonometric calculations.",
    "requiredKeywords": [
      "A -> B -> C -> Folding -> D -> U -> E -> F",
      "angular unconformity",
      "113.1",
      "80.0",
      "sin 45",
      "heave"
    ],
    "modelSolution": "1. Chronological Sequence (Oldest to Youngest):\n- Deposition of Sandstone A\n- Deposition of Limestone B\n- Deposition of Shale C\n- Compressional Folding Event (formation of anticline)\n- Intrusion and crystallization of vertical granite dyke D\n- Uplift, weathering, and erosion forming Unconformity U\n- Deposition of horizontal Conglomerate E\n- Extensional faulting along Normal Fault F\n\n2. Unconformity Classification:\nUnconformity U is an **angular unconformity** because the underlying Paleozoic strata (A, B, C) were folded and tilted prior to erosion, whereas the overlying Mesozoic Conglomerate layer E was deposited horizontally upon their truncated beveled edges.\n\n3. Fault Displacement Calculations:\nGiven: Dip angle $\\theta = 45^\\circ$, Vertical Throw $h = 80.0\\text{ m}$.\n$$\\text{Dip-slip displacement } S = \\frac{h}{\\sin 45^\\circ} = \\frac{80.0\\text{ m}}{0.7071} \\approx 113.14\\text{ m} \\text{ (or } 113.1\\text{ m)}$$\n$$\\text{Horizontal heave } H = \\frac{h}{\\tan 45^\\circ} = \\frac{80.0\\text{ m}}{1.0} = 80.0\\text{ m}$$"
  },
  {
    "id": "GCH-B-01",
    "field": "Geochemistry & geophysics",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Most Abundant Chemical Element in the Crust",
    "content": "Which chemical element represents the largest fraction of the Earth's continental crust by mass percentage (~46.6%)?",
    "options": [
      "Silicon (Si)",
      "Oxygen (O)",
      "Aluminum (Al)",
      "Iron (Fe)"
    ],
    "correctAnswer": "Oxygen (O)",
    "explanation": "Oxygen is by far the most abundant element in the Earth's crust by mass (~46.6%), followed by silicon (~27.7%), aluminum (~8.1%), and iron (~5.0%)."
  },
  {
    "id": "GCH-B-02",
    "field": "Geochemistry & geophysics",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Electrical Resistivity Contrast in Permafrost",
    "content": "How does the specific electrical resistivity ($\\rho$) of frozen permafrost compare with that of identical thawed water-bearing rocks?",
    "options": [
      "Significantly lower due to metallic conduction",
      "Substantially higher because liquid pore water freezes into non-conductive ice",
      "Exactly identical because the mineral framework is unchanged",
      "Fluctuates to zero due to superconductivity of ice crystals"
    ],
    "correctAnswer": "Substantially higher because liquid pore water freezes into non-conductive ice",
    "explanation": "In thawed rocks, electrical conduction occurs predominantly via electrolytic transport in liquid pore water. When rocks freeze, water transitions into ice, which has a very high resistivity ($10^5 - 10^7\\ \\Omega\\cdot\\text{m}$), causing bulk rock resistivity to increase by orders of magnitude."
  },
  {
    "id": "GCH-B-03",
    "field": "Geochemistry & geophysics",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Dielectric Permittivity of Geosphere Materials",
    "content": "In ground-penetrating radar (GPR) and geophysics, which of the following natural substances exhibits an exceptionally high relative dielectric permittivity ($\\varepsilon_r \\approx 80$ at $20^\\circ\\text{C}$)?",
    "options": [
      "Crude petroleum oil ($\\varepsilon_r \\approx 2 - 3$)",
      "Dry quartz sand ($\\varepsilon_r \\approx 3 - 5$)",
      "Liquid pure water ($\\varepsilon_r \\approx 80$)",
      "Granite bedrock ($\\varepsilon_r \\approx 5 - 7$)"
    ],
    "correctAnswer": "Liquid pure water ($\\varepsilon_r \\approx 80$)",
    "explanation": "Water molecules possess a permanent electrical dipole moment, endowing liquid water with an exceptionally high relative dielectric permittivity (~80-81), which dominates the electromagnetic velocity response in wet sedimentary media."
  },
  {
    "id": "GCH-B-04",
    "field": "Geochemistry & geophysics",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Electromagnetic Induction Geophysical Methods",
    "content": "Which geophysical exploration method utilizes time-varying artificial magnetic fields to induce secondary eddy currents in conductive ore bodies or saline aquifers?",
    "options": [
      "Seismic refraction method",
      "Electromagnetic (EM) induction method",
      "Gravity gradiometry method",
      "Radiometric spectrometry method"
    ],
    "correctAnswer": "Electromagnetic (EM) induction method",
    "explanation": "Electromagnetic (EM) prospecting uses Faraday's law of induction: a transmitter coil induces time-varying magnetic fields, generating eddy currents in conductive subsurface bodies, which emit secondary magnetic fields detected by a receiver coil."
  },
  {
    "id": "GCH-B-05",
    "field": "Geochemistry & geophysics",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Global Biogeochemical Carbon Reservoirs",
    "content": "Which planetary reservoir stores the greatest total quantity of carbon on Earth ($> 60,000,000\\text{ Gt C}$)?",
    "options": [
      "Atmosphere (carbon dioxide and methane)",
      "Terrestrial biosphere (vegetation biomass)",
      "Lithosphere (carbonate rocks such as limestone and sedimentary kerogen)",
      "Surface ocean mixed layer"
    ],
    "correctAnswer": "Lithosphere (carbonate rocks such as limestone and sedimentary kerogen)",
    "explanation": "Over 99.9% of global carbon is sequestered in the lithosphere in sedimentary rocks: marine carbonates (limestone, dolomite) contain ~60,000,000 Gt C, and kerogen/fossil fuels contain ~15,000,000 Gt C."
  },
  {
    "id": "GCH-B-06",
    "field": "Geochemistry & geophysics",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Radiometric Dating of Quaternary Carbon",
    "content": "Which cosmogenic radioisotope, having a half-life of $T_{1/2} \\approx 5,730\\text{ years}$, is universally employed to determine the absolute age of fossil organic matter up to ~50,000 years BP?",
    "options": [
      "Uranium-238 ($^{238}\\text{U}$)",
      "Potassium-40 ($^{40}\\text{K}$)",
      "Carbon-14 ($^{14}\\text{C}$)",
      "Rubidium-87 ($^{87}\\text{Rb}$)"
    ],
    "correctAnswer": "Carbon-14 ($^{14}\\text{C}$)",
    "explanation": "Radiocarbon dating measures the decay of cosmogenically produced Carbon-14 ($^{14}\\text{C}$) in dead organic materials, with a half-life of 5,730 years."
  },
  {
    "id": "GCH-B-07",
    "field": "Geochemistry & geophysics",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Seismic Wave Propagation in Fluid Media",
    "content": "Why are secondary shear waves (S-waves) incapable of propagating through the Earth's liquid outer core?",
    "options": [
      "Their wavelength exceeds the outer core radius",
      "Liquids possess zero shear modulus ($\\mu = 0$), preventing transverse shear wave transmission",
      "The high temperature ionizes the medium, absorbing acoustic waves",
      "Total internal reflection at the Moho discontinuity deflects all S-waves"
    ],
    "correctAnswer": "Liquids possess zero shear modulus ($\\mu = 0$), preventing transverse shear wave transmission",
    "explanation": "The velocity of S-waves is given by $V_s = \\sqrt{\\frac{\\mu}{\\rho}}$. Because fluids cannot sustain shear stress (shear modulus $\\mu = 0$), S-waves cannot propagate through liquid media."
  },
  {
    "id": "GCH-I-01",
    "field": "Geochemistry & geophysics",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Non-Ferromagnetic Rock-Forming Minerals (Select TWO)",
    "content": "Select TWO diamagnetic or weakly paramagnetic minerals that exhibit NO ferromagnetic or ferrimagnetic behavior:",
    "options": [
      "Magnetite ($Fe_3O_4$)",
      "Pyrrhotite ($Fe_{1-x}S$)",
      "Quartz ($SiO_2$)",
      "Plagioclase feldspar ($NaAlSi_3O_8 - CaAl_2Si_2O_8$)",
      "Titanomagnetite"
    ],
    "correctAnswer": [
      "Quartz ($SiO_2$)",
      "Plagioclase feldspar ($NaAlSi_3O_8 - CaAl_2Si_2O_8$)"
    ],
    "explanation": "Quartz and plagioclase are diamagnetic silicates with zero spontaneous magnetization. In contrast, magnetite, titanomagnetite, and pyrrhotite exhibit strong ferri- or ferromagnetism and carry natural remanent magnetization."
  },
  {
    "id": "GCH-I-02",
    "field": "Geochemistry & geophysics",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Anisotropic Apparent Resistivity of Layered Media",
    "content": "A horizontally layered sedimentary rock mass consists of alternating thin beds of sandstone (resistivity $\\rho_{\\text{sand}}$) and shale (resistivity $\\rho_{\\text{shale}}$) of equal layer thickness. By analogy with electrical networks (series vs parallel conduction), select the TWO correct mathematical expressions for the effective vertical ($\\rho_v$) and horizontal ($\\rho_h$) resistivities:",
    "options": [
      "$\\rho_v = 0.5 \\cdot (\\rho_{\\text{sand}} + \\rho_{\\text{shale}})$",
      "$\\rho_v = 2.0 \\cdot (\\rho_{\\text{sand}} + \\rho_{\\text{shale}})$",
      "$\\rho_h = \\frac{0.5}{1/\\rho_{\\text{sand}} + 1/\\rho_{\\text{shale}}}$",
      "$\\rho_h = \\frac{2.0}{1/\\rho_{\\text{sand}} + 1/\\rho_{\\text{shale}}}$",
      "$\\rho_h = \\rho_{\\text{sand}} \\cdot \\rho_{\\text{shale}}$"
    ],
    "correctAnswer": [
      "$\\rho_v = 0.5 \\cdot (\\rho_{\\text{sand}} + \\rho_{\\text{shale}})$",
      "$\\rho_h = \\frac{2.0}{1/\\rho_{\\text{sand}} + 1/\\rho_{\\text{shale}}}$"
    ],
    "explanation": "For current flowing vertically across layers, resistances add in series: $\\rho_v = \\frac{\\rho_1 + \\rho_2}{2} = 0.5(\\rho_{\\text{sand}} + \\rho_{\\text{shale}})$. For horizontal current flowing along bedding, conductivities add in parallel: $\\sigma_h = \\frac{\\sigma_1 + \\sigma_2}{2} \\implies \\rho_h = \\frac{2}{1/\\rho_{\\text{sand}} + 1/\\rho_{\\text{shale}}}$."
  },
  {
    "id": "GCH-I-03",
    "field": "Geochemistry & geophysics",
    "difficulty": "intermediate",
    "type": "short-answer",
    "points": 3,
    "title": "Geothermal Gradient Subsurface Temperature Calculation",
    "content": "A sedimentary basin has a constant surface mean annual temperature of $T_0 = +12.0^\\circ\\text{C}$ and a measured geothermal temperature gradient of $G = 30.0^\\circ\\text{C/km}$ ($0.030^\\circ\\text{C/m}$). Calculate the rock formation temperature at a borehole depth of $z = 2,800\\text{ m}$.\n\nEnter your answer as an exact integer or decimal in degrees Celsius (e.g., 96.0).",
    "correctAnswer": "96.0",
    "acceptableAnswers": [
      "96",
      "96.0",
      "96°C",
      "96 C"
    ],
    "explanation": "$T(z) = T_0 + G \\cdot z = 12.0^\\circ\\text{C} + (30.0^\\circ\\text{C/km} \\times 2.8\\text{ km}) = 12.0 + 84.0 = 96.0^\\circ\\text{C}$."
  },
  {
    "id": "GCH-I-04",
    "field": "Geochemistry & geophysics",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Well Logging Methods for Porosity and Permeability (Select TWO)",
    "content": "Select TWO geophysical borehole logging methods primarily used to identify permeable porous reservoir intervals and differentiate shale from clean sandstones:",
    "options": [
      "Natural Gamma Ray (GR) log",
      "Spontaneous Potential (SP) log",
      "Magnetic susceptibility surface survey",
      "Satellite altimetry profiling"
    ],
    "correctAnswer": [
      "Natural Gamma Ray (GR) log",
      "Spontaneous Potential (SP) log"
    ],
    "explanation": "Natural Gamma Ray logs measure radioactivity from potassium, thorium, and uranium to identify impermeable shales (high GR) versus clean permeable sandstones (low GR). Spontaneous Potential (SP) logs detect electrochemical potentials generated across permeable formations opposite drilling mud."
  },
  {
    "id": "GCH-A-01",
    "field": "Geochemistry & geophysics",
    "difficulty": "advanced",
    "type": "extended-response",
    "points": 10,
    "title": "Pyrite Weathering Stoichiometry and Acid Neutralization with Slaked Lime",
    "content": "During environmental remediation of an abandoned polymetallic coal and sulfide mine, acidic leachate (Acid Mine Drainage, AMD) is produced by the oxidative weathering of pyrite ($\\text{FeS}_2$) within waste rock spoil dumps according to the balanced reaction:\n$$2\\text{FeS}_2 + 7\\text{O}_2 + 2\\text{H}_2\\text{O} \\longrightarrow 2\\text{FeSO}_4 + 2\\text{H}_2\\text{SO}_4$$\n\nIn an excavated waste dump with a total mass of $5.0\\text{ metric tonnes}$ ($5,000\\text{ kg}$), mineralogical assay determines that the pyrite content is $2.40\\%$ by mass. Assume complete oxidation of all pyrite, and that all produced sulfuric acid dissolves completely into the runoff.\n\n**Given Molar Masses:**\n- $\\text{FeS}_2 = 120.0\\text{ g/mol}$\n- $\\text{H}_2\\text{SO}_4 = 98.0\\text{ g/mol}$\n- $\\text{Ca(OH)}_2 = 74.0\\text{ g/mol}$\n- $\\text{O} = 16.0\\text{ g/mol}$, $\\text{S} = 32.0\\text{ g/mol}$, $\\text{Fe} = 56.0\\text{ g/mol}$, $\\text{Ca} = 40.0\\text{ g/mol}$\n\n**Tasks:**\n1. Identify the oxidizing agent and the reducing agent in the oxidation reaction. Justify your selection using changes in element oxidation states.\n2. Calculate the total mass of sulfuric acid ($\\text{H}_2\\text{SO}_4$) in kilograms generated by the complete oxidation of the pyrite present in this $5.0\\text{-tonne}$ dump.\n3. To neutralize the acidic runoff, slaked lime ($\\text{Ca(OH)}_2$) is introduced. Write the balanced neutralization reaction equation, and calculate the theoretical stoichiometric mass of pure slaked lime in kilograms required to neutralize the generated acid completely.\n\nProvide full stoichiometric steps, molar conversions, and clear chemical equations.",
    "requiredKeywords": [
      "O2",
      "FeS2",
      "0 to -2",
      "-1 to +6",
      "98.0",
      "74.0",
      "Ca(OH)2 + H2SO4 -> CaSO4 + 2H2O"
    ],
    "modelSolution": "1. Redox Identification:\n- **Oxidizing Agent:** Molecular oxygen ($\\text{O}_2$). The oxidation state of oxygen decreases from $0$ in $\\text{O}_2$ to $-2$ in $\\text{FeSO}_4$ and $\\text{H}_2\\text{SO}_4$ (reduction).\n- **Reducing Agent:** Pyrite ($\\text{FeS}_2$), specifically sulfur. In the disulfide ion ($S_2^{2-}$), sulfur has an oxidation state of $-1$, which increases to $+6$ in the sulfate ion ($SO_4^{2-}$), losing electrons (oxidation). Iron maintains its $+2$ oxidation state.\n\n2. Calculation of Sulfuric Acid Mass:\n$$\\text{Mass of pyrite in dump } m(\\text{FeS}_2) = 5,000\\text{ kg} \\times 0.024 = 120.0\\text{ kg} = 120,000\\text{ g}$$\n$$\\text{Moles of pyrite } n(\\text{FeS}_2) = \\frac{120,000\\text{ g}}{120.0\\text{ g/mol}} = 1,000.0\\text{ mol}$$\nFrom stoichiometry ($2\\text{ mol FeS}_2 \\to 2\\text{ mol H}_2\\text{SO}_4$, i.e., $1:1$ molar ratio):\n$$n(\\text{H}_2\\text{SO}_4) = 1,000.0\\text{ mol}$$\n$$m(\\text{H}_2\\text{SO}_4) = 1,000.0\\text{ mol} \\times 98.0\\text{ g/mol} = 98,000\\text{ g} = 98.0\\text{ kg}$$\n\n3. Neutralization with Slaked Lime:\nBalanced equation:\n$$\\text{H}_2\\text{SO}_4 + \\text{Ca(OH)}_2 \\longrightarrow \\text{CaSO}_4\\downarrow + 2\\text{H}_2\\text{O}$$\nStoichiometric ratio is $1:1$:\n$$n(\\text{Ca(OH)}_2) = n(\\text{H}_2\\text{SO}_4) = 1,000.0\\text{ mol}$$\n$$\\text{Mass of pure slaked lime } m(\\text{Ca(OH)}_2) = 1,000.0\\text{ mol} \\times 74.0\\text{ g/mol} = 74,000\\text{ g} = 74.0\\text{ kg}$$\n\n**Final Answers:**\n- Oxidizing Agent: $\\text{O}_2$ ($0 \\to -2$), Reducing Agent: $\\text{FeS}_2$ / sulfur ($-1 \\to +6$)\n- Mass of $\\text{H}_2\\text{SO}_4$: $98.0\\text{ kg}$\n- Mass of $\\text{Ca(OH)}_2$: $74.0\\text{ kg}$"
  },
  {
    "id": "MIN-B-01",
    "field": "Mining & mineral processing",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Petrogenetic Classification of Marble",
    "content": "From the standpoint of genetic rock classification, marble is categorized as which type of rock, formed by the thermal or regional recrystallization of limestone or dolostone?",
    "options": [
      "Metamorphic rock",
      "Clastic sedimentary rock",
      "Extrusive igneous rock",
      "Chemical evaporite rock"
    ],
    "correctAnswer": "Metamorphic rock",
    "explanation": "Marble is a metamorphic rock formed when carbonate sedimentary rocks (limestone or dolomite) undergo recrystallization under elevated temperature and lithostatic pressure."
  },
  {
    "id": "MIN-B-02",
    "field": "Mining & mineral processing",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Ore Body Reserve Volume Calculation",
    "content": "An exploration block between two parallel drill-hole cross-sections is surveyed. The cross-sectional ore area of the first section is $S_1 = 16.0\\text{ m}^2$, and the second is $S_2 = 9.0\\text{ m}^2$. The perpendicular distance between the sections is $L = 0.20\\text{ km}$ ($200\\text{ m}$). Using the standard average end-area formula ($V = \\frac{S_1 + S_2}{2} \\cdot L$), what is the estimated ore body volume?",
    "options": [
      "$1,250\\text{ m}^3$",
      "$2,500\\text{ m}^3$",
      "$5,000\\text{ m}^3$",
      "$25,000\\text{ m}^3$"
    ],
    "correctAnswer": "$2,500\\text{ m}^3$",
    "explanation": "$V = \\frac{16.0 + 9.0}{2} \\times 200\\text{ m} = 12.5 \\times 200 = 2,500\\text{ m}^3$."
  },
  {
    "id": "MIN-B-03",
    "field": "Mining & mineral processing",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Physical Principles in Diamond Beneficiation",
    "content": "Which physical property is exploited in the primary concentration of diamonds from kimberlite ores, where diamonds adhere to a specialized moving greasy surface while gangue minerals are washed away?",
    "options": [
      "Ferromagnetic susceptibility",
      "Hydrophobic surface affinity for grease (oleophilic property)",
      "High electrical conductivity",
      "Rapid dissolution in acid"
    ],
    "correctAnswer": "Hydrophobic surface affinity for grease (oleophilic property)",
    "explanation": "Diamonds are naturally hydrophobic and oleophilic (grease-loving). On grease tables or grease belts, diamond crystals selectively adhere to petrolatum grease while hydrophilic silicate gangue minerals wash off with water."
  },
  {
    "id": "MIN-B-04",
    "field": "Mining & mineral processing",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Sulfate Phase Transformation and Dehydration",
    "content": "The mineral transformation process wherein gypsum ($CaSO_4 \\cdot 2H_2O$) loses its crystal water under elevated temperature and burial pressure to form anhydrite ($CaSO_4$) is designated as:",
    "options": [
      "Dehydration",
      "Hydration",
      "Carbonation",
      "Hydrolysis"
    ],
    "correctAnswer": "Dehydration",
    "explanation": "Gypsum ($CaSO_4 \\cdot 2H_2O$) transitions to anhydrite ($CaSO_4$) via dehydration: $CaSO_4 \\cdot 2H_2O \\longrightarrow CaSO_4 + 2H_2O$."
  },
  {
    "id": "MIN-B-05",
    "field": "Mining & mineral processing",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Global Hydrocarbon Resource Leaders",
    "content": "Which of the following nations ranks among the world's top two annual producers of natural gas alongside the United States?",
    "options": [
      "Russia",
      "India",
      "Germany",
      "France"
    ],
    "correctAnswer": "Russia",
    "explanation": "The United States and the Russian Federation are the world's two largest producers of natural gas, together accounting for over 40% of global output."
  },
  {
    "id": "MIN-B-06",
    "field": "Mining & mineral processing",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Froth Flotation Physico-Chemical Principles",
    "content": "In mineral froth flotation, chemical reagents known as 'collectors' (such as potassium amyl xanthate) are added to the mineral pulp primarily to:",
    "options": [
      "Increase the solubility of gangue minerals in acid",
      "Selectively coat target sulfide mineral surfaces to render them hydrophobic",
      "Suppress air bubble generation in the flotation cell",
      "Neutralize the electrostatic charge of all suspended particles"
    ],
    "correctAnswer": "Selectively coat target sulfide mineral surfaces to render them hydrophobic",
    "explanation": "Collectors are heteropolar organic molecules whose polar heads adsorb onto specific mineral surfaces while non-polar hydrocarbon tails face outward, rendering the mineral surface hydrophobic so it attaches to ascending air bubbles."
  },
  {
    "id": "MIN-B-07",
    "field": "Mining & mineral processing",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Open-Pit Geomechanical Bench Stability Hazards",
    "content": "In open-pit mine engineering, a geomechanical failure where an entire rock mass slides downward along a continuous structural discontinuity (such as a bedding plane dipping daylighting into the pit) is termed:",
    "options": [
      "Planar slope failure",
      "Liquefaction boiling",
      "Salt diapirism",
      "Subsidence sinkhole"
    ],
    "correctAnswer": "Planar slope failure",
    "explanation": "Planar slope failure occurs in pit walls when a persistent geological discontinuity plane strikes roughly parallel to the slope face and dips into the pit at an angle steeper than its friction angle."
  },
  {
    "id": "MIN-I-01",
    "field": "Mining & mineral processing",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Base Metals Primarily Extracted from Sulfide Ores (Select TWO)",
    "content": "Select TWO non-ferrous metals that are commercially extracted primarily from natural sulfide ore minerals rather than oxides or silicates:",
    "options": [
      "Copper (from chalcopyrite, $CuFeS_2$)",
      "Aluminum (from bauxite gibbsite, $Al(OH)_3$)",
      "Molybdenum (from molybdenite, $MoS_2$)",
      "Iron (from hematite, $Fe_2O_3$)",
      "Titanium (from rutile, $TiO_2$)"
    ],
    "correctAnswer": [
      "Copper (from chalcopyrite, $CuFeS_2$)",
      "Molybdenum (from molybdenite, $MoS_2$)"
    ],
    "explanation": "Copper is predominantly extracted from chalcopyrite ($CuFeS_2$) and chalcocite ($Cu_2S$). Molybdenum is sourced almost exclusively from molybdenite ($MoS_2$). In contrast, aluminum, iron, and titanium are extracted from oxide minerals."
  },
  {
    "id": "MIN-I-02",
    "field": "Mining & mineral processing",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Top Global Gold Mining Nations (Select TWO)",
    "content": "Select TWO countries that consistently rank among the world's leading gold mining producers by annual metric tonnes of refined gold output:",
    "options": [
      "China",
      "Russia",
      "India",
      "Germany",
      "Japan"
    ],
    "correctAnswer": [
      "China",
      "Russia"
    ],
    "explanation": "China (annual production ~370-380 tonnes) and Russia (~310-330 tonnes) rank alongside Australia among the world's top three gold mining nations."
  },
  {
    "id": "MIN-I-03",
    "field": "Mining & mineral processing",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Environmental Consequences of Mining Operations (Select ALL that apply)",
    "content": "Which of the following phenomena are recognized geo-ecological and environmental impacts resulting from large-scale mining and mineral processing? Select ALL that apply.",
    "options": [
      "Formation of massive anthropogenic landforms (waste rock dumps, tailing impoundments)",
      "Generation of acid rock drainage (ARD) contaminating surface and groundwater systems",
      "Lowering of the regional groundwater table due to pit dewatering cones of depression",
      "Immediate enhancement of natural soil fertility across adjoining agricultural land",
      "Release of toxic heavy metals into aquatic ecosystems via tailings leachate"
    ],
    "correctAnswer": [
      "Formation of massive anthropogenic landforms (waste rock dumps, tailing impoundments)",
      "Generation of acid rock drainage (ARD) contaminating surface and groundwater systems",
      "Lowering of the regional groundwater table due to pit dewatering cones of depression",
      "Release of toxic heavy metals into aquatic ecosystems via tailings leachate"
    ],
    "explanation": "Mining creates severe environmental impacts including tailing dumps, acid drainage, groundwater table depletion, and heavy metal pollution. It degrades rather than enhances soil fertility."
  },
  {
    "id": "MIN-I-04",
    "field": "Mining & mineral processing",
    "difficulty": "intermediate",
    "type": "short-answer",
    "points": 3,
    "title": "Economic Cut-Off Grade Determination",
    "content": "A copper deposit is evaluated for open-pit mining. The total operating cost (mining, milling, administration, and environmental compliance) is $C = 40.00\\text{ USD}$ per tonne of run-of-mine ore. The net realized market price for payable copper is $P = 8,000.00\\text{ USD}$ per tonne of pure copper metal. The overall metallurgical recovery rate is $\\eta = 80.0\\%$ ($0.80$).\n\nCalculate the break-even cut-off grade ($x_c = \\frac{C}{P \\cdot \\eta}$) expressed as a mass percentage ($\\text{wt}\\%$). Enter your answer as a percentage number (e.g., 0.625).",
    "correctAnswer": "0.625",
    "acceptableAnswers": [
      "0.625",
      "0.625%"
    ],
    "explanation": "Cut-off grade fraction $x_c = \\frac{40.00\\text{ USD/t}}{8000.00\\text{ USD/t} \\times 0.80} = \\frac{40.00}{6400.00} = 0.00625$. In percent: $0.00625 \\times 100\\% = 0.625\\%$."
  },
  {
    "id": "MIN-A-01",
    "field": "Mining & mineral processing",
    "difficulty": "advanced",
    "type": "extended-response",
    "points": 10,
    "title": "Net Smelter Return (NSR) and Polymetallic Ore Valuation",
    "content": "A quartz-sulfide polymetallic vein deposit containing gold and silver is evaluated to establish feasibility and economic cut-off grade. The Net Smelter Return (NSR) per tonne of run-of-mine ore must be determined.\n\n**Geological and Metallurgical Baseline Parameters:**\n- Ore precious metal grades: Gold $C_{\\text{Au}} = 6.50\\text{ g/t}$; Silver $C_{\\text{Ag}} = 45.00\\text{ g/t}$\n- Metallurgical plant recovery: Gold $\\eta_{\\text{Au}} = 90.0\\%$ ($0.90$); Silver $\\eta_{\\text{Ag}} = 80.0\\%$ ($0.80$)\n- Smelter payable metal terms (contractual share paid): $\\text{Payable}_{\\text{Au}} = 96.0\\%$ ($0.96$); $\\text{Payable}_{\\text{Ag}} = 90.0\\%$ ($0.90$)\n- Market commodity prices: Gold $P_{\\text{Au}} = 70.00\\text{ USD/g}$; Silver $P_{\\text{Ag}} = 0.85\\text{ USD/g}$\n- Mining and milling operating costs: $24.50\\text{ USD/t}$\n- Concentrate transport, freight insurance, and refinery penalties: $6.20\\text{ USD/t}$\n\n**Tasks:**\n1. Calculate the recoverable masses of gold ($m_{\\text{Au,rec}}$) and silver ($m_{\\text{Ag,rec}}$) per tonne of ore in grams.\n2. Calculate the payable masses of gold ($m_{\\text{Au,pay}}$) and silver ($m_{\\text{Ag,pay}}$) per tonne of ore in grams.\n3. Calculate the revenue generated per tonne of ore from gold ($R_{\\text{Au}}$) and silver ($R_{\\text{Ag}}$), and determine the gross revenue ($R_{\\text{gross}}$) in $\\text{USD/t}$.\n4. Calculate the Net Smelter Return (NSR) per tonne of ore in $\\text{USD/t}$ after subtracting all specified deductions.\n\nPerform calculations without intermediate rounding; round final answers to two decimal places.",
    "requiredKeywords": [
      "5.85",
      "36.0",
      "5.616",
      "32.4",
      "393.12",
      "27.54",
      "420.66",
      "30.70",
      "389.96"
    ],
    "modelSolution": "1. Recoverable Metal Masses:\n$$m_{\\text{Au,rec}} = C_{\\text{Au}} \\times \\eta_{\\text{Au}} = 6.50\\text{ g/t} \\times 0.90 = 5.850\\text{ g/t}$$\n$$m_{\\text{Ag,rec}} = C_{\\text{Ag}} \\times \\eta_{\\text{Ag}} = 45.00\\text{ g/t} \\times 0.80 = 36.000\\text{ g/t}$$\n\n2. Payable Metal Masses:\n$$m_{\\text{Au,pay}} = m_{\\text{Au,rec}} \\times 0.96 = 5.850 \\times 0.96 = 5.616\\text{ g/t}$$\n$$m_{\\text{Ag,pay}} = m_{\\text{Ag,rec}} \\times 0.90 = 36.000 \\times 0.90 = 32.400\\text{ g/t}$$\n\n3. Revenue and Gross Income:\n$$R_{\\text{Au}} = m_{\\text{Au,pay}} \\times P_{\\text{Au}} = 5.616\\text{ g/t} \\times 70.00\\text{ USD/g} = 393.12\\text{ USD/t}$$\n$$R_{\\text{Ag}} = m_{\\text{Ag,pay}} \\times P_{\\text{Ag}} = 32.400\\text{ g/t} \\times 0.85\\text{ USD/g} = 27.54\\text{ USD/t}$$\n$$R_{\\text{gross}} = R_{\\text{Au}} + R_{\\text{Ag}} = 393.12 + 27.54 = 420.66\\text{ USD/t}$$\n\n4. Net Smelter Return (NSR):\n$$\\text{Total Deductions } C_{\\text{ded}} = 24.50 + 6.20 = 30.70\\text{ USD/t}$$\n$$\\text{NSR} = R_{\\text{gross}} - C_{\\text{ded}} = 420.66 - 30.70 = 389.96\\text{ USD/t}$$\n\n**Final NSR Value:** $389.96\\text{ USD/t}$"
  },
  {
    "id": "ECO-B-01",
    "field": "Ecology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Orbital Cycles and Paleoclimate Forcing",
    "content": "Milankovitch cycles explain long-term glacial-interglacial cycles through variations in Earth's orbital geometry. Which orbital parameter has a dominant cyclicity of approximately 41,000 years, altering high-latitude seasonal insolation contrasts?",
    "options": [
      "Orbital eccentricity (~100,000 and ~400,000 years)",
      "Axial obliquity (tilt of rotational axis, ~41,000 years)",
      "Axial precession of equinoxes (~23,000 years)",
      "Apsidal precession (~112,000 years)"
    ],
    "correctAnswer": "Axial obliquity (tilt of rotational axis, ~41,000 years)",
    "explanation": "Earth's axial tilt (obliquity) varies between ~22.1° and 24.5° with a period of ~41,000 years, strongly regulating the intensity of high-latitude summer insolation."
  },
  {
    "id": "ECO-B-02",
    "field": "Ecology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Natural Resource Classification",
    "content": "Which of the following natural geological resources is classified strictly as non-renewable due to its rate of geological formation taking millions of years?",
    "options": [
      "Timber and forest biomass",
      "Bituminous coal and petroleum deposits",
      "Geothermal hot spring energy",
      "Freshwater in the hydrologic cycle"
    ],
    "correctAnswer": "Bituminous coal and petroleum deposits",
    "explanation": "Fossil fuels (coal, petroleum, natural gas) are finite non-renewable geological stocks whose formation timescale (~tens to hundreds of millions of years) is infinitely slower than human consumption rates."
  },
  {
    "id": "ECO-B-03",
    "field": "Ecology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Natural Sources of Atmospheric Particulates",
    "content": "Which of the following atmospheric aerosol emission sources is entirely natural in origin rather than anthropogenic?",
    "options": [
      "Exhaust particulate matter from diesel motor vehicles",
      "Volcanic ash and explosive ejecta columns",
      "Emissions from municipal solid waste incinerators",
      "Fly ash from coal-fired electrical power stations"
    ],
    "correctAnswer": "Volcanic ash and explosive ejecta columns",
    "explanation": "Volcanic ash, mineral dust blown from arid deserts, and sea-salt spray are classic natural sources of atmospheric aerosols, whereas vehicular and power plant emissions are anthropogenic."
  },
  {
    "id": "ECO-B-04",
    "field": "Ecology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Atmospheric Boundary Layer Dispersion Factors",
    "content": "Which meteorological variable exerts the most decisive control over both the horizontal advection velocity and downwind plume trajectory of pollutants emitted in the planetary boundary layer?",
    "options": [
      "Atmospheric relative humidity",
      "Horizontal wind speed and direction vector",
      "Total cloud cover fraction",
      "Geomagnetic flux density"
    ],
    "correctAnswer": "Horizontal wind speed and direction vector",
    "explanation": "According to Gaussian plume dispersion models, the direction of the wind vector determines plume path, while wind velocity inversely determines downwind dilution ($C \\propto \\frac{1}{u}$)."
  },
  {
    "id": "ECO-B-05",
    "field": "Ecology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Ecological Niche Concept",
    "content": "The multidimensional hypervolume of abiotic conditions and biotic resources within which a biological species can survive, grow, and reproduce indefinitely is defined by G.E. Hutchinson as the:",
    "options": [
      "Trophic pyramid",
      "Ecological niche",
      "Biomass standing crop",
      "Ecotone buffer"
    ],
    "correctAnswer": "Ecological niche",
    "explanation": "G.E. Hutchinson formalized the ecological niche as an n-dimensional hypervolume of environmental variables (temperature, pH, food size, moisture) within which a species maintains viable population fitness."
  },
  {
    "id": "ECO-B-06",
    "field": "Ecology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Autotrophic Foundation in Terrestrial Ecosystems",
    "content": "In terrestrial forest and grassland biomes, which functional group occupies the base of the Eltonian trophic pyramid by directly synthesizing organic matter from atmospheric $CO_2$ and water?",
    "options": [
      "Saprotrophic fungi",
      "Herbivorous primary consumers",
      "Photoautotrophic vascular plants",
      "Detritivorous earthworms"
    ],
    "correctAnswer": "Photoautotrophic vascular plants",
    "explanation": "Photoautotrophic plants are the primary producers that harvest solar electromagnetic energy via chlorophyll photosynthesis, transforming radiant energy into biochemical enthalpy."
  },
  {
    "id": "ECO-B-07",
    "field": "Ecology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Logistic Population Growth and Environmental Resistance",
    "content": "In the Verhulst-Pearl logistic growth equation ($\\frac{dN}{dt} = rN\\left(1 - \\frac{N}{K}\\right)$), what does the parameter $K$ represent?",
    "options": [
      "Intrinsic per capita growth rate under unlimited resources",
      "Environmental carrying capacity (maximum sustainable population size)",
      "Inflection point where mortality reaches $100\\%$",
      "Minimum viable population size for avoiding inbreeding depression"
    ],
    "correctAnswer": "Environmental carrying capacity (maximum sustainable population size)",
    "explanation": "In logistic growth models, $K$ represents the carrying capacity—the maximum population density that the resources of the environment can sustain over time."
  },
  {
    "id": "ECO-I-01",
    "field": "Ecology",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Consequences of Unsustainable Environmental Exploitation (Select TWO)",
    "content": "Select TWO primary ecological consequences resulting directly from unsustainable natural resource management and deforestation:",
    "options": [
      "Acceleration of topsoil erosion and desertification",
      "Rapid expansion of climax virgin old-growth forests",
      "Extinction and loss of endemic biological taxa",
      "Decrease in global anthropogenic greenhouse gas concentrations",
      "Enhanced natural attenuation capacity of river basins"
    ],
    "correctAnswer": [
      "Acceleration of topsoil erosion and desertification",
      "Extinction and loss of endemic biological taxa"
    ],
    "explanation": "Unsustainable land use and deforestation remove stabilizing root networks and canopy cover, precipitating severe topsoil loss, desertification, habitat fragmentation, and species extinction."
  },
  {
    "id": "ECO-I-02",
    "field": "Ecology",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Mechanisms of Heavy Metal Phytotoxicity (Select ALL that apply)",
    "content": "Which of the following cellular mechanisms explain the toxic physiological effects of excessive heavy metal cations (e.g., $Cd^{2+}, Pb^{2+}, Hg^{2+}$) on vascular plant tissues? Select ALL that apply.",
    "options": [
      "Disruption of cell membrane semi-permeability and electrolyte leakage",
      "Competitive substitution for essential functional metal cofactors (e.g., displacing $Mg^{2+}$ in chlorophyll or $Zn^{2+}$ in enzymes)",
      "Affinity for sulfhydryl ($-SH$) functional groups, causing enzyme inactivation and denaturation",
      "Immediate stimulation of unrestricted photosynthetic carbon fixation",
      "Induction of oxidative stress through generation of reactive oxygen species (ROS)"
    ],
    "correctAnswer": [
      "Disruption of cell membrane semi-permeability and electrolyte leakage",
      "Competitive substitution for essential functional metal cofactors (e.g., displacing $Mg^{2+}$ in chlorophyll or $Zn^{2+}$ in enzymes)",
      "Affinity for sulfhydryl ($-SH$) functional groups, causing enzyme inactivation and denaturation",
      "Induction of oxidative stress through generation of reactive oxygen species (ROS)"
    ],
    "explanation": "Toxic metals induce oxidative stress, denature functional enzymes by binding sulfhydryl groups, displace vital cofactors ($Mg, Fe, Zn$), and damage plasma membranes. They severely inhibit rather than stimulate photosynthesis."
  },
  {
    "id": "ECO-I-03",
    "field": "Ecology",
    "difficulty": "intermediate",
    "type": "short-answer",
    "points": 3,
    "title": "Trophic Energy Transfer Efficiency Calculation",
    "content": "In a temperate lacustrine ecosystem, the Net Primary Productivity (NPP) of phytoplankton is measured at $25,000\\text{ kJ/(m}^2\\cdot\\text{year)}$. Assuming an average Lindeman trophic transfer efficiency of exactly $10.0\\%$ ($0.10$) across each successive trophic level step (phytoplankton $\\longrightarrow$ zooplankton herbivore $\\longrightarrow$ small planktivorous fish $\\longrightarrow$ apex piscivore fish):\n\nCalculate the annual energy available to the apex piscivore fish (trophic level 4) in $\\text{kJ/(m}^2\\cdot\\text{year)}$. Enter your numeric answer as a whole integer or decimal (e.g., 25.0).",
    "correctAnswer": "25.0",
    "acceptableAnswers": [
      "25",
      "25.0",
      "25 kJ"
    ],
    "explanation": "Trophic step 1 (producers): 25,000 kJ. Trophic step 2 (herbivores): $25,000 \\times 0.10 = 2,500\\text{ kJ}$. Trophic step 3 (primary carnivores): $2,500 \\times 0.10 = 250\\text{ kJ}$. Trophic step 4 (apex predators): $250 \\times 0.10 = 25.0\\text{ kJ/(m}^2\\cdot\\text{year)}$."
  },
  {
    "id": "ECO-I-04",
    "field": "Ecology",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Regulating Ecosystem Services (Select TWO)",
    "content": "Under the international classification of the Millennium Ecosystem Assessment (MEA), select TWO ecosystem services categorized as 'Regulating Services' (benefits obtained from the regulation of ecosystem processes):",
    "options": [
      "Timber harvested for residential construction",
      "Climate regulation via biospheric carbon sequestration in peatlands and forests",
      "Attenuation of peak storm surges and flood waves by coastal mangrove wetlands",
      "Mineral ores extracted for industrial metallurgy",
      "Spiritual and aesthetic inspiration derived from wilderness landscapes"
    ],
    "correctAnswer": [
      "Climate regulation via biospheric carbon sequestration in peatlands and forests",
      "Attenuation of peak storm surges and flood waves by coastal mangrove wetlands"
    ],
    "explanation": "Regulating services include carbon sequestration, flood attenuation, water purification, and pollination. Timber and minerals are provisioning services, and aesthetic inspiration is a cultural service."
  },
  {
    "id": "ECO-A-01",
    "field": "Ecology",
    "difficulty": "advanced",
    "type": "extended-response",
    "points": 10,
    "title": "Lake Eutrophication and Steady-State Phosphorus Balance Model",
    "content": "A shallow freshwater lake is subject to cultural eutrophication from agricultural non-point fertilizer runoff. To formulate a restoration strategy, an environmental engineer applies the **Vollenweider steady-state mass balance model** for total phosphorus (TP):\n\n$$V \\cdot \\frac{d[P]}{dt} = W - Q \\cdot [P] - v_s \\cdot A_s \\cdot [P]$$\n\nAt steady state ($\\frac{d[P]}{dt} = 0$), the lake equilibrium phosphorus concentration is:\n$$[P] = \\frac{W}{Q + v_s \\cdot A_s} = \\frac{L_p}{q_s + v_s}$$\n\n**Morphometric and Hydrologic Parameters:**\n- Lake surface area: $A_s = 20.0\\text{ km}^2 = 20.0 \\times 10^6\\text{ m}^2$\n- Lake water volume: $V = 1.0 \\times 10^8\\text{ m}^3$\n- Mean lake depth: $\\bar{z} = \\frac{V}{A_s} = 5.0\\text{ m}$\n- Annual tributary inflow/outflow rate: $Q = 2.0 \\times 10^7\\text{ m}^3\\text{/year}$\n- Annual total external phosphorus loading: $W = 3,000.0\\text{ kg/year} = 3.0 \\times 10^9\\text{ mg/year}$\n- Apparent phosphorus net settling velocity: $v_s = 10.0\\text{ m/year}$\n\n**Tasks:**\n1. Calculate the hydraulic residence time ($\\tau_w = \\frac{V}{Q}$) of the lake in years, and determine the areal hydraulic surface loading rate ($q_s = \\frac{Q}{A_s}$) in $\\text{m/year}$.\n2. Calculate the areal total phosphorus loading rate ($L_p = \\frac{W}{A_s}$) in $\\text{mg/(m}^2\\cdot\\text{year)}$.\n3. Calculate the steady-state equilibrium total phosphorus concentration ($[P]$) within the lake water column in milligrams per cubic meter ($\\text{mg/m}^3$, equivalent to $\\mu\\text{g/L}$).\n4. Based on OECD limnological threshold criteria:\n   - Oligotrophic: $[P] < 10\\ \\mu\\text{g/L}$\n   - Mesotrophic: $10 \\le [P] \\le 35\\ \\mu\\text{g/L}$\n   - Eutrophic: $35 < [P] \\le 100\\ \\mu\\text{g/L}$\n   - Hypereutrophic: $[P] > 100\\ \\mu\\text{g/L}$\n   Classify the trophic status of this lake and suggest one catchment management intervention to mitigate cyanobacterial blooms.\n\nShow complete mathematical derivation, dimensional consistency, and clear conclusions.",
    "requiredKeywords": [
      "5.0",
      "1.0",
      "150",
      "13.6",
      "mesotrophic",
      "nutrient reduction"
    ],
    "modelSolution": "1. Hydraulic Parameters:\n$$\\tau_w = \\frac{V}{Q} = \\frac{1.0 \\times 10^8\\text{ m}^3}{2.0 \\times 10^7\\text{ m}^3\\text{/year}} = 5.0\\text{ years}$$\n$$q_s = \\frac{Q}{A_s} = \\frac{2.0 \\times 10^7\\text{ m}^3\\text{/year}}{20.0 \\times 10^6\\text{ m}^2} = 1.0\\text{ m/year}$$\n\n2. Areal Phosphorus Loading ($L_p$):\n$$L_p = \\frac{W}{A_s} = \\frac{3.0 \\times 10^9\\text{ mg/year}}{20.0 \\times 10^6\\text{ m}^2} = 150.0\\text{ mg/(m}^2\\cdot\\text{year)}$$\n\n3. Steady-State Equilibrium Phosphorus Concentration ($[P]$):\n$$[P] = \\frac{L_p}{q_s + v_s} = \\frac{150.0\\text{ mg/(m}^2\\cdot\\text{year)}}{(1.0 + 10.0)\\text{ m/year}} = \\frac{150.0}{11.0} \\approx 13.64\\text{ mg/m}^3\\text{ (or } 13.64\\ \\mu\\text{g/L)}$$\n\n4. Trophic Classification and Management:\nBecause $10\\ \\mu\\text{g/L} \\le [P] = 13.64\\ \\mu\\text{g/L} \\le 35\\ \\mu\\text{g/L}$, the lake is classified as **Mesotrophic** (approaching moderate productivity).\nTo prevent shift towards eutrophy, recommended catchment measures include establishing riparian vegetative buffer strips along agricultural tributaries to trap sediment-bound phosphorus, and optimizing precision agricultural fertilizer application rates."
  },
  {
    "id": "ENV-B-01",
    "field": "Environmental sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Ecological Factors Limiting Arctic Tree Growth",
    "content": "Why is the polar and alpine tundra biome devoid of arboreal forest vegetation (trees), being dominated instead by dwarf shrubs, mosses, and lichens?",
    "options": [
      "Excessive accumulation of toxic heavy metals in the permafrost",
      "Presence of continuous permafrost with a shallow active thaw layer, low soil temperatures, and a critically short growing season",
      "Complete absence of solar illumination for 12 continuous months",
      "High atmospheric salinity carried by Arctic blizzards"
    ],
    "correctAnswer": "Presence of continuous permafrost with a shallow active thaw layer, low soil temperatures, and a critically short growing season",
    "explanation": "In tundra biomes, tree growth is prevented by permafrost: the subsoil remains permanently frozen, leaving only a thin active layer (tens of centimeters) in summer that cannot accommodate deep tree root systems, compounded by low heat sums."
  },
  {
    "id": "ENV-B-02",
    "field": "Environmental sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Regional Forest Land Cover Proportion Calculation",
    "content": "A regional land-use cadastral survey establishes that out of a total administrative area of $12,500\\text{ km}^2$, forests occupy an aggregate area of $2,250\\text{ km}^2$. What is the forest cover ratio of this region expressed as a percentage?",
    "options": [
      "$12.0\\%$",
      "$15.5\\%$",
      "$18.0\\%$",
      "$22.5\\%$"
    ],
    "correctAnswer": "$18.0\\%$",
    "explanation": "Proportion $= \\frac{2,250\\text{ km}^2}{12,500\\text{ km}^2} = 0.180 = 18.0\\%$."
  },
  {
    "id": "ENV-B-03",
    "field": "Environmental sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Biogeochemical Denitrification Pathway",
    "content": "In the global biogeochemical nitrogen cycle, which oxidized chemical species serves as the primary electron acceptor reduced by facultative anaerobic bacteria (such as *Pseudomonas*) during denitrification to produce molecular nitrogen ($N_2$)?",
    "options": [
      "Ammonium ion ($NH_4^+$)",
      "Nitrate ion ($NO_3^-$)",
      "Organic amino acids",
      "Urea ($CO(NH_2)_2$)"
    ],
    "correctAnswer": "Nitrate ion ($NO_3^-$)",
    "explanation": "Denitrification is an anaerobic microbial respiratory pathway: $NO_3^- \\to NO_2^- \\to NO \\to N_2O \\to N_2$, in which nitrate ($NO_3^-$) is reduced to dinitrogen gas ($N_2$)."
  },
  {
    "id": "ENV-B-04",
    "field": "Environmental sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Atmospheric Photochemistry of Ozone",
    "content": "Which allotrope of oxygen, composed of three bound oxygen atoms ($O_3$), is photochemically synthesized in the stratosphere via the reaction $O(^3P) + O_2 + M \\longrightarrow O_3 + M$?",
    "options": [
      "Singlet oxygen",
      "Ozone",
      "Diatomic oxygen",
      "Superoxide"
    ],
    "correctAnswer": "Ozone",
    "explanation": "Ozone ($O_3$) is the triatomic allotrope of oxygen synthesized when atomic oxygen (produced by photolysis of $O_2$ by solar UV-C) combines with molecular oxygen in the presence of a third stabilizing body $M$."
  },
  {
    "id": "ENV-B-05",
    "field": "Environmental sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Global Warming Potential Reference Standard",
    "content": "Under international greenhouse gas accounting protocols (UNFCCC / IPCC), which greenhouse gas is defined as the baseline reference gas with an assigned Global Warming Potential (GWP) of exactly 1.0 across all integration time horizons?",
    "options": [
      "Methane ($CH_4$)",
      "Carbon dioxide ($CO_2$)",
      "Nitrous oxide ($N_2O$)",
      "Sulfur hexafluoride ($SF_6$)"
    ],
    "correctAnswer": "Carbon dioxide ($CO_2$)",
    "explanation": "Carbon dioxide ($CO_2$) is the international reference standard for radiative forcing impacts, assigned a Global Warming Potential (GWP) of exactly 1.0 by definition."
  },
  {
    "id": "ENV-B-06",
    "field": "Environmental sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Biogeochemical Mechanism of Oxygenic Photosynthesis",
    "content": "In oxygenic photosynthesis conducted by cyanobacteria, algae, and terrestrial plants, what is the ultimate electron donor whose light-driven enzymatic photolysis releases molecular oxygen ($O_2$) into the atmosphere?",
    "options": [
      "Carbon dioxide ($CO_2$)",
      "Water ($H_2O$)",
      "Hydrogen sulfide ($H_2S$)",
      "Glucose ($C_6H_{12}O_6$)"
    ],
    "correctAnswer": "Water ($H_2O$)",
    "explanation": "In Photosystem II, the oxygen-evolving manganese cluster catalyzes the photolysis of water ($2H_2O \\longrightarrow O_2 + 4H^+ + 4e^-$), which supplies electrons for photosynthesis and liberates atmospheric $O_2$."
  },
  {
    "id": "ENV-B-07",
    "field": "Environmental sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Marine Coral Bleaching Triggers",
    "content": "Widespread thermal coral bleaching on scleractinian barrier reefs is initiated primarily by prolonged marine heatwaves that induce:",
    "options": [
      "Hypercalcification and rapid skeletal overgrowth",
      "Thermal stress causing breakdown of symbiosis and expulsion of photosynthetic endosymbionts (zooxanthellae)",
      "Direct precipitation of heavy metals onto coral polyps",
      "Invasion of coral skeletons by deep-sea benthic tube worms"
    ],
    "correctAnswer": "Thermal stress causing breakdown of symbiosis and expulsion of photosynthetic endosymbionts (zooxanthellae)",
    "explanation": "Elevated sea surface temperatures induce photo-oxidative stress in the endosymbiotic dinoflagellates (zooxanthellae), causing the coral host to expel them, revealing the white calcium carbonate skeleton."
  },
  {
    "id": "ENV-I-01",
    "field": "Environmental sciences",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Sediment-Water Metal Mobilization Drivers (Select TWO)",
    "content": "Select TWO environmental and geochemical factors that most significantly increase the risk of mobilizing toxic trace metals (e.g., $Cd, Zn, Pb$) from contaminated benthic sediments into the overlying water column:",
    "options": [
      "Water column acidification (sharp decrease in pH)",
      "Sediment physical resuspension and turbulent scouring (dredging, storms, ship propellers)",
      "Addition of excess dissolved calcium carbonate buffers",
      "Maintenance of undisturbed, stagnant laminar flow under steady neutral conditions",
      "Development of a permanent oxidized iron-manganese capping crust"
    ],
    "correctAnswer": [
      "Water column acidification (sharp decrease in pH)",
      "Sediment physical resuspension and turbulent scouring (dredging, storms, ship propellers)"
    ],
    "explanation": "Acidification (low pH) promotes proton-promoted desorption of metal cations from mineral surfaces and dissolves carbonate complexes. Physical resuspension exposes reduced anoxic sediments to oxygenated water, oxidizing metal sulfides into soluble sulfates."
  },
  {
    "id": "ENV-I-02",
    "field": "Environmental sciences",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "Biogeochemical Processes in Ombrotrophic Peatlands (Select TWO)",
    "content": "Select TWO characteristic hydrological and biogeochemical processes that define natural ombrotrophic peat bog mires:",
    "options": [
      "Intense aeolian abrasion and sand dune migration",
      "Permanent or prolonged waterlogging creating anoxic benthic conditions",
      "Rapid complete aerobic decomposition of all plant litter within weeks",
      "Progressive accumulation of organic matter as peat due to microbial decomposition suppression",
      "Hydrothermal deposition of high-grade copper porphyry veins"
    ],
    "correctAnswer": [
      "Permanent or prolonged waterlogging creating anoxic benthic conditions",
      "Progressive accumulation of organic matter as peat due to microbial decomposition suppression"
    ],
    "explanation": "Peatlands are characterized by permanent water saturation, oxygen depletion, and low temperatures/acidic pH, which inhibit microbial decomposers, allowing Sphagnum moss and organic matter to accumulate as peat."
  },
  {
    "id": "ENV-I-03",
    "field": "Environmental sciences",
    "difficulty": "intermediate",
    "type": "short-answer",
    "points": 3,
    "title": "Surface Water Mixing and BOD Dilution Calculation",
    "content": "A pristine natural river with an upstream discharge of $Q_r = 18.0\\text{ m}^3\\text{/s}$ and a background biochemical oxygen demand of $\\text{BOD}_r = 2.0\\text{ mg/L}$ receives a point-source treated municipal effluent with discharge $Q_w = 2.0\\text{ m}^3\\text{/s}$ and an effluent $\\text{BOD}_w = 42.0\\text{ mg/L}$.\n\nAssuming complete and instantaneous cross-sectional hydrodynamic mixing at the confluence without immediate decay, calculate the resulting mixed river water BOD concentration ($C_{\\text{mix}} = \\frac{Q_r C_r + Q_w C_w}{Q_r + Q_w}$) in $\\text{mg/L}$. Enter your answer as a number (e.g., 6.0).",
    "correctAnswer": "6.0",
    "acceptableAnswers": [
      "6",
      "6.0",
      "6.0 mg/L",
      "6 mg/L"
    ],
    "explanation": "$$C_{\\text{mix}} = \\frac{(18.0 \\times 2.0) + (2.0 \\times 42.0)}{18.0 + 2.0} = \\frac{36.0 + 84.0}{20.0} = \\frac{120.0}{20.0} = 6.0\\text{ mg/L}$$."
  },
  {
    "id": "ENV-I-04",
    "field": "Environmental sciences",
    "difficulty": "intermediate",
    "type": "multiple-select",
    "points": 3,
    "title": "International Multilateral Environmental Agreements (Select TWO)",
    "content": "Select TWO landmark international environmental treaties specifically established to protect the global atmosphere, climate system, or stratospheric ozone layer:",
    "options": [
      "Montreal Protocol on Substances that Deplete the Ozone Layer (1987)",
      "United Nations Framework Convention on Climate Change (UNFCCC Paris Agreement 2015)",
      "Ramsar Convention on Wetlands of International Importance",
      "CITES (Convention on International Trade in Endangered Species of Wild Fauna and Flora)",
      "Basel Convention on the Control of Transboundary Movements of Hazardous Wastes"
    ],
    "correctAnswer": [
      "Montreal Protocol on Substances that Deplete the Ozone Layer (1987)",
      "United Nations Framework Convention on Climate Change (UNFCCC Paris Agreement 2015)"
    ],
    "explanation": "The Montreal Protocol (1987) phased out chlorofluorocarbons (CFCs) to protect stratospheric ozone. The Paris Agreement (2015) under the UNFCCC binds nations to mitigate greenhouse gas emissions to limit climate warming. Ramsar covers wetlands, CITES protects endangered species, and Basel regulates hazardous waste."
  },
  {
    "id": "ENV-A-01",
    "field": "Environmental sciences",
    "difficulty": "advanced",
    "type": "extended-response",
    "points": 10,
    "title": "Streeter-Phelps Dissolved Oxygen Sag Curve Derivation",
    "content": "A municipal wastewater discharge enters a lowland river. To protect cold-water fish requiring a dissolved oxygen (DO) concentration above $5.0\\text{ mg/L}$, an environmental engineer models the downstream oxygen sag curve using the classical **Streeter-Phelps differential equation**:\n\n$$\\frac{dD}{dt} = k_1 L - k_2 D$$\n\nwhere:\n$$D(t) = \\frac{k_1 L_0}{k_2 - k_1} \\left(e^{-k_1 t} - e^{-k_2 t}\\right) + D_0 e^{-k_2 t}$$\n\n**Hydraulic and Kinetic Parameters at River Confluence:**\n- Stream average flow velocity: $U = 0.50\\text{ m/s} = 43.2\\text{ km/day}$\n- Deoxygenation rate constant (base $e$): $k_1 = 0.20\\text{ day}^{-1}$\n- Atmospheric reaeration rate constant (base $e$): $k_2 = 0.40\\text{ day}^{-1}$\n- Initial ultimate BOD of the blended river water: $L_0 = 15.0\\text{ mg/L}$\n- Saturated dissolved oxygen concentration at stream temperature ($20^\\circ\\text{C}$): $\\text{DO}_{\\text{sat}} = 9.10\\text{ mg/L}$\n- Initial dissolved oxygen of mixed water: $\\text{DO}_0 = 7.60\\text{ mg/L}$ (Initial DO deficit: $D_0 = \\text{DO}_{\\text{sat}} - \\text{DO}_0 = 1.50\\text{ mg/L}$)\n\n**Tasks:**\n1. Using the formula for critical time when oxygen deficit is at its maximum ($\\frac{dD}{dt} = 0$):\n   $$t_c = \\frac{1}{k_2 - k_1} \\ln \\left[ \\frac{k_2}{k_1} \\left( 1 - D_0 \\frac{k_2 - k_1}{k_1 L_0} \\right) \\right]$$\n   Calculate the critical time of travel ($t_c$) in days.\n2. Determine the physical distance downstream ($x_c = U \\times t_c$) from the discharge outfall where the dissolved oxygen reaches its critical minimum, in kilometers.\n3. Calculate the critical oxygen deficit ($D_c$) in $\\text{mg/L}$ at time $t_c$ using:\n   $$D_c = \\frac{k_1}{k_2} L_0 e^{-k_1 t_c}$$\n4. Determine the minimum dissolved oxygen concentration ($\\text{DO}_{\\text{min}} = \\text{DO}_{\\text{sat}} - D_c$) in the river, and state whether the aquatic fish standard ($\\text{DO} \\ge 5.0\\text{ mg/L}$) is violated.\n\nShow full numerical substitutions and logarithmic steps.",
    "requiredKeywords": [
      "3.0",
      "130",
      "4.1",
      "5.0",
      "Streeter-Phelps",
      "violated"
    ],
    "modelSolution": "1. Calculation of Critical Travel Time ($t_c$):\nGiven: $k_1 = 0.20\\text{ day}^{-1}$, $k_2 = 0.40\\text{ day}^{-1}$, $L_0 = 15.0\\text{ mg/L}$, $D_0 = 1.50\\text{ mg/L}$.\n$$k_2 - k_1 = 0.40 - 0.20 = 0.20\\text{ day}^{-1}$$\n$$\\frac{k_2}{k_1} = \\frac{0.40}{0.20} = 2.0$$\n$$\\text{Correction term: } 1 - D_0 \\frac{k_2 - k_1}{k_1 L_0} = 1 - 1.50 \\times \\frac{0.20}{0.20 \\times 15.0} = 1 - \\frac{1.50}{15.0} = 1 - 0.10 = 0.90$$\n$$\\text{Argument of logarithm: } 2.0 \\times 0.90 = 1.80$$\n$$\\ln(1.80) \\approx 0.5878$$\n$$t_c = \\frac{0.5878}{0.20\\text{ day}^{-1}} \\approx 2.939\\text{ days} \\approx 2.94\\text{ days}$$\n\n2. Downstream Distance to Critical Point ($x_c$):\n$$x_c = U \\times t_c = 43.2\\text{ km/day} \\times 2.94\\text{ days} \\approx 127.0\\text{ km}$$\n\n3. Critical Dissolved Oxygen Deficit ($D_c$):\n$$e^{-k_1 t_c} = e^{-(0.20 \\times 2.939)} = e^{-0.5878} = \\frac{1}{1.80} \\approx 0.5556$$\n$$D_c = \\frac{k_1}{k_2} L_0 e^{-k_1 t_c} = \\left(\\frac{0.20}{0.40}\\right) \\times 15.0\\text{ mg/L} \\times 0.5556 = 0.5 \\times 15.0 \\times 0.5556 = 4.167\\text{ mg/L} \\approx 4.17\\text{ mg/L}$$\n\n4. Minimum Dissolved Oxygen ($\\text{DO}_{\\text{min}}$) and Regulatory Compliance:\n$$\\text{DO}_{\\text{min}} = \\text{DO}_{\\text{sat}} - D_c = 9.10\\text{ mg/L} - 4.17\\text{ mg/L} = 4.93\\text{ mg/L}$$\nBecause $\\text{DO}_{\\text{min}} = 4.93\\text{ mg/L} < 5.0\\text{ mg/L}$, the water quality standard is **violated**, indicating hypoxia risk for sensitive salmonid fish."
  },
  {
    "id": "GCH-B-08",
    "field": "Geochemistry & geophysics",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Electrical Conductivity Mechanisms in Metamorphic Rocks",
    "content": "The main type of electrical conductivity in water-bearing metamorphic and crystalline rocks under crustal conditions is:",
    "options": [
      "Electronic",
      "Quadrupole",
      "Ionic (electrolytic conduction in interconnected pore fluids)",
      "Dipole"
    ],
    "correctAnswer": "Ionic (electrolytic conduction in interconnected pore fluids)",
    "explanation": "In crystalline and metamorphic rocks, the silicate mineral framework is an electrical insulator. Conduction occurs primarily via ionic (electrolytic) transport of dissolved cations and anions ($Na^+, Cl^-, Ca^{2+}, SO_4^{2-}$) through fluid-filled pores and microfractures. Electronic conduction is dominant only in metallic sulfide ore bodies or graphite-bearing schists."
  },
  {
    "id": "ENV-B-08",
    "field": "Environmental sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "White Efflorescence on Arid Desert Soils",
    "content": "Why are arid desert soils and solonchaks often covered with a white surface coating or crust?",
    "options": [
      "Because of a large amount of snow",
      "Because of ash from volcanoes",
      "Because of salt accumulation on the surface driven by capillary evaporation of mineralized groundwater",
      "Because of limestone deposits"
    ],
    "correctAnswer": "Because of salt accumulation on the surface driven by capillary evaporation of mineralized groundwater",
    "explanation": "In arid regions where potential evapotranspiration vastly exceeds annual precipitation, saline groundwater rises towards the surface via capillary action. When water evaporates, dissolved salts (predominantly halite $NaCl$, thenardite $Na_2SO_4$, and gypsum $CaSO_4 \\cdot 2H_2O$) precipitate, forming a white salt crust (efflorescence)."
  },
  {
    "id": "GCH-B-09",
    "field": "Geochemistry & geophysics",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Lehmann Discontinuity and Inner Core Boundary",
    "content": "The seismic boundary located at an approximate depth of $5,150\\text{ km}$ that separates the liquid iron-nickel outer core from the solid inner core, causing an abrupt jump in P-wave velocity, is the:",
    "options": [
      "Mohorovičić Discontinuity",
      "Gutenberg Discontinuity",
      "Lehmann Discontinuity",
      "Conrad Discontinuity"
    ],
    "correctAnswer": "Lehmann Discontinuity",
    "explanation": "Discovered by seismologist Inge Lehmann in 1936, the Lehmann discontinuity at ~5,150 km marks the boundary between the liquid outer core and solid inner core, across which P-wave velocity abruptly increases by ~0.8 km/s."
  },
  {
    "id": "GCH-B-10",
    "field": "Geochemistry & geophysics",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Geophysical Anomaly Contrasts in Mineral Prospecting",
    "content": "Why do subterranean halite salt domes ($\text{NaCl}$) characteristically manifest as pronounced local negative Bouguer gravity anomalies in regional gravity surveys?",
    "options": [
      "Halite absorbs all incoming seismic energy",
      "Halite has a significantly lower bulk density ($\u0007pprox 2.16\text{ g/cm}^3$) than surrounding consolidated sedimentary rocks ($\u0007pprox 2.4 - 2.7\text{ g/cm}^3$)",
      "Halite exhibits extraordinary ferromagnetic susceptibility",
      "Halite rapidly dissolves in deep borehole drilling fluids"
    ],
    "correctAnswer": "Halite has a significantly lower bulk density ($\u0007pprox 2.16\text{ g/cm}^3$) than surrounding consolidated sedimentary rocks ($\u0007pprox 2.4 - 2.7\text{ g/cm}^3$)",
    "explanation": "Halite ($\text{NaCl}$) has an incompact crystal density of ~2.16 g/cm³ that does not significantly increase with burial depth. As surrounding sediments compact to 2.4–2.7 g/cm³, buoyant salt pierces upward into diapirs, creating a massive density deficit and strong negative gravity anomalies."
  },
  {
    "id": "GCH-B-11",
    "field": "Geochemistry & geophysics",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "SI Units of Geophysical Physical Quantities",
    "content": "In applied geophysics and electromagnetic exploration, which SI unit is used to express the magnetic permeability ($\\mu$) of a rock medium?",
    "options": [
      "Tesla ($\\text{T}$)",
      "Henry per meter ($\\text{H/m}$)",
      "Ohm-meter ($\\Omega\\cdot\\text{m}$)",
      "Siemens per meter ($\\text{S/m}$)"
    ],
    "correctAnswer": "Henry per meter ($\\text{H/m}$)",
    "explanation": "Magnetic permeability $\\mu$ is expressed in Henry per meter ($\text{H/m}$ or $\text{N/A}^2$). Tesla ($\text{T}$) is the unit of magnetic flux density $B$, Ohm-meter ($\\Omega\\cdot\text{m}$) is electrical resistivity, and Siemens per meter ($\text{S/m}$) is electrical conductivity."
  },
  {
    "id": "GEO-B-09",
    "field": "Geography, physical",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Hydrographic Bathymetry and Echo-Sounding Calculation",
    "content": "An oceanographic research vessel uses a precision acoustic echo-sounder to determine ocean depth. An acoustic ping travels to the seafloor, reflects, and returns to the hydrophone with a total two-way travel time of $t = 4.0\\text{ seconds}$. Assuming the mean speed of sound in seawater is $v = 1,500\\text{ m/s}$, what is the water depth ($d = \\frac{v \\cdot t}{2}$)?",
    "options": [
      "$1,500\\text{ m}$",
      "$3,000\\text{ m}$",
      "$6,000\\text{ m}$",
      "$12,000\\text{ m}$"
    ],
    "correctAnswer": "$3,000\\text{ m}$",
    "explanation": "Because the acoustic pulse travels to the seabed and back, depth $d = \\frac{v \\cdot t}{2} = \\frac{1500\\text{ m/s} \\times 4.0\\text{ s}}{2} = 3,000\\text{ m}$."
  },
  {
    "id": "GEO-B-10",
    "field": "Geography, physical",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Gravitational and Differential Oceanic Tidal Forcing",
    "content": "Although the Sun has an enormous mass $\\approx 2.7 \\times 10^7$ times that of the Moon, the Moon's ocean tidal generating force on Earth is approximately $2.2$ times greater than the Sun's. Why?",
    "options": [
      "The Moon rotates synchronously with the Earth",
      "Tidal generating force is proportional to mass divided by the cube of distance ($F_{\\text{tide}} \\propto \\frac{M}{r^3}$)",
      "The Moon possesses a stronger internal magnetic field",
      "The solar gravitational constant is attenuated by interplanetary dust"
    ],
    "correctAnswer": "Tidal generating force is proportional to mass divided by the cube of distance ($F_{\\text{tide}} \\propto \\frac{M}{r^3}$)",
    "explanation": "While direct gravitational attraction follows Newton's inverse-square law ($F \\propto M/r^2$), the differential tidal force represents the spatial gradient of gravity across the Earth's diameter, scaling inversely with the cube of distance ($dF/dr \\propto M/r^3$). The Moon's proximity (~384,400 km vs ~149,600,000 km) makes its tidal force ~2.17 times stronger than the Sun's."
  },
  {
    "id": "GLG-B-09",
    "field": "Geology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Crystallographic Restriction Theorem",
    "content": "According to the classical crystallographic restriction theorem, which rotational symmetry axis is strictly forbidden in three-dimensional periodic translationally symmetric crystal lattices?",
    "options": [
      "2-fold rotational axis",
      "3-fold rotational axis",
      "5-fold rotational axis",
      "6-fold rotational axis"
    ],
    "correctAnswer": "5-fold rotational axis",
    "explanation": "In 3D Euclidean space, a periodic translational lattice can only accommodate 1-, 2-, 3-, 4-, and 6-fold rotational axes. Pentagonal (5-fold) and heptagonal (7-fold) rotations cannot tile space without leaving gaps or overlapping (except in non-periodic quasicrystals)."
  },
  {
    "id": "GLG-B-10",
    "field": "Geology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Crystallographic System and Habit of Common Salts and Sulfides",
    "content": "Sylvite ($\\text{KCl}$), halite ($\\text{NaCl}$), and galena ($\\text{PbS}$) all belong to which crystal system and characteristically display cubic morphology with three perpendicular cleavage planes {100}?",
    "options": [
      "Monoclinic system",
      "Isometric (cubic) system",
      "Hexagonal system",
      "Triclinic system"
    ],
    "correctAnswer": "Isometric (cubic) system",
    "explanation": "Sylvite, halite, and galena crystallize in the isometric (cubic) system (space group $Fm\\bar{3}m$), displaying perfect cubic cleavage along {100} at 90° angles."
  },
  {
    "id": "GLG-B-11",
    "field": "Geology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Idiochromatic vs Allochromatic Mineral Coloration",
    "content": "Which of the following minerals is strictly idiochromatic (its diagnostic deep blue color is an intrinsic constant property arising directly from sulfur radical anions in its chemical framework, rather than trace impurities)?",
    "options": [
      "Quartz (colorless, purple amethyst, smoky)",
      "Fluorite (purple, green, yellow, colorless)",
      "Lazurite (lapis lazuli constituent, $(\\text{Na,Ca})_8(\\text{AlSiO}_4)_6(\\text{SO}_4,\\text{S},\\text{Cl})_2$)",
      "Calcite (colorless, white, pink, yellow)"
    ],
    "correctAnswer": "Lazurite (lapis lazuli constituent, $(\\text{Na,Ca})_8(\\text{AlSiO}_4)_6(\\text{SO}_4,\\text{S},\\text{Cl})_2$)",
    "explanation": "Idiochromatic minerals possess self-colored crystal lattices where major constituent transition elements or radical chromophores (such as the trisulfur radical $S_3^-$ in lazurite) produce a constant, diagnostic color. Quartz, fluorite, and calcite are allochromatic."
  },
  {
    "id": "GLG-B-12",
    "field": "Geology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Classification of Non-Silicate Minerals: Phosphates",
    "content": "Apatite ($\\text{Ca}_5(\\text{PO}_4)_3(\\text{F,Cl,OH})$), monazite ($(\\text{Ce,La,Nd,Th})\\text{PO}_4$), and turquoise ($\\text{CuAl}_6(\\text{PO}_4)_4(\\text{OH})_8\\cdot 4\\text{H}_2\\text{O}$) are classified into which chemical mineral class?",
    "options": [
      "Halides",
      "Phosphates",
      "Carbonates",
      "Sulfates"
    ],
    "correctAnswer": "Phosphates",
    "explanation": "Apatite, monazite, and turquoise are all members of the phosphate mineral class, characterized structurally by tetrahedral $[\\text{PO}_4]^{3-}$ anionic complexes."
  },
  {
    "id": "MIN-B-08",
    "field": "Mining & mineral processing",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Industrial Ores of Light Structural Metals",
    "content": "Which common carbonate mineral serves as a primary raw mineral ore source for the metallurgical extraction of metallic magnesium ($\\text{Mg}$) and refractory magnesia ($\\text{MgO}$)?",
    "options": [
      "Siderite ($\\text{FeCO}_3$)",
      "Magnesite ($\\text{MgCO}_3$)",
      "Cerussite ($\\text{PbCO}_3$)",
      "Malachite ($\\text{Cu}_2\\text{CO}_3(\\text{OH})_2$)"
    ],
    "correctAnswer": "Magnesite ($\\text{MgCO}_3$)",
    "explanation": "Magnesite ($\text{MgCO}_3$, containing 47.8% MgO) and dolomite ($\text{CaMg(CO}_3)_2$) are the primary natural carbonate ores mined for magnesium metal production and high-temperature refractory furnace bricks."
  },
  {
    "id": "MIN-B-09",
    "field": "Mining & mineral processing",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Stoichiometric Copper Content in Pure Chalcopyrite",
    "content": "What is the theoretical mass fraction of copper ($\\text{Cu}$) in chemically pure chalcopyrite ($\\text{CuFeS}_2$)? (Use standard atomic weights: $\\text{Cu} = 63.55$, $\\text{Fe} = 55.85$, $\\text{S} = 32.06$).",
    "options": [
      "$25.2\\%$",
      "$30.4\\%$",
      "$34.6\\%$",
      "$42.8\\%$"
    ],
    "correctAnswer": "$34.6\\%$",
    "explanation": "Molar mass of $\\text{CuFeS}_2 = 63.55 + 55.85 + (2 \\times 32.06) = 183.52\\text{ g/mol}$. Mass percentage of $\\text{Cu} = \\frac{63.55}{183.52} \\times 100\\% \\approx 34.63\\%$ (or ~34.6%)."
  },
  {
    "id": "MIN-B-10",
    "field": "Mining & mineral processing",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Stoichiometric Iron Content in Pure Magnetite",
    "content": "What is the theoretical mass fraction of iron ($\\text{Fe}$) in chemically pure magnetite ($\\text{Fe}_3\\text{O}_4$)? (Use standard atomic weights: $\\text{Fe} = 55.85$, $\\text{O} = 16.00$).",
    "options": [
      "$62.1\\%$",
      "$70.0\\%$",
      "$72.4\\%$",
      "$77.8\\%$"
    ],
    "correctAnswer": "$72.4\\%$",
    "explanation": "Molar mass of $\\text{Fe}_3\\text{O}_4 = (3 \\times 55.85) + (4 \\times 16.00) = 167.55 + 64.00 = 231.55\\text{ g/mol}$. Mass percentage of $\\text{Fe} = \\frac{167.55}{231.55} \\times 100\\% \\approx 72.36\\%$ (~72.4%)."
  },
  {
    "id": "GCH-B-12",
    "field": "Geochemistry & geophysics",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Hydrogeochemical Iron Oxidation and Ochre Precipitation",
    "content": "Deep anoxic groundwater containing dissolved ferrous iron ($\text{Fe}^{2+}$) is discharged from a spring into an oxygenated surface stream. What geochemical reaction occurs, causing rusty-orange ochre deposits?",
    "options": [
      "Ferrous iron reduces to elemental metallic iron",
      "Ferrous iron ($\text{Fe}^{2+}$) is oxidized by dissolved oxygen to ferric iron ($\text{Fe}^{3+}$), precipitating insoluble ferric oxyhydroxides ($\text{Fe(OH)}_3$ / ferrihydrite)",
      "Iron complexes with chloride to form volatile ferric gas",
      "Iron dissolves completely, increasing water clarity"
    ],
    "correctAnswer": "Ferrous iron ($\text{Fe}^{2+}$) is oxidized by dissolved oxygen to ferric iron ($\text{Fe}^{3+}$), precipitating insoluble ferric oxyhydroxides ($\text{Fe(OH)}_3$ / ferrihydrite)",
    "explanation": "Upon exposure to oxygen: $4\\text{Fe}^{2+} + \\text{O}_2 + 10\\text{H}_2\\text{O} \\longrightarrow 4\\text{Fe(OH)}_3\\downarrow + 8\\text{H}^+$. The ferric iron hydrolyzes rapidly at neutral pH to form amorphous ferric hydroxide (ochre), producing characteristic orange staining."
  },
  {
    "id": "ENV-B-09",
    "field": "Environmental sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Natural Rainwater Carbonate Equilibrium",
    "content": "Even in an unpolluted, pristine atmosphere, natural precipitation is slightly acidic ($\text{pH} \\approx 5.6$) rather than strictly neutral ($\text{pH} = 7.0$). Which naturally occurring atmospheric gas is responsible?",
    "options": [
      "Methane ($\text{CH}_4$)",
      "Carbon dioxide ($\text{CO}_2$), which dissolves to form weak carbonic acid ($\text{H}_2\\text{CO}_3$)",
      "Diatomic Argon ($\text{Ar}$)",
      "Sulfur hexafluoride ($\text{SF}_6$)"
    ],
    "correctAnswer": "Carbon dioxide ($\text{CO}_2$), which dissolves to form weak carbonic acid ($\text{H}_2\\text{CO}_3$)",
    "explanation": "Atmospheric $\text{CO}_2$ dissolves in water droplets according to Henry's law and dissociates: $\\text{CO}_{2(aq)} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_2\\text{CO}_3 \\rightleftharpoons \\text{H}^+ + \\text{HCO}_3^-$. At ambient ~420 ppm $\text{CO}_2$, this equilibrium yields a natural rainwater pH of ~5.6."
  },
  {
    "id": "ENV-B-10",
    "field": "Environmental sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Carcinogenic and Highly Toxic Trace Metal Contaminants",
    "content": "Which transition metal, widely used in industrial chrome plating and leather tanning, is recognized by the IARC as a Group 1 human inhalation carcinogen specifically in its hexavalent oxo-anion form ($\text{CrO}_4^{2-}$ / $\text{Cr(VI)}$)?",
    "options": [
      "Magnesium ($\text{Mg}$)",
      "Chromium ($\text{Cr}$)",
      "Calcium ($\text{Ca}$)",
      "Potassium ($\text{K}$)"
    ],
    "correctAnswer": "Chromium ($\text{Cr}$)",
    "explanation": "While trivalent chromium ($\text{Cr(III)}$) is a stable trace nutrient, hexavalent chromium ($\text{Cr(VI)}$) readily crosses cellular sulfate channels via molecular mimicry and undergoes intracellular reduction, generating reactive oxygen species and fatal DNA crosslinks."
  },
  {
    "id": "GCH-B-13",
    "field": "Geochemistry & geophysics",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Statistical Distribution Metrics in Ore Grade Sampling",
    "content": "A geochemical assay dataset of copper grades across 50 exploratory core samples yields a calculated sample variance of $s^2 = 0.64\\text{ (wt}\\%)^2$. What is the sample standard deviation ($\\sigma = \\sqrt{s^2}$) of this assay population?",
    "options": [
      "$0.32\\text{ wt}\\%$",
      "$0.64\\text{ wt}\\%$",
      "$0.80\\text{ wt}\\%$",
      "$1.28\\text{ wt}\\%$"
    ],
    "correctAnswer": "$0.80\\text{ wt}\\%$",
    "explanation": "Standard deviation is the square root of variance: $\\sigma = \\sqrt{s^2} = \\sqrt{0.64} = 0.80\\text{ wt}\\%$."
  },
  {
    "id": "MET-B-09",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Barometric Step in the Lower Troposphere",
    "content": "Near sea level under standard atmospheric conditions, what vertical vertical ascent distance (the 'barometric step') corresponds to an atmospheric pressure drop of approximately $1.0\\text{ mm Hg}$ ($1.33\\text{ hPa}$)?",
    "options": [
      "$\\approx 1.0\\text{ meter}$",
      "$\\approx 10.5 - 11.0\\text{ meters}$",
      "$\\approx 100\\text{ meters}$",
      "$\\approx 1,000\\text{ meters}$"
    ],
    "correctAnswer": "$\\approx 10.5 - 11.0\\text{ meters}$",
    "explanation": "From the hydrostatic equation ($dp = -\\rho g dz$), with air density $\\rho \\approx 1.225\\text{ kg/m}^3$ at sea level, a pressure decrease of 1 mm Hg (133.3 Pa) requires a vertical displacement of $dz = \\frac{133.3}{1.225 \\times 9.81} \\approx 11.1\\text{ m}$. In meteorology, the barometric step near sea level is taken as 10.5–11 m per mm Hg."
  },
  {
    "id": "GEO-B-11",
    "field": "Geography, physical",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Cartographic Scale Linear Distance Conversion",
    "content": "On a regional topographic map published at a representative fraction scale of $1 : 250,000$, a geologist measures a road transect length of $4.0\\text{ cm}$ using dividers. What is the actual ground distance in reality?",
    "options": [
      "$1.0\\text{ km}$",
      "$2.5\\text{ km}$",
      "$10.0\\text{ km}$",
      "$25.0\\text{ km}$"
    ],
    "correctAnswer": "$10.0\\text{ km}$",
    "explanation": "At $1 : 250,000$, $1\\text{ cm}$ on the map represents $250,000\\text{ cm} = 2,500\\text{ m} = 2.5\\text{ km}$. Therefore, $4.0\\text{ cm} \\times 2.5\\text{ km/cm} = 10.0\\text{ km}$."
  },
  {
    "id": "MET-B-10",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Component Composition of Earth's Modern Dry Atmosphere",
    "content": "Which sequence correctly lists the three most abundant gaseous constituents of clean, dry atmospheric air in descending order of volume percentage?",
    "options": [
      "Oxygen ($21\\%$) $\\longrightarrow$ Nitrogen ($78\\%$) $\\longrightarrow$ Carbon dioxide ($0.04\\%$)",
      "Nitrogen ($78.08\\%$) $\\longrightarrow$ Oxygen ($20.95\\%$) $\\longrightarrow$ Argon ($0.93\\%$)",
      "Nitrogen ($78\\%$) $\\longrightarrow$ Water vapor ($20\\%$) $\\longrightarrow$ Oxygen ($2\\%$)",
      "Oxygen ($50\\%$) $\\longrightarrow$ Nitrogen ($40\\%$) $\\longrightarrow$ Hydrogen ($10\\%$)"
    ],
    "correctAnswer": "Nitrogen ($78.08\\%$) $\\longrightarrow$ Oxygen ($20.95\\%$) $\\longrightarrow$ Argon ($0.93\\%$)",
    "explanation": "Dry air by volume consists of: Nitrogen ($N_2$) 78.08%, Oxygen ($O_2$) 20.95%, Argon ($Ar$) 0.934%, Carbon dioxide ($CO_2$) ~0.042%, and noble trace gases."
  },
  {
    "id": "MET-B-11",
    "field": "Meteorology & atmospheric sciences",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Meteorological Cardinal Wind Direction Convention",
    "content": "In international meteorological observation standards (WMO), a 'Northerly wind' is defined as a wind that:",
    "options": [
      "Blows toward the North from the South",
      "Blows from the North toward the South",
      "Blows perpendicular to lines of latitude",
      "Rotates counterclockwise around a thermal low"
    ],
    "correctAnswer": "Blows from the North toward the South",
    "explanation": "Meteorological wind direction is always defined by the compass direction *from which* the wind originates. A northerly wind blows from north to south; a westerly wind blows from west to east."
  },
  {
    "id": "ECO-B-08",
    "field": "Ecology",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Primary Ecological Succession Pioneer Taxa",
    "content": "During primary autotrophic succession on freshly exposed, barren volcanic basalt or glaciated granite bedrock, which organisms act as initial pioneer species by secreting chelating organic acids to initiate pedogenesis (soil formation)?",
    "options": [
      "Deep-rooted coniferous trees (Pinaceae)",
      "Crustose lichens and lithophytic bryophytes (mosses)",
      "Herbivorous rodents and earthworms",
      "Annual agricultural cereal grasses"
    ],
    "correctAnswer": "Crustose lichens and lithophytic bryophytes (mosses)",
    "explanation": "Crustose lichens (symbiotic associations of fungi and cyanobacteria/algae) colonize bare rock faces, secreting lichenic acids that chemically weather minerals and trap windblown dust, generating the initial humus layer for succeeding mosses."
  },
  {
    "id": "GLG-A-02",
    "field": "Geology",
    "difficulty": "advanced",
    "type": "extended-response",
    "points": 10,
    "title": "Structural Bedding Geometry: Apparent vs True Dip and Seismic Depth Conversion",
    "content": "A petroleum geologist surveys an exposed quarry wall striking due East-West ($090^\\circ$). A sedimentary sandstone reservoir horizon shows an apparent dip angle of $\\alpha = 25^\\circ$ towards the East along the vertical quarry wall. Structural core orientation reveals that the true dip direction (dip azimuth) of the bed is towards $120^\\circ$ (South-East).\n\n**Given Structural Trigonometry:**\n$$\\tan \\alpha = \\tan \\theta \\cdot \\cos \\beta$$\nwhere $\\theta$ is the true dip angle, and $\\beta$ is the horizontal angle between the true dip direction ($120^\\circ$) and the strike of the vertical exposure wall ($090^\\circ$).\n\nIn addition, an exploration seismic reflection profile reveals a two-way acoustic travel time (TWT) of $t_{\\text{TWT}} = 1.60\\text{ seconds}$ to the top of this reservoir bed. Acoustic borehole sonic logs measure an average interval P-wave velocity of $v_p = 3,250\\text{ m/s}$ through the overlying shale overburden.\n\n**Tasks:**\n1. Determine the angle $\\beta$ between the true dip azimuth and the quarry face strike direction.\n2. Calculate the true dip angle ($\\theta$) of the sandstone reservoir bed in degrees, rounded to one decimal place (use $\\tan 25^\\circ \\approx 0.4663$, $\\cos 30^\\circ \\approx 0.8660$).\n3. Calculate the true vertical depth ($z = \\frac{v_p \\cdot t_{\\text{TWT}}}{2}$) to the top of the sandstone reservoir in meters.\n4. If a vertical exploration well is drilled $600\\text{ m}$ down-dip along the true dip direction from the seismic intersection, calculate the additional depth increase ($\\Delta z = 600 \\times \\tan\\theta$) to reach the reservoir bed.\n\nShow all geometric and trigonometric steps clearly.",
    "requiredKeywords": [
      "30",
      "28.3",
      "2600",
      "323",
      "tan theta",
      "apparent dip"
    ],
    "modelSolution": "1. Calculation of Angle $\\beta$:\nQuarry face strikes $090^\\circ$ (East-West), and true dip azimuth is $120^\\circ$.\n$$\\beta = |120^\\circ - 090^\\circ| = 30^\\circ$$\n\n2. True Dip Angle ($\\theta$):\nFrom the apparent dip formula:\n$$\\tan \\alpha = \\tan \\theta \\cdot \\cos \\beta \\implies \\tan \\theta = \\frac{\\tan \\alpha}{\\cos \\beta}$$\nGiven $\\alpha = 25^\\circ$ ($\\tan 25^\\circ \\approx 0.4663$) and $\\beta = 30^\\circ$ ($\\cos 30^\\circ \\approx 0.8660$):\n$$\\tan \\theta = \\frac{0.4663}{0.8660} \\approx 0.53846$$\n$$\\theta = \\arctan(0.53846) \\approx 28.30^\\circ \\text{ (or } 28.3^\\circ\\text{)}$$\n\n3. True Vertical Depth ($z$):\nThe seismic profile measures two-way travel time:\n$$z = \\frac{v_p \\cdot t_{\\text{TWT}}}{2} = \\frac{3,250\\text{ m/s} \\times 1.60\\text{ s}}{2} = 2,600.0\\text{ m}$$\n\n4. Down-Dip Depth Offset ($\\Delta z$):\nFor a horizontal distance $L = 600\\text{ m}$ down-dip:\n$$\\Delta z = L \\times \\tan \\theta = 600\\text{ m} \\times 0.5385 \\approx 323.1\\text{ m}$$\nTotal depth at new well location $= 2,600 + 323.1 = 2,923.1\\text{ m}$."
  },
  {
    "id": "MIN-A-02",
    "field": "Mining & mineral processing",
    "difficulty": "advanced",
    "type": "extended-response",
    "points": 10,
    "title": "Sulfide Flotation Beneficiation Mass Balance and Recovery Derivation",
    "content": "A copper concentrator processes run-of-mine porphyry ore through a froth flotation circuit. The plant metallurgical balance must be calculated for a 24-hour shift.\n\n**Feed and Plant Operational Data:**\n- Dry ore feed throughput: $F = 10,000.0\\text{ metric tonnes/day}$\n- Feed copper grade: $f = 0.85\\%\\text{ Cu}$ ($0.0085$ mass fraction)\n- Flotation concentrate grade: $c = 28.00\\%\\text{ Cu}$ ($0.2800$ mass fraction)\n- Flotation tailings grade: $t = 0.08\\%\\text{ Cu}$ ($0.0008$ mass fraction)\n\n**Governing Conservation Equations:**\n1. Total solid mass balance: $F = C + T$\n2. Copper component mass balance: $F \\cdot f = C \\cdot c + T \\cdot t$\n\n**Tasks:**\n1. Using the two-product mass balance formula, derive the expression for the mass yield (mass pull percentage) of concentrate:\n   $$Y_c = \\frac{C}{F} \\times 100\\% = \\frac{f - t}{c - t} \\times 100\\%$$\n   Calculate the dry mass of concentrate produced per day ($C$) in metric tonnes.\n2. Calculate the metallurgical recovery rate of copper ($\\eta = \\frac{C \\cdot c}{F \\cdot f} \\times 100\\%$) in percent, rounded to two decimal places.\n3. Calculate the ratio of concentration (enrichment ratio $K = \\frac{F}{C} = \\frac{c}{f}$).\n4. Determine the total mass of pure copper metal lost in the tailings stream per day ($M_{\\text{lost}} = T \\cdot t$) in metric tonnes.\n\nShow all mass balance derivations and final numerical results.",
    "requiredKeywords": [
      "2.75",
      "275",
      "90.9",
      "36.3",
      "7.8",
      "mass pull"
    ],
    "modelSolution": "1. Concentrate Mass Yield and Daily Production:\nFrom the simultaneous mass balance:\n$$F = C + T \\implies T = F - C$$\n$$F \\cdot f = C \\cdot c + (F - C) \\cdot t = C(c - t) + F \\cdot t$$\n$$C(c - t) = F(f - t) \\implies \\frac{C}{F} = \\frac{f - t}{c - t}$$\nSubstitute the grades ($f = 0.0085$, $c = 0.2800$, $t = 0.0008$):\n$$\\frac{C}{F} = \\frac{0.0085 - 0.0008}{0.2800 - 0.0008} = \\frac{0.0077}{0.2792} \\approx 0.0275788 \\text{ (or } 2.758\\%\\text{)}$$\nDaily dry concentrate mass:\n$$C = 10,000.0\\text{ t} \\times 0.0275788 \\approx 275.79\\text{ metric tonnes}$$\n\n2. Copper Metallurgical Recovery ($\\eta$):\n$$\\eta = \\frac{C \\cdot c}{F \\cdot f} \\times 100\\% = \\frac{275.79\\text{ t} \\times 0.2800}{10,000.0\\text{ t} \\times 0.0085} \\times 100\\%$$\n$$\\text{Mass of Cu in concentrate} = 77.221\\text{ tonnes Cu}$$\n$$\\text{Mass of Cu in feed} = 85.000\\text{ tonnes Cu}$$\n$$\\eta = \\frac{77.221}{85.000} \\times 100\\% \\approx 90.85\\% \\text{ (or } 90.9\\%\\text{)}$$\n\n3. Ratio of Concentration ($K$):\n$$K = \\frac{F}{C} = \\frac{10,000.0}{275.79} \\approx 36.26 \\text{ (or } \\frac{c}{f} = \\frac{28.00}{0.85} \\approx 32.94\\text{)}$$\n\n4. Copper Lost in Tailings:\n$$T = F - C = 10,000.0 - 275.79 = 9,724.21\\text{ metric tonnes}$$\n$$M_{\\text{lost}} = T \\cdot t = 9,724.21\\text{ t} \\times 0.0008 = 7.78\\text{ metric tonnes of Cu lost/day}$$"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTION_BANK };
}
if (typeof window !== 'undefined') {
  window.QUESTION_BANK = QUESTION_BANK;
}
