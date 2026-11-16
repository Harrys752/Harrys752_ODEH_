import pypdf

def extract(pdf_path, out_txt):
    reader = pypdf.PdfReader(pdf_path)
    text = []
    for i, page in enumerate(reader.pages):
        text.append(f"--- PAGE {i+1} ---")
        text.append(page.extract_text() or "")
    with open(out_txt, "w", encoding="utf-8") as f:
        f.write("\n".join(text))
    print(f"Extracted {len(reader.pages)} pages to {out_txt}")

extract(r"c:\OD-simulation\docs\Demo_Version.pdf", r"c:\OD-simulation\docs\demo_text.txt")
extract(r"c:\OD-simulation\docs\Program.pdf", r"c:\OD-simulation\docs\program_text.txt")
