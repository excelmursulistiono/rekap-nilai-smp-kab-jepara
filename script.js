// Array berisi 101 nama sekolah sesuai permintaan
const schoolList = [
    "SMP NEGERI 1 WELAHAN", "SMP NEGERI 2 WELAHAN", "SMP NEGERI 3 WELAHAN",
    "SMP ISLAM SULTAN AGUNG 3 KALINYAMATAN", "SMP ISLAM ALHIKMAH 2 WELAHAN",
    "SMP NEGERI 1 KALINYAMATAN", "SMP NEGERI 2 KALINYAMATAN", "SMP NEGERI 1 PECANGAAN",
    "SMP NEGERI 2 PECANGAAN", "SMP ISLAM AL-MADINA PECANGAAN", "SMP ISLAM MAFATIHUL HUDA PECANGAAN",
    "SMP ISLAM PECANGAAN", "SMP AYASOFYA PECANGAAN", "SMP TAHFIDH TARBIYATUL QUR'AN TROSO",
    "SMP MUHAMMADIYAH KALINYAMATAN", "SMP WALISONGO PECANGAAN", "SMP NURUL ISLAM BATEALIT",
    "SMP NEGERI 1 MAYONG", "SMP NEGERI 2 MAYONG", "SMP NEGERI 1 NALUMSARI", "SMP NEGERI 2 NALUMSARI",
    "SMP AL-ISHOM MAYONG", "SMP BHAKTI PRAJA MAYONG", "SMP ISLAM AL-HIKMAH MAYONG",
    "SMP IT AL HAROMAIN MAYONG", "SMP NU ASSALAM NALUMSARI", "SMP TERPADU HADZIQIYYAH NALUMSARI",
    "SMP ISLAM MANBA'UL ULUM MAYONG", "SMP MUHAMMADIYAH BLIMBINGREJO NALUMSARI", "SMP AL HUSNA MAYONG",
    "SMP IP NURUL ISHLAH AL ANWAR", "SMP NEGERI 1 KEDUNG", "SMP NEGERI 2 KEDUNG", "SMP NEGERI 3 KEDUNG",
    "SMP ISLAM AL-AZHAR KEDUNG", "SMP ISLAM DARURROHMAN KEDUNG", "SMP ISLAM DATUK SINGARAJA KEDUNG",
    "SMP ISLAM KEDUNG", "SMP TAHFIDZ AL HUDA KEDUNG", "SMP NEGERI 1 JEPARA", "SMP NEGERI 2 JEPARA",
    "SMP NEGERI 3 JEPARA", "SMP NEGERI 4 JEPARA", "SMP NEGERI 5 JEPARA", "SMP NEGERI 6 JEPARA",
    "SMP NEGERI 1 KARIMUNJAWA", "SMP NEGERI 2 KARIMUNJAWA", "SMP MA'ARIF TEGALSAMBI",
    "SMP AL-MA'ARIF JEPARA", "SMP IT AMAL INSANI JEPARA", "SMP MASEHI JEPARA", "SMP MIS JABALNUR JEPARA",
    "SMP MUHAMMADIYAH JEPARA", "SMP UT BUMI KARTINI JEPARA", "SMP NEGERI 1 BATEALIT",
    "SMP NEGERI 2 BATEALIT", "SMP NEGERI 3 BATEALIT", "SMP NEGERI 1 TAHUNAN", "SMP ISLAM AR-RA'IS KECAPI",
    "SMP ISLAM ASY-SYAFI'IYAH BATEALIT", "SMP ISLAM HIDAYATUL MUBTADIIN BATEALIT",
    "SMP ISLAM SUNAN KALIJAGA BATEALIT", "SMP TAQ ALHAMIDIYAH BATEALIT", "SMP TAHFIZH ZHILALUL QUR'AN",
    "SMP PLUS NURUL IKHLASH IBTIDA'", "SMP AL KAHFI BAWU", "SMP AL AMIN BATEALIT",
    "SMP NURUL HUDA SUKODONO", "SMP TAHFIDZ ANNUR TAHUNAN", "SMP NEGERI 1 MLONGGO",
    "SMP NEGERI 1 PAKIS AJI", "SMP NEGERI 2 PAKIS AJI", "SMP AZ-ZAHRA MLONGGO",
    "SMP ISLAM MIFTAHUL HUDA PAKIS AJI", "SMP MUHAMMADIYAH MLONGGO", "SMP ISLAM DARUL ULUM MLONGGO",
    "SMP ISLAM ROUDHOTUTHALIBIN JAMBU TIMUR", "SMP DARUN NAJAH SROBYONG", "SMP NEGERI 1 BANGSRI",
    "SMP NEGERI 2 BANGSRI", "SMP NEGERI 1 KEMBANG", "SMP NEGERI 2 KEMBANG", "SMP NEGERI 3 KEMBANG",
    "SMP NEGERI 4 KEMBANG", "SMP BOPKRI 5 KEDUNGPENJALIN", "SMP IT KHOLILIYAH BANGSRI",
    "SMP MA'ARIF BANGSRI", "SMP MUHAMMADIYAH BANGSRI", "SMP TAQ SADAMIYAH BANGSRI",
    "SMP ISLAM UNG DARUL MUSYAWAROH", "SMP IT NUSANTARA KEMBANG", "SMP NEGERI 1 DONOROJO",
    "SMP NEGERI 2 DONOROJO", "SMP NEGERI 1 KELING", "SMP NEGERI 2 KELING", "SMP BOPKRI 4 KELET",
    "SMP ISLAM DONOROJO", "SMP MUHAMMADIYAH KELING", "SMP NURUL AMAL KELING", "SMP PERKEBUNAN BALONG"
];

// URL Google Apps Script untuk mengirim data
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxkrp09DxFnIBHKS9J8Do_pHk73cTUjbm93qJ6tvLOhWLtoo7S3BFpCigvFv7G3kO0/exec';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nilaiForm');
    const schoolSelect = document.getElementById('Nama_Sekolah');
    const submitButton = document.getElementById('submitButton');
    const loadingMessage = document.getElementById('loadingMessage');
    const successMessage = document.getElementById('successMessage');

    // 1. Mengisi Opsi Sekolah
    schoolList.forEach(school => {
        const option = document.createElement('option');
        option.value = school;
        option.textContent = school;
        schoolSelect.appendChild(option);
    });

    // 2. Event Listener untuk Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Mencegah form dari pengiriman standar

        // Validasi kustom: memastikan semua input required terisi (meskipun sudah ada atribut required)
        if (!form.checkValidity()) {
            // Jika ada input yang belum valid, tampilkan pesan error default browser
            alert('Mohon lengkapi semua data sebelum mengirim.');
            return;
        }

        // Tampilkan pesan loading dan nonaktifkan tombol
        submitButton.disabled = true;
        loadingMessage.style.display = 'block';
        successMessage.style.display = 'none';

        // Mengambil data dari form
        const formData = new FormData(form);
        
        try {
            // Mengirim data menggunakan fetch API
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData,
            });

            // Cek status respons
            if (response.ok) {
                // Proses Sukses
                form.style.display = 'none'; // Sembunyikan form
                successMessage.style.display = 'block'; // Tampilkan pesan sukses
            } else {
                // Proses Gagal
                const errorText = await response.text();
                alert('Gagal mengirim data. Silakan coba lagi. Pesan Error: ' + errorText);
            }

        } catch (error) {
            // Error jaringan/lainnya
            console.error('Error saat mengirim data:', error);
            alert('Terjadi kesalahan jaringan atau teknis. Cek koneksi Anda.');
        } finally {
            // Sembunyikan pesan loading dan aktifkan kembali tombol (kecuali jika sukses)
            loadingMessage.style.display = 'none';
            if (form.style.display !== 'none') {
                submitButton.disabled = false;
            }
        }
    });
});