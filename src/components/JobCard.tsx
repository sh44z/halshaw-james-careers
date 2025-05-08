
import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, MapPinIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  logo?: string;
}

const JobCard = ({ id, title, company, location, salary, type, postedDate, logo }: JobCardProps) => {
  // Calculate days ago
  const daysAgo = (dateString: string) => {
    const postedDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div className="card p-5 hover:border-primary">
      <div className="flex items-start">
        <div className="mr-4 flex-shrink-0">
          {logo ? (
            <img src={logo} alt={company} className="w-12 h-12 object-contain rounded-md" />
          ) : (
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-md font-semibold text-xl">
              {company.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-secondary">
                <Link to={`/jobs/${id}`} className="hover:text-primary">
                  {title}
                </Link>
              </h3>
              <p className="text-gray-600">{company}</p>
            </div>
            <span className="text-sm text-gray-500">{daysAgo(postedDate)}</span>
          </div>
          
          <div className="mt-2 flex items-center text-gray-600 text-sm">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {salary}
            </Badge>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
              {type}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
