
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jobs } from '@/data/mockJobs';
import { BriefcaseIcon, MapPinIcon, CalendarIcon, ShareIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  coverLetter: z.string().optional(),
  resume: z.instanceof(FileList).refine(files => files.length > 0, "CV is required")
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  
  // Find the job by ID
  const job = jobs.find(j => j.id === id);
  
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
    }
  });

  const onSubmit = (data: ApplicationFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log("Application data:", data);
      setIsSubmitting(false);
      setApplicationSubmitted(true);
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
        variant: "default",
      });
    }, 1500);
  };

  // If job not found
  if (!job) {
    return (
      <div className="container px-4 md:px-0 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/jobs">
            <Button>View All Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10">
      <div className="container px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Job Details Column */}
          <div className="md:w-2/3">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    {job.logo ? (
                      <img src={job.logo} alt={job.company} className="w-16 h-16 object-contain rounded-md" />
                    ) : (
                      <div className="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-md font-semibold text-2xl">
                        {job.company.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">{job.title}</h1>
                    <p className="text-lg mb-3 text-gray-700">{job.company}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center text-gray-600 mr-4">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mr-4">
                        <BriefcaseIcon className="h-4 w-4 mr-1" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {job.salary}
                      </Badge>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                        {job.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="mb-6 text-gray-700">{job.description}</p>

                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Apply Now Column */}
          <div className="md:w-1/3">
            <div className="sticky top-10">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Apply for this position</h2>
                  
                  {applicationSubmitted ? (
                    <div className="text-center py-4">
                      <div className="mx-auto w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                        <svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Application Submitted</h3>
                      <p className="text-gray-600 mb-4">Thank you for your application!</p>
                      <Button className="w-full" variant="outline" asChild>
                        <Link to="/jobs">Browse More Jobs</Link>
                      </Button>
                    </div>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full mb-4">Apply Now</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Apply for {job.title}</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                            <FormField
                              control={form.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your full name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="Enter your email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your phone number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="coverLetter"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Cover Letter (Optional)</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Tell us why you're a great fit for this role" 
                                      {...field} 
                                      rows={4}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="resume"
                              render={({ field: { onChange, value, ...rest } }) => (
                                <FormItem>
                                  <FormLabel>Upload CV</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="file" 
                                      accept=".pdf,.doc,.docx" 
                                      onChange={(e) => onChange(e.target.files)}
                                      {...rest}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                              {isSubmitting ? "Submitting..." : "Submit Application"}
                            </Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  )}

                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <ShareIcon className="h-4 w-4 mr-2" />
                    Share Job
                  </Button>

                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-semibold mb-2">About {job.company}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {job.company} is a leading company in the {job.category} industry.
                    </p>
                    <Link to="#" className="text-primary font-medium text-sm">
                      View Company Profile
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Similar Jobs</h3>
                  <div className="space-y-4">
                    {jobs
                      .filter(j => j.category === job.category && j.id !== job.id)
                      .slice(0, 3)
                      .map(similarJob => (
                        <Link key={similarJob.id} to={`/jobs/${similarJob.id}`} className="block">
                          <div className="hover:bg-gray-50 p-2 rounded-md -mx-2">
                            <h4 className="font-medium text-primary">{similarJob.title}</h4>
                            <p className="text-sm text-gray-600">{similarJob.company}</p>
                            <div className="text-xs text-gray-500 mt-1">{similarJob.location}</div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
