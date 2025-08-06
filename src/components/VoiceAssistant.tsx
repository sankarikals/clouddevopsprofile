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
  matchScore: number;
}

interface UserProfile {
  experience: number;
  role: string;
  skills: string[];
  goals: string[];
  previousRecommendations: string[];
  conversationHistory: string[];
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
  const [userProfile, setUserProfile] = useState<UserProfile>({
    experience: 0,
    role: "",
    skills: [],
    goals: [],
    previousRecommendations: [],
    conversationHistory: []
  });

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
    
    // Update conversation history
    const updatedProfile = { ...userProfile };
    updatedProfile.conversationHistory.push(input);
    
    // Advanced analysis with multiple factors
    const analysis = {
      experience: extractExperience(lowerInput),
      technologies: extractTechnologies(lowerInput),
      role: extractRole(lowerInput),
      goals: extractGoals(lowerInput),
      urgency: extractUrgency(lowerInput),
      currentLevel: assessCurrentLevel(lowerInput)
    };
    
    // Update user profile
    updatedProfile.experience = Math.max(updatedProfile.experience, analysis.experience);
    updatedProfile.skills = [...new Set([...updatedProfile.skills, ...analysis.technologies])];
    updatedProfile.goals = [...new Set([...updatedProfile.goals, ...analysis.goals])];
    if (analysis.role) updatedProfile.role = analysis.role;
    
    setUserProfile(updatedProfile);
    
    // Generate intelligent recommendations
    const courses = [
      {
        name: "Complete DevOps Mastery",
        targetExp: [0, 1, 2],
        technologies: ["basics", "fundamentals", "beginner"],
        goals: ["learn", "start", "begin", "foundation"],
        description: "Comprehensive foundation covering CI/CD, containerization, and cloud basics"
      },
      {
        name: "Real-Time DevOps Projects",
        targetExp: [1, 2, 3, 4, 5],
        technologies: ["docker", "kubernetes", "jenkins", "aws", "terraform"],
        goals: ["practice", "hands-on", "project", "experience"],
        description: "Industry-standard projects with real deployment scenarios"
      },
      {
        name: "Interview Mastery Program",
        targetExp: [2, 3, 4, 5, 6, 7, 8],
        technologies: ["interview", "job", "career"],
        goals: ["job", "interview", "career", "switch", "transition"],
        description: "Targeted preparation for DevOps and Cloud engineering interviews"
      },
      {
        name: "Advanced Cloud Architecture",
        targetExp: [3, 4, 5, 6, 7, 8],
        technologies: ["aws", "azure", "gcp", "cloud", "architecture"],
        goals: ["cloud", "architect", "scale", "enterprise"],
        description: "Design scalable cloud solutions and advanced DevOps patterns"
      },
      {
        name: "Kubernetes Mastery Bootcamp",
        targetExp: [2, 3, 4, 5],
        technologies: ["kubernetes", "k8s", "container", "orchestration"],
        goals: ["kubernetes", "container", "orchestration", "microservices"],
        description: "Deep dive into Kubernetes orchestration and container management"
      }
    ];
    
    const recommendations: CourseRecommendation[] = [];
    
    for (const course of courses) {
      let matchScore = 0;
      
      // Experience match
      if (course.targetExp.includes(analysis.experience)) matchScore += 30;
      else if (Math.abs(course.targetExp[0] - analysis.experience) <= 1) matchScore += 15;
      
      // Technology match
      const techMatches = course.technologies.filter(tech => 
        analysis.technologies.includes(tech) || lowerInput.includes(tech)
      ).length;
      matchScore += techMatches * 20;
      
      // Goal match
      const goalMatches = course.goals.filter(goal => 
        analysis.goals.includes(goal) || lowerInput.includes(goal)
      ).length;
      matchScore += goalMatches * 25;
      
      // Avoid repetition - reduce score for previously recommended courses
      if (updatedProfile.previousRecommendations.includes(course.name)) {
        matchScore -= 40;
      }
      
      // Urgency bonus
      if (analysis.urgency > 0) {
        if (course.name.includes("Interview")) matchScore += 20;
      }
      
      if (matchScore > 20) {
        recommendations.push({
          course: course.name,
          reason: course.description,
          priority: Math.ceil((100 - matchScore) / 20),
          matchScore
        });
      }
    }
    
    // Sort by match score and limit to top 3
    const sortedRecs = recommendations
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
    
    // Update previous recommendations
    updatedProfile.previousRecommendations.push(...sortedRecs.map(r => r.course));
    setUserProfile(updatedProfile);
    
    return sortedRecs;
  };
  
  const extractExperience = (input: string): number => {
    const experienceMatch = input.match(/(\d+)\s*(year|yr|experience)/i);
    if (experienceMatch) return parseInt(experienceMatch[1]);
    
    if (input.includes('fresher') || input.includes('beginner') || input.includes('new')) return 0;
    if (input.includes('senior') || input.includes('lead')) return 5;
    if (input.includes('junior')) return 1;
    
    return userProfile.experience;
  };
  
  const extractTechnologies = (input: string): string[] => {
    const techKeywords = [
      'java', 'python', 'javascript', 'react', 'node', 'spring',
      'docker', 'kubernetes', 'jenkins', 'git', 'aws', 'azure', 'gcp',
      'terraform', 'ansible', 'linux', 'mysql', 'mongodb', 'redis'
    ];
    
    return techKeywords.filter(tech => input.includes(tech));
  };
  
  const extractRole = (input: string): string => {
    const roles = [
      'developer', 'engineer', 'programmer', 'architect', 'admin', 'analyst',
      'manager', 'lead', 'senior', 'junior', 'fresher'
    ];
    
    for (const role of roles) {
      if (input.includes(role)) return role;
    }
    
    return userProfile.role;
  };
  
  const extractGoals = (input: string): string[] => {
    const goalKeywords = [
      'learn', 'switch', 'transition', 'job', 'interview', 'career',
      'devops', 'cloud', 'practice', 'project', 'skill', 'certification'
    ];
    
    return goalKeywords.filter(goal => input.includes(goal));
  };
  
  const extractUrgency = (input: string): number => {
    if (input.includes('urgent') || input.includes('asap') || input.includes('quickly')) return 3;
    if (input.includes('soon') || input.includes('fast')) return 2;
    if (input.includes('eventually') || input.includes('future')) return 1;
    return 0;
  };
  
  const assessCurrentLevel = (input: string): string => {
    if (input.includes('expert') || input.includes('advanced')) return 'advanced';
    if (input.includes('intermediate') || input.includes('some experience')) return 'intermediate';
    return 'beginner';
  };

  const generateVoiceResponse = (userInput: string, recommendations: CourseRecommendation[]): string => {
    const conversationCount = userProfile.conversationHistory.length;
    
    // Personalized greeting based on conversation history
    let greeting = "";
    if (conversationCount === 1) {
      greeting = `Hello! Thanks for sharing your background. `;
    } else if (conversationCount > 1) {
      greeting = `I see you're looking for more specific guidance. `;
    }
    
    if (recommendations.length === 0) {
      return `${greeting}I'd love to help you find the perfect DevOps learning path. Could you tell me more about your current role, years of experience, and what specific goals you're trying to achieve?`;
    }
    
    const topRec = recommendations[0];
    const hasMultiple = recommendations.length > 1;
    
    // Dynamic response based on match quality and context
    let response = greeting;
    
    if (topRec.matchScore >= 80) {
      response += `Based on your profile, you're an excellent fit for the ${topRec.course}. `;
    } else if (topRec.matchScore >= 60) {
      response += `I believe the ${topRec.course} would be a great choice for you. `;
    } else {
      response += `Considering your background, I'd suggest starting with the ${topRec.course}. `;
    }
    
    response += `${topRec.reason}. `;
    
    if (hasMultiple) {
      const secondRec = recommendations[1];
      if (topRec.matchScore - secondRec.matchScore < 20) {
        response += `Alternatively, the ${secondRec.course} could also be valuable for your goals. `;
      } else {
        response += `For your next step, consider the ${secondRec.course}. `;
      }
    }
    
    // Contextual follow-up questions
    if (userProfile.goals.includes('job') || userProfile.goals.includes('interview')) {
      response += "Are you currently interviewing or preparing for a career transition? ";
    } else if (userProfile.experience === 0) {
      response += "Do you have any prior experience with tools like Git, Linux, or cloud platforms? ";
    } else if (userProfile.skills.includes('docker') || userProfile.skills.includes('kubernetes')) {
      response += "How comfortable are you with containerization and orchestration? ";
    }
    
    response += "Would you like me to explain more about any of these recommendations?";
    
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
  
  const resetConversation = () => {
    setUserProfile({
      experience: 0,
      role: "",
      skills: [],
      goals: [],
      previousRecommendations: [],
      conversationHistory: []
    });
    setRecommendations([]);
    setResponse("");
    setTranscript("");
    toast({
      title: "Conversation Reset",
      description: "Starting fresh conversation with improved AI analysis.",
    });
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
                          <div className="flex gap-2">
                            <Badge className="bg-primary/10 text-primary">
                              Priority {rec.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {rec.matchScore}% match
                            </Badge>
                          </div>
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

              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-hero text-primary-foreground hover:bg-gradient-hero/90"
                >
                  Get Personalized Consultation
                </Button>
                {userProfile.conversationHistory.length > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={resetConversation}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Start New Conversation
                  </Button>
                )}
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