import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, BookOpen, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [studentCredentials, setStudentCredentials] = useState({ email: '', password: '' });
  const [teacherCredentials, setTeacherCredentials] = useState({ email: '', password: '' });

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Store user type in localStorage for demo
    localStorage.setItem('userType', 'student');
    localStorage.setItem('userName', 'Alex Johnson');
    localStorage.setItem('studentId', 'ST2024001');
    toast({
      title: "Login Successful",
      description: "Welcome back, Alex!",
    });
    navigate('/dashboard');
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userType', 'teacher');
    localStorage.setItem('userName', 'Dr. Sarah Wilson');
    localStorage.setItem('teacherId', 'TCH2024001');
    toast({
      title: "Login Successful", 
      description: "Welcome back, Dr. Wilson!",
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="text-center lg:text-left text-white">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <GraduationCap className="h-12 w-12" />
            <h1 className="text-4xl font-bold">EduTrack</h1>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            Smart Attendance & 
            <span className="block text-accent-light">Student Productivity</span>
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-md mx-auto lg:mx-0">
            Streamline attendance tracking and boost student productivity with our intelligent platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <div className="flex items-center gap-3 text-white/80">
              <BookOpen className="h-5 w-5" />
              <span>Real-time Tracking</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Users className="h-5 w-5" />
              <span>Smart Analytics</span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-large border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">
                Welcome Back
              </CardTitle>
              <p className="text-muted-foreground">Choose your login type to continue</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="teacher">Teacher</TabsTrigger>
                </TabsList>
                
                <TabsContent value="student">
                  <form onSubmit={handleStudentLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Student ID / Email</Label>
                      <Input
                        id="student-email"
                        type="text"
                        placeholder="Enter your student ID"
                        value={studentCredentials.email}
                        onChange={(e) => setStudentCredentials({...studentCredentials, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-password">Password</Label>
                      <Input
                        id="student-password"
                        type="password"
                        placeholder="Enter your password"
                        value={studentCredentials.password}
                        onChange={(e) => setStudentCredentials({...studentCredentials, password: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-primary hover:shadow-medium transition-all">
                      Sign In as Student
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="teacher">
                  <form onSubmit={handleTeacherLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacher-email">Teacher ID / Email</Label>
                      <Input
                        id="teacher-email"
                        type="text"
                        placeholder="Enter your teacher ID"
                        value={teacherCredentials.email}
                        onChange={(e) => setTeacherCredentials({...teacherCredentials, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teacher-password">Password</Label>
                      <Input
                        id="teacher-password"
                        type="password"
                        placeholder="Enter your password"
                        value={teacherCredentials.password}
                        onChange={(e) => setTeacherCredentials({...teacherCredentials, password: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-secondary hover:shadow-medium transition-all">
                      Sign In as Teacher
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Demo credentials: any email/password combination works
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;