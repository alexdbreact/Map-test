'use client';

import { useState } from 'react';
import { ChevronLeft, Home, Globe, Image as ImageIcon, ExternalLink } from 'lucide-react';

const slides = [
  { id: 1, title: 'Introduction', icon: <Home className="h-4 w-4" /> },
  { id: 2, title: 'Vision', icon: <Globe className="h-4 w-4" /> },
  { id: 3, title: 'UI/UX Design', icon: <ImageIcon className="h-4 w-4" /> },
  { id: 4, title: 'React Ecosystem', icon: <ExternalLink className="h-4 w-4" /> },
  { id: 5, title: 'Next.js Features', icon: <Globe className="h-4 w-4" /> },
  { id: 6, title: 'Performance', icon: <ImageIcon className="h-4 w-4" /> },
  { id: 7, title: 'Best Practices', icon: <Home className="h-4 w-4" /> },
  { id: 8, title: 'Case Studies', icon: <Globe className="h-4 w-4" /> },
  { id: 9, title: 'Future Trends', icon: <ImageIcon className="h-4 w-4" /> },
  { id: 10, title: 'Conclusion', icon: <ExternalLink className="h-4 w-4" /> },
];

export default function SideMenu({ activeSlide, setActiveSlide, isFrameOpen }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div dir='rtl' className={`fixed right-0 top-0 h-screen flex transition-all duration-300 z-40 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-l border-border" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full p-4">
        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -left-3 top-6 bg-primary text-white p-1 rounded-full border border-border hover:bg-primary/90 transition-colors"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
        </button>

        {/* Title */}
        {!collapsed && (
          <div className="mb-8 pt-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Slides</h2>
            <p className="text-sm text-muted-foreground">Select a slide to view</p>
          </div>
        )}

        {/* Slides list */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-2">
            {slides.map((slide) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(slide.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  activeSlide === slide.id
                    ? 'bg-primary text-primary-foreground shadow-lg scale-[1.02]'
                    : 'hover:bg-secondary/50 hover:shadow-md'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <div className={activeSlide === slide.id ? 'text-primary-foreground' : 'text-primary'}>
                  {slide.icon}
                </div>
                {!collapsed && (
                  <span className="font-medium truncate">{slide.title}</span>
                )}
                {!collapsed && activeSlide === slide.id && (
                  <ChevronLeft className="h-4 w-4 ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        {!collapsed && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{activeSlide}/10</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(activeSlide / 10) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}