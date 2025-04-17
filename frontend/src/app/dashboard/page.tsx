"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/hooks/use-wallet"
import { Send, QrCode, ArrowDownUp, Clock, Wallet } from "lucide-react"
import Link from "next/link"
import { TransactionList } from "@/components/transaction-list"
import { BalanceCard } from "@/components/balance-card"
import { mockTransactions } from "@/lib/mock-data"

export default function Dashboard() {
  const { address, balance, isConnected } = useWallet()
  const { toast } = useToast()
  const [transactions, setTransactions] = useState(mockTransactions)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>Please connect your wallet to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/connect">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Connect Wallet</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BalanceCard balance={balance} address={address} isLoading={isLoading} />

        <Card className="col-span-1 md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link href="/send">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                <Send className="h-6 w-6 text-purple-600" />
                <span>Send</span>
              </Button>
            </Link>
            <Link href="/receive">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                <ArrowDownUp className="h-6 w-6 text-purple-600" />
                <span>Receive</span>
              </Button>
            </Link>
            <Link href="/qr">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                <QrCode className="h-6 w-6 text-purple-600" />
                <span>QR Code</span>
              </Button>
            </Link>
            <Link href="/history">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                <Clock className="h-6 w-6 text-purple-600" />
                <span>History</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <ArrowDownUp className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Payment Received</p>
                  <p className="text-xs text-muted-foreground">You received 50 USDC from @alice</p>
                </div>
                <div className="text-xs text-muted-foreground">2m ago</div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <Wallet className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Wallet Connected</p>
                  <p className="text-xs text-muted-foreground">Your wallet was successfully connected</p>
                </div>
                <div className="text-xs text-muted-foreground">10m ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your recent payment activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="received">Received</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <TransactionList transactions={transactions} isLoading={isLoading} />
              </TabsContent>
              <TabsContent value="sent">
                <TransactionList transactions={transactions.filter((t) => t.type === "sent")} isLoading={isLoading} />
              </TabsContent>
              <TabsContent value="received">
                <TransactionList
                  transactions={transactions.filter((t) => t.type === "received")}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
