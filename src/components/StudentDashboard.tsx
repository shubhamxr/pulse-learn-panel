import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  QrCode, 
  BookOpen, 
  Target,
  TrendingUp,
  AlertCircle,
  Coffee,
  Dumbbell,
  Brain,
  Bluetooth,
  Wifi,
  Camera,
  History
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FaceRecognitionModal from './FaceRecognitionModal';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [todayAttendance, setTodayAttendance] = useState<boolean>(false);
  const [attendancePercentage] = useState(85);
  const [attendanceMethod, setAttendanceMethod] = useState<string>('');
  const [showFaceModal, setShowFaceModal] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);

  useEffect(() => {
    // Check if attendance is marked today
    const storedHistory = JSON.parse(localStorage.getItem('attendanceHistory') || '[]');
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = storedHistory.find((record: any) => record.date === today);
    setTodayAttendance(!!todayRecord);
    setAttendanceMethod(todayRecord?.method || '');
    setAttendanceHistory(storedHistory.slice(-5)); // Show last 5 records
  }, []);

  const markProximityAttendance = () => {
    const attendanceData = {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      method: 'proximity',
      status: 'present'
    };

    const existingHistory = JSON.parse(localStorage.getItem('attendanceHistory') || '[]');
    existingHistory.push(attendanceData);
    localStorage.setItem('attendanceHistory', JSON.stringify(existingHistory));

    setTodayAttendance(true);
    setAttendanceMethod('proximity');
    setAttendanceHistory(existingHistory.slice(-5));

    toast({
      title: "Marked via Bluetooth/Wi-Fi",
      description: "Attendance recorded successfully via proximity detection",
    });
  };

  const handleFaceRecognitionSuccess = () => {
    setTodayAttendance(true);
    setAttendanceMethod('face_recognition');
    const updatedHistory = JSON.parse(localStorage.getItem('attendanceHistory') || '[]');
    setAttendanceHistory(updatedHistory.slice(-5));
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'qr_code': return <QrCode className="h-4 w-4" />;
      case 'proximity': return <Wifi className="h-4 w-4" />;
      case 'face_recognition': return <Camera className="h-4 w-4" />;
      default: return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const getMethodName = (method: string) => {
    switch (method) {
      case 'qr_code': return 'QR Code';
      case 'proximity': return 'Proximity';
      case 'face_recognition': return 'Face Recognition';
      default: return 'Unknown';
    }
  };

  const tasks = [
    { id: 1, title: 'Review Math Chapter 5', type: 'Study', duration: '30 min', priority: 'high', icon: Brain },
    { id: 2, title: 'Complete Physics Lab Report', type: 'Assignment', duration: '45 min', priority: 'high', icon: BookOpen },
    { id: 3, title: 'Take a 10-minute break', type: 'Break', duration: '10 min', priority: 'medium', icon: Coffee },
    { id: 4, title: 'Practice coding problems', type: 'Practice', duration: '25 min', priority: 'medium', icon: Target },
    { id: 5, title: 'Light exercise session', type: 'Health', duration: '20 min', priority: 'low', icon: Dumbbell },
  ];

  const schedule = [
    { time: '09:00 AM', subject: 'Mathematics', room: 'Room 101', status: 'completed' },
    { time: '10:30 AM', subject: 'Physics', room: 'Lab 201', status: 'current' },
    { time: '12:00 PM', subject: 'Free Period', room: '-', status: 'upcoming' },
    { time: '01:00 PM', subject: 'Computer Science', room: 'Room 305', status: 'upcoming' },
    { time: '02:30 PM', subject: 'English', room: 'Room 102', status: 'upcoming' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'current': return 'text-primary';
      case 'upcoming': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 space-y-6 lg:space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-hero rounded-2xl p-6 lg:p-8 text-white shadow-large hover-glow transition-all duration-500">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Calendar className="h-8 w-8" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl lg:text-4xl font-[Poppins-Bold] mb-2">Good morning, {localStorage.getItem('userName')?.split(' ')[0]}!</h1>
            <p className="text-white/90 text-base lg:text-lg">Ready to make today productive? Here's your personalized dashboard.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Attendance Section */}
        <div className="lg:col-span-1 space-y-8">
          {/* Today's Attendance */}
          <Card className="card-modern font-[Poppins-Light] hover-lift animate-slide-up">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                Today's Attendance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                {todayAttendance ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-success/10 rounded-2xl">
                      <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-3" />
                      <p className="font-[Poppins-Bold] text-success text-lg">Marked Present</p>
                      <p className="text-sm text-muted-foreground">
                        Checked in at {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getMethodIcon(attendanceMethod)}
                      </div>
                      <span className="text-sm dtext-muted-foreground">
                        via {getMethodName(attendanceMethod)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 bg-warning/10 rounded-2xl">
                      <AlertCircle className="h-16 w-16 text-warning mx-auto mb-3" />
                      <p className="font-[Poppins-Bold] text-warning text-lg">Not Marked Yet</p>
                    </div>
                    
                    {/* Multiple Attendance Methods */}
                    <div className="space-y-3">
                      <Button 
                        onClick={() => navigate('/qr-scanner')}
                        className="w-full btn-primary-modern"
                      >
                        <QrCode className="h-5 w-5 mr-3" />
                        Scan QR Code
                      </Button>
                      
                      <Button 
                        onClick={markProximityAttendance}
                        variant="outline"
                        className="w-full hover-lift"
                      >
                        <Wifi className="h-5 w-5 mr-3" />
                        Mark via Proximity
                      </Button>
                      
                      <Button 
                        onClick={() => setShowFaceModal(true)}
                        variant="outline"
                        className="w-full hover-lift"
                      >
                        <Camera className="h-5 w-5 mr-3" />
                        Mark via Face Recognition
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Attendance Stats */}
          <Card className=" font-[Poppins-Light] card-modern hover-lift animate-slide-up">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                Attendance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <div className="text-4xl font-[Poppins-Bold] text-gradient-primary mb-2">{attendancePercentage}%</div>
                <p className="text-sm text-muted-foreground font-[Poppins-Light]">Overall Attendance</p>
              </div>
              <Progress value={attendancePercentage} className="h-3 bg-muted" />
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="p-4 bg-success/10 rounded-xl">
                  <p className="text-2xl font-[Poppins-Bold] text-success mb-1">45</p>
                  <p className="text-sm text-muted-foreground font-[Poppins-Light]">Present</p>
                </div>
                <div className="p-4 bg-destructive/10 rounded-xl">
                  <p className="text-2xl font-[Poppins-Bold] text-destructive mb-1">8</p>
                  <p className="text-sm text-muted-foreground font-[Poppins-Light]">Absent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance History */}
          <Card className="card-modern font-[Poppins-Light] hover-lift animate-slide-up">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <History className="h-6 w-6 text-secondary" />
                </div>
                Recent Attendance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {attendanceHistory.length > 0 ? (
                <div className="space-y-3">
                  {attendanceHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {getMethodIcon(record.method)}
                        </div>
                        <span className="text-sm font-[Poppins-Light]">{record.date}</span>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs mb-1">
                          {getMethodName(record.method)}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{record.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No attendance records yet
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6 lg:space-y-8">
          {/* Personalized Tasks */}
      {/* Personalized Tasks Option */}
<Card className="card-modern hover-lift font-[Poppins-Light] animate-slide-up cursor-pointer"
      onClick={() => navigate('/personalized-tasks')}>
  <CardHeader className="pb-4">
    <CardTitle className="flex items-center gap-3 text-2xl">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Target className="h-6 w-6 text-primary" />
      </div>
      Personalized Tasks for Free Time
    </CardTitle>
    <p className="text-muted-foreground text-base">
      Click to view AI-generated tasks for your schedule
    </p>
  </CardHeader>
</Card>

          {/* Daily Routine */}
          <Card className="card-modern hover-lift font-[Poppins-Light] animate-slide-up">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <div key={index} className="flex items-center gap-6 p-4 rounded-xl border border-border/50 hover:border-border hover:shadow-soft transition-all duration-300">
                    <div className="text-center min-w-24 p-3 bg-muted/30 rounded-xl">
                      <p className="text-sm font-semibold">{item.time}</p>
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold text-lg ${getStatusColor(item.status)}`}>{item.subject}</h4>
                      {item.room !== '-' && (
                        <p className="text-sm text-muted-foreground mt-1">{item.room}</p>
                      )}
                    </div>
                    <Badge 
                      variant={item.status === 'completed' ? 'default' : item.status === 'current' ? 'secondary' : 'outline'}
                      className="capitalize px-4 py-2 text-sm font-[Poppins-Light]"
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Face Recognition Modal */}
      <FaceRecognitionModal 
        isOpen={showFaceModal}
        onClose={() => setShowFaceModal(false)}
        onSuccess={handleFaceRecognitionSuccess}
      />
    </div>
  );
};

export default StudentDashboard;