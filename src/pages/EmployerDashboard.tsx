
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { jobs } from '@/data/mockJobs';
import { PlusIcon, DownloadIcon, UsersIcon } from 'lucide-react';

// Sample applications data
const applications = [
  {
    id: '1',
    jobId: '1',
    jobTitle: 'Senior Frontend Developer',
    applicantName: 'John Smith',
    email: 'john.smith@example.com',
    appliedDate: '2025-05-06',
    status: 'New',
    resumeUrl: '#',
  },
  {
    id: '2',
    jobId: '1',
    jobTitle: 'Senior Frontend Developer',
    applicantName: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    appliedDate: '2025-05-05',
    status: 'Reviewed',
    resumeUrl: '#',
  },
  {
    id: '3',
    jobId: '3',
    jobTitle: 'DevOps Engineer',
    applicantName: 'Michael Brown',
    email: 'michael.brown@example.com',
    appliedDate: '2025-05-04',
    status: 'Interviewed',
    resumeUrl: '#',
  },
];

// Mock company data
const companyJobs = jobs.slice(0, 3);

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter applications based on search term
  const filteredApplications = applications.filter(app => 
    app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const jobsWithApplications = companyJobs.map(job => {
    const jobApplications = applications.filter(app => app.jobId === job.id);
    return {
      ...job,
      applicationsCount: jobApplications.length,
    };
  });

  return (
    <div className="bg-gray-50 py-10">
      <div className="container px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
            <p className="text-gray-600">Manage your job postings and applications</p>
          </div>
          <Link to="/post-job">
            <Button className="mt-4 md:mt-0">
              <PlusIcon className="h-4 w-4 mr-2" />
              Post a New Job
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{jobsWithApplications.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">New Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{applications.filter(app => app.status === 'New').length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="jobs">My Job Postings</TabsTrigger>
            <TabsTrigger value="applications">Recent Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs">
            <div className="space-y-4">
              {jobsWithApplications.length > 0 ? (
                jobsWithApplications.map(job => (
                  <Card key={job.id} className="overflow-hidden">
                    <div className="border-l-4 border-primary h-full">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <div className="text-gray-600 text-sm mt-1">{job.location} • Posted {new Date(job.postedDate).toLocaleDateString()}</div>
                          </div>
                          <div className="flex items-center mt-4 md:mt-0 space-x-2">
                            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                              {job.applicationsCount} Applications
                            </div>
                            <Link to={`/employer/applications/${job.id}`}>
                              <Button variant="outline" size="sm">
                                <UsersIcon className="h-4 w-4 mr-1" />
                                View Applications
                              </Button>
                            </Link>
                            <Link to={`/jobs/${job.id}`}>
                              <Button variant="outline" size="sm">View Job</Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">No Jobs Posted Yet</h3>
                    <p className="text-gray-600 mb-4">
                      Get started by posting your first job listing.
                    </p>
                    <Link to="/post-job">
                      <Button>Post a Job</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="applications">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search applications by name or job title"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {filteredApplications.length > 0 ? (
                filteredApplications.map(application => (
                  <Card key={application.id} className="overflow-hidden">
                    <div className={`border-l-4 ${
                      application.status === 'New' ? 'border-blue-500' :
                      application.status === 'Reviewed' ? 'border-yellow-500' :
                      'border-green-500'
                    } h-full`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold text-lg">{application.applicantName}</h3>
                              <span className={`ml-3 text-xs px-2 py-1 rounded-full ${
                                application.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                application.status === 'Reviewed' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {application.status}
                              </span>
                            </div>
                            <div className="text-primary text-sm mt-1">{application.jobTitle}</div>
                            <div className="text-gray-600 text-sm mt-1">
                              {application.email} • Applied {new Date(application.appliedDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center mt-4 md:mt-0 space-x-2">
                            <Button variant="outline" size="sm">
                              <DownloadIcon className="h-4 w-4 mr-1" />
                              Download CV
                            </Button>
                            <Link to={`/employer/applications/${application.jobId}`}>
                              <Button variant="outline" size="sm">View Application</Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">No Applications Found</h3>
                    <p className="text-gray-600">
                      {searchTerm ? "No applications match your search criteria." : "You haven't received any applications yet."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerDashboard;
