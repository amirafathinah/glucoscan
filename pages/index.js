// pages/index.js
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const benefits = [
    "Analisis risiko diabetes berdasarkan gaya hidup Anda",
    "Rekomendasi personal untuk menurunkan risiko",
    "Penjelasan transparan tentang faktor risiko Anda"
  ];

  return (
    <>
      <Head>
        <title>Screening Risiko Diabetes Gaya Hidup</title>
        <meta name="description" content="Screening risiko diabetes berbasis gaya hidup untuk orang awam." />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans">
        {/* Navbar Ringkas */}
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-8">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🩺</span>
            <span className="font-bold text-gray-800 text-lg tracking-tight">GlucoLife Screen</span>
          </div>
          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
            Screening Mandiri
          </span>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center my-auto py-8">
          <span className="inline-block py-1 px-4 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100/70 rounded-full">
            Cepat, Mudah & Akurat
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Cek Risiko Diabetes <br />
            <span className="text-blue-600 bg-clip-text">Berdasarkan Gaya Hidup</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Dapatkan analisis personal tentang risiko diabetes Anda berdasarkan pola hidup sehari-hari. Hanya butuh 2 menit!
          </p>

          {/* Value Propositions / Bullet Points */}
          <div className="mt-10 bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 max-w-xl mx-auto text-left space-y-4">
            {benefits.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <p className="text-gray-700 font-medium text-sm sm:text-base">{point}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            <Link href="/screening">
              <span className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-200 cursor-pointer">
                Mulai Screening Sekarang
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Disclaimer Footer */}
        <div className="max-w-xl mx-auto text-center pt-8 border-t border-gray-200/60 w-full">
          <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
            <span>⚠️</span>
            <span><strong>Disclaimer:</strong> Ini bukan alat diagnosis medis. Konsultasikan dengan dokter untuk diagnosis resmi.</span>
          </p>
        </div>
      </main>
    </>
  );
}
