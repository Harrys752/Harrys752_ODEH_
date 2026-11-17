# -*- coding: utf-8 -*-
"""
Add 23 Basic and 2 Advanced questions to reach 115 total verified tasks.
"""

new_questions = [
    # 1. GCH-B-08: Metamorphic rock electrical conductivity (directly from screenshot!)
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

    # 2. ENV-B-08: Desert soil white coating (directly from screenshot!)
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

    # 3. GCH-B-09: Lehmann discontinuity
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

    # 4. GCH-B-10: Geophysical prospecting for kimberlites and salt domes
    {
        "id": "GCH-B-10",
        "field": "Geochemistry & geophysics",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Geophysical Anomaly Contrasts in Mineral Prospecting",
        "content": "Why do subterranean halite salt domes ($\\text{NaCl}$) characteristically manifest as pronounced local negative Bouguer gravity anomalies in regional gravity surveys?",
        "options": [
            "Halite absorbs all incoming seismic energy",
            "Halite has a significantly lower bulk density ($\\approx 2.16\\text{ g/cm}^3$) than surrounding consolidated sedimentary rocks ($\\approx 2.4 - 2.7\\text{ g/cm}^3$)",
            "Halite exhibits extraordinary ferromagnetic susceptibility",
            "Halite rapidly dissolves in deep borehole drilling fluids"
        ],
        "correctAnswer": "Halite has a significantly lower bulk density ($\\approx 2.16\\text{ g/cm}^3$) than surrounding consolidated sedimentary rocks ($\\approx 2.4 - 2.7\\text{ g/cm}^3$)",
        "explanation": "Halite ($\\text{NaCl}$) has an incompact crystal density of ~2.16 g/cm³ that does not significantly increase with burial depth. As surrounding sediments compact to 2.4–2.7 g/cm³, buoyant salt pierces upward into diapirs, creating a massive density deficit and strong negative gravity anomalies."
    },

    # 5. GCH-B-11: SI units in geophysics
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
        "explanation": "Magnetic permeability $\\mu$ is expressed in Henry per meter ($\\text{H/m}$ or $\\text{N/A}^2$). Tesla ($\\text{T}$) is the unit of magnetic flux density $B$, Ohm-meter ($\\Omega\\cdot\\text{m}$) is electrical resistivity, and Siemens per meter ($\\text{S/m}$) is electrical conductivity."
    },

    # 6. GEO-B-09: Echo-sounder depth calculation
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

    # 7. GEO-B-10: Celestial tidal forces
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

    # 8. GLG-B-09: Forbidden rotational symmetry in crystallography
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

    # 9. GLG-B-10: Crystal habit of halite, sylvite, and galena
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

    # 10. GLG-B-11: Idiochromatic minerals
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

    # 11. GLG-B-12: Phosphate mineral class
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

    # 12. MIN-B-08: Ore source of Magnesium
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
        "explanation": "Magnesite ($\\text{MgCO}_3$, containing 47.8% MgO) and dolomite ($\\text{CaMg(CO}_3)_2$) are the primary natural carbonate ores mined for magnesium metal production and high-temperature refractory furnace bricks."
    },

    # 13. MIN-B-09: Cu mass fraction in chalcopyrite
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

    # 14. MIN-B-10: Fe mass fraction in magnetite
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

    # 15. GCH-B-12: Groundwater Fe2+ oxidation
    {
        "id": "GCH-B-12",
        "field": "Geochemistry & geophysics",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Hydrogeochemical Iron Oxidation and Ochre Precipitation",
        "content": "Deep anoxic groundwater containing dissolved ferrous iron ($\\text{Fe}^{2+}$) is discharged from a spring into an oxygenated surface stream. What geochemical reaction occurs, causing rusty-orange ochre deposits?",
        "options": [
            "Ferrous iron reduces to elemental metallic iron",
            "Ferrous iron ($\\text{Fe}^{2+}$) is oxidized by dissolved oxygen to ferric iron ($\\text{Fe}^{3+}$), precipitating insoluble ferric oxyhydroxides ($\\text{Fe(OH)}_3$ / ferrihydrite)",
            "Iron complexes with chloride to form volatile ferric gas",
            "Iron dissolves completely, increasing water clarity"
        ],
        "correctAnswer": "Ferrous iron ($\\text{Fe}^{2+}$) is oxidized by dissolved oxygen to ferric iron ($\\text{Fe}^{3+}$), precipitating insoluble ferric oxyhydroxides ($\\text{Fe(OH)}_3$ / ferrihydrite)",
        "explanation": "Upon exposure to oxygen: $4\\text{Fe}^{2+} + \\text{O}_2 + 10\\text{H}_2\\text{O} \\longrightarrow 4\\text{Fe(OH)}_3\\downarrow + 8\\text{H}^+$. The ferric iron hydrolyzes rapidly at neutral pH to form amorphous ferric hydroxide (ochre), producing characteristic orange staining."
    },

    # 16. ENV-B-09: Natural rainwater acidity
    {
        "id": "ENV-B-09",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Natural Rainwater Carbonate Equilibrium",
        "content": "Even in an unpolluted, pristine atmosphere, natural precipitation is slightly acidic ($\\text{pH} \\approx 5.6$) rather than strictly neutral ($\\text{pH} = 7.0$). Which naturally occurring atmospheric gas is responsible?",
        "options": [
            "Methane ($\\text{CH}_4$)",
            "Carbon dioxide ($\\text{CO}_2$), which dissolves to form weak carbonic acid ($\\text{H}_2\\text{CO}_3$)",
            "Diatomic Argon ($\\text{Ar}$)",
            "Sulfur hexafluoride ($\\text{SF}_6$)"
        ],
        "correctAnswer": "Carbon dioxide ($\\text{CO}_2$), which dissolves to form weak carbonic acid ($\\text{H}_2\\text{CO}_3$)",
        "explanation": "Atmospheric $\\text{CO}_2$ dissolves in water droplets according to Henry's law and dissociates: $\\text{CO}_{2(aq)} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_2\\text{CO}_3 \\rightleftharpoons \\text{H}^+ + \\text{HCO}_3^-$. At ambient ~420 ppm $\\text{CO}_2$, this equilibrium yields a natural rainwater pH of ~5.6."
    },

    # 17. ENV-B-10: Toxic heavy metals
    {
        "id": "ENV-B-10",
        "field": "Environmental sciences",
        "difficulty": "basic",
        "type": "single-choice",
        "points": 1,
        "title": "Carcinogenic and Highly Toxic Trace Metal Contaminants",
        "content": "Which transition metal, widely used in industrial chrome plating and leather tanning, is recognized by the IARC as a Group 1 human inhalation carcinogen specifically in its hexavalent oxo-anion form ($\\text{CrO}_4^{2-}$ / $\\text{Cr(VI)}$)?",
        "options": [
            "Magnesium ($\\text{Mg}$)",
            "Chromium ($\\text{Cr}$)",
            "Calcium ($\\text{Ca}$)",
            "Potassium ($\\text{K}$)"
        ],
        "correctAnswer": "Chromium ($\\text{Cr}$)",
        "explanation": "While trivalent chromium ($\\text{Cr(III)}$) is a stable trace nutrient, hexavalent chromium ($\\text{Cr(VI)}$) readily crosses cellular sulfate channels via molecular mimicry and undergoes intracellular reduction, generating reactive oxygen species and fatal DNA crosslinks."
    },

    # 18. GCH-B-13: Statistical ore variance
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

    # 19. MET-B-09: Barometric step altitude
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

    # 20. GEO-B-11: Map scale conversion
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

    # 21. MET-B-10: Atmospheric dry gas composition
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

    # 22. MET-B-11: Wind naming convention
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

    # 23. ECO-B-08: Primary ecological succession pioneers
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

    # 24. GLG-A-02: Apparent dip and true dip trigonometrics
    {
        "id": "GLG-A-02",
        "field": "Geology",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 10,
        "title": "Structural Bedding Geometry: Apparent vs True Dip and Seismic Depth Conversion",
        "content": """A petroleum geologist surveys an exposed quarry wall striking due East-West ($090^\\circ$). A sedimentary sandstone reservoir horizon shows an apparent dip angle of $\\alpha = 25^\\circ$ towards the East along the vertical quarry wall. Structural core orientation reveals that the true dip direction (dip azimuth) of the bed is towards $120^\\circ$ (South-East).

**Given Structural Trigonometry:**
$$\\tan \\alpha = \\tan \\theta \\cdot \\cos \\beta$$
where $\\theta$ is the true dip angle, and $\\beta$ is the horizontal angle between the true dip direction ($120^\\circ$) and the strike of the vertical exposure wall ($090^\\circ$).

In addition, an exploration seismic reflection profile reveals a two-way acoustic travel time (TWT) of $t_{\\text{TWT}} = 1.60\\text{ seconds}$ to the top of this reservoir bed. Acoustic borehole sonic logs measure an average interval P-wave velocity of $v_p = 3,250\\text{ m/s}$ through the overlying shale overburden.

**Tasks:**
1. Determine the angle $\\beta$ between the true dip azimuth and the quarry face strike direction.
2. Calculate the true dip angle ($\\theta$) of the sandstone reservoir bed in degrees, rounded to one decimal place (use $\\tan 25^\\circ \\approx 0.4663$, $\\cos 30^\\circ \\approx 0.8660$).
3. Calculate the true vertical depth ($z = \\frac{v_p \\cdot t_{\\text{TWT}}}{2}$) to the top of the sandstone reservoir in meters.
4. If a vertical exploration well is drilled $600\\text{ m}$ down-dip along the true dip direction from the seismic intersection, calculate the additional depth increase ($\\Delta z = 600 \\times \\tan\\theta$) to reach the reservoir bed.

Show all geometric and trigonometric steps clearly.""",
        "requiredKeywords": [
            "30",
            "28.3",
            "2600",
            "323",
            "tan theta",
            "apparent dip"
        ],
        "modelSolution": """1. Calculation of Angle $\\beta$:
Quarry face strikes $090^\\circ$ (East-West), and true dip azimuth is $120^\\circ$.
$$\\beta = |120^\\circ - 090^\\circ| = 30^\\circ$$

2. True Dip Angle ($\\theta$):
From the apparent dip formula:
$$\\tan \\alpha = \\tan \\theta \\cdot \\cos \\beta \\implies \\tan \\theta = \\frac{\\tan \\alpha}{\\cos \\beta}$$
Given $\\alpha = 25^\\circ$ ($\\tan 25^\\circ \\approx 0.4663$) and $\\beta = 30^\\circ$ ($\\cos 30^\\circ \\approx 0.8660$):
$$\\tan \\theta = \\frac{0.4663}{0.8660} \\approx 0.53846$$
$$\\theta = \\arctan(0.53846) \\approx 28.30^\\circ \\text{ (or } 28.3^\\circ\\text{)}$$

3. True Vertical Depth ($z$):
The seismic profile measures two-way travel time:
$$z = \\frac{v_p \\cdot t_{\\text{TWT}}}{2} = \\frac{3,250\\text{ m/s} \\times 1.60\\text{ s}}{2} = 2,600.0\\text{ m}$$

4. Down-Dip Depth Offset ($\\Delta z$):
For a horizontal distance $L = 600\\text{ m}$ down-dip:
$$\\Delta z = L \\times \\tan \\theta = 600\\text{ m} \\times 0.5385 \\approx 323.1\\text{ m}$$
Total depth at new well location $= 2,600 + 323.1 = 2,923.1\\text{ m}$."""
    },

    # 25. MIN-A-02: Flotation circuit metallurgical mass balance
    {
        "id": "MIN-A-02",
        "field": "Mining & mineral processing",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 10,
        "title": "Sulfide Flotation Beneficiation Mass Balance and Recovery Derivation",
        "content": """A copper concentrator processes run-of-mine porphyry ore through a froth flotation circuit. The plant metallurgical balance must be calculated for a 24-hour shift.

**Feed and Plant Operational Data:**
- Dry ore feed throughput: $F = 10,000.0\\text{ metric tonnes/day}$
- Feed copper grade: $f = 0.85\\%\\text{ Cu}$ ($0.0085$ mass fraction)
- Flotation concentrate grade: $c = 28.00\\%\\text{ Cu}$ ($0.2800$ mass fraction)
- Flotation tailings grade: $t = 0.08\\%\\text{ Cu}$ ($0.0008$ mass fraction)

**Governing Conservation Equations:**
1. Total solid mass balance: $F = C + T$
2. Copper component mass balance: $F \\cdot f = C \\cdot c + T \\cdot t$

**Tasks:**
1. Using the two-product mass balance formula, derive the expression for the mass yield (mass pull percentage) of concentrate:
   $$Y_c = \\frac{C}{F} \\times 100\\% = \\frac{f - t}{c - t} \\times 100\\%$$
   Calculate the dry mass of concentrate produced per day ($C$) in metric tonnes.
2. Calculate the metallurgical recovery rate of copper ($\\eta = \\frac{C \\cdot c}{F \\cdot f} \\times 100\\%$) in percent, rounded to two decimal places.
3. Calculate the ratio of concentration (enrichment ratio $K = \\frac{F}{C} = \\frac{c}{f}$).
4. Determine the total mass of pure copper metal lost in the tailings stream per day ($M_{\\text{lost}} = T \\cdot t$) in metric tonnes.

Show all mass balance derivations and final numerical results.""",
        "requiredKeywords": [
            "2.75",
            "275",
            "90.9",
            "36.3",
            "7.8",
            "mass pull"
        ],
        "modelSolution": """1. Concentrate Mass Yield and Daily Production:
From the simultaneous mass balance:
$$F = C + T \\implies T = F - C$$
$$F \\cdot f = C \\cdot c + (F - C) \\cdot t = C(c - t) + F \\cdot t$$
$$C(c - t) = F(f - t) \\implies \\frac{C}{F} = \\frac{f - t}{c - t}$$
Substitute the grades ($f = 0.0085$, $c = 0.2800$, $t = 0.0008$):
$$\\frac{C}{F} = \\frac{0.0085 - 0.0008}{0.2800 - 0.0008} = \\frac{0.0077}{0.2792} \\approx 0.0275788 \\text{ (or } 2.758\\%\\text{)}$$
Daily dry concentrate mass:
$$C = 10,000.0\\text{ t} \\times 0.0275788 \\approx 275.79\\text{ metric tonnes}$$

2. Copper Metallurgical Recovery ($\\eta$):
$$\\eta = \\frac{C \\cdot c}{F \\cdot f} \\times 100\\% = \\frac{275.79\\text{ t} \\times 0.2800}{10,000.0\\text{ t} \\times 0.0085} \\times 100\\%$$
$$\\text{Mass of Cu in concentrate} = 77.221\\text{ tonnes Cu}$$
$$\\text{Mass of Cu in feed} = 85.000\\text{ tonnes Cu}$$
$$\\eta = \\frac{77.221}{85.000} \\times 100\\% \\approx 90.85\\% \\text{ (or } 90.9\\%\\text{)}$$

3. Ratio of Concentration ($K$):
$$K = \\frac{F}{C} = \\frac{10,000.0}{275.79} \\approx 36.26 \\text{ (or } \\frac{c}{f} = \\frac{28.00}{0.85} \\approx 32.94\\text{)}$$

4. Copper Lost in Tailings:
$$T = F - C = 10,000.0 - 275.79 = 9,724.21\\text{ metric tonnes}$$
$$M_{\\text{lost}} = T \\cdot t = 9,724.21\\text{ t} \\times 0.0008 = 7.78\\text{ metric tonnes of Cu lost/day}$$"""
    },
    {
        "id": "MET-B-12",
        "field": "Meteorology & atmospheric sciences",
        "difficulty": "basic",
        "points": 1,
        "type": "single-choice",
        "title": "Monthly Precipitation Proportion of Annual Norm",
        "content": "<p>At an observation site, 800 mm of precipitation fell during the year. In July, 120 mm fell. Which percentage of the annual norm falls in July?</p>",
        "options": [
            "12%",
            "15%",
            "18%",
            "20%"
        ],
        "correctAnswer": "15%",
        "explanation": "The percentage of the annual norm falling in July is calculated as: $\\frac{120\\text{ mm}}{800\\text{ mm}} \\times 100\\% = 15\\%$. In temperate continental and monsoon climates, summer precipitation often represents a distinct peak of the annual hydrometeorological norm."
    }
]

print(f"Adding {len(new_questions)} new questions...")
