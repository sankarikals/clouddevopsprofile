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
    
    // Simulate AI code generation based on voice input
    const codeExamples = {
      'react component': `import React, { useState } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Counter Component</h2>
      <p className="mb-4">Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Increment
      </button>
    </div>
  );
};

export default MyComponent;`,
      'api endpoint': `// Express.js API endpoint
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});`,
      'database query': `-- SQL Query Example
SELECT u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY u.id
ORDER BY order_count DESC;`,
      'authentication': `// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};`
    };

    // Simple matching logic
    const lowerTranscript = transcript.toLowerCase();
    let selectedCode = '';
    
    if (lowerTranscript.includes('react') || lowerTranscript.includes('component')) {
      selectedCode = codeExamples['react component'];
    } else if (lowerTranscript.includes('api') || lowerTranscript.includes('endpoint')) {
      selectedCode = codeExamples['api endpoint'];
    } else if (lowerTranscript.includes('database') || lowerTranscript.includes('query')) {
      selectedCode = codeExamples['database query'];
    } else if (lowerTranscript.includes('auth') || lowerTranscript.includes('login')) {
      selectedCode = codeExamples['authentication'];
    } else {
      selectedCode = `// Generated based on: "${transcript}"
// Here's a basic implementation structure:

const solution = {
  // Implementation based on your requirements
  requirement: "${transcript}",
  
  implementation: function() {
    // Add your logic here
    console.log("Implementing: ${transcript}");
  }
};

export default solution;`;
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
              <pre className="bg-muted/30 p-4 rounded-lg overflow-x-auto text-sm border border-secondary/20">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>
        )}

        <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
          <h4 className="font-semibold text-sm mb-2">Supported Commands:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>• "Create a React component"</div>
            <div>• "Build an API endpoint"</div>
            <div>• "Write a database query"</div>
            <div>• "Add authentication logic"</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceToCodeAssistant;