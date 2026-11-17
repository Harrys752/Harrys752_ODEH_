# -*- coding: utf-8 -*-
"""
Novosibirsk State University (NSU) Earth & Environmental Sciences Olympiad Editor
Refines all 115 questions to ensure:
1. 100% Russian academic geoscience terminology ("specific electrical resistance", "horizontally-layered medium", "parallel exploration sections", "subsoil user", "rock dumps", "enrichment", "silvin", "natural territorial complex", "sanitary protection zones", "barometric step").
2. Clean semantic HTML stems (zero raw markdown '**' or unformatted dashes).
3. 10 Advanced tasks strictly matching Archetypes 41, 42, 43 with NSU assessment criteria rubrics.
4. Clean integer and decimal mental-math values with verifiable calculations.
"""

import json
import re

print("Starting NSU refinement script...")
