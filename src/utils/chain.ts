import { base, baseSepolia } from 'wagmi/chains'

// export const chain = process.env.NODE_ENV === 'development' ? baseSepolia : process.env.NODE_ENV === 'production' ? base : baseSepolia;  
export const chain = process.env.NODE_ENV === 'development' ? baseSepolia : process.env.NODE_ENV === 'production' ? baseSepolia : baseSepolia;  

  

