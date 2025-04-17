"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/hooks/use-wallet"
import { useRouter } from "next/navigation"
import { ArrowRight, Shield } from "lucide-react"
import Image from "next/image"

export default function ConnectPage() {
  const { connect, isConnected } = useWallet()
  const { toast } = useToast()
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async (walletType: string) => {
    setIsConnecting(true)

    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      await connect()

      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      })

      // Redirect to dashboard after successful connection
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  if (isConnected) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Wallet Connected</CardTitle>
            <CardDescription>Your wallet is already connected.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-6">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-center mb-6">You're all set! Your wallet is connected and ready to use.</p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>Connect your wallet to start using dPay</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-between h-16 px-4"
              onClick={() => handleConnect("metamask")}
              disabled={isConnecting}
            >
              <span className="flex items-center">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width={32}
                  height={32}
                  alt="MetaMask"
                  className="mr-3"
                />
                MetaMask
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between h-16 px-4"
              onClick={() => handleConnect("walletconnect")}
              disabled={isConnecting}
            >
              <span className="flex items-center">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width={32}
                  height={32}
                  alt="WalletConnect"
                  className="mr-3"
                />
                WalletConnect
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between h-16 px-4"
              onClick={() => handleConnect("coinbase")}
              disabled={isConnecting}
            >
              <span className="flex items-center">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width={32}
                  height={32}
                  alt="Coinbase Wallet"
                  className="mr-3"
                />
                Coinbase Wallet
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="flex items-center justify-center w-full gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Your wallet is only used to sign transactions</span>
            </div>
            <div className="text-xs text-center text-muted-foreground">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
