# DOKUMEN BASIS PENGETAHUAN & PANDUAN MENTOR AI (STUDY CONTEXT EXPORT)
## Open Doors International Olympiad: Earth and Environmental Sciences for Sustainability
### Bachelor's Track — Second Stage Examination Simulator (Novosibirsk State University / NSU Standard)

Dokumen ini disusun oleh **Lead Systems Architect** simulator dan **Mentor Akademik Novosibirsk State University (NSU)** sebagai *Knowledge Base & Context Pack* mandiri. Dokumen ini dirancang untuk diunggah atau disalin langsung ke percakapan **Gemini AI Study Mentor** guna memberikan pemahaman menyeluruh terhadap arsitektur teknis simulator, bank soal 176 tugas, aturan mesin parametrik, protokol evaluasi diagnostik, serta rencana studi 6 hari menjelang ujian pada **Selasa, 24 November 2026**.

---

## 1. Arsitektur Sistem & Mekanisme Simulator (System Architecture & Mechanics)

Simulator ini dibangun dengan arsitektur web statis tanpa *backend* (*pure Vanilla JavaScript, HTML5, CSS3*) yang secara visual dan prosedural mereplikasi platform ujian resmi **OpenEdu / Moodle** (`od.globaluni.ru`) serta sistem pengawasan proktor terpadu (*Astraea / ProctorEdu*).

Alur pengerjaan ujian distrukturkan ke dalam **Siklus Hidup 4 Tahap (4-Stage Lifecycle)** yang ketat:

```
[Tahap 1: #lobby-view] ──▶ [Tahap 2: #exam-view] ──▶ [Tahap 3: #upload-view] ──▶ [Tahap 4: #review-view & Task 44]
(Mode & Disiplin)         (Proctoring 180 min)       (Post-Proctor 10 min)       (Oral Defense & Laporan Evaluasi)
```

### Tahap 1: Ruang Tunggu & Konfigurasi Sesi (`#lobby-view`)
Halaman beranda mereplikasi portal resmi pra-ujian dengan palet warna abu-abu netral (`#f3f5f8`), kartu putih dengan batas abu-abu lembut (`#e2e8f0`), aksen biru *royal* (`#1d68b8`), dan merah crimson (`#dc2626`).
* **Mode A (Official Proctored Stage 2):**
  * Format standar Olimpiade: 43 tugas tertulis (25 Basic, 15 Intermediate, 3 Advanced) + 1 tugas lisan (*Task 44 Oral Response*).
  * Alokasi waktu ketat: **180 menit** (3 jam).
  * Pengawasan aktif: memantau pergantian tab (*tab-switching*) dan hilangnya fokus kursor (*window blur*) via *Page Visibility API*.
* **Mode B (Unproctored Practice Session):**
  * Sesi latihan bebas tanpa pengawasan proktor dan tanpa pemicu diskualifikasi.
  * *Preset A (Stage 2 Full):* 43 soal seimbang lintas 7 bidang studi.
  * *Preset B (Entry Speed Drill):* 68 soal Basic (68 poin, 60 menit) untuk melatih kecepatan membaca dan konseptual.
  * *Preset C (Single-Field Focus):* Isolasi ketat satu bidang studi tanpa kebocoran (*zero cross-field leakage*), menyajikan ~18–19 soal terfokus per disiplin ilmu (12 Basic, 5 Intermediate, 1–2 Advanced) dalam 60 menit.
  * *Preset D (Training Marathon):* 90 soal penuh (60 Basic, 25 Intermediate, 5 Advanced) dalam 180 menit, mereplikasi matriks penuh pada antarmuka Moodle.
  * *Preset E (Advanced Essay & Calculation Drill):* 3 tugas tingkat lanjut (Tasks 41–43, 30 poin, 45 menit) untuk melatih penurunan rumus dan kalkulasi kuantitatif.
* **Mode C (Client-Side PDF Importer):**
  * Menggunakan pustaka `pdf.js` untuk mengekstraksi teks secara lokal di peramban, memindai struktur soal, dan mengompilasikannya ke dalam bank soal tanpa mengirim data ke peladen luar.
* **Log Riwayat Pengerjaan (`od_attempt_history_v1`):**
  * Tersimpan persisten di `localStorage`.
  * Menampilkan statistik ringkasan (*Total Attempts*, *Average Score %*, *Best Score %*), tabel riwayat kronologis, serta tombol *View Report & Review* yang dapat memulihkan seluruh *snapshot* jawaban, coretan, dan hasil evaluasi langsung ke halaman ulasan.

### Tahap 2: Area Ujian Aktif & Aturan Proctoring (`#exam-view`)
* **Top Question Navigation Matrix (Grid 30 Kolom):**
  * Menampilkan kotak bernomor berukuran $24 \times 24\text{ px}$ yang tersusun dalam baris horizontal 30 kotak (misal baris 1: 1–30, baris 2: 31–60, baris 3: 61–90).
  * **Merah Crimson (`#dc2626` / `#d32f2f`):** Tugas yang sedang aktif dibuka.
  * **Biru Royal (`#1d68b8`):** Tugas yang jawabannya telah disimpan resmi via tombol *"Save answer"*.
  * **Abu-abu Dingin (`#cbd5e1` / `#e2e8f0`):** Tugas yang belum dijawab atau belum disimpan.
* **Kepatuhan Aturan Pasal 14 (Article 14 Compliance):**
  * Pada tugas tingkat lanjut (*Advanced Tasks* 41–43), peserta **diwajibkan mengetik minimal 1 karakter** (misal ringkasan jawaban akhir atau *"See uploaded sheet"*) pada kotak teks Moodle sebelum tombol *"Save answer"* aktif. Ini mencegah sistem menganggap tugas kosong sebelum tahap unggah berkas.
* **Timer Pemeriksaan Tampilan Kamera 30 Detik (Camera-Show Check):**
  * Pada tugas tertulis tingkat lanjut, terdapat pengingat visual 30 detik yang meminta peserta memperlihatkan lembar kerja HVS ke arah *webcam* sebelum lembar tersebut difoto, menjamin integritas proctoring.
* **Indikator Pelanggaran Fokus (*Tab-Switch Violation Badge*):**
  * Melacak dan mencatat berapa kali peserta keluar dari tab ujian. Setiap kejadian dicatat dalam log diagnostik akhir.

### Tahap 3: Jendela Unggah Berkas Pasca-Ujian (`#upload-view`)
Sesuai Pasal 14.1 Regulasi Open Doors 2026, setelah menekan *"Finish Attempt & Submit"*, mode proctoring **langsung dinonaktifkan** untuk mencegah pelanggaran palsu saat mentransfer foto dari ponsel ke laptop:
* **Alokasi Waktu Tambahan 10 Menit:** Peserta memiliki waktu tepat 10:00 menit khusus untuk mengunggah lembar solusi tulis tangan (format PDF, JPG, atau PNG, maks 5 MB per berkas).
* **Filter Pertanyaan (Replikasi `od.globaluni.ru`):**
  * `[x] Only questions with file uploads` (memfilter hanya tugas yang memerlukan lembar kerja, yaitu Tugas 41–43 dan kalkulasi rumit).
  * `[x] Only answered questions` (menyaring tugas yang telah memiliki draf jawaban di sistem).
* **Kompresi Gambar Berbasis Klien (`<canvas>` Engine):**
  * Citra foto lembar kerja yang diunggah otomatis dikompresi melalui elemen `<canvas>` HTML5 ke resolusi optimal ($1600\text{ px}$ lebar) dengan kualitas JPEG 0.85 guna mencegah kegagalan kuota memori peramban.

### Tahap 4: Simulator Wawancara Lisan & Laporan Diagnostik (`#review-view` & Task 44)
* **Simulator Tanggap Lisan Spontan (Task 44 Oral Response — 5 Poin):**
  * Memilih 1 dari 3 topik lanjutan yang telah dikerjakan di Tugas 41–43.
  * **Fase Persiapan 3:00 Menit:** Timer hitung mundur tanpa rekaman suara untuk menyusun poin-poin argumen (*bullet points*) pada kotak catatan.
  * **Fase Rekaman 2:00 Menit:** Merekam suara langsung berbahasa Inggris via antarmuka `MediaRecorder` API peramban, menghasilkan berkas audio `.webm` yang dapat diputar ulang dan dinilai berdasarkan rubrik analitik 5 poin NSU.
* **Evaluasi Lembar Tulisan Tangan via AI Vision:**
  * Simulator menyediakan integrasi API Gemini untuk memindai citra lembar kerja, mengekstrak persamaan matematika, dan memberikan umpan balik langkah demi langkah.
* **Ekspor Laporan Diagnostik Teks Polos (*Plain-Text Full Report*):**
  * Menyajikan rekonsiliasi nilai terperinci, akurasi per disiplin ilmu, audit status per butir soal (`CORRECT`, `PARTIAL`, `INCORRECT`, `UNANSWERED`), perbandingan jawaban peserta vs kunci model, serta tag sub-topik silabus resmi.

---

## 2. Inventaris Bank Soal & Mesin Parametrik (Question Bank & Parametric Rules)

### 2.1 Distribusi 176 Tugas Berdasarkan 7 Bidang Ilmu & Tingkat Kesulitan

Total bank soal terdiri dari **176 tugas orisinal** berstandar akademik Novosibirsk State University (NSU) yang terbagi ke dalam 7 bidang studi resmi:

| Bidang Studi (*Field of Science*) | Basic (1 pt) | Intermediate (2–3 pts) | Advanced (10 pts) | Total Tugas |
| :--- | :---: | :---: | :---: | :---: |
| **1. Geography, physical** | 21 | 5 | 8 | **34** |
| **2. Meteorology & atmospheric sciences** | 24 | 5 | 1 | **30** |
| **3. Geology** | 12 | 6 | 2 | **20** |
| **4. Geochemistry & geophysics** | 24 | 5 | 3 | **32** |
| **5. Mining & mineral processing** | 14 | 5 | 3 | **22** |
| **6. Ecology** | 12 | 5 | 1 | **18** |
| **7. Environmental sciences** | 12 | 5 | 3 | **20** |
| **TOTAL** | **119** | **36** | **21** | **176** |

*Struktur Nilai Ujian Standar (100 Poin):*
* 25 Tugas Basic $\times$ 1 pt = 25 Poin
* 15 Tugas Intermediate $\times$ 3 pts (rata-rata terbobot) = 40 Poin
* 3 Tugas Advanced $\times$ 10 pts = 30 Poin
* 1 Tugas Oral Response (Task 44) = 5 Poin
* **Total = 100 Poin Maksimal**

---

### 2.2 Rumus Kuantitatif & Ruang Variabel Mesin Parametrik

Mesin parametrik dinamis di `app.js` secara acak menghasilkan kombinasi angka yang bersih, logis, dan dapat dihitung tanpa kalkulator rumit pada setiap sesi baru:

#### 1. Konversi Skala Kartografi & Pengukuran Lapangan (`PARAM-GEO-SCALE`)
* **Rumus:** 
  $$\text{Jarak Lapangan } D = d_{\text{peta}} \times \text{Penyebut Skala}$$
* **Variasi Skala:** $1:25,000$, $1:50,000$, $1:100,000$, $1:200,000$, $1:250,000$, $1:500,000$.
* **Contoh:** $d_{\text{peta}} = 1.8\text{ cm}$ pada peta $1:25,000 \implies D = 1.8 \times 250\text{ m} = 450\text{ m} = 0.45\text{ km}$.

#### 2. Vektor Aliran Sungai & Koordinat Geografis Rusia (`PARAM-GEO-RIVER`)
* **Konsep:** Menentukan arah mata angin dominan berdasarkan delta lintang ($\Delta \varphi$) dan delta bujur ($\Delta \lambda$) dari hulu (*source*) ke muara (*mouth*).
* **Pool Objek Geografis:**
  * Sungai Ob ($51.0^\circ\text{N}, 84.0^\circ\text{E} \rightarrow 66.5^\circ\text{N}, 69.5^\circ\text{E}$): Arah Selatan ke Utara (*South-to-North / North-Northwest*).
  * Sungai Yenisei ($51.7^\circ\text{N}, 94.5^\circ\text{E} \rightarrow 71.8^\circ\text{N}, 82.7^\circ\text{E}$): Arah Selatan ke Utara.
  * Sungai Lena ($53.9^\circ\text{N}, 108.0^\circ\text{E} \rightarrow 72.4^\circ\text{N}, 126.8^\circ\text{E}$): Arah Selatan ke Utara-Timur Laut.
  * Sungai Volga ($57.2^\circ\text{N}, 32.5^\circ\text{E} \rightarrow 45.7^\circ\text{N}, 47.9^\circ\text{E}$): Arah Utara ke Selatan.

#### 3. Persentase Presipitasi & Fluktuasi Iklim Musiman (`PARAM-MET-PRECIP`)
* **Rumus:** 
  $$\%_{\text{bulan}} = \frac{P_{\text{bulan}}}{P_{\text{tahunan}}} \times 100\%$$
* **Ruang Variabel:** $P_{\text{tahunan}} \in \{600, 800, 1000\text{ mm}\}$, $P_{\text{bulan}} \in \{90, 120, 150\text{ mm}\}$.
* **Contoh Soal Nyata:** $P_{\text{tahunan}} = 800\text{ mm}$, $P_{\text{Juli}} = 120\text{ mm} \implies \% = \frac{120}{800} \times 100\% = 15\%$.

#### 4. Barometri Tekanan Udara & Ketinggian (*Barometric Step*) (`PARAM-MET-BARO`)
* **Rumus:** 
  $$\Delta h = (P_{\text{bawah}} - P_{\text{atas}}) \times h_b$$
  di mana tahapan barometrik standar $h_b = 10.5\text{ m/mmHg}$ (atau $8.0\text{ m/hPa}$).
* **Ruang Variabel:** $P_{\text{base}} = 760\text{ mmHg}$, $P_{\text{summit}} \in \{740, 720, 700\text{ mmHg}\}$.
* **Contoh:** $\Delta P = 20\text{ mmHg} \implies \Delta h = 20 \times 10.5 = 210\text{ m}$.

#### 5. Laju Penurunan Suhu Troposfer (*Tropospheric Lapse Rate*) (`PARAM-MET-LAPSE`)
* **Rumus:** 
  $$T_{\text{puncak}} = T_{\text{dasar}} - \Gamma \cdot \frac{\Delta z}{1000}$$
  di mana $\Gamma = 6.5^\circ\text{C/km}$ (gradien rata-rata atmosfer standar) atau $\Gamma_d = 9.8^\circ\text{C/km}$ (adiabatik kering).
* **Contoh:** $T_0 = +26^\circ\text{C}$ pada $200\text{ m}$, elevasi puncak $3200\text{ m}$ ($\Delta z = 3.0\text{ km}$) $\implies T = 26 - (6.5 \times 3.0) = 26 - 19.5 = +6.5^\circ\text{C}$.
* **Ketinggian Kondensasi (*Lifting Condensation Level* / LCL):**
  $$H_{\text{LCL}} = \frac{T_0 - T_{d0}}{\Gamma_d - \Gamma_{\text{dew}}} = \frac{T_0 - T_{d0}}{9.8 - 1.8} = \frac{\Delta T_{\text{depresi}}}{8.0\text{ }^\circ\text{C/km}}$$

#### 6. Batimetri Akustik & Cepat Rambat Gelombang Seismik (`PARAM-GCH-ECHO`)
* **Rumus Waktu Tempuh Ganda (*Two-Way Travel Time* / TWT):** 
  $$h = \frac{v \cdot t_{\text{TWT}}}{2}$$
  di mana kecepatan suara dalam air laut dingin/Siberia $v = 1500\text{ m/s}$.
* **Ruang Variabel:** $t \in \{1.2, 1.6, 2.0, 2.4\text{ detik}\} \implies h \in \{900, 1200, 1500, 1800\text{ m}\}$.

#### 7. Fraksi Massa Stoikiometri Geokimia Mineral (`PARAM-MIN-MASS`)
* **Rumus:** 
  $$\omega_i = \frac{n \cdot A_r(i)}{M_r(\text{mineral})} \times 100\%$$
* **Variasi Mineral:**
  * Hematit ($\text{Fe}_2\text{O}_3$): $M_r \approx 159.7 \implies \omega_{\text{Fe}} = \frac{2 \times 55.85}{159.7} \approx 69.94\%$.
  * Magnetit ($\text{Fe}_3\text{O}_4$): $M_r \approx 231.5 \implies \omega_{\text{Fe}} = \frac{3 \times 55.85}{231.5} \approx 72.36\%$.
  * Kalkopirit ($\text{CuFeS}_2$): $M_r \approx 183.5 \implies \omega_{\text{Cu}} = \frac{63.55}{183.5} \approx 34.63\%$.
  * Sfalerit ($\text{ZnS}$): $M_r \approx 97.47 \implies \omega_{\text{Zn}} = \frac{65.38}{97.47} \approx 67.08\%$.

#### 8. Volume Tubuh Bijih dengan Metode Irisan Sejajar (*Prismoidal Rule*) (`PARAM-MIN-PRISM`)
* **Rumus:** 
  $$V = \frac{S_1 + S_2}{2} \cdot L$$
  atau formula prismoida lengkap: $V = \frac{L}{6}(S_1 + 4S_m + S_2)$.
* **Ruang Variabel:** $S_1 = 1200\text{ m}^2$, $S_2 = 800\text{ m}^2$, $L = 200\text{ m} \implies V = \frac{2000}{2} \times 200 = 200,000\text{ m}^3$. Tonase bijih: $M = V \times \rho_{\text{rock}}$.

#### 9. Ketinggian Kulminasi Surya Tengah Hari di Kota-Kota Rusia (`PARAM-ADV-SOLAR`)
* **Rumus Astronomi Kulminasi:** 
  $$h_\odot = 90^\circ - |\varphi - \delta_\odot|$$
  di mana $\varphi$ adalah lintang lokasi, dan $\delta_\odot$ adalah deklinasi matahari ($+23.44^\circ$ saat Solstis Musim Panas, $-23.44^\circ$ saat Solstis Musim Dingin, $0^\circ$ saat Ekuinoks).
* **Pool Kota Rusia:**
  * Saint Petersburg ($\varphi = 60.0^\circ\text{N}$): $h_{\text{solstis musim panas}} = 90^\circ - |60.0 - 23.44| = 90^\circ - 36.56^\circ = 53.44^\circ$.
  * Novosibirsk ($\varphi = 55.0^\circ\text{N}$): $h_{\text{solstis musim dingin}} = 90^\circ - |55.0 - (-23.44)| = 90^\circ - 78.44^\circ = 11.56^\circ$.
  * Murmansk ($\varphi = 68.9^\circ\text{N}$): Terjadi malam kutub saat solstis musim dingin ($h_\odot < 0^\circ$).

#### 10. Oksidasi Timbunan Sulfida & Netralisasi Air Asam Tambang (`PARAM-ADV-SULFIDE`)
* **Reaksi Oksidasi Pirit:** 
  $$2\text{FeS}_2 + 7.5\text{O}_2 + 5\text{H}_2\text{O} \longrightarrow 2\text{FeO(OH)} + 4\text{H}_2\text{SO}_4$$
  Rasio mol: $1\text{ mol FeS}_2 \implies 2\text{ mol H}_2\text{SO}_4$.
* **Reaksi Netralisasi Slaked Lime $\text{Ca(OH)}_2$:**
  $$\text{H}_2\text{SO}_4 + \text{Ca(OH)}_2 \longrightarrow \text{CaSO}_4\cdot 2\text{H}_2\text{O}$$
  Rasio massa teoretis: $M(\text{FeS}_2) = 119.97\text{ g/mol}$, $M(\text{H}_2\text{SO}_4) = 98.08\text{ g/mol}$, $M(\text{Ca(OH)}_2) = 74.09\text{ g/mol}$.
  Untuk setiap $1\text{ kg FeS}_2$ teroksidasi penuh dihasilkan:
  $$m_{\text{asam}} = 1\text{ kg} \times \frac{2 \times 98.08}{119.97} \approx 1.635\text{ kg H}_2\text{SO}_4$$
  Kebutuhan kapur tohor netralisasi:
  $$m_{\text{reagen}} = 1.635\text{ kg} \times \frac{74.09}{98.08} \approx 1.235\text{ kg Ca(OH)}_2$$

#### 11. Valuasi Ekonomi Bijih Polilogam (*Net Smelter Return* / NSR)
* **Rumus:** 
  $$NSR = \sum_{i=1}^n \left[ G_i \cdot R_i \cdot (P_i - D_i) \right] - \text{Penalti Pengotor} - \text{Biaya Peleburan (TC/RC)}$$
  di mana $G_i$ = kadar umpan (*feed grade*), $R_i$ = perolehan metalurgi (*recovery*), $P_i$ = harga pasar logam, $D_i$ = deduksi peleburan.

---

### 2.3 Rubrik Penilaian Resmi Novosibirsk State University (Tasks 41–44)

Tugas lanjutan tertulis (Tasks 41–43) dan presentasi lisan (Task 44) dinilai secara ketat oleh dewan juri NSU menggunakan matriks 4 kriteria analitik (Skala Total 5.0 Poin per tugas):

| No | Kriteria Penilaian NSU | Alokasi Poin | Deskripsi Standar Capaian |
| :---: | :--- | :---: | :--- |
| **1** | **Physical-Geological Setup & Boundary Definition** | **1.5 Pts** | Kemampuan merumuskan diagram fisis, mendefinisikan sistem koordinat, asumsi geologi (homogenitas, stratifikasi, kesetimbangan fasa), dan variabel batas yang relevan secara matematis. |
| **2** | **Analytical Derivation & Numeric Accuracy** | **1.5 Pts** | Ketelitian penurunan rumus, subtitusi stoikiometri/hukum fisika, ketepatan angka akhir (*significant figures*), dan penyertaan satuan internasional (SI) yang sah. |
| **3** | **Russian Academic Terminology & Fluency** | **1.0 Pt** | Ketepatan penggunaan istilah akademik baku Rusia/NSU (misal: *specific electrical resistance*, *rock dumps*, *subsoil user*, *horizontally-layered medium*, *solonchak*). |
| **4** | **Synthesis, Assumptions & Real-World Limitations** | **1.0 Pt** | Analisis kritis terhadap batasan model di alam nyata (heterogenitas batuan, kehilangan perolehan metalurgi, toleransi alat ukur, dampak lingkungan). |

---

## 3. Protokol Evaluasi Diagnostik (Instruksi untuk AI Study Mentor)

> **PETUNJUK BAGI KANDIDAT:** Salin seluruh kotak teks di bawah ini dan tempelkan sebagai instruksi awal (*System Prompt / Custom Instruction*) pada percakapan **Gemini AI Study Mentor** Anda yang terpisah sebelum mengirimkan salinan teks laporan ujian (*Full Report Export*).

```text
================================================================================
SYSTEM INSTRUCTION: OFFICIAL NSU ACADEMIC MENTOR & DIAGNOSTIC EVALUATOR
================================================================================
Anda bertindak sebagai Profesor Senior dan Dewan Penguji Olimpiade Internasional Open Doors
dari Novosibirsk State University (NSU) untuk bidang "Earth and Environmental Sciences for Sustainability".

Tugas Anda adalah membedah, menganalisis, dan mengevaluasi "Full Diagnostic Report" atau
"Graded Export" yang saya tempelkan setelah menyelesaikan latihan pada simulator ujian.

PEDOMAN EVALUASI & FEEDBACK WAJIB:
1. PENDEKATAN KAUSALITAS ILMIAH MENDALAM:
   Jangan hanya menyebutkan jawaban benar/salah secara dangkal. Jelaskan mekanisme fisika,
   kimia, geodinamika, atau ekologis yang mendasari fenomena tersebut:
   - Pada Geofisika: Jelaskan konduktivitas ionik cairan pori vs konduktivitas elektronik matriks,
     faktor geometri elektroda Schlumberger, dan pelemahan gelombang seismik.
   - Pada Geologi & Pertambangan: Jelaskan geometri diskontinuitas sesar, tegangan Mohr-Coulomb,
     hukum perolehan metalurgi flotation, serta stoikiometri oksidasi pirit.
   - Pada Meteorologi & Hidrologi: Uraikan konveksi adiabatik, depresi titik embun, stabilitas
     atmosfer (lapse rate), serta neraca massa presipitasi daerah tangkapan air.
   - Pada Geoekologi & Lingkungan: Bahas ambang batas SanPiN (MPC/ПДК), kinetika ozon troposferik,
     serta biomagnifikasi polutan hidrofobik dalam rantai makanan taiga/danau Baikal.

2. PENERAPAN RUBRIK 4 KRITERIA NSU UNTUK TUGAS LANJUTAN (Tasks 41–44):
   Evaluasi lembar kerja dan jawaban esai saya menggunakan 4 kriteria resmi NSU:
   - Kriteria 1: Setup Fisis & Batas Kondisi (Bobot 1.5)
   - Kriteria 2: Penurunan Rumus & Akurasi Hitungan (Bobot 1.5)
   - Kriteria 3: Terminologi Akademik Rusia/Internasional (Bobot 1.0)
   - Kriteria 4: Analisis Batasan & Asumsi Lapangan (Bobot 1.0)
   Berikan skor parsial yang objektif dan tunjukkan di langkah mana poin terpotong.

3. STRUKTUR FEEDBACK UNTUK SETIAP TUGAS YANG SALAH/PARSIAL:
   Untuk setiap tugas berstatus INCORRECT, PARTIAL, atau UNANSWERED, sajikan:
   a. "Akar Kesalahan Konseptual": Mengapa logika jawaban saya keliru.
   b. "Penurunan Matematis Lengkap": Langkah perhitungan langkah-demi-langkah dengan formula LaTeX.
   c. "Visual Sketching Prompt": Instruksi 1-2 kalimat tentang sketsa/diagram apa yang wajib saya
      gambar di buku catatan saya (misal: "Gambarkan penampang melintang sesar normal dengan sudut dip 60°...").
   d. "Active-Recall Challenge": Berikan 2 pertanyaan lanjutan singkat dengan variasi angka/kasus
      baru untuk memastikan saya telah memahami prinsip tersebut secara mandiri.
================================================================================
```

---

## 4. Rencana Studi Intensif 6 Hari (18 Nov – 23 Nov 2026)

Jadwal ini dioptimalkan untuk memaksimalkan retensi materi, kecepatan kalkulasi manual, dan kesiapan mental sebelum batas akhir (*cutoff*) **Senin malam, 23 November 2026** (Ujian Resmi berlangsung pada **Selasa, 24 November 2026**).

```
Rabu 18 Nov ──▶ Kamis 19 Nov ──▶ Jumat 20 Nov ──▶ Sabtu 21 Nov ──▶ Minggu 22 Nov ──▶ Senin 23 Nov ──▶ SELASA 24 NOV
(Drill Geokim)   (Drill Tambang)   (Drill Fisika)  (Advanced Esai)   (Simulasi Penuh)  (Review & Rest)   (UJIAN RESMI)
```

### Hari 1: Rabu, 18 November 2026 (Malam)
* **Fokus Disiplin:** *Geochemistry & Geophysics* (Disiplin Terlemah #1).
* **Target Latihan Simulator:**
  * Jalankan 2 sesi **Mode B: Single-Field Focus (Geochemistry & geophysics)** (masing-masing 19 soal).
  * Target skor: $\ge 85\%$ (minimal 16/19 benar).
* **Materi Wajib Buku Catatan:**
  * Menggambar skema konfigurasi elektroda tahanan jenis (*Schlumberger Array* vs *Wenner Array*), penurunan faktor geometri $K = \pi \frac{L^2 - b^2}{2b}$.
  * Menghafal konduktivitas batuan metamorf (dominasi konduksi ionik pada fluida pori/fraktur vs konduksi elektronik pada grafit/sulfida masif).
  * Perhitungan fraksi massa unsur dalam mineral bijih ($\text{Fe}_2\text{O}_3, \text{Fe}_3\text{O}_4, \text{CuFeS}_2, \text{ZnS}$).

### Hari 2: Kamis, 19 November 2026
* **Fokus Disiplin:** *Mining & Mineral Processing* dan *Physical Geography*.
* **Target Latihan Simulator:**
  * Pagi: 2 sesi **Single-Field Focus (Mining & mineral processing)**.
  * Siang: 2 sesi **Single-Field Focus (Geography, physical)**.
* **Materi Wajib Buku Catatan:**
  * Formula volume bijih irisan sejajar (*prismoidal formula*) $V = \frac{S_1 + S_2}{2} \cdot L$.
  * Neraca metalurgi pengolahan bahan galian: *Enrichment Ratio* ($ER = \beta/\alpha$) dan *Recovery* ($R = \frac{\beta(\alpha - \vartheta)}{\alpha(\beta - \vartheta)} \times 100\%$).
  * Menghafal koordinat dan arah aliran 4 sungai besar Siberia (Ob, Yenisei, Lena, Volga).
  * Konversi skala kartografi cepat tanpa coretan kertas ($1:25,000 \implies 1\text{ cm} = 250\text{ m}$; $1:50,000 \implies 1\text{ cm} = 500\text{ m}$).

### Hari 3: Jumat, 20 November 2026
* **Fokus Disiplin:** *Meteorology & Atmospheric Sciences*, *Ecology*, dan *Environmental Sciences*.
* **Target Latihan Simulator:**
  * Pagi: 1 sesi Single-Field Focus *Meteorology* (fokus LCL, rumus barometrik $h_b = 10.5\text{ m/mmHg}$, gradien suhu $6.5^\circ\text{C/km}$).
  * Siang: 1 sesi Single-Field Focus *Ecology* (Indeks Shannon-Wiener $H'$, hukum efisiensi 10% Lindeman, prinsip Gause, spesiasi Danau Baikal).
  * Sore: 1 sesi Single-Field Focus *Environmental Sciences* (zona sanitasi SanPiN, dispersi asap Gaussian, fotokimia ozon).
* **Malam:** Ekspor laporan dari riwayat lobby, tempelkan ke Gemini AI Study Mentor untuk evaluasi kelemahan spesifik.

### Hari 4: Sabtu, 21 November 2026
* **Fokus Utama:** Penguasaan Mutlak Tugas Tingkat Lanjut Tertulis (Tasks 41–43, Bobot 30 Poin).
* **Target Latihan Simulator:**
  * Jalankan 3 sesi **Preset E: Advanced Essay & Calculation Drill** berturut-turut.
* **Simulasi Alur Kerja Fisik (Phone-to-Laptop Upload Workflow):**
  * Sediakan kertas HVS putih polos dan pulpen hitam tebal ($0.5\text{--}0.7\text{ mm}$).
  * Gunakan kalkulator layar (*Tools & Tables*) dan lembar Excel kosong pada laptop.
  * Tuliskan langkah: **(1) Diketahui & Asumsi Batas**, **(2) Penurunan Rumus**, **(3) Substitusi Angka & Satuan**, **(4) Jawaban Akhir Berbingkai**.
  * Latih alur foto lembar jawaban menggunakan kamera ponsel, kirim via kabel data/web transfer ke laptop, dan unggah pada `#upload-view` dalam waktu **$< 4$ menit**.

### Hari 5: Minggu, 22 November 2026
* **Fokus Utama:** Gladi Bersih Proctored Penuh (Full 180-min Simulation) & Respon Lisan (Task 44).
* **Jadwal Eksekusi:**
  * **09:00 – 12:00 WIB:** Jalankan **Mode A: Official Proctored Stage 2 (43 Tugas Tertulis, 180 Menit)** tanpa interupsi, tanpa membuka tab lain, dengan proctoring aktif.
  * **12:00 – 12:10 WIB:** Eksekusi Tahap 3 `#upload-view`, selesaikan kompresi dan unggah seluruh lembar kerja sebelum timer 10 menit berakhir.
  * **13:00 – 14:00 WIB:** Eksekusi **Task 44 Oral Response Simulator**:
    * Lakukan 3 kali latihan rekaman lisan 2 menit dalam bahasa Inggris akademik tanpa teks naskah (*unscripted*).
    * Struktur argumen lisan wajib:
      1. *Problem context & thermodynamic/geological state (30s)*.
      2. *Mathematical governing equations & quantitative outcome (45s)*.
      3. *Geological uncertainties, real-world limitations & sustainability implications (45s)*.
* **Malam:** Tempelkan *Full Report* gladi bersih ke Gemini AI Study Mentor untuk ulasan final.

### Hari 6: Senin, 23 November 2026 (Final Preparation & Cutoff Day)
* **Pagi (09:00 – 12:00 WIB):**
  * Uji teknis perangkat keras: *webcam*, mikrofon, kestabilan koneksi internet (siapkan *hotspot* cadangan), lampu penerangan meja (wajah harus terlihat jelas tanpa bayangan), dan browser Google Chrome bersih tanpa ekstensi terlarang.
  * Siapkan dokumen resmi: Paspor asli, lembar HVS kosong 5–10 lembar, 2 pulpen hitam.
* **Siang (13:00 – 16:00 WIB):**
  * Membaca santai ringkasan formula mesin parametrik dan catatan sketsa diagram tangan.
  * Meninjau kembali daftar istilah Rusia/NSU (*subsoil user*, *rock dumps*, *solonchak*, *horizontally-layered medium*).
* **Malam (Mulai 19:30 WIB):**
  * **STRICT CUTOFF AT 20:00 WIB:** Hentikan seluruh aktivitas belajar dan latihan soal.
  * Istirahat total, tidur nyenyak minimal 8 jam untuk menjaga kejernihan kognitif menghadapi ujian resmi pada **Selasa, 24 November 2026**.
