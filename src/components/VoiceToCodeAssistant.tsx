import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, Code, Copy, Play } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const VoiceToCodeAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const generateCode = async () => {
    if (!transcript.trim()) {
      toast({
        title: "No requirements detected",
        description: "Please speak your coding requirements first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Comprehensive code templates for various technologies
    const codeTemplates: Record<string, { keywords: string[]; code: string }> = {
      terraform_ec2: {
        keywords: ['ec2', 'terraform', 'aws instance', 'virtual machine aws'],
        code: `# Terraform - AWS EC2 Instance
provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "main" {
  ami           = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2
  instance_type = "t3.micro"

  vpc_security_group_ids = [aws_security_group.instance.id]

  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p 8080 &
              EOF

  tags = {
    Name        = "web-server"
    Environment = "dev"
    ManagedBy   = "terraform"
  }
}

resource "aws_security_group" "instance" {
  name = "ec2-security-group"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "public_ip" {
  value = aws_instance.main.public_ip
}`
      },
      terraform_s3: {
        keywords: ['s3', 'bucket', 'storage terraform'],
        code: `# Terraform - AWS S3 Bucket
resource "aws_s3_bucket" "main" {
  bucket = "my-unique-bucket-name-12345"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_versioning" "main" {
  bucket = aws_s3_bucket.main.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "main" {
  bucket = aws_s3_bucket.main.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "main" {
  bucket = aws_s3_bucket.main.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`
      },
      terraform_vpc: {
        keywords: ['vpc', 'network terraform', 'subnet'],
        code: `# Terraform - AWS VPC with Subnets
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "main-vpc"
  }
}

resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet-\${count.index + 1}"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "public-rt"
  }
}`
      },
      kubernetes_deployment: {
        keywords: ['kubernetes', 'k8s', 'deployment', 'pod', 'container orchestration'],
        code: `# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: nginx:latest
        ports:
        - containerPort: 80
        resources:
          limits:
            cpu: "500m"
            memory: "128Mi"
          requests:
            cpu: "250m"
            memory: "64Mi"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer`
      },
      docker: {
        keywords: ['docker', 'dockerfile', 'container', 'image'],
        code: `# Dockerfile - Multi-stage build for Node.js
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV NODE_ENV production

CMD ["node", "dist/index.js"]`
      },
      docker_compose: {
        keywords: ['docker compose', 'compose', 'multi container'],
        code: `# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:`
      },
      ansible: {
        keywords: ['ansible', 'playbook', 'configuration management'],
        code: `# Ansible Playbook - Server Setup
---
- name: Configure web servers
  hosts: webservers
  become: yes

  vars:
    app_user: deploy
    app_directory: /var/www/app

  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes
        cache_valid_time: 3600

    - name: Install required packages
      apt:
        name:
          - nginx
          - nodejs
          - npm
        state: present

    - name: Create application user
      user:
        name: "{{ app_user }}"
        shell: /bin/bash
        create_home: yes

    - name: Create application directory
      file:
        path: "{{ app_directory }}"
        state: directory
        owner: "{{ app_user }}"
        mode: '0755'

    - name: Copy nginx configuration
      template:
        src: templates/nginx.conf.j2
        dest: /etc/nginx/sites-available/app
      notify: Restart nginx

  handlers:
    - name: Restart nginx
      service:
        name: nginx
        state: restarted`
      },
      github_actions: {
        keywords: ['github action', 'ci cd', 'pipeline', 'workflow', 'cicd'],
        code: `# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linting
        run: npm run lint

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Docker image
        run: docker build -t myapp:\$\{GITHUB_SHA\} .
      
      - name: Push to registry
        run: |
          docker push myapp:\$\{GITHUB_SHA\}`
      },
      terraform_lambda: {
        keywords: ['lambda', 'serverless', 'function terraform'],
        code: `# Terraform - AWS Lambda Function
resource "aws_lambda_function" "main" {
  filename         = "lambda.zip"
  function_name    = "my-lambda-function"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  source_code_hash = filebase64sha256("lambda.zip")
  runtime          = "nodejs18.x"
  timeout          = 30
  memory_size      = 256

  environment {
    variables = {
      ENVIRONMENT = "production"
    }
  }

  tags = {
    Name = "my-lambda"
  }
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_api_gateway_rest_api" "main" {
  name = "my-api"
}`
      },
      terraform_rds: {
        keywords: ['rds', 'database terraform', 'mysql terraform', 'postgres terraform'],
        code: `# Terraform - AWS RDS Instance
resource "aws_db_instance" "main" {
  identifier           = "my-database"
  allocated_storage    = 20
  storage_type         = "gp3"
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "db.t3.micro"
  db_name              = "mydb"
  username             = "admin"
  password             = var.db_password
  parameter_group_name = "default.postgres15"
  skip_final_snapshot  = true

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "Mon:04:00-Mon:05:00"

  tags = {
    Name = "my-database"
  }
}

resource "aws_security_group" "rds" {
  name   = "rds-security-group"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "main"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "My DB subnet group"
  }
}`
      },
      terraform_eks: {
        keywords: ['eks', 'kubernetes aws', 'cluster terraform'],
        code: `# Terraform - AWS EKS Cluster
resource "aws_eks_cluster" "main" {
  name     = "my-eks-cluster"
  role_arn = aws_iam_role.eks_cluster.arn
  version  = "1.28"

  vpc_config {
    subnet_ids              = aws_subnet.private[*].id
    endpoint_private_access = true
    endpoint_public_access  = true
    security_group_ids      = [aws_security_group.eks_cluster.id]
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy,
    aws_iam_role_policy_attachment.eks_vpc_resource_controller,
  ]
}

resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "my-node-group"
  node_role_arn   = aws_iam_role.eks_node_group.arn
  subnet_ids      = aws_subnet.private[*].id

  scaling_config {
    desired_size = 2
    max_size     = 4
    min_size     = 1
  }

  instance_types = ["t3.medium"]

  depends_on = [
    aws_iam_role_policy_attachment.eks_worker_node_policy,
    aws_iam_role_policy_attachment.eks_cni_policy,
    aws_iam_role_policy_attachment.eks_container_registry_policy,
  ]
}`
      },
      react_component: {
        keywords: ['react', 'component', 'frontend'],
        code: `import React, { useState, useEffect } from 'react';

interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
}

const MyComponent: React.FC<Props> = ({ title, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default MyComponent;`
      },
      api_endpoint: {
        keywords: ['api', 'endpoint', 'rest', 'express'],
        code: `// Express.js REST API Endpoint
import express from 'express';
import { z } from 'zod';

const router = express.Router();

const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['admin', 'user']).default('user')
});

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      limit: parseInt(req.query.limit as string) || 10,
      offset: parseInt(req.query.offset as string) || 0
    });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create user
router.post('/users', async (req, res) => {
  try {
    const validated = UserSchema.parse(req.body);
    const user = await User.create(validated);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, errors: error.errors });
    } else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

export default router;`
      },
      sql_query: {
        keywords: ['sql', 'query', 'database', 'select'],
        code: `-- Advanced SQL Query Examples
-- Get users with order statistics
SELECT 
  u.id,
  u.name,
  u.email,
  COUNT(o.id) as total_orders,
  COALESCE(SUM(o.total_amount), 0) as total_spent,
  MAX(o.created_at) as last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)
GROUP BY u.id, u.name, u.email
HAVING total_orders > 0
ORDER BY total_spent DESC
LIMIT 100;

-- Create index for performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);`
      },
      authentication: {
        keywords: ['auth', 'login', 'jwt', 'authentication'],
        code: `// JWT Authentication Middleware
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const generateToken = (user: { id: string; email: string; role: string }) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
};`
      }
    };

    // Smart matching logic
    const lowerTranscript = transcript.toLowerCase();
    let selectedCode = '';
    let bestMatch = { score: 0, key: '' };

    // Find best matching template
    for (const [key, template] of Object.entries(codeTemplates)) {
      let score = 0;
      for (const keyword of template.keywords) {
        if (lowerTranscript.includes(keyword)) {
          score += keyword.split(' ').length; // Multi-word matches score higher
        }
      }
      if (score > bestMatch.score) {
        bestMatch = { score, key };
      }
    }

    if (bestMatch.score > 0) {
      selectedCode = codeTemplates[bestMatch.key].code;
    } else {
      selectedCode = `// No specific template found for: "${transcript}"
// 
// Try commands like:
// - "Create EC2 instance using Terraform"
// - "Create Kubernetes deployment"
// - "Write a Dockerfile"
// - "Create S3 bucket with Terraform"
// - "Setup GitHub Actions CI/CD pipeline"
// - "Create RDS database with Terraform"
// - "Write Lambda function with Terraform"
// - "Create VPC with subnets using Terraform"
// - "Write Ansible playbook"
// - "Create Docker Compose file"
// - "Create EKS cluster with Terraform"`;
    }

    setTimeout(() => {
      setGeneratedCode(selectedCode);
      setIsProcessing(false);
      toast({
        title: "Code Generated Successfully",
        description: "AI has generated code based on your voice requirements",
      });
    }, 1500);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Code Copied",
      description: "Generated code copied to clipboard",
    });
  };

  const clearAll = () => {
    setTranscript('');
    setGeneratedCode('');
  };

  return (
    <Card className="bg-gradient-to-br from-background to-secondary/5 border-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-secondary">
          <Code className="h-6 w-6" />
          Voice-to-Code Assistant
        </CardTitle>
        <CardDescription>
          Speak your requirements, get instant code examples
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={isListening ? stopListening : startListening}
            variant={isListening ? "destructive" : "default"}
            className={isListening ? "" : "bg-gradient-tech text-white"}
          >
            {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </Button>
          <Button onClick={generateCode} disabled={isProcessing || !transcript.trim()}>
            <Play className="h-4 w-4 mr-2" />
            {isProcessing ? 'Generating...' : 'Generate Code'}
          </Button>
          <Button variant="outline" onClick={clearAll}>
            Clear
          </Button>
        </div>

        {transcript && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Voice Requirements:</label>
            <Textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Your spoken requirements will appear here..."
              className="min-h-[80px]"
            />
          </div>
        )}

        {generatedCode && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Generated Code:</label>
              <Button variant="outline" size="sm" onClick={copyCode}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="relative">
              <pre className="bg-muted/30 p-4 rounded-lg overflow-x-auto text-sm border border-secondary/20 max-h-[400px] overflow-y-auto">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>
        )}

        <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
          <h4 className="font-semibold text-sm mb-2">Supported Commands:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>• "Create EC2 with Terraform"</div>
            <div>• "Create S3 bucket"</div>
            <div>• "Write a Dockerfile"</div>
            <div>• "Kubernetes deployment"</div>
            <div>• "Create VPC with Terraform"</div>
            <div>• "GitHub Actions pipeline"</div>
            <div>• "Lambda function Terraform"</div>
            <div>• "Docker Compose file"</div>
            <div>• "Ansible playbook"</div>
            <div>• "RDS database Terraform"</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceToCodeAssistant;