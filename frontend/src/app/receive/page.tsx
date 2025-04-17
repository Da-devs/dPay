"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/hooks/use-wallet"
import { Copy, Download, QrCode, Share2 } from "lucide-react"
import QRCode from "@/components/qr-code"

export default function ReceivePage() {
  const { address, ensName, isConnected } = useWallet()
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [username, setUsername] = useState("@johndoe")

  const paymentLink = `https://dpay.app/pay?to=${address}${amount ? `&amount=${amount}` : ""}${note ? `&note=${encodeURIComponent(note)}` : ""}`

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: message,
    })
  }

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>Please connect your wallet to receive payments.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">Connect Wallet</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Receive Payment</CardTitle>
            <CardDescription>Share your payment details with others</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="qr" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="qr">QR Code</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="username">Username</TabsTrigger>
              </TabsList>

              <TabsContent value="qr" className="flex flex-col items-center space-y-6">
                <div className="p-4 bg-white rounded-lg">
                  <QRCode value={paymentLink} size={200} />
                </div>

                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="qr-amount">Amount (Optional)</Label>
                    <Input
                      id="qr-amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qr-note">Note (Optional)</Label>
                    <Input
                      id="qr-note"
                      placeholder="What's this for?"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => copyToClipboard(paymentLink, "Payment link copied to clipboard")}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="address" className="space-y-6">
                <div className="space-y-2">
                  <Label>Your Wallet Address</Label>
                  <div className="flex">
                    <Input readOnly value={address} className="rounded-r-none" />
                    <Button
                      variant="secondary"
                      className="rounded-l-none"
                      onClick={() => copyToClipboard(address, "Address copied to clipboard")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {ensName && (
                  <div className="space-y-2">
                    <Label>Your ENS Name</Label>
                    <div className="flex">
                      <Input readOnly value={ensName} className="rounded-r-none" />
                      <Button
                        variant="secondary"
                        className="rounded-l-none"
                        onClick={() => copyToClipboard(ensName, "ENS name copied to clipboard")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
                  <QrCode className="h-12 w-12 text-purple-600" />
                  <p className="text-center text-sm text-muted-foreground">
                    You can also share your QR code for quick payments
                  </p>
                  <Button variant="outline">View QR Code</Button>
                </div>
              </TabsContent>

              <TabsContent value="username" className="space-y-6">
                <div className="space-y-2">
                  <Label>Your Username</Label>
                  <div className="flex">
                    <Input readOnly value={username} className="rounded-r-none" />
                    <Button
                      variant="secondary"
                      className="rounded-l-none"
                      onClick={() => copyToClipboard(username, "Username copied to clipboard")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your dPay username makes it easy for others to send you payments
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
                  <QrCode className="h-12 w-12 text-purple-600" />
                  <p className="text-center text-sm text-muted-foreground">
                    You can also share your QR code for quick payments
                  </p>
                  <Button variant="outline">View QR Code</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
              Payments will be sent directly to your connected wallet
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
