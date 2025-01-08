'use client'

import React, { useState } from 'react'
import { Stage, Layer, Rect, Text, Group, Image } from 'react-konva'
import useImage from 'use-image'
import { Button } from '../ui/button'
const CanvasEditor = () => {
  const [image] = useImage('/assets/images/preview.webp') // Replace with your image path
  const imageWidth = 800 // Set your image width
  const imageHeight = 600 // Set your image height
  const [textBoxes, setTextBoxes] = useState([
    {
      id: 1,
      x: 50,
      y: 50,
      text: 'Hello',
      fontSize: 20,
      fill: 'black',
      width: 100,
      height: 30,
      align: 'left',
    },
    {
      id: 2,
      x: 200,
      y: 200,
      text: 'World',
      fontSize: 20,
      fill: 'black',
      width: 100,
      height: 30,
      align: 'left',
    },
  ])
  const [selectedTextBoxId, setSelectedTextBoxId] = useState<number | null>(null)
  const [fontSize, setFontSize] = useState<number>(20)
  const [align, setAlign] = useState<string>('left')

  const handleTextDragMove = (e: any) => {
    const id = e.target.id()
    const updatedTextBoxes = textBoxes.map((textBox) => {
      if (textBox.id === parseInt(id)) {
        const newX = Math.max(0, Math.min(e.target.x(), imageWidth - textBox.width))
        const newY = Math.max(0, Math.min(e.target.y(), imageHeight - textBox.height))
        return {
          ...textBox,
          x: newX,
          y: newY,
        }
      }
      return textBox
    })
    setTextBoxes(updatedTextBoxes)
  }

  const handleTextClick = (id: number) => {
    const textBox = textBoxes.find((tb) => tb.id === id)
    if (textBox) {
      setSelectedTextBoxId(id)
      setFontSize(textBox.fontSize)
      setAlign(textBox.align)
    }
  }

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value)
    setFontSize(newSize)
    const updatedTextBoxes = textBoxes.map((textBox) => {
      if (textBox.id === selectedTextBoxId) {
        return {
          ...textBox,
          fontSize: newSize,
        }
      }
      return textBox
    })
    setTextBoxes(updatedTextBoxes)
  }

  const handleAlignChange = (newAlign: string) => {
    setAlign(newAlign)
    const updatedTextBoxes = textBoxes.map((textBox) => {
      if (textBox.id === selectedTextBoxId) {
        return {
          ...textBox,
          align: newAlign,
        }
      }
      return textBox
    })
    setTextBoxes(updatedTextBoxes)
  }
  const save = () => {
    // log position of each text box,log aligh and font size

    textBoxes.forEach((textBox) => {
      console.log(
        `TextBox ${textBox.id} position: x=${textBox.x}, y=${textBox.y}, align=${textBox.align}, fontSize=${textBox.fontSize}`,
      )
    })
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        {selectedTextBoxId !== null && (
          <div>
            <label>
              Font Size:
              <input type='number' value={fontSize} onChange={handleFontSizeChange} />
            </label>
            <div>
              <button onClick={() => handleAlignChange('left')}>Left</button>
              <button onClick={() => handleAlignChange('center')}>Center</button>
              <button onClick={() => handleAlignChange('right')}>Right</button>
            </div>
          </div>
        )}
      </div>
      <Stage width={imageWidth} height={imageHeight}>
        <Layer>
          <Image image={image} width={imageWidth} height={imageHeight} />
          {textBoxes.map((textBox) => (
            <Group
              key={textBox.id}
              id={textBox.id.toString()}
              x={textBox.x}
              y={textBox.y}
              draggable
              onDragMove={handleTextDragMove}
              onClick={() => handleTextClick(textBox.id)}
            >
              <Rect
                x={0}
                y={0}
                width={textBox.width}
                height={textBox.height}
                stroke='black'
                strokeWidth={1}
              />
              <Text
                x={0}
                y={0}
                text={textBox.text}
                fontSize={textBox.fontSize}
                fill={textBox.fill}
                width={textBox.width}
                height={textBox.height}
                align={textBox.align}
              />
            </Group>
          ))}
        </Layer>
      </Stage>
      <Button onClick={save}>Save</Button>
    </div>
  )
}

export default CanvasEditor
