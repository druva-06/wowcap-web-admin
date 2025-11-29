// QR Code generation utility
export const generateQRCode = async (text: string): Promise<string> => {
  // Using a simple QR code generation approach
  // In production, you would use a library like 'qrcode'

  // For now, we'll use a QR code API service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`

  return qrCodeUrl
}

export const downloadQRCode = async (url: string, filename: string) => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = blobUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.error("Failed to download QR code:", error)
  }
}
