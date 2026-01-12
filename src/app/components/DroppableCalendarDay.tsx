import { useDrop } from 'react-dnd';
import { Plus } from 'lucide-react';
import { ReactNode } from 'react';

interface DroppableCalendarDayProps {
    day: number;
    isToday: boolean;
    specialDay?: {
        name: string;
        emoji: string;
        type: 'financial' | 'holiday' | 'fun';
    };
    onDrop: (post: any) => void;
    onAddPost: () => void;
    children: ReactNode;
    canAddMore: boolean;
}

export function DroppableCalendarDay({
    day,
    isToday,
    specialDay,
    onDrop,
    onAddPost,
    children,
    canAddMore,
}: DroppableCalendarDayProps) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'POST',
        drop: (item: { post: any }) => onDrop(item.post),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`border rounded-lg p-2 aspect-square min-h-[140px] transition-colors ${isOver
                    ? 'border-[#485e27] bg-green-100 ring-2 ring-[#485e27] ring-offset-1'
                    : isToday
                        ? 'border-[#485e27] bg-green-50'
                        : specialDay
                            ? 'border-amber-300 bg-amber-50/30'
                            : 'border-slate-200 bg-white hover:border-[#485e27]'
                }`}
        >
            <div className="flex items-start justify-between mb-1">
                <div className={`text-sm ${isToday ? '' : 'text-slate-700'}`}>{day}</div>
                {specialDay && (
                    <div
                        className={`text-lg leading-none ${specialDay.type === 'financial'
                                ? 'bg-green-100 px-1 rounded'
                                : specialDay.type === 'holiday'
                                    ? 'bg-red-100 px-1 rounded'
                                    : 'bg-blue-100 px-1 rounded'
                            }`}
                        title={specialDay.name}
                    >
                        {specialDay.emoji}
                    </div>
                )}
            </div>
            {specialDay && (
                <div
                    className={`text-xs mb-2 px-1 py-0.5 rounded ${specialDay.type === 'financial'
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : specialDay.type === 'holiday'
                                ? 'bg-red-100 text-red-800 border border-red-200'
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                >
                    {specialDay.name}
                </div>
            )}
            <div className="space-y-1 overflow-y-auto max-h-[70px]">
                {children}
                {canAddMore && (
                    <button
                        onClick={onAddPost}
                        className="w-full border-2 border-dashed border-slate-300 rounded p-1.5 hover:border-[#485e27] hover:bg-green-50/50 transition-colors flex items-center justify-center gap-1 text-slate-500 hover:text-[#485e27]"
                    >
                        <Plus className="h-3 w-3" />
                        <span className="text-xs">Add Post</span>
                    </button>
                )}
            </div>
        </div>
    );
}
