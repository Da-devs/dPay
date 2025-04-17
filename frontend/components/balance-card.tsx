"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatAddress } from "@/lib/utils"
import { Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface BalanceCardProps {
  balance: number
  address: string
  isLoading?: boolean
}

export function BalanceCard({ balance, address, isLoading = false }: BalanceCardProps) {
  const { toast } = useToast()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  const openExplorer = () => {
    window.open(`https://polygonscan.com/address/${address}`, "_blank")
  }

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy address</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={openExplorer}>
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">View on explorer</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-[200px]" />
            <Skeleton className="h-4 w-[160px]" />
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold tracking-tight">{balance.toFixed(2)}</span>
              <span className="ml-1 text-xl">USDC</span>
            </div>
            <div className="text-xs text-muted-foreground">{formatAddress(address)}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
