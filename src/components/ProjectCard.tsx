import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelCard from './PixelCard';
import { 
  Film, 
  Music, 
  Tv, 
  Star, 
  Clock, 
  Play, 
  Plus, 
  Bookmark, 
  Heart,
  TrendingUp,
  ArrowRight} from 'lucide-react';
import { Project } from '../types';
import { useTheme } from './ThemeProvider';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  featured?: boolean;
  urgent?: boolean;
  compact?: boolean;
  layout?: 'netflix' | 'grid' | 'list';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onClick, 
  featured, 
  urgent, 
  compact}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { theme } = useTheme();

  const cardWidth = featured ? 'w-96' : compact ? 'w-48' : 'w-72';
  // Fixed: Use consistent aspect ratio for all cards
  const aspectRatio = 'aspect-[2/3]';

  return (
    <PixelCard
      variant="pink"
      className={`relative flex-shrink-0 ${cardWidth}`}
    >
      <motion.div
        className="absolute inset-0 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: compact ? 1.02 : 1.05 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
      >
      <div className={`relative ${aspectRatio} rounded-xl overflow-hidden ${theme === 'light' ? 'bg-white/80 shadow-xl' : 'bg-gray-800 shadow-2xl'}`}>
        {/* Main Poster Image */}
        <div className="relative w-full h-full">
          <img 
            src={project.poster} 
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110 brightness-75' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Premium Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
            theme === 'light'
              ? 'bg-white/80 border-gray-300 text-gray-900 shadow-lg'
              : project.type === 'film' ? 'bg-purple-500/80 border-purple-400/50 text-white shadow-lg shadow-purple-500/25'
              : project.type === 'music' ? 'bg-blue-500/80 border-blue-400/50 text-white shadow-lg shadow-blue-500/25'
              : 'bg-green-500/80 border-green-400/50 text-white shadow-lg shadow-green-500/25'
          }`}>
            {project.type === 'film' ? <Film className="w-3 h-3" /> :
             project.type === 'music' ? <Music className="w-3 h-3" /> :
             <Tv className="w-3 h-3" />}
            {!compact && project.type.toUpperCase()}
          </div>
          
          {featured && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-xs font-bold shadow-lg text-black`}>
              <TrendingUp className="w-3 h-3" />
              {!compact && 'TRENDING'}
            </div>
          )}
          
          {urgent && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-pink-400 to-red-400 text-xs font-bold shadow-lg animate-pulse text-white">
              <Clock className="w-3 h-3" />
              {!compact && 'ENDING SOON'}
            </div>
          )}
        </div>

        {/* Top Right - Rating */}
        {project.rating && (
          <div className="absolute top-3 right-3 z-20">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border bg-black/70 backdrop-blur-md text-white border-yellow-400/30`}>
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              {project.rating}
            </div>
          </div>
        )}

        {/* Bottom Content - Always Visible */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 z-20`}>
          <div className="space-y-3">
            {/* Title and Basic Info */}
            <div>
              <h3 className={`font-bold leading-tight ${compact ? 'text-sm' : featured ? 'text-xl' : 'text-lg'} text-white`}>
                {project.title}
              </h3>
              {!compact && (
                <p className="text-sm mt-1 line-clamp-2 text-white">
                  {project.description}
                </p>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white">Funded</span>
                <span className={`font-bold ${
                  project.fundedPercentage >= 75 ? 'text-green-500' : 
                  project.fundedPercentage >= 50 ? 'text-yellow-400' : 'text-white'
                }`}>
                  {project.fundedPercentage}%
                </span>
              </div>
              <div className={`w-full rounded-full h-2 overflow-hidden backdrop-blur-sm ${theme === 'light' ? 'bg-gray-300/60' : 'bg-gray-700/50'}`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.fundedPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full rounded-full ${
                    project.type === 'film'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : project.type === 'music'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                  } shadow-lg`}
                />
              </div>
            </div>

            {/* Funding Details */}
            {!compact && (
              <div className="flex items-center justify-between text-xs">
                <div className="text-white">
                  ₹{(project.raisedAmount / 100000).toFixed(1)}L raised
                </div>
                {project.timeLeft && (
                  <div className="flex items-center gap-1 font-medium text-orange-400">
                    <Clock className="w-3 h-3" />
                    {project.timeLeft}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hover Content - Enhanced */}
        <AnimatePresence>
          {isHovered && !compact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 flex flex-col justify-end p-4 z-30`}
            >
              <div className="space-y-4">
                {/* Enhanced Title and Info */}
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-white text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-white/20 text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400">Target</span>
                    <div className="text-white font-semibold">
                      ₹{(project.targetAmount / 100000).toFixed(1)}L
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Language</span>
                    <div className="text-white font-semibold">{project.language}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <a
                    href={project.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                  </a>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white text-black rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                    Invest Now
                  </button>
                  <button className="p-2 bg-gray-600/80 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-600/80 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-600/80 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Border Effect */}
        <div className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-white/30 transition-colors duration-500 pointer-events-none" />
        
        {/* Cinematic Glow */}
        <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
          project.type === 'film' ? 'shadow-2xl shadow-purple-500/20' :
          project.type === 'music' ? 'shadow-2xl shadow-blue-500/20' :
          'shadow-2xl shadow-green-500/20'
        }`} />
      </div>
      </motion.div>
    </PixelCard>
  );
};

export default ProjectCard;