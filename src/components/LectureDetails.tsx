// LectureDetails.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  QrCode, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  ArrowLeft, 
  Eye, 
  Clock 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  status: 'present' | 'absent' | 'late';
  time?: string;
}

const LectureDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const lecture = state?.lecture;

  const [qrGenerated, setQrGenerated] = useState(false);
  const [students] = useState<Student[]>([
    { id: 'ST2024001', name: 'Alex Johnson', status: 'present', time: '09:05 AM' },
    { id: 'ST2024002', name: 'Sarah Williams', status: 'present', time: '09:02 AM' },
    { id: 'ST2024003', name: 'Mike Chen', status: 'present', time: '09:08 AM' },
    { id: 'ST2024004', name: 'Emma Davis', status: 'absent' },
    { id: 'ST2024005', name: 'David Brown', status: 'absent' },
  ]);

  const generateQR = () => {
    setQrGenerated(true);
    toast({
      title: "QR Code Generated",
      description: "Students can now scan to mark attendance",
    });
  };

  return (
    <div className=" container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: QR Generator */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className=" font-[Poppins-Medium] items-center gap-2">
              <QrCode className="h-5  w-5" /> QR Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            {qrGenerated ? (
              <div className="text-center space-y-4">
                <div className="w-40 h-40  bg-black rounded-lg mx-auto"></div>
                <Button variant="outline" onClick={() => setQrGenerated(false)} className="font-[Poppins-Medium] w-full">
                  Generate New QR
                </Button>
              </div>
            ) : (
              <div className="  text-center space-y-4">
                <div className="w-40 h-40 bg-muted rounded-lg mx-auto flex items-center justify-center">
                  <QrCode className="h-10 w-10 text-muted-foreground" />
                </div>
                <Button onClick={generateQR} className="w-full">
                  Generate QR Code
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right: Attendance Details */}
      <div className="lg:col-span-2 space-y-6">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        {/* Attendance Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card><CardContent className="p-4 flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            <div>
              <p className="font-[Poppins-Medium]">{students.length}</p>
              <p className="text-sm ">Total Students</p>
            </div>
          </CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-success" />
            <div>
              <p className="font-[Poppins-Medium]">{students.filter(s => s.status === 'present').length}</p>
              <p className="text-sm">Present</p>
            </div>
          </CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3">
            <XCircle className="h-6 w-6 text-destructive" />
            <div>
              <p className="font-[Poppins-Medium]">{students.filter(s => s.status === 'absent').length}</p>
              <p className="text-sm">Absent</p>
            </div>
          </CardContent></Card>
        </div>

        {/* Real-time Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" /> Real-time Attendance - {lecture?.subject}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {students.map(student => (
                <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-[Poppins-Medium]">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.id}</p>
                  </div>
                  <Badge>{student.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LectureDetails;
