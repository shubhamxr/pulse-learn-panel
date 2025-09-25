// TeacherDashboard.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  Clock,
  MapPin,
  TrendingUp,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const [lectures] = useState<Lecture[]>([
    { id: 'L001', subject: 'Mathematics', time: '09:00 AM - 10:30 AM', room: 'Room 101', status: 'completed', enrolledStudents: 25, attendanceRate: 92 },
    { id: 'L002', subject: 'Physics', time: '10:30 AM - 12:00 PM', room: 'Lab 201', status: 'current', enrolledStudents: 28, attendanceRate: 89 },
    { id: 'L003', subject: 'Computer Science', time: '01:00 PM - 02:30 PM', room: 'Room 305', status: 'upcoming', enrolledStudents: 30 },
    { id: 'L004', subject: 'English Literature', time: '02:30 PM - 04:00 PM', room: 'Room 102', status: 'upcoming', enrolledStudents: 22 },
  ]);

  const handleLectureClick = (lecture: Lecture) => {
    toast({
      title: "Lecture Selected",
      description: `Viewing real-time attendance for ${lecture.subject}`,
    });
    navigate(`/lecture/${lecture.id}`, { state: { lecture } });
  };

  return (
    <div className="  container mx-auto p-4 lg:p-8 space-y-6 lg:space-y-8 animate-fade-in">
      {/* Today's Lectures */}
      <Card className="card-modern hover-lift animate-slide-up">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <BookOpen className="h-6 w-6 font-[Poppins-Medium] text-primary" />
            Today's Lectures
          </CardTitle>
          <p className="text-muted-foreground text-base">
            Click on any lecture to view details and real-time attendance
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lectures.map((lecture) => (
              <div
                key={lecture.id}
                onClick={() => handleLectureClick(lecture)}
                className="p-6 rounded-xl border-2 border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover-lift"
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge>{lecture.status}</Badge>
                  <Eye className="h-4 w-4 text-primary" />
                </div>
                <h3 className=" text-lg font-[Poppins-Medium] mb-2">{lecture.subject}</h3>
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
  );
};

export default TeacherDashboard;
