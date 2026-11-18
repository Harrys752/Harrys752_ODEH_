#!/usr/bin/env python3
"""
generate_parametric_bank.py
Generates 44 parametric multi-variant questions and appends them to questions.js.
Each question has a templateId and params for parametric family identification.
"""

import json
import re
import os

# ============================================================
# HELPER: build a question dict
# ============================================================
def q(id_, templateId, field, difficulty, points, type_, title, content,
      options, correctAnswer, explanation, params,
      modelSolution=None, requiredKeywords=None):
    obj = {
        "id": id_,
        "templateId": templateId,
        "field": field,
        "difficulty": difficulty,
        "points": points,
        "type": type_,
        "title": title,
        "content": content,
        "params": params,
        "options": options,
        "correctAnswer": correctAnswer,
        "explanation": explanation,
    }
    if requiredKeywords is not None:
        obj["requiredKeywords"] = requiredKeywords
    if modelSolution is not None:
        obj["modelSolution"] = modelSolution
    return obj

QUESTIONS = []

# ============================================================
# 1. Cartographic Scale  (6 variants)
# ============================================================
scale_variants = [
    ("PARAM-GEO-SCALE-01", 25000,  1.8),
    ("PARAM-GEO-SCALE-02", 50000,  2.4),
    ("PARAM-GEO-SCALE-03", 100000, 3.2),
    ("PARAM-GEO-SCALE-04", 200000, 4.5),
    ("PARAM-GEO-SCALE-05", 250000, 6.4),
    ("PARAM-GEO-SCALE-06", 500000, 3.2),
]
for vid, scale, ruler_cm in scale_variants:
    answer_km = ruler_cm * scale / 100000
    # build distractors
    d1 = round(answer_km * 0.5, 2)
    d2 = round(answer_km * 1.5, 2)
    d3 = round(answer_km * 2.0, 2)
    correct_str = f"{answer_km:.1f} km"
    opts = [correct_str, f"{d1:.1f} km", f"{d2:.1f} km", f"{d3:.1f} km"]

    QUESTIONS.append(q(
        id_=vid,
        templateId="PARAM-GEO-SCALE",
        field="Geography, physical",
        difficulty="basic",
        points=1,
        type_="single-choice",
        title="Cartographic Scale Distance Calculation",
        content=(
            f"<p>On a topographic map at a scale of $1:{scale:,}$.replace(',','\\\\,')$, "
            f"the distance between two landmarks measures ${ruler_cm}\\\\text{{ cm}}$ with a ruler. "
            f"What is the actual ground distance in kilometres?</p>"
        ).replace(".replace(',','\\\\,')",""),
        options=opts,
        correctAnswer=correct_str,
        explanation=(
            f"Ground distance $= {ruler_cm}\\\\text{{ cm}} \\\\times {scale:,} = "
            f"{ruler_cm * scale:,.0f}\\\\text{{ cm}} = "
            f"{ruler_cm * scale / 100:,.0f}\\\\text{{ m}} = "
            f"{answer_km}\\\\text{{ km}}$."
        ),
        params={"scale": scale, "ruler_cm": ruler_cm, "answer_km": answer_km}
    ))

# Fix content to use \\, in scale numbers for LaTeX
for qobj in QUESTIONS:
    # Replace comma-formatted scale in $1:...$ with \, separator
    pass  # We'll just format the number directly without commas for simplicity

# Let me redo content more carefully
QUESTIONS.clear()

for vid, scale, ruler_cm in scale_variants:
    answer_km = ruler_cm * scale / 100000
    d1 = round(answer_km * 0.5, 2)
    d2 = round(answer_km * 1.5, 2)
    d3 = round(answer_km * 2.0, 2)
    correct_str = f"{answer_km:g} km"
    opts = [correct_str, f"{d1:g} km", f"{d2:g} km", f"{d3:g} km"]

    scale_str = f"{scale}"

    QUESTIONS.append(q(
        id_=vid,
        templateId="PARAM-GEO-SCALE",
        field="Geography, physical",
        difficulty="basic",
        points=1,
        type_="single-choice",
        title="Cartographic Scale Distance Calculation",
        content=(
            f"<p>On a topographic map at a scale of $1\\\\!:\\\\!{scale_str}$, "
            f"the distance between two landmarks measures ${ruler_cm}\\\\text{{ cm}}$ with a ruler. "
            f"What is the actual ground distance in kilometres?</p>"
        ),
        options=opts,
        correctAnswer=correct_str,
        explanation=(
            f"Ground distance $= {ruler_cm}\\\\text{{ cm}} \\\\times {scale_str} = "
            f"{ruler_cm * scale:g}\\\\text{{ cm}} = "
            f"{ruler_cm * scale / 100:g}\\\\text{{ m}} = "
            f"{answer_km:g}\\\\text{{ km}}$."
        ),
        params={"scale": scale, "ruler_cm": ruler_cm, "answer_km": answer_km}
    ))

# ============================================================
# 2. Echo-Sounding Bathymetry  (5 variants)
# ============================================================
echo_variants = [
    ("PARAM-GCH-ECHO-01", 1.6, 1500),
    ("PARAM-GCH-ECHO-02", 2.4, 1480),
    ("PARAM-GCH-ECHO-03", 3.2, 1500),
    ("PARAM-GCH-ECHO-04", 4.8, 1520),
    ("PARAM-GCH-ECHO-05", 6.0, 1500),
]
for vid, twt, speed in echo_variants:
    depth = speed * twt / 2
    d1 = round(depth * 0.5, 0)
    d2 = round(depth * 1.5, 0)
    d3 = round(speed * twt, 0)  # common mistake: forgetting /2
    correct_str = f"{depth:g} m"
    opts = [
        correct_str,
        f"{d1:g} m",
        f"{d2:g} m",
        f"{d3:g} m"
    ]

    QUESTIONS.append(q(
        id_=vid,
        templateId="PARAM-GCH-ECHO",
        field="Geochemistry & mineralogy",
        difficulty="basic",
        points=1,
        type_="single-choice",
        title="Echo-Sounding Bathymetric Depth Calculation",
        content=(
            f"<p>A research vessel performs echo-sounding. The two-way travel time (TWT) "
            f"of the acoustic pulse is ${twt}\\\\text{{ s}}$ and the sound velocity in seawater "
            f"is ${speed}\\\\text{{ m/s}}$. What is the ocean depth at this point?</p>"
        ),
        options=opts,
        correctAnswer=correct_str,
        explanation=(
            f"Depth $= \\\\frac{{v \\\\times t}}{{2}} = \\\\frac{{{speed} \\\\times {twt}}}{{2}} "
            f"= \\\\frac{{{speed * twt:g}}}{{2}} = {depth:g}\\\\text{{ m}}$."
        ),
        params={"twt_s": twt, "speed_ms": speed, "depth_m": depth}
    ))

# ============================================================
# 3. Barometric Altitude  (4 variants)
# ============================================================
baro_variants = [
    ("PARAM-MET-BARO-01", 760, 740, 10.5),
    ("PARAM-MET-BARO-02", 765, 745, 11.0),
    ("PARAM-MET-BARO-03", 758, 720, 10.5),
    ("PARAM-MET-BARO-04", 755, 710, 11.0),
]
for vid, p_base, p_summit, step in baro_variants:
    dp = p_base - p_summit
    alt_diff = dp * step
    d1 = round(alt_diff * 0.8, 1)
    d2 = round(alt_diff * 1.2, 1)
    d3 = round(alt_diff + 50, 1)
    correct_str = f"{alt_diff:g} m"
    opts = [correct_str, f"{d1:g} m", f"{d2:g} m", f"{d3:g} m"]

    QUESTIONS.append(q(
        id_=vid,
        templateId="PARAM-MET-BARO",
        field="Meteorology & atmospheric sciences",
        difficulty="basic",
        points=1,
        type_="single-choice",
        title="Barometric Altitude Determination",
        content=(
            f"<p>At the base of a mountain the barometer reads ${p_base}\\\\text{{ mmHg}}$ "
            f"and at the summit it reads ${p_summit}\\\\text{{ mmHg}}$. Using the simplified "
            f"barometric step of ${step}\\\\text{{ m/mmHg}}$, determine the altitude difference.</p>"
        ),
        options=opts,
        correctAnswer=correct_str,
        explanation=(
            f"$\\\\Delta P = {p_base} - {p_summit} = {dp}\\\\text{{ mmHg}}$. "
            f"$\\\\Delta h = {dp} \\\\times {step} = {alt_diff:g}\\\\text{{ m}}$."
        ),
        params={"p_base": p_base, "p_summit": p_summit, "step": step, "alt_diff_m": alt_diff}
    ))

# ============================================================
# 4. Tropospheric Lapse Rate  (4 variants)
# ============================================================
lapse_variants = [
    ("PARAM-MET-LAPSE-01", 200, 3200, 26, 6.5),
    ("PARAM-MET-LAPSE-02", 400, 4400, 20, 6.0),
    ("PARAM-MET-LAPSE-03", 600, 5600, 18, 6.5),
    ("PARAM-MET-LAPSE-04", 800, 5800, 8, 6.0),
]
for vid, z_base, z_summit, t_base, gamma in lapse_variants:
    dz_km = (z_summit - z_base) / 1000
    t_summit = t_base - gamma * dz_km
    d1 = round(t_summit + 5, 1)
    d2 = round(t_summit - 5, 1)
    d3 = round(t_base - 6.25 * dz_km, 1)  # slightly different gamma distractor
    correct_str = f"{t_summit:g} °C"
    opts = [correct_str, f"{d1:g} °C", f"{d2:g} °C", f"{d3:g} °C"]

    sign = "+" if t_base >= 0 else ""

    QUESTIONS.append(q(
        id_=vid,
        templateId="PARAM-MET-LAPSE",
        field="Meteorology & atmospheric sciences",
        difficulty="basic",
        points=1,
        type_="single-choice",
        title="Tropospheric Temperature Lapse Rate Calculation",
        content=(
            f"<p>The air temperature at an elevation of ${z_base}\\\\text{{ m}}$ is "
            f"${sign}{t_base}\\\\text{{ °C}}$. Using the average tropospheric lapse rate "
            f"$\\\\gamma = {gamma}\\\\text{{ °C/km}}$, estimate the temperature at "
            f"${z_summit}\\\\text{{ m}}$.</p>"
        ),
        options=opts,
        correctAnswer=correct_str,
        explanation=(
            f"$\\\\Delta z = {z_summit} - {z_base} = {z_summit - z_base}\\\\text{{ m}} = {dz_km:g}\\\\text{{ km}}$. "
            f"$T_{{\\\\text{{summit}}}} = {sign}{t_base} - {gamma} \\\\times {dz_km:g} "
            f"= {sign}{t_base} - {gamma * dz_km:g} = {t_summit:g}\\\\text{{ °C}}$."
        ),
        params={"z_base_m": z_base, "z_summit_m": z_summit, "t_base_C": t_base,
                "gamma_Ckm": gamma, "t_summit_C": t_summit}
    ))

# ============================================================
# 5. Mineral Mass Fraction  (6 variants)
# ============================================================
# Molar masses: Fe=55.85, O=16.00, Cu=63.55, S=32.06, Pb=207.2, Zn=65.38
mineral_variants = [
    ("PARAM-MIN-MASS-01", "Fe", "Fe\\\\textsubscript{2}O\\\\textsubscript{3}",
     "Fe₂O₃", 2*55.85, 2*55.85 + 3*16.00, "iron", "hematite"),
    ("PARAM-MIN-MASS-02", "Fe", "Fe\\\\textsubscript{3}O\\\\textsubscript{4}",
     "Fe₃O₄", 3*55.85, 3*55.85 + 4*16.00, "iron", "magnetite"),
    ("PARAM-MIN-MASS-03", "Cu", "CuFeS\\\\textsubscript{2}",
     "CuFeS₂", 63.55, 63.55 + 55.85 + 2*32.06, "copper", "chalcopyrite"),
    ("PARAM-MIN-MASS-04", "Cu", "Cu\\\\textsubscript{2}S",
     "Cu₂S", 2*63.55, 2*63.55 + 32.06, "copper", "chalcocite"),
    ("PARAM-MIN-MASS-05", "Pb", "PbS",
     "PbS", 207.2, 207.2 + 32.06, "lead", "galena"),
    ("PARAM-MIN-MASS-06", "Zn", "ZnS",
     "ZnS", 65.38, 65.38 + 32.06, "zinc", "sphalerite"),
]
for vid, element, formula_tex, formula_plain, m_elem, m_total, elem_name, mineral_name in mineral_variants:
    pct = round(m_elem / m_total * 100, 1)
    d1 = round(pct - 7, 1)
    d2 = round(pct + 5, 1)
    d3 = round(pct * 0.85, 1)
    correct_str = f"{pct}%"
    opts = [correct_str, f"{d1}%", f"{d2}%", f"{d3}%"]

    QUESTIONS.append(q(
        id_=vid,
        templateId="PARAM-MIN-MASS",
        field="Geochemistry & mineralogy",
        difficulty="basic",
        points=1,
        type_="single-choice",
        title=f"Mass Fraction of {elem_name.title()} in {mineral_name.title()}",
        content=(
            f"<p>Calculate the mass fraction (percentage) of {elem_name} in the mineral "
            f"{mineral_name} ({formula_plain}). "
            f"Use molar masses: $M(\\\\text{{{element}}}) = {m_elem:g}\\\\text{{ g/mol}}$, "
            f"$M(\\\\text{{{formula_plain}}}) = {m_total:g}\\\\text{{ g/mol}}$.</p>"
        ),
        options=opts,
        correctAnswer=correct_str,
        explanation=(
            f"Mass fraction $\\\\omega = \\\\frac{{{m_elem:g}}}{{{m_total:g}}} \\\\times 100\\\\% "
            f"= {pct}\\\\%$."
        ),
        params={"element": element, "mineral": formula_plain,
                "m_element": round(m_elem, 2), "m_total": round(m_total, 2), "pct": pct}
    ))

# ============================================================
# 6. Ore Body Prism Volume  (4 variants)
# ============================================================
prism_variants = [
    ("PARAM-MIN-PRISM-01", 1200, 800,  200),
    ("PARAM-MIN-PRISM-02", 2400, 1600, 300),
    ("PARAM-MIN-PRISM-03", 3600, 2400, 150),
    ("PARAM-MIN-PRISM-04", 4800, 3600, 500),
]
for vid, s1, s2, length in prism_variants:
    vol = (s1 + s2) / 2 * length
    d1 = round(vol * 0.75)
    d2 = round(vol * 1.25)
    d3 = s1 * length  # common mistake: using only S1
    correct_str = f"{vol:,.0f} m³".replace(",", "\\\\,")
    opt_d1 = f"{d1:,.0f} m³".replace(",", "\\\\,")
    opt_d2 = f"{d2:,.0f} m³".replace(",", "\\\\,")
    opt_d3 = f"{d3:,.0f} m³".replace(",", "\\\\,")
    opts = [correct_str, opt_d1, opt_d2, opt_d3]

    QUESTIONS.append(q(
        id_=vid,
        templateId="PARAM-MIN-PRISM",
        field="Mining & mineral processing",
        difficulty="basic",
        points=1,
        type_="single-choice",
        title="Ore Body Volume by Prismoidal Method",
        content=(
            f"<p>An ore body is approximated by a prismoid with cross-sectional areas "
            f"$S_1 = {s1:,}\\\\text{{ m}}^2$ and $S_2 = {s2:,}\\\\text{{ m}}^2$, "
            f"separated by a distance $L = {length}\\\\text{{ m}}$. "
            f"Calculate the volume using $V = \\\\frac{{S_1 + S_2}}{{2}} \\\\times L$.</p>"
        ),
        options=opts,
        correctAnswer=correct_str,
        explanation=(
            f"$V = \\\\frac{{{s1:,} + {s2:,}}}{{2}} \\\\times {length} "
            f"= \\\\frac{{{s1+s2:,}}}{{2}} \\\\times {length} "
            f"= {(s1+s2)//2:,} \\\\times {length} = {vol:,.0f}\\\\text{{ m}}^3$."
        ),
        params={"S1_m2": s1, "S2_m2": s2, "L_m": length, "volume_m3": vol}
    ))

# ============================================================
# 7. Precipitation Percentage  (4 variants)
# ============================================================
precip_variants = [
    ("PARAM-MET-PRECIP-01", 600,  90,  "June"),
    ("PARAM-MET-PRECIP-02", 800,  120, "July"),
    ("PARAM-MET-PRECIP-03", 1000, 150, "August"),
    ("PARAM-MET-PRECIP-04", 1200, 180, "July"),
]
for vid, annual, month_mm, month_name in precip_variants:
    pct = month_mm / annual * 100
    d1 = round(pct + 3, 0)
    d2 = round(pct - 3, 0)
    d3 = round(pct * 1.4, 0)
    correct_str = f"{pct:g}%"
    opts = [correct_str, f"{d1:g}%", f"{d2:g}%", f"{d3:g}%"]

    QUESTIONS.append(q(
        id_=vid,
        templateId="PARAM-MET-PRECIP",
        field="Meteorology & atmospheric sciences",
        difficulty="basic",
        points=1,
        type_="single-choice",
        title="Monthly Precipitation as Percentage of Annual Total",
        content=(
            f"<p>At an observation station, the annual precipitation total is "
            f"${annual}\\\\text{{ mm}}$. In {month_name}, ${month_mm}\\\\text{{ mm}}$ fell. "
            f"What percentage of the annual total does {month_name} represent?</p>"
        ),
        options=opts,
        correctAnswer=correct_str,
        explanation=(
            f"$\\\\frac{{{month_mm}}}{{{annual}}} \\\\times 100\\\\% = {pct:g}\\\\%$."
        ),
        params={"annual_mm": annual, "month_mm": month_mm,
                "month": month_name, "pct": pct}
    ))

# ============================================================
# 8. Fluvial Cardinal Direction  (4 variants)
# ============================================================
river_variants = [
    ("PARAM-GEO-RIVER-01", "Ob", 51.0, 84.0, 66.5, 69.5, "south-to-north"),
    ("PARAM-GEO-RIVER-02", "Yenisei", 51.7, 94.5, 71.8, 82.7, "south-to-north"),
    ("PARAM-GEO-RIVER-03", "Amur", 48.4, 121.5, 52.9, 141.1, "west-to-east"),
    ("PARAM-GEO-RIVER-04", "Volga", 57.2, 32.3, 45.7, 47.9, "north-to-south"),
]
for vid, river, src_lat, src_lon, mouth_lat, mouth_lon, direction in river_variants:
    QUESTIONS.append(q(
        id_=vid,
        templateId="PARAM-GEO-RIVER",
        field="Geography, physical",
        difficulty="basic",
        points=1,
        type_="short-answer",
        title=f"Cardinal Flow Direction of the {river} River",
        content=(
            f"<p>The source of the {river} River is located at approximately "
            f"${src_lat}°\\\\text{{N}}$, ${src_lon}°\\\\text{{E}}$, and its mouth at "
            f"${mouth_lat}°\\\\text{{N}}$, ${mouth_lon}°\\\\text{{E}}$. "
            f"Determine the predominant cardinal direction of the river's flow.</p>"
        ),
        options=[],
        correctAnswer=direction,
        explanation=(
            f"Comparing source ({src_lat}°N, {src_lon}°E) and mouth ({mouth_lat}°N, {mouth_lon}°E): "
            f"the dominant shift in coordinates indicates a {direction} flow direction."
        ),
        params={"river": river, "src_lat": src_lat, "src_lon": src_lon,
                "mouth_lat": mouth_lat, "mouth_lon": mouth_lon, "direction": direction}
    ))

# ============================================================
# 9. Solar Midday Altitude (4 variants) — Advanced
# ============================================================
solar_variants = [
    ("PARAM-ADV-SOLAR-01", "Saint Petersburg", 60.0, "Summer Solstice", 23.44),
    ("PARAM-ADV-SOLAR-02", "Novosibirsk", 55.0,     "Winter Solstice", -23.44),
    ("PARAM-ADV-SOLAR-03", "Murmansk", 69.0,        "Equinox", 0.0),
    ("PARAM-ADV-SOLAR-04", "Irkutsk", 52.0,         "Summer Solstice", 23.44),
]
for vid, city, lat, date, decl in solar_variants:
    h_noon = 90 - abs(lat - decl)
    h_str = f"{h_noon:g}°"

    QUESTIONS.append(q(
        id_=vid,
        templateId="PARAM-ADV-SOLAR",
        field="Geography, physical",
        difficulty="advanced",
        points=10,
        type_="extended-response",
        title=f"Solar Noon Altitude — {city} on {date}",
        content=(
            f"<p>Calculate the altitude of the Sun above the horizon at solar noon "
            f"in <strong>{city}</strong> (latitude $\\\\varphi = {lat}°\\\\text{{N}}$) "
            f"on the <strong>{date}</strong> (solar declination $\\\\delta = {decl:+g}°$).</p>"
            f"<p>Use the formula: $h = 90° - |\\\\varphi - \\\\delta|$.</p>"
            f"<p>Show all steps and explain the physical meaning of the result.</p>"
        ),
        options=[],
        correctAnswer=h_str,
        explanation=(
            f"$h = 90° - |{lat} - ({decl:+g})| = 90° - |{lat - decl:g}| = 90° - {abs(lat - decl):g} = {h_noon:g}°$."
        ),
        params={"city": city, "latitude": lat, "date": date,
                "declination": decl, "h_noon": h_noon},
        requiredKeywords=[f"{h_noon:g}", "90", f"{abs(lat - decl):g}"],
        modelSolution=(
            f"Solution method:\\n"
            f"1. Identify the parameters:\\n"
            f"   - Latitude: $\\\\varphi = {lat}°\\\\text{{N}}$\\n"
            f"   - Solar declination on {date}: $\\\\delta = {decl:+g}°$\\n\\n"
            f"2. Apply the solar noon altitude formula for the Northern Hemisphere:\\n"
            f"   $$h = 90° - |\\\\varphi - \\\\delta|$$\\n\\n"
            f"3. Substitute values:\\n"
            f"   $$h = 90° - |{lat} - ({decl:+g})| = 90° - |{lat - decl:g}| = 90° - {abs(lat - decl):g} = {h_noon:g}°$$\\n\\n"
            f"4. Physical interpretation: The Sun reaches an altitude of ${h_noon:g}°$ above the horizon "
            f"at solar noon in {city} on the {date}. "
            + ("This is the highest noon altitude of the year at this latitude." if decl > 0 and lat > 0 else
               "This is the lowest noon altitude of the year at this latitude." if decl < 0 and lat > 0 else
               "At equinox the noon altitude equals $90° - \\\\varphi$.")
            + "\\n\\nAssessment criteria:\\n"
            f"- Criterion 1: Correctly identified latitude and declination — 0–2 points.\\n"
            f"- Criterion 2: Correct formula application — 0–3 points.\\n"
            f"- Criterion 3: Correct numerical result ${h_noon:g}°$ — 0–3 points.\\n"
            f"- Criterion 4: Physical interpretation — 0–2 points."
        )
    ))

# ============================================================
# 10. Sulfide Dump Oxidation (3 variants) — Advanced
# ============================================================
sulfide_variants = [
    ("PARAM-ADV-SULFIDE-01", 2.0, "FeS\\\\textsubscript{2}", "FeS₂", "pyrite",
     1.84, 119.97, "Ca(OH)\\\\textsubscript{2}", "Ca(OH)₂", "slaked lime", 74.09,
     # Reaction: 2FeS2 + 7O2 + 2H2O -> 2Fe(OH)2 + 4H2SO4; neutralise: H2SO4 + Ca(OH)2 -> CaSO4 + 2H2O
     # Per mol FeS2: 2 mol H2SO4; per mol H2SO4: 1 mol Ca(OH)2
     # so per mol FeS2: 2 mol Ca(OH)2
     2, 1),
    ("PARAM-ADV-SULFIDE-02", 2.5, "CuFeS\\\\textsubscript{2}", "CuFeS₂", "chalcopyrite",
     2.4, 183.52, "CaO", "CaO", "quicklime", 56.08,
     # CuFeS2 oxidation -> 2 mol H2SO4 per mol CuFeS2 (2 S atoms)
     # H2SO4 + CaO -> CaSO4 + H2O; 1:1
     2, 1),
    ("PARAM-ADV-SULFIDE-03", 5.0, "ZnS", "ZnS", "sphalerite",
     3.0, 97.44, "CaCO\\\\textsubscript{3}", "CaCO₃", "limestone", 100.09,
     # ZnS + 2O2 -> ZnSO4 (or via H2SO4); 1 S -> 1 H2SO4
     # H2SO4 + CaCO3 -> CaSO4 + H2O + CO2; 1:1
     1, 1),
]
for (vid, tonnage, formula_tex, formula_plain, mineral_name,
     mass_pct, molar_mass_mineral, reagent_tex, reagent_plain, reagent_name, molar_mass_reagent,
     mol_acid_per_mol_min, mol_reagent_per_mol_acid) in sulfide_variants:

    mass_mineral_kg = tonnage * 1000 * mass_pct / 100
    mass_mineral_g = mass_mineral_kg * 1000
    n_mineral = mass_mineral_g / molar_mass_mineral
    n_acid = n_mineral * mol_acid_per_mol_min
    mass_acid_g = n_acid * 98.08
    mass_acid_kg = mass_acid_g / 1000
    n_reagent = n_acid * mol_reagent_per_mol_acid
    mass_reagent_g = n_reagent * molar_mass_reagent
    mass_reagent_kg = mass_reagent_g / 1000

    QUESTIONS.append(q(
        id_=vid,
        templateId="PARAM-ADV-SULFIDE",
        field="Environmental geochemistry",
        difficulty="advanced",
        points=10,
        type_="extended-response",
        title=f"Sulfide Waste Dump Oxidation — {mineral_name.title()} Neutralization",
        content=(
            f"<p>A mine waste dump contains <strong>{tonnage:g} tonnes</strong> of material "
            f"with <strong>{mass_pct}%</strong> {mineral_name} ({formula_plain}) by mass. "
            f"Upon weathering, the sulfide oxidises completely to produce sulfuric acid.</p>"
            f"<p><strong>Tasks:</strong></p>"
            f"<ol>"
            f"<li>Determine the oxidation state changes of sulfur and the metal cation.</li>"
            f"<li>Calculate the mass of $\\\\text{{H}}_2\\\\text{{SO}}_4$ produced (in kg).</li>"
            f"<li>Calculate the mass of {reagent_name} ({reagent_plain}) needed to fully neutralise "
            f"the acid (in kg).</li>"
            f"</ol>"
            f"<p>Molar masses: $M(\\\\text{{{formula_plain}}}) = {molar_mass_mineral:g}\\\\text{{ g/mol}}$, "
            f"$M(\\\\text{{H}}_2\\\\text{{SO}}_4) = 98.08\\\\text{{ g/mol}}$, "
            f"$M(\\\\text{{{reagent_plain}}}) = {molar_mass_reagent:g}\\\\text{{ g/mol}}$.</p>"
        ),
        options=[],
        correctAnswer=f"{mass_acid_kg:.1f} kg H₂SO₄; {mass_reagent_kg:.1f} kg {reagent_plain}",
        explanation=(
            f"Mass of {mineral_name}: ${tonnage:g} \\\\times 1000 \\\\times {mass_pct/100} = {mass_mineral_kg:g}\\\\text{{ kg}}$. "
            f"Moles: ${mass_mineral_g:g} / {molar_mass_mineral:g} = {n_mineral:.1f}\\\\text{{ mol}}$. "
            f"$\\\\text{{H}}_2\\\\text{{SO}}_4$: ${n_acid:.1f} \\\\times 98.08 = {mass_acid_g:.0f}\\\\text{{ g}} = {mass_acid_kg:.1f}\\\\text{{ kg}}$. "
            f"{reagent_plain}: ${n_reagent:.1f} \\\\times {molar_mass_reagent:g} = {mass_reagent_g:.0f}\\\\text{{ g}} = {mass_reagent_kg:.1f}\\\\text{{ kg}}$."
        ),
        params={
            "tonnage_t": tonnage, "mineral": formula_plain, "mass_pct": mass_pct,
            "molar_mass_mineral": molar_mass_mineral, "reagent": reagent_plain,
            "molar_mass_reagent": molar_mass_reagent,
            "acid_kg": round(mass_acid_kg, 1), "reagent_kg": round(mass_reagent_kg, 1)
        },
        requiredKeywords=[
            f"{mass_mineral_kg:g}", f"{n_mineral:.1f}", f"{mass_acid_kg:.1f}", f"{mass_reagent_kg:.1f}"
        ],
        modelSolution=(
            f"Solution method:\\n"
            f"1. Oxidation numbers:\\n"
            f"   - Sulfur in {formula_plain}: $-2$ (in sulfide) $\\\\to +6$ (in sulfate) — reductant\\n"
            f"   - Oxygen: $0 \\\\to -2$ — oxidant\\n\\n"
            f"2. Mass of {mineral_name} in dump:\\n"
            f"   $m(\\\\text{{{formula_plain}}}) = {tonnage:g} \\\\times 10^3\\\\text{{ kg}} \\\\times {mass_pct/100} = {mass_mineral_kg:g}\\\\text{{ kg}} = {mass_mineral_g:g}\\\\text{{ g}}$\\n\\n"
            f"3. Moles of {mineral_name}:\\n"
            f"   $n = \\\\frac{{{mass_mineral_g:g}}}{{{molar_mass_mineral:g}}} = {n_mineral:.1f}\\\\text{{ mol}}$\\n\\n"
            f"4. Each mole of {formula_plain} contains {mol_acid_per_mol_min} S atom(s), producing {mol_acid_per_mol_min} mol $\\\\text{{H}}_2\\\\text{{SO}}_4$:\\n"
            f"   $n(\\\\text{{H}}_2\\\\text{{SO}}_4) = {n_acid:.1f}\\\\text{{ mol}}$\\n"
            f"   $m(\\\\text{{H}}_2\\\\text{{SO}}_4) = {n_acid:.1f} \\\\times 98.08 = {mass_acid_g:.0f}\\\\text{{ g}} = {mass_acid_kg:.1f}\\\\text{{ kg}}$\\n\\n"
            f"5. Neutralisation with {reagent_plain} (1:{mol_reagent_per_mol_acid} stoichiometry per mol acid):\\n"
            f"   $n(\\\\text{{{reagent_plain}}}) = {n_reagent:.1f}\\\\text{{ mol}}$\\n"
            f"   $m(\\\\text{{{reagent_plain}}}) = {n_reagent:.1f} \\\\times {molar_mass_reagent:g} = {mass_reagent_g:.0f}\\\\text{{ g}} = {mass_reagent_kg:.1f}\\\\text{{ kg}}$\\n\\n"
            f"Answer: ${mass_acid_kg:.1f}\\\\text{{ kg}}$ of $\\\\text{{H}}_2\\\\text{{SO}}_4$; "
            f"${mass_reagent_kg:.1f}\\\\text{{ kg}}$ of $\\\\text{{{reagent_plain}}}$.\\n\\n"
            f"Assessment criteria:\\n"
            f"- Criterion 1: Oxidation state shifts correctly documented — 0–3 points.\\n"
            f"- Criterion 2: Mass of sulfuric acid — 0–4 points.\\n"
            f"- Criterion 3: Mass of neutralising reagent — 0–3 points."
        )
    ))

# ============================================================
# WRITE TO questions.js
# ============================================================
def main():
    js_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "questions.js")
    print(f"Reading {js_path} ...")
    with open(js_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract existing array
    # Pattern: const QUESTION_BANK = [ ... ];
    m = re.search(r'const\s+QUESTION_BANK\s*=\s*\[', content)
    if not m:
        raise RuntimeError("Could not find 'const QUESTION_BANK = [' in questions.js")

    # Find the matching closing ];
    start = m.start()
    bracket_start = m.end() - 1  # position of '['
    depth = 0
    pos = bracket_start
    while pos < len(content):
        ch = content[pos]
        if ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0:
                break
        pos += 1
    array_end = pos  # position of matching ']'

    # Parse existing array JSON
    array_text = content[bracket_start:array_end+1]
    try:
        existing = json.loads(array_text)
    except json.JSONDecodeError:
        # Try with trailing commas removed
        cleaned = re.sub(r',\s*([}\]])', r'\1', array_text)
        existing = json.loads(cleaned)

    existing_ids = {item["id"] for item in existing}
    print(f"Found {len(existing)} existing questions.")

    # Filter out duplicates
    new_qs = [qobj for qobj in QUESTIONS if qobj["id"] not in existing_ids]
    print(f"Adding {len(new_qs)} new parametric questions (skipped {len(QUESTIONS) - len(new_qs)} duplicates).")

    # Merge
    merged = existing + new_qs
    total = len(merged)
    print(f"Total question count: {total}")

    # Serialize merged array
    merged_json = json.dumps(merged, indent=2, ensure_ascii=False)

    # Build new file content
    before = content[:bracket_start]
    after_bracket = content[array_end+1:]
    # after_bracket starts with ';' typically
    new_content = before + merged_json + after_bracket

    # Update the comment at the top
    new_content = re.sub(
        r'Total verified tasks:\s*\d+',
        f'Total verified tasks: {total}',
        new_content
    )

    with open(js_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Successfully wrote {js_path} with {total} questions.")
    return total

if __name__ == "__main__":
    main()
