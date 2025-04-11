import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ID = string

export type Column = {
  id: ID
  title: string
}

export type Task = {
  id: ID
  columnId: ID
  content: string
  labels?: string[]
  assignees?: string[]
  dueDate?: string
  comments?: number
  attachments?: number
}

interface BoardState {
  columns: Column[]
  tasks: Task[]
  addColumn: (title: string) => void
  addTask: (columnId: ID, content: string) => void
  moveTask: (taskId: ID, toColumnId: ID) => void
  moveColumn: (fromIndex: number, toIndex: number) => void
}

export const useBoard = create<BoardState>()(
  persist(
    (set) => ({
      columns: [
        { id: '1', title: 'Up Next' },
        { id: '2', title: 'For review' },
        { id: '3', title: 'Completed' },
        { id: '4', title: 'Denied' },
      ],
      tasks: [
        {
          id: '1',
          columnId: '1',
          content: 'Review project requirements',
          comments: 4,
        },
        {
          id: '2',
          columnId: '2',
          content: 'Design system implementation',
          dueDate: 'Feb 5',
          attachments: 1,
        },
        {
          id: '3',
          columnId: '3',
          content: 'Update documentation',
          dueDate: 'Dec 5',
          comments: 2,
        },
      ],
      addColumn: (title) =>
        set((state) => ({
          columns: [...state.columns, { id: Date.now().toString(), title }],
        })),
      addTask: (columnId, content) =>
        set((state) => ({
          tasks: [...state.tasks, { id: Date.now().toString(), columnId, content }],
        })),
      moveTask: (taskId, toColumnId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, columnId: toColumnId } : task
          ),
        })),
      moveColumn: (fromIndex, toIndex) =>
        set((state) => {
          const newColumns = [...state.columns]
          const [removed] = newColumns.splice(fromIndex, 1)
          newColumns.splice(toIndex, 0, removed)
          return { columns: newColumns }
        }),
    }),
    {
      name: 'kanban-storage',
      skipHydration: true,
    }
  )
) 