import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Users, ArrowRight, Zap, DollarSign, Award } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import Typewriter from './Typewriter';

const ProblemSolution: React.FC = () => {
  const { theme } = useTheme();

  const problems = [
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Studios struggle to fund bold stories",
      description: "Risk-averse executives pass on innovative content, limiting creative diversity."
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Creators are underpaid by platforms",
      description: "Streaming giants take massive cuts while artists see minimal returns."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Fans get no stake in viral content",
      description: "Audiences make content successful but receive zero financial benefit."
    }
  ];

  const solutions = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Fans invest with as little as ₹10K",
      description: "Democratized investing makes entertainment funding accessible to everyone."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Creators raise funding directly",
      description: "Cut out middlemen and connect directly with your audience for faster funding."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Returns, perks, and access flow back",
      description: "Successful projects reward supporters with profits, perks, and exclusive access."
    }
  ];

  return (
    <section className={`py-24 ${
      theme === 'light' 
        ? 'animated-gradient-light' 
        : 'bg-gradient-to-b from-black to-gray-900'
    }`}>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Problem Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl md:text-6xl font-bold mb-8 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            <Typewriter
              text="The entertainment industry is broken"
              className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
            />
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            While audiences crave authentic stories, systemic barriers prevent great content from reaching the world.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`group relative p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 ${
                theme === 'light'
                  ? 'bg-white/40 border-white/60 shadow-lg hover:shadow-xl'
                  : 'bg-gradient-to-br from-red-500/10 to-orange-500/5 border-red-500/20 hover:border-red-500/40'
              }`}
            >
              <div className="relative z-10">
                <div className="text-red-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {problem.icon}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {problem.title}
                </h3>
                <p className={`leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center mb-20"
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <ArrowRight className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 blur-xl opacity-50 animate-pulse" />
          </div>
        </motion.div>

        {/* Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl md:text-6xl font-bold mb-8 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            <Typewriter
              text="Circles turns audiences into stakeholders"
              className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            />
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            We're building a world where passion meets ownership, where fans become co-producers of the culture they love.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`group relative p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 ${
                theme === 'light'
                  ? 'bg-white/40 border-white/60 shadow-lg hover:shadow-xl'
                  : 'bg-gradient-to-br from-green-500/10 to-blue-500/5 border-green-500/20 hover:border-green-500/40'
              }`}
            >
              <div className="relative z-10">
                <div className="text-green-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {solution.icon}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {solution.title}
                </h3>
                <p className={`leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {solution.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border font-medium ${
            theme === 'light'
              ? 'bg-white/60 border-purple-300/60 text-purple-700'
              : 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30 text-purple-300'
          }`}>
            <Zap className="w-5 h-5" />
            Ready to be part of the solution?
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemSolution;