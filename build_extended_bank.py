# -*- coding: utf-8 -*-
"""
Script to create the expanded 115-question bank for Open Doors Earth & Environmental Sciences.
Tiers:
- 75 Basic (1 pt each)
- 30 Intermediate (3 pts each)
- 10 Advanced (10 pts each)
Total = 115 questions.
"""

import json
import math

questions = []
seen_ids = set()

def add_q(q):
    if q['id'] in seen_ids:
        raise ValueError(f"Duplicate question ID: {q['id']}")
    seen_ids.add(q['id'])
    questions.append(q)

print("Starting extended bank generation...")
