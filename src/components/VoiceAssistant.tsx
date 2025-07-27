import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mic, MicOff, Volume2, Brain, Sparkles } from "lucide-react";

interface CourseRecommendation {
  course: string;
  reason: string;
  priority: number;
}

const VoiceAssistant = () => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);
  const [response, setResponse] = useState("");
  const recognitionRef = useRef<any>(null);
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState("");

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setTranscript(finalTranscript);
            processVoiceInput(finalTranscript);
          }
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          toast({
            title: "Voice Recognition Error",
            description: "Please try again or check your microphone permissions.",
            variant: "destructive"
          });
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const analyzeUserProfile = (input: string): CourseRecommendation[] => {
    const lowerInput = input.toLowerCase();
    const recommendations: CourseRecommendation[] = [];

    // Extract experience level
    const experienceMatch = lowerInput.match(/(\d+)\s*(year|yr)/);
    const experience = experienceMatch ? parseInt(experienceMatch[1]) : 0;

    // Check current role/field
    const isJavaDeveloper = lowerInput.includes('java') && lowerInput.includes('developer');
    const isPythonDeveloper = lowerInput.includes('python') && lowerInput.includes('developer');
    const isSysAdmin = lowerInput.includes('system admin') || lowerInput.includes('sysadmin');
    const isNewbie = lowerInput.includes('fresher') || lowerInput.includes('beginner') || experience === 0;
    
    // Check goals
    const wantsDevOps = lowerInput.includes('devops') || lowerInput.includes('dev ops');
    const wantsCloud = lowerInput.includes('cloud') || lowerInput.includes('aws') || lowerInput.includes('azure');
    const wantsInterview = lowerInput.includes('interview') || lowerInput.includes('job');

    // Generate recommendations based on analysis
    if (experience >= 3 && (isJavaDeveloper || isPythonDeveloper) && (wantsDevOps || wantsCloud)) {
      recommendations.push({
        course: "Real-Time DevOps Projects",
        reason: "Perfect for experienced developers transitioning to DevOps with hands-on projects",
        priority: 1
      });
      recommendations.push({
        course: "Interview Mastery Program",
        reason: "Leverage your development experience for DevOps interviews",
        priority: 2
      });
    } else if (experience >= 5 && wantsInterview) {
      recommendations.push({
        course: "Interview Mastery Program",
        reason: "Fast-track your DevOps career transition with targeted interview preparation",
        priority: 1
      });
    } else if (experience < 3 || isNewbie) {
      recommendations.push({
        course: "Complete DevOps Mastery",
        reason: "Comprehensive foundation for DevOps beginners",
        priority: 1
      });
      recommendations.push({
        course: "Real-Time DevOps Projects",
        reason: "Build practical skills with real-world projects",
        priority: 2
      });
    } else if (isSysAdmin && (wantsDevOps || wantsCloud)) {
      recommendations.push({
        course: "Real-Time DevOps Projects",
        reason: "Transition from traditional admin to modern DevOps practices",
        priority: 1
      });
    }

    return recommendations.sort((a, b) => a.priority - b.priority);
  };

  const generateVoiceResponse = (userInput: string, recommendations: CourseRecommendation[]): string => {
    const lowerInput = userInput.toLowerCase();
    let response = "Based on your profile, ";

    if (recommendations.length > 0) {
      const topRecommendation = recommendations[0];
      response += `I highly recommend the ${topRecommendation.course}. ${topRecommendation.reason}.`;
      
      if (recommendations.length > 1) {
        response += ` You might also consider the ${recommendations[1].course} as a follow-up.`;
      }
      
      response += " Would you like me to provide more details about these courses or help you get started with enrollment?";
    } else {
      response += "I'd love to help you choose the right course. Could you tell me more about your current role, experience level, and career goals?";
    }

    return response;
  };

  const processVoiceInput = async (input: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const courseRecommendations = analyzeUserProfile(input);
    setRecommendations(courseRecommendations);
    
    const aiResponse = generateVoiceResponse(input, courseRecommendations);
    setResponse(aiResponse);
    
    // Text-to-speech response
    if (elevenLabsApiKey) {
      await speakResponse(aiResponse);
    } else {
      // Fallback to browser TTS
      const utterance = new SpeechSynthesisUtterance(aiResponse);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
    
    setIsProcessing(false);
    
    toast({
      title: "AI Analysis Complete",
      description: "I've analyzed your profile and provided course recommendations.",
    });
  };

  const speakResponse = async (text: string) => {
    if (!elevenLabsApiKey) return;
    
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/9BWtsMINqrJLrRacOk9x', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      }
    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      // Fallback to browser TTS
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("");
      setRecommendations([]);
      setResponse("");
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <section id="voice-assistant" className="py-20 bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-accent rounded-full mb-6">
            <Brain className="h-5 w-5 text-primary" />
            <span className="text-primary font-semibold">AI-Powered Career Assistant</span>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Voice-Activated Course Recommendations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simply speak your background and career goals. Our AI will analyze your profile and recommend the perfect DevOps learning path.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* API Key Input */}
          {!elevenLabsApiKey && (
            <Card className="border-dashed border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-center">Optional: Enhanced Voice Response</CardTitle>
                <CardDescription className="text-center">
                  Enter your ElevenLabs API key for premium voice responses (or skip to use browser TTS)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <input
                    type="password"
                    placeholder="Enter ElevenLabs API key (optional)"
                    value={elevenLabsApiKey}
                    onChange={(e) => setElevenLabsApiKey(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <Button variant="outline" onClick={() => setElevenLabsApiKey("")}>
                    Skip
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Voice Interface */}
          <Card className="bg-gradient-card shadow-hero border-0">
            <CardHeader className="text-center">
              <CardTitle>🎤 Start Speaking</CardTitle>
              <CardDescription>
                Try saying: "Hi, I'm a Java developer with 5 years of experience and want to switch to DevOps and Cloud"
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={isListening ? stopListening : startListening}
                  className={`h-20 w-20 rounded-full ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-gradient-hero shadow-hero'
                  }`}
                  disabled={isProcessing}
                >
                  {isListening ? (
                    <MicOff className="h-8 w-8" />
                  ) : (
                    <Mic className="h-8 w-8" />
                  )}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {isListening ? "🔴 Listening... Speak now!" : 
                   isProcessing ? "🤖 AI is analyzing your profile..." : 
                   "Click the microphone to start"}
                </p>
              </div>

              {transcript && (
                <div className="p-4 bg-gradient-accent rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">What you said:</h4>
                  <p className="text-sm">{transcript}</p>
                </div>
              )}

              {recommendations.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-primary">AI Course Recommendations</h4>
                  </div>
                  <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="p-4 bg-gradient-accent rounded-lg border border-primary/20">
                        <div className="flex items-start justify-between mb-2">
                          <Badge className="bg-primary/10 text-primary">
                            Priority {rec.priority}
                          </Badge>
                        </div>
                        <h5 className="font-semibold text-lg mb-2">{rec.course}</h5>
                        <p className="text-sm text-muted-foreground">{rec.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {response && (
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-primary">AI Response</h4>
                  </div>
                  <p className="text-sm">{response}</p>
                </div>
              )}

              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-hero text-primary-foreground hover:bg-gradient-hero/90"
                >
                  Get Personalized Consultation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Example Prompts */}
          <Card className="border-dashed border-2 border-muted">
            <CardHeader>
              <CardTitle className="text-center">Example Voice Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-gradient-accent rounded-lg">
                  <p className="text-sm font-medium mb-1">Beginner:</p>
                  <p className="text-xs text-muted-foreground">"I'm new to tech and want to learn DevOps"</p>
                </div>
                <div className="p-3 bg-gradient-accent rounded-lg">
                  <p className="text-sm font-medium mb-1">Developer:</p>
                  <p className="text-xs text-muted-foreground">"I'm a Python developer with 3 years experience"</p>
                </div>
                <div className="p-3 bg-gradient-accent rounded-lg">
                  <p className="text-sm font-medium mb-1">Career Switch:</p>
                  <p className="text-xs text-muted-foreground">"I'm a system admin wanting to move to cloud"</p>
                </div>
                <div className="p-3 bg-gradient-accent rounded-lg">
                  <p className="text-sm font-medium mb-1">Interview Prep:</p>
                  <p className="text-xs text-muted-foreground">"I need help with DevOps interviews"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default VoiceAssistant;