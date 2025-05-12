import { memo, useState } from 'react';

interface IdeaCardProps {
  title: string;
  summary: string;
  problem: string;
  targetAudience: string;
  coreFeatures: string[];
  benefits: string;
  techStack?: string[];
  monetization?: string[];
  challenges: string[];
  nextSteps: string[];
}

const IdeaCard = memo(({
  title,
  summary,
  problem,
  targetAudience,
  coreFeatures,
  benefits,
  techStack,
  monetization,
  challenges,
  nextSteps,
}: IdeaCardProps) => {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'challenges' | 'steps'>('details');

  const handleSave = () => {
    setSaved(!saved);
  };
  
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 space-y-6 border border-white/10 shadow-lg transition-all duration-300 hover:shadow-glow">
      {/* Header with Title and Summary */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
              {techStack ? 'Learning Project' : 'Startup Idea'}
            </span>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{summary}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex rounded-lg bg-white/5 p-1">
        <button
          onClick={() => setActiveTab('details')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'details' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'challenges' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          Challenges
        </button>
        <button
          onClick={() => setActiveTab('steps')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'steps' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          Next Steps
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="min-h-[320px]">
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <div className="space-y-4">
              <DetailSection title="Problem" content={problem} />
              <DetailSection title="Target Audience" content={targetAudience} />
              <DetailSection 
                title="Core Features" 
                content={
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-1">
                    {coreFeatures.map((feature, index) => (
                      <li key={index} className="text-sm">{feature}</li>
                    ))}
                  </ul>
                } 
              />
            </div>

            <div className="space-y-4">
              <DetailSection title="Benefits" content={benefits} />

              {techStack && (
                <DetailSection 
                  title="Tech Stack" 
                  content={
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/10 rounded-full text-xs text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  } 
                />
              )}

              {monetization && (
                <DetailSection 
                  title="Monetization" 
                  content={
                    <ul className="list-disc list-inside text-gray-300 space-y-1 ml-1">
                      {monetization.map((strategy, index) => (
                        <li key={index} className="text-sm">{strategy}</li>
                      ))}
                    </ul>
                  } 
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-white mb-3">Potential Challenges</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {challenges.map((challenge, index) => (
                <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm text-gray-300">{challenge}</p>
                </div>
              ))}
            </div>
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3 mt-4">
              <p className="text-sm text-yellow-300/80">
                Addressing these challenges early will increase your chances of success. Consider each one carefully in your planning phase.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'steps' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-white mb-3">Recommended Next Steps</h3>
            <ol className="space-y-3">
              {nextSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black font-semibold text-sm mr-3 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex-1">
                    <p className="text-sm text-gray-300">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-white/10">
        <div className="text-xs text-gray-400">Generated just now</div>
        <div className="flex space-x-3">
          <button 
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
              saved 
                ? 'bg-green-900/20 text-green-400 border border-green-400/30' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>{saved ? 'Saved' : 'Save Idea'}</span>
          </button>
          <button className="px-4 py-2 rounded-lg bg-white text-black hover:bg-opacity-90 transition-all duration-200 border border-transparent active:scale-95">
            Generate Another
          </button>
        </div>
      </div>
    </div>
  );
});

// Detail section component to keep the main component cleaner
const DetailSection = ({ title, content }: { title: string, content: React.ReactNode | string }) => (
  <div>
    <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">{title}</h3>
    {typeof content === 'string' ? (
      <p className="text-gray-300 text-sm">{content}</p>
    ) : (
      content
    )}
  </div>
);

export default IdeaCard; 