import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ChatBubbleLeftIcon, PaperClipIcon, CalendarIcon } from '@heroicons/react/24/outline'
import type { Task } from '@/lib/store'

interface TaskProps {
  task: Task
}

export function Task({ task }: TaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`kanban-card ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="text-white text-sm">{task.content}</div>
      <div className="flex items-center gap-4 mt-2 text-gray-400">
        {task.dueDate && (
          <div className="flex items-center gap-1 text-xs">
            <CalendarIcon className="w-4 h-4" />
            <span>{task.dueDate}</span>
          </div>
        )}
        {task.comments && (
          <div className="flex items-center gap-1 text-xs">
            <ChatBubbleLeftIcon className="w-4 h-4" />
            <span>{task.comments}</span>
          </div>
        )}
        {task.attachments && (
          <div className="flex items-center gap-1 text-xs">
            <PaperClipIcon className="w-4 h-4" />
            <span>{task.attachments}</span>
          </div>
        )}
      </div>
    </div>
  )
} 