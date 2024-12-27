'use client'

import { useState } from 'react'
import { useAccount, useConfig, useReadContract } from 'wagmi'
import { abi, contractAddress } from '@/app/abi'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

export default function Balance() {
  const [inputAddress, setInputAddress] = useState('')
  const { isConnected, address } = useAccount()

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'balanceOf',
    args: [inputAddress || address],
  })

  const formatBalance = (rawBalance: bigint | undefined) => {
    if (!rawBalance) return '0'
    const balanceInEther = Number(rawBalance) / 1e18
    return balanceInEther.toFixed(4) // Display 4 decimal places
  }

  const handleCheckBalance = () => {
    if (inputAddress) {
      refetch()
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 to-black p-1 rounded-lg flex items-center justify-center">
      <div className="p-6 bg-black rounded-lg shadow-md text-white border border-gray-800">
        {isConnected && (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">
              Connected address:{' '}
              <span className="font-mono text-purple-400">{address}</span>
            </p>
            <div className="space-y-2">
              <Input
                label="Check balance for address"
                value={inputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
                placeholder="Enter Ethereum address"
              />
              <Button onClick={handleCheckBalance}>Check Balance</Button>
            </div>
            <p className="text-lg">
              <span className="font-bold text-gray-300">Balance:</span>{' '}
              <span className="font-mono">
                {isLoading
                  ? 'Loading...'
                  : error
                  ? 'Error retrieving balance'
                  : formatBalance(data)}
              </span>{' '}
              <span className="text-sm text-purple-400">RKT</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}






// 'use client'

// import { useState } from 'react'
// import { useAccount, useConfig, useReadContract } from 'wagmi'
// import { abi, contractAddress } from '@/app/abi'

// export default function Balance() {
//   const [loading, setLoading] = useState(false)
//   const config = useConfig()
//   const { isConnected, address } = useAccount()

//   const {
//     data: balance,
//     isLoading,
//     error,
//     refetch,
//   } = useReadContract({
//     address: contractAddress,
//     abi: abi,
//     functionName: 'balanceOf',
//     args: [address],
//   })

//   const formatBalance = (rawBalance: bigint | undefined) => {
//     if (!rawBalance) return '0'
//     const balanceInEther = Number(rawBalance) / 1e18
//     return balanceInEther.toFixed(4) // Display 4 decimal places
//   }

//   return (
//     <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//       {isConnected && (
//         <div className="space-y-2">
//           <p className="text-sm text-gray-600">
//             Connected address:{' '}
//             <span className="font-mono text-blue-600">{address}</span>
//           </p>
//           <p className="text-lg">
//             <span className="font-bold text-gray-800">Balance:</span>{' '}
//             <span className="font-mono">
//               {isLoading
//                 ? 'Loading...'
//                 : error
//                 ? 'Error retrieving balance'
//                 : formatBalance(balance)}
//             </span>{' '}
//             <span className="text-sm text-gray-600">RKT</span>
//           </p>
//         </div>
//       )}
//     </div>
//   )
// }















// "use client";

// import { abi } from "@/app/abi";
// import {contractAddress} from "@/app/abi";
// import { useState } from "react";
// import { 
//     useAccount,
//     useConfig,
//     useReadContract
//  } from "wagmi";

// export default function Balance(){

//     const [loading,setLoading] = useState("false");
//     const config = useConfig();
//     const { isConnected, address } = useAccount();

//     const {
//         data:balance,
//         isLoading,
//         error,
//         refetch,
//     } = useReadContract({
//         address: contractAddress,
//         abi: abi,
//         functionName: "balanceOf",
//         args: [address],
//     });

//     return(
//         <>
//           {isConnected && (
//             <>
//                 <p>Connected address: {address}</p>
//                 <p>
//                 <span className="font-bold">Balance:</span>{" "}
//                 {isLoading
//                     ? "Loading..."
//                     : error
//                     ? "Error retrieving balance"
//                     : balance?.toString()}
//                 </p>
//             </>
//           )}
//         </>
//     )



// }