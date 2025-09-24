import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Camera, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FaceRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const FaceRecognitionModal = ({ isOpen, onClose, onSuccess }: FaceRecognitionModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'select' | 'camera' | 'upload' | 'processing' | 'success'>('select');

  const handleCameraCapture = () => {
    setStep('camera');
    // Simulate camera capture
    setTimeout(() => {
      setStep('processing');
      setTimeout(() => {
        setStep('success');
        setTimeout(() => {
          handleSuccess();
        }, 2000);
      }, 3000);
    }, 2000);
  };

  const handleFileUpload = () => {
    setStep('upload');
    // Simulate file upload
    setTimeout(() => {
      setStep('processing');
      setTimeout(() => {
        setStep('success');
        setTimeout(() => {
          handleSuccess();
        }, 2000);
      }, 3000);
    }, 1000);
  };

  const handleSuccess = () => {
    const attendanceData = {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      method: 'face_recognition',
      status: 'present'
    };

    const existingHistory = JSON.parse(localStorage.getItem('attendanceHistory') || '[]');
    existingHistory.push(attendanceData);
    localStorage.setItem('attendanceHistory', JSON.stringify(existingHistory));

    toast({
      title: "Face Match ✅",
      description: "Attendance recorded successfully via Face Recognition",
    });

    onSuccess();
    onClose();
    setStep('select');
  };

  const handleClose = () => {
    onClose();
    setStep('select');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Face Recognition Attendance
          </DialogTitle>
        </DialogHeader>

        {step === 'select' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Choose how you'd like to capture your face for attendance
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleCameraCapture}
                className="h-20 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Camera className="h-6 w-6" />
                <span className="text-sm">Use Camera</span>
              </Button>
              <Button
                onClick={handleFileUpload}
                className="h-20 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Upload className="h-6 w-6" />
                <span className="text-sm">Upload Photo</span>
              </Button>
            </div>
          </div>
        )}

        {step === 'camera' && (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-8 text-center">
              <Camera className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">Camera is active...</p>
              <p className="text-xs text-muted-foreground mt-2">Position your face in the frame</p>
            </div>
            <div className="flex justify-center">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {step === 'upload' && (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-8 text-center border-2 border-dashed border-border">
              <Upload className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">Processing uploaded image...</p>
            </div>
            <div className="flex justify-center">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-medium">Analyzing face...</p>
              <p className="text-xs text-muted-foreground mt-2">Matching with student database</p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-4">
            <div className="bg-success/10 rounded-lg p-8 text-center">
              <CheckCircle2 className="h-16 w-16 mx-auto text-success mb-4" />
              <p className="text-lg font-semibold text-success">Face Match Successful!</p>
              <p className="text-sm text-muted-foreground mt-2">Attendance has been recorded</p>
            </div>
          </div>
        )}

        {step === 'select' && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FaceRecognitionModal;