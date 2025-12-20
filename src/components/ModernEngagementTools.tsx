import React from 'react';
import ARBusinessCard from './ARBusinessCard';
import GitHubIntegration from './GitHubIntegration';
import TechNewsCommentary from './TechNewsCommentary';

const ModernEngagementTools = () => {
  return (
    <section id="modern-tools" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-tech bg-clip-text text-transparent">
            Modern Engagement Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience next-generation mentoring with cutting-edge technology that showcases 
            expertise in today's rapidly evolving tech landscape
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ARBusinessCard />
          <GitHubIntegration />
          <TechNewsCommentary />
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-card p-8 rounded-2xl border border-primary/20 shadow-tech">
            <h3 className="text-2xl font-bold mb-4">Experience the Future of Tech Mentoring</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These tools demonstrate real-world application of emerging technologies, 
              giving you hands-on experience with the tools that define modern software development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-primary/10 px-4 py-2 rounded-full text-sm font-medium text-primary">
                AR/VR Integration
              </div>
              <div className="bg-accent/10 px-4 py-2 rounded-full text-sm font-medium text-accent">
                Real-time Data Analytics
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernEngagementTools;