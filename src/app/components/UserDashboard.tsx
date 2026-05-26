import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import svgPaths from "../../imports/Home/svg-3hh287w24v";
import { LayoutDashboard, Briefcase, FileText, MessageSquare, User, Settings, LogOut, Menu, X, Search, MapPin, Clock, DollarSign, Heart, Send, TrendingUp } from 'lucide-react';

export default function UserDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isUserLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/user/login');
      return;
    }
    const storedData = localStorage.getItem('userData');
    if (storedData) setUserData(JSON.parse(storedData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.setItem('isUserLoggedIn', 'false');
    toast.success('Logged out successfully');
    navigate('/user/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/user/dashboard' },
    { icon: Briefcase, label: 'Find Jobs', path: '/user/dashboard/jobs' },
    { icon: FileText, label: 'Applications', path: '/user/dashboard/applications' },
    { icon: MessageSquare, label: 'Messages', path: '/user/dashboard/messages' },
    { icon: User, label: 'Profile', path: '/user/dashboard/profile' },
    { icon: Settings, label: 'Settings', path: '/user/dashboard/settings' },
  ];

  if (!userData) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="h-[40px] w-[128px]">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 166 52">
                  <path d={svgPaths.p30d9a670} fill="#F75524" />
                  <path d={svgPaths.p1ac37880} fill="#232557" />
                  <path d={svgPaths.p123a6680} fill="#232557" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{userData.firstName} {userData.lastName}</p>
                  <p className="text-xs text-gray-500">{userData.category}</p>
                </div>
                <Avatar>
                  <AvatarFallback className="bg-[#f75524] text-white">{userData.firstName[0]}{userData.lastName[0]}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        <aside className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out z-40 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#fff7f5] text-[#f75524]' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors mt-4">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Routes>
            <Route index element={<DashboardOverview userData={userData} />} />
            <Route path="jobs" element={<FindJobsPage />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="messages" element={<p className="text-gray-600">Messages feature coming soon</p>} />
            <Route path="profile" element={<ProfilePage userData={userData} />} />
            <Route path="settings" element={<p className="text-gray-600">Settings feature coming soon</p>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function DashboardOverview({ userData }: { userData: any }) {
  const stats = [
    { label: 'Applications Sent', value: '12', icon: Send, color: 'bg-blue-500' },
    { label: 'Jobs Saved', value: '8', icon: Heart, color: 'bg-pink-500' },
    { label: 'Profile Views', value: '45', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-[#232557] mb-2">Welcome back, {userData.firstName}!</h1>
        <p className="text-gray-600">Here's your job search activity today.</p>
      </div>

      <Card className="bg-gradient-to-r from-[#f75524] to-[#ff6b3d] text-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl mb-1">Complete Your Profile</h3>
              <p className="text-white/90 text-sm">A complete profile gets 3x more views</p>
            </div>
            <span className="text-2xl">85%</span>
          </div>
          <Progress value={85} className="h-2 bg-white/30" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function FindJobsPage() {
  const jobs = [
    { title: 'Domestic Helper', company: 'Johnson Family', location: 'Lagos', salary: '₦50,000-80,000/month', type: 'Full-time', match: 95 },
    { title: 'Caregiver', company: 'Silver Care Services', location: 'Abuja', salary: '₦40,000-60,000/month', type: 'Part-time', match: 88 },
    { title: 'Cook', company: 'Grand Hotels', location: 'Lagos', salary: '₦70,000-100,000/month', type: 'Full-time', match: 82 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-[#232557] mb-2">Find Jobs</h1>
        <p className="text-gray-600">Discover opportunities that match your skills</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input placeholder="Search jobs..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {jobs.map((job, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <Badge className="bg-green-100 text-green-700">{job.match}% Match</Badge>
                  </div>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1"><MapPin size={16} />{job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={16} />{job.type}</span>
                    <span className="flex items-center gap-1"><DollarSign size={16} />{job.salary}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button className="bg-[#f75524] hover:bg-[#e54414] text-white">Apply Now</Button>
                <Button variant="outline"><Heart size={16} className="mr-2" />Save</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ApplicationsPage() {
  const applications = [
    { job: 'Domestic Helper', company: 'Johnson Family', status: 'Interview Scheduled', color: 'green' },
    { job: 'Caregiver', company: 'Silver Care Services', status: 'Under Review', color: 'blue' },
    { job: 'Cook', company: 'Restaurant XYZ', status: 'Applied', color: 'gray' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-[#232557] mb-2">My Applications</h1>
        <p className="text-gray-600">Track all your job applications</p>
      </div>

      <div className="space-y-4">
        {applications.map((app, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{app.job}</h3>
                  <p className="text-sm text-gray-600">{app.company}</p>
                </div>
                <Badge className={`bg-${app.color}-100 text-${app.color}-700`}>{app.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProfilePage({ userData }: { userData: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-[#232557] mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your professional profile</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>This information will be visible to employers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-[#f75524] text-white text-2xl">{userData.firstName[0]}{userData.lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">Change Photo</Button>
              <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input defaultValue={userData.firstName} className="mt-1" />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input defaultValue={userData.lastName} className="mt-1" />
            </div>
          </div>

          <div>
            <Label>Skills</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {userData.skills.map((skill: string, index: number) => (
                <Badge key={index} className="bg-[#f75524]">{skill}</Badge>
              ))}
            </div>
          </div>

          <Button className="bg-[#f75524] hover:bg-[#e54414] text-white">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
