"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  address: string
  balance: number
  ensName: string | null
  isConnected: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

export const WalletContext = createContext<WalletContextType>({
  address: "",
  balance: 0,
  ensName: null,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
})

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState(0)
  const [ensName, setEnsName] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  // Check for existing connection on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress")
    if (savedAddress) {
      setAddress(savedAddress)
      setBalance(1250.75) // Mock balance
      setEnsName("johndoe.eth") // Mock ENS name
      setIsConnected(true)
    }
  }, [])

  const connect = async () => {
    // In a real app, this would connect to an actual wallet
    const mockAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"

    setAddress(mockAddress)
    setBalance(1250.75) // Mock balance
    setEnsName("johndoe.eth") // Mock ENS name
    setIsConnected(true)

    // Save connection state
    localStorage.setItem("walletAddress", mockAddress)

    return Promise.resolve()
  }

  const disconnect = () => {
    setAddress("")
    setBalance(0)
    setEnsName(null)
    setIsConnected(false)

    // Clear saved connection state
    localStorage.removeItem("walletAddress")
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        ensName,
        isConnected,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
