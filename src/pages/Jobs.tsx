
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import JobSearch from '@/components/JobSearch';
import JobCard from '@/components/JobCard';
import JobFilters from '@/components/JobFilters';
import { jobs } from '@/data/mockJobs';
import { FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Jobs = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Filter options
  const jobTypes = [
    { id: 'Full-time', label: 'Full-time' },
    { id: 'Part-time', label: 'Part-time' },
    { id: 'Contract', label: 'Contract' },
    { id: 'Remote', label: 'Remote' },
  ];
  
  const jobCategories = [
    { id: 'Development', label: 'Development' },
    { id: 'Design', label: 'Design' },
    { id: 'DevOps', label: 'DevOps' },
    { id: 'Marketing', label: 'Marketing' },
    { id: 'Product', label: 'Product' },
  ];

  const applyFilters = () => {
    let results = [...jobs];
    
    // Apply keyword filter
    if (keyword) {
      const searchTerm = keyword.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply location filter
    if (locationFilter) {
      const locationTerm = locationFilter.toLowerCase();
      results = results.filter(job => 
        job.location.toLowerCase().includes(locationTerm)
      );
    }
    
    // Apply job type filter
    if (selectedTypes.length > 0) {
      results = results.filter(job => selectedTypes.includes(job.type));
    }
    
    // Apply job category filter
    if (selectedCategories.length > 0) {
      results = results.filter(job => selectedCategories.includes(job.category));
    }
    
    setFilteredJobs(results);
  };
  
  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters();
  }, [keyword, locationFilter, selectedTypes, selectedCategories]);

  const handleSearch = (query: { keyword: string; location: string }) => {
    setKeyword(query.keyword);
    setLocationFilter(query.location);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container px-4 md:px-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Your Perfect Job</h1>
          <JobSearch onSearch={handleSearch} />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Mobile Toggle */}
          <div className="lg:hidden mb-4">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center"
            >
              <FilterIcon className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {/* Filters Column */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-semibold text-xl mb-4">Filters</h2>
              
              <JobFilters 
                title="Job Type" 
                options={jobTypes} 
                selectedOptions={selectedTypes} 
                onChange={setSelectedTypes} 
              />
              
              <JobFilters 
                title="Category" 
                options={jobCategories} 
                selectedOptions={selectedCategories} 
                onChange={setSelectedCategories} 
              />
              
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-200"
                  onClick={() => {
                    setSelectedTypes([]);
                    setSelectedCategories([]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Jobs Column */}
          <div className="lg:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <div className="text-gray-600">
                {filteredJobs.length} jobs found
              </div>
              <div className="hidden md:block">
                <select 
                  className="input-field text-sm border-gray-200"
                  defaultValue="newest"
                >
                  <option value="newest">Newest First</option>
                  <option value="relevant">Most Relevant</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="salary-low">Salary: Low to High</option>
                </select>
              </div>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
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
            ) : (
              <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                <h3 className="text-xl font-semibold mb-2">No Jobs Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any jobs matching your criteria. Try adjusting your filters.
                </p>
                <Button 
                  onClick={() => {
                    setKeyword('');
                    setLocationFilter('');
                    setSelectedTypes([]);
                    setSelectedCategories([]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
