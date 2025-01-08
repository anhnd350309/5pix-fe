'use client'

import React, { useState } from 'react'
import { Stage, Layer, Rect, Text, Group } from 'react-konva'

const CanvasEditor = () => {
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
        return {
          ...textBox,
          x: e.target.x(),
          y: e.target.y(),
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

  return (
    <div>
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
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
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
    </div>
  )
}

export default CanvasEditor
