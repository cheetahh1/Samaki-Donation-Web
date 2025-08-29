"use client"

import { useState } from "react"
import Image from "next/image"

interface SafeImageProps {
  src: string | null
  alt: string
  fallback?: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
}

export function SafeImage({ 
  src, 
  alt, 
  fallback = "/placeholder.svg", 
  className = "",
  fill = false,
  width,
  height,
  sizes
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallback)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallback)
    }
  }

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        onError={handleError}
        priority={false}
      />
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      onError={handleError}
      priority={false}
    />
  )
}
