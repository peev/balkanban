'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import type { Column as ColumnType, Task as TaskType } from '@/lib/store'
import { Task } from './Task'
import { useState } from 'react'
import { useBoard } from '@/lib/store'

interface ColumnProps {
  column: ColumnType
  tasks: TaskType[]
}

export function Column({ column, tasks }: ColumnProps) {
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [cardContent, setCardContent] = useState('')
  const { addTask } = useBoard()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleAddCard = () => {
    if (cardContent.trim()) {
      addTask(column.id, cardContent)
      setCardContent('')
      setIsAddingCard(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAddCard()
    } else if (e.key === 'Escape') {
      setIsAddingCard(false)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`kanban-column ${isDragging ? 'opacity-50' : ''} touch-none`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-medium">{column.title}</h2>
        <button className="p-1 hover:bg-gray-700 rounded active:bg-gray-600">
          <EllipsisHorizontalIcon className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      {isAddingCard ? (
        <div className="mt-2">
          <textarea
            className="w-full p-2 rounded bg-card-bg text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a title for this card..."
            value={cardContent}
            onChange={(e) => setCardContent(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            rows={3}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAddCard}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors active:bg-blue-700"
            >
              Add card
            </button>
            <button
              onClick={() => setIsAddingCard(false)}
              className="text-gray-400 hover:text-white px-3 py-1 rounded text-sm transition-colors active:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingCard(true)}
          className="w-full text-left mt-2 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded text-sm active:bg-gray-600"
        >
          + Add a card
        </button>
      )}
    </div>
  )
} 