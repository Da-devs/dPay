"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/hooks/use-wallet"
import { Camera, Download, QrCode, Share2, Upload } from "lucide-react"
import QRCode from "@/components/qr-code"
import { QrScanner } from "@/components/qr-scanner"

export default function QrPage() {
  const { address, isConnected } = useWallet()
  const { toast } = useToast()
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleScanResult = (result: string) => {
    setScanResult(result)
    setIsScanning(false)

    // Check if it's a valid dPay URL
    if (result.startsWith("https://dpay.app/pay")) {
      toast({
        title: "QR Code Scanned",
        description: "Payment details detected. Redirecting to payment page...",
      })

      // In a real app, we would parse the URL and redirect to the payment page
      setTimeout(() => {
        window.location.href = "/send"
      }, 1500)
    } else {
      toast({
        title: "Invalid QR Code",
        description: "This QR code doesn't contain valid payment information.",
        variant: "destructive",
      })
    }
  }

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>Please connect your wallet to use QR features.</CardDescription>
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
            <CardTitle>QR Code</CardTitle>
            <CardDescription>Generate or scan QR codes for payments</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="generate" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="generate">Generate</TabsTrigger>
                <TabsTrigger value="scan">Scan</TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="flex flex-col items-center space-y-6">
                <div className="p-4 bg-white rounded-lg">
                  <QRCode value={`https://dpay.app/pay?to=${address}`} size={250} />
                </div>

                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  This QR code contains your wallet address. Share it with others to receive payments.
                </p>
              </TabsContent>

              <TabsContent value="scan" className="space-y-6">
                {isScanning ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-full max-w-[300px] aspect-square overflow-hidden rounded-lg">
                      <QrScanner onResult={handleScanResult} />
                    </div>
                    <Button variant="outline" onClick={() => setIsScanning(false)}>
                      Cancel
                    </Button>
                  </div>
                ) : scanResult ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 border rounded-lg w-full">
                      <h3 className="font-medium mb-2">Scan Result:</h3>
                      <p className="text-sm break-all">{scanResult}</p>
                    </div>
                    <div className="flex gap-2 w-full">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setScanResult(null)
                          setIsScanning(true)
                        }}
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Scan Again
                      </Button>
                      <Button
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        onClick={() => {
                          window.location.href = "/send"
                        }}
                      >
                        Proceed to Payment
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-6 py-8">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                    <div className="text-center">
                      <h3 className="font-medium mb-1">Scan a QR Code</h3>
                      <p className="text-sm text-muted-foreground">Scan a dPay QR code to make a payment</p>
                    </div>
                    <div className="flex gap-2 w-full max-w-xs">
                      <Button variant="outline" className="flex-1" onClick={() => setIsScanning(true)}>
                        <Camera className="mr-2 h-4 w-4" />
                        Camera
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
