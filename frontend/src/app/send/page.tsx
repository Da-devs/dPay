"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/hooks/use-wallet"
import { ArrowRight, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockContacts } from "@/lib/mock-data"

export default function SendPage() {
  const { address, balance, isConnected } = useWallet()
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [note, setNote] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const filteredContacts = searchQuery
    ? mockContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.username.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : mockContacts

  const handleSend = async () => {
    if (!amount || !recipient) {
      toast({
        title: "Error",
        description: "Please enter an amount and recipient",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate transaction processing
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Payment Sent",
        description: `You sent ${amount} USDC to ${recipient}`,
      })

      // Reset form
      setAmount("")
      setRecipient("")
      setNote("")
      setSelectedContact(null)
    }, 2000)
  }

  const handleContactSelect = (contact: (typeof mockContacts)[0]) => {
    setRecipient(contact.address)
    setSelectedContact(contact.id)
  }

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>Please connect your wallet to send payments.</CardDescription>
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
            <CardTitle>Send Payment</CardTitle>
            <CardDescription>Send USDC to another wallet or username</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="address" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="username">Username</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
              </TabsList>

              <TabsContent value="address" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient-address">Recipient Address</Label>
                  <Input
                    id="recipient-address"
                    placeholder="0x..."
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="username" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient-username">Recipient Username</Label>
                  <Input
                    id="recipient-username"
                    placeholder="@username"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="contacts" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search-contacts">Search Contacts</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search-contacts"
                      placeholder="Search by name or username"
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="mt-4 space-y-2 max-h-[200px] overflow-y-auto">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                          selectedContact === contact.id ? "bg-purple-100 dark:bg-purple-900/30" : "hover:bg-muted"
                        }`}
                        onClick={() => handleContactSelect(contact)}
                      >
                        <Avatar>
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">{contact.username}</p>
                        </div>
                        {selectedContact === contact.id && <div className="h-2 w-2 rounded-full bg-purple-600" />}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="token">Token</Label>
                  <Select defaultValue="usdc">
                    <SelectTrigger>
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                      <SelectItem value="dai">DAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="amount">Amount</Label>
                    <span className="text-xs text-muted-foreground">Balance: {balance} USDC</span>
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Input
                    id="note"
                    placeholder="What's this for?"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              onClick={handleSend}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!amount || !recipient || isLoading}
            >
              {isLoading ? "Processing..." : "Send Payment"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Transaction fees will be calculated before confirmation
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
