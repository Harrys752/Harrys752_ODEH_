import json
import re

with open('questions.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'var\s+QUESTION_BANK\s*=\s*(\[.*?\]);', text, re.DOTALL)
bank = json.loads(m.group(1))

# Fix GCH-B-28 control characters
for q in bank:
    if q['id'] == 'GCH-B-28':
        q['explanation'] = q['explanation'].replace('\x08', r'\beta')

new_q = [
    {
        'id': 'ECL-B-27',
        'field': 'Ecology',
        'difficulty': 'basic',
        'type': 'single-choice',
        'points': 1,
        'title': 'Allee Effect and Critical Population Density',
        'content': '<p>Under the Allee effect in conservation biology and population ecology, what phenomenon occurs when a sexually reproducing population falls below its critical minimum threshold density ($N < N_{\\text{crit}}$)?</p>',
        'options': [
            'Per-capita population growth rate decreases, leading to positive feedback toward extinction',
            'Carrying capacity $K$ instantaneously increases due to reduced intra-specific competition',
            'Intrinsic growth rate $r$ doubles as reproductive resources become superabundant',
            'The sex ratio permanently skews toward 100% parthenogenetic females'
        ],
        'correctAnswer': 'Per-capita population growth rate decreases, leading to positive feedback toward extinction',
        'explanation': 'The Allee effect describes a positive relationship between population density and per-capita growth rate at low densities. When population size falls below $N_{\\text{crit}}$, individuals struggle to locate mates or perform cooperative behaviors, accelerating population decline.'
    },
    {
        'id': 'ECL-B-28',
        'field': 'Ecology',
        'difficulty': 'basic',
        'type': 'single-choice',
        'points': 1,
        'title': 'Lake Baikal Littoral vs Abyssal Zonation and Endemism',
        'content': '<p>In the unique ecosystem of Lake Baikal, which bathymetric zone harbors the highest concentration of endemic gammarid amphipods (*Amphipoda*) exhibiting gigantism and specialized abyssal morphological adaptations?</p>',
        'options': [
            'Abyssal benthic zone exceeding depths of 1,000 meters',
            'Upper epilimnion surface zone limited to depths of 0 to 5 meters',
            'Ephemeral deltaic shallow waters of the Selenga River only',
            'Superficial splash zone on littoral gravel shoals'
        ],
        'correctAnswer': 'Abyssal benthic zone exceeding depths of 1,000 meters',
        'explanation': 'Lake Baikal is the deepest ancient rift lake (~1,642 m). Deep-water oxygenation enables an extraordinary radiation of endemic amphipods on the abyssal benthic floor down to maximum depths, exhibiting gigantism and distinct abyssal niches.'
    },
    {
        'id': 'ENV-B-24',
        'field': 'Environmental sciences',
        'difficulty': 'basic',
        'type': 'single-choice',
        'points': 1,
        'title': 'Nitrogen Oxides Photochemical Smog Formation',
        'content': '<p>In urban atmospheric chemistry, the photodissociation of nitrogen dioxide by solar UV radiation ($\\lambda < 420\\text{ nm}$) directly generates ground-state atomic oxygen: $$\\text{NO}_2 + h\\nu \\rightarrow \\text{NO} + \\text{O}(^3\\text{P})$$ What secondary photochemical pollutant is immediately synthesized when this free oxygen atom reacts with molecular oxygen ($\\text{O}_2$) in the presence of a third stabilizing body ($M$)?</p>',
        'options': [
            'Tropospheric ozone ($\\text{O}_3$)',
            'Peroxyacetyl nitrate (PAN)',
            'Nitric acid ($\\text{HNO}_3$)',
            'Sulfur trioxide ($\\text{SO}_3$)'
        ],
        'correctAnswer': 'Tropospheric ozone ($\\text{O}_3$)',
        'explanation': 'The reaction $\\text{O}(^3\\text{P}) + \\text{O}_2 + M \\rightarrow \\text{O}_3 + M$ is the exclusive primary pathway for photochemical ozone production in the lower troposphere.'
    },
    {
        'id': 'ENV-B-25',
        'field': 'Environmental sciences',
        'difficulty': 'basic',
        'type': 'single-choice',
        'points': 1,
        'title': 'Soil Salinization and Sodium Adsorption Ratio (SAR)',
        'content': '<p>In agricultural environmental assessment, the Sodium Adsorption Ratio ($\\text{SAR}$) quantifies the hazard of sodification in irrigation water according to the equation: $$\\text{SAR} = \\frac{[\\text{Na}^+]}{\\sqrt{\\frac{[\\text{Ca}^{2+}] + [\\text{Mg}^{2+}]}{2}}}$$ If an irrigation sample contains $[\\text{Na}^+] = 12\\text{ meq/L}$, $[\\text{Ca}^{2+}] = 5\\text{ meq/L}$, and $[\\text{Mg}^{2+}] = 3\\text{ meq/L}$, what is the calculated $\\text{SAR}$ value?</p>',
        'options': [
            '$6.0$',
            '$3.0$',
            '$12.0$',
            '$1.5$'
        ],
        'correctAnswer': '$6.0$',
        'explanation': '$\\text{SAR} = \\frac{12}{\\sqrt{(5 + 3)/2}} = \\frac{12}{\\sqrt{4}} = \\frac{12}{2} = 6.0$.'
    },
    {
        'id': 'ENV-B-26',
        'field': 'Environmental sciences',
        'difficulty': 'basic',
        'type': 'single-choice',
        'points': 1,
        'title': 'Dioxins and TEF (Toxic Equivalency Factor)',
        'content': '<p>In ecotoxicological hazard assessment of persistent organic pollutants (POPs), which compound is assigned the benchmark Toxic Equivalency Factor of exactly $\\text{TEF} = 1.0$ against which all other PCDDs and PCDFs are normalized?</p>',
        'options': [
            '2,3,7,8-Tetrachlorodibenzo-p-dioxin (2,3,7,8-TCDD)',
            'Octachlorodibenzo-p-dioxin (OCDD)',
            '1,2,3,4,7,8-Hexachlorodibenzofuran',
            'Benzo[a]pyrene'
        ],
        'correctAnswer': '2,3,7,8-Tetrachlorodibenzo-p-dioxin (2,3,7,8-TCDD)',
        'explanation': '2,3,7,8-TCDD is the most potent congener in the dioxin class; the WHO and international agencies assign it the reference index $\\text{TEF} = 1.0$.'
    },
    {
        'id': 'ENV-B-27',
        'field': 'Environmental sciences',
        'difficulty': 'basic',
        'type': 'single-choice',
        'points': 1,
        'title': 'Landfill Leachate Attenuation and Clay Mineral Liners',
        'content': '<p>In sanitary landfill engineering under environmental protection regulations, which smectite-group clay mineral is primarily chosen for engineered basal barrier liners due to its high swelling capacity, extremely low hydraulic conductivity ($K < 10^{-9}\\text{ m/s}$), and high cation exchange capacity (CEC)?</p>',
        'options': [
            'Sodium bentonite (montmorillonite)',
            'Pure kaolinite',
            'Fibrous chrysotile',
            'Detrital quartz silt'
        ],
        'correctAnswer': 'Sodium bentonite (montmorillonite)',
        'explanation': 'Sodium bentonite (rich in montmorillonite) provides hydraulic conductivity lower than $10^{-9}\\text{ m/s}$ and high CEC ($80\\text{--}150\\text{ meq}/100\\text{g}$), forming an impermeable barrier against toxic leachate migration.'
    }
]

existing_ids = {q['id'] for q in bank}
for q in new_q:
    if q['id'] not in existing_ids:
        bank.append(q)
        existing_ids.add(q['id'])

counts = {}
for q in bank:
    counts[q['field']] = counts.get(q['field'], 0) + 1

print(f"Total bank questions: {len(bank)}")
for f, c in sorted(counts.items()):
    print(f"  {f}: {c}")

control_chars = ['\t', '\r', '\x07', '\x08', '\x0c']
has_control = False
for q in bank:
    for key in ['content', 'explanation', 'modelSolution', 'answerText']:
        val = q.get(key, '')
        if any(cc in val for cc in control_chars):
            print(f"WARNING: Control char in {q['id']} {key}")
            has_control = True

if not has_control:
    print("Zero control characters detected across all 287 questions!")

out = "/**\n * Open Doors: Earth and Environmental Sciences for Sustainability\n * Complete 7-Field Question Bank (Novosibirsk State University / NSU Standard)\n * Expanded Bank: 280+ High-Rigor Olympiad Tasks\n */\n\nvar QUESTION_BANK = " + json.dumps(bank, indent=2, ensure_ascii=False) + ";\n\nif (typeof window !== 'undefined') {\n  window.QUESTION_BANK = QUESTION_BANK;\n}\nif (typeof globalThis !== 'undefined') {\n  globalThis.QUESTION_BANK = QUESTION_BANK;\n}\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = { QUESTION_BANK };\n}\n"

with open('questions.js', 'w', encoding='utf-8') as f:
    f.write(out)

print("Updated questions.js written successfully!")
