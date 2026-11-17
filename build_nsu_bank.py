# -*- coding: utf-8 -*-
"""
Novosibirsk State University (NSU) Olympiad Question Bank Generator
Generates 115 verified tasks with clean semantic HTML, authentic Russian terminology,
and the 10 Advanced tasks strictly conforming to Archetypes 41, 42, and 43.
"""

import json
import re

# Load current 115 questions
with open(r'c:\OD-simulation\questions.js', 'r', encoding='utf-8') as f:
    raw = f.read()

start_idx = raw.find('const QUESTION_BANK = ') + len('const QUESTION_BANK = ')
end_idx = raw.rfind(';\n\nif (typeof module')
questions = json.loads(raw[start_idx:end_idx].strip())

print(f"Loaded {len(questions)} questions for NSU transformation.")

def html_clean(text):
    if not text:
        return ""
    # Convert **bold** to <strong>bold</strong>
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    # Convert *italic* to <em>italic</em>
    text = re.sub(r'(?<!\*)\*([^*]+?)\*(?!\*)', r'<em>\1</em>', text)
    return text

# Refine terminology across all questions
for q in questions:
    c = q['content']
    # Specific electrical resistance
    c = c.replace('electrical resistivity', 'specific electrical resistance')
    c = c.replace('Resistivity', 'Specific electrical resistance')
    c = c.replace('resistivity', 'specific electrical resistance')
    c = c.replace('rock dumps', 'rock dumps (отвалы)')
    c = c.replace('subsoil user', 'subsoil user (недропользователь)')
    c = c.replace('sylvite', 'silvin (sylvite)')
    c = c.replace('Sylvite', 'Silvin (sylvite)')
    c = c.replace('slaked lime', 'slaked lime Ca(OH)₂')
    c = c.replace('northern latitude', 'northern latitude (n.l.)')
    
    # Ensure HTML paragraphs if raw text
    if not c.startswith('<') and not '<p>' in c and not '<div' in c:
        # Wrap paragraphs
        paras = c.split('\n\n')
        c = ''.join(f'<p>{html_clean(p.strip())}</p>' for p in paras if p.strip())
    else:
        c = html_clean(c)
    
    q['content'] = c

# Now replace the 10 Advanced tasks with strict NSU Archetypes 41, 42, 43
adv_archetypes = [
    # --- Archetype 41: Physical Geography (Solar Midday Altitude with SVG Graticule) ---
    {
        "id": "GEO-A-01",
        "field": "Geography, physical",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 10,
        "title": "Solar Midday Altitude at Summer Solstice: Saint Petersburg",
        "content": """<p>Calculate the Sun’s midday altitude (solar elevation angle $\\alpha$) on the day of the summer solstice in the city of <strong>Saint Petersburg</strong>. Write down a complete solution and final answer.</p>

<div class="svg-diagram-container" style="text-align:center; margin:16px 0;">
  <svg width="440" height="210" viewBox="0 0 440 210" style="background:#ffffff; border:1px solid #dce1e7; border-radius:4px; max-width:100%;">
    <defs>
      <pattern id="grid-spb" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="440" height="210" fill="url(#grid-spb)" />
    <!-- Parallels -->
    <line x1="30" y1="170" x2="410" y2="170" stroke="#94a3b8" stroke-dasharray="3" />
    <text x="415" y="174" font-size="11" fill="#64748b">50° n.l.</text>
    <line x1="30" y1="120" x2="410" y2="120" stroke="#94a3b8" stroke-dasharray="3" />
    <text x="415" y="124" font-size="11" fill="#64748b">55° n.l.</text>
    <line x1="30" y1="70" x2="410" y2="70" stroke="#1d68b8" stroke-width="1.5" stroke-dasharray="4" />
    <text x="415" y="74" font-size="11" fill="#1d68b8" font-weight="bold">60° n.l. (Saint Petersburg)</text>
    <line x1="30" y1="35" x2="410" y2="35" stroke="#0ea5e9" stroke-dasharray="3" />
    <text x="415" y="39" font-size="11" fill="#0284c7">66°33' n.l. (Arctic Circle)</text>
    <!-- Point marker -->
    <circle cx="210" cy="70" r="5" fill="#dc2626" />
    <text x="220" y="66" font-size="12" font-weight="bold" fill="#0f172a">Saint Petersburg (φ = 60°00' n.l.)</text>
    <!-- Sun Ray -->
    <line x1="140" y1="20" x2="210" y2="70" stroke="#eab308" stroke-width="2.5" />
    <text x="70" y="30" font-size="11" fill="#b45309" font-weight="bold">Solar Noon Ray (δ = +23°27')</text>
  </svg>
</div>

<p><em>Note: A complete solution must include your method and mathematical reasoning. Providing only the final answer is not sufficient.</em></p>""",
        "requiredKeywords": ["60", "23.5", "53.5", "53°27'", "alpha = 90 - phi + delta", "summer solstice"],
        "modelSolution": """Solution method:
The geographical latitude of the point is $\\varphi = 60^\\circ\\text{ n.l.} \\pm 1^\\circ$.
The angular midday height of the sun above the horizon ($\\alpha$):
$$\\alpha = 90^\\circ - \\varphi + 23^\\circ 27' \\quad \\text{or} \\quad \\alpha = 90^\\circ - \\varphi + 23.5^\\circ$$
Hence the angular midday altitude of the sun above the horizon can be equal to:
$$\\alpha = 53^\\circ 27' \\quad \\text{or} \\quad 53.5^\\circ \\quad (\\text{acceptable range: } 52.5^\\circ - 54.5^\\circ)$$

Answer: $\\alpha = 53^\\circ 27'$ or $53.5^\\circ$

Assessment criteria (NSU Olympiad Rubric):
- Criterion 1: The geographical latitude of the point is determined correctly ($\\varphi = 60^\\circ\\text{ n.l.}$) — 0–2 points.
- Criterion 2: The solution record is given, showing the correct sequence for calculating the angular midday height of the sun ($\\alpha = 90^\\circ - \\varphi + \\delta$) — 0–5 points.
- Criterion 3: The correct value of the angular midday altitude is given with units ($\\alpha = 53^\\circ 27'$ or $53.5^\\circ$) — 0–3 points."""
    },

    {
        "id": "GEO-A-02",
        "field": "Geography, physical",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 10,
        "title": "Solar Midday Altitude at Solstice & Equinox: Novosibirsk",
        "content": """<p>Using the coordinate graticule of the West Siberian Plain, determine the midday solar altitude ($\\alpha$) in the scientific center of <strong>Novosibirsk</strong> ($\\varphi = 55^\\circ 00'\\text{ n.l.}$):</p>
<ol>
  <li>On the day of the vernal/autumnal equinox ($\\delta = 0^\\circ$).</li>
  <li>On the day of the summer solstice ($\\delta = +23^\\circ 27'$).</li>
</ol>
<p>Write down the calculation formula, step-by-step derivation, and final answers in degrees and arcminutes.</p>""",
        "requiredKeywords": ["55", "35", "58.5", "58°27'", "90 - phi", "equinox"],
        "modelSolution": """Solution method:
Geographical latitude of Novosibirsk: $\\varphi = 55^\\circ 00'\\text{ n.l.}$

1. At Equinox ($\\delta = 0^\\circ$):
$$\\alpha_{\\text{eq}} = 90^\\circ - \\varphi = 90^\\circ - 55^\\circ = 35^\\circ 00'$$

2. At Summer Solstice ($\\delta = +23^\\circ 27'$ or $+23.5^\\circ$):
$$\\alpha_{\\text{sol}} = 90^\\circ - \\varphi + \\delta = 35^\\circ 00' + 23^\\circ 27' = 58^\\circ 27' \\quad (\\text{or } 58.5^\\circ)$$

Answer: Equinox: $35^\\circ 00'$; Summer Solstice: $58^\\circ 27'$ (or $58.5^\\circ$)

Assessment criteria (NSU Rubric):
- Criterion 1: Determination of latitude ($\\varphi = 55^\\circ\\text{ n.l.}$) — 0–2 points.
- Criterion 2: Calculation sequence and mathematical formulas — 0–5 points.
- Criterion 3: Final values with units indicated — 0–3 points."""
    },

    {
        "id": "GEO-A-03",
        "field": "Geography, physical",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 10,
        "title": "Solar Midday Altitude and Polar Night: Murmansk",
        "content": """<p>The Arctic port of <strong>Murmansk</strong> is situated at geographical latitude $\\varphi = 69^\\circ 00'\\text{ n.l.}$</p>
<ol>
  <li>Calculate the Sun's midday elevation angle ($\\alpha$) on the day of the summer solstice ($\\delta = +23^\\circ 27'$).</li>
  <li>Calculate the Sun's midday altitude on the day of the winter solstice ($\\delta = -23^\\circ 27'$).</li>
  <li>Explain what physical phenomenon the negative altitude value demonstrates.</li>
</ol>""",
        "requiredKeywords": ["69", "44.5", "44°27'", "-2.5", "-2°27'", "polar night", "below the horizon"],
        "modelSolution": """Solution method:
1. Summer Solstice:
$$\\alpha = 90^\\circ - 69^\\circ 00' + 23^\\circ 27' = 21^\\circ 00' + 23^\\circ 27' = 44^\\circ 27' \\quad (\\text{or } 44.5^\\circ)$$

2. Winter Solstice:
$$\\alpha = 90^\\circ - 69^\\circ 00' - 23^\\circ 27' = 21^\\circ 00' - 23^\\circ 27' = -2^\\circ 27' \\quad (\\text{or } -2.45^\\circ)$$

3. Physical Explanation:
Because the midday altitude is less than $0^\\circ$, the solar disk does not rise above the geometric horizon even at astronomical noon. This demonstrates the occurrence of the **polar night** in regions north of the Arctic Circle.

Assessment criteria:
- Criterion 1: Correct latitude application ($\\varphi = 69^\\circ\\text{ n.l.}$) — 0–2 points.
- Criterion 2: Derivation sequence for both solstices — 0–5 points.
- Criterion 3: Correct numerical values and explanation of polar night — 0–3 points."""
    },

    {
        "id": "GEO-A-04",
        "field": "Geography, physical",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 10,
        "title": "Solar Midday Altitude: Lake Baikal (Irkutsk)",
        "content": """<p>The southern basin of Lake Baikal near <strong>Irkutsk</strong> is situated at latitude $\\varphi = 52^\\circ 00'\\text{ n.l.}$</p>
<ol>
  <li>Calculate the midday solar elevation angle ($\\alpha$) on the day of the summer solstice ($\\delta = +23^\\circ 27'$).</li>
  <li>Calculate the midday solar elevation angle on the day of the autumnal equinox ($\\delta = 0^\\circ$).</li>
</ol>
<p>Show full mathematical working and state your final answers with measurement units.</p>""",
        "requiredKeywords": ["52", "61.5", "61°27'", "38", "equinox", "solstice"],
        "modelSolution": """Solution method:
Latitude: $\\varphi = 52^\\circ 00'\\text{ n.l.}$

1. Summer Solstice:
$$\\alpha = 90^\\circ - 52^\\circ 00' + 23^\\circ 27' = 38^\\circ 00' + 23^\\circ 27' = 61^\\circ 27' \\quad (\\text{or } 61.5^\\circ)$$

2. Autumnal Equinox:
$$\\alpha = 90^\\circ - 52^\\circ 00' = 38^\\circ 00'$$

Assessment criteria:
- Criterion 1: Correct determination of point latitude — 0–2 points.
- Criterion 2: Calculation sequence and formulas — 0–5 points.
- Criterion 3: Final values with units indicated — 0–3 points."""
    },

    # --- Archetype 42: Geochemistry & Geophysics (Sulfide Dump Oxidation & Lime Neutralization) ---
    {
        "id": "GCH-A-01",
        "field": "Geochemistry & geophysics",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 10,
        "title": "Pyrite Oxidation in Closed Coal Mine Rock Dumps and Neutralization",
        "content": """<p>During reclamation of closed coal mine territories in the Kuznetsk Basin, it is critical to neutralize acidic effluents formed during the oxidative weathering of pyrite ($\\text{FeS}_2$) in rock dumps (отвалы). The oxidation reaction proceeds as follows:</p>
$$2\\text{FeS}_2 + 7\\text{O}_2 + 2\\text{H}_2\\text{O} \\longrightarrow 2\\text{FeSO}_4 + 2\\text{H}_2\\text{SO}_4$$
<p>In a selected sample from rock dumps with a total mass of $2.0\\text{ t}$, the pyrite content is $1.2\\%$ by mass. All generated sulfuric acid passes into aqueous solution.</p>
<ol>
  <li>Identify the oxidizing agent and reducing agent in this reaction. Explain your choice through changes in oxidation states.</li>
  <li>Calculate the mass of sulfuric acid ($\\text{H}_2\\text{SO}_4$) that can form upon complete oxidation of pyrite in this dump.</li>
  <li>Slaked lime $\\text{Ca(OH)}_2$ is used to neutralize the acid. Write the neutralization reaction equation and calculate the mass of pure slaked lime required for complete neutralization of the obtained sulfuric acid.</li>
</ol>
<p><strong>Molar masses:</strong> $\\text{FeS}_2 = 120\\text{ g/mol}$, $\\text{H}_2\\text{SO}_4 = 98\\text{ g/mol}$, $\\text{Ca(OH)}_2 = 74\\text{ g/mol}$.</p>""",
        "requiredKeywords": ["O2", "FeS2", "0 to -2", "-1 to +6", "19.6", "14.8", "Ca(OH)2", "CaSO4"],
        "modelSolution": """Solution method:
1. Oxidizing agent and reducing agent:
- Oxidizing agent: $\\text{O}_2$ (molecular oxygen). The oxidation state of oxygen decreases from $0$ to $-2$ (reduction process).
- Reducing agent: $\\text{FeS}_2$ (pyrite), specifically sulfur. The oxidation state of sulfur increases from $-1$ (in $S_2^{2-}$) to $+6$ (in $SO_4^{2-}$), losing electrons (oxidation process). Iron retains the $+2$ oxidation state.

2. Calculation of sulfuric acid mass:
Mass of pyrite in dump:
$$m(\\text{FeS}_2) = 2.0\\text{ t} \\times 0.012 = 0.024\\text{ t} = 24\\text{ kg} = 24,000\\text{ g}$$
Amount of substance:
$$n(\\text{FeS}_2) = \\frac{24,000\\text{ g}}{120\\text{ g/mol}} = 200\\text{ mol}$$
According to the reaction equation: $2\\text{ mol FeS}_2$ produce $2\\text{ mol H}_2\\text{SO}_4$ (molar ratio $1:1$):
$$n(\\text{H}_2\\text{SO}_4) = 200\\text{ mol}$$
Mass of sulfuric acid:
$$m(\\text{H}_2\\text{SO}_4) = 200\\text{ mol} \\times 98\\text{ g/mol} = 19,600\\text{ g} = 19.6\\text{ kg}$$

3. Calculation of lime mass for neutralization:
Neutralization equation:
$$\\text{H}_2\\text{SO}_4 + \\text{Ca(OH)}_2 \\longrightarrow \\text{CaSO}_4\\downarrow + 2\\text{H}_2\\text{O}$$
Stoichiometric ratio is $1:1$, therefore:
$$n(\\text{Ca(OH)}_2) = n(\\text{H}_2\\text{SO}_4) = 200\\text{ mol}$$
Mass of pure slaked lime:
$$m(\\text{Ca(OH)}_2) = 200\\text{ mol} \\times 74\\text{ g/mol} = 14,800\\text{ g} = 14.8\\text{ kg}$$

Answer:
- Oxidizing agent: $\\text{O}_2$, Reducing agent: $\\text{FeS}_2$ (sulfur)
- $19.6\\text{ kg}$ of $\\text{H}_2\\text{SO}_4$
- $14.8\\text{ kg}$ of $\\text{Ca(OH)}_2$

Assessment criteria (NSU Olympiad Rubric):
- Criterion 1: Oxidizing agent ($\\text{O}_2$) and reducing agent ($\\text{FeS}_2$/sulfur) are correctly identified with justification through changes in oxidation states (O: $0 \\to -2$, S: $-1 \\to +6$) — 0–3 points.
- Criterion 2: Mass of $\\text{H}_2\\text{SO}_4$ is correctly calculated: mass of pyrite, amount of substance, $1:1$ stoichiometry, final answer with units ($19.6\\text{ kg}$) — 0–4 points.
- Criterion 3: Neutralization equation $\\text{H}_2\\text{SO}_4 + \\text{Ca(OH)}_2 \\to \\text{CaSO}_4 + 2\\text{H}_2\\text{O}$ correctly written and mass of $\\text{Ca(OH)}_2$ ($14.8\\text{ kg}$) calculated — 0–3 points."""
    },

    {
        "id": "GCH-A-02",
        "field": "Geochemistry & geophysics",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 10,
        "title": "Stoichiometry of Pyrite Spoil Oxidation and Neutralization (5-Tonne Dump)",
        "content": """<p>A sulfide waste dump at an abandoned mining site contains $5.0\\text{ t}$ of spoil rock with an average pyrite ($\\text{FeS}_2$) concentration of $2.40\\%$ by mass.</p>
$$2\\text{FeS}_2 + 7\\text{O}_2 + 2\\text{H}_2\\text{O} \\longrightarrow 2\\text{FeSO}_4 + 2\\text{H}_2\\text{SO}_4$$
<ol>
  <li>Identify the oxidant and reductant, citing oxidation numbers.</li>
  <li>Calculate the total mass of pure $\\text{H}_2\\text{SO}_4$ formed in kilograms.</li>
  <li>Calculate the stoichiometric mass of slaked lime $\\text{Ca(OH)}_2$ required to neutralize all sulfuric acid.</li>
</ol>
<p><strong>Molar masses:</strong> $\\text{FeS}_2 = 120\\text{ g/mol}$, $\\text{H}_2\\text{SO}_4 = 98\\text{ g/mol}$, $\\text{Ca(OH)}_2 = 74\\text{ g/mol}$.</p>""",
        "requiredKeywords": ["O2", "FeS2", "98.0", "74.0", "1000 mol", "120 kg"],
        "modelSolution": """Solution method:
1. Redox: Oxidant is $\\text{O}_2$ ($0 \\to -2$). Reductant is $\\text{FeS}_2$, sulfur ($-1 \\to +6$).
2. Pyrite mass: $m = 5,000\\text{ kg} \\times 0.024 = 120\\text{ kg} = 120,000\\text{ g}$.
$n(\\text{FeS}_2) = \\frac{120,000}{120} = 1,000\\text{ mol}$.
$n(\\text{H}_2\\text{SO}_4) = 1,000\\text{ mol} \\implies m(\\text{H}_2\\text{SO}_4) = 1,000 \\times 98 = 98,000\\text{ g} = 98.0\\text{ kg}$.
3. Neutralization: $\\text{H}_2\\text{SO}_4 + \\text{Ca(OH)}_2 \\to \\text{CaSO}_4\\downarrow + 2\\text{H}_2\\text{O}$.
$n(\\text{Ca(OH)}_2) = 1,000\\text{ mol} \\implies m(\\text{Ca(OH)}_2) = 1,000 \\times 74 = 74,000\\text{ g} = 74.0\\text{ kg}$.

Answer: $98.0\\text{ kg}$ of $\\text{H}_2\\text{SO}_4$; $74.0\\text{ kg}$ of $\\text{Ca(OH)}_2$.

Assessment criteria:
- Criterion 1: Redox characterization with oxidation numbers — 0–3 points.
- Criterion 2: Calculation of sulfuric acid mass ($98.0\\text{ kg}$) — 0–4 points.
- Criterion 3: Neutralization equation and lime mass ($74.0\\text{ kg}$) — 0–3 points."""
    },

    {
        "id": "GCH-A-03",
        "field": "Geochemistry & geophysics",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 10,
        "title": "Chalcopyrite Weathering and Neutralization with Quicklime",
        "content": """<p>In a copper-nickel sulfide rock dump, chalcopyrite ($\\text{CuFeS}_2$) undergoes atmospheric oxidative breakdown according to the reaction:</p>
$$4\\text{CuFeS}_2 + 17\\text{O}_2 + 4\\text{H}_2\\text{O} \\longrightarrow 4\\text{CuSO}_4 + 2\\text{Fe}_2\\text{O}_3\\downarrow + 4\\text{H}_2\\text{SO}_4$$
<p>A dump sample of $5.0\\text{ t}$ contains $1.835\\%$ chalcopyrite by mass.</p>
<ol>
  <li>Determine the oxidation state changes of copper, iron, sulfur, and oxygen.</li>
  <li>Calculate the mass of sulfuric acid ($\\text{H}_2\\text{SO}_4$) generated upon complete oxidation of chalcopyrite.</li>
  <li>Quicklime ($\\text{CaO}$) is added to neutralize the drainage. Write the neutralization equation and determine the stoichiometric mass of pure $\\text{CaO}$ required.</li>
</ol>
<p><strong>Molar masses:</strong> $\\text{CuFeS}_2 = 183.5\\text{ g/mol}$, $\\text{H}_2\\text{SO}_4 = 98.0\\text{ g/mol}$, $\\text{CaO} = 56.0\\text{ g/mol}$.</p>""",
        "requiredKeywords": ["CuFeS2", "O2", "49.0", "28.0", "500 mol", "CaO + H2SO4 -> CaSO4 + H2O"],
        "modelSolution": """Solution method:
1. Oxidation numbers:
- Oxygen: $0 \\to -2$ (oxidant)
- Sulfur: $-2 \\to +6$ in sulfate (reductant)
- Iron: $+2 \\to +3$ in hematite (reductant)
- Copper: $+2$ remains $+2$

2. Sulfuric acid mass:
$m(\\text{CuFeS}_2) = 5,000\\text{ kg} \\times 0.01835 = 91.75\\text{ kg} = 91,750\\text{ g}$.
$n(\\text{CuFeS}_2) = \\frac{91,750\\text{ g}}{183.5\\text{ g/mol}} = 500\\text{ mol}$.
From stoichiometry ($4\\text{CuFeS}_2 : 4\\text{H}_2\\text{SO}_4 = 1:1$):
$n(\\text{H}_2\\text{SO}_4) = 500\\text{ mol} \\implies m(\\text{H}_2\\text{SO}_4) = 500 \\times 98.0 = 49,000\\text{ g} = 49.0\\text{ kg}$.

3. Quicklime neutralization:
$$\\text{H}_2\\text{SO}_4 + \\text{CaO} \\longrightarrow \\text{CaSO}_4\\downarrow + \\text{H}_2\\text{O}$$
$n(\\text{CaO}) = 500\\text{ mol} \\implies m(\\text{CaO}) = 500 \\times 56.0\\text{ g/mol} = 28,000\\text{ g} = 28.0\\text{ kg}$.

Answer: $49.0\\text{ kg}$ of $\\text{H}_2\\text{SO}_4$; $28.0\\text{ kg}$ of $\\text{CaO}$.

Assessment criteria:
- Criterion 1: Oxidation state shifts correctly documented — 0–3 points.
- Criterion 2: Calculation of sulfuric acid mass ($49.0\\text{ kg}$) — 0–4 points.
- Criterion 3: Neutralization equation and lime mass ($28.0\\text{ kg}$) — 0–3 points."""
    },

    # --- Archetype 43: Mining & Mineral Processing (Net Smelter Return NSR Ore Valuation) ---
    {
        "id": "MIN-A-01",
        "field": "Mining & mineral processing",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 10,
        "title": "Net Smelter Return (NSR) Valuation of Vein Gold-Silver Ore",
        "content": """<p>A vein-type gold deposit has been explored in a fracture zone within granitoids. The ores are represented by quartz-sulfide veins with disseminated native gold and electrum. To assess economic feasibility and justify the cut-off grade, calculate the <strong>Net Smelter Return (NSR)</strong> per tonne of ore in US dollars.</p>
<p><strong>Initial data:</strong></p>
<ul>
  <li>Content of valuable components in ore: gold $C_{\\text{Au}} = 8.40\\text{ g/t}$; silver $C_{\\text{Ag}} = 32.50\\text{ g/t}$</li>
  <li>Recovery coefficients during cyanidation and refining: gold $\\eta_{\\text{Au}} = 92.0\\%$; silver $\\eta_{\\text{Ag}} = 78.0\\%$</li>
  <li>Market prices for metals: gold $P_{\\text{Au}} = 62.50\\text{ USD/g}$; silver $P_{\\text{Ag}} = 0.78\\text{ USD/g}$</li>
  <li>Processing conditions: payable metal share paid to the subsoil user (недропользователь): $\\text{Au} = 95.0\\%$, $\\text{Ag} = 90.0\\%$</li>
  <li>Mining and processing costs: $18.50\\text{ USD/t}$; other operating expenses (refinery delivery, insurance): $5.20\\text{ USD/t}$</li>
</ul>
<p><em>Perform intermediate calculations without rounding; round the final answer to two decimal places.</em></p>""",
        "requiredKeywords": ["7.728", "25.35", "7.3416", "22.815", "458.85", "17.80", "476.65", "23.70", "452.95"],
        "modelSolution": """Solution method:
1. Mass of recoverable precious metals from 1 tonne of ore:
$$m_{\\text{Au,rec}} = C_{\\text{Au}} \\times \\eta_{\\text{Au}} = 8.40 \\times 0.920 = 7.728\\text{ g/t}$$
$$m_{\\text{Ag,rec}} = C_{\\text{Ag}} \\times \\eta_{\\text{Ag}} = 32.50 \\times 0.780 = 25.350\\text{ g/t}$$

2. Mass of metals subject to payment (payable metal):
$$m_{\\text{Au,payable}} = 7.728 \\times 0.950 = 7.3416\\text{ g/t}$$
$$m_{\\text{Ag,payable}} = 25.350 \\times 0.900 = 22.815\\text{ g/t}$$

3. Gross revenue from metal sales:
$$R_{\\text{Au}} = 7.3416 \\times 62.50 = 458.8500\\text{ USD/t}$$
$$R_{\\text{Ag}} = 22.815 \\times 0.78 = 17.7957\\text{ USD/t}$$
$$R_{\\text{gross}} = 458.8500 + 17.7957 = 476.6457\\text{ USD/t}$$

4. Total operating deductions:
$$C_{\\text{deductions}} = 18.50 + 5.20 = 23.70\\text{ USD/t}$$

5. Net Smelter Return (NSR) per tonne of ore:
$$\\text{NSR} = R_{\\text{gross}} - C_{\\text{deductions}} = 476.6457 - 23.70 = 452.9457 \\approx 452.95\\text{ USD/t}$$

Answer: $452.95\\text{ USD/t}$

Assessment criteria (NSU 4-Criterion Rubric):
- Criterion 1: Correctly determined masses of recoverable metals (1 pt for each component) — 0–2 points.
- Criterion 2: Correctly assessed revenue values for each metal (2 pts for each component) — 0–4 points.
- Criterion 3: Correctly determined gross revenue and total costs — 0–2 points.
- Criterion 4: Correctly calculated Net Smelter Return per tonne and performed rounding — 0–2 points."""
    },

    {
        "id": "MIN-A-02",
        "field": "Mining & mineral processing",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 10,
        "title": "Net Smelter Return (NSR) Valuation: Aldan Shield Ore",
        "content": """<p>A quartz-sulfide precious metal deposit in the Aldan Shield is evaluated for commercial subsoil exploitation:</p>
<ul>
  <li>Ore grades: Gold $C_{\\text{Au}} = 6.00\\text{ g/t}$; Silver $C_{\\text{Ag}} = 40.00\\text{ g/t}$</li>
  <li>Metallurgical plant recoveries: Gold $\\eta_{\\text{Au}} = 90.0\\%$; Silver $\\eta_{\\text{Ag}} = 80.0\\%$</li>
  <li>Contractual payable metal shares: Gold $= 95.0\\%$; Silver $= 90.0\\%$</li>
  <li>Market metal prices: Gold $P_{\\text{Au}} = 65.00\\text{ USD/g}$; Silver $P_{\\text{Ag}} = 0.80\\text{ USD/g}$</li>
  <li>Direct mining and beneficiation costs: $22.00\\text{ USD/t}$; refining and transport expenses: $4.50\\text{ USD/t}$</li>
</ul>
<p>Calculate the Net Smelter Return (NSR) per tonne of ore in USD. Perform intermediate calculations without rounding; round the final answer to two decimal places.</p>""",
        "requiredKeywords": ["5.40", "32.00", "5.13", "28.80", "333.45", "23.04", "356.49", "26.50", "329.99"],
        "modelSolution": """Solution method:
1. Recoverable masses:
$$m_{\\text{Au,rec}} = 6.00 \\times 0.90 = 5.40\\text{ g/t}$$
$$m_{\\text{Ag,rec}} = 40.00 \\times 0.80 = 32.00\\text{ g/t}$$

2. Payable masses:
$$m_{\\text{Au,payable}} = 5.40 \\times 0.95 = 5.13\\text{ g/t}$$
$$m_{\\text{Ag,payable}} = 32.00 \\times 0.90 = 28.80\\text{ g/t}$$

3. Gross revenue:
$$R_{\\text{Au}} = 5.13 \\times 65.00 = 333.45\\text{ USD/t}$$
$$R_{\\text{Ag}} = 28.80 \\times 0.80 = 23.04\\text{ USD/t}$$
$$R_{\\text{gross}} = 333.45 + 23.04 = 356.49\\text{ USD/t}$$

4. Total deductions:
$$C_{\\text{deductions}} = 22.00 + 4.50 = 26.50\\text{ USD/t}$$

5. Net Smelter Return (NSR):
$$\\text{NSR} = 356.49 - 26.50 = 329.99\\text{ USD/t}$$

Answer: $329.99\\text{ USD/t}$

Assessment criteria (NSU Rubric):
- Criterion 1: Recoverable metal masses — 0–2 points.
- Criterion 2: Payable revenues for each metal — 0–4 points.
- Criterion 3: Gross revenue and cost deductions — 0–2 points.
- Criterion 4: Final Net Smelter Return and rounding — 0–2 points."""
    },

    {
        "id": "MIN-A-03",
        "field": "Mining & mineral processing",
        "difficulty": "advanced",
        "type": "extended-response",
        "points": 10,
        "title": "Net Smelter Return (NSR) Valuation: Transbaikalia Vein Deposit",
        "content": """<p>A hydrothermal vein gold-silver deposit in Transbaikalia is assessed by the subsoil user (недропользователь):</p>
<ul>
  <li>Ore grades: Gold $C_{\\text{Au}} = 5.00\\text{ g/t}$; Silver $C_{\\text{Ag}} = 50.00\\text{ g/t}$</li>
  <li>Metallurgical recovery: Gold $\\eta_{\\text{Au}} = 90.0\\%$; Silver $\\eta_{\\text{Ag}} = 80.0\\%$</li>
  <li>Contractual payable shares: Gold $= 96.0\\%$; Silver $= 90.0\\%$</li>
  <li>Market prices: Gold $P_{\\text{Au}} = 70.00\\text{ USD/g}$; Silver $P_{\\text{Ag}} = 0.85\\text{ USD/g}$</li>
  <li>Mining & milling cost: $20.00\\text{ USD/t}$; delivery & insurance: $5.00\\text{ USD/t}$</li>
</ul>
<p>Calculate the Net Smelter Return (NSR) per tonne of ore in USD, rounded to two decimal places.</p>""",
        "requiredKeywords": ["4.50", "40.00", "4.32", "36.00", "302.40", "30.60", "333.00", "25.00", "308.00"],
        "modelSolution": """Solution method:
1. Recoverable masses:
$$m_{\\text{Au,rec}} = 5.00 \\times 0.90 = 4.50\\text{ g/t}$$
$$m_{\\text{Ag,rec}} = 50.00 \\times 0.80 = 40.00\\text{ g/t}$$

2. Payable masses:
$$m_{\\text{Au,payable}} = 4.50 \\times 0.96 = 4.32\\text{ g/t}$$
$$m_{\\text{Ag,payable}} = 40.00 \\times 0.90 = 36.00\\text{ g/t}$$

3. Gross revenue:
$$R_{\\text{Au}} = 4.32 \\times 70.00 = 302.40\\text{ USD/t}$$
$$R_{\\text{Ag}} = 36.00 \\times 0.85 = 30.60\\text{ USD/t}$$
$$R_{\\text{gross}} = 302.40 + 30.60 = 333.00\\text{ USD/t}$$

4. Deductions:
$$C_{\\text{deductions}} = 20.00 + 5.00 = 25.00\\text{ USD/t}$$

5. Net Smelter Return (NSR):
$$\\text{NSR} = 333.00 - 25.00 = 308.00\\text{ USD/t}$$

Answer: $308.00\\text{ USD/t}$

Assessment criteria:
- Criterion 1: Recoverable metal masses — 0–2 points.
- Criterion 2: Payable revenues for each metal — 0–4 points.
- Criterion 3: Gross revenue and deductions — 0–2 points.
- Criterion 4: Final Net Smelter Return and rounding — 0–2 points."""
    }
]

# Replace the advanced tasks in the questions list
non_adv = [q for q in questions if q['difficulty'] != 'advanced']
final_bank = non_adv + adv_archetypes
print(f"Final bank count: {len(final_bank)} (Non-advanced: {len(non_adv)}, Advanced: {len(adv_archetypes)})")

# Validate IDs
all_ids = set()
for q in final_bank:
    assert q['id'] not in all_ids, f"Duplicate ID: {q['id']}"
    all_ids.add(q['id'])

js_content = "/**\n * Open Doors International Olympiad: Earth and Environmental Sciences for Sustainability\n"
js_content += " * Novosibirsk State University (NSU) Academic Examination Bank\n"
js_content += f" * Total verified tasks: {len(final_bank)}\n"
js_content += " */\n\n"
js_content += "const QUESTION_BANK = " + json.dumps(final_bank, indent=2, ensure_ascii=False) + ";\n\n"
js_content += "if (typeof module !== 'undefined' && module.exports) {\n  module.exports = { QUESTION_BANK };\n}\n"
js_content += "if (typeof window !== 'undefined') {\n  window.QUESTION_BANK = QUESTION_BANK;\n}\n"

with open(r'c:\OD-simulation\questions.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Successfully written updated questions.js with NSU archetypes and clean HTML!")
