const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'src', 'data', 'questions');

function writeTsFile(weekNum, data) {
  const code = `import { Question } from '../../types/quiz';

export const MINGGU_${weekNum}_QUESTIONS: Question[] = ${JSON.stringify(data, null, 2)};
`;
  fs.writeFileSync(path.join(outDir, `m${weekNum}.ts`), code, 'utf-8');
  console.log(`Generated m${weekNum}.ts (${data.length} questions)`);
}

function transformWeekData(rawList, weekNum) {
  return rawList.map(item => {
    const isPG = item.num <= 30;
    const isKategori = item.num >= 31 && item.num <= 40;
    const isMCMA = item.num >= 41 && item.num <= 50;

    let type = 'PG';
    if (isKategori) type = 'PGK_KATEGORI';
    if (isMCMA) type = 'PGK_MCMA';

    const obj = {
      id: `m${weekNum}_q${item.num}`,
      week: weekNum,
      number: item.num,
      type: type,
      kompetensi: item.kompetensi,
      subKompetensi: item.subKompetensi,
      kasus: item.kasus,
      pembahasan: item.pembahasan
    };

    if (isPG) {
      obj.options = item.options;
      obj.correctAnswer = item.kunci;
      obj.correctOptionIndex = item.correctIndex;
    } else if (isKategori) {
      obj.statements = item.statements;
    } else if (isMCMA) {
      obj.mcmaOptions = item.options;
      obj.correctMcmaIndices = item.correctIndices;
    }

    return obj;
  });
}

// ====================================================
// MINGGU 5: Kabel Tembaga, Terminasi & Topologi
// ====================================================
const kompM5 = "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi";
const subM5 = "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi";
const kompTopo = "Menganalisis kelebihan dan kekurangan topologi dan arsitektur jaringan";
const subTopo = "Topologi dan arsitektur jaringan";

const m5_raw_pg = [
  { n: 1, k: kompM5, s: subM5, c: "kabel pasangan terpilin tanpa pelindung tambahan yang umum digunakan pada Ethernet dalam gedung. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["EMI", "UTP", "T568A", "Topologi Ring", "Topologi Star"], ku: "B", ci: 1, p: "UTP (Unshielded Twisted Pair) mengandalkan lilitan simetris antar-pasangan kawat untuk meredam noise tanpa selubung pelindung logam tambahan." },
  { n: 2, k: kompM5, s: subM5, c: "kabel pasangan terpilin dengan pelindung untuk membantu mengurangi interferensi jika instalasi dan grounding benar. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["T568B", "Attenuation", "Straight-through", "STP", "Topologi Star"], ku: "D", ci: 3, p: "STP (Shielded Twisted Pair) dilengkapi foil/braided shield untuk proteksi terhadap interferensi elektromagnetik (EMI) pada lingkungan industri." },
  { n: 3, k: kompM5, s: subM5, c: "kategori kabel tembaga yang umum mendukung Gigabit Ethernet pada jarak standar instalasi. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Cat5e", "RJ45", "Cat6", "Topologi Tree", "T568A"], ku: "A", ci: 0, p: "Kabel UTP Cat5e (Category 5 Enhanced) beroperasi hingga frekuensi 100 MHz dan dirancang mendukung Gigabit Ethernet 1000BASE-T hingga jarak 100 meter." },
  { n: 4, k: kompM5, s: subM5, c: "kategori dengan performa crosstalk lebih baik dan dukungan frekuensi lebih tinggi dibanding Cat5e. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Crosstalk", "T568B", "Topologi Mesh", "Batas Kanal 100 Meter", "Cat6"], ku: "E", ci: 4, p: "Kabel Cat6 beroperasi pada frekuensi hingga 250 MHz dan memiliki spline (separator fisik antar-pair) untuk mengurangi NEXT (Near-End Crosstalk)." },
  { n: 5, k: kompM5, s: subM5, c: "sebutan umum konektor modular delapan posisi yang digunakan pada kabel Ethernet tembaga. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["RJ45", "Batas Kanal 100 Meter", "Crimping Tool", "Crosstalk", "Cat6"], ku: "A", ci: 0, p: "RJ45 (8P8C - 8 Position 8 Contact) adalah konektor modular standar industri telekomunikasi untuk terminasi kabel UTP/STP." },
  { n: 6, k: kompM5, s: subM5, c: "susunan warna terminasi dengan pasangan hijau pada pin 1-2 dan pasangan oranye pada pin 3-6. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Straight-through", "Batas Kanal 100 Meter", "T568A", "RJ45", "Cable Tester"], ku: "C", ci: 2, p: "Standar T568A: Pin 1-2 (Putih Hijau - Hijau), Pin 3-6 (Putih Oranye - Oranye), Pin 4-5 (Biru - Putih Biru), Pin 7-8 (Putih Cokelat - Cokelat)." },
  { n: 7, k: kompM5, s: subM5, c: "susunan warna terminasi dengan pasangan oranye pada pin 1-2 dan pasangan hijau pada pin 3-6. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["UTP", "EMI", "Crosstalk", "T568A", "T568B"], ku: "E", ci: 4, p: "Standar T568B: Pin 1-2 (Putih Oranye - Oranye), Pin 3-6 (Putih Hijau - Hijau), Pin 4-5 (Biru - Putih Biru), Pin 7-8 (Putih Cokelat - Cokelat)." },
  { n: 8, k: kompM5, s: subM5, c: "kabel yang kedua ujungnya menggunakan standar susunan yang sama. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Topologi Star", "UTP", "Crosstalk", "Topologi Bus", "Straight-through"], ku: "E", ci: 4, p: "Kabel Straight-through menghubungkan dua perangkat berbeda level (misal PC ke Switch atau Switch ke Router) dengan standar urutan pin sama di kedua ujung." },
  { n: 9, k: kompM5, s: subM5, c: "kabel yang kedua ujungnya menggunakan T568A dan T568B sehingga pasangan kirim-terima bersilang. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Straight-through", "Topologi Star", "Crossover", "T568A", "Topologi Ring"], ku: "C", ci: 2, p: "Kabel Crossover menyilangkan pin transmisi (TX) dan penerima (RX) secara fisik untuk menghubungkan dua perangkat sejenis (misal PC ke PC atau Switch ke Switch)." },
  { n: 10, k: kompM5, s: subM5, c: "alat untuk menekan pin konektor modular sekaligus mengunci konektor pada kabel. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Topologi Mesh", "Crimping Tool", "Straight-through", "EMI", "Topologi Ring"], ku: "B", ci: 1, p: "Crimping Tool (tang crimping) berfungsi menjepit pin tembaga konektor RJ45 ke konduktor kabel tembaga sekaligus mengunci selubung luar (jacket clamp)." },
  { n: 11, k: kompM5, s: subM5, c: "alat yang memeriksa kontinuitas, urutan pin, putus, short, atau salah pasangan pada kabel. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Batas Kanal 100 Meter", "Topologi Tree", "Cable Tester", "Topologi Bus", "Cat6"], ku: "C", ci: 2, p: "LAN Cable Tester (wire mapper) menguji kontinuitas arus ke-8 konduktor pin kabel, mendeteksi kabel putus (open), konslet (short), atau salah urut (miswire)." },
  { n: 12, k: kompM5, s: subM5, c: "penurunan kekuatan sinyal sepanjang media transmisi. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["RJ45", "Cat6", "Cat5e", "Topologi Ring", "Attenuation"], ku: "E", ci: 4, p: "Attenuation (redaman sinyal) adalah fenomena berkurangnya amplitudo dan daya sinyal saat merambat melalui media fisik seiring bertambahnya jarak transmisi." },
  { n: 13, k: kompM5, s: subM5, c: "gangguan sinyal antar pasangan kabel yang berdekatan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Straight-through", "Topologi Bus", "UTP", "Crosstalk", "Attenuation"], ku: "D", ci: 3, p: "Crosstalk adalah induksi elektromagnetik yang tidak diinginkan dari satu pasang kawat transmisi ke pasangan kawat lain yang berada dalam satu kabel." },
  { n: 14, k: kompM5, s: subM5, c: "interferensi elektromagnetik dari sumber listrik, motor, radio, atau perangkat lain. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["UTP", "RJ45", "Topologi Ring", "EMI", "Crossover"], ku: "D", ci: 3, p: "EMI (Electromagnetic Interference) merupakan gangguan noise pada sinyal data kabel akibat radiasi medan elektromagnetik dari trafo, motor listrik, atau kabel power." },
  { n: 15, k: kompM5, s: subM5, c: "batas umum kanal Ethernet tembaga yang terdiri dari permanent link dan patch cord sesuai standar. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["RJ45", "STP", "UTP", "Batas Kanal 100 Meter", "Crossover"], ku: "D", ci: 3, p: "Standar TIA/EIA-568 menetapkan batas kanal kabel tembaga Ethernet maksimal 100 meter (90 meter permanent horizontal link + 10 meter total patch cords)." },
  { n: 16, k: kompTopo, s: subTopo, c: "topologi dengan seluruh node terhubung ke perangkat pusat sehingga mudah dikelola dan gangguan kabel biasanya lokal. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Topologi Ring", "Topologi Bus", "Topologi Star", "Topologi Tree", "Topologi Mesh"], ku: "C", ci: 2, p: "Topologi Star menghubungkan setiap komputer klien ke switch konsentrator pusat; jika satu kabel klien putus, jaringan klien lain tetap berjalan normal." },
  { n: 17, k: kompTopo, s: subTopo, c: "topologi berbagi satu jalur utama sehingga murah tetapi gangguan backbone dapat memengaruhi seluruh jaringan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Topologi Tree", "Topologi Ring", "Topologi Mesh", "Topologi Star", "Topologi Bus"], ku: "E", ci: 4, p: "Topologi Bus menggunakan kabel coaxial tunggal dengan terminator di kedua ujungnya; jika kabel backbone utama terputus, seluruh jaringan akan lumpuh." },
  { n: 18, k: kompTopo, s: subTopo, c: "topologi di mana node membentuk jalur melingkar dan data mengikuti mekanisme cincin. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Topologi Bus", "Topologi Mesh", "Topologi Tree", "Topologi Ring", "Topologi Star"], ku: "D", ci: 3, p: "Topologi Ring mengalirkan frame data dalam satu arah (unidirectional) melingkar melewati setiap node menggunakan mekanisme token passing." },
  { n: 19, k: kompTopo, s: subTopo, c: "topologi dengan banyak jalur antar-node yang memberi redundansi tinggi tetapi biaya dan kompleksitas besar. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Topologi Tree", "Topologi Ring", "Topologi Bus", "Topologi Mesh", "Topologi Star"], ku: "D", ci: 3, p: "Topologi Mesh menghubungkan setiap simpul jaringan ke banyak simpul lain secara langsung (point-to-point) untuk fault-tolerance maksimal." },
  { n: 20, k: kompTopo, s: subTopo, c: "topologi hierarkis yang menggabungkan beberapa star dalam struktur bertingkat. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Topologi Mesh", "Topologi Bus", "Topologi Ring", "Topologi Star", "Topologi Tree"], ku: "E", ci: 4, p: "Topologi Tree (Pohon / Hierarkis) menghubungkan beberapa switch bintang pada tingkat access ke switch distribution dan core secara bertingkat." },
  { n: 21, k: kompM5, s: subM5, c: "Kabel UTP diterminasi T568B pada kedua ujung. Jenis kabel tersebut adalah ...", opts: ["Fiber patch cord", "Coaxial", "Crossover", "Straight-through", "Rollover selalu"], ku: "D", ci: 3, p: "Jika kedua ujung kabel menggunakan standar susunan yang sama (T568B ke T568B atau T568A ke T568A), kabel tersebut berjenis Straight-through." },
  { n: 22, k: kompM5, s: subM5, c: "Ujung pertama T568A dan ujung kedua T568B. Jenis kabel adalah ...", opts: ["Single-mode", "Straight-through", "Drop fiber", "Crossover", "Trunk"], ku: "D", ci: 3, p: "Kabel dengan satu ujung berstandar T568A dan ujung lainnya berstandar T568B adalah kabel Crossover." },
  { n: 23, k: kompM5, s: subM5, c: "Tester menunjukkan pin 1 terhubung ke pin 2. Kondisi ini disebut ...", opts: ["Topologi mesh", "IPv6", "Attenuation nol", "Pass sempurna", "Miswire atau salah urutan"], ku: "E", ci: 4, p: "Indikasi tester di mana nomor pin tidak berpasangan lurus atau tertukar urutan pinnya disebut kesalahan kabel (Miswire / Wiremap Error)." },
  { n: 24, k: kompM5, s: subM5, c: "Kabel data dipasang sejajar sangat dekat dengan motor listrik. Risiko utama adalah ...", opts: ["Link budget optik", "CPU overheating", "Interferensi elektromagnetik", "DNS cache penuh", "Alamat IP habis"], ku: "C", ci: 2, p: "Motor listrik memancarkan medan elektromagnetik kuat saat berputar, memicu induksi interferensi elektromagnetik (EMI) pada kabel tembaga di sekitarnya." },
  { n: 25, k: kompM5, s: subM5, c: "Teknisi membuka puntiran pasangan kabel terlalu panjang saat memasang RJ45. Dampaknya dapat berupa ...", opts: ["Daya optik meningkat", "SSD rusak", "IPv6 berubah", "Crosstalk meningkat dan kualitas sinyal menurun", "VLAN otomatis terbentuk"], ku: "D", ci: 3, p: "Puntiran (twist) kawat berfungsi meniadakan interferensi gelombang. Membuka lilitan kabel terlalu panjang sebelum konektor RJ45 akan menaikkan crosstalk secara drastis." },
  { n: 26, k: kompM5, s: subM5, c: "Jalur tembaga total 115 meter menunjukkan koneksi tidak stabil. Tindakan terbaik adalah ...", opts: ["Menggunakan konektor lebih banyak", "Mengubah warna kabel saja", "Mengganti nama SSID", "Menambah DNS", "Mendesain ulang agar memenuhi batas panjang atau menggunakan switch/fiber sesuai kebutuhan"], ku: "E", ci: 4, p: "Panjang 115 meter melebihi batas standar kabel tembaga (100m). Solusinya adalah pasang switch repeater perantara atau ganti media transmisi ke fiber optik." },
  { n: 27, k: kompTopo, s: subTopo, c: "Kantor kecil membutuhkan topologi mudah dikelola dan kerusakan satu kabel tidak memutus klien lain. Pilihan tepat adalah ...", opts: ["Point-to-point saja", "Ring tunggal", "Bus", "Star", "Full mesh wajib"], ku: "D", ci: 3, p: "Topologi Star paling ideal untuk lingkungan kantor karena manajemen port switch sentral yang mudah dan kerusakan kabel klien terisolasi secara lokal." },
  { n: 28, k: kompTopo, s: subTopo, c: "Jaringan antar lokasi kritis memerlukan banyak jalur cadangan, sementara biaya bukan kendala utama. Topologi yang cocok adalah ...", opts: ["Satu hub", "Bus", "Daisy chain", "Star tanpa redundansi", "Mesh"], ku: "E", ci: 4, p: "Topologi Mesh menyediakan redundansi jalur multi-point terbaik; bila salah satu link putus, paket data otomatis beralih ke jalur alternatif tanpa downtime." },
  { n: 29, k: kompM5, s: subM5, c: "STP dipilih untuk lingkungan EMI tinggi. Agar shielding efektif, instalasi harus ...", opts: ["Melepas shield di semua titik secara acak", "Dicampur dengan kabel daya", "Ditekuk tajam", "Dibiarkan tanpa terminasi", "Menggunakan komponen kompatibel dan grounding yang benar"], ku: "E", ci: 4, p: "Kabel STP wajib menggunakan konektor RJ45 metal shielded dan diterminasi ke grounding busbar panel patch agar muatan induksi terbuang ke tanah." },
  { n: 30, k: kompM5, s: subM5, c: "Setelah crimping, langkah berikutnya yang benar adalah ...", opts: ["Mengubah IP komputer", "Memotong kabel lagi tanpa alasan", "Merendam konektor", "Langsung menutup laporan tanpa uji", "Melakukan inspeksi visual dan pengujian dengan cable tester"], ku: "E", ci: 4, p: "SOP pasca crimping: inspeksi visual posisi jaket & gigi pin konektor, lalu uji wiremap menggunakan LAN cable tester sebelum kabel dipasang operasional." }
];

const m5_kategori_keys = [
  // 31: S, B, B
  { n: 31, sts: [
    { id: "A", text: "T568A paling tepat dijelaskan sebagai alat yang memeriksa kontinuitas, urutan pin, putus, short, atau salah pasangan pada kabel.", answer: "Salah" },
    { id: "B", text: "Cat5e paling tepat dijelaskan sebagai kategori kabel tembaga yang umum mendukung Gigabit Ethernet pada jarak standar instalasi.", answer: "Benar" },
    { id: "C", text: "Straight-through paling tepat dijelaskan sebagai kabel yang kedua ujungnya menggunakan standar susunan yang sama.", answer: "Benar" }
  ], p: "A salah (itu Cable Tester), B benar, C benar." },
  // 32: B, B, S
  { n: 32, sts: [
    { id: "A", text: "Cat6 paling tepat dijelaskan sebagai kategori dengan performa crosstalk lebih baik dan dukungan frekuensi lebih tinggi dibanding Cat5e.", answer: "Benar" },
    { id: "B", text: "EMI paling tepat dijelaskan sebagai interferensi elektromagnetik dari sumber listrik, motor, radio, atau perangkat lain.", answer: "Benar" },
    { id: "C", text: "Batas Kanal 100 Meter paling tepat dijelaskan sebagai sebutan umum konektor modular delapan posisi yang digunakan pada kabel Ethernet tembaga.", answer: "Salah" }
  ], p: "A benar, B benar, C salah (itu RJ45)." },
  // 33: S, B, B
  { n: 33, sts: [
    { id: "A", text: "Crosstalk paling tepat dijelaskan sebagai kategori kabel tembaga yang umum mendukung Gigabit Ethernet pada jarak standar instalasi.", answer: "Salah" },
    { id: "B", text: "T568B paling tepat dijelaskan sebagai susunan warna terminasi dengan pasangan oranye pada pin 1-2 dan pasangan hijau pada pin 3-6.", answer: "Benar" },
    { id: "C", text: "Crosstalk paling tepat dijelaskan sebagai gangguan sinyal antar pasangan kabel yang berdekatan.", answer: "Benar" }
  ], p: "A salah (itu Cat5e), B benar, C benar." },
  // 34: S, B, S
  { n: 34, sts: [
    { id: "A", text: "Cat6 paling tepat dijelaskan sebagai kabel yang kedua ujungnya menggunakan T568A dan T568B sehingga pasangan kirim-terima bersilang.", answer: "Salah" },
    { id: "B", text: "T568A paling tepat dijelaskan sebagai susunan warna terminasi dengan pasangan hijau pada pin 1-2 dan pasangan oranye pada pin 3-6.", answer: "Benar" },
    { id: "C", text: "Straight-through paling tepat dijelaskan sebagai gangguan sinyal antar pasangan kabel yang berdekatan.", answer: "Salah" }
  ], p: "A salah (itu Crossover), B benar, C salah (itu Crosstalk)." },
  // 35: S, B, S
  { n: 35, sts: [
    { id: "A", text: "Cable Tester paling tepat dijelaskan sebagai kabel pasangan terpilin tanpa pelindung tambahan yang umum digunakan pada Ethernet dalam gedung.", answer: "Salah" },
    { id: "B", text: "STP paling tepat dijelaskan sebagai kabel pasangan terpilin dengan pelindung untuk membantu mengurangi interferensi jika instalasi dan grounding benar.", answer: "Benar" },
    { id: "C", text: "Crimping Tool paling tepat dijelaskan sebagai batas umum kanal Ethernet tembaga yang terdiri dari permanent link dan patch cord sesuai standar.", answer: "Salah" }
  ], p: "A salah (itu UTP), B benar, C salah (itu Batas Kanal 100m)." },
  // 36: S, B, B
  { n: 36, sts: [
    { id: "A", text: "Cat5e paling tepat dijelaskan sebagai kabel yang kedua ujungnya menggunakan standar susunan yang sama.", answer: "Salah" },
    { id: "B", text: "Crimping Tool paling tepat dijelaskan sebagai alat untuk menekan pin konektor modular sekaligus mengunci konektor pada kabel.", answer: "Benar" },
    { id: "C", text: "Attenuation paling tepat dijelaskan sebagai penurunan kekuatan sinyal sepanjang media transmisi.", answer: "Benar" }
  ], p: "A salah (itu Straight-through), B benar, C benar." },
  // 37: S, S, S
  { n: 37, sts: [
    { id: "A", text: "RJ45 paling tepat dijelaskan sebagai alat untuk menekan pin konektor modular sekaligus mengunci konektor pada kabel.", answer: "Salah" },
    { id: "B", text: "Crossover paling tepat dijelaskan sebagai interferensi elektromagnetik dari sumber listrik, motor, radio, atau perangkat lain.", answer: "Salah" },
    { id: "C", text: "EMI paling tepat dijelaskan sebagai kategori dengan performa crosstalk lebih baik dan dukungan frekuensi lebih tinggi dibanding Cat5e.", answer: "Salah" }
  ], p: "Ketiganya salah: A adalah Crimping Tool, B adalah EMI, C adalah Cat6." },
  // 38: S, B, S
  { n: 38, sts: [
    { id: "A", text: "STP paling tepat dijelaskan sebagai susunan warna terminasi dengan pasangan oranye pada pin 1-2 dan pasangan hijau pada pin 3-6.", answer: "Salah" },
    { id: "B", text: "Cable Tester paling tepat dijelaskan sebagai alat yang memeriksa kontinuitas, urutan pin, putus, short, atau salah pasangan pada kabel.", answer: "Benar" },
    { id: "C", text: "Attenuation paling tepat dijelaskan sebagai kabel pasangan terpilin dengan pelindung untuk membantu mengurangi interferensi jika instalasi dan grounding benar.", answer: "Salah" }
  ], p: "A salah (itu T568B), B benar, C salah (itu STP)." },
  // 39: B, S, B
  { n: 39, sts: [
    { id: "A", text: "UTP paling tepat dijelaskan sebagai kabel pasangan terpilin tanpa pelindung tambahan yang umum digunakan pada Ethernet dalam gedung.", answer: "Benar" },
    { id: "B", text: "UTP paling tepat dijelaskan sebagai susunan warna terminasi dengan pasangan hijau pada pin 1-2 dan pasangan oranye pada pin 3-6.", answer: "Salah" },
    { id: "C", text: "Batas Kanal 100 Meter paling tepat dijelaskan sebagai batas umum kanal Ethernet tembaga yang terdiri dari permanent link dan patch cord sesuai standar.", answer: "Benar" }
  ], p: "A benar, B salah (itu T568A), C benar." },
  // 40: B, B, S
  { n: 40, sts: [
    { id: "A", text: "RJ45 paling tepat dijelaskan sebagai sebutan umum konektor modular delapan posisi yang digunakan pada kabel Ethernet tembaga.", answer: "Benar" },
    { id: "B", text: "Crossover paling tepat dijelaskan sebagai kabel yang kedua ujungnya menggunakan T568A dan T568B sehingga pasangan kirim-terima bersilang.", answer: "Benar" },
    { id: "C", text: "T568B paling tepat dijelaskan sebagai penurunan kekuatan sinyal sepanjang media transmisi.", answer: "Salah" }
  ], p: "A benar, B benar, C salah (itu Attenuation)." }
];

const m5_mcma_raw = [
  { n: 41, c: "Terminasi RJ45 yang baik mencakup ... (Jawaban benar lebih dari satu)", opts: ["Mengikuti T568A atau T568B secara konsisten", "Mempertahankan puntiran dekat konektor", "Memastikan jaket terkunci dan semua pin masuk", "Mengacak warna selama lampu menyala", "Membuka puntiran sepanjang 10 cm"], p: "Terminasi RJ45 berkualitas: ikuti standar pinout konsisten, pertahankan puntiran sedekat mungkin ke pin (<13 mm), dan kencangkan outer jacket." },
  { n: 42, c: "Instalasi kabel tembaga perlu ... (Jawaban benar lebih dari satu)", opts: ["Menjaga jarak dari sumber EMI", "Memenuhi batas panjang kanal", "Memberi label dan dokumentasi", "Mengikat sangat kuat sampai kabel gepeng", "Menarik melalui sudut tajam"], p: "Instalasi kabel LAN: jauhkan dari kabel tegangan tinggi/motor, patuhi panjang maks 100m, dan pasang nomor label kabel di kedua ujung." },
  { n: 43, c: "Cable tester sederhana dapat mendeteksi ... (Jawaban benar lebih dari satu)", opts: ["Open/putus", "Short", "Miswire", "Daya optik dBm", "Lokasi gangguan fiber kilometer"], p: "LAN Cable Tester memverifikasi kontinuitas kawat tembaga: kabel putus (open), korslet (short), dan kekeliruan urutan warna (miswire/reversed)." },
  { n: 44, c: "STP efektif ketika ... (Jawaban benar lebih dari satu)", opts: ["Kabel dan konektor mendukung shielding", "Grounding dilakukan sesuai desain", "Lingkungan mempunyai EMI yang perlu dikendalikan", "Shield dipotong acak", "Digunakan tanpa memperhatikan standar"], p: "STP efektif meredam noise jika memakai konektor shielded berpelindung logam dan terhubung ke sistem grounding pembuangan muatan yang baik." },
  { n: 45, c: "Topologi star memiliki karakteristik ... (Jawaban benar lebih dari satu)", opts: ["Mudah dikelola", "Gangguan kabel biasanya terbatas pada satu node", "Perangkat pusat menjadi titik penting", "Tidak membutuhkan perangkat pusat", "Semua node berbagi satu backbone pasif"], p: "Karakteristik Topologi Star: mudah dimonitor, isolasi kerusakan perkabelan per workstation, namun switch sentral menjadi single point of failure." },
  { n: 46, c: "Topologi mesh cocok ketika ... (Jawaban benar lebih dari satu)", opts: ["Redundansi tinggi diperlukan", "Banyak jalur alternatif diinginkan", "Biaya dan kompleksitas dapat diterima", "Anggaran sangat terbatas dan hanya dua kabel tersedia", "Pemeliharaan harus paling sederhana tanpa dokumentasi"], p: "Topologi Mesh dirancang untuk sistem mission-critical dengan redundansi penuh dan rute failover otomatis meskipun biaya infrastrukturnya tinggi." },
  { n: 47, c: "Penyebab crosstalk meningkat antara lain ... (Jawaban benar lebih dari satu)", opts: ["Puntiran dibuka terlalu panjang", "Kualitas terminasi buruk", "Kabel tertekan atau rusak", "Panjang gelombang 1550 nm", "Konektor fiber kotor"], p: "Crosstalk timbul karena lilitan pasangan kawat terurai terlalu panjang, terminasi konektor cacat, atau fisik kabel terjepit/rusak." },
  { n: 48, c: "Setelah pengujian kabel gagal, tindakan tepat adalah ... (Jawaban benar lebih dari satu)", opts: ["Membaca pola kesalahan", "Memeriksa kedua terminasi", "Memperbaiki lalu menguji ulang", "Mengubah IP agar tester pass", "Mencatat pass tanpa perbaikan"], p: "SOP kegagalan uji kabel: analisa LED pola pin error, cek crimping kedua ujung konektor, re-terminasi kabel lalu uji ulang dengan tester." },
  { n: 49, c: "Pemilihan kategori kabel mempertimbangkan ... (Jawaban benar lebih dari satu)", opts: ["Kecepatan dan standar perangkat", "Lingkungan serta panjang jalur", "Kompatibilitas konektor/patch panel", "Warna favorit", "Nama pengguna"], p: "Pertimbangan pemilihan kabel LAN: bandwidth target (1 Gbps vs 10 Gbps), panjang bentangan, ada tidaknya induksi EMI, dan standar patch panel." },
  { n: 50, c: "Desain jalur di atas 100 meter dapat diperbaiki dengan ... (Jawaban benar lebih dari satu)", opts: ["Menambah perangkat aktif pada lokasi yang tepat", "Menggunakan fiber untuk jarak jauh", "Mendesain ulang distribusi", "Menambah konektor pasif berulang", "Mengabaikan attenuation"], p: "Mengatasi jarak >100m: pasang switch/repeater aktif perantara, ubah backbone ke kabel fiber optik, atau posisikan ulang ruang distribusi MDF/IDF." }
];

const m5_full = [];
m5_raw_pg.forEach(item => {
  m5_full.push({
    num: item.n,
    kompetensi: item.k,
    subKompetensi: item.s,
    kasus: item.c,
    options: item.opts,
    kunci: item.ku,
    correctIndex: item.ci,
    pembahasan: item.p
  });
});
m5_kategori_keys.forEach(item => {
  m5_full.push({
    num: item.n,
    kompetensi: kompM5,
    subKompetensi: subM5,
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: item.sts,
    pembahasan: item.p
  });
});
m5_mcma_raw.forEach(item => {
  m5_full.push({
    num: item.n,
    kompetensi: kompM5,
    subKompetensi: subM5,
    kasus: item.c,
    options: item.opts,
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: item.p
  });
});

writeTsFile(5, transformWeekData(m5_full, 5));

// ====================================================
// MINGGU 6: Fiber Optik & FTTH
// ====================================================
const kompM6 = "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi";
const subM6 = "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi";
const kompUkur = "Menentukan, menerapkan, dan menganalisis prosedur penggunaan berbagai jenis alat ukur jaringan untuk menghasilkan data pengujian dan pengukuran infrastruktur telekomunikasi yang valid serta akurat sesuai dengan standar operasional prosedur (SOP) industri.";
const subUkur = "Jenis, Fungsi, serta Prosedur operasional dan analisis kerja alat ukur jaringan";

const m6_raw_pg = [
  { n: 1, k: kompM6, s: subM6, c: "serat dengan inti sangat kecil untuk transmisi jarak jauh dan bandwidth tinggi menggunakan satu mode dominan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Patch Cord Fiber", "Drop Cable", "Single-mode Fiber", "Optical Power Meter", "ONT/ONU"], ku: "C", ci: 2, p: "Single-mode Fiber (SMF) memiliki diameter core sekitar 9 mikron, menghantarkan satu mode cahaya laser untuk jarak puluhan kilometer tanpa dispersi modal." },
  { n: 2, k: kompM6, s: subM6, c: "serat dengan inti lebih besar yang membawa banyak mode cahaya dan umum digunakan pada jarak lebih pendek. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["ONT/ONU", "Multimode Fiber", "Cladding", "VFL", "Fiber Cleaver"], ku: "B", ci: 1, p: "Multimode Fiber (MMF) memiliki diameter core 50 atau 62,5 mikron, memanfaatkan sumber LED/VCSEL untuk koneksi jarak pendek (kampus/data center)." },
  { n: 3, k: kompM6, s: subM6, c: "bagian pusat serat tempat cahaya merambat. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Optical Light Source", "Closure", "Core", "Fiber Cleaver", "OTDR"], ku: "C", ci: 2, p: "Core adalah bagian inti kaca silika paling dalam berindeks bias tinggi tempat berkas cahaya dipandu merambat." },
  { n: 4, k: kompM6, s: subM6, c: "lapisan dengan indeks bias lebih rendah yang membantu menjaga cahaya tetap berada dalam core. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Optical Splitter", "OLT", "Drop Cable", "Cladding", "OTDR"], ku: "D", ci: 3, p: "Cladding membungkus core dengan indeks bias lebih rendah, menciptakan fenomena Total Internal Reflection (pemantulan internal sempurna)." },
  { n: 5, k: kompM6, s: subM6, c: "perangkat di sisi penyedia yang mengirim dan menerima sinyal optik serta mengelola pelanggan pada jaringan PON. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["ONT/ONU", "Optical Splitter", "ODC", "ODP", "OLT"], ku: "E", ci: 4, p: "OLT (Optical Line Terminal) ditempatkan di Sentral Telepon/CO untuk mengendalikan transmisi downstream dan upstream ke ratusan ONT pelanggan." },
  { n: 6, k: kompM6, s: subM6, c: "kabinet distribusi optik yang menjadi titik pengelolaan, penyambungan, atau pembagian kabel feeder dan distribusi. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["ODP", "Optical Splitter", "OLT", "ONT/ONU", "ODC"], ku: "E", ci: 4, p: "ODC (Optical Distribution Cabinet) adalah rak outdoor perantara yang membagi kabel feeder dari OLT ke kabel distribusi menggunakan splitter pasif tahap pertama." },
  { n: 7, k: kompM6, s: subM6, c: "titik distribusi dekat pelanggan yang menghubungkan kabel distribusi ke drop cable pelanggan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["ODP", "ONT/ONU", "Optical Splitter", "OLT", "ODC"], ku: "A", ci: 0, p: "ODP (Optical Distribution Point) dipasang di tiang atau dinding dekat perumahan untuk membagikan sinyal optik ke kabel drop wire menuju rumah pelanggan." },
  { n: 8, k: kompM6, s: subM6, c: "perangkat di sisi pelanggan yang mengubah sinyal optik menjadi layanan data atau antarmuka pengguna. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["ONT/ONU", "ODP", "OLT", "Optical Splitter", "ODC"], ku: "A", ci: 0, p: "ONT (Optical Network Terminal) atau ONU berada di rumah pelanggan untuk mengonversi sinyal foton optik ke port Ethernet RJ45 dan Wi-Fi." },
  { n: 9, k: kompM6, s: subM6, c: "komponen pasif yang membagi satu sinyal optik menjadi beberapa jalur dengan loss tertentu. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["OLT", "Optical Splitter", "ODP", "ONT/ONU", "ODC"], ku: "B", ci: 1, p: "Optical Splitter (PLC Splitter) membagi daya optik dari 1 serat menjadi 2, 4, 8, 16, atau 32 keluaran dengan redaman proporsional (misal 1:8 redaman ~10.5 dB)." },
  { n: 10, k: kompM6, s: subM6, c: "potongan serat pendek dengan konektor pada satu ujung dan ujung lain untuk disambung melalui splicing. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Closure", "Pigtail", "ODP", "Multimode Fiber", "Patch Cord Fiber"], ku: "B", ci: 1, p: "Pigtail memiliki satu ujung terkonektor fabrikasi dan ujung kabel terbuka tanpa konektor yang siap disambung las menggunakan fusion splicer." },
  { n: 11, k: kompM6, s: subM6, c: "kabel fiber dengan konektor pada kedua ujung untuk menghubungkan port atau panel. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Patch Cord Fiber", "OTDR", "ONT/ONU", "Optical Splitter", "Optical Light Source"], ku: "A", ci: 0, p: "Patch Cord Fiber Optik memiliki konektor di kedua ujungnya (misal SC-UPC ke SC-APC) untuk jumper antar adapter OTB, switch SFP, atau ONT." },
  { n: 12, k: kompM6, s: subM6, c: "pelindung sambungan fiber dari kelembapan, debu, tarikan, dan kondisi lingkungan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Optical Splitter", "Drop Cable", "Closure", "Fiber Cleaver", "Optical Light Source"], ku: "C", ci: 2, p: "Joint Closure adalah selongsong tabung kedap air dan udara yang melindungi tray hasil splicing kabel optik di tiang atau manhole tanah." },
  { n: 13, k: kompM6, s: subM6, c: "kabel dari titik distribusi menuju lokasi pelanggan pada jaringan akses. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Patch Cord Fiber", "ONT/ONU", "Drop Cable", "Closure", "Optical Light Source"], ku: "C", ci: 2, p: "Drop Cable (drop core) membawa 1-2 core serat optik berpelindung kawat baja gantung (messenger wire) dari ODP menuju roset rumah pelanggan." },
  { n: 14, k: kompM6, s: subM6, c: "alat yang menyelaraskan dan menyatukan dua ujung serat menggunakan pelelehan terkontrol. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Optical Power Meter", "Fusion Splicer", "Fiber Cleaver", "Optical Light Source", "VFL"], ku: "B", ci: 1, p: "Fusion Splicer menyejajarkan inti core secara mikro menggunakan kamera visual dan meleburkan kaca dengan loncatan busur listrik elektroda." },
  { n: 15, k: kompM6, s: subM6, c: "alat pemotong presisi untuk menghasilkan ujung serat rata sebelum fusion splicing. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["VFL", "Optical Power Meter", "Fiber Cleaver", "Optical Light Source", "Fusion Splicer"], ku: "C", ci: 2, p: "Fiber Cleaver memiliki pisau intan presisi tinggi untuk mematahkan serat kaca sehingga menghasilkan potongan tegak lurus sempurna (<1 derajat)." },
  { n: 16, k: kompUkur, s: subUkur, c: "sumber cahaya tampak untuk membantu menemukan putus, kebocoran, atau jalur serat pada jarak terbatas. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["VFL", "Fiber Cleaver", "Optical Light Source", "Optical Power Meter", "Fusion Splicer"], ku: "A", ci: 0, p: "VFL (Visual Fault Locator) memancarkan sinar laser merah tampak (panjang gelombang ~650 nm) untuk menemukan kabel optik bengkok patah atau tertukar core." },
  { n: 17, k: kompUkur, s: subUkur, c: "alat yang mengukur daya optik yang diterima pada panjang gelombang tertentu. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["OTDR", "Optical Power Meter", "Fiber Cleaver", "Fusion Splicer", "VFL"], ku: "B", ci: 1, p: "OPM (Optical Power Meter) membaca besaran daya optik yang masuk dalam satuan dBm atau mengukur rugi redaman (loss) dalam dB." },
  { n: 18, k: kompUkur, s: subUkur, c: "sumber cahaya stabil pada panjang gelombang tertentu untuk pengukuran loss bersama power meter. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Optical Power Meter", "Optical Light Source", "Fusion Splicer", "OTDR", "Fiber Cleaver"], ku: "B", ci: 1, p: "OLS (Optical Light Source) menghasilkan sumber laser stabil pada gelombang standar (1310/1490/1550 nm) yang dipasangkan dengan OPM untuk uji redaman total." },
  { n: 19, k: kompUkur, s: subUkur, c: "alat yang menganalisis pantulan sepanjang serat untuk memperkirakan jarak, loss, sambungan, dan lokasi gangguan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["OTDR", "Optical Light Source", "VFL", "Fiber Cleaver", "Optical Power Meter"], ku: "A", ci: 0, p: "OTDR (Optical Time Domain Reflectometer) memancarkan pulsa cahaya laser dan menganalisis pantulan Rayleigh & Fresnel untuk memetakan jejak serat." },
  { n: 20, k: kompM6, s: subM6, c: "perhitungan total daya pancar, sensitivitas penerima, loss kabel, sambungan, konektor, splitter, dan margin. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Core", "ONT/ONU", "Drop Cable", "Closure", "Link Budget"], ku: "E", ci: 4, p: "Link Budget menghitung neraca daya total (TX power - Loss total - Safety margin >= RX sensitivity) untuk memastikan sinyal sampai di penerima dengan andal." },
  { n: 21, k: kompM6, s: subM6, c: "Jaringan FTTH dari ODP ke rumah pelanggan menggunakan ...", opts: ["USB cable", "Crossover Cat5e", "Drop cable fiber yang sesuai untuk lingkungan instalasi", "Kabel audio", "Kabel UTP indoor"], ku: "C", ci: 2, p: "Segmen akses terakhir dari ODP tiang ke rumah pelanggan menggunakan drop cable optik (drop wire) dengan kawat penggantung penahan beban." },
  { n: 22, k: kompM6, s: subM6, c: "Komponen yang membagi satu sinyal optik menjadi beberapa keluaran adalah ...", opts: ["Crimping tool", "Optical Splitter", "VFL", "Fusion splicer", "NIC"], ku: "B", ci: 1, p: "Optical Splitter adalah komponen pasif yang mendistribusikan sinyal optik menjadi beberapa cabang tanpa memerlukan suplai catu daya listrik." },
  { n: 23, k: kompM6, s: subM6, c: "Perangkat pelanggan yang mengubah sinyal optik menjadi antarmuka data adalah ...", opts: ["Cleaver", "ODC", "ONT/ONU", "OTDR", "OLT"], ku: "C", ci: 2, p: "ONT/ONU (Optical Network Terminal) menerima sinyal optik dari kabel drop dan mengubahnya menjadi antarmuka tembaga Ethernet atau nirkabel." },
  { n: 24, k: kompM6, s: subM6, c: "Ujung serat harus dipotong rata sebelum fusion splicing menggunakan ...", opts: ["Fiber Cleaver", "Multimeter", "Tone probe", "Cable tester", "Access point"], ku: "A", ci: 0, p: "Pemotongan sudut kaca serat optik secara presisi wajib memakai Fiber Cleaver agar kedua ujung serat dapat menyatu sempurna saat disambung fusion." },
  { n: 25, k: kompM6, s: subM6, c: "Hasil sambungan fusion mempunyai estimasi loss tinggi. Langkah yang tepat adalah ...", opts: ["Mengabaikan angka", "Memeriksa cleave, kebersihan, alignment, dan mengulang splice bila perlu", "Menggunakan RJ45", "Menyentuh core", "Menambah panjang kabel tanpa uji"], ku: "B", ci: 1, p: "Jika perkiraan loss sambungan buruk (>0.05 dB), bersihkan ulang serat dengan alkohol, potong ulang dengan cleaver, dan lakukan penyambungan ulang." },
  { n: 26, k: kompM6, s: subM6, c: "Kabel fiber ditekuk sangat tajam. Dampak yang mungkin terjadi adalah ...", opts: ["CPU panas", "Loss meningkat akibat macrobend atau kerusakan serat", "DNS gagal selalu", "Sinyal listrik bertambah", "VLAN berubah"], ku: "B", ci: 1, p: "Menekuk kabel fiber melebihi batas kelengkungan (bending radius) menyebabkan macrobending loss (cahaya bocor keluar core) atau bahkan retak/putus permanen." },
  { n: 27, k: kompUkur, s: subUkur, c: "Alat untuk mengukur daya optik di titik penerima adalah ...", opts: ["Crimping tool", "VFL", "OTDR", "Cleaver", "Optical Power Meter"], ku: "E", ci: 4, p: "Optical Power Meter (OPM) adalah instrumen pengukur daya sinyal optik aktual yang diterima pada konektor fiber pelanggan." },
  { n: 28, k: kompUkur, s: subUkur, c: "Alat untuk memperkirakan lokasi putus beberapa kilometer dari titik ukur adalah ...", opts: ["ESD strap", "RJ45 tester", "Access point", "OTDR", "OPM saja"], ku: "D", ci: 3, p: "OTDR mengukur jarak kilometer dan lokasi titik putus serat optik secara akurat melalui jejak gelombang pantulan backscatter." },
  { n: 29, k: kompUkur, s: subUkur, c: "Konektor terlihat bersih oleh mata tetapi hasil loss tidak stabil. Tindakan tepat adalah ...", opts: ["Inspect-clean-inspect dengan alat dan bahan pembersih yang sesuai", "Menggosok dengan kain pakaian", "Menambah splitter", "Meniup konektor dengan mulut", "Mengabaikan"], ku: "A", ci: 0, p: "Partikel debu mikro tidak terlihat mata biasa. Gunakan mikroskop fiber inspection probe, bersihkan dengan one-click cleaner / wipes alkohol IPA, lalu periksa ulang." },
  { n: 30, k: kompM6, s: subM6, c: "Link budget harus memasukkan ...", opts: ["Warna jaket saja", "Loss fiber, splice, konektor, splitter, dan margin", "Nama pelanggan saja", "Jumlah akun email", "Ukuran monitor"], ku: "B", ci: 1, p: "Parameter link budget mencakup: redaman kabel per km, rugi sambungan splice, rugi konektor adapter, redaman splitter pasif, dan safety margin cadangan." }
];

const m6_kategori_keys = [
  // 31: B, B, B
  { n: 31, sts: [
    { id: "A", text: "Cladding paling tepat dijelaskan sebagai lapisan dengan indeks bias lebih rendah yang membantu menjaga cahaya tetap berada dalam core.", answer: "Benar" },
    { id: "B", text: "ODC paling tepat dijelaskan sebagai kabinet distribusi optik yang menjadi titik pengelolaan, penyambungan, atau pembagian kabel feeder dan distribusi.", answer: "Benar" },
    { id: "C", text: "ONT/ONU paling tepat dijelaskan sebagai perangkat di sisi pelanggan yang mengubah sinyal optik menjadi layanan data atau antarmuka pengguna.", answer: "Benar" }
  ], p: "Semua pernyataan benar mendefinisikan Cladding, ODC, dan ONT/ONU." },
  // 32: S, S, S
  { n: 32, sts: [
    { id: "A", text: "ONT/ONU paling tepat dijelaskan sebagai kabel dari titik distribusi menuju lokasi pelanggan pada jaringan akses.", answer: "Salah" },
    { id: "B", text: "Single-mode Fiber paling tepat dijelaskan sebagai kabinet distribusi optik yang menjadi titik pengelolaan, penyambungan, atau pembagian kabel feeder dan distribusi.", answer: "Salah" },
    { id: "C", text: "Patch Cord Fiber paling tepat dijelaskan sebagai serat dengan inti sangat kecil untuk transmisi jarak jauh dan bandwidth tinggi menggunakan satu mode dominan.", answer: "Salah" }
  ], p: "Ketiganya salah: A adalah Drop Cable, B adalah ODC, C adalah Single-mode Fiber." },
  // 33: B, B, B
  { n: 33, sts: [
    { id: "A", text: "OLT paling tepat dijelaskan sebagai perangkat di sisi penyedia yang mengirim dan menerima sinyal optik serta mengelola pelanggan pada jaringan PON.", answer: "Benar" },
    { id: "B", text: "Fiber Cleaver paling tepat dijelaskan sebagai alat pemotong presisi untuk menghasilkan ujung serat rata sebelum fusion splicing.", answer: "Benar" },
    { id: "C", text: "Multimode Fiber paling tepat dijelaskan sebagai serat dengan inti lebih besar yang membawa banyak mode cahaya dan umum digunakan pada jarak lebih pendek.", answer: "Benar" }
  ], p: "Semua pernyataan benar mendefinisikan OLT, Cleaver, dan Multimode Fiber." },
  // 34: B, S, S
  { n: 34, sts: [
    { id: "A", text: "Pigtail paling tepat dijelaskan sebagai potongan serat pendek dengan konektor pada satu ujung dan ujung lain untuk disambung melalui splicing.", answer: "Benar" },
    { id: "B", text: "Multimode Fiber paling tepat dijelaskan sebagai titik distribusi dekat pelanggan yang menghubungkan kabel distribusi ke drop cable pelanggan.", answer: "Salah" },
    { id: "C", text: "Pigtail paling tepat dijelaskan sebagai alat pemotong presisi untuk menghasilkan ujung serat rata sebelum fusion splicing.", answer: "Salah" }
  ], p: "A benar, B salah (itu ODP), C salah (itu Cleaver)." },
  // 35: S, B, S
  { n: 35, sts: [
    { id: "A", text: "Optical Splitter paling tepat dijelaskan sebagai alat yang menyelaraskan dan menyatukan dua ujung serat menggunakan pelelehan terkontrol.", answer: "Salah" },
    { id: "B", text: "Drop Cable paling tepat dijelaskan sebagai kabel dari titik distribusi menuju lokasi pelanggan pada jaringan akses.", answer: "Benar" },
    { id: "C", text: "Core paling tepat dijelaskan sebagai perangkat di sisi pelanggan yang mengubah sinyal optik menjadi layanan data atau antarmuka pengguna.", answer: "Salah" }
  ], p: "A salah (itu Fusion Splicer), B benar, C salah (itu ONT/ONU)." },
  // 36: B, B, S
  { n: 36, sts: [
    { id: "A", text: "Fusion Splicer paling tepat dijelaskan sebagai alat yang menyelaraskan dan menyatukan dua ujung serat menggunakan pelelehan terkontrol.", answer: "Benar" },
    { id: "B", text: "Closure paling tepat dijelaskan sebagai pelindung sambungan fiber dari kelembapan, debu, tarikan, dan kondisi lingkungan.", answer: "Benar" },
    { id: "C", text: "Fiber Cleaver paling tepat dijelaskan sebagai perangkat di sisi penyedia yang mengirim dan menerima sinyal optik serta mengelola pelanggan pada jaringan PON.", answer: "Salah" }
  ], p: "A benar, B benar, C salah (itu OLT)." },
  // 37: S, B, S
  { n: 37, sts: [
    { id: "A", text: "OLT paling tepat dijelaskan sebagai potongan serat pendek dengan konektor pada satu ujung dan ujung lain untuk disambung melalui splicing.", answer: "Salah" },
    { id: "B", text: "Patch Cord Fiber paling tepat dijelaskan sebagai kabel fiber dengan konektor pada kedua ujung untuk menghubungkan port atau panel.", answer: "Benar" },
    { id: "C", text: "Cladding paling tepat dijelaskan sebagai komponen pasif yang membagi satu sinyal optik menjadi beberapa jalur dengan loss tertentu.", answer: "Salah" }
  ], p: "A salah (itu Pigtail), B benar, C salah (itu Splitter)." },
  // 38: S, S, B
  { n: 38, sts: [
    { id: "A", text: "ODP paling tepat dijelaskan sebagai pelindung sambungan fiber dari kelembapan, debu, tarikan, dan kondisi lingkungan.", answer: "Salah" },
    { id: "B", text: "Closure paling tepat dijelaskan sebagai serat dengan inti lebih besar yang membawa banyak mode cahaya dan umum digunakan pada jarak lebih pendek.", answer: "Salah" },
    { id: "C", text: "Optical Splitter paling tepat dijelaskan sebagai komponen pasif yang membagi satu sinyal optik menjadi beberapa jalur dengan loss tertentu.", answer: "Benar" }
  ], p: "A salah (itu Closure), B salah (itu Multimode Fiber), C benar." },
  // 39: B, S, B
  { n: 39, sts: [
    { id: "A", text: "Core paling tepat dijelaskan sebagai bagian pusat serat tempat cahaya merambat.", answer: "Benar" },
    { id: "B", text: "Fusion Splicer paling tepat dijelaskan sebagai lapisan dengan indeks bias lebih rendah yang membantu menjaga cahaya tetap berada dalam core.", answer: "Salah" },
    { id: "C", text: "ODP paling tepat dijelaskan sebagai titik distribusi dekat pelanggan yang menghubungkan kabel distribusi ke drop cable pelanggan.", answer: "Benar" }
  ], p: "A benar, B salah (itu Cladding), C benar (ODP)." },
  // 40: B, S, S
  { n: 40, sts: [
    { id: "A", text: "Single-mode Fiber paling tepat dijelaskan sebagai serat dengan inti sangat kecil untuk transmisi jarak jauh dan bandwidth tinggi menggunakan satu mode dominan.", answer: "Benar" },
    { id: "B", text: "Drop Cable paling tepat dijelaskan sebagai bagian pusat serat tempat cahaya merambat.", answer: "Salah" },
    { id: "C", text: "ODC paling tepat dijelaskan sebagai kabel fiber dengan konektor pada kedua ujung untuk menghubungkan port atau panel.", answer: "Salah" }
  ], p: "A benar, B salah (itu Core), C salah (itu Patch Cord)." }
];

const m6_mcma_raw = [
  { n: 41, c: "Instalasi FTTH udara yang aman menggunakan ... (Jawaban benar lebih dari satu)", opts: ["Drop cable outdoor sesuai standar", "APD pekerjaan ketinggian", "Pengendalian bending radius dan tarikan", "Kabel indoor tanpa perlindungan", "Menarik kabel pada angin kencang tanpa evaluasi"], p: "Instalasi FTTH udara (aerial): kabel drop outdoor berkawat penguat, APD climbing helm/harness, serta perhatikan batas lekukan & tension." },
  { n: 42, c: "Prosedur fusion splicing mencakup ... (Jawaban benar lebih dari satu)", opts: ["Strip dan cleaning serat", "Cleaving presisi", "Splice, sleeve, dan penataan tray", "Menyentuh ujung serat", "Mengikat serat dengan simpul"], p: "Langkah penyambungan serat optik: kupas coating luar, bersihkan dengan alkohol 95%+, potong dengan cleaver, las fusion, dan pasang protection sleeve ke tray kaset." },
  { n: 43, c: "Pengukuran OPM dan light source valid memerlukan ... (Jawaban benar lebih dari satu)", opts: ["Panjang gelombang sama", "Reference/zero yang benar", "Konektor bersih dan koneksi stabil", "Mengabaikan kalibrasi", "Memilih angka secara acak"], p: "Uji redaman OLS + OPM valid jika: wavelength disamakan (misal 1310nm), setting reference/zeroing sebelum ukur, dan konektor optik higienis." },
  { n: 44, c: "OTDR dapat membantu menganalisis ... (Jawaban benar lebih dari satu)", opts: ["Jarak event", "Loss sambungan atau konektor", "Lokasi putus atau refleksi", "Urutan warna RJ45", "Tegangan adaptor"], p: "OTDR mendeteksi jarak link, loss sambungan fusion (dB), loss konektor, dan titik patahan kabel serat optik." },
  { n: 45, c: "Link budget memasukkan ... (Jawaban benar lebih dari satu)", opts: ["Loss kabel sesuai panjang", "Loss splice dan konektor", "Loss splitter serta margin", "Warna ODP", "Nama SSID"], p: "Komponen perhitungan Link Budget: redaman kabel per kilometer (alfa x L), jumlah sambungan las, jumlah konektor, redaman splitter cabang, dan margin keselamatan." },
  { n: 46, c: "Kebersihan konektor dijaga dengan ... (Jawaban benar lebih dari satu)", opts: ["Inspect-clean-inspect", "Dust cap bersih", "Alat pembersih sesuai", "Meniup dengan mulut", "Menyentuh ferrule"], p: "Standar industri kebersihan konektor serat optik: prosedur Inspect-Clean-Inspect, penutup dust cap bersih, dan pembersih khusus (cassette cleaner)." },
  { n: 47, c: "Arsitektur FTTH umumnya melibatkan ... (Jawaban benar lebih dari satu)", opts: ["OLT", "ODC/ODP dan splitter", "ONT/ONU pelanggan", "Hub Ethernet sebagai pengganti seluruh PON", "Crimping RJ45 untuk menyambung core fiber"], p: "Komponen utama FTTH GPON: OLT di Central Office, ODC/ODP dan splitter pasif di jaringan distribusi, serta ONT/ONU di sisi pelanggan." },
  { n: 48, c: "Penyimpanan patch cord fiber yang baik adalah ... (Jawaban benar lebih dari satu)", opts: ["Menggunakan dust cap", "Menggulung dengan radius aman", "Menyimpan bersih dan kering", "Melipat tajam", "Meletakkan di bawah alat berat"], p: "Penyimpanan patch cord optik: pasang selalu dust cap penutup ferrule, gulung dengan diameter aman (>60mm), dan simpan di wadah kering." },
  { n: 49, c: "Loss tidak stabil dapat disebabkan ... (Jawaban benar lebih dari satu)", opts: ["Konektor kotor", "Koneksi longgar", "Panjang gelombang atau referensi salah", "Label kabel rapi", "Dokumentasi lengkap"], p: "Penyebab pembacaan redaman optik fluktuatif/tidak stabil: ferrule konektor berdebu/berminyak, adapter longgar, atau mismatch panjang gelombang ukur." },
  { n: 50, c: "Keselamatan fiber mencakup ... (Jawaban benar lebih dari satu)", opts: ["Kacamata pelindung", "Wadah serpihan", "Larangan makan/minum di area kerja", "Mengecek cahaya dengan mata langsung", "Membuang serpihan sembarangan"], p: "Aturan keselamatan kerja fiber optik: pakai safety glasses, wadah limbah tertutup untuk pecahan kaca, dan larangan keras menatap langsung ujung konektor laser." }
];

const m6_full = [];
m6_raw_pg.forEach(item => {
  m6_full.push({
    num: item.n,
    kompetensi: item.k,
    subKompetensi: item.s,
    kasus: item.c,
    options: item.opts,
    kunci: item.ku,
    correctIndex: item.ci,
    pembahasan: item.p
  });
});
m6_kategori_keys.forEach(item => {
  m6_full.push({
    num: item.n,
    kompetensi: kompM6,
    subKompetensi: subM6,
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: item.sts,
    pembahasan: item.p
  });
});
m6_mcma_raw.forEach(item => {
  m6_full.push({
    num: item.n,
    kompetensi: kompM6,
    subKompetensi: subM6,
    kasus: item.c,
    options: item.opts,
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: item.p
  });
});

writeTsFile(6, transformWeekData(m6_full, 6));

// ====================================================
// MINGGU 7: Model OSI, TCP/IP, IP, WLAN & Security
// ====================================================
const kompM7 = "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan";
const subM7 = "Prinsip dasar OSI dan TCP/IP";

const m7_raw_pg = [
  { n: 1, c: "lapisan OSI yang menangani sinyal, konektor, media, bit, dan karakteristik fisik transmisi. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Application Layer", "Network Layer", "Session Layer", "Presentation Layer", "Physical Layer"], ku: "E", ci: 4, p: "Physical Layer (Layer 1) memproses transmisi bit biner mentah melalui sinyal tegangan listrik, pulsa cahaya, atau gelombang radio." },
  { n: 2, c: "lapisan yang menangani frame, alamat MAC, akses media, dan switching lokal. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Session Layer", "Transport Layer", "Physical Layer", "Network Layer", "Data Link Layer"], ku: "E", ci: 4, p: "Data Link Layer (Layer 2) mengemas bit menjadi frame, menyematkan physical MAC address, dan mengatur kontrol akses media (CSMA/CD / CSMA/CA)." },
  { n: 3, c: "lapisan yang menangani alamat logis dan routing paket antarjaringan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Presentation Layer", "Session Layer", "Transport Layer", "Data Link Layer", "Network Layer"], ku: "E", ci: 4, p: "Network Layer (Layer 3) bertanggung jawab atas pengalamatan logis (IP address) dan penentuan rute terbaik (routing) paket lintas jaringan." },
  { n: 4, c: "lapisan yang menyediakan komunikasi ujung-ke-ujung, segmentasi, kontrol aliran, dan reliabilitas. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Transport Layer", "Network Layer", "Session Layer", "Physical Layer", "Application Layer"], ku: "A", ci: 0, p: "Transport Layer (Layer 4) mengelola segmentasi data, port numbering, kontrol aliran data (flow control), dan reliabilitas end-to-end (TCP/UDP)." },
  { n: 5, c: "lapisan yang mengelola pembentukan, pemeliharaan, dan penghentian sesi komunikasi. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Session Layer", "Application Layer", "Data Link Layer", "Network Layer", "Physical Layer"], ku: "A", ci: 0, p: "Session Layer (Layer 5) mengatur dialog antar-aplikasi, sinkronisasi transmisi, dan pemeliharaan koneksi sesi komunikasi." },
  { n: 6, c: "lapisan yang menangani format data, enkripsi, kompresi, dan representasi. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Transport Layer", "Data Link Layer", "Presentation Layer", "Session Layer", "Application Layer"], ku: "C", ci: 2, p: "Presentation Layer (Layer 6) melakukan translasi format (ASCII, JPEG), kompresi data, dan enkripsi/dekripsi keamanan (TLS/SSL)." },
  { n: 7, c: "lapisan terdekat dengan aplikasi pengguna dan menyediakan layanan jaringan tingkat aplikasi. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Physical Layer", "Application Layer", "Transport Layer", "Data Link Layer", "Network Layer"], ku: "B", ci: 1, p: "Application Layer (Layer 7) berinteraksi langsung dengan software pengguna melalui protokol aplikasi seperti HTTP, DNS, DHCP, dan SMTP." },
  { n: 8, c: "protokol transport berorientasi koneksi yang menyediakan urutan, pengakuan, dan pengiriman ulang. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Presentation Layer", "Transport Layer", "DNS", "HTTPS", "TCP"], ku: "E", ci: 4, p: "TCP (Transmission Control Protocol) bersifat connection-oriented dengan 3-way handshake, nomor urut segment, ACK konfirmasi, dan retransmisi paket hilang." },
  { n: 9, c: "protokol transport tanpa koneksi dengan overhead rendah dan tanpa jaminan pengiriman bawaan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Network Layer", "UDP", "HTTP", "Default Gateway", "Transport Layer"], ku: "B", ci: 1, p: "UDP (User Datagram Protocol) bersifat connectionless dengan header minimal (8 byte) tanpa ACK sehingga sangat cepat untuk VoIP dan streaming." },
  { n: 10, c: "protokol internet dengan alamat 32-bit yang umum ditulis dalam empat oktet desimal. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["IPv4", "Firewall", "Default Gateway", "Application Layer", "UDP"], ku: "A", ci: 0, p: "IPv4 menggunakan pengalamatan 32-bit yang dipisahkan menjadi 4 oktet desimal bertitik (dotted decimal), misal 192.168.1.1." },
  { n: 11, c: "protokol internet dengan alamat 128-bit yang ditulis dalam kelompok heksadesimal. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Physical Layer", "Session Layer", "Default Gateway", "DNS", "IPv6"], ku: "E", ci: 4, p: "IPv6 menggunakan panjang alamat 128-bit yang direpresentasikan dalam 8 grup 4 digit bilangan heksadesimal (misal 2001:db8::1)." },
  { n: 12, c: "penanda bagian jaringan yang menentukan host mana berada pada jaringan yang sama. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["DNS", "Firewall", "WPA3", "Prefix/Subnet", "IPv4"], ku: "D", ci: 3, p: "Prefix Subnet (CIDR /24 atau subnet mask) memisahkan bit porsi network dan bit porsi host untuk menentukan batas subnet lokal." },
  { n: 13, c: "router tujuan awal ketika host mengirim paket ke jaringan lain. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Session Layer", "UDP", "Application Layer", "Default Gateway", "HTTPS"], ku: "D", ci: 3, p: "Default Gateway adalah alamat IP lokal router yang dituju oleh host saat ingin mengirim paket ke luar subnet lokal." },
  { n: 14, c: "protokol yang memberikan konfigurasi jaringan kepada klien secara otomatis. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["DHCP", "HTTPS", "IPv6", "SSID", "IPv4"], ku: "A", ci: 0, p: "DHCP (Dynamic Host Configuration Protocol) mengotomatisasi distribusi konfigurasi IP, subnet mask, gateway, dan DNS ke klien." },
  { n: 15, c: "sistem yang memetakan nama domain dengan alamat IP dan data terkait. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Firewall", "Default Gateway", "DNS", "HTTPS", "Data Link Layer"], ku: "C", ci: 2, p: "DNS (Domain Name System) adalah basis data terdistribusi global yang memetakan nama domain (URL) ke alamat IP host." },
  { n: 16, c: "protokol aplikasi untuk pertukaran sumber daya web tanpa enkripsi bawaan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["HTTP", "Transport Layer", "Prefix/Subnet", "Presentation Layer", "IPv4"], ku: "A", ci: 0, p: "HTTP (Hypertext Transfer Protocol) mengirimkan data halaman web dalam bentuk plain text melalui port 80 tanpa enkripsi data." },
  { n: 17, c: "HTTP yang dilindungi TLS untuk enkripsi dan autentikasi server. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["UDP", "Session Layer", "IPv6", "DNS", "HTTPS"], ku: "E", ci: 4, p: "HTTPS (HTTP Secure) mengamankan komunikasi web menggunakan lapisan enkripsi TLS/SSL pada port 443 untuk menjamin kerahasiaan dan integritas." },
  { n: 18, c: "nama logis jaringan nirkabel yang ditampilkan atau digunakan klien untuk memilih jaringan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["SSID", "Physical Layer", "Application Layer", "Presentation Layer", "TCP"], ku: "A", ci: 0, p: "SSID (Service Set Identifier) adalah nama pengenal jaringan Wi-Fi (WLAN) yang dipancarkan oleh Access Point." },
  { n: 19, c: "standar keamanan WLAN yang meningkatkan perlindungan autentikasi dibanding generasi sebelumnya. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["IPv6", "HTTPS", "Default Gateway", "UDP", "WPA3"], ku: "E", ci: 4, p: "WPA3 menggunakan protokol SAE (Simultaneous Authentication of Equals) dan enkripsi 192-bit yang kebal terhadap serangan brute-force dictionary attack offline." },
  { n: 20, c: "kontrol yang mengizinkan atau menolak trafik berdasarkan aturan sumber, tujuan, port, protokol, dan keadaan koneksi. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Firewall", "WPA3", "Session Layer", "HTTPS", "HTTP"], ku: "A", ci: 0, p: "Firewall (Stateful Inspection) menyaring paket data keluar-masuk jaringan sesuai rulebase keamanan port, IP, protokol, dan state koneksi." },
  { n: 21, c: "Lampu link pada NIC mati. Masalah paling mungkin berada pada ...", opts: ["DNS saja", "Physical Layer", "Session Layer", "Application Layer", "Presentation Layer"], ku: "B", ci: 1, p: "Lampu link mati menunjukkan kegagalan sinyal elektrik/optik pada Layer 1 (Physical Layer)." },
  { n: 22, c: "Switch memilih port keluaran berdasarkan ...", opts: ["Alamat email", "Password Wi-Fi", "Nama domain", "Port HTTP saja", "Alamat MAC pada Data Link Layer"], ku: "E", ci: 4, p: "Switch bekerja pada Layer 2 (Data Link Layer) dan memeriksa Destination MAC Address pada header frame untuk memilih port keluaran." },
  { n: 23, c: "Router meneruskan paket berdasarkan ...", opts: ["MAC saja lintas semua jaringan", "Alamat IP pada Network Layer", "Nama pengguna", "Warna kabel", "Sertifikat"], ku: "B", ci: 1, p: "Router bekerja pada Layer 3 (Network Layer) dan memeriksa Destination IP Address pada header paket untuk menentukan arah interface keluar." },
  { n: 24, c: "Aplikasi membutuhkan pengiriman andal dan berurutan. Protokol yang lebih tepat adalah ...", opts: ["UDP", "ARP", "ICMP", "TCP", "SSID"], ku: "D", ci: 3, p: "Aplikasi seperti web, transfer file (FTP), dan database memerlukan TCP karena memiliki fitur garansi pengiriman data berurutan dan retransmisi bila hilang." },
  { n: 25, c: "Streaming real-time tertentu memilih overhead rendah dan toleran terhadap kehilangan kecil. Protokol yang sering dipakai adalah ...", opts: ["VLAN", "TCP selalu", "ARP", "UDP", "HTTP saja"], ku: "D", ci: 3, p: "UDP lebih disukai untuk streaming live dan game online karena tidak ada overhead acknowledgement sehingga latensi jauh lebih rendah." },
  { n: 26, c: "Dua host IPv4 berada pada subnet berbeda. Untuk berkomunikasi mereka memerlukan ...", opts: ["Hub saja", "Crimping tool", "DNS saja", "Patch cord crossover wajib", "Router/default gateway"], ku: "E", ci: 4, p: "Komunikasi antar subnet berbeda (inter-network) wajib melalui perangkat Layer 3 yaitu router atau switch L3 sebagai default gateway." },
  { n: 27, c: "Ping ke IP web server berhasil, tetapi browser ke nama domain gagal. Fokus pemeriksaan adalah ...", opts: ["CPU server", "Power supply switch mati", "T568A", "Kabel NIC pasti putus", "DNS"], ku: "E", ci: 4, p: "Karena ping IP langsung sukses, konektivitas routing L1-L3 baik. Masalah murni terletak pada sistem translasi nama domain (DNS)." },
  { n: 28, c: "HTTPS lebih aman daripada HTTP karena ...", opts: ["Tidak memakai port", "Menggunakan TLS untuk enkripsi dan autentikasi", "Menghapus firewall", "Selalu lebih cepat tanpa syarat", "Tidak membutuhkan sertifikat"], ku: "B", ci: 1, p: "HTTPS mengenkripsi seluruh payload transmisi HTTP menggunakan Transport Layer Security (TLS) dan memvalidasi keaslian server lewat sertifikat digital." },
  { n: 29, c: "Jaringan Wi-Fi padat pada kanal yang sama. Tindakan yang tepat adalah ...", opts: ["Menambah SSID tanpa analisis", "Menonaktifkan enkripsi", "Mengganti IP menjadi publik", "Menganalisis kanal dan memilih perencanaan kanal yang lebih baik", "Menaikkan daya maksimum semua AP"], ku: "D", ci: 3, p: "Kepadatan kanal Wi-Fi (Co-Channel Interference) diatasi dengan frequency channel planning yang baik (menggunakan non-overlapping channel 1, 6, 11 pada 2.4 GHz atau beralih ke 5 GHz)." },
  { n: 30, c: "Kredensial administrator access point masih bawaan pabrik. Tindakan pertama adalah ...", opts: ["Mengganti kredensial dengan kuat dan memperbarui firmware/config keamanan", "Membuka manajemen dari internet", "Membagikan password ke semua orang", "Menonaktifkan WPA", "Mengabaikan karena SSID tersembunyi"], ku: "A", ci: 0, p: "Password default pabrik (admin/admin) adalah celah keamanan paling umum. Wajib segera diubah ke kombinasi password kuat dan perbarui firmware." }
];

const m7_kategori_keys = [
  // 31: B, S, S
  { n: 31, sts: [
    { id: "A", text: "UDP paling tepat dijelaskan sebagai protokol transport tanpa koneksi dengan overhead rendah dan tanpa jaminan pengiriman bawaan.", answer: "Benar" },
    { id: "B", text: "Physical Layer paling tepat dijelaskan sebagai lapisan yang menangani format data, enkripsi, kompresi, dan representasi.", answer: "Salah" },
    { id: "C", text: "Data Link Layer paling tepat dijelaskan sebagai lapisan terdekat dengan aplikasi pengguna dan menyediakan layanan jaringan tingkat aplikasi.", answer: "Salah" }
  ], p: "A benar, B salah (itu Presentation Layer), C salah (itu Application Layer)." },
  // 32: S, S, S
  { n: 32, sts: [
    { id: "A", text: "Prefix/Subnet paling tepat dijelaskan sebagai lapisan yang menangani frame, alamat MAC, akses media, dan switching lokal.", answer: "Salah" },
    { id: "B", text: "Session Layer paling tepat dijelaskan sebagai protokol internet dengan alamat 32-bit yang umum ditulis dalam empat oktet desimal.", answer: "Salah" },
    { id: "C", text: "Default Gateway paling tepat dijelaskan sebagai lapisan yang menangani alamat logis dan routing paket antarjaringan.", answer: "Salah" }
  ], p: "Ketiganya salah: A adalah Data Link, B adalah IPv4, C adalah Network Layer." },
  // 33: B, B, B
  { n: 33, sts: [
    { id: "A", text: "Transport Layer paling tepat dijelaskan sebagai lapisan yang menyediakan komunikasi ujung-ke-ujung, segmentasi, kontrol aliran, dan reliabilitas.", answer: "Benar" },
    { id: "B", text: "Application Layer paling tepat dijelaskan sebagai lapisan terdekat dengan aplikasi pengguna dan menyediakan layanan jaringan tingkat aplikasi.", answer: "Benar" },
    { id: "C", text: "Physical Layer paling tepat dijelaskan sebagai lapisan OSI yang menangani sinyal, konektor, media, bit, dan karakteristik fisik transmisi.", answer: "Benar" }
  ], p: "Ketiga pernyataan benar mendefinisikan Transport, Application, dan Physical Layer." },
  // 34: B, B, B
  { n: 34, sts: [
    { id: "A", text: "Prefix/Subnet paling tepat dijelaskan sebagai penanda bagian jaringan yang menentukan host mana berada pada jaringan yang sama.", answer: "Benar" },
    { id: "B", text: "IPv4 paling tepat dijelaskan sebagai protokol internet dengan alamat 32-bit yang umum ditulis dalam empat oktet desimal.", answer: "Benar" },
    { id: "C", text: "Default Gateway paling tepat dijelaskan sebagai router tujuan awal ketika host mengirim paket ke jaringan lain.", answer: "Benar" }
  ], p: "Semua pernyataan benar." },
  // 35: B, S, B
  { n: 35, sts: [
    { id: "A", text: "Presentation Layer paling tepat dijelaskan sebagai lapisan yang menangani format data, enkripsi, kompresi, dan representasi.", answer: "Benar" },
    { id: "B", text: "Transport Layer paling tepat dijelaskan sebagai protokol transport tanpa koneksi dengan overhead rendah dan tanpa jaminan pengiriman bawaan.", answer: "Salah" },
    { id: "C", text: "TCP paling tepat dijelaskan sebagai protokol transport berorientasi koneksi yang menyediakan urutan, pengakuan, dan pengiriman ulang.", answer: "Benar" }
  ], p: "A benar, B salah (itu UDP), C benar." },
  // 36: B, S, S
  { n: 36, sts: [
    { id: "A", text: "DHCP paling tepat dijelaskan sebagai protokol yang memberikan konfigurasi jaringan kepada klien secara otomatis.", answer: "Benar" },
    { id: "B", text: "Network Layer paling tepat dijelaskan sebagai protokol transport berorientasi koneksi yang menyediakan urutan, pengakuan, dan pengiriman ulang.", answer: "Salah" },
    { id: "C", text: "IPv6 paling tepat dijelaskan sebagai lapisan OSI yang menangani sinyal, konektor, media, bit, dan karakteristik fisik transmisi.", answer: "Salah" }
  ], p: "A benar, B salah (itu TCP), C salah (itu Physical Layer)." },
  // 37: S, S, B
  { n: 37, sts: [
    { id: "A", text: "Application Layer paling tepat dijelaskan sebagai penanda bagian jaringan yang menentukan host mana berada pada jaringan yang sama.", answer: "Salah" },
    { id: "B", text: "TCP paling tepat dijelaskan sebagai router tujuan awal ketika host mengirim paket ke jaringan lain.", answer: "Salah" },
    { id: "C", text: "Network Layer paling tepat dijelaskan sebagai lapisan yang menangani alamat logis dan routing paket antarjaringan.", answer: "Benar" }
  ], p: "A salah (itu Prefix/Subnet), B salah (itu Default Gateway), C benar (Network Layer)." },
  // 38: S, S, B
  { n: 38, sts: [
    { id: "A", text: "DNS paling tepat dijelaskan sebagai lapisan yang mengelola pembentukan, pemeliharaan, dan penghentian sesi komunikasi.", answer: "Salah" },
    { id: "B", text: "DHCP paling tepat dijelaskan sebagai lapisan yang menyediakan komunikasi ujung-ke-ujung, segmentasi, kontrol aliran, dan reliabilitas.", answer: "Salah" },
    { id: "C", text: "Data Link Layer paling tepat dijelaskan sebagai lapisan yang menangani frame, alamat MAC, akses media, dan switching lokal.", answer: "Benar" }
  ], p: "A salah (itu Session Layer), B salah (itu Transport Layer), C benar." },
  // 39: B, B, B
  { n: 39, sts: [
    { id: "A", text: "IPv6 paling tepat dijelaskan sebagai protokol internet dengan alamat 128-bit yang ditulis dalam kelompok heksadesimal.", answer: "Benar" },
    { id: "B", text: "DNS paling tepat dijelaskan sebagai sistem yang memetakan nama domain dengan alamat IP dan data terkait.", answer: "Benar" },
    { id: "C", text: "Session Layer paling tepat dijelaskan sebagai lapisan yang mengelola pembentukan, pemeliharaan, dan penghentian sesi komunikasi.", answer: "Benar" }
  ], p: "Semua pernyataan benar." },
  // 40: S, S, S
  { n: 40, sts: [
    { id: "A", text: "Presentation Layer paling tepat dijelaskan sebagai protokol internet dengan alamat 128-bit yang ditulis dalam kelompok heksadesimal.", answer: "Salah" },
    { id: "B", text: "UDP paling tepat dijelaskan sebagai protokol yang memberikan konfigurasi jaringan kepada klien secara otomatis.", answer: "Salah" },
    { id: "C", text: "IPv4 paling tepat dijelaskan sebagai sistem yang memetakan nama domain dengan alamat IP dan data terkait.", answer: "Salah" }
  ], p: "Ketiganya salah: A adalah IPv6, B adalah DHCP, C adalah DNS." }
];

const m7_mcma_raw = [
  { n: 41, c: "Diagnosis berdasarkan OSI dapat dimulai dengan ... (Jawaban benar lebih dari satu)", opts: ["Memeriksa link dan media", "Memeriksa VLAN/MAC", "Memeriksa IP, route, port, dan aplikasi secara bertahap", "Langsung menginstal ulang semua komputer", "Mengabaikan gejala"], p: "Pendekatan troubleshooting berbasis model OSI: mulai dari Layer 1 fisik (kabel/link), lanjut ke Layer 2 (VLAN/MAC), hingga Layer 3-7 (IP, port, dan software)." },
  { n: 42, c: "TCP memiliki karakteristik ... (Jawaban benar lebih dari satu)", opts: ["Connection-oriented", "Mendukung urutan dan ACK", "Dapat melakukan retransmisi", "Tidak memiliki kontrol sama sekali", "Selalu lebih cepat untuk semua aplikasi"], p: "Karakteristik TCP: connection-oriented (handshake), nomor urut & ACK (acknowledgement), serta mekanisme retransmisi paket rusak/hilang." },
  { n: 43, c: "UDP memiliki karakteristik ... (Jawaban benar lebih dari satu)", opts: ["Connectionless", "Overhead relatif rendah", "Tidak menjamin pengiriman bawaan", "Selalu melakukan retransmisi", "Menggunakan alamat MAC sebagai pengganti port"], p: "Karakteristik UDP: connectionless tanpa jabat tangan, header ringan hemat bandwidth, dan tanpa jaminan retransmisi bawaan." },
  { n: 44, c: "Konfigurasi IPv4 host lengkap mencakup ... (Jawaban benar lebih dari satu)", opts: ["Alamat IP", "Subnet mask/prefix", "Gateway dan DNS sesuai kebutuhan", "Nama warna kabel", "Nomor seri monitor"], p: "Parameter konfigurasi IPv4 host: IP address unik, subnet mask, default gateway, dan alamat IP DNS server primer/sekunder." },
  { n: 45, c: "Keamanan WLAN yang baik mencakup ... (Jawaban benar lebih dari satu)", opts: ["WPA2/WPA3", "Kredensial administrator kuat", "Firmware dan segmentasi tamu", "Open network untuk semua", "Password default"], p: "Pengamanan Wi-Fi: enkripsi WPA2/WPA3 Enterprise/Personal, password admin router yang kuat, pembaruan firmware, dan VLAN isolasi guest." },
  { n: 46, c: "Gangguan Wi-Fi dianalisis melalui ... (Jawaban benar lebih dari satu)", opts: ["RSSI dan lokasi", "Kanal dan interferensi", "Kapasitas AP dan jumlah klien", "Warna ikon Wi-Fi", "Menghapus DNS tanpa uji"], p: "Audit performa WLAN: ukur kekuatan sinyal (RSSI dalam dBm), utilisasi spektrum kanal sekitar, dan jumlah asosiasi klien aktif per AP." },
  { n: 47, c: "DNS troubleshooting mencakup ... (Jawaban benar lebih dari satu)", opts: ["Memeriksa resolver klien", "Menguji query nama", "Memeriksa record dan konektivitas port", "Mengganti semua kabel jika ping IP berhasil", "Menonaktifkan NIC"], p: "Troubleshoot DNS: periksa IP DNS di klien, lakukan query via nslookup/dig, dan pastikan port 53 UDP/TCP di server DNS terbuka." },
  { n: 48, c: "HTTPS yang benar memerlukan ... (Jawaban benar lebih dari satu)", opts: ["TLS", "Sertifikat yang valid sesuai nama", "Waktu sistem yang benar", "Mengabaikan semua peringatan", "Membuka seluruh firewall"], p: "HTTPS yang aman: negosiasi TLS cipher kuat, sertifikat SSL valid yang cocok dengan FQDN situs, serta sinkronisasi waktu jam sistem (NTP)." },
  { n: 49, c: "Firewall dapat digunakan untuk ... (Jawaban benar lebih dari satu)", opts: ["Membatasi port layanan", "Membatasi sumber/tujuan", "Mencatat atau memantau trafik sesuai fitur", "Mengganti fungsi backup", "Memperbaiki kabel putus"], p: "Fungsi firewall: memfilter port TCP/UDP, membatasi IP address sumber dan tujuan, serta mencatat log riwayat koneksi jaringan." },
  { n: 50, c: "IPv6 relevan karena ... (Jawaban benar lebih dari satu)", opts: ["Ruang alamat sangat besar", "Mendukung pengalamatan modern", "Ditulis dalam kelompok heksadesimal", "Hanya memiliki 32 bit", "Selalu menggunakan NAT sebagai syarat utama"], p: "Urgensi IPv6: kapasitas ruang alamat 128 bit yang masif, arsitektur routing modern tanpa keharusan bergantung pada NAT, dan format heksadesimal." }
];

const m7_full = [];
m7_raw_pg.forEach(item => {
  m7_full.push({
    num: item.n,
    kompetensi: kompM7,
    subKompetensi: subM7,
    kasus: item.c,
    options: item.opts,
    kunci: item.ku,
    correctIndex: item.ci,
    pembahasan: item.p
  });
});
m7_kategori_keys.forEach(item => {
  m7_full.push({
    num: item.n,
    kompetensi: kompM7,
    subKompetensi: subM7,
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: item.sts,
    pembahasan: item.p
  });
});
m7_mcma_raw.forEach(item => {
  m7_full.push({
    num: item.n,
    kompetensi: kompM7,
    subKompetensi: subM7,
    kasus: item.c,
    options: item.opts,
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: item.p
  });
});

writeTsFile(7, transformWeekData(m7_full, 7));

// ====================================================
// MINGGU 8: Alat Ukur Jaringan & SOP TKA
// ====================================================
const kompM8 = "Menentukan, menerapkan, dan menganalisis prosedur penggunaan berbagai jenis alat ukur jaringan untuk menghasilkan data pengujian dan pengukuran infrastruktur telekomunikasi yang valid serta akurat sesuai dengan standar operasional prosedur (SOP) industri.";
const subM8 = "Jenis, Fungsi, serta Prosedur operasional dan analisis kerja alat ukur jaringan";
const kompMaint = "Mengidentifikasi dan menganalisis prosedur pemeliharaan dan penyimpanan alat ukur jaringan berdasarkan Standar Operasional Prosedur (SOP) serta pengaruh kondisi lingkungan untuk menjamin fungsionalitas perangkat.";
const subMaint = "Pemeliharaan alat ukur dalam lingkup TJKT";

const m8_raw_pg = [
  { n: 1, k: kompM8, s: subM8, c: "alat untuk memeriksa wire map, kontinuitas, putus, short, dan salah urutan kabel tembaga. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Optical Power Meter", "Spectrum Analyzer", "Optical Light Source", "Multimeter", "Cable Tester"], ku: "E", ci: 4, p: "Cable Tester memeriksa integritas pinout kabel LAN UTP/STP, mendeteksi jalur open, short circuit, dan miswire." },
  { n: 2, k: kompM8, s: subM8, c: "alat untuk mengukur besaran listrik seperti tegangan, arus, dan resistansi sesuai mode serta batas alat. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Multimeter", "Wi-Fi Analyzer", "Optical Light Source", "Optical Power Meter", "Cable Tester"], ku: "A", ci: 0, p: "Multimeter (AVO meter) mengukur tegangan DC/AC (Volt), arus (Ampere), dan hambatan resistansi (Ohm) pada rangkaian catu daya dan kabel." },
  { n: 3, k: kompM8, s: subM8, c: "alat untuk mengukur daya optik yang diterima pada panjang gelombang tertentu. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Optical Power Meter", "VFL", "Spectrum Analyzer", "Cable Tester", "Wi-Fi Analyzer"], ku: "A", ci: 0, p: "Optical Power Meter (OPM) mengukur intensitas daya foton optik yang tiba pada sensor fotodioda dalam satuan dBm atau mW." },
  { n: 4, k: kompM8, s: subM8, c: "sumber cahaya optik stabil untuk pengujian loss bersama power meter. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["OTDR", "Loopback Plug", "Spectrum Analyzer", "Optical Light Source", "Cable Tester"], ku: "D", ci: 3, p: "Optical Light Source (OLS) memancarkan sinyal laser terkalibrasi stabil untuk pengukuran insertion loss kabel serat optik." },
  { n: 5, k: kompM8, s: subM8, c: "alat yang mengirim pulsa dan menganalisis backscatter untuk menunjukkan jarak serta event sepanjang fiber. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Cable Tester", "OTDR", "Multimeter", "Loopback Plug", "VFL"], ku: "B", ci: 1, p: "OTDR memancarkan pulsa laser pendek dan membaca kurva hamburan balik (backscattering) untuk mendeteksi event konektor, splice, dan ujung serat." },
  { n: 6, k: kompM8, s: subM8, c: "sumber cahaya merah tampak untuk membantu menemukan kebocoran atau putus pada jarak terbatas. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["VFL", "Multimeter", "Wi-Fi Analyzer", "Loopback Plug", "Optical Power Meter"], ku: "A", ci: 0, p: "VFL (Visual Fault Locator) menggunakan sinar laser merah (650 nm) yang berpendar tampak mata pada jaket kabel yang retak atau tertekuk." },
  { n: 7, k: kompM8, s: subM8, c: "aplikasi atau alat untuk melihat kanal, kekuatan sinyal, dan kepadatan jaringan nirkabel. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Cable Tester", "Wi-Fi Analyzer", "Spectrum Analyzer", "OTDR", "Optical Power Meter"], ku: "B", ci: 1, p: "Wi-Fi Analyzer memindai sinyal radio beacon AP, menampilkan channel graph, RSSI (dBm), dan tingkat interferensi sinyal Wi-Fi di sekitar." },
  { n: 8, k: kompM8, s: subM8, c: "alat untuk melihat distribusi daya terhadap frekuensi dan mengidentifikasi sumber spektrum atau interferensi. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Optical Light Source", "Cable Tester", "Tone Generator and Probe", "Spectrum Analyzer", "Wi-Fi Analyzer"], ku: "D", ci: 3, p: "Spectrum Analyzer memvisualisasikan seluruh spektrum frekuensi radio (RF) mentah untuk mendeteksi interferensi non-Wi-Fi seperti microwave oven dan radar." },
  { n: 9, k: kompM8, s: subM8, c: "pasangan alat untuk melacak kabel tembaga tertentu di antara banyak kabel. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Multimeter", "OTDR", "Tone Generator and Probe", "VFL", "Spectrum Analyzer"], ku: "C", ci: 2, p: "Tone Generator menginjeksikan sinyal nada audio ke pasangan kawat kabel, sedangkan Probe melacak induksi suaranya di kumpulan rak kabel." },
  { n: 10, k: kompM8, s: subM8, c: "konektor uji yang mengembalikan sinyal ke perangkat untuk menguji fungsi antarmuka tertentu. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Tone Generator and Probe", "Optical Power Meter", "Cable Tester", "Loopback Plug", "OTDR"], ku: "D", ci: 3, p: "Loopback Plug menghubungkan pin transmisi (TX) langsung ke pin penerima (RX) pada port untuk menguji fungsi internal transceiver NIC/switch." },
  { n: 11, k: kompM8, s: subM8, c: "proses membandingkan atau menyesuaikan alat terhadap acuan agar hasil tetap dapat dipercaya. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Kalibrasi", "VFL", "Measurement Log", "Optical Light Source", "SOP Industri"], ku: "A", ci: 0, p: "Kalibrasi berkala mencocokkan akurasi pengukuran alat ukur terhadap standar baku industri yang tertelusur (traceable)." },
  { n: 12, k: kompM8, s: subM8, c: "penetapan nilai acuan sebelum pengukuran agar loss kabel referensi dan koneksi diperhitungkan dengan benar. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Wi-Fi Analyzer", "Kalibrasi", "Zero/Reference Setting", "Measurement Log", "Tone Generator and Probe"], ku: "C", ci: 2, p: "Zeroing / Reference Setting menetapkan nilai dasar 0 dB dengan kabel uji patokan sebelum mengukur redaman kabel instalasi riil." },
  { n: 13, k: kompM8, s: subM8, c: "parameter optik seperti 1310 atau 1550 nanometer yang harus sesuai antara sumber, meter, dan desain pengujian. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Panjang Gelombang", "VFL", "Penyimpanan Kering", "Event Loss", "Optical Power Meter"], ku: "A", ci: 0, p: "Panjang gelombang (Wavelength dalam nm) menentukan jendela transmisi optik (1310nm untuk dispersi rendah, 1550nm untuk redaman minimal)." },
  { n: 14, k: kompM8, s: subM8, c: "proses memeriksa dan membersihkan permukaan konektor untuk mencegah loss, refleksi, dan kerusakan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Zero/Reference Setting", "Cleaning Connector", "Perawatan Baterai", "Tone Generator and Probe", "Penyimpanan Kering"], ku: "B", ci: 1, p: "Cleaning Connector membersihkan ferrule dari debu dan minyak menggunakan pembersih khusus serat optik." },
  { n: 15, k: kompM8, s: subM8, c: "nilai kehilangan daya pada sambungan, konektor, splitter, atau kejadian tertentu pada jejak OTDR. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Event Loss", "Kalibrasi", "Spectrum Analyzer", "Zero/Reference Setting", "Panjang Gelombang"], ku: "A", ci: 0, p: "Event Loss pada trace grafik OTDR menunjukkan besaran drop daya (dB) pada titik splice lasan atau sambungan konektor." },
  { n: 16, k: kompM8, s: subM8, c: "perkiraan jarak dari alat ke lokasi gangguan berdasarkan waktu rambat sinyal. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Zero/Reference Setting", "Distance to Fault", "OTDR", "Measurement Log", "Kalibrasi"], ku: "B", ci: 1, p: "Distance to Fault (DTF) mengalkulasikan jarak meter/kilometer ke titik putus berdasarkan kecepatan rambat sinyal dan waktu pantul." },
  { n: 17, k: kompM8, s: subM8, c: "catatan identitas jalur, alat, tanggal, konfigurasi, hasil, operator, dan keputusan pengujian. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Event Loss", "Perawatan Baterai", "Tone Generator and Probe", "Spectrum Analyzer", "Measurement Log"], ku: "E", ci: 4, p: "Measurement Log mendokumentasikan hasil pengujian secara rinci untuk ketertelusuran riwayat teknis dan serah terima proyek." },
  { n: 18, k: kompMaint, s: subMaint, c: "penyimpanan alat pada kondisi bersih, kering, aman, dan sesuai rentang suhu serta kelembapan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Event Loss", "Optical Light Source", "Optical Power Meter", "Loopback Plug", "Penyimpanan Kering"], ku: "E", ci: 4, p: "Penyimpanan kering (dry storage) mencegah timbulnya jamur pada lensa optik dan korosi pada terminal sirkuit elektronik alat ukur." },
  { n: 19, k: kompMaint, s: subMaint, c: "pengisian, pemeriksaan, dan penyimpanan baterai sesuai petunjuk agar aman dan siap digunakan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Perawatan Baterai", "OTDR", "Optical Light Source", "Cable Tester", "Penyimpanan Kering"], ku: "A", ci: 0, p: "Perawatan baterai instrumen: hindari overcharging, isi daya berkala jika disimpan lama, dan cegah kebocoran elektrolit baterai." },
  { n: 20, k: kompM8, s: subM8, c: "urutan kerja terdokumentasi yang memastikan keselamatan, konsistensi, ketertelusuran, dan mutu hasil. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Measurement Log", "Zero/Reference Setting", "Perawatan Baterai", "Optical Light Source", "SOP Industri"], ku: "E", ci: 4, p: "Standard Operating Procedure (SOP) menjamin setiap tahapan pengujian dieksekusi secara seragam, aman, dan memenuhi standar mutu industri." },
  { n: 21, k: kompM8, s: subM8, c: "Tester diperlukan untuk mencari pin putus pada kabel UTP. Alat yang tepat adalah ...", opts: ["Cable Tester", "OTDR", "VFL", "OPM", "Wi-Fi analyzer"], ku: "A", ci: 0, p: "Cable Tester tembaga (LAN tester) adalah alat tepat untuk menguji pinout 1-8 pada kabel UTP RJ45." },
  { n: 22, k: kompM8, s: subM8, c: "Teknisi ingin mengukur tegangan adaptor. Alat yang tepat adalah ...", opts: ["Cable toner", "OPM", "OTDR", "Cleaver", "Multimeter pada mode dan range yang sesuai"], ku: "E", ci: 4, p: "Multimeter disetel pada selektor Volt DC (DCV) dengan batas ukur (range) di atas voltase adaptor (misal 20V untuk adaptor 12V)." },
  { n: 23, k: kompM8, s: subM8, c: "Teknisi ingin mengukur loss total link fiber dari ujung ke ujung. Pasangan alat yang tepat adalah ...", opts: ["Multimeter dan hub", "Optical Light Source dan Optical Power Meter", "VFL dan crimping tool", "Spectrum analyzer dan RJ45", "Cable tester dan AP"], ku: "B", ci: 1, p: "Metode Loss Test Set (LTS) menggunakan kombinasi Optical Light Source (OLS) di satu ujung dan Optical Power Meter (OPM) di ujung penerima." },
  { n: 24, k: kompM8, s: subM8, c: "Teknisi ingin mengetahui jarak ke sambungan buruk pada fiber. Alat yang tepat adalah ...", opts: ["OTDR", "Loopback plug", "Cable tester", "OPM saja", "Tone probe"], ku: "A", ci: 0, p: "OTDR menampilkan grafik koordinat jarak (dalam meter atau km) menuju titik sambungan las yang mengalami redaman tinggi." },
  { n: 25, k: kompM8, s: subM8, c: "Sebelum pengukuran optik, konektor harus ...", opts: ["Disentuh agar hangat", "Dibiarkan terbuka", "Diperiksa dan dibersihkan sesuai prosedur", "Ditiup dengan mulut", "Digosok dengan kain kotor"], ku: "C", ci: 2, p: "Konektor optik wajib diperiksa ujung ferrule-nya dan diseka bersih menggunakan pembersih khusus serat optik sebelum dicolokkan ke alat ukur." },
  { n: 26, k: kompM8, s: subM8, c: "OPM disetel 1550 nm sementara light source bekerja 1310 nm. Dampaknya adalah ...", opts: ["Tidak ada dampak dalam kondisi apa pun", "Baterai terisi", "Kabel berubah menjadi multimode", "VLAN terhapus", "Hasil dapat tidak akurat sehingga panjang gelombang harus disamakan"], ku: "E", ci: 4, p: "Detektor OPM memiliki kurva responsivitas berbeda untuk tiap panjang gelombang; mismatch pengaturan wavelength menghasilkan pembacaan daya yang tidak valid." },
  { n: 27, k: kompM8, s: subM8, c: "Hasil ukur tidak stabil. Langkah paling tepat adalah ...", opts: ["Memeriksa koneksi, kebersihan, referensi, baterai, dan mengulang secara terkendali", "Mengabaikan variasi", "Memukul alat", "Menulis hasil perkiraan", "Memilih angka terendah saja"], ku: "A", ci: 0, p: "Atasi fluktuasi pengukuran: cek kekencangan adapter, bersihkan ulang konektor, cek tegangan baterai alat ukur, dan ulangi kalibrasi reference nol." },
  { n: 28, k: kompMaint, s: subMaint, c: "Alat ukur selesai digunakan. Penyimpanan yang benar adalah ...", opts: ["Diletakkan di lantai lembap", "Kabel digulung tajam", "Dibiarkan terhubung tanpa penutup", "Dibersihkan, diberi dust cap, dimasukkan case, dan disimpan kering sesuai suhu", "Baterai rusak tetap dipakai"], ku: "D", ci: 3, p: "SOP penyimpanan instrumen optik: bersihkan body, pasang penutup dust cap pelindung lensa, masukkan hard case busa, dan simpan di lemari bersuhu stabil." },
  { n: 29, k: kompM8, s: subM8, c: "Laporan pengukuran yang baik minimal mencatat ...", opts: ["Hanya nama teknisi", "Hanya angka terbaik", "Identitas link, alat, konfigurasi, waktu, operator, hasil, dan keputusan", "Hanya warna kabel", "Tidak perlu nomor alat"], ku: "C", ci: 2, p: "Formulir hasil ukur wajib memuat identitas kabel/core, model & nomor seri alat ukur, tanggal/jam, nama tester, nilai loss terukur, dan status Pass/Fail." },
  { n: 30, k: kompMaint, s: subMaint, c: "Masa kalibrasi alat telah lewat. Tindakan yang tepat adalah ...", opts: ["Tidak menggunakannya untuk keputusan resmi sampai diverifikasi atau dikalibrasi sesuai prosedur", "Mengubah label tanggal", "Memilih hasil yang sesuai harapan", "Tetap menggunakan tanpa catatan", "Menghapus nomor seri"], ku: "A", ci: 0, p: "Alat ukur yang habis masa kalibrasinya berpotensi bias ukur tinggi dan tidak boleh digunakan untuk uji terima resmi sebelum dikalibrasi ulang ke laboratorium terakreditasi." }
];

const m8_kategori_keys = [
  // 31: S, S, S
  { n: 31, sts: [
    { id: "A", text: "VFL paling tepat dijelaskan sebagai proses membandingkan atau menyesuaikan alat terhadap acuan agar hasil tetap dapat dipercaya.", answer: "Salah" },
    { id: "B", text: "Event Loss paling tepat dijelaskan sebagai alat yang mengirim pulsa dan menganalisis backscatter untuk menunjukkan jarak serta event sepanjang fiber.", answer: "Salah" },
    { id: "C", text: "Panjang Gelombang paling tepat dijelaskan sebagai alat untuk mengukur daya optik yang diterima pada panjang gelombang tertentu.", answer: "Salah" }
  ], p: "Ketiganya salah: A adalah Kalibrasi, B adalah OTDR, C adalah Optical Power Meter." },
  // 32: B, S, B
  { n: 32, sts: [
    { id: "A", text: "Cable Tester paling tepat dijelaskan sebagai alat untuk memeriksa wire map, kontinuitas, putus, short, dan salah urutan kabel tembaga.", answer: "Benar" },
    { id: "B", text: "Tone Generator and Probe paling tepat dijelaskan sebagai proses memeriksa dan membersihkan permukaan konektor untuk mencegah loss, refleksi, dan kerusakan.", answer: "Salah" },
    { id: "C", text: "Wi-Fi Analyzer paling tepat dijelaskan sebagai aplikasi atau alat untuk melihat kanal, kekuatan sinyal, dan kepadatan jaringan nirkabel.", answer: "Benar" }
  ], p: "A benar, B salah (itu Cleaning Connector), C benar." },
  // 33: S, B, B
  { n: 33, sts: [
    { id: "A", text: "Spectrum Analyzer paling tepat dijelaskan sebagai parameter optik seperti 1310 atau 1550 nanometer yang harus sesuai antara sumber, meter, dan desain pengujian.", answer: "Salah" },
    { id: "B", text: "Zero/Reference Setting paling tepat dijelaskan sebagai penetapan nilai acuan sebelum pengukuran agar loss kabel referensi dan koneksi diperhitungkan dengan benar.", answer: "Benar" },
    { id: "C", text: "VFL paling tepat dijelaskan sebagai sumber cahaya merah tampak untuk membantu menemukan kebocoran atau putus pada jarak terbatas.", answer: "Benar" }
  ], p: "A salah (itu Panjang Gelombang), B benar, C benar." },
  // 34: B, S, S
  { n: 34, sts: [
    { id: "A", text: "Event Loss paling tepat dijelaskan sebagai nilai kehilangan daya pada sambungan, konektor, splitter, atau kejadian tertentu pada jejak OTDR.", answer: "Benar" },
    { id: "B", text: "Wi-Fi Analyzer paling tepat dijelaskan sebagai penetapan nilai acuan sebelum pengukuran agar loss kabel referensi dan koneksi diperhitungkan dengan benar.", answer: "Salah" },
    { id: "C", text: "Loopback Plug paling tepat dijelaskan sebagai nilai kehilangan daya pada sambungan, konektor, splitter, atau kejadian tertentu pada jejak OTDR.", answer: "Salah" }
  ], p: "A benar, B salah (itu Zero Setting), C salah (itu Event Loss)." },
  // 35: B, B, B
  { n: 35, sts: [
    { id: "A", text: "Loopback Plug paling tepat dijelaskan sebagai konektor uji yang mengembalikan sinyal ke perangkat untuk menguji fungsi antarmuka tertentu.", answer: "Benar" },
    { id: "B", text: "Kalibrasi paling tepat dijelaskan sebagai proses membandingkan atau menyesuaikan alat terhadap acuan agar hasil tetap dapat dipercaya.", answer: "Benar" },
    { id: "C", text: "Multimeter paling tepat dijelaskan sebagai alat untuk mengukur besaran listrik seperti tegangan, arus, dan resistansi sesuai mode serta batas alat.", answer: "Benar" }
  ], p: "Semua pernyataan benar mendefinisikan Loopback Plug, Kalibrasi, dan Multimeter." },
  // 36: S, S, S
  { n: 36, sts: [
    { id: "A", text: "Cleaning Connector paling tepat dijelaskan sebagai sumber cahaya optik stabil untuk pengujian loss bersama power meter.", answer: "Salah" },
    { id: "B", text: "Optical Light Source paling tepat dijelaskan sebagai pasangan alat untuk melacak kabel tembaga tertentu di antara banyak kabel.", answer: "Salah" },
    { id: "C", text: "Cable Tester paling tepat dijelaskan sebagai sumber cahaya merah tampak untuk membantu menemukan kebocoran atau putus pada jarak terbatas.", answer: "Salah" }
  ], p: "Ketiganya salah: A adalah OLS, B adalah Tone Generator & Probe, C adalah VFL." },
  // 37: S, B, B
  { n: 37, sts: [
    { id: "A", text: "Optical Power Meter paling tepat dijelaskan sebagai alat untuk melihat distribusi daya terhadap frekuensi dan mengidentifikasi sumber spektrum atau interferensi.", answer: "Salah" },
    { id: "B", text: "Optical Light Source paling tepat dijelaskan sebagai sumber cahaya optik stabil untuk pengujian loss bersama power meter.", answer: "Benar" },
    { id: "C", text: "Optical Power Meter paling tepat dijelaskan sebagai alat untuk mengukur daya optik yang diterima pada panjang gelombang tertentu.", answer: "Benar" }
  ], p: "A salah (itu Spectrum Analyzer), B benar, C benar." },
  // 38: S, B, S
  { n: 38, sts: [
    { id: "A", text: "Multimeter paling tepat dijelaskan sebagai aplikasi atau alat untuk melihat kanal, kekuatan sinyal, dan kepadatan jaringan nirkabel.", answer: "Salah" },
    { id: "B", text: "Spectrum Analyzer paling tepat dijelaskan sebagai alat untuk melihat distribusi daya terhadap frekuensi dan mengidentifikasi sumber spektrum atau interferensi.", answer: "Benar" },
    { id: "C", text: "Kalibrasi paling tepat dijelaskan sebagai alat untuk memeriksa wire map, kontinuitas, putus, short, dan salah urutan kabel tembaga.", answer: "Salah" }
  ], p: "A salah (itu Wi-Fi Analyzer), B benar, C salah (itu Cable Tester)." },
  // 39: B, B, S
  { n: 39, sts: [
    { id: "A", text: "Cleaning Connector paling tepat dijelaskan sebagai proses memeriksa dan membersihkan permukaan konektor untuk mencegah loss, refleksi, dan kerusakan.", answer: "Benar" },
    { id: "B", text: "Tone Generator and Probe paling tepat dijelaskan sebagai pasangan alat untuk melacak kabel tembaga tertentu di antara banyak kabel.", answer: "Benar" },
    { id: "C", text: "OTDR paling tepat dijelaskan sebagai konektor uji yang mengembalikan sinyal ke perangkat untuk menguji fungsi antarmuka tertentu.", answer: "Salah" }
  ], p: "A benar, B benar, C salah (itu Loopback Plug)." },
  // 40: S, B, B
  { n: 40, sts: [
    { id: "A", text: "Zero/Reference Setting paling tepat dijelaskan sebagai alat untuk mengukur besaran listrik seperti tegangan, arus, dan resistansi sesuai mode serta batas alat.", answer: "Salah" },
    { id: "B", text: "OTDR paling tepat dijelaskan sebagai alat yang mengirim pulsa dan menganalisis backscatter untuk menunjukkan jarak serta event sepanjang fiber.", answer: "Benar" },
    { id: "C", text: "Panjang Gelombang paling tepat dijelaskan sebagai parameter optik seperti 1310 atau 1550 nanometer yang harus sesuai antara sumber, meter, dan desain pengujian.", answer: "Benar" }
  ], p: "A salah (itu Multimeter), B benar, C benar." }
];

const m8_mcma_raw = [
  { n: 41, c: "Sebelum mengukur fiber, teknisi perlu ... (Jawaban benar lebih dari satu)", opts: ["Memeriksa kondisi alat dan kalibrasi", "Membersihkan konektor", "Mengatur panjang gelombang dan reference", "Menyentuh ferrule", "Mengabaikan kabel referensi"], p: "Pra-pengukuran optik: cek status baterai & kalibrasi alat, bersihkan ferrule konektor, dan setel zero reference pada wavelength yang sama." },
  { n: 42, c: "Laporan OPM yang baik memuat ... (Jawaban benar lebih dari satu)", opts: ["Panjang gelombang", "Daya atau loss dan batas penerimaan", "Identitas link serta alat", "Hanya nama teknisi", "Angka tanpa unit"], p: "Komponen laporan OPM: nilai wavelength (nm), angka daya (dBm) atau loss (dB), identitas link/core serat, dan serial number alat." },
  { n: 43, c: "Pengaturan OTDR mempertimbangkan ... (Jawaban benar lebih dari satu)", opts: ["Range jarak", "Pulse width dan indeks bias sesuai kebutuhan", "Panjang gelombang serta launch cable bila diperlukan", "Urutan warna T568B", "Alamat DNS"], p: "Parameter konfigurasi OTDR: distance range, lebar pulsa (pulse width), refractive index (IOR), panjang gelombang, dan penggunaan dummy fiber (launch cable)." },
  { n: 44, c: "VFL digunakan secara aman dengan ... (Jawaban benar lebih dari satu)", opts: ["Tidak melihat langsung ke sumber cahaya", "Memasang konektor dengan benar", "Menggunakan untuk lokasi kebocoran visual terbatas", "Mengarahkannya ke mata", "Menganggapnya menggantikan OTDR untuk semua jarak"], p: "Keselamatan VFL: jangan pernah menatap lubang emitor laser langsung, pasang konektor presisi, dan pahami bahwa jarak jangkauannya terbatas (visual range)." },
  { n: 45, c: "Cable tester menunjukkan short. Tindakan tepat adalah ... (Jawaban benar lebih dari satu)", opts: ["Memeriksa terminasi", "Mencari konduktor bersentuhan", "Memperbaiki lalu menguji ulang", "Mengubah subnet", "Mencatat pass"], p: "Penanganan short circuit: periksa pin konektor RJ45 yang bengkok bersinggungan, kupas ulang terminasi, dan lakukan re-test hingga indikator normal." },
  { n: 46, c: "Wi-Fi analyzer membantu ... (Jawaban benar lebih dari satu)", opts: ["Melihat kanal sekitar", "Mengukur kekuatan sinyal relatif", "Membandingkan kepadatan jaringan", "Mengukur daya optik dBm pada fiber", "Mendeteksi urutan pin RJ45"], p: "Wi-Fi Analyzer berguna untuk memetakan interferensi kanal frekuensi 2.4/5 GHz, membaca level RSSI sinyal nirkabel, dan kepadatan SSID sekitar." },
  { n: 47, c: "Pemeliharaan alat ukur mencakup ... (Jawaban benar lebih dari satu)", opts: ["Pembersihan dan inspeksi", "Kalibrasi berkala", "Penyimpanan dalam case kering", "Melepas dust cap", "Menggunakan alat rusak"], p: "Pemeliharaan alat ukur: bersihkan bodi secara rutin, jadwalkan kalibrasi tahunan, dan simpan di hard case anti-benturan dengan silica gel." },
  { n: 48, c: "Hasil pengukuran tidak stabil ditangani dengan ... (Jawaban benar lebih dari satu)", opts: ["Mengulang setelah memeriksa koneksi", "Memeriksa baterai dan referensi", "Membandingkan beberapa hasil dan baseline", "Memilih hasil yang paling disukai", "Menghapus catatan"], p: "Langkah mengatasi deviasi ukur: periksa konektor adapter, pastikan voltase baterai prima, dan bandingkan rata-rata pengukuran dengan baseline desain." },
  { n: 49, c: "Ketertelusuran hasil didukung oleh ... (Jawaban benar lebih dari satu)", opts: ["Nomor seri alat", "Tanggal kalibrasi", "Identitas operator dan link", "Tidak mencatat unit", "Mengubah tanggal hasil"], p: "Ketertelusuran (traceability) data uji: catat nomor seri instrumen, sertifikat tanggal kalibrasi aktif, serta nama operator penguji yang bertugas." },
  { n: 50, c: "Strategi menjawab PGK MCMA adalah ... (Jawaban benar lebih dari satu)", opts: ["Menilai setiap opsi secara mandiri", "Mencocokkan dengan tujuan dan SOP", "Memastikan jumlah jawaban dapat lebih dari satu", "Memilih semua opsi teknis tanpa analisis", "Berhenti setelah menemukan satu jawaban"], p: "Strategi soal pilihan ganda kompleks multi-jawaban: baca setiap pernyataan secara independen, bandingkan dengan standar SOP teknis, dan tandai semua opsi yang terbukti valid." }
];

const m8_full = [];
m8_raw_pg.forEach(item => {
  m8_full.push({
    num: item.n,
    kompetensi: item.k,
    subKompetensi: item.s,
    kasus: item.c,
    options: item.opts,
    kunci: item.ku,
    correctIndex: item.ci,
    pembahasan: item.p
  });
});
m8_kategori_keys.forEach(item => {
  m8_full.push({
    num: item.n,
    kompetensi: kompM8,
    subKompetensi: subM8,
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: item.sts,
    pembahasan: item.p
  });
});
m8_mcma_raw.forEach(item => {
  m8_full.push({
    num: item.n,
    kompetensi: kompM8,
    subKompetensi: subM8,
    kasus: item.c,
    options: item.opts,
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: item.p
  });
});

writeTsFile(8, transformWeekData(m8_full, 8));
