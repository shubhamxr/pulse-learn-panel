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
  AlertTriangle,
  BookOpen,
  MapPin,
  Play,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  status: 'present' | 'absent' | 'late';
  time?: string;
}

interface Lecture {
  id: string;
  subject: string;
  time: string;
  room: string;
  status: 'upcoming' | 'current' | 'completed';
  enrolledStudents: number;
  attendanceRate?: number;
}

const TeacherDashboard = () => {
  const { toast } = useToast();
  const [qrGenerated, setQrGenerated] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [students, setStudents] = useState<Student[]>([
    { id: 'ST2024001', name: 'Alex Johnson', status: 'present', time: '09:05 AM' },
    { id: 'ST2024002', name: 'Sarah Williams', status: 'present', time: '09:02 AM' },
    { id: 'ST2024003', name: 'Mike Chen', status: 'present', time: '09:08 AM' },
    { id: 'ST2024004', name: 'Emma Davis', status: 'absent' },
    { id: 'ST2024005', name: 'David Brown', status: 'absent' },
  ]);

  const [lectures] = useState<Lecture[]>([
    { id: 'L001', subject: 'Mathematics', time: '09:00 AM - 10:30 AM', room: 'Room 101', status: 'completed', enrolledStudents: 25, attendanceRate: 92 },
    { id: 'L002', subject: 'Physics', time: '10:30 AM - 12:00 PM', room: 'Lab 201', status: 'current', enrolledStudents: 28, attendanceRate: 89 },
    { id: 'L003', subject: 'Computer Science', time: '01:00 PM - 02:30 PM', room: 'Room 305', status: 'upcoming', enrolledStudents: 30 },
    { id: 'L004', subject: 'English Literature', time: '02:30 PM - 04:00 PM', room: 'Room 102', status: 'upcoming', enrolledStudents: 22 },
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

  const handleLectureClick = (lecture: Lecture) => {
    setSelectedLecture(lecture);
    toast({
      title: "Lecture Selected",
      description: `Viewing real-time attendance for ${lecture.subject}`,
    });
  };

  const handleBackToLectures = () => {
    setSelectedLecture(null);
    toast({
      title: "Back to Lectures",
      description: "Returned to lecture selection view",
    });
  };

  const getLectureStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      case 'upcoming': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getLectureStatusIcon = (status: string) => {
    switch (status) {
      case 'current': return <Play className="h-4 w-4" />;
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
      case 'upcoming': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
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
    <div className="container mx-auto p-4 lg:p-8 space-y-6 lg:space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-secondary rounded-2xl p-6 lg:p-8 text-white shadow-large hover-glow transition-all duration-500">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Users className="h-8 w-8" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Welcome back, {localStorage.getItem('userName')?.split(' ')[1]}!</h1>
            <p className="text-white/90 text-base lg:text-lg">Manage attendance and track student participation with ease.</p>
          </div>
        </div>
      </div>

      {/* Teacher's Current Lectures with QR Generator */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* QR Code Generator - Left Side */}
        <div className="xl:col-span-1">
          <Card className="card-modern hover-lift animate-slide-up">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                QR Code Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {qrGenerated ? (
                <div className="text-center space-y-6">
                  <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-border inline-block shadow-medium">
                    <div className="w-40 h-40 bg-black rounded-xl grid grid-cols-8 gap-px p-3">
                      {Array.from({ length: 64 }, (_, i) => (
                        <div
                          key={i}
                          className={`${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-success/10 rounded-xl">
                    <p className="text-sm text-success font-medium">
                      QR Code active - Students can scan to mark attendance
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setQrGenerated(false)}
                    className="w-full hover-lift"
                  >
                    Generate New QR
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-40 h-40 bg-muted rounded-2xl flex items-center justify-center mx-auto shadow-soft">
                    <QrCode className="h-20 w-20 text-muted-foreground" />
                  </div>
                  <Button
                    onClick={generateQR}
                    className="w-full btn-primary-modern"
                  >
                    Generate QR Code
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Today's Lectures - Right Side */}
        <div className="xl:col-span-2">
          <Card className="card-modern hover-lift animate-slide-up">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                Today's Lectures
              </CardTitle>
              <p className="text-muted-foreground text-base">
                Click on any lecture to view real-time attendance
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    onClick={() => handleLectureClick(lecture)}
                    className={`p-6 rounded-xl border-2 border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover-lift ${
                      selectedLecture?.id === lecture.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${getLectureStatusColor(lecture.status)}`}>
                        {getLectureStatusIcon(lecture.status)}
                        {lecture.status}
                      </div>
                      {selectedLecture?.id === lecture.id && (
                        <Eye className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{lecture.subject}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {lecture.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {lecture.room}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {lecture.enrolledStudents} students
                      </div>
                      {lecture.attendanceRate && (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          {lecture.attendanceRate}% attendance
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selected Lecture Attendance */}
      {selectedLecture && (
        <div className="space-y-6">
          {/* Back Button */}
          <div className="flex items-center gap-4">
            <Button
              onClick={handleBackToLectures}
              variant="outline"
              className="flex items-center gap-2 hover-lift"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Lectures
            </Button>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs px-3 py-1 font-medium">
                {selectedLecture.time}
              </Badge>
              <Badge variant="outline" className="text-xs px-3 py-1 font-medium">
                {selectedLecture.room}
              </Badge>
            </div>
          </div>

          {/* Attendance Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <Card className="card-modern hover-lift animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">{students.length}</p>
                    <p className="text-sm text-muted-foreground font-medium">Total Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern hover-lift animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-success/10 rounded-xl">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-success">{students.filter(s => s.status === 'present').length}</p>
                    <p className="text-sm text-muted-foreground font-medium">Present</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern hover-lift animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-destructive/10 rounded-xl">
                    <XCircle className="h-8 w-8 text-destructive" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-destructive">{students.filter(s => s.status === 'absent').length}</p>
                    <p className="text-sm text-muted-foreground font-medium">Absent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern hover-lift animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-accent">{Math.round((students.filter(s => s.status === 'present').length / students.length) * 100)}%</p>
                    <p className="text-sm text-muted-foreground font-medium">Attendance Rate</p>
                  </div>
                </div>
            </CardContent>
          </Card>
        </div>

          {/* Real-time Attendance List */}
          <Card className="card-modern hover-lift animate-slide-up">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-accent/10 rounded-lg">
                  <Eye className="h-6 w-6 text-accent" />
                  </div>
                Real-time Attendance - {selectedLecture.subject}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all duration-300 hover-lift"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getStatusIcon(student.status)}
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{student.name}</p>
                        <p className="text-sm text-muted-foreground font-medium">{student.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={getStatusColor(student.status) as any}
                        className="mb-2 px-3 py-1 text-sm font-medium"
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
      )}


      {/* General Attendance Table - Only show when no lecture is selected */}
      {!selectedLecture && (
        <Card className="card-modern hover-lift animate-slide-up">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                General Attendance Overview
              </CardTitle>
              <Badge variant="outline" className="text-xs px-3 py-1 font-medium">
                Live Updates
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a Lecture</h3>
              <p className="text-muted-foreground">
                Click on any lecture above to view real-time attendance for that specific class.
              </p>
      </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherDashboard;