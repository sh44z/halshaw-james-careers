
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserIcon, BriefcaseIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-0">
        <Link to="/" className="font-bold text-2xl text-secondary flex items-center">
          <span className="text-primary">Halshaw</span>&nbsp;James
        </Link>
        
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
          <Link to="/jobs" className="text-gray-700 hover:text-primary transition-colors">Find Jobs</Link>
          <Link to="/employers" className="text-gray-700 hover:text-primary transition-colors">For Employers</Link>
        </nav>

        <div className="flex space-x-2">
          <Link to="/post-job">
            <Button className="bg-accent hover:opacity-90">
              <BriefcaseIcon className="h-4 w-4 mr-1" />
              Post a Job
            </Button>
          </Link>
          <Link to="/employer/login">
            <Button variant="outline" className="border-primary text-primary hover:text-primary-dark">
              <UserIcon className="h-4 w-4 mr-1" />
              Employer Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
