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
      title: "Marked via Bluetooth/Wi-Fi ✅",
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
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Good morning, {localStorage.getItem('userName')?.split(' ')[0]}!</h1>
        <p className="text-white/80">Ready to make today productive? Here's your personalized dashboard.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Section */}
        <div className="lg:col-span-1 space-y-6">
          {/* Today's Attendance */}
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                {todayAttendance ? (
                  <div className="space-y-2">
                    <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
                    <p className="font-semibold text-success">Marked Present</p>
                    <p className="text-sm text-muted-foreground">
                      Checked in at {new Date().toLocaleTimeString()}
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      {getMethodIcon(attendanceMethod)}
                      <span className="text-xs text-muted-foreground">
                        via {getMethodName(attendanceMethod)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <AlertCircle className="h-12 w-12 text-warning mx-auto" />
                    <p className="font-semibold text-warning">Not Marked Yet</p>
                    
                    {/* Multiple Attendance Methods */}
                    <div className="space-y-2">
                      <Button 
                        onClick={() => navigate('/qr-scanner')}
                        className="w-full bg-gradient-primary"
                      >
                        <QrCode className="h-4 w-4 mr-2" />
                        Scan QR Code
                      </Button>
                      
                      <Button 
                        onClick={markProximityAttendance}
                        variant="outline"
                        className="w-full"
                      >
                        <Wifi className="h-4 w-4 mr-2" />
                        Mark via Proximity
                      </Button>
                      
                      <Button 
                        onClick={() => setShowFaceModal(true)}
                        variant="outline"
                        className="w-full"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Mark via Face Recognition
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Attendance Stats */}
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Attendance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{attendancePercentage}%</div>
                <p className="text-sm text-muted-foreground">Overall Attendance</p>
              </div>
              <Progress value={attendancePercentage} className="h-2" />
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <p className="font-semibold text-success">45</p>
                  <p className="text-muted-foreground">Present</p>
                </div>
                <div>
                  <p className="font-semibold text-destructive">8</p>
                  <p className="text-muted-foreground">Absent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance History */}
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Recent Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {attendanceHistory.length > 0 ? (
                <div className="space-y-2">
                  {attendanceHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <div className="flex items-center gap-2">
                        {getMethodIcon(record.method)}
                        <span className="text-sm">{record.date}</span>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          {getMethodName(record.method)}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{record.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No attendance records yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personalized Tasks */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Personalized Tasks for Free Time
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                AI-generated tasks based on your schedule and learning goals
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div className={`w-1 h-12 rounded-full ${getPriorityColor(task.priority)}`}></div>
                    <task.icon className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-medium">{task.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{task.type}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.duration}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">Start</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Routine */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                    <div className="text-center min-w-20">
                      <p className="text-sm font-medium">{item.time}</p>
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${getStatusColor(item.status)}`}>{item.subject}</h4>
                      {item.room !== '-' && (
                        <p className="text-sm text-muted-foreground">{item.room}</p>
                      )}
                    </div>
                    <Badge 
                      variant={item.status === 'completed' ? 'default' : item.status === 'current' ? 'secondary' : 'outline'}
                      className="capitalize"
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