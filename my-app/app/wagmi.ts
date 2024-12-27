import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,rootstockTestnet,
} from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    rootstockTestnet,
  ],
  ssr: true,
});