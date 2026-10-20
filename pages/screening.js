import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Screening() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    usia: 30,
    tinggiBadan: 165,
    beratBadan: 65,
    aktivitasFisik: 12,
    konsumsiBuah: 2,
    konsumsiSayur: 2,
    mentalHealth: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      /* 
      // JIKA INGIN DISAMBUNGKAN LANGSUNG KE BACKEND FASTAPI:
      const res = await fetch('http://127.0.0.1:8000/api/screening', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      sessionStorage.setItem('screeningResult', JSON.stringify(data));
      */

      // Simulasi request loading 1.2 detik
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Hitung BMI sederhana untuk fallback preview
      const heightInMeters = formData.tinggiBadan / 100;
      const bmi = parseFloat((formData.beratBadan / (heightInMeters * heightInMeters)).toFixed(1));

      // Mock Data Output sesuai kebutuhan spesifikasi
      const mockResult = {
        category: bmi > 25 ? "Pre-Diabetes" : "Sehat",
        confidence: 68.5,
        bmi: bmi,
        feedback: [
          formData.aktivitasFisik >= 15
            ? { status: "success", text: `Aktivitas fisik Anda (${formData.aktivitasFisik}x/bulan) dikategorikan sebagai 'Aktif'` }
            : { status: "warning", text: `Aktivitas fisik Anda (${formData.aktivitasFisik}x/bulan) tergolong 'Kurang aktif'. Target: ≥15x/bulan` },
          formData.konsumsiBuah >= 3
            ? { status: "success", text: `Konsumsi buah Anda (${formData.konsumsiBuah}x/hari) sudah memenuhi anjuran` }
            : { status: "warning", text: `Konsumsi buah Anda (${formData.konsumsiBuah}x/hari) masih rendah. Target: ≥3x/hari` },
          bmi < 25
            ? { status: "success", text: `BMI Anda (${bmi}) berada dalam batas ideal normal` }
            : { status: "warning", text: `BMI Anda (${bmi}) di atas normal. Target: <25` },
        ],
        recommendations: [
          ...(bmi >= 25 ? [{
            priority: "Tinggi",
            title: "Turunkan BMI ke <25",
            detail: `Target penurunan berat badan berkisar ${(formData.beratBadan - (24.9 * (heightInMeters * heightInMeters))).toFixed(1)} kg.`
          }] : []),
          {
            priority: "Sedang",
            title: "Tingkatkan konsumsi buah minimal 3x/hari",
            detail: "Pilih buah rendah indeks glikemik seperti apel, pir, dan aneka berry."
          },
          ...(formData.aktivitasFisik < 15 ? [{
            priority: "Tinggi",
            title: "Tingkatkan aktivitas fisik rutin",
            detail: "Lakukan jalan cepat minimal 30 menit per hari, 3-5 kali seminggu."
          }] : [])
        ]
      };

      sessionStorage.setItem('screeningResult', JSON.stringify(mockResult));
      router.push('/result');
    } catch (err) {
      alert("Terjadi kesalahan saat memproses data. Silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Form Screening Gaya Hidup</title>
      </Head>

      <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 font-sans">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-6 transition-colors">
            ← Kembali ke Beranda
          </Link>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-10">
            <div className="border-b border-gray-100 pb-5 mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Form Screening Gaya Hidup
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Geser nilai indikator di bawah sesuai dengan rutinitas harian Anda dalam 1 bulan terakhir.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Usia */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-gray-700">Usia</label>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {formData.usia} tahun
                  </span>
                </div>
                <input
                  type="range"
                  name="usia"
                  min="18"
                  max="100"
                  value={formData.usia}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>18 th</span>
                  <span>100 th</span>
                </div>
              </div>

              {/* Tinggi Badan */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-gray-700">Tinggi Badan</label>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {formData.tinggiBadan} cm
                  </span>
                </div>
                <input
                  type="range"
                  name="tinggiBadan"
                  min="140"
                  max="200"
                  value={formData.tinggiBadan}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>140 cm</span>
                  <span>200 cm</span>
                </div>
              </div>

              {/* Berat Badan */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-gray-700">Berat Badan</label>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {formData.beratBadan} kg
                  </span>
                </div>
                <input
                  type="range"
                  name="beratBadan"
                  min="40"
                  max="150"
                  value={formData.beratBadan}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>40 kg</span>
                  <span>150 kg</span>
                </div>
              </div>

              {/* Aktivitas Fisik */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Aktivitas Fisik / Olahraga</label>
                    <span className="block text-xs text-gray-400">Minimal 20-30 menit per sesi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      formData.aktivitasFisik >= 15 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {formData.aktivitasFisik >= 15 ? "Aktif" : "Kurang aktif"}
                    </span>
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {formData.aktivitasFisik}x / bln
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  name="aktivitasFisik"
                  min="0"
                  max="30"
                  value={formData.aktivitasFisik}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Konsumsi Buah */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-gray-700">Konsumsi Buah</label>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {formData.konsumsiBuah} porsi / hari
                  </span>
                </div>
                <input
                  type="range"
                  name="konsumsiBuah"
                  min="0"
                  max="5"
                  step="0.5"
                  value={formData.konsumsiBuah}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Jarang (0)</span>
                  <span>Rutin (≥3)</span>
                  <span>Sangat Rutin (5)</span>
                </div>
              </div>

              {/* Konsumsi Sayur */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-gray-700">Konsumsi Sayur</label>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {formData.konsumsiSayur} porsi / hari
                  </span>
                </div>
                <input
                  type="range"
                  name="konsumsiSayur"
                  min="0"
                  max="5"
                  step="0.5"
                  value={formData.konsumsiSayur}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Jarang (0)</span>
                  <span>Rutin (≥3)</span>
                  <span>Sangat Rutin (5)</span>
                </div>
              </div>

              {/* Hari Buruk (Mental Health) */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Kesehatan Mental</label>
                    <span className="block text-xs text-gray-400">Jumlah hari stres/kurang fit dalam sebulan</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {formData.mentalHealth} hari / bln
                  </span>
                </div>
                <input
                  type="range"
                  name="mentalHealth"
                  min="0"
                  max="30"
                  value={formData.mentalHealth}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Menganalisis...</span>
                  </>
                ) : (
                  <span>Analisis Gaya Hidup Saya →</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
