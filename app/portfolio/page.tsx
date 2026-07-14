'use client';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 mb-6">
            <img 
              src="https://via.placeholder.com/300" 
              alt="Foto Profil" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-6xl font-bold mb-2">Faisal Zuhri</h1>
          <p className="text-2xl text-blue-400 mb-4">Junior Web3 Developer</p>
          
          <div className="flex gap-6 text-3xl mt-4">
            <a href="https://github.com/khalifzayn" target="_blank" className="hover:text-gray-400 transition">
              🐙
            </a>
            <a href="https://www.linkedin.com/in/faisal-zuhri-2a6a56210" target="_blank" className="hover:text-gray-400 transition">
              💼
            </a>
          </div>
        </div>

        {/* Proyek Utama */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-3xl p-10 mb-16">
          <h2 className="text-4xl font-bold mb-2 text-center">Web3 Todo App</h2>
          <p className="text-indigo-400 text-center mb-8">Decentralized Todo List • Sepolia Testnet</p>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-semibold mb-4 text-lg">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js 14", "TypeScript", "Tailwind CSS", "Ethers.js", "Solidity", "Sepolia"].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-gray-800 rounded-full text-sm">{tech}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Fitur yang Sudah Dibuat</h3>
              <ul className="space-y-3 text-gray-300">
                <li>✅ Connect MetaMask Wallet</li>
                <li>✅ Tambah Todo ke Blockchain</li>
                <li>✅ Toggle Complete on-chain</li>
                <li>✅ Smart Contract Solidity</li>
                <li>✅ Deploy ke Sepolia Testnet</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex gap-4 justify-center">
            <a href="/" className="bg-white text-black px-8 py-4 rounded-2xl font-medium hover:bg-gray-200 transition">
              Lihat Demo App
            </a>
            <a href="https://github.com/khalifzayn/web3-todo-app" 
               target="_blank" 
               className="border border-gray-600 px-8 py-4 rounded-2xl font-medium hover:bg-gray-800 transition">
              Source Code
            </a>
          </div>
        </div>

        {/* About Section */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Tentang Saya</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Saya seorang developer yang berfokus di dunia Web3. Saya sudah membuat 
            smart contract, deploy ke testnet Sepolia, dan mengintegrasikannya dengan frontend 
            menggunakan Next.js + TypeScript.
          </p>
          <p className="mt-8 text-gray-500">
            Terbuka untuk kolaborasi, internship, atau proyek Web3 lainnya.
          </p>
        </div>
      </div>
    </div>
  );
}