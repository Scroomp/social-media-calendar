import { useState } from 'react';
import { Check, Circle, CheckCircle2, X, Plus, Image as ImageIcon, FileText, ListChecks } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

interface PostProgress {
  id: string;
  hasCreative: boolean;
  creativeDescription: string;
  steps: { id: string; text: string; completed: boolean }[];
  caption: string;
  status: 'not-started' | 'in-progress' | 'ready';
}

interface PostProgressTrackerProps {
  postId: string;
  postTitle: string;
  postType: string;
  postTypeLabel: string;
  postTypeColor: string;
  postTypeIcon: React.ComponentType<{ className?: string }>;
  scheduledDate: Date;
  onClose: () => void;
  onSave: (progress: PostProgress) => void;
  initialProgress?: PostProgress;
}

export default function PostProgressTracker({
  postId,
  postTitle,
  postType,
  postTypeLabel,
  postTypeColor,
  postTypeIcon: Icon,
  scheduledDate,
  onClose,
  onSave,
  initialProgress
}: PostProgressTrackerProps) {
  const [hasCreative, setHasCreative] = useState(initialProgress?.hasCreative || false);
  const [creativeDescription, setCreativeDescription] = useState(initialProgress?.creativeDescription || '');
  const [steps, setSteps] = useState<{ id: string; text: string; completed: boolean }[]>(
    initialProgress?.steps || [
      { id: '1', text: 'Create graphic/video', completed: false },
      { id: '2', text: 'Write caption', completed: false },
      { id: '3', text: 'Get approval', completed: false },
      { id: '4', text: 'Schedule post', completed: false }
    ]
  );
  const [caption, setCaption] = useState(initialProgress?.caption || '');
  const [newStepText, setNewStepText] = useState('');

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const calculateStatus = (): 'not-started' | 'in-progress' | 'ready' => {
    const hasStarted = hasCreative || creativeDescription || caption || steps.some(s => s.completed);
    const allComplete = hasCreative && creativeDescription && caption && steps.every(s => s.completed);
    
    if (allComplete) return 'ready';
    if (hasStarted) return 'in-progress';
    return 'not-started';
  };

  const getStatusBadge = () => {
    const status = calculateStatus();
    switch (status) {
      case 'ready':
        return (
          <Badge className="bg-green-600 text-white">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Ready to Post
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-blue-600 text-white">
            <Circle className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-400 text-white">
            <Circle className="h-3 w-3 mr-1" />
            Not Started
          </Badge>
        );
    }
  };

  const toggleStep = (stepId: string) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  const addStep = () => {
    if (newStepText.trim()) {
      setSteps([...steps, {
        id: Date.now().toString(),
        text: newStepText,
        completed: false
      }]);
      setNewStepText('');
    }
  };

  const deleteStep = (stepId: string) => {
    setSteps(steps.filter(step => step.id !== stepId));
  };

  const handleSave = () => {
    const progress: PostProgress = {
      id: postId,
      hasCreative,
      creativeDescription,
      steps,
      caption,
      status: calculateStatus()
    };
    onSave(progress);
    onClose();
  };

  const completedSteps = steps.filter(s => s.completed).length;
  const totalSteps = steps.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl my-8">
        {/* Header */}
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`h-6 w-6 text-${postTypeColor}`} />
                <h2 className="text-slate-900">{postTitle}</h2>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline">{postTypeLabel}</Badge>
                {getStatusBadge()}
                <span className="text-sm text-slate-600">{formatDate(scheduledDate)}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Overall Progress</span>
              <span className="text-sm text-slate-700">{completedSteps}/{totalSteps} steps complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-[#485e27] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Creative Status */}
          <Card className="p-4 border-2 border-slate-200">
            <div className="flex items-start gap-3 mb-4">
              <ImageIcon className="h-5 w-5 text-[#485e27] mt-1" />
              <div className="flex-1">
                <h3 className="mb-1">Creative Assets</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Track your images, videos, and graphics for this post
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <Checkbox 
                    id="hasCreative" 
                    checked={hasCreative}
                    onCheckedChange={(checked) => setHasCreative(checked as boolean)}
                  />
                  <Label htmlFor="hasCreative" className="cursor-pointer">
                    Creative assets are ready
                  </Label>
                </div>

                <div>
                  <Label htmlFor="creativeDesc" className="text-sm text-slate-700">
                    What creative will you use?
                  </Label>
                  <Textarea
                    id="creativeDesc"
                    value={creativeDescription}
                    onChange={(e) => setCreativeDescription(e.target.value)}
                    placeholder="Describe your images, videos, or graphics (e.g., 'Photo of Max the golden retriever in front of branch', '30-second video tutorial', 'Infographic about savings rates')"
                    className="mt-1 min-h-[80px]"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Steps Checklist */}
          <Card className="p-4 border-2 border-slate-200">
            <div className="flex items-start gap-3">
              <ListChecks className="h-5 w-5 text-[#485e27] mt-1" />
              <div className="flex-1">
                <h3 className="mb-1">Production Steps</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Track your progress from concept to completion
                </p>

                <div className="space-y-2 mb-4">
                  {steps.map((step) => (
                    <div 
                      key={step.id}
                      className={`flex items-center gap-2 p-2 rounded transition-colors ${
                        step.completed ? 'bg-green-50' : 'bg-slate-50'
                      }`}
                    >
                      <Checkbox
                        id={`step-${step.id}`}
                        checked={step.completed}
                        onCheckedChange={() => toggleStep(step.id)}
                      />
                      <Label
                        htmlFor={`step-${step.id}`}
                        className={`flex-1 cursor-pointer ${
                          step.completed ? 'line-through text-slate-500' : 'text-slate-700'
                        }`}
                      >
                        {step.text}
                      </Label>
                      <button
                        onClick={() => deleteStep(step.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                        title="Delete step"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newStepText}
                    onChange={(e) => setNewStepText(e.target.value)}
                    placeholder="Add a new step..."
                    onKeyPress={(e) => e.key === 'Enter' && addStep()}
                  />
                  <Button onClick={addStep} variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Caption */}
          <Card className="p-4 border-2 border-slate-200">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-[#485e27] mt-1" />
              <div className="flex-1">
                <h3 className="mb-1">Caption & Copy</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Write your social media caption and hashtags
                </p>
                
                <Textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write your caption here... Include hashtags and emojis!&#10;&#10;Example:&#10;🐾 Meet Max! This week's Pet of the Week is stealing hearts at our main branch. Come say hi! &#10;&#10;#PetOfTheWeek #NorthCountryFCU #CommunityFirst"
                  className="min-h-[150px]"
                />
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-slate-500">
                    {caption.length} characters
                  </span>
                  {caption.length > 280 && (
                    <span className="text-xs text-amber-600">
                      ⚠️ Twitter/X limit exceeded (280 chars)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6 flex items-center justify-between bg-slate-50">
          <div className="text-sm text-slate-600">
            {calculateStatus() === 'ready' ? (
              <span className="text-green-700">✅ All set! This post is ready to go.</span>
            ) : calculateStatus() === 'in-progress' ? (
              <span className="text-blue-700">📝 Keep going! Complete all steps to mark as ready.</span>
            ) : (
              <span className="text-slate-500">💡 Get started by checking off tasks as you complete them.</span>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-[#485e27] hover:bg-[#3a4a1f] text-white"
            >
              Save Progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
