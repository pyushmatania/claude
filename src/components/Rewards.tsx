import React from 'react';
import { motion } from 'framer-motion';
import { Star, Gift, Users, Crown, Ticket, Award, Camera, Music } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import Typewriter from './Typewriter';

const Rewards: React.FC = () => {
  const { theme } = useTheme();

  const rewardTiers = [
    {
      title: "Supporter",
      minAmount: "₹10K",
      color: "from-gray-500 to-gray-600",
      icon: <Star className="w-6 h-6" />,
      perks: [
        "Early access to content",
        "Digital poster collection",
        "Exclusive updates",
        "Community access"
      ]
    },
    {
      title: "Backer",
      minAmount: "₹25K",
      color: "from-blue-500 to-cyan-500",
      icon: <Gift className="w-6 h-6" />,
      perks: [
        "All Supporter perks",
        "Behind-the-scenes content",
        "Digital soundtrack/script",
        "Virtual meet & greet"
      ],
      popular: true
    },
    {
      title: "Producer",
      minAmount: "₹50K",
      color: "from-purple-500 to-pink-500",
      icon: <Crown className="w-6 h-6" />,
      perks: [
        "All Backer perks",
        "Name in end credits",
        "Premiere screening invite",
        "Signed collectibles"
      ]
    },
    {
      title: "Executive",
      minAmount: "₹1L+",
      color: "from-yellow-500 to-orange-500",
      icon: <Award className="w-6 h-6" />,
      perks: [
        "All Producer perks",
        "Set visit opportunity",
        "Producer credit",
        "Revenue sharing (up to 15%)"
      ]
    }
  ];

  const uniqueExperiences = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "On-Set Experience",
      description: "Visit film sets, meet cast and crew, see movie magic in action",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Studio Sessions",
      description: "Join recording sessions, collaborate on tracks, influence creative decisions",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Ticket className="w-8 h-8" />,
      title: "Premiere Access",
      description: "Red carpet premieres, film festivals, exclusive screenings worldwide",
      image: "https://images.pexels.com/photos/2449665/pexels-photo-2449665.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Creator Network",
      description: "Join our exclusive community of investors, creators, and industry professionals",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section className={`py-24 ${
      theme === 'light' 
        ? 'animated-gradient-light' 
        : 'bg-gradient-to-b from-gray-900 to-black'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl md:text-6xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-8`}>
            <Typewriter
              text="Rewards & Perks"
              className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
            />
          </h2>
          <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto`}>
            More than just returns. Get exclusive access, unique experiences, and become part of the creative process.
          </p>
        </motion.div>

        {/* Reward Tiers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {rewardTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group ${tier.popular ? 'scale-105 lg:scale-110' : ''}`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="px-4 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-black text-sm font-bold">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className={`relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 h-full ${
                theme === 'light'
                  ? 'bg-white/40 border-white/60 shadow-lg hover:shadow-xl'
                  : `bg-gradient-to-br from-white/10 to-white/5 ${tier.popular ? 'border-yellow-500/40' : 'border-white/20'} hover:border-white/40`
              }`}>
                
                <div className="relative z-10">
                  {/* Tier Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${tier.color} bg-opacity-20 mb-4`}>
                      <div className={`bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                        {tier.icon}
                      </div>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{tier.title}</h3>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                      {tier.minAmount}
                    </div>
                  </div>

                  {/* Perks List */}
                  <div className="space-y-3">
                    {tier.perks.map((perk, perkIndex) => (
                      <div key={perkIndex} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tier.color} mt-2 flex-shrink-0`} />
                        <span className={`text-sm leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Unique Experiences */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className={`text-4xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} text-center mb-4`}>
            Unique{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experiences
            </span>
          </h3>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} text-center mb-12 max-w-2xl mx-auto`}>
            Go beyond traditional investing. Get access to once-in-a-lifetime experiences that money can't usually buy.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {uniqueExperiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
                  theme === 'light'
                    ? 'bg-white/40 border-white/60 hover:shadow-lg'
                    : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-white/40'
                }`}
              >
                {/* Background Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={experience.image} 
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-4 left-4">
                    <div className={`p-3 rounded-xl backdrop-blur-md border ${
                      theme === 'light'
                        ? 'bg-white/60 border-white/80'
                        : 'bg-white/10 border-white/20'
                    }`}>
                      <div className="text-white">
                        {experience.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{experience.title}</h4>
                  <p className={`leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{experience.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className={`p-8 rounded-2xl backdrop-blur-xl border ${
            theme === 'light'
              ? 'bg-white/40 border-white/60'
              : 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20'
          }`}>
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-4`}>
              More Than Just{' '}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Financial Returns
              </span>
            </h3>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              While our investors see an average of 15% returns, the real value is in becoming part of the creative process. 
              From influencing storylines to attending exclusive events, you're not just investing in content—you're shaping culture.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">15%</div>
                <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Avg. Returns</div>
              </div>
              <div className={`hidden sm:block w-px h-8 ${theme === 'light' ? 'bg-gray-300' : 'bg-white/20'}`} />
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">50+</div>
                <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Unique Perks</div>
              </div>
              <div className={`hidden sm:block w-px h-8 ${theme === 'light' ? 'bg-gray-300' : 'bg-white/20'}`} />
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">∞</div>
                <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Memories</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Rewards;