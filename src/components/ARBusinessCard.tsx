import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Smartphone, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ARBusinessCard = () => {
  const [qrGenerated, setQrGenerated] = useState(false);
  const { toast } = useToast();

  const generateARCard = () => {
    // Generate QR code that points to AR experience
    const arUrl = `${window.location.origin}/ar-profile`;
    setQrGenerated(true);
    
    toast({
      title: "AR Business Card Generated",
      description: "Scan with your phone to view 3D profile in AR",
    });
  };

  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:DevOps Mentor & Tech Expert
ORG:Professional Mentoring Services
URL:${window.location.origin}
EMAIL:mentor@example.com
NOTE:Scan the QR code to view my AR profile with 3D holographic display
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mentor-ar-card.vcf';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-gradient-to-br from-background to-accent/5 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <Smartphone className="h-6 w-6" />
          AR Business Card
        </CardTitle>
        <CardDescription>
          Next-gen networking with augmented reality profile display
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          {qrGenerated ? (
            <div className="space-y-4">
              <div className="w-48 h-48 mx-auto bg-white p-4 rounded-lg shadow-tech">
                <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded flex items-center justify-center">
                  <QrCode className="h-32 w-32 text-white" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Scan with smartphone camera to view AR profile
              </div>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm" onClick={downloadVCard}>
                  <Download className="h-4 w-4 mr-2" />
                  Download vCard
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-48 h-48 mx-auto bg-muted/20 rounded-lg border-2 border-dashed border-accent/30 flex items-center justify-center">
                <QrCode className="h-16 w-16 text-muted-foreground" />
              </div>
              <Button onClick={generateARCard} className="bg-gradient-tech text-white">
                Generate AR Business Card
              </Button>
            </div>
          )}
        </div>
        
        <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
          <h4 className="font-semibold text-sm mb-2">AR Features:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 3D holographic profile display</li>
            <li>• Interactive skill visualization</li>
            <li>• Floating contact information</li>
            <li>• Real-time GitHub stats overlay</li>
            <li>• Voice introduction playback</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ARBusinessCard;