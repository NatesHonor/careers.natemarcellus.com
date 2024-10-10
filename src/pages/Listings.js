import React, { useEffect, useState } from 'react';
import './styles/Listings.css';

const Listings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/careers/list`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch job listings');
        }

        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="loading">Loading job listings...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="listings-page">
      <h1 className="listings-title">Available Job Listings</h1>
      {jobs.length === 0 ? (
        <p className="no-jobs">No job listings available at the moment.</p>
      ) : (
        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job.jobID} className="job-item">
              <div className="job-info">
                <h2 className="job-title">{job.jobTitle}</h2>
                <p className="job-description">{job.shortDescription}</p>
                <div className="job-details">
                  <span className="job-remote">
                    <strong>Remote:</strong> {job.remote ? 'Yes' : 'No'}
                  </span>
                  <span className="job-date">
                    <strong>Posted on:</strong> {new Date(job.postingDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Listings;
