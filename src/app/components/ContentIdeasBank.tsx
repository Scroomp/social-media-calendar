import { useState } from 'react';
import { Lightbulb, Plus, X, Video, Image as ImageIcon, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ContentIdea {
    id: string;
    category: 'video' | 'photo' | 'graphic' | 'copy' | 'other';
    title: string;
    description: string;
    createdDate: Date;
}

interface ContentIdeasBankProps {
    ideas: ContentIdea[];
    onIdeasChange: (ideas: ContentIdea[]) => void;
}

const IDEA_CATEGORIES = {
    video: {
        label: 'Video Idea',
        icon: Video,
        color: 'bg-red-100',
        textColor: 'text-red-700',
        borderColor: 'border-red-200'
    },
    photo: {
        label: 'Photo Set',
        icon: ImageIcon,
        color: 'bg-blue-100',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200'
    },
    graphic: {
        label: 'Graphic Design',
        icon: FileText,
        color: 'bg-purple-100',
        textColor: 'text-purple-700',
        borderColor: 'border-purple-200'
    },
    copy: {
        label: 'Copy/Caption',
        icon: FileText,
        color: 'bg-green-100',
        textColor: 'text-green-700',
        borderColor: 'border-green-200'
    },
    other: {
        label: 'Other',
        icon: Lightbulb,
        color: 'bg-amber-100',
        textColor: 'text-amber-700',
        borderColor: 'border-amber-200'
    }
};

export default function ContentIdeasBank({ ideas, onIdeasChange }: ContentIdeasBankProps) {
    const [isAddingIdea, setIsAddingIdea] = useState(false);
    const [newIdeaCategory, setNewIdeaCategory] = useState<keyof typeof IDEA_CATEGORIES | ''>('');
    const [newIdeaTitle, setNewIdeaTitle] = useState('');
    const [newIdeaDescription, setNewIdeaDescription] = useState('');
    const [expandedIdea, setExpandedIdea] = useState<string | null>(null);

    const handleAddIdea = () => {
        if (newIdeaCategory && newIdeaTitle && newIdeaDescription) {
            const newIdea: ContentIdea = {
                id: Date.now().toString(),
                category: newIdeaCategory,
                title: newIdeaTitle,
                description: newIdeaDescription,
                createdDate: new Date()
            };
            onIdeasChange([...ideas, newIdea]);
            setIsAddingIdea(false);
            setNewIdeaCategory('');
            setNewIdeaTitle('');
            setNewIdeaDescription('');
        }
    };

    const deleteIdea = (ideaId: string) => {
        onIdeasChange(ideas.filter(i => i.id !== ideaId));
    };

    const groupedIdeas = {
        video: ideas.filter(i => i.category === 'video'),
        photo: ideas.filter(i => i.category === 'photo'),
        graphic: ideas.filter(i => i.category === 'graphic'),
        copy: ideas.filter(i => i.category === 'copy'),
        other: ideas.filter(i => i.category === 'other')
    };

    return (
        <Card className="p-6 bg-white border-2 border-[#485e27]/20">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Lightbulb className="h-6 w-6 text-[#485e27]" />
                    <div>
                        <h3>Content Ideas Bank</h3>
                        <p className="text-sm text-slate-600">
                            Brainstorm and store creative ideas before scheduling them
                        </p>
                    </div>
                </div>
                <Badge variant="outline" className="text-[#485e27] border-[#485e27]">
                    {ideas.length} {ideas.length === 1 ? 'idea' : 'ideas'}
                </Badge>
            </div>

            {/* Add New Idea Form */}
            {isAddingIdea ? (
                <Card className="p-4 mb-4 border-2 border-dashed border-[#485e27]">
                    <h4 className="mb-3">Add New Idea</h4>
                    <div className="space-y-3">
                        <div>
                            <Label htmlFor="ideaCategory">Category</Label>
                            <Select
                                value={newIdeaCategory}
                                onValueChange={(value) => setNewIdeaCategory(value as keyof typeof IDEA_CATEGORIES)}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(IDEA_CATEGORIES).map(([key, cat]) => {
                                        const Icon = cat.icon;
                                        return (
                                            <SelectItem key={key} value={key}>
                                                <div className="flex items-center gap-2">
                                                    <Icon className={`h-4 w-4 ${cat.textColor}`} />
                                                    <span>{cat.label}</span>
                                                </div>
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="ideaTitle">Idea Title</Label>
                            <Input
                                id="ideaTitle"
                                value={newIdeaTitle}
                                onChange={(e) => setNewIdeaTitle(e.target.value)}
                                placeholder="e.g., 'Behind the scenes branch tour video'"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="ideaDescription">Description</Label>
                            <Textarea
                                id="ideaDescription"
                                value={newIdeaDescription}
                                onChange={(e) => setNewIdeaDescription(e.target.value)}
                                placeholder="Describe the idea in detail, including any specific shots, angles, or concepts you want to capture..."
                                className="mt-1 min-h-[100px]"
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button
                                onClick={handleAddIdea}
                                disabled={!newIdeaCategory || !newIdeaTitle || !newIdeaDescription}
                                className="bg-[#485e27] hover:bg-[#3a4a1f] text-white"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Idea
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsAddingIdea(false);
                                    setNewIdeaCategory('');
                                    setNewIdeaTitle('');
                                    setNewIdeaDescription('');
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Card>
            ) : (
                <Button
                    onClick={() => setIsAddingIdea(true)}
                    variant="outline"
                    className="w-full mb-4 border-dashed border-2 border-[#485e27] text-[#485e27] hover:bg-green-50"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Idea
                </Button>
            )}

            {/* Ideas Grid */}
            <div className="space-y-4">
                {Object.entries(groupedIdeas).map(([category, categoryIdeas]) => {
                    if (categoryIdeas.length === 0) return null;
                    const categoryInfo = IDEA_CATEGORIES[category as keyof typeof IDEA_CATEGORIES];
                    const Icon = categoryInfo.icon;

                    return (
                        <div key={category}>
                            <div className="flex items-center gap-2 mb-2">
                                <Icon className={`h-4 w-4 ${categoryInfo.textColor}`} />
                                <h4 className="text-sm">{categoryInfo.label}s ({categoryIdeas.length})</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {categoryIdeas.map((idea) => (
                                    <Card
                                        key={idea.id}
                                        className={`p-3 ${categoryInfo.color} border ${categoryInfo.borderColor} hover:shadow-md transition-shadow group`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Icon className={`h-4 w-4 ${categoryInfo.textColor}`} />
                                                <Badge variant="secondary" className="text-xs">
                                                    {categoryInfo.label}
                                                </Badge>
                                            </div>
                                            <button
                                                onClick={() => deleteIdea(idea.id)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Delete idea"
                                            >
                                                <X className="h-4 w-4 text-red-600 hover:text-red-800" />
                                            </button>
                                        </div>

                                        <h5 className="mb-2 text-slate-900">{idea.title}</h5>

                                        <p className={`text-sm text-slate-700 mb-3 ${expandedIdea === idea.id ? '' : 'line-clamp-2'
                                            }`}>
                                            {idea.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <button
                                                onClick={() => setExpandedIdea(expandedIdea === idea.id ? null : idea.id)}
                                                className="text-xs text-[#485e27] hover:underline"
                                            >
                                                {expandedIdea === idea.id ? 'Show less' : 'Read more'}
                                            </button>
                                            <span className="text-xs text-slate-500">
                                                {new Date(idea.createdDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {ideas.length === 0 && !isAddingIdea && (
                <div className="text-center py-12 text-slate-500">
                    <Lightbulb className="h-12 w-12 mx-auto mb-3 text-slate-400" />
                    <p className="mb-2">No ideas yet!</p>
                    <p className="text-sm">Click "Add New Idea" to start brainstorming content.</p>
                </div>
            )}
        </Card>
    );
}
