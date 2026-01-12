import { useDrag } from 'react-dnd';
import { Edit2, X, CheckCircle2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface DraggablePostItemProps {
    post: {
        id: string;
        type: string;
        title: string;
        description: string;
        scheduledDate: Date;
        platforms: string[];
    };
    postType: {
        label: string;
        color: string;
        icon: LucideIcon;
        textColor: string;
        bgLight: string;
        borderColor: string;
    };
    hasProgress: boolean;
    onEdit: () => void;
    onDelete: () => void;
    onViewProgress: () => void;
}

export function DraggablePostItem({
    post,
    postType,
    hasProgress,
    onEdit,
    onDelete,
    onViewProgress
}: DraggablePostItemProps) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'POST',
        item: { post },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const Icon = postType.icon;

    return (
        <div
            ref={drag}
            className={`${postType.bgLight} ${postType.borderColor} border rounded p-1.5 hover:shadow-sm transition-shadow group relative cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''
                }`}
            title={post.description}
        >
            <div className="flex items-start justify-between gap-1">
                <div className="flex items-start gap-1 flex-1 min-w-0" onClick={onViewProgress}>
                    <Icon className={`h-3 w-3 ${postType.textColor} flex-shrink-0 mt-0.5`} />
                    <span className="text-xs text-slate-700 line-clamp-2 leading-tight cursor-pointer">
                        {post.title}
                    </span>
                    {hasProgress && (
                        <CheckCircle2 className="h-3 w-3 text-green-600 flex-shrink-0" />
                    )}
                </div>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                        className="flex-shrink-0 hover:scale-110 transition-transform"
                        title="Edit post"
                    >
                        <Edit2 className="h-3 w-3 text-blue-600 hover:text-blue-800" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="flex-shrink-0 hover:scale-110 transition-transform"
                        title="Delete post"
                    >
                        <X className="h-3 w-3 text-red-600 hover:text-red-800" />
                    </button>
                </div>
            </div>
        </div>
    );
}
