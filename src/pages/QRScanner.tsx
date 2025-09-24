import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Camera, CheckCircle2, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QRScanner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setIsScanned(true);
      
      // Save attendance to localStorage for offline mode demo
      const attendanceData = {
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        status: 'present',
        studentId: localStorage.getItem('studentId'),
        studentName: localStorage.getItem('userName'),
      };
      
      const existingAttendance = JSON.parse(localStorage.getItem('attendanceHistory') || '[]');
      existingAttendance.push(attendanceData);
      localStorage.setItem('attendanceHistory', JSON.stringify(existingAttendance));
      
      toast({
        title: "Attendance Marked! ✅",
        description: "Your attendance has been recorded successfully.",
      });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 3000);
  };

  if (isScanned) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-large">
          <CardContent className="text-center p-8">
            <div className="mb-6">
              <CheckCircle2 className="h-20 w-20 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Attendance Marked Successfully!
              </h2>
              <p className="text-muted-foreground">
                You have been marked present for today's class.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Time:</span> {new Date().toLocaleTimeString()}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Date:</span> {new Date().toLocaleDateString()}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Redirecting to dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-xl font-semibold">QR Code Scanner</h1>
        </div>
      </div>

      {/* Scanner Interface */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <Card className="w-full max-w-md shadow-large">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <QrCode className="h-6 w-6" />
              Scan QR Code
            </CardTitle>
            <p className="text-muted-foreground">
              Position the QR code within the frame to mark your attendance
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Camera Simulation */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                {isScanning ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                    <p className="text-sm text-muted-foreground">Scanning...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Camera will appear here</p>
                  </div>
                )}
              </div>
              
              {/* Scanning Frame Overlay */}
              <div className="absolute inset-4 border-2 border-primary rounded-lg opacity-50">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium mb-2">Instructions:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Position your device camera over the QR code</li>
                <li>• Keep the code within the scanning frame</li>
                <li>• Hold steady until scanning completes</li>
              </ul>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="w-full bg-gradient-primary hover:shadow-medium transition-all"
              size="lg"
            >
              {isScanning ? 'Scanning...' : 'Start Scanning'}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Demo mode: Scan simulation will complete automatically
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRScanner;