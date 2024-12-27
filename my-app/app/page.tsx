// import { SparklesPreview } from "@/components/Sparkles"

// export default function Home() {
//   return (
//     <div className="min-h-screen w-full bg-black flex items-center justify-center">
//       <SparklesPreview />
//     </div>
//   );
// }
"use client";

import { SparklesPreview } from "@/components/Sparkles"
import { GlowingText } from "@/components/GlowingText"
import { GlareCard } from "@/components/ui/glare-card";

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


