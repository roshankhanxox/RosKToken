// "use client";

// import { useState } from 'react'
// import { useAccount, useConfig, useReadContract, useWriteContract } from 'wagmi'
// import { abi, contractAddress } from '@/app/faucetAbi'
// import { Button } from '@/components/Button'
// import { Input } from '@/components/Input'
// import { waitForTransactionReceipt } from "wagmi/actions";

// export default function Faucet(){
//     const [loading, setLoading] = useState(false)
//     const config = useConfig()
//     const { isConnected, address } = useAccount()
//     const { writeContractAsync } = useWriteContract();

//     async function handleRequest(){
//         try{
//             setLoading(true);

//             const hash = await writeContractAsync({
//                 address: contractAddress,
//                 abi,
//                 functionName: "requestTokens",
//             })

//             await waitForTransactionReceipt(config, {
//                 hash,
//                 confirmations: 1,
//             })
//         } catch (error) {
//             alert("Error requesting Tokens,try again later")
//             console.error(error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     return(
//         <main>

//         </main>
//     )
    
// }
'use client'

import { useState } from 'react'
import { useAccount, useConfig, useWriteContract } from 'wagmi'
import { abi, contractAddress } from '@/app/faucetAbi'
import { Button } from '@/components/faucetButton'
import { waitForTransactionReceipt } from "wagmi/actions"

export default function Faucet() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const config = useConfig()
  const { isConnected, address } = useAccount()
  const { writeContractAsync } = useWriteContract()

  async function handleRequest() {
    try {
      setLoading(true)
      setSuccess(false)

      const hash = await writeContractAsync({
        address: contractAddress,
        abi,
        functionName: "requestTokens",
      })

      await waitForTransactionReceipt(config, {
        hash,
        confirmations: 1,
      })

      setSuccess(true)
    } catch (error) {
      alert("Error requesting Tokens, try again later")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 to-black p-1 rounded-lg flex items-center justify-center">
      <div className="p-6 bg-black rounded-lg shadow-md text-white border border-gray-800">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">RKT Faucet</h2>
          <p className="text-gray-300">
            Need RKT? Don't worry! Request tokens from our faucet to get started.
          </p>
          {isConnected ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                Connected address: <span className="font-mono text-purple-400">{address}</span>
              </p>
              <Button
                onClick={handleRequest}
                loading={loading}
                success={success}
              >
                Request RKT Tokens
              </Button>
              {success && (
                <p className="text-green-400">
                  Tokens successfully requested! Check your balance.
                </p>
              )}
            </div>
          ) : (
            <p className="text-yellow-400">
              Please connect your wallet to request tokens.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

