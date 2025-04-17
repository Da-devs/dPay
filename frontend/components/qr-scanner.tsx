"use client"

import { useEffect, useRef, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"

interface QrScannerProps {
  onResult: (result: string) => void
  width?: number
  height?: number
}

export function QrScanner({ onResult, width = 300, height = 300 }: QrScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const containerId = "qr-scanner-container"
    containerRef.current.id = containerId

    // Initialize scanner
    scannerRef.current = new Html5Qrcode(containerId)

    // Start scanning
    startScanner()

    // Cleanup on unmount
    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch((error) => console.error("Error stopping scanner:", error))
      }
    }
  }, [])

  const startScanner = async () => {
    if (!scannerRef.current) return

    setIsScanning(true)
    setError(null)

    try {
      await scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onResult(decodedText)
          if (scannerRef.current) {
            scannerRef.current.stop().catch((error) => console.error("Error stopping scanner:", error))
          }
          setIsScanning(false)
        },
        (errorMessage) => {
          // QR code scanning errors are handled silently
          console.log(errorMessage)
        },
      )
    } catch (err) {
      setError("Camera access denied or not available")
      setIsScanning(false)
      console.error("Error starting scanner:", err)
    }
  }

  return (
    <div className="relative">
      <div ref={containerRef} style={{ width, height }} />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 text-center p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  )
}
