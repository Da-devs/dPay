import { Skeleton } from "@/components/ui/skeleton"
import { formatAddress, formatAmount, formatDate } from "@/lib/utils"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

interface Transaction {
  id: string
  type: "sent" | "received"
  amount: number
  token: string
  from: string
  to: string
  timestamp: string
  status: "completed" | "pending" | "failed"
  description: string
}

interface TransactionListProps {
  transactions: Transaction[]
  isLoading?: boolean
}

export function TransactionList({ transactions, isLoading = false }: TransactionListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-2">No transactions found</p>
        <p className="text-sm text-muted-foreground">When you make or receive payments, they will appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center gap-4 p-4 rounded-lg border">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              transaction.type === "received"
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-orange-100 dark:bg-orange-900/30"
            }`}
          >
            {transaction.type === "received" ? (
              <ArrowDownLeft className={`h-6 w-6 text-green-600 dark:text-green-400`} />
            ) : (
              <ArrowUpRight className={`h-6 w-6 text-orange-600 dark:text-orange-400`} />
            )}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">
                {transaction.type === "received" ? "Received from" : "Sent to"}{" "}
                {transaction.type === "received" ? formatAddress(transaction.from) : formatAddress(transaction.to)}
              </p>
              <p
                className={`font-medium ${
                  transaction.type === "received"
                    ? "text-green-600 dark:text-green-400"
                    : "text-orange-600 dark:text-orange-400"
                }`}
              >
                {transaction.type === "received" ? "+" : "-"}
                {formatAmount(transaction.amount)} {transaction.token}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>{transaction.description}</p>
              <p>{formatDate(transaction.timestamp)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
