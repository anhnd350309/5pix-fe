'use client'
import React, { useEffect, useRef } from 'react'
import Croppie from 'croppie'
import 'croppie/croppie.css'
// import './ResultImage.css' // Import the CSS file

interface CroppieComponentProps {
  imagePath: string
  frameUrl: string
  onSave: (croppedImage: string) => void
  frameData?: string
}

const ResultImage: React.FC<CroppieComponentProps> = ({
  imagePath,
  frameUrl,
  onSave,
  frameData,
}) => {
  const croppieRef = useRef<HTMLDivElement>(null)
  const croppieInstance = useRef<Croppie | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (croppieRef.current) {
      croppieInstance.current = new Croppie(croppieRef.current, {
        viewport: { width: window.innerWidth * 0.9, height: window.innerWidth * 0.5 }, // Set the viewport type to 'square' or 'circle'
        boundary: { width: window.innerWidth * 0.9, height: window.innerWidth * 0.5 },
        showZoomer: false,
        enableResize: false,
        enableOrientation: true,
        // background: true, // Enable background
      })

      croppieInstance.current.bind({
        url: imagePath,
      })
    }
    return () => {
      if (croppieInstance.current) {
        croppieInstance.current.destroy()
        croppieInstance.current = null
      }
    }
  }, [imagePath])

  const handleSave = async () => {
    if (croppieInstance.current && canvasRef.current) {
      const croppedData = await croppieInstance.current.result({
        type: 'base64',
        size: 'viewport',
      })

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      if (ctx) {
        const croppedImage = new Image()
        croppedImage.src = croppedData as string

        croppedImage.onload = () => {
          canvas.width = croppedImage.width
          canvas.height = croppedImage.height

          // Draw the cropped image on the canvas
          ctx.drawImage(croppedImage, 0, 0)

          // Draw the frame on top of the cropped image
          const frameImage = new Image()
          frameImage.src = frameData as string

          frameImage.onload = () => {
            ctx.drawImage(frameImage, 0, 0, croppedImage.width, croppedImage.height)

            // Get the combined image as a base64 string
            const combinedImage = canvas.toDataURL('image/png')
            onSave(combinedImage)
          }
        }
      }
    }
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div ref={croppieRef} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button onClick={handleSave}>Save Image</button>
      {frameData && (
        <img
          src={frameData}
          alt='Frame'
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            top: 0,
            left: 0,
            width: '100%',
            height: '96%',
            zIndex: 1,
          }}
        />
        // <div
        //   style={{
        //     position: 'absolute',
        //     top: '0',
        //     left: '0',
        //     width: '90%',
        //     height: '85%',
        //     pointerEvents: 'none',
        //     backgroundImage: `url(${frameData})`,
        //     backgroundSize: 'cover',
        //     zIndex: 1,
        //   }}
        //   className={frameData}
        // />
      )}
    </div>
  )
}

export default ResultImage
