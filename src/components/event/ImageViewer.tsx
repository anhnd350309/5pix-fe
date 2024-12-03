'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface ImageViewerProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  extra: string
}

export function ImageViewer({ src, alt, width, height, className, extra }: ImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className={cn('cursor-pointer hover:opacity-80 transition-opacity', className)}>
          <Image src={src} alt={alt} width={width} height={height} className='rounded-lg' />
        </div>
      </DialogTrigger>
      <DialogContent className='max-w-[95vw] max-h-[95vh] w-fit h-fit p-0'>
        <div className='relative'>
          <Image
            src={extra}
            alt={alt}
            width={width} // Doubled for higher resolution
            height={height} // Doubled for higher resolution
            className='rounded-lg'
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
