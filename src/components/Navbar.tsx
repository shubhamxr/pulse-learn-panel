import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, LogOut, Settings, User, Wifi, WifiOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NavbarProps {
  userName: string;
  userType: string;
}

const Navbar = ({ userName, userType }: NavbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Simulate offline mode toggle for demo
  const toggleOfflineMode = () => {
    setIsOnline(!isOnline);
    toast({
      title: isOnline ? "Offline Mode" : "Online Mode",
      description: isOnline ? "App is now in offline mode" : "App is back online",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('studentId');
    localStorage.removeItem('teacherId');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">EduTrack</span>
            </div>
            <Badge variant={userType === 'student' ? 'default' : 'secondary'} className="ml-2">
              {userType === 'student' ? 'Student' : 'Teacher'}
            </Badge>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {/* Online/Offline Status */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleOfflineMode}
              className="flex items-center gap-2"
            >
              {isOnline ? (
                <>
                  <Wifi className="h-4 w-4 text-success" />
                  <span className="text-sm text-success">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-warning" />
                  <span className="text-sm text-warning">Offline</span>
                </>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 hover:bg-muted">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {userType === 'student' ? localStorage.getItem('studentId') : localStorage.getItem('teacherId')}
                    </p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-primary text-white text-sm">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;