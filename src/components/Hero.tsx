import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Film, Music, TrendingUp, Users, DollarSign, Target, Award, Star, Zap, Crown, Gift, Sparkles, CheckCircle, Globe, Calendar, BarChart3, Coins } from 'lucide-react';
import Typewriter from './Typewriter';
import AnimatedNumber from './AnimatedNumber';
import { useTheme } from './ThemeProvider';

interface HeroProps {
  setCurrentView?: (view: 'home' | 'dashboard' | 'projects' | 'community') => void;
}

const Hero: React.FC<HeroProps> = ({ setCurrentView }) => {
  const { theme, currentGradient } = useTheme();

  // Gradient theme names for the indicator
  const gradientNames = [
    'Aurora Borealis',
    'Sunset Dreams',
    'Ocean Depths',
    'Mystic Forest',
    'Royal Purple',
    'Solar Flare'
  ];

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-12 md:pt-16 ${
      theme === 'light'
        ? 'animated-gradient-light'
        : 'animated-gradient-dark'
    }`}>
      
      {/* Gradient Theme Indicator */}
      {theme === 'light' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="gradient-indicator animate-gradient-pulse flex items-center gap-1"
        >
          <Sparkles className="w-4 h-4 animate-pulse" /> {gradientNames[currentGradient]}
        </motion.div>
      )}
      
      {/* Enhanced Floating Orbs Animation with Gradient Awareness */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-40 transition-all duration-[3000ms] ${
            theme === 'light'
              ? currentGradient === 0 ? 'bg-gradient-to-br from-green-300 to-blue-300' :
                currentGradient === 1 ? 'bg-gradient-to-br from-orange-300 to-pink-300' :
                currentGradient === 2 ? 'bg-gradient-to-br from-cyan-300 to-blue-300' :
                currentGradient === 3 ? 'bg-gradient-to-br from-green-300 to-emerald-300' :
                'bg-gradient-to-br from-purple-300 to-violet-300'
              : 'bg-gradient-to-br from-purple-500 to-pink-500'
          }`}
        />
        
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -40, 0],
            scale: [1, 0.7, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-35 transition-all duration-[3000ms] ${
            theme === 'light'
              ? currentGradient === 0 ? 'bg-gradient-to-br from-blue-300 to-purple-300' :
                currentGradient === 1 ? 'bg-gradient-to-br from-red-300 to-orange-300' :
                currentGradient === 2 ? 'bg-gradient-to-br from-blue-300 to-indigo-300' :
                currentGradient === 3 ? 'bg-gradient-to-br from-lime-300 to-green-300' :
                'bg-gradient-to-br from-purple-300 to-pink-300'
              : 'bg-gradient-to-br from-blue-500 to-cyan-500'
          }`}
        />
        
        <motion.div
          animate={{
            x: [0, 60, -90, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
          className={`absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-30 transition-all duration-[3000ms] ${
            theme === 'light'
              ? currentGradient === 0 ? 'bg-gradient-to-br from-emerald-300 to-cyan-300' :
                currentGradient === 1 ? 'bg-gradient-to-br from-yellow-300 to-red-300' :
                currentGradient === 2 ? 'bg-gradient-to-br from-sky-300 to-blue-300' :
                currentGradient === 3 ? 'bg-gradient-to-br from-green-300 to-teal-300' :
                'bg-gradient-to-br from-violet-300 to-purple-300'
              : 'bg-gradient-to-br from-yellow-500 to-orange-500'
          }`}
        />

        {/* Additional Gradient-Aware Orbs */}
        <motion.div
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 50, -70, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 15
          }}
          className={`absolute top-3/4 left-1/2 w-72 h-72 rounded-full blur-3xl opacity-25 transition-all duration-[3000ms] ${
            theme === 'light'
              ? currentGradient === 0 ? 'bg-gradient-to-br from-teal-300 to-green-300' :
                currentGradient === 1 ? 'bg-gradient-to-br from-pink-300 to-rose-300' :
                currentGradient === 2 ? 'bg-gradient-to-br from-indigo-300 to-purple-300' :
                currentGradient === 3 ? 'bg-gradient-to-br from-emerald-300 to-lime-300' :
                'bg-gradient-to-br from-fuchsia-300 to-purple-300'
              : 'bg-gradient-to-br from-emerald-500 to-teal-500'
          }`}
        />

        {/* Extra orbs */}
        <motion.div
          animate={{ x: [0, 90, -40, 0], y: [0, -40, 60, 0], scale: [1, 1.3, 0.7, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
          className={`absolute top-1/4 right-1/2 w-56 h-56 rounded-full blur-3xl ${
            theme === 'light' ? 'bg-gradient-to-br from-purple-300 to-blue-300' : 'bg-gradient-to-br from-purple-600 to-blue-600'
          }`}
        />
        <motion.div
          animate={{ x: [0, -60, 80, 0], y: [0, 70, -50, 0], scale: [1, 0.9, 1.1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className={`absolute bottom-1/4 left-1/3 w-60 h-60 rounded-full blur-3xl ${
            theme === 'light' ? 'bg-gradient-to-br from-yellow-300 to-pink-300' : 'bg-gradient-to-br from-yellow-600 to-pink-600'
          }`}
        />

        {/* Additional fading orbs */}
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className={`absolute top-1/3 left-1/4 w-40 h-40 rounded-full blur-3xl ${
            theme === 'light' ? 'bg-gradient-to-br from-green-300 to-emerald-300' : 'bg-gradient-to-br from-green-600 to-emerald-600'
          }`}
        />
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className={`absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl ${
            theme === 'light' ? 'bg-gradient-to-br from-blue-300 to-cyan-300' : 'bg-gradient-to-br from-blue-600 to-cyan-600'
          }`}
        />
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className={`absolute top-1/5 right-1/3 w-52 h-52 rounded-full blur-3xl ${
            theme === 'light' ? 'bg-gradient-to-br from-rose-300 to-fuchsia-300' : 'bg-gradient-to-br from-rose-600 to-fuchsia-600'
          }`}
        />
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className={`absolute bottom-1/5 left-1/4 w-44 h-44 rounded-full blur-3xl ${
            theme === 'light' ? 'bg-gradient-to-br from-orange-300 to-yellow-300' : 'bg-gradient-to-br from-orange-600 to-yellow-600'
          }`}
        />
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className={`absolute top-1/6 left-1/2 w-36 h-36 rounded-full blur-3xl ${
            theme === 'light' ? 'bg-gradient-to-br from-indigo-300 to-purple-300' : 'bg-gradient-to-br from-indigo-600 to-purple-600'
          }`}
        />

        {/* New orb behind heading */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute top-1/2 left-1/2 w-[32rem] h-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-40 ${
            theme === 'light'
              ? 'bg-gradient-to-br from-purple-300 to-pink-300'
              : 'bg-gradient-to-br from-purple-600 to-pink-600'
          }`}
        />
      </div>

      {/* Enhanced Particle Effects with Gradient Colors */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full transition-all duration-[3000ms] ${
              theme === 'light' 
                ? currentGradient === 0 ? 'bg-green-400' :
                  currentGradient === 1 ? 'bg-orange-400' :
                  currentGradient === 2 ? 'bg-blue-400' :
                  currentGradient === 3 ? 'bg-emerald-400' :
                  'bg-purple-400'
                : 'bg-white'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mt-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          {/* Enhanced Floating Badge with Gradient Awareness */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border font-medium mb-8 backdrop-blur-md transition-all duration-[3000ms] ${
              theme === 'light'
                ? currentGradient === 0 ? 'bg-green-50/60 border-green-300/50 text-green-700 shadow-lg shadow-green-200/50' :
                  currentGradient === 1 ? 'bg-orange-50/60 border-orange-300/50 text-orange-700 shadow-lg shadow-orange-200/50' :
                  currentGradient === 2 ? 'bg-blue-50/60 border-blue-300/50 text-blue-700 shadow-lg shadow-blue-200/50' :
                  currentGradient === 3 ? 'bg-emerald-50/60 border-emerald-300/50 text-emerald-700 shadow-lg shadow-emerald-200/50' :
                  'bg-purple-50/60 border-purple-300/50 text-purple-700 shadow-lg shadow-purple-200/50'
                : 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30 text-purple-300'
            }`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            The Future of Entertainment Investment
          </motion.div>

          <h1 className={`text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            <Typewriter
              text="Own the stories you love"
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                theme === 'light'
                  ? 'from-purple-600 via-pink-500 to-blue-600'
                  : 'from-purple-400 via-pink-500 to-cyan-500'
              }`}
            />
          </h1>
          
          <motion.p 
            className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Transform from passive viewer to co-producer. Invest in movies, music, and series. 
            Earn returns, unlock exclusive perks, and shape the future of entertainment.
          </motion.p>

          {/* Enhanced CTA Buttons with Gradient Awareness */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <motion.button
              onClick={() => setCurrentView?.('projects')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative px-8 py-4 rounded-full text-white font-semibold text-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                theme === 'light'
                  ? currentGradient === 0 ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-green-500/25' :
                    currentGradient === 1 ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:shadow-orange-500/25' :
                    currentGradient === 2 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-blue-500/25' :
                    currentGradient === 3 ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:shadow-emerald-500/25' :
                    'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:shadow-purple-500/25'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-purple-500/25'
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Investing
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </span>
              
              {/* Enhanced Animated Background */}
              <motion.div
                className={`absolute inset-0 transition-all duration-[3000ms] ${
                  theme === 'light'
                    ? currentGradient === 0 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                      currentGradient === 1 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                      currentGradient === 2 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                      currentGradient === 3 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
                      'bg-gradient-to-r from-purple-500 to-fuchsia-500'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500'
                }`}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Enhanced Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.button>

            <motion.button
              onClick={() => setCurrentView?.('projects')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`group flex items-center gap-3 px-8 py-4 border rounded-full font-semibold text-xl backdrop-blur-md transition-all duration-[3000ms] ${
                theme === 'light'
                  ? currentGradient === 0 ? 'border-green-300 text-green-700 bg-green-50/60 hover:bg-green-50/80 shadow-lg hover:shadow-xl' :
                    currentGradient === 1 ? 'border-orange-300 text-orange-700 bg-orange-50/60 hover:bg-orange-50/80 shadow-lg hover:shadow-xl' :
                    currentGradient === 2 ? 'border-blue-300 text-blue-700 bg-blue-50/60 hover:bg-blue-50/80 shadow-lg hover:shadow-xl' :
                    currentGradient === 3 ? 'border-emerald-300 text-emerald-700 bg-emerald-50/60 hover:bg-emerald-50/80 shadow-lg hover:shadow-xl' :
                    'border-purple-300 text-purple-700 bg-purple-50/60 hover:bg-purple-50/80 shadow-lg hover:shadow-xl'
                  : 'border-white/20 text-white bg-white/5 hover:bg-white/10'
              }`}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </motion.div>
              Explore Projects
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Stats Section with Gradient Awareness */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-6xl mx-auto"
        >
          <div className={`relative p-8 rounded-3xl backdrop-blur-xl border overflow-hidden transition-all duration-[3000ms] ${
            theme === 'light'
              ? currentGradient === 0 ? 'bg-green-50/40 border-green-200/60 shadow-2xl shadow-green-200/50' :
                currentGradient === 1 ? 'bg-orange-50/40 border-orange-200/60 shadow-2xl shadow-orange-200/50' :
                currentGradient === 2 ? 'bg-blue-50/40 border-blue-200/60 shadow-2xl shadow-blue-200/50' :
                currentGradient === 3 ? 'bg-emerald-50/40 border-emerald-200/60 shadow-2xl shadow-emerald-200/50' :
                'bg-purple-50/40 border-purple-200/60 shadow-2xl shadow-purple-200/50'
              : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
          }`}>
            
            {/* Enhanced Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, ${
                    theme === 'light' 
                      ? currentGradient === 0 ? '#10b981' :
                        currentGradient === 1 ? '#f97316' :
                        currentGradient === 2 ? '#3b82f6' :
                        currentGradient === 3 ? '#059669' :
                        '#8b5cf6'
                      : '#ffffff'
                  } 1px, transparent 0), radial-gradient(circle at 75% 75%, ${
                    theme === 'light' 
                      ? currentGradient === 0 ? '#06b6d4' :
                        currentGradient === 1 ? '#ec4899' :
                        currentGradient === 2 ? '#6366f1' :
                        currentGradient === 3 ? '#84cc16' :
                        '#ec4899'
                      : '#ffffff'
                  } 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}
              />
            </div>

            {/* Header */}
            <div className="relative z-10 text-center mb-8">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border font-medium mb-4 transition-all duration-[3000ms] ${
                  theme === 'light'
                    ? currentGradient === 0 ? 'bg-green-100/80 border-green-300/60 text-green-700' :
                      currentGradient === 1 ? 'bg-orange-100/80 border-orange-300/60 text-orange-700' :
                      currentGradient === 2 ? 'bg-blue-100/80 border-blue-300/60 text-blue-700' :
                      currentGradient === 3 ? 'bg-emerald-100/80 border-emerald-300/60 text-emerald-700' :
                      'bg-purple-100/80 border-purple-300/60 text-purple-700'
                    : 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30 text-purple-300'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                Platform Impact
              </motion.div>
              
              <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Transforming Entertainment{' '}
                <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-all duration-[3000ms] ${
                  theme === 'light'
                    ? currentGradient === 0 ? 'from-green-400 to-emerald-400' :
                      currentGradient === 1 ? 'from-orange-400 to-red-400' :
                      currentGradient === 2 ? 'from-blue-400 to-cyan-400' :
                      currentGradient === 3 ? 'from-emerald-400 to-green-400' :
                      'from-purple-400 to-fuchsia-400'
                    : 'from-purple-400 to-blue-400'
                }`}>
                  Investment
                </span>
              </h2>
              
              <p className={`text-lg ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Real numbers from our growing community of creators and investors
              </p>
            </div>

            {/* Main Stats Grid with Enhanced Gradient Awareness */}
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  icon: Target,
                  value: 20,
                  label: 'Active Projects',
                  color: theme === 'light'
                    ? currentGradient === 0 ? 'from-green-500 to-emerald-500' :
                      currentGradient === 1 ? 'from-orange-500 to-red-500' :
                      currentGradient === 2 ? 'from-blue-500 to-cyan-500' :
                      currentGradient === 3 ? 'from-emerald-500 to-green-500' :
                      'from-purple-500 to-fuchsia-500'
                    : 'from-purple-500 to-pink-500',
                  bgColor: theme === 'light' 
                    ? currentGradient === 0 ? 'from-green-100/80 to-emerald-100/80' :
                      currentGradient === 1 ? 'from-orange-100/80 to-red-100/80' :
                      currentGradient === 2 ? 'from-blue-100/80 to-cyan-100/80' :
                      currentGradient === 3 ? 'from-emerald-100/80 to-green-100/80' :
                      'from-purple-100/80 to-fuchsia-100/80'
                    : 'from-purple-500/20 to-pink-500/20',
                  shadowColor: theme === 'light' 
                    ? currentGradient === 0 ? 'shadow-green-500/25' :
                      currentGradient === 1 ? 'shadow-orange-500/25' :
                      currentGradient === 2 ? 'shadow-blue-500/25' :
                      currentGradient === 3 ? 'shadow-emerald-500/25' :
                      'shadow-purple-500/25'
                    : 'shadow-purple-500/25',
                  description: 'Films, Music & Series',
                  growth: '+45%'
                },
                {
                  icon: DollarSign,
                  value: 30,
                  unit: 'Cr+',
                  prefix: '₹',
                  label: 'Total Raised',
                  color: 'from-green-500 to-emerald-500',
                  bgColor: theme === 'light' ? 'from-green-100/80 to-emerald-100/80' : 'from-green-500/20 to-emerald-500/20',
                  shadowColor: 'shadow-green-500/25',
                  description: 'Across all projects',
                  growth: '+127%'
                },
                {
                  icon: Users,
                  value: 40000,
                  unit: '+',
                  label: 'Total Investors',
                  color: theme === 'light' 
                    ? currentGradient === 0 ? 'from-cyan-500 to-blue-500' :
                      currentGradient === 1 ? 'from-pink-500 to-rose-500' :
                      currentGradient === 2 ? 'from-indigo-500 to-purple-500' :
                      currentGradient === 3 ? 'from-lime-500 to-green-500' :
                      'from-violet-500 to-purple-500'
                    : 'from-blue-500 to-cyan-500',
                  bgColor: theme === 'light' 
                    ? currentGradient === 0 ? 'from-cyan-100/80 to-blue-100/80' :
                      currentGradient === 1 ? 'from-pink-100/80 to-rose-100/80' :
                      currentGradient === 2 ? 'from-indigo-100/80 to-purple-100/80' :
                      currentGradient === 3 ? 'from-lime-100/80 to-green-100/80' :
                      'from-violet-100/80 to-purple-100/80'
                    : 'from-blue-500/20 to-cyan-500/20',
                  shadowColor: theme === 'light' 
                    ? currentGradient === 0 ? 'shadow-cyan-500/25' :
                      currentGradient === 1 ? 'shadow-pink-500/25' :
                      currentGradient === 2 ? 'shadow-indigo-500/25' :
                      currentGradient === 3 ? 'shadow-lime-500/25' :
                      'shadow-violet-500/25'
                    : 'shadow-blue-500/25',
                  description: 'Active community',
                  growth: '+89%'
                },
                {
                  icon: TrendingUp,
                  value: 230,
                  unit: '%',
                  label: 'Avg Returns',
                  color: 'from-yellow-500 to-orange-500',
                  bgColor: theme === 'light' ? 'from-yellow-100/80 to-orange-100/80' : 'from-yellow-500/20 to-orange-500/20',
                  shadowColor: 'shadow-yellow-500/25',
                  description: 'Quarterly average',
                  growth: '+23%'
                }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`group relative p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br ${stat.bgColor} border transition-all duration-[3000ms] hover:${stat.shadowColor} hover:shadow-2xl ${
                      theme === 'light'
                        ? 'border-white/60 hover:border-white/80'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                  {/* Background Glow */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0, 0.1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  />
                  
                  <div className="relative z-10 text-center">
                    {/* Icon with Enhanced Animation */}
                    <motion.div
                      className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-20 mb-4 relative overflow-hidden`}
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        transition: { duration: 0.6 }
                      }}
                    >
                      {/* Icon Glow Effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-30 blur-lg`}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      <stat.icon className={`w-8 h-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent relative z-10`} />
                    </motion.div>
                    
                    {/* Value with Growth Indicator */}
                    <div className="mb-2">
                      <motion.div
                        className={`text-5xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2
                        }}
                      >
                        <AnimatedNumber value={stat.value} format={(v) => `${stat.prefix || ''}${v.toLocaleString()}${stat.unit || ''}`}/>
                      </motion.div>
                      
                      {/* Growth Badge */}
                      <motion.div 
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          theme === 'light'
                            ? 'bg-green-100/80 text-green-700'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                        animate={{
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3
                        }}
                      >
                        <TrendingUp className="w-3 h-3" />
                        {stat.growth}
                      </motion.div>
                    </div>
                    
                    {/* Label and Description */}
                    <motion.div
                      className={`text-lg font-semibold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
                      animate={{
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.1
                      }}
                    >
                      {stat.label}
                    </motion.div>
                    
                    <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {stat.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Metrics with Gradient Awareness */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Globe,
                  title: 'Global Reach',
                  value: '15 Countries',
                  description: 'Investors from around the world',
                  color: theme === 'light' 
                    ? currentGradient === 0 ? 'text-emerald-400' :
                      currentGradient === 1 ? 'text-orange-400' :
                      currentGradient === 2 ? 'text-blue-400' :
                      currentGradient === 3 ? 'text-green-400' :
                      'text-purple-400'
                    : 'text-blue-400'
                },
                {
                  icon: Calendar,
                  title: 'Success Rate',
                  value: '87%',
                  description: 'Projects meeting funding goals',
                  color: 'text-green-400'
                },
                {
                  icon: Coins,
                  title: 'Avg Investment',
                  value: '₹25,000',
                  description: 'Per investor per project',
                  color: 'text-yellow-400'
                }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`text-center p-4 rounded-xl border transition-all duration-[3000ms] ${
                    theme === 'light'
                      ? currentGradient === 0 ? 'bg-green-50/50 border-green-200/60' :
                        currentGradient === 1 ? 'bg-orange-50/50 border-orange-200/60' :
                        currentGradient === 2 ? 'bg-blue-50/50 border-blue-200/60' :
                        currentGradient === 3 ? 'bg-emerald-50/50 border-emerald-200/60' :
                        'bg-purple-50/50 border-purple-200/60'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    <metric.icon className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
                  </motion.div>
                  <div className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {metric.value}
                  </div>
                  <div className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    {metric.title}
                  </div>
                  <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {metric.description}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="relative z-10 text-center mt-8 pt-6 border-t border-white/10"
            >
              <p className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Join thousands of investors who are already shaping the future of entertainment
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <motion.span 
                  className={`flex items-center gap-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                >
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  SEBI Registered
                </motion.span>
                <motion.span 
                  className={`flex items-center gap-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  Blockchain Secured
                </motion.span>
                <motion.span 
                  className={`flex items-center gap-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  Real Ownership
                </motion.span>
                <motion.span 
                  className={`flex items-center gap-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  Transparent Returns
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator with Gradient Awareness */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-6 h-10 border-2 rounded-full flex justify-center transition-all duration-[3000ms] ${
            theme === 'light' 
              ? currentGradient === 0 ? 'border-green-400' :
                currentGradient === 1 ? 'border-orange-400' :
                currentGradient === 2 ? 'border-blue-400' :
                currentGradient === 3 ? 'border-emerald-400' :
                'border-purple-400'
              : 'border-white/30'
          }`}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-1 h-3 rounded-full mt-2 transition-all duration-[3000ms] ${
              theme === 'light' 
                ? currentGradient === 0 ? 'bg-green-500' :
                  currentGradient === 1 ? 'bg-orange-500' :
                  currentGradient === 2 ? 'bg-blue-500' :
                  currentGradient === 3 ? 'bg-emerald-500' :
                  'bg-purple-500'
                : 'bg-white/50'
            }`}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;