
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import JobSearch from '@/components/JobSearch';
import JobCard from '@/components/JobCard';
import { jobs } from '@/data/mockJobs';

const Index = () => {
  const [searchParams, setSearchParams] = useState({ keyword: '', location: '' });
  
  // Get featured jobs (most recent 3)
  const featuredJobs = [...jobs]
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    .slice(0, 3);
  
  const handleSearch = (query: { keyword: string; location: string }) => {
    setSearchParams(query);
    // In a real app, we would navigate to the jobs page with these search params
    window.location.href = `/jobs?keyword=${query.keyword}&location=${query.location}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-24">
        <div className="container px-4 md:px-0">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Connect with top employers and discover opportunities that match your skills and aspirations.
            </p>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <JobSearch onSearch={handleSearch} />
            </div>
            <div className="mt-8 text-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p>Popular searches: <span className="font-medium">Developer</span>, <span className="font-medium">Marketing</span>, <span className="font-medium">Remote</span>, <span className="font-medium">Finance</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-0">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Featured Jobs</h2>
            <p className="text-gray-600">Discover opportunities from top employers</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary}
                type={job.type}
                postedDate={job.postedDate}
                logo={job.logo}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/jobs">
              <Button className="bg-primary hover:bg-primary-dark">
                View All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container px-4 md:px-0">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-gray-600">Simple steps to find your next career opportunity</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-xl mb-2">Search Jobs</h3>
              <p className="text-gray-600">Browse through thousands of opportunities that match your skills and experience.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-xl mb-2">Apply Online</h3>
              <p className="text-gray-600">Create your profile, upload your CV and apply with just a few clicks.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-xl mb-2">Get Hired</h3>
              <p className="text-gray-600">Interview with employers and receive offers directly through our platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container px-4 md:px-0">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-10 md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">For Employers</h2>
              <p className="text-xl mb-6 text-white/90">
                Find the right talent for your organization with our powerful recruiting tools.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  Post unlimited jobs
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  Access a large pool of qualified candidates
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  Manage applications efficiently
                </li>
              </ul>
              <Link to="/post-job">
                <Button className="bg-accent hover:opacity-90">
                  Post a Job Now
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white rounded-xl shadow-lg p-6 text-secondary max-w-md">
                <h3 className="font-bold text-xl mb-4">Employer Dashboard</h3>
                <p className="text-gray-600 mb-4">
                  Access all the tools you need to find and hire the best talent for your team.
                </p>
                <ul className="space-y-3 mb-6 text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    Post and manage job listings
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    Review applications in one place
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    Download candidate CVs
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    Track recruitment metrics
                  </li>
                </ul>
                <Link to="/employer/login">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                    Login to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
