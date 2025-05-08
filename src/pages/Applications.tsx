
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { jobs } from '@/data/mockJobs';
import { DownloadIcon, ArrowLeftIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Sample applications data
const sampleApplications = [
  {
    id: '1',
    jobId: '1',
    applicantName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+44 7123 456789',
    appliedDate: '2025-05-06',
    coverLetter: "I'm excited to apply for the Senior Frontend Developer position at Tech Innovations Ltd. With over 6 years of experience in React development and a passion for creating responsive, user-friendly interfaces, I believe I would be a great addition to your team.",
    status: 'New',
    resumeUrl: '#',
  },
  {
    id: '2',
    jobId: '1',
    applicantName: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    phone: '+44 7987 654321',
    appliedDate: '2025-05-05',
    coverLetter: "Please consider my application for the Senior Frontend Developer role. I have 7+ years of experience working with modern JavaScript frameworks, particularly React, and have led frontend development for several successful projects.",
    status: 'Reviewed',
    resumeUrl: '#',
  },
  {
    id: '3',
    jobId: '1',
    applicantName: 'David Wilson',
    email: 'david.wilson@example.com',
    phone: '+44 7111 222333',
    appliedDate: '2025-05-04',
    coverLetter: "I'm very interested in the Senior Frontend Developer position. With my strong background in React, Redux, and modern frontend tooling, combined with my experience in leading development teams, I believe I can make a valuable contribution to your organization.",
    status: 'Interviewed',
    resumeUrl: '#',
  },
  {
    id: '4',
    jobId: '1',
    applicantName: 'Sarah Brown',
    email: 'sarah.brown@example.com',
    phone: '+44 7444 555666',
    appliedDate: '2025-05-03',
    coverLetter: "I am applying for the Senior Frontend Developer role at Tech Innovations Ltd. With extensive experience in building scalable React applications and a focus on performance optimization, I am excited about the opportunity to bring my skills to your innovative team.",
    status: 'New',
    resumeUrl: '#',
  },
  {
    id: '5',
    jobId: '1',
    applicantName: 'Michael Taylor',
    email: 'michael.taylor@example.com',
    phone: '+44 7777 888999',
    appliedDate: '2025-05-02',
    coverLetter: "I'm thrilled to apply for the Senior Frontend Developer position. My background includes 5+ years of React development, TypeScript expertise, and experience with state management solutions like Redux and MobX. I'm passionate about creating accessible and performant user interfaces.",
    status: 'New',
    resumeUrl: '#',
  },
];

const Applications = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { toast } = useToast();
  const job = jobs.find(j => j.id === jobId);
  
  // Filter applications for this job
  const jobApplications = sampleApplications.filter(app => app.jobId === jobId);
  
  const [applicationStatuses, setApplicationStatuses] = useState<Record<string, string>>(
    Object.fromEntries(jobApplications.map(app => [app.id, app.status]))
  );
  
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  const handleStatusChange = (applicationId: string, status: string) => {
    setApplicationStatuses(prev => ({
      ...prev,
      [applicationId]: status
    }));
    
    toast({
      title: "Status Updated",
      description: "The application status has been updated.",
    });
  };
  
  const filteredApplications = jobApplications.filter(app => {
    if (statusFilter === 'All') return true;
    return applicationStatuses[app.id] === statusFilter;
  });

  const downloadCV = (applicationId: string, applicantName: string) => {
    // In a real application, this would download the CV file
    toast({
      title: "Download Started",
      description: `Downloading CV for ${applicantName}`,
    });
  };

  if (!job) {
    return (
      <div className="container px-4 md:px-0 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <Link to="/employer/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10">
      <div className="container px-4 md:px-0">
        <div className="mb-8">
          <Link to="/employer/dashboard" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">Applications for {job.title}</h1>
          <p className="text-gray-600">
            {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''} received
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Applications</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Reviewed">Reviewed</SelectItem>
                <SelectItem value="Interviewed">Interviewed</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredApplications.length > 0 ? (
          <div className="space-y-6">
            {filteredApplications.map(application => (
              <Card key={application.id} className="overflow-hidden">
                <div className={`border-l-4 ${
                  applicationStatuses[application.id] === 'New' ? 'border-blue-500' :
                  applicationStatuses[application.id] === 'Reviewed' ? 'border-yellow-500' :
                  applicationStatuses[application.id] === 'Interviewed' ? 'border-green-500' :
                  'border-red-500'
                } h-full`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between">
                      <div className="mb-4 lg:mb-0 lg:mr-6 lg:w-3/4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h2 className="font-semibold text-xl">{application.applicantName}</h2>
                            <div className="text-gray-600 text-sm mt-1">
                              Applied on {new Date(application.appliedDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => downloadCV(application.id, application.applicantName)}
                            >
                              <DownloadIcon className="h-4 w-4 mr-1" />
                              Download CV
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Email</div>
                            <div>{application.email}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Phone</div>
                            <div>{application.phone}</div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm font-medium text-gray-500 mb-2">Cover Letter</div>
                          <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-100">
                            {application.coverLetter}
                          </div>
                        </div>
                      </div>
                      
                      <div className="lg:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-6 pt-4 lg:pt-0">
                        <div className="text-sm font-medium text-gray-500 mb-2">Application Status</div>
                        <Select
                          value={applicationStatuses[application.id]}
                          onValueChange={(value) => handleStatusChange(application.id, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Reviewed">Reviewed</SelectItem>
                            <SelectItem value="Interviewed">Interviewed</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <div className="mt-4 space-y-2">
                          <Button variant="outline" className="w-full text-sm">
                            Send Email
                          </Button>
                          <Button variant="outline" className="w-full text-sm">
                            Schedule Interview
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">No Applications Found</h3>
              <p className="text-gray-600 mb-4">
                {statusFilter !== 'All' 
                  ? `No applications with status "${statusFilter}" for this job.` 
                  : "This job hasn't received any applications yet."
                }
              </p>
              {statusFilter !== 'All' && (
                <Button onClick={() => setStatusFilter('All')}>
                  Show All Applications
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Applications;
