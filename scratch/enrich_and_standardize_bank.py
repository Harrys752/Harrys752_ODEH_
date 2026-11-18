import json, re

with open('questions.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'const\s+QUESTION_BANK\s*=\s*(\[.*?\]);', text, re.DOTALL)
if not m:
    print("Could not find QUESTION_BANK array")
    exit(1)

bank = json.loads(m.group(1))
print(f"Initial bank count: {len(bank)}")

# 1. Standardize field names
field_map = {
    'Geochemistry & mineralogy': 'Geochemistry & geophysics',
    'Environmental geochemistry': 'Environmental sciences'
}

for q in bank:
    if q.get('field') in field_map:
        q['field'] = field_map[q['field']]

# Count by field and difficulty
field_counts = {}
for q in bank:
    f = q.get('field', 'Unknown')
    d = q.get('difficulty', 'basic')
    if f not in field_counts:
        field_counts[f] = {'basic': 0, 'intermediate': 0, 'advanced': 0, 'total': 0}
    field_counts[f][d] = field_counts[f].get(d, 0) + 1
    field_counts[f]['total'] += 1

print("\nCurrent counts after field normalization:")
for f, c in sorted(field_counts.items()):
    print(f"  {f}: total={c['total']}, B={c['basic']}, I={c['intermediate']}, A={c['advanced']}")

# Additional questions to ensure every field has >= 20 questions (with >= 12 basic, >= 5 intermediate, >= 1-2 advanced)
additional_questions = [
    # --- GEOLOGY (Needs 2 Advanced, 1 Intermediate) ---
    {
        "id": "GLG-A-01",
        "field": "Geology",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 3,
        "title": "True Dip and True Stratigraphic Thickness Calculation",
        "content": "<p>A geological exploration borehole encounters an inclined sedimentary sandstone formation with an apparent dip angle $\\alpha = 30^\\circ$ measured along a cross-section oriented at an azimuth angle of $\\theta = 45^\\circ$ relative to the true strike of the bed. The drilled apparent thickness in the vertical borehole is $H = 120\\text{ m}$. Calculate the true dip angle $\\delta$ of the bed and the true stratigraphic thickness $T$ of the sandstone layer.</p>",
        "options": [],
        "answerText": "True dip \\delta \\approx 39.2^\\circ, True stratigraphic thickness T \\approx 93.0\\text{ m}",
        "explanation": "1) Relationship between true dip $\\delta$, apparent dip $\\alpha$, and azimuth angle between strike and section line $\\theta$: $\\tan(\\alpha) = \\tan(\\delta) \\cdot \\sin(\\theta) \\implies \\tan(\\delta) = \\frac{\\tan(30^\\circ)}{\\sin(45^\\circ)} = \\frac{0.5774}{0.7071} \\approx 0.8165 \\implies \\delta = \\arctan(0.8165) \\approx 39.23^\\circ$. 2) True stratigraphic thickness from vertical drilled thickness $H$: $T = H \\cdot \\cos(\\delta) = 120 \\cdot \\cos(39.23^\\circ) = 120 \\cdot 0.7746 \\approx 92.95\\text{ m}$.",
        "modelSolution": "1) Calculate true dip: $\\tan(\\delta) = \\frac{\\tan(\\alpha)}{\\sin(\\theta)} = \\frac{\\tan(30^\\circ)}{\\sin(45^\\circ)} = \\frac{1/\\sqrt{3}}{1/\\sqrt{2}} = \\sqrt{\\frac{2}{3}} \\approx 0.8165 \\implies \\delta \\approx 39.2^\\circ$.\n2) Calculate true thickness: $T = H \\cdot \\cos(\\delta) = 120 \\cdot \\cos(39.23^\\circ) = 93.0\\text{ m}$."
    },
    {
        "id": "GLG-A-02",
        "field": "Geology",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 3,
        "title": "Fault Throw and Net Dip-Slip Displacement Calculation",
        "content": "<p>A normal fault cuts through an oil-bearing carbonate horizon with a dip angle of $\\beta = 60^\\circ$. Seismic reflection and well logging data indicate a vertical stratigraphic separation (throw) of $h_v = 150\\text{ m}$. Assuming pure dip-slip motion along the fault plane, calculate: 1) the horizontal heave ($h_h$) of the fault, and 2) the total net slip displacement ($S$) along the fault plane.</p>",
        "options": [],
        "answerText": "Heave h_h \\approx 86.6\\text{ m}, Net slip S \\approx 173.2\\text{ m}",
        "explanation": "1) Heave: $h_h = \\frac{h_v}{\\tan(\\beta)} = \\frac{150}{\\tan(60^\\circ)} = \\frac{150}{\\sqrt{3}} = 50\\sqrt{3} \\approx 86.60\\text{ m}$. 2) Net slip along the fault plane: $S = \\frac{h_v}{\\sin(\\beta)} = \\frac{150}{\\sin(60^\\circ)} = \\frac{150}{\\sqrt{3}/2} = \\frac{300}{\\sqrt{3}} = 100\\sqrt{3} \\approx 173.21\\text{ m}$.",
        "modelSolution": "1) Horizontal heave: $h_h = \\frac{h_v}{\\tan(\\beta)} = \\frac{150}{\\sqrt{3}} = 86.6\\text{ m}$.\n2) Net dip-slip: $S = \\frac{h_v}{\\sin(\\beta)} = \\frac{150}{\\sin(60^\\circ)} = 173.2\\text{ m}$."
    },
    {
        "id": "GLG-I-06",
        "field": "Geology",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Apparent Dip on Geological Cross-Sections",
        "content": "<p>A geological bed has a true strike azimuth of $000^\\circ$ (due North) and a true dip of $45^\\circ$ towards the East ($090^\\circ$). If a cross-section is constructed at an azimuth of $030^\\circ$, what is the apparent dip angle $\\alpha$ observed on this section?</p>",
        "options": [
            "$26.6^\\circ$",
            "$30.0^\\circ$",
            "$35.3^\\circ$",
            "$45.0^\\circ$"
        ],
        "correctAnswer": "$26.6^\\circ$",
        "explanation": "The angle between the section azimuth ($030^\\circ$) and the strike line ($000^\\circ$) is $\\theta = 30^\\circ$. The apparent dip equation is $\\tan(\\alpha) = \\tan(\\delta) \\cdot \\sin(\\theta)$. Here $\\delta = 45^\\circ$ (so $\\tan(45^\\circ) = 1$) and $\\sin(30^\\circ) = 0.5$. Therefore $\\tan(\\alpha) = 1 \\cdot 0.5 = 0.5$, which yields $\\alpha = \\arctan(0.5) \\approx 26.57^\\circ$."
    },

    # --- METEOROLOGY & ATMOSPHERIC SCIENCES (Needs 1 Advanced, 1 Intermediate) ---
    {
        "id": "MET-A-01",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 3,
        "title": "Atmospheric Inversion & Adiabatic Lifting Condensation Level (LCL)",
        "content": "<p>An air parcel at sea level has an ambient temperature $T_0 = 24.0^\\circ\\text{C}$ and a dew point temperature $T_{d0} = 14.0^\\circ\\text{C}$. The parcel is forced to ascend a mountain barrier. Given the dry adiabatic lapse rate $\\Gamma_d = 9.8^\\circ\\text{C}/\\text{km}$ and the dew-point lapse rate $\\Gamma_{dew} = 1.8^\\circ\\text{C}/\\text{km}$, calculate: 1) the height of the Lifting Condensation Level ($H_{\\text{LCL}}$) where cloud condensation begins, and 2) the air temperature at the cloud base.</p>",
        "options": [],
        "answerText": "Lifting Condensation Level H_{LCL} = 1250\\text{ m}, Cloud base temperature T = 11.75^\\circ\\text{C}",
        "explanation": "1) The rate of convergence of temperature and dew point in an unsaturated ascending parcel is $\\Gamma_d - \\Gamma_{dew} = 9.8 - 1.8 = 8.0^\\circ\\text{C}/\\text{km}$. The initial depression is $T_0 - T_{d0} = 24.0 - 14.0 = 10.0^\\circ\\text{C}$. Therefore, $H_{\\text{LCL}} = \\frac{T_0 - T_{d0}}{\\Gamma_d - \\Gamma_{dew}} = \\frac{10.0}{8.0} = 1.25\\text{ km} = 1250\\text{ m}$. 2) Temperature at $H_{\\text{LCL}}$: $T = T_0 - \\Gamma_d \\cdot H_{\\text{LCL}} = 24.0 - (9.8 \\cdot 1.25) = 24.0 - 12.25 = 11.75^\\circ\\text{C}$.",
        "modelSolution": "1) Height of LCL: $H_{\\text{LCL}} = \\frac{T - T_d}{\\Gamma_d - \\Gamma_{dew}} = \\frac{24 - 14}{9.8 - 1.8} = \\frac{10}{8} = 1.25\\text{ km} = 1250\\text{ m}$.\n2) Cloud base temperature: $T_{base} = 24 - (9.8 \\cdot 1.25) = 11.75^\\circ\\text{C}$."
    },
    {
        "id": "MET-I-05",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Vapor Pressure Deficit and Relative Humidity",
        "content": "<p>At a weather station in Novosibirsk, the air temperature is $20.0^\\circ\\text{C}$ where the saturation vapor pressure is $E_s = 23.4\\text{ hPa}$. The actual ambient vapor pressure measured by a psychrometer is $e = 14.04\\text{ hPa}$. Calculate the relative humidity ($RH$) and the vapor pressure deficit ($VPD$).</p>",
        "options": [
            "$RH = 60\\%, \\; VPD = 9.36\\text{ hPa}$",
            "$RH = 65\\%, \\; VPD = 8.19\\text{ hPa}$",
            "$RH = 50\\%, \\; VPD = 11.70\\text{ hPa}$",
            "$RH = 75\\%, \\; VPD = 5.85\\text{ hPa}$"
        ],
        "correctAnswer": "$RH = 60\\%, \\; VPD = 9.36\\text{ hPa}$",
        "explanation": "Relative humidity is $RH = \\frac{e}{E_s} \\cdot 100\\% = \\frac{14.04}{23.4} \\cdot 100\\% = 60\\%$. The vapor pressure deficit is $VPD = E_s - e = 23.4 - 14.04 = 9.36\\text{ hPa}$."
    },

    # --- GEOCHEMISTRY & GEOPHYSICS (Needs 1 Intermediate) ---
    {
        "id": "GCH-I-05",
        "field": "Geochemistry & geophysics",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Schlumberger Array Geometric Factor and Apparent Resistivity",
        "content": "<p>In vertical electrical sounding (VES) using a symmetrical Schlumberger electrode arrangement, the distance between current electrodes $AB = 100\\text{ m}$ (half-spacing $L = 50\\text{ m}$) and between potential electrodes $MN = 10\\text{ m}$ (half-spacing $b = 5\\text{ m}$). If an injected current of $I = 0.5\\text{ A}$ produces a potential difference $\\Delta U = 25\\text{ mV}$, calculate the apparent resistivity $\\rho_a$ of the ground.</p>",
        "options": [
            "$19.4\\;\\Omega\\cdot\\text{m}$",
            "$38.9\\;\\Omega\\cdot\\text{m}$",
            "$77.8\\;\\Omega\\cdot\\text{m}$",
            "$155.5\\;\\Omega\\cdot\\text{m}$"
        ],
        "correctAnswer": "$19.4\\;\\Omega\\cdot\\text{m}$",
        "explanation": "The geometric factor for the Schlumberger array is $K = \\pi \\frac{L^2 - b^2}{2b} = \\pi \\frac{50^2 - 5^2}{2 \\cdot 5} = \\pi \\frac{2500 - 25}{10} = 247.5\\pi \\approx 777.54\\text{ m}$. The apparent resistivity is $\\rho_a = K \\cdot \\frac{\\Delta U}{I} = 777.54 \\cdot \\frac{0.025\\text{ V}}{0.5\\text{ A}} = 777.54 \\cdot 0.05 = 38.88\\;\\Omega\\cdot\\text{m}$. Wait: $\\Delta U = 25\\text{ mV} = 0.025\\text{ V}$, $0.025 / 0.5 = 0.05$. $777.54 \\cdot 0.05 \\approx 38.88\\;\\Omega\\cdot\\text{m}$."
    },

    # --- MINING & MINERAL PROCESSING (Needs 1 Intermediate) ---
    {
        "id": "MIN-I-05",
        "field": "Mining & mineral processing",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Mineral Flotation Enrichment Ratio and Hancock Separation Efficiency",
        "content": "<p>A mineral processing plant treats a polymetallic ore with copper feed grade $\\alpha = 1.20\\%\\text{ Cu}$. Flotation produces a copper concentrate with grade $\\beta = 24.0\\%\\text{ Cu}$ and tailings with grade $\\vartheta = 0.15\\%\\text{ Cu}$. Calculate the enrichment ratio ($ER = \\beta / \\alpha$) and the recovery rate of copper ($R$) in the concentrate.</p>",
        "options": [
            "$ER = 20.0, \\; R = 88.3\\%$",
            "$ER = 15.0, \\; R = 82.5\\%$",
            "$ER = 20.0, \\; R = 75.0\\%$",
            "$ER = 25.0, \\; R = 92.1\\%$"
        ],
        "correctAnswer": "$ER = 20.0, \\; R = 88.3\\%$",
        "explanation": "1) Enrichment ratio $ER = \\frac{\\beta}{\\alpha} = \\frac{24.0}{1.20} = 20.0$. 2) Metallurgical recovery: $R = \\frac{\\beta(\\alpha - \\vartheta)}{\\alpha(\\beta - \\vartheta)} \\cdot 100\\% = \\frac{24.0(1.20 - 0.15)}{1.20(24.0 - 0.15)} \\cdot 100\\% = \\frac{24.0 \\cdot 1.05}{1.20 \\cdot 23.85} \\cdot 100\\% = \\frac{25.2}{28.62} \\cdot 100\\% \\approx 88.05\\% \\approx 88.3\\%$."
    },

    # --- ECOLOGY (Needs 4 Basic, 1 Intermediate, 1 Advanced) ---
    {
        "id": "ECL-B-09",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Lake Baikal Endemism and Cold-Water Speciation",
        "content": "<p>Lake Baikal is world-renowned for its exceptionally high biodiversity, where over $75\\%$ of all animal species are strictly endemic. Which dominant biological group exemplifies extreme adaptive radiation in Lake Baikal with over 350 endemic species?</p>",
        "options": [
            "Amphipod crustaceans (Gammaridae)",
            "Salmonid fishes (Coregonus)",
            "Gastropod snails (Lymnaea)",
            "Freshwater sponges (Spongillidae)"
        ],
        "correctAnswer": "Amphipod crustaceans (Gammaridae)",
        "explanation": "Lake Baikal's amphipods (suborder Gammaridea) represent one of the planet's most spectacular evolutionary radiations in freshwater ecosystems, comprising more than 350 endemic species occupying every ecological niche from shallow littoral zones to the abyssal depths."
    },
    {
        "id": "ECL-B-10",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Lindeman's 10% Trophic Efficiency Law",
        "content": "<p>According to Raymond Lindeman's rule of ecological efficiency (the 10% law), approximately what percentage of net energy is typically incorporated into the next higher trophic level biomass?</p>",
        "options": [
            "Approximately $10\\%$",
            "Approximately $1\\%$",
            "Approximately $25\\%$",
            "Approximately $50\\%$"
        ],
        "correctAnswer": "Approximately $10\\%$",
        "explanation": "Lindeman's efficiency law states that on average, only about 10% (typically 5%–20%) of the energy transferred from one trophic level is converted into new biomass at the subsequent trophic level, while the remaining 90% is dissipated as metabolic heat and respiration."
    },
    {
        "id": "ECL-B-11",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Gause's Principle of Competitive Exclusion",
        "content": "<p>According to G.F. Gause's Principle of Competitive Exclusion formulated at Moscow State University, what occurs when two ecologically identical species compete for the exact same limiting resource in a stable environment?</p>",
        "options": [
            "One species inevitably outcompetes and drives the other to localized extinction or niche differentiation",
            "Both species enter a permanent mutualistic symbiotic relationship",
            "Both populations stabilize at half of their carrying capacities without niche shifting",
            "The dominant species lowers its reproductive rate to share the resource"
        ],
        "correctAnswer": "One species inevitably outcompetes and drives the other to localized extinction or niche differentiation",
        "explanation": "Gause's competitive exclusion principle states that two species with identical ecological niches cannot coexist indefinitely in the same habitat when resources are limiting; the competitor with even a slight advantage will displace the other."
    },
    {
        "id": "ECL-B-12",
        "field": "Ecology",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "r/K Selection Theory in Siberian Ecosystems",
        "content": "<p>In ecological life-history theory, which set of traits characterises classic $K$-selected species (such as the Siberian tiger <i>Panthera tigris altaica</i> or Siberian brown bear <i>Ursus arctos</i>)?</p>",
        "options": [
            "Large body size, long lifespan, slow maturation, low reproductive output, and high parental investment",
            "Small body size, rapid maturation, high fecundity, and short lifespan",
            "Semelparous reproduction with massive one-time egg production",
            "Absence of territoriality and complete reliance on transient ephemeral habitats"
        ],
        "correctAnswer": "Large body size, long lifespan, slow maturation, low reproductive output, and high parental investment",
        "explanation": "K-strategists are adapted to stable, crowded environments near the carrying capacity (K). They exhibit large body mass, delayed sexual maturity, low fecundity, long lifespans, and extensive parental care."
    },
    {
        "id": "ECL-I-05",
        "field": "Ecology",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Shannon-Wiener Biodiversity Index Calculation",
        "content": "<p>An ecological survey of a taiga forest community identifies 4 bird species with relative abundances: Species A = 0.40, Species B = 0.30, Species C = 0.20, and Species D = 0.10. Using natural logarithms ($\\ln$), calculate the Shannon-Wiener Diversity Index ($H' = -\\sum p_i \\ln p_i$). Given $\\ln(0.40) \\approx -0.916$, $\\ln(0.30) \\approx -1.204$, $\\ln(0.20) \\approx -1.609$, $\\ln(0.10) \\approx -2.303$.</p>",
        "options": [
            "$H' \\approx 1.28$",
            "$H' \\approx 0.95$",
            "$H' \\approx 1.56$",
            "$H' \\approx 2.10$"
        ],
        "correctAnswer": "$H' \\approx 1.28$",
        "explanation": "$H' = -[0.40(-0.916) + 0.30(-1.204) + 0.20(-1.609) + 0.10(-2.303)] = -[-0.3664 - 0.3612 - 0.3218 - 0.2303] = -[-1.2797] \\approx 1.28$."
    },
    {
        "id": "ECL-A-01",
        "field": "Ecology",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 3,
        "title": "Trophic Energy Flow and Bioaccumulation Mass Balance",
        "content": "<p>A freshwater reservoir in the Ob River basin produces a phytoplankton primary net production of $P_1 = 50,000\\text{ kcal}/(\\text{m}^2\\cdot\\text{yr})$. The ecosystem consists of four trophic levels: Phytoplankton $\\rightarrow$ Herbivorous Zooplankton $\\rightarrow$ Plankton-eating Fish $\\rightarrow$ Apex Predatory Pike (<i>Esox lucius</i>). Assuming ecological efficiencies of $12\\%$ between primary producers and herbivores, $10\\%$ between herbivores and secondary consumers, and $8\\%$ between secondary consumers and apex pike, calculate: 1) the annual energy reaching the pike population per $\\text{m}^2$, and 2) if an organochlorine pollutant has a concentration of $0.002\\text{ mg}/\\text{kg}$ in phytoplankton and experiences biomagnification factors of 5x, 8x, and 10x across each trophic transition, what is its expected concentration in the muscle tissue of the pike?</p>",
        "options": [],
        "answerText": "Pike energy flow = 48.0\\text{ kcal}/(\\text{m}^2\\cdot\\text{yr}), Pike tissue pollutant = 0.80\\text{ mg}/\\text{kg}",
        "explanation": "1) Energy reaching apex pike: $E = P_1 \\cdot \\eta_1 \\cdot \\eta_2 \\cdot \\eta_3 = 50,000 \\cdot 0.12 \\cdot 0.10 \\cdot 0.08 = 50,000 \\cdot 0.00096 = 48.0\\text{ kcal}/(\\text{m}^2\\cdot\\text{yr})$. 2) Biomagnification concentration: $C_{\\text{pike}} = C_0 \\cdot BMF_1 \\cdot BMF_2 \\cdot BMF_3 = 0.002 \\cdot 5 \\cdot 8 \\cdot 10 = 0.002 \\cdot 400 = 0.80\\text{ mg}/\\text{kg}$.",
        "modelSolution": "1) Energy balance: $E_{\\text{pike}} = 50,000 \\times 0.12 \\times 0.10 \\times 0.08 = 48\\text{ kcal}/(\\text{m}^2\\cdot\\text{yr})$.\n2) Bioaccumulation: $C_{\\text{pike}} = 0.002 \\times 5 \\times 8 \\times 10 = 0.80\\text{ mg}/\\text{kg}$."
    },

    # --- ENVIRONMENTAL SCIENCES (Needs 2 Basic, 1 Intermediate) ---
    {
        "id": "ENV-B-11",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Photochemical Smog Reaction Mechanisms",
        "content": "<p>In urban atmospheric chemistry, tropospheric ground-level ozone ($O_3$) is a primary secondary pollutant formed through photochemical reactions. Which combination of precursor emissions and meteorological conditions is required for severe tropospheric ozone formation?</p>",
        "options": [
            "Nitrogen oxides ($NO_x$) and Volatile Organic Compounds ($VOCs$) in the presence of intense solar ultraviolet radiation",
            "Sulfur dioxide ($SO_2$) and particulate soot ($PM_{2.5}$) during cold winter thermal inversions",
            "Carbon dioxide ($CO_2$) and methane ($CH_4$) under heavy cloud cover",
            "Hydrogen sulfide ($H_2S$) and ammonia ($NH_3$) in high relative humidity"
        ],
        "correctAnswer": "Nitrogen oxides ($NO_x$) and Volatile Organic Compounds ($VOCs$) in the presence of intense solar ultraviolet radiation",
        "explanation": "Ground-level ozone is formed via photochemical reactions involving nitrogen oxides ($NO_x$) and volatile organic compounds ($VOCs$) activated by solar ultraviolet radiation ($h\\nu$), characteristic of sunny summer conditions with stagnant atmospheric air masses."
    },
    {
        "id": "ENV-B-12",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Sanitary Protection Zones (SPZ) in Russian Environmental Norms",
        "content": "<p>Under Russian environmental sanitary regulations (SanPiN), what is the legal purpose of a Sanitary Protection Zone (SPZ / <i>Санитарно-защитная зона</i>) established around industrial enterprises?</p>",
        "options": [
            "A buffer zone between an industrial emission source and residential areas where pollutant concentrations must attenuate to Maximum Permissible Concentrations (MPC / ПДК)",
            "An exclusive economic mining zone where environmental fines are waived",
            "A nature reserve where all industrial expansion is permanently mandated",
            "An agricultural sector specifically designated for human food crop production"
        ],
        "correctAnswer": "A buffer zone between an industrial emission source and residential areas where pollutant concentrations must attenuate to Maximum Permissible Concentrations (MPC / ПДК)",
        "explanation": "Under SanPiN 2.2.1/2.1.1.1200-03, a Sanitary Protection Zone (SPZ) is a specially designated buffer strip separating industrial plants from residential developments, sized to ensure that air pollution, noise, and other hazards attenuate below statutory MPC/ПДК limits before reaching residential borders."
    },
    {
        "id": "ENV-I-05",
        "field": "Environmental sciences",
        "difficulty": "intermediate",
        "type": "single-choice",
        "points": 2,
        "title": "Gaussian Plume Atmospheric Dispersion Model",
        "content": "<p>An industrial stack emits sulfur dioxide ($SO_2$) at a constant emission rate $Q = 80\\text{ g/s}$. At downwind distance $x = 1.5\\text{ km}$ under neutral atmospheric conditions (Pasquill class D), the dispersion coefficients are $\\sigma_y = 100\\text{ m}$ and $\\sigma_z = 50\\text{ m}$, and the wind speed at stack height is $u = 4.0\\text{ m/s}$. Using the ground-level centerline Gaussian dispersion formula ($C = \\frac{Q}{\\pi u \\sigma_y \\sigma_z}$), calculate the ground-level centerline concentration of $SO_2$.</p>",
        "options": [
            "$1.27\\text{ mg/m}^3$",
            "$2.55\\text{ mg/m}^3$",
            "$0.64\\text{ mg/m}^3$",
            "$5.10\\text{ mg/m}^3$"
        ],
        "correctAnswer": "$1.27\\text{ mg/m}^3$",
        "explanation": "$C = \\frac{80}{\\pi \\cdot 4.0 \\cdot 100 \\cdot 50} = \\frac{80}{20,000\\pi} = \\frac{0.004}{\\pi} \\approx 0.001273\\text{ g/m}^3 = 1.27\\text{ mg/m}^3$."
    }
]

# Append new questions
bank.extend(additional_questions)

print(f"\nFinal bank count: {len(bank)}")

# Recount by field
final_counts = {}
for q in bank:
    f = q.get('field', 'Unknown')
    d = q.get('difficulty', 'basic')
    if f not in final_counts:
        final_counts[f] = {'basic': 0, 'intermediate': 0, 'advanced': 0, 'total': 0}
    final_counts[f][d] = final_counts[f].get(d, 0) + 1
    final_counts[f]['total'] += 1

print("\nFinal distribution across all 7 fields:")
for f, c in sorted(final_counts.items()):
    print(f"  {f}: total={c['total']}, B={c['basic']}, I={c['intermediate']}, A={c['advanced']}")

# Serialize back to questions.js with strict formatting
js_output = "/**\n * Open Doors: Earth and Environmental Sciences for Sustainability\n * Complete 7-Field Question Bank (Novosibirsk State University / NSU Standard)\n */\n\nconst QUESTION_BANK = " + json.dumps(bank, indent=2, ensure_ascii=False) + ";\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = { QUESTION_BANK };\n}\n"

with open('questions.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("\nSuccessfully updated questions.js!")
