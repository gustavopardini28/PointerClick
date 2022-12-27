import React, { useState } from 'react'
import './App.css'

interface ClickedProps {
  clientX: number,
  clientY: number
}

function App() {
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([])
  const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([])
 
  function getCordanates(e:React.MouseEvent<HTMLElement>) {
    const {clientX,clientY} = e

    setClickedPoints([...clickedPoints,{clientX,clientY}])
     
 }

 function handleRedo () {
  const newUndoPoints = [...undoPoints]
  const redoPoint = newUndoPoints.pop()
  setUndoPoints(newUndoPoints)
  if(!redoPoint) return
  setClickedPoints([...clickedPoints,redoPoint])
 }

 function handleUndo () {
  const newClickedPoints = [...clickedPoints]
  const undoPoint = newClickedPoints.pop()
  setClickedPoints(newClickedPoints)
  if(!undoPoint) return
  setUndoPoints([...undoPoints,undoPoint])
 }

  return (
    <>
    <button onClick={handleUndo}>
      Undo
    </button>
    <button onClick={handleRedo}>
      Redo
    </button>
    <div className="App" onClick={getCordanates}>
      {clickedPoints.map((clickedPoints,index) => {
        return (
          <div 
            key={index}
            style={{ 
              left: clickedPoints.clientX - 7,
              top: clickedPoints.clientY - 6,
              position: 'absolute',
              borderRadius: '50%',
              background: 'red',
              width: '10px',
              height: '10px',
              }}>                
          </div>
        )
      })}
    </div>
    </>
  )
}

export default App
