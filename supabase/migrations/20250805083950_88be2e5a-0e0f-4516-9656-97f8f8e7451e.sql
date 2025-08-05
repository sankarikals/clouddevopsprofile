-- Add new MLOps/GenAI course
INSERT INTO public.courses (
  title,
  description,
  duration,
  level,
  price,
  features,
  is_popular,
  published
) VALUES (
  'Advanced MLOps, GenAI & Agentic AI with MCP Server Integration',
  'Master the latest in Machine Learning Operations, Generative AI, and Agentic AI systems. Learn how to implement MCP (Model Context Protocol) servers for DevOps and cloud automation. This comprehensive course covers end-to-end MLOps pipelines, GenAI model deployment, agentic workflows, and practical MCP server use cases in modern cloud environments.',
  '4 weeks',
  'Advanced',
  259,
  ARRAY[
    'MLOps Pipeline Design & Implementation',
    'Generative AI Model Deployment at Scale',
    'Agentic AI System Architecture',
    'MCP Server Development & Integration',
    'Cloud-Native ML Infrastructure',
    'AI/ML DevOps Best Practices',
    'Model Monitoring & Governance',
    'Real-world Project Implementation'
  ],
  true,
  true
);