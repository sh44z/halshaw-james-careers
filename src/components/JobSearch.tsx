
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, MapPinIcon, FilterIcon } from 'lucide-react';

interface JobSearchProps {
  onSearch: (query: { keyword: string; location: string; }) => void;
}

const JobSearch = ({ onSearch }: JobSearchProps) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ keyword, location });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Job title, keywords, or company"
            className="pl-10 h-12"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        
        <div className="flex-1 relative">
          <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="City, region or remote"
            className="pl-10 h-12"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <Button type="submit" className="h-12 px-6 bg-primary hover:bg-primary-dark">
          Search Jobs
        </Button>
      </div>
    </form>
  );
};

export default JobSearch;
