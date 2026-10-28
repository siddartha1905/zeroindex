import React from 'react';
import { 
  Ear, 
  Lightbulb, 
  MessageCircle, 
  Sparkles, 
  Clock, 
  Heart, 
  Smile 
} from 'lucide-react';

const ICON_MAP = {
  listen: Ear,
  think: Lightbulb,
  speak: Sparkles,
  dialogue: MessageCircle,
  pause: Clock,
  heart: Heart,
  smile: Smile
};

const TONE_STYLES = {
  blue: {
    card: 'border-[#496D91]/25 bg-gradient-to-br from-white to-[#F2F6FA]',
    iconBg: 'bg-[#E1EAF2] text-[#496D91]',
    tag: 'text-[#496D91]'
  },
  green: {
    card: 'border-[#285C49]/25 bg-gradient-to-br from-white to-[#F2F7F4]',
    iconBg: 'bg-[#DDEADD] text-[#285C49]',
    tag: 'text-[#285C49]'
  },
  amber: {
    card: 'border-[#B45309]/20 bg-gradient-to-br from-white to-[#FDF9F3]',
    iconBg: 'bg-[#FDF5E6] text-[#B45309]',
    tag: 'text-[#B45309]'
  },
  purple: {
    card: 'border-[#765C90]/25 bg-gradient-to-br from-white to-[#F7F3FA]',
    iconBg: 'bg-[#EBE5F0] text-[#765C90]',
    tag: 'text-[#765C90]'
  }
};

export const LearningNudge = ({
  title = 'Quick Thought',
  text,
  detail,
  tone = 'blue',
  icon = 'think',
  className = ''
}) => {
  const IconComponent = ICON_MAP[icon] || Lightbulb;
  const styles = TONE_STYLES[tone] || TONE_STYLES.blue;

  return (
    <aside 
      className={`p-3.5 sm:p-4 rounded-2xl border shadow-soft transition-all text-left space-y-1.5 ${styles.card} ${className}`}
      aria-label={title}
    >
      <div className="flex items-center gap-2">
        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${styles.iconBg}`}>
          <IconComponent className="w-3.5 h-3.5" aria-hidden="true" />
        </div>
        <span className={`font-technical text-[10px] font-bold tracking-wider uppercase ${styles.tag}`}>
          {title}
        </span>
      </div>

      {text && (
        <p className="font-editorial text-sm sm:text-base font-bold text-[#25352D] leading-snug">
          "{text}"
        </p>
      )}

      {detail && (
        <p className="text-xs text-[#5F6C64] leading-relaxed">
          {detail}
        </p>
      )}
    </aside>
  );
};
