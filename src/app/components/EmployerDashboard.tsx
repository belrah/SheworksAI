import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import svgPaths from "../../imports/Home/svg-3hh287w24v";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  Settings,
  BarChart3,
  LogOut,
  Menu,
  X,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  UserCheck,
  FileText,
} from 'lucide-react';

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [employerData, setEmployerData] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isEmployerLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/employer/login');
      return;
    }

    // Load employer data
    const storedData = localStorage.getItem('employerData');
    if (storedData) {
      setEmployerData(JSON.parse(storedData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.setItem('isEmployerLoggedIn', 'false');
    toast.success('Logged out successfully');
    navigate('/employer/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/employer/dashboard' },
    { icon: Briefcase, label: 'Jobs', path: '/employer/dashboard/jobs' },
    { icon: Users, label: 'Candidates', path: '/employer/dashboard/candidates' },
    { icon: MessageSquare, label: 'Messages', path: '/employer/dashboard/messages' },
    { icon: BarChart3, label: 'Analytics', path: '/employer/dashboard/analytics' },
    { icon: Settings, label: 'Settings', path: '/employer/dashboard/settings' },
  ];

  if (!employerData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              >
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

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Plus size={16} className="mr-2" />
                Post Job
              </Button>
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{employerData.firstName} {employerData.lastName}</p>
                  <p className="text-xs text-gray-500">{employerData.companyName}</p>
                </div>
                <Avatar>
                  <AvatarFallback className="bg-[#f75524] text-white">
                    {employerData.firstName[0]}{employerData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200
            transform transition-transform duration-200 ease-in-out z-40
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-[#fff7f5] text-[#f75524]'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors mt-4"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Routes>
            <Route index element={<DashboardOverview employerData={employerData} />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="candidates" element={<CandidatesPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage employerData={employerData} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function DashboardOverview({ employerData }: { employerData: any }) {
  const stats = [
    { label: 'Active Jobs', value: '12', change: '+2 this week', icon: Briefcase, color: 'bg-blue-500' },
    { label: 'Total Applications', value: '284', change: '+45 this week', icon: Users, color: 'bg-green-500' },
    { label: 'Interviews Scheduled', value: '18', change: '+5 this week', icon: UserCheck, color: 'bg-purple-500' },
    { label: 'Positions Filled', value: '8', change: '+3 this month', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const recentApplications = [
    { name: 'Amina Mohammed', position: 'Domestic Helper', status: 'New', time: '2 hours ago', rating: '4.8' },
    { name: 'Grace Okafor', position: 'Caregiver', status: 'Reviewed', time: '5 hours ago', rating: '4.9' },
    { name: 'Fatima Bello', position: 'Cook', status: 'Interview', time: '1 day ago', rating: '4.7' },
    { name: 'Mary Adeyemi', position: 'Nanny', status: 'New', time: '1 day ago', rating: '4.6' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-[#232557] mb-2">Welcome back, {employerData.firstName}!</h1>
        <p className="text-gray-600">Here's what's happening with your hiring today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-xs text-green-600">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest candidates who applied to your jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-[#f75524] text-white">
                        {app.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{app.name}</p>
                      <p className="text-sm text-gray-500">{app.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={app.status === 'New' ? 'default' : 'secondary'}>
                      {app.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{app.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-[#f75524] hover:bg-[#e54414] text-white">
              <Plus size={18} className="mr-2" />
              Post a New Job
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users size={18} className="mr-2" />
              Review Applications
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare size={18} className="mr-2" />
              Send Messages
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 size={18} className="mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const jobs = [
    {
      title: 'Domestic Helper',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      salary: '₦50,000 - ₦80,000/month',
      applications: 45,
      status: 'Active',
      postedDate: '2 days ago',
    },
    {
      title: 'Caregiver for Elderly',
      location: 'Abuja, Nigeria',
      type: 'Part-time',
      salary: '₦40,000 - ₦60,000/month',
      applications: 32,
      status: 'Active',
      postedDate: '5 days ago',
    },
    {
      title: 'Professional Cook',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      salary: '₦70,000 - ₦100,000/month',
      applications: 28,
      status: 'Active',
      postedDate: '1 week ago',
    },
    {
      title: 'Nanny',
      location: 'Port Harcourt, Nigeria',
      type: 'Full-time',
      salary: '₦55,000 - ₦75,000/month',
      applications: 19,
      status: 'Closed',
      postedDate: '2 weeks ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl text-[#232557] mb-2">Job Postings</h1>
          <p className="text-gray-600">Manage all your job listings</p>
        </div>
        <Button className="bg-[#f75524] hover:bg-[#e54414] text-white">
          <Plus size={18} className="mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter size={18} className="mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="grid gap-4">
        {jobs.map((job, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin size={16} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={16} />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-sm text-gray-500">{job.applications} applications</span>
                    <span className="text-sm text-gray-500">Posted {job.postedDate}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye size={16} className="mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CandidatesPage() {
  const candidates = [
    { name: 'Amina Mohammed', skills: ['Cooking', 'Cleaning', 'Childcare'], experience: '5 years', rating: '4.8', status: 'Available' },
    { name: 'Grace Okafor', skills: ['Elder Care', 'Nursing', 'Companionship'], experience: '3 years', rating: '4.9', status: 'Available' },
    { name: 'Fatima Bello', skills: ['Professional Cooking', 'Meal Planning'], experience: '7 years', rating: '4.7', status: 'Hired' },
    { name: 'Mary Adeyemi', skills: ['Childcare', 'Education', 'Activities'], experience: '4 years', rating: '4.6', status: 'Available' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-[#232557] mb-2">Candidates</h1>
        <p className="text-gray-600">Browse and manage applicants</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input placeholder="Search candidates..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Candidates</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="interviewed">Interviewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {candidates.map((candidate, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-[#f75524] text-white text-lg">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-500">{candidate.experience} experience</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium">{candidate.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {candidate.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant={candidate.status === 'Available' ? 'default' : 'secondary'}>
                      {candidate.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye size={14} className="mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="bg-[#f75524] hover:bg-[#e54414] text-white">
                        <MessageSquare size={14} className="mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-[#232557] mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with candidates</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        <Card className="lg:col-span-1 overflow-auto">
          <CardHeader>
            <Input placeholder="Search conversations..." />
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-[#f75524] text-white">AM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">Amina Mohammed</p>
                      <p className="text-xs text-gray-500 truncate">Thanks for the opportunity...</p>
                    </div>
                    <span className="text-xs text-gray-400">2h</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-[#f75524] text-white">AM</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Amina Mohammed</p>
                <p className="text-xs text-gray-500">Active now</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#f75524] text-white text-xs">AM</AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Hello! I'm very interested in the caregiver position.</p>
                  <span className="text-xs text-gray-500">10:30 AM</span>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-[#f75524] text-white rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Great! We'd love to learn more about your experience.</p>
                  <span className="text-xs text-white/80">10:35 AM</span>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." />
              <Button className="bg-[#f75524] hover:bg-[#e54414] text-white">Send</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-[#232557] mb-2">Analytics</h1>
        <p className="text-gray-600">Track your hiring performance</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="text-blue-500" size={24} />
                  <Badge variant="secondary">+12%</Badge>
                </div>
                <p className="text-2xl font-bold">284</p>
                <p className="text-sm text-gray-600">Total Applications</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="text-green-500" size={24} />
                  <Badge variant="secondary">+8%</Badge>
                </div>
                <p className="text-2xl font-bold">1,432</p>
                <p className="text-sm text-gray-600">Job Views</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <UserCheck className="text-purple-500" size={24} />
                  <Badge variant="secondary">+5%</Badge>
                </div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-gray-600">Interviews</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="text-orange-500" size={24} />
                  <Badge variant="secondary">+3%</Badge>
                </div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-600">Hires Made</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Application Trends</CardTitle>
              <CardDescription>Applications received over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-gray-400">Chart visualization would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Job Performance</CardTitle>
              <CardDescription>See how each job posting is performing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Job analytics content here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Insights</CardTitle>
              <CardDescription>Understand your applicant pool</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Candidate analytics content here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SettingsPage({ employerData }: { employerData: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-[#232557] mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={employerData.firstName} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={employerData.lastName} className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={employerData.email} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue={employerData.phone} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input id="position" defaultValue={employerData.position} className="mt-1" />
              </div>
              <Button className="bg-[#f75524] hover:bg-[#e54414] text-white">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" defaultValue={employerData.companyName} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" defaultValue={employerData.industry} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="companySize">Company Size</Label>
                <Input id="companySize" defaultValue={employerData.companySize} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue={employerData.address} className="mt-1" rows={3} />
              </div>
              <Button className="bg-[#f75524] hover:bg-[#e54414] text-white">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Applications</p>
                  <p className="text-sm text-gray-500">Get notified when someone applies to your jobs</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Messages</p>
                  <p className="text-sm text-gray-500">Get notified about new messages</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Summary</p>
                  <p className="text-sm text-gray-500">Receive a weekly summary of your activity</p>
                </div>
                <input type="checkbox" className="w-4 h-4" />
              </div>
              <Button className="bg-[#f75524] hover:bg-[#e54414] text-white">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <Input id="confirmNewPassword" type="password" className="mt-1" />
              </div>
              <Button className="bg-[#f75524] hover:bg-[#e54414] text-white">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
