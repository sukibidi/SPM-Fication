const Q = (subjectId, locale, question, options, correctKey, explanation, hint) => ({
  subjectId,
  locale,
  question,
  options,
  correctKey,
  explanation: explanation || '',
  hint: hint || '',
});

export const QUESTION_BANK = [
  // ── BM ──────────────────────────────────────────────────────
  Q('bm', 'ms', 'Maksud peribahasa "Bagai aur dengan tebing"?', [
    { key: 'A', label: 'Saling membantu antara satu sama lain' },
    { key: 'B', label: 'Hidup mewah dan senang' },
    { key: 'C', label: 'Bersatu kita teguh' },
    { key: 'D', label: 'Hidup dalam persaingan' },
  ], 'A', 'Aur dan tebing saling memerlukan — lambang kerjasama dan tolong-menolong.'),

  Q('bm', 'ms', 'Imbuhan "meN-" pada kata dasar "tulis" menjadi?', [
    { key: 'A', label: 'menulis' },
    { key: 'B', label: 'menulisi' },
    { key: 'C', label: 'menuliskan' },
    { key: 'D', label: 'ditulis' },
  ], 'A', 'Awalan meN- + tulis → menulis (kata kerja aktif).'),

  Q('bm', 'ms', '"Hujan emas di negeri orang, hujan batu di negeri sendiri, lebih baik di negeri sendiri." Peribahasa ini bermaksud?', [
    { key: 'A', label: 'Negeri orang lebih kaya' },
    { key: 'B', label: 'Negeri sendiri lebih baik walau apa pun' },
    { key: 'C', label: 'Hujan batu lebih berharga' },
    { key: 'D', label: 'Kita perlu merantau' },
  ], 'B', 'Menyiratkan kesetiaan dan kecintaan terhadap tanah air sendiri.'),

  Q('bm', 'ms', 'Pilih ayat yang menggunakan kata ganda dengan betul.', [
    { key: 'A', label: 'Buah-buahan itu elok dan segar' },
    { key: 'B', label: 'Buah buahan itu elok dan segar' },
    { key: 'C', label: 'Buah/ buah-an itu elok dan segar' },
    { key: 'D', label: 'Buah berbuah itu elok dan segar' },
  ], 'A', 'Kata ganda penuh "buah-buahan" ditulis dengan tanda sempang.'),

  Q('bm', 'ms', 'Pilih peribahasa yang TEPAT bagi maksud "berusaha dengan bersungguh-sungguh."', [
    { key: 'A', label: 'Bagai kacang lupakan kulit' },
    { key: 'B', label: 'Seperti kera mendapat bunga' },
    { key: 'C', label: 'Bagai cacing kepanasan' },
    { key: 'D', label: 'Berat mata memandang, berat lagi bahu memikul' },
  ], 'A', '"Bagai kacang lupakan kulit" — lupa asal-usul setelah berjaya.'),

  // ── SEJARAH ──────────────────────────────────────────────────
  Q('sejarah', 'ms', 'Tahun berapakah Kesultanan Melayu Melaka jatuh kepada Portugis?', [
    { key: 'A', label: '1400' },
    { key: 'B', label: '1511' },
    { key: 'C', label: '1641' },
    { key: 'D', label: '1786' },
  ], 'B', '1511 — kejatuhan Melaka di bawah pimpinan Alfonso de Albuquerque.'),

  Q('sejarah', 'ms', 'Siapakah Tokoh Pejuang yang dikenali sebagai "Bapa Kemerdekaan" Malaysia?', [
    { key: 'A', label: 'Tunku Abdul Rahman' },
    { key: 'B', label: 'Tun Abdul Razak' },
    { key: 'C', label: 'Tun Dr. Mahathir' },
    { key: 'D', label: 'Tun Hussein Onn' },
  ], 'A', 'Tunku Abdul Rahman Putra Al-Haj — Perdana Menteri pertama.'),

  Q('sejarah', 'ms', 'Perjanjian apakah yang menandakan penubuhan Persekutuan Malaysia 1963?', [
    { key: 'A', label: 'Perjanjian London 1957' },
    { key: 'B', label: 'Perjanjian Malaysia 1963 (MA63)' },
    { key: 'C', label: 'Perjanjian Pangkor 1874' },
    { key: 'D', label: 'Perjanjian Bangkok 1909' },
  ], 'B', 'MA63 — ditandatangani oleh Britain, Persekutuan Tanah Melayu, Sabah, Sarawak, dan Singapura.'),

  Q('sejarah', 'ms', 'Zaman Prasejarah di Malaysia dibahagikan kepada berapa tahap?', [
    { key: 'A', label: 'Dua: Paleolitik dan Neolitik' },
    { key: 'B', label: 'Tiga: Paleolitik, Mesolitik, Neolitik' },
    { key: 'C', label: 'Empat: Paleolitik, Mesolitik, Neolitik, Logam' },
    { key: 'D', label: 'Lima: termasuk Zaman Air Batu' },
  ], 'C', 'Empat tahap: Paleolitik, Mesolitik, Neolitik, dan Zaman Logam.'),

  Q('sejarah', 'ms', 'Apakah maksud "Dasar Pecah dan Perintah" yang diperkenalkan oleh British?', [
    { key: 'A', label: 'Menyatukan semua kaum' },
    { key: 'B', label: 'Memisahkan kaum dari segi ekonomi dan tempat tinggal' },
    { key: 'C', label: 'Memberi pendidikan percuma' },
    { key: 'D', label: 'Membina infrastruktur' },
  ], 'B', 'British mengamalkan dasar ini untuk mengekalkan kuasa.'),

  // ── MATEMATIK ────────────────────────────────────────────────
  Q('matematik', 'ms', 'Mana lebih besar nilai pecahan berikut? 3/5 atau 2/3?', [
    { key: 'A', label: '2/3' },
    { key: 'B', label: '3/5' },
    { key: 'C', label: 'Kedua-duanya sama' },
    { key: 'D', label: 'Tidak dapat ditentukan' },
  ], 'A', 'Samakan penyebut: 3/5 = 9/15, 2/3 = 10/15. Maka 2/3 > 3/5.', 'Samakan penyebut kepada 15'),

  Q('matematik', 'ms', 'Selesaikan: 7 x 8 + 4 = ?', [
    { key: 'A', label: '56' },
    { key: 'B', label: '60' },
    { key: 'C', label: '52' },
    { key: 'D', label: '48' },
  ], 'B', 'Darab dahulu: 7x8=56, kemudian +4 = 60.'),

  Q('matematik', 'ms', 'Kirakan 25% daripada 200.', [
    { key: 'A', label: '25' },
    { key: 'B', label: '40' },
    { key: 'C', label: '50' },
    { key: 'D', label: '75' },
  ], 'C', '25% = 25/100 = 0.25. 0.25 x 200 = 50.'),

  Q('matematik', 'ms', 'Apakah nilai bagi 2^3?', [
    { key: 'A', label: '6' },
    { key: 'B', label: '8' },
    { key: 'C', label: '4' },
    { key: 'D', label: '9' },
  ], 'B', '2^3 = 2 x 2 x 2 = 8.'),

  Q('matematik', 'ms', 'Perimeter segi empat sama dengan sisi 12 cm ialah?', [
    { key: 'A', label: '24 cm' },
    { key: 'B', label: '36 cm' },
    { key: 'C', label: '48 cm' },
    { key: 'D', label: '144 cm' },
  ], 'C', 'Perimeter = 4 x sisi = 4 x 12 = 48 cm.'),

  // ── GEOGRAFI ────────────────────────────────────────────────
  Q('geografi', 'ms', 'Apakah ibu negeri Perak?', [
    { key: 'A', label: 'Taiping' },
    { key: 'B', label: 'Ipoh' },
    { key: 'C', label: 'Teluk Intan' },
    { key: 'D', label: 'Kuala Kangsar' },
  ], 'B', 'Ipoh ialah ibu negeri Perak Darul Ridzuan.'),

  Q('geografi', 'ms', 'Bentuk muka bumi apakah yang terbentuk daripada pemendapan lumpur di muara sungai?', [
    { key: 'A', label: 'Delta' },
    { key: 'B', label: 'Permatang pasir' },
    { key: 'C', label: 'Lagun' },
    { key: 'D', label: 'Terumbu karang' },
  ], 'A', 'Delta — terbentuk daripada pemendapan di muara.'),

  Q('geografi', 'ms', 'Laut apakah yang terletak di antara Semenanjung Malaysia dan Pulau Sumatera?', [
    { key: 'A', label: 'Laut China Selatan' },
    { key: 'B', label: 'Selat Melaka' },
    { key: 'C', label: 'Laut Sulu' },
    { key: 'D', label: 'Selat Johor' },
  ], 'B', 'Selat Melaka — laluan perkapalan tersibuk di dunia.'),

  Q('geografi', 'ms', 'Apakah faktor utama yang mempengaruhi iklim di Malaysia?', [
    { key: 'A', label: 'Angin Monsun' },
    { key: 'B', label: 'Arus Lautan Pasifik' },
    { key: 'C', label: 'Salji abadi' },
    { key: 'D', label: 'Fenomena El Nino sahaja' },
  ], 'A', 'Angin Monsun — Timur Laut (November-Mac) dan Barat Daya (Mei-September).'),

  Q('geografi', 'ms', 'Apakah gunung tertinggi di Malaysia?', [
    { key: 'A', label: 'Gunung Tahan' },
    { key: 'B', label: 'Gunung Kinabalu' },
    { key: 'C', label: 'Gunung Ledang' },
    { key: 'D', label: 'Gunung Korbu' },
  ], 'B', 'Gunung Kinabalu (4,095m) — terletak di Sabah.'),

  // ── SAINS ────────────────────────────────────────────────────
  Q('sains', 'ms', 'Apakah simbol kimia bagi Hidrogen?', [
    { key: 'A', label: 'Hy' },
    { key: 'B', label: 'H' },
    { key: 'C', label: 'Hd' },
    { key: 'D', label: 'Hg' },
  ], 'B', 'Hidrogen — unsur paling ringan dengan simbol H.'),

  Q('sains', 'ms', 'Apakah unit SI bagi daya?', [
    { key: 'A', label: 'Joule (J)' },
    { key: 'B', label: 'Newton (N)' },
    { key: 'C', label: 'Watt (W)' },
    { key: 'D', label: 'Pascal (Pa)' },
  ], 'B', 'Newton (N) — unit daya, dinamakan sempena Sir Isaac Newton.'),

  Q('sains', 'ms', 'Proses apakah yang menghasilkan tenaga di dalam matahari?', [
    { key: 'A', label: 'Pembakaran' },
    { key: 'B', label: 'Pelakuran nuklear' },
    { key: 'C', label: 'Pembelahan nuklear' },
    { key: 'D', label: 'Tindak balas kimia' },
  ], 'B', 'Pelakuran nuklear — gabungan atom hidrogen menjadi helium pada suhu sangat tinggi.'),

  Q('sains', 'ms', 'Apakah pH bagi asid kuat seperti asid hidroklorik?', [
    { key: 'A', label: 'pH 1-3' },
    { key: 'B', label: 'pH 7' },
    { key: 'C', label: 'pH 8-10' },
    { key: 'D', label: 'pH 12-14' },
  ], 'A', 'Asid kuat berada dalam julat pH 1-3.'),

  Q('sains', 'ms', 'Hukum Gerakan Newton yang manakah menyatakan "Setiap tindakan ada tindak balas yang sama tetapi bertentangan arah"?', [
    { key: 'A', label: 'Hukum Pertama' },
    { key: 'B', label: 'Hukum Kedua' },
    { key: 'C', label: 'Hukum Ketiga' },
    { key: 'D', label: 'Hukum Keempat' },
  ], 'C', 'Hukum Ketiga Newton — F(tindakan) = -F(tindak balas).'),

  // ═════════════════════════════════════════════════════════════
  //  ENGLISH QUESTIONS
  // ═════════════════════════════════════════════════════════════

  // ── BM (English) ────────────────────────────────────────────
  Q('bm', 'en', 'What is the meaning of the proverb "Bagai aur dengan tebing"?', [
    { key: 'A', label: 'Mutual help between one another' },
    { key: 'B', label: 'Living in luxury and comfort' },
    { key: 'C', label: 'Unity is strength' },
    { key: 'D', label: 'Living in competition' },
  ], 'A', 'The bamboo and the riverbank depend on each other — a symbol of cooperation and mutual help.'),

  Q('bm', 'en', 'The prefix "meN-" added to the root word "tulis" becomes?', [
    { key: 'A', label: 'menulis' },
    { key: 'B', label: 'menulisi' },
    { key: 'C', label: 'menuliskan' },
    { key: 'D', label: 'ditulis' },
  ], 'A', 'Prefix meN- + tulis → menulis (active verb).'),

  Q('bm', 'en', '"Gold rain in a foreign land, stone rain in one\'s own land — better to be in one\'s own land." This proverb means?', [
    { key: 'A', label: 'Foreign lands are richer' },
    { key: 'B', label: 'One\'s own country is best no matter what' },
    { key: 'C', label: 'Stone rain is more valuable' },
    { key: 'D', label: 'We should migrate' },
  ], 'B', 'It conveys loyalty and love for one\'s own homeland.'),

  Q('bm', 'en', 'Choose the sentence that uses reduplication correctly.', [
    { key: 'A', label: 'Buah-buahan itu elok dan segar' },
    { key: 'B', label: 'Buah buahan itu elok dan segar' },
    { key: 'C', label: 'Buah/ buah-an itu elok dan segar' },
    { key: 'D', label: 'Buah berbuah itu elok dan segar' },
  ], 'A', 'Full reduplication "buah-buahan" is written with a hyphen.'),

  Q('bm', 'en', 'Which proverb CORRECTLY matches the meaning "to strive with great effort"?', [
    { key: 'A', label: 'Bagai kacang lupakan kulit' },
    { key: 'B', label: 'Seperti kera mendapat bunga' },
    { key: 'C', label: 'Bagai cacing kepanasan' },
    { key: 'D', label: 'Berat mata memandang, berat lagi bahu memikul' },
  ], 'A', '"Bagai kacang lupakan kulit" — forgetting one\'s roots after success.'),

  // ── SEJARAH (English) ────────────────────────────────────────
  Q('sejarah', 'en', 'In which year did the Malacca Sultanate fall to the Portuguese?', [
    { key: 'A', label: '1400' },
    { key: 'B', label: '1511' },
    { key: 'C', label: '1641' },
    { key: 'D', label: '1786' },
  ], 'B', '1511 — the fall of Malacca under Alfonso de Albuquerque.'),

  Q('sejarah', 'en', 'Who is the national figure known as the "Father of Independence" of Malaysia?', [
    { key: 'A', label: 'Tunku Abdul Rahman' },
    { key: 'B', label: 'Tun Abdul Razak' },
    { key: 'C', label: 'Tun Dr. Mahathir' },
    { key: 'D', label: 'Tun Hussein Onn' },
  ], 'A', 'Tunku Abdul Rahman Putra Al-Haj — the first Prime Minister.'),

  Q('sejarah', 'en', 'Which agreement marked the formation of the Federation of Malaysia in 1963?', [
    { key: 'A', label: 'London Treaty 1957' },
    { key: 'B', label: 'Malaysia Agreement 1963 (MA63)' },
    { key: 'C', label: 'Pangkor Treaty 1874' },
    { key: 'D', label: 'Bangkok Treaty 1909' },
  ], 'B', 'MA63 — signed by Britain, the Federation of Malaya, Sabah, Sarawak, and Singapore.'),

  Q('sejarah', 'en', 'How many stages is the Prehistoric period in Malaysia divided into?', [
    { key: 'A', label: 'Two: Paleolithic and Neolithic' },
    { key: 'B', label: 'Three: Paleolithic, Mesolithic, Neolithic' },
    { key: 'C', label: 'Four: Paleolithic, Mesolithic, Neolithic, Metal' },
    { key: 'D', label: 'Five: including the Ice Age' },
  ], 'C', 'Four stages: Paleolithic, Mesolithic, Neolithic, and the Metal Age.'),

  Q('sejarah', 'en', 'What is the meaning of the "Divide and Rule" policy introduced by the British?', [
    { key: 'A', label: 'Uniting all races' },
    { key: 'B', label: 'Separating races economically and by settlement' },
    { key: 'C', label: 'Providing free education' },
    { key: 'D', label: 'Building infrastructure' },
  ], 'B', 'The British adopted this policy to maintain power.'),

  // ── MATEMATIK (English) ──────────────────────────────────────
  Q('matematik', 'en', 'Which fraction is larger? 3/5 or 2/3?', [
    { key: 'A', label: '2/3' },
    { key: 'B', label: '3/5' },
    { key: 'C', label: 'Both are equal' },
    { key: 'D', label: 'Cannot be determined' },
  ], 'A', 'Common denominator: 3/5 = 9/15, 2/3 = 10/15. So 2/3 > 3/5.', 'Convert to denominator 15'),

  Q('matematik', 'en', 'Solve: 7 x 8 + 4 = ?', [
    { key: 'A', label: '56' },
    { key: 'B', label: '60' },
    { key: 'C', label: '52' },
    { key: 'D', label: '48' },
  ], 'B', 'Multiply first: 7x8=56, then +4 = 60.'),

  Q('matematik', 'en', 'Calculate 25% of 200.', [
    { key: 'A', label: '25' },
    { key: 'B', label: '40' },
    { key: 'C', label: '50' },
    { key: 'D', label: '75' },
  ], 'C', '25% = 25/100 = 0.25. 0.25 x 200 = 50.'),

  Q('matematik', 'en', 'What is the value of 2^3?', [
    { key: 'A', label: '6' },
    { key: 'B', label: '8' },
    { key: 'C', label: '4' },
    { key: 'D', label: '9' },
  ], 'B', '2^3 = 2 x 2 x 2 = 8.'),

  Q('matematik', 'en', 'The perimeter of a square with side 12 cm is?', [
    { key: 'A', label: '24 cm' },
    { key: 'B', label: '36 cm' },
    { key: 'C', label: '48 cm' },
    { key: 'D', label: '144 cm' },
  ], 'C', 'Perimeter = 4 x side = 4 x 12 = 48 cm.'),

  // ── GEOGRAFI (English) ──────────────────────────────────────
  Q('geografi', 'en', 'What is the capital city of Perak?', [
    { key: 'A', label: 'Taiping' },
    { key: 'B', label: 'Ipoh' },
    { key: 'C', label: 'Teluk Intan' },
    { key: 'D', label: 'Kuala Kangsar' },
  ], 'B', 'Ipoh is the capital of Perak Darul Ridzuan.'),

  Q('geografi', 'en', 'What landform is formed by the deposition of silt at river mouths?', [
    { key: 'A', label: 'Delta' },
    { key: 'B', label: 'Sandbar' },
    { key: 'C', label: 'Lagoon' },
    { key: 'D', label: 'Coral reef' },
  ], 'A', 'Delta — formed by deposition at the river mouth.'),

  Q('geografi', 'en', 'Which sea lies between Peninsular Malaysia and Sumatra?', [
    { key: 'A', label: 'South China Sea' },
    { key: 'B', label: 'Strait of Malacca' },
    { key: 'C', label: 'Sulu Sea' },
    { key: 'D', label: 'Strait of Johor' },
  ], 'B', 'Strait of Malacca — the busiest shipping lane in the world.'),

  Q('geografi', 'en', 'What is the main factor affecting Malaysia\'s climate?', [
    { key: 'A', label: 'Monsoon Winds' },
    { key: 'B', label: 'Pacific Ocean currents' },
    { key: 'C', label: 'Permanent snow' },
    { key: 'D', label: 'El Nino phenomenon alone' },
  ], 'A', 'Monsoon winds — Northeast (Nov-Mar) and Southwest (May-Sep).'),

  Q('geografi', 'en', 'What is the highest mountain in Malaysia?', [
    { key: 'A', label: 'Mount Tahan' },
    { key: 'B', label: 'Mount Kinabalu' },
    { key: 'C', label: 'Mount Ledang' },
    { key: 'D', label: 'Mount Korbu' },
  ], 'B', 'Mount Kinabalu (4,095m) — located in Sabah.'),

  // ── SAINS (English) ──────────────────────────────────────────
  Q('sains', 'en', 'What is the chemical symbol for Hydrogen?', [
    { key: 'A', label: 'Hy' },
    { key: 'B', label: 'H' },
    { key: 'C', label: 'Hd' },
    { key: 'D', label: 'Hg' },
  ], 'B', 'Hydrogen — the lightest element with symbol H.'),

  Q('sains', 'en', 'What is the SI unit for force?', [
    { key: 'A', label: 'Joule (J)' },
    { key: 'B', label: 'Newton (N)' },
    { key: 'C', label: 'Watt (W)' },
    { key: 'D', label: 'Pascal (Pa)' },
  ], 'B', 'Newton (N) — the unit of force, named after Sir Isaac Newton.'),

  Q('sains', 'en', 'What process produces energy in the sun?', [
    { key: 'A', label: 'Combustion' },
    { key: 'B', label: 'Nuclear fusion' },
    { key: 'C', label: 'Nuclear fission' },
    { key: 'D', label: 'Chemical reaction' },
  ], 'B', 'Nuclear fusion — hydrogen atoms combine into helium at extremely high temperatures.'),

  Q('sains', 'en', 'What is the pH of a strong acid like hydrochloric acid?', [
    { key: 'A', label: 'pH 1-3' },
    { key: 'B', label: 'pH 7' },
    { key: 'C', label: 'pH 8-10' },
    { key: 'D', label: 'pH 12-14' },
  ], 'A', 'Strong acids are in the pH 1-3 range.'),

  Q('sains', 'en', 'Which of Newton\'s Laws of Motion states "Every action has an equal and opposite reaction"?', [
    { key: 'A', label: 'First Law' },
    { key: 'B', label: 'Second Law' },
    { key: 'C', label: 'Third Law' },
    { key: 'D', label: 'Fourth Law' },
  ], 'C', 'Newton\'s Third Law — F(action) = -F(reaction).'),
];