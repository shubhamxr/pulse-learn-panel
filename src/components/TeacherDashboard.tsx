import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  QrCode, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Clock,
  TrendingUp,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  status: 'present' | 'absent' | 'late';
  time?: string;
}

const TeacherDashboard = () => {
  const { toast } = useToast();
  const [qrGenerated, setQrGenerated] = useState(false);
  const [students, setStudents] = useState<Student[]>([
    { id: 'ST2024001', name: 'Alex Johnson', status: 'present', time: '09:05 AM' },
    { id: 'ST2024002', name: 'Sarah Williams', status: 'present', time: '09:02 AM' },
    { id: 'ST2024003', name: 'Mike Chen', status: 'absent' },
    { id: 'ST2024004', name: 'Emma Davis', status: 'late', time: '09:15 AM' },
    { id: 'ST2024005', name: 'David Brown', status: 'present', time: '09:01 AM' },
    { id: 'ST2024006', name: 'Lisa Garcia', status: 'absent' },
    { id: 'ST2024007', name: 'Tom Wilson', status: 'present', time: '09:08 AM' },
    { id: 'ST2024008', name: 'Anna Lee', status: 'present', time: '09:03 AM' },
  ]);

  const [hasOfflineData, setHasOfflineData] = useState(false);

  useEffect(() => {
    // Check for offline attendance data
    const attendanceHistory = JSON.parse(localStorage.getItem('attendanceHistory') || '[]');
    setHasOfflineData(attendanceHistory.length > 0);
  }, []);

  const generateQR = () => {
    setQrGenerated(true);
    toast({
      title: "QR Code Generated",
      description: "Students can now scan to mark attendance",
    });
  };

  const syncOfflineData = () => {
    // Simulate syncing offline data
    const attendanceHistory = JSON.parse(localStorage.getItem('attendanceHistory') || '[]');
    
    toast({
      title: "Data Synced Successfully",
      description: `Synced ${attendanceHistory.length} offline attendance records`,
    });
    
    localStorage.removeItem('attendanceHistory');
    setHasOfflineData(false);
  };

  const exportData = () => {
    toast({
      title: "Export Started",
      description: "Attendance data will be downloaded shortly",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'late':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'success';
      case 'late': return 'warning';
      case 'absent': return 'destructive';
      default: return 'secondary';
    }
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const lateCount = students.filter(s => s.status === 'late').length;
  const attendanceRate = Math.round(((presentCount + lateCount) / students.length) * 100);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-secondary rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {localStorage.getItem('userName')?.split(' ')[1]}!</h1>
        <p className="text-white/80">Manage attendance and track student participation with ease.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{students.length}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">{presentCount}</p>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-destructive">{absentCount}</p>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{attendanceRate}%</p>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Code & Controls */}
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-primary" />
                QR Code Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {qrGenerated ? (
                <div className="text-center space-y-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-dashed border-border inline-block">
                    <div className="w-32 h-32 bg-black rounded grid grid-cols-8 gap-px p-2">
                      {Array.from({ length: 64 }, (_, i) => (
                        <div
                          key={i}
                          className={`${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    QR Code active - Students can scan to mark attendance
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setQrGenerated(false)}
                    className="w-full"
                  >
                    Generate New QR
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center mx-auto">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <Button
                    onClick={generateQR}
                    className="w-full bg-gradient-primary"
                  >
                    Generate QR Code
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {hasOfflineData && (
                <Button
                  onClick={syncOfflineData}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Sync Offline Data
                </Button>
              )}
              <Button
                onClick={exportData}
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Attendance
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Table */}
        <div className="lg:col-span-2">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Real-time Attendance
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  Live Updates
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(student.status)}
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={getStatusColor(student.status) as any}
                        className="mb-1"
                      >
                        {student.status}
                      </Badge>
                      {student.time && (
                        <p className="text-xs text-muted-foreground">{student.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;