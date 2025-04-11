'use client'

import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useBoard } from '@/lib/store'
import { Column } from './Column'
import { useState, useEffect } from 'react'

export function Board() {
  const { columns, tasks, moveTask, moveColumn } = useBoard()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = ({ active }: any) => {
    setActiveId(active.id)
  }

  const handleDragEnd = ({ active, over }: any) => {
    if (!over) return

    const isColumn = columns.find((col) => col.id === active.id)
    
    if (isColumn) {
      const activeIndex = columns.findIndex((col) => col.id === active.id)
      const overIndex = columns.findIndex((col) => col.id === over.id)
      moveColumn(activeIndex, overIndex)
    } else {
      const task = tasks.find((t) => t.id === active.id)
      const overColumn = columns.find((col) => col.id === over.id)
      if (task && overColumn && task.columnId !== overColumn.id) {
        moveTask(task.id, overColumn.id)
      }
    }
    
    setActiveId(null)
  }

  if (!mounted) return null

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columns.map((col) => col.id)}
            strategy={horizontalListSortingStrategy}
          >
            {columns.map((column) => (
              <div key={column.id} className="snap-start">
                <Column
                  column={column}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                />
              </div>
            ))}
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <div className="w-72">
                <Column
                  column={columns.find((col) => col.id === activeId)!}
                  tasks={tasks.filter((task) => task.columnId === activeId)}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
        <div className="snap-start">
          <button className="flex items-center justify-center w-72 h-12 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
            + Add another list
          </button>
        </div>
      </div>
    </div>
  )
} 