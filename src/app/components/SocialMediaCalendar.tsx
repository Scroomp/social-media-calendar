import { useState } from 'react';
import { ChevronLeft, ChevronRight, PawPrint, Podcast, FileText, CreditCard, Smartphone, DollarSign, TrendingUp, Video, Sparkles, PartyPopper, Gift, Plus, X, Ticket, AlertCircle, Heart, Briefcase, Check, Circle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import PostProgressTracker from './PostProgressTracker';

// Post types with their colors and icons
const POST_TYPES = {
  pet: { 
    label: 'Pet of the Week', 
    color: 'bg-orange-500', 
    icon: PawPrint,
    textColor: 'text-orange-700',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  digital: { 
    label: 'Digital Services', 
    color: 'bg-[#485e27]', 
    icon: Smartphone,
    textColor: 'text-[#485e27]',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-300'
  },
  financial: { 
    label: 'Financial Services', 
    color: 'bg-emerald-600', 
    icon: DollarSign,
    textColor: 'text-emerald-700',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  },
  podcast: { 
    label: 'Podcast Episode', 
    color: 'bg-blue-600', 
    icon: Podcast,
    textColor: 'text-blue-700',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  podcastPromo: { 
    label: 'Podcast Promo', 
    color: 'bg-blue-400', 
    icon: Podcast,
    textColor: 'text-blue-600',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  blog: { 
    label: 'Blog Post', 
    color: 'bg-teal-600', 
    icon: FileText,
    textColor: 'text-teal-700',
    bgLight: 'bg-teal-50',
    borderColor: 'border-teal-200'
  },
  product: { 
    label: 'Product Feature', 
    color: 'bg-lime-600', 
    icon: CreditCard,
    textColor: 'text-lime-700',
    bgLight: 'bg-lime-50',
    borderColor: 'border-lime-200'
  },
  video: { 
    label: 'Video Content', 
    color: 'bg-amber-600', 
    icon: Video,
    textColor: 'text-amber-700',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  special: { 
    label: 'Special Event', 
    color: 'bg-pink-600', 
    icon: Sparkles,
    textColor: 'text-pink-700',
    bgLight: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  gift: { 
    label: 'Gift Card Giveaway', 
    color: 'bg-purple-600', 
    icon: Gift,
    textColor: 'text-purple-700',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  ticket: { 
    label: 'Ticket Giveaway', 
    color: 'bg-indigo-600', 
    icon: Ticket,
    textColor: 'text-indigo-700',
    bgLight: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  closure: { 
    label: 'Branch Closure/Delay', 
    color: 'bg-yellow-600', 
    icon: AlertCircle,
    textColor: 'text-yellow-700',
    bgLight: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  donation: { 
    label: 'Donation Photo', 
    color: 'bg-rose-600', 
    icon: Heart,
    textColor: 'text-rose-700',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-200'
  },
  businessTestimonial: { 
    label: 'Business Testimonial', 
    color: 'bg-slate-600', 
    icon: Briefcase,
    textColor: 'text-slate-700',
    bgLight: 'bg-slate-50',
    borderColor: 'border-slate-200'
  },
};

interface Post {
  id: string;
  type: keyof typeof POST_TYPES;
  title: string;
  description: string;
  scheduledDate: Date;
}

interface SpecialDay {
  month: number; // 0-11 (0 = January)
  day: number;
  name: string;
  emoji: string;
  type: 'financial' | 'holiday' | 'fun';
}

// Special days and holidays for all months
const ALL_SPECIAL_DAYS: SpecialDay[] = [
  // January
  { month: 0, day: 1, name: 'New Year\'s Day', emoji: '🎉', type: 'holiday' },
  { month: 0, day: 13, name: 'Financial Wellness Month', emoji: '💰', type: 'financial' },
  { month: 0, day: 16, name: 'Get to Know Your Customers Day', emoji: '🤝', type: 'financial' },
  { month: 0, day: 20, name: 'Martin Luther King Jr. Day', emoji: '🕊️', type: 'holiday' },
  { month: 0, day: 24, name: 'National Compliment Day', emoji: '💬', type: 'fun' },
  { month: 0, day: 29, name: 'National Puzzle Day', emoji: '🧩', type: 'fun' },
  
  // February
  { month: 1, day: 2, name: 'Super Bowl Sunday', emoji: '🏈', type: 'fun' },
  { month: 1, day: 14, name: 'Valentine\'s Day', emoji: '❤️', type: 'holiday' },
  { month: 1, day: 17, name: 'Presidents\' Day', emoji: '🇺🇸', type: 'holiday' },
  { month: 1, day: 22, name: 'National Walk Your Dog Day', emoji: '🐕', type: 'fun' },
  
  // March
  { month: 2, day: 1, name: 'National Credit Education Month', emoji: '📚', type: 'financial' },
  { month: 2, day: 8, name: 'International Women\'s Day', emoji: '👩', type: 'holiday' },
  { month: 2, day: 17, name: 'St. Patrick\'s Day', emoji: '🍀', type: 'holiday' },
  { month: 2, day: 20, name: 'First Day of Spring', emoji: '🌸', type: 'fun' },
  { month: 2, day: 31, name: 'World Backup Day', emoji: '💾', type: 'fun' },
  
  // April
  { month: 3, day: 1, name: 'Financial Literacy Month', emoji: '📊', type: 'financial' },
  { month: 3, day: 7, name: 'National Beer Day', emoji: '🍺', type: 'fun' },
  { month: 3, day: 15, name: 'Tax Day', emoji: '💸', type: 'financial' },
  { month: 3, day: 22, name: 'Earth Day', emoji: '🌍', type: 'holiday' },
  { month: 3, day: 30, name: 'National Honesty Day', emoji: '🤝', type: 'fun' },
  
  // May
  { month: 4, day: 1, name: 'National Small Business Week', emoji: '🏢', type: 'financial' },
  { month: 4, day: 4, name: 'Star Wars Day', emoji: '⭐', type: 'fun' },
  { month: 4, day: 11, name: 'Mother\'s Day', emoji: '👩', type: 'holiday' },
  { month: 4, day: 26, name: 'Memorial Day', emoji: '🇺🇸', type: 'holiday' },
  
  // June
  { month: 5, day: 1, name: 'National Homeownership Month', emoji: '🏡', type: 'financial' },
  { month: 5, day: 15, name: 'Father\'s Day', emoji: '👨', type: 'holiday' },
  { month: 5, day: 19, name: 'Juneteenth', emoji: '✊', type: 'holiday' },
  { month: 5, day: 21, name: 'First Day of Summer', emoji: '☀️', type: 'fun' },
  
  // July
  { month: 6, day: 4, name: 'Independence Day', emoji: '🎆', type: 'holiday' },
  { month: 6, day: 17, name: 'World Emoji Day', emoji: '😊', type: 'fun' },
  { month: 6, day: 30, name: 'International Friendship Day', emoji: '🤝', type: 'fun' },
  
  // August
  { month: 7, day: 1, name: 'National Financial Awareness Day', emoji: '💵', type: 'financial' },
  { month: 7, day: 8, name: 'National Dollar Day', emoji: '💲', type: 'financial' },
  { month: 7, day: 19, name: 'National Aviation Day', emoji: '✈️', type: 'fun' },
  { month: 7, day: 26, name: 'National Dog Day', emoji: '🐶', type: 'fun' },
  
  // September
  { month: 8, day: 2, name: 'Labor Day', emoji: '⚒️', type: 'holiday' },
  { month: 8, day: 22, name: 'First Day of Fall', emoji: '🍂', type: 'fun' },
  { month: 8, day: 30, name: 'National Savings Day', emoji: '🐷', type: 'financial' },
  
  // October
  { month: 9, day: 1, name: 'National Financial Planning Month', emoji: '📈', type: 'financial' },
  { month: 9, day: 14, name: 'Columbus Day', emoji: '🗺️', type: 'holiday' },
  { month: 9, day: 17, name: 'International Credit Union Day', emoji: '🏦', type: 'financial' },
  { month: 9, day: 31, name: 'Halloween', emoji: '🎃', type: 'holiday' },
  
  // November
  { month: 10, day: 1, name: 'National Debt Awareness Month', emoji: '💳', type: 'financial' },
  { month: 10, day: 11, name: 'Veterans Day', emoji: '🎖️', type: 'holiday' },
  { month: 10, day: 28, name: 'Thanksgiving', emoji: '🦃', type: 'holiday' },
  { month: 10, day: 29, name: 'Black Friday', emoji: '🛍️', type: 'fun' },
  
  // December
  { month: 11, day: 1, name: 'National Write a Check Day', emoji: '✍️', type: 'financial' },
  { month: 11, day: 2, name: 'Giving Tuesday', emoji: '🎁', type: 'fun' },
  { month: 11, day: 25, name: 'Christmas Day', emoji: '🎄', type: 'holiday' },
  { month: 11, day: 31, name: 'New Year\'s Eve', emoji: '🥳', type: 'holiday' },
];

// Generate posts for any month
const generatePosts = (month: number, year: number): Post[] => {
  const posts: Post[] = [];
  
  // Pet of the Week - Every Monday
  const petDates = [6, 13, 20, 27]; // Mondays in January 2025
  petDates.forEach((day, index) => {
    posts.push({
      id: `pet-${day}`,
      type: 'pet',
      title: `Meet This Week's Pet: ${['Max', 'Bella', 'Charlie', 'Luna'][index]}!`,
      description: 'Share your furry friend for a chance to be featured!',
      scheduledDate: new Date(year, month, day)
    });
  });

  // Digital Services - 1 per month
  posts.push({
    id: 'digital-1',
    type: 'digital',
    title: 'Mobile Banking Made Easy',
    description: 'Access your accounts anytime, anywhere with our award-winning mobile app',
    scheduledDate: new Date(year, month, 8)
  });

  // Financial Services - 2 per month
  posts.push({
    id: 'financial-1',
    type: 'financial',
    title: 'Smart Savings Tips for 2025',
    description: 'Start the new year right with these proven strategies',
    scheduledDate: new Date(year, month, 10)
  });
  posts.push({
    id: 'financial-2',
    type: 'financial',
    title: 'Understanding Your Credit Score',
    description: 'Learn how to improve and maintain healthy credit',
    scheduledDate: new Date(year, month, 24)
  });

  // Podcast Episode - 1 per month
  posts.push({
    id: 'podcast-1',
    type: 'podcast',
    title: 'New Episode: Building Wealth in Your 30s',
    description: 'Expert advice on investments, retirement planning, and more',
    scheduledDate: new Date(year, month, 15)
  });

  // Podcast Promo - 2 per month
  posts.push({
    id: 'podcast-promo-1',
    type: 'podcastPromo',
    title: '🎧 Don\'t Miss Our Latest Episode!',
    description: 'Subscribe now on all major podcast platforms',
    scheduledDate: new Date(year, month, 17)
  });
  posts.push({
    id: 'podcast-promo-2',
    type: 'podcastPromo',
    title: 'Behind the Scenes: Podcast Preview',
    description: 'Sneak peek at next week\'s conversation',
    scheduledDate: new Date(year, month, 29)
  });

  // Blog Post - 1 per month
  posts.push({
    id: 'blog-1',
    type: 'blog',
    title: 'Blog: 5 Ways to Save on Your Monthly Budget',
    description: 'Practical tips from our financial experts',
    scheduledDate: new Date(year, month, 22)
  });

  // Product Features - 3 per month
  posts.push({
    id: 'product-1',
    type: 'product',
    title: 'Introducing: Home Equity Line of Credit',
    description: 'Competitive rates and flexible terms. Learn more today!',
    scheduledDate: new Date(year, month, 7)
  });
  posts.push({
    id: 'product-2',
    type: 'product',
    title: 'Auto Loans with Rates as Low as 3.99%',
    description: 'Get pre-approved in minutes. No impact to your credit score!',
    scheduledDate: new Date(year, month, 16)
  });
  posts.push({
    id: 'product-3',
    type: 'product',
    title: 'Rewards Credit Card: Earn Points on Every Purchase',
    description: 'No annual fee. Redeem for cash back, travel, or gift cards',
    scheduledDate: new Date(year, month, 30)
  });

  // Video Content - 4 per month
  posts.push({
    id: 'video-1',
    type: 'video',
    title: '📹 Member Testimonial: Why I Love NorthCountry FCU',
    description: 'Real stories from real members about their experience',
    scheduledDate: new Date(year, month, 9)
  });
  posts.push({
    id: 'video-2',
    type: 'video',
    title: '📹 Quick Tip: How to Set Up Mobile Deposits',
    description: '60-second tutorial on mobile check deposits',
    scheduledDate: new Date(year, month, 14)
  });
  posts.push({
    id: 'video-3',
    type: 'video',
    title: '📹 Behind the Scenes: Meet Our Team',
    description: 'Get to know the people who serve you every day',
    scheduledDate: new Date(year, month, 21)
  });
  posts.push({
    id: 'video-4',
    type: 'video',
    title: '📹 Financial Wellness Workshop Highlights',
    description: 'Key takeaways from our recent community event',
    scheduledDate: new Date(year, month, 28)
  });

  // Special Events - 1 per month
  posts.push({
    id: 'special-1',
    type: 'special',
    title: 'Special Event: Community Cleanup Day',
    description: 'Join us for a day of giving back to our community',
    scheduledDate: new Date(year, month, 18)
  });

  // Gift Card Giveaways - 1 per month
  posts.push({
    id: 'gift-1',
    type: 'gift',
    title: 'Gift Card Giveaway: Win a $50 Gift Card',
    description: 'Enter to win a $50 gift card to your favorite store',
    scheduledDate: new Date(year, month, 31)
  });

  // Ticket Giveaways - 1 per month
  posts.push({
    id: 'ticket-1',
    type: 'ticket',
    title: 'Ticket Giveaway: Win a VIP Experience',
    description: 'Enter to win a VIP experience at our next event',
    scheduledDate: new Date(year, month, 15)
  });

  return posts.sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime());
};

export default function SocialMediaCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // January 2025
  const [posts, setPosts] = useState<Post[]>(generatePosts(0, 2025));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPostType, setNewPostType] = useState<keyof typeof POST_TYPES | ''>('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postProgress, setPostProgress] = useState<Record<string, any>>({});

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthAbbreviations = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const previousMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
    setPosts(generatePosts(newDate.getMonth(), newDate.getFullYear()));
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
    setPosts(generatePosts(newDate.getMonth(), newDate.getFullYear()));
  };

  const getPostsForDay = (day: number) => {
    return posts.filter(post => {
      const postDate = post.scheduledDate;
      return postDate.getDate() === day &&
             postDate.getMonth() === currentDate.getMonth() &&
             postDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const getSpecialDayForDay = (day: number) => {
    return ALL_SPECIAL_DAYS.find(sd => sd.day === day && sd.month === currentDate.getMonth());
  };

  const getCurrentMonthSpecialDays = () => {
    return ALL_SPECIAL_DAYS.filter(sd => sd.month === currentDate.getMonth());
  };

  const handleAddPost = () => {
    if (selectedDay && newPostType && newPostTitle && newPostDescription) {
      const newPost: Post = {
        id: `${newPostType}-${Date.now()}`,
        type: newPostType,
        title: newPostTitle,
        description: newPostDescription,
        scheduledDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay)
      };
      setPosts([...posts, newPost]);
      setIsDialogOpen(false);
      setNewPostType('');
      setNewPostTitle('');
      setNewPostDescription('');
    }
  };

  const openAddPostDialog = (day: number) => {
    setSelectedDay(day);
    setIsDialogOpen(true);
  };

  const deletePost = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-2">NorthCountry FCU Social Media Calendar</h1>
              <p className="text-slate-600">Plan and schedule your social media content</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={previousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="min-w-[200px] text-center">
                <h2>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
              </div>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Legend */}
          <Card className="p-4 bg-white">
            <h3 className="mb-3">Post Types</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(POST_TYPES).map(([key, type]) => {
                const Icon = type.icon;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                    <Icon className={`h-4 w-4 ${type.textColor}`} />
                    <span className="text-sm text-slate-700">{type.label}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Special Days */}
          <Card className="p-4 bg-white mt-4">
            <h3 className="mb-3">Special Days & Holidays in {monthNames[currentDate.getMonth()]}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {getCurrentMonthSpecialDays().map((day) => (
                <div key={day.day} className="flex items-center gap-2">
                  <span className="text-lg">{day.emoji}</span>
                  <span className="text-sm text-slate-700">
                    {monthAbbreviations[currentDate.getMonth()]} {day.day}: <span className={
                      day.type === 'financial' ? 'text-green-700' :
                      day.type === 'holiday' ? 'text-red-700' :
                      'text-blue-700'
                    }>{day.name}</span>
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Calendar Grid */}
        <Card className="p-6 bg-white">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center py-2">
                <span className="text-slate-600">{day}</span>
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {emptyDays.map(i => (
              <div key={`empty-${i}`} className="aspect-square min-h-[120px]" />
            ))}

            {/* Actual days */}
            {days.map(day => {
              const dayPosts = getPostsForDay(day);
              const specialDay = getSpecialDayForDay(day);
              const isToday = day === 6 && currentDate.getMonth() === 0; // Highlight Jan 6 as example

              return (
                <div
                  key={day}
                  className={`border rounded-lg p-2 aspect-square min-h-[140px] hover:border-[#485e27] transition-colors ${
                    isToday ? 'border-[#485e27] bg-green-50' : 
                    specialDay ? 'border-amber-300 bg-amber-50/30' : 
                    'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className={`text-sm ${isToday ? '' : 'text-slate-700'}`}>
                      {day}
                    </div>
                    {specialDay && (
                      <div 
                        className={`text-lg leading-none ${
                          specialDay.type === 'financial' ? 'bg-green-100 px-1 rounded' : 
                          specialDay.type === 'holiday' ? 'bg-red-100 px-1 rounded' : 
                          'bg-blue-100 px-1 rounded'
                        }`}
                        title={specialDay.name}
                      >
                        {specialDay.emoji}
                      </div>
                    )}
                  </div>
                  {specialDay && (
                    <div className={`text-xs mb-2 px-1 py-0.5 rounded ${
                      specialDay.type === 'financial' ? 'bg-green-100 text-green-800 border border-green-200' : 
                      specialDay.type === 'holiday' ? 'bg-red-100 text-red-800 border border-red-200' : 
                      'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {specialDay.name}
                    </div>
                  )}
                  <div className="space-y-1 overflow-y-auto max-h-[70px]">
                    {dayPosts.map(post => {
                      const postType = POST_TYPES[post.type];
                      if (!postType) return null; // Skip posts with invalid types
                      const Icon = postType.icon;
                      const progress = postProgress[post.id];
                      const hasProgress = progress?.status === 'ready';
                      
                      return (
                        <div
                          key={post.id}
                          onClick={() => setSelectedPost(post)}
                          className={`${postType.bgLight} ${postType.borderColor} border rounded p-1.5 hover:shadow-sm transition-shadow group relative cursor-pointer`}
                          title={post.description}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <div className="flex items-start gap-1 flex-1 min-w-0">
                              <Icon className={`h-3 w-3 ${postType.textColor} flex-shrink-0 mt-0.5`} />
                              <span className="text-xs text-slate-700 line-clamp-2 leading-tight">
                                {post.title}
                              </span>
                              {hasProgress && (
                                <CheckCircle2 className="h-3 w-3 text-green-600 flex-shrink-0" />
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deletePost(post.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                              title="Delete post"
                            >
                              <X className="h-3 w-3 text-red-600 hover:text-red-800" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {dayPosts.length < 4 && (
                      <button
                        onClick={() => openAddPostDialog(day)}
                        className="w-full border-2 border-dashed border-slate-300 rounded p-1.5 hover:border-[#485e27] hover:bg-green-50/50 transition-colors flex items-center justify-center gap-1 text-slate-500 hover:text-[#485e27]"
                      >
                        <Plus className="h-3 w-3" />
                        <span className="text-xs">Add Post</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Post Summary */}
        <Card className="mt-6 p-6 bg-white">
          <h3 className="mb-4">Monthly Content Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(POST_TYPES).map(([key, type]) => {
              const Icon = type.icon;
              const count = posts.filter(p => p.type === key).length;
              return (
                <div key={key} className={`${type.bgLight} border ${type.borderColor} rounded-lg p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-5 w-5 ${type.textColor}`} />
                    <span className={`text-2xl ${type.textColor}`}>{count}</span>
                  </div>
                  <p className="text-sm text-slate-600">{type.label}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Add Post Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Post</DialogTitle>
              <DialogDescription>
                Add a new post for {monthAbbreviations[currentDate.getMonth()]} {selectedDay}, {currentDate.getFullYear()}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select
                  value={newPostType}
                  onValueChange={(value) => setNewPostType(value as keyof typeof POST_TYPES)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(POST_TYPES).map(([key, type]) => {
                      const Icon = type.icon;
                      return (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${type.textColor}`} />
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input
                  id="title"
                  value={newPostTitle}
                  onChange={e => setNewPostTitle(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter post title..."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input
                  id="description"
                  value={newPostDescription}
                  onChange={e => setNewPostDescription(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter post description..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setNewPostType('');
                  setNewPostTitle('');
                  setNewPostDescription('');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddPost}
                disabled={!newPostType || !newPostTitle || !newPostDescription}
              >
                Add Post
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Post Progress Tracker */}
        {selectedPost && (
          <PostProgressTracker
            postId={selectedPost.id}
            postTitle={selectedPost.title}
            postType={selectedPost.type}
            postTypeLabel={POST_TYPES[selectedPost.type].label}
            postTypeColor={POST_TYPES[selectedPost.type].color}
            postTypeIcon={POST_TYPES[selectedPost.type].icon}
            scheduledDate={selectedPost.scheduledDate}
            onClose={() => setSelectedPost(null)}
            onSave={(progress) => {
              setPostProgress({ ...postProgress, [progress.id]: progress });
            }}
            initialProgress={postProgress[selectedPost.id]}
          />
        )}
      </div>
    </div>
  );
}