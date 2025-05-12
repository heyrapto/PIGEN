import { useState } from 'react';

interface IdeaCardProps {
  title: string;
  summary: string;
  problem: string;
  targetAudience: string;
  coreFeatures: string[];
  benefits: string;
  techStack: string[];
  monetization: string[];
  challenges: string[];
  nextSteps: string[];
}

const IdeaCard = ({
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
  const [activeTab, setActiveTab] = useState<
    'overview' | 'features' | 'technical' | 'business'
  >('overview');

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-3 sm:px-5 py-2 sm:py-4 bg-gradient-to-r from-white/10 to-transparent border-b border-white/10">
        <h3 className="text-base sm:text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 mt-1">{summary}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-black/20 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'features', label: 'Features' },
          { id: 'technical', label: 'Technical' },
          { id: 'business', label: 'Business' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium min-w-max ${
              activeTab === tab.id
                ? 'text-white border-b-2 border-white'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5">
        {activeTab === 'overview' && (
          <div className="space-y-3 sm:space-y-4">
            <Section title="Problem">
              <p className="text-xs sm:text-sm text-gray-300">{problem}</p>
            </Section>
            <Section title="Target Audience">
              <p className="text-xs sm:text-sm text-gray-300">{targetAudience}</p>
            </Section>
            <Section title="Benefits">
              <p className="text-xs sm:text-sm text-gray-300">{benefits}</p>
            </Section>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-3 sm:space-y-4">
            <Section title="Core Features">
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                {coreFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </Section>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="space-y-3 sm:space-y-4">
            <Section title="Tech Stack">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 bg-white/10 rounded-md text-xs text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Section>
            <Section title="Technical Challenges">
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                {challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </Section>
          </div>
        )}

        {activeTab === 'business' && (
          <div className="space-y-3 sm:space-y-4">
            <Section title="Monetization">
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                {monetization.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Section>
            <Section title="Next Steps">
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                {nextSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <h4 className="text-xs sm:text-sm font-semibold text-white mb-1 sm:mb-2">{title}</h4>
      {children}
    </div>
  );
};

export default IdeaCard; 