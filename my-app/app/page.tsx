
"use client";

import { SparklesPreview } from "@/components/Sparkles"
import { GlowingText } from "@/components/GlowingText"


export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center">
      <SparklesPreview />
      <section className="w-full max-w-4xl mx-auto px-4 py-16 text-center">
        <GlowingText className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          Welcome to my ERC20 Token
        </GlowingText>
        <p className="text-gray-300 text-lg md:text-xl mb-8">
        Introducing roskToken (RKT), a next-generation ERC20 token designed to empower decentralized ecosystems. 
        Combining a capped supply, burn functionality, and innovative miner rewards, roskToken delivers a secure, scalable, and sustainable solution for blockchain-based applications.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Capped"
            description="With a fixed cap of 100 million tokens, roskToken ensures long-term value and scarcity, making it a reliable choice for sustainable blockchain ecosystems."
            icon="🧢"
          />
          <FeatureCard
            title="Burnable"
            description="Empowering sustainability with burnable functionality, allowing tokens to be permanently removed from circulation."
            icon="🔥"
          />
          <FeatureCard
            title="Community-Friendly"
            description="Supporting blockchain integrity with automatic miner rewards, incentivizing network participants and ensuring seamless operations."
            icon="👥"
          />
        
        </div>
      </section>
      <section className="w-full max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-br from-purple-900 to-black p-1 rounded-lg">
          <div className="p-6 bg-black rounded-lg shadow-md text-white border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Import RKT to Your Wallet</h2>
            <p className="text-gray-300 mb-4">
              Ready to start using RKT? Import the token to your wallet using the contract address below deployed on rootstockTestnet:
            </p>
            <div className="bg-gray-900 p-4 rounded-lg mb-4">
              <code className="text-purple-400 break-all">0x17eF05ca2AB25FE1e6dFC9a5995CbC1884Ecd9f4</code>
            </div>
            <p className="text-sm text-gray-400">
              Use this address to add RKT to your wallet. Always verify the address before importing any token.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-indigo-500 transition-colors duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}


