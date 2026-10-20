import React, { useState } from 'react';
import { Play, ExternalLink, X, Film } from 'lucide-react';
import { dldVideoRegistry } from '../data/dldVideoConfig';

export const CuratedVideoCard = ({ videoKey, customTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const video = dldVideoRegistry[videoKey];

  if (!video) return null;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3 transition-all hover:border-[#285C49]/40">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5]/40 text-[#DC2626] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                Watch Related Lesson
              </span>
              <span className="text-[11px] font-mono text-[#5F6C64]">
                {video.publisher} · {video.duration}
              </span>
            </div>
            <h4 className="font-editorial text-sm sm:text-base font-bold text-[#293B32] mt-0.5">
              {customTitle || video.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {!isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#285C49] text-white text-xs font-mono font-bold hover:bg-[#1E4738] transition-colors cursor-pointer shadow-2xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Here</span>
            </button>
          ) : (
            <button
              onClick={() => setIsPlaying(false)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] text-[#5F6C64] hover:text-[#293B32] border border-[#DCE7E1] text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close Player</span>
            </button>
          )}

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] text-[#5F6C64] hover:text-[#285C49] border border-[#DCE7E1] text-xs font-mono font-bold transition-colors"
            title="Open externally on YouTube"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">YouTube</span>
          </a>
        </div>
      </div>

      {isPlaying && (
        <div className="pt-2 animate-fadeIn">
          <div className="relative w-full rounded-xl overflow-hidden border border-[#DCE7E1] bg-black shadow-inner" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`${video.embedUrl}?autoplay=1`}
              title={video.title}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-[11px] text-[#5F6C64] font-mono mt-1 text-right">
            Privacy-friendly player loaded on demand from YouTube No-Cookie.
          </p>
        </div>
      )}
    </div>
  );
};

export default CuratedVideoCard;
