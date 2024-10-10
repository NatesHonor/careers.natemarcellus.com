import React, { useEffect, useState } from 'react';

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
    return <div>Loading job listings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="listings-page">
      <h1>Job Listings</h1>
      {jobs.length === 0 ? (
        <p>No job listings available at the moment.</p>
      ) : (
        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job.jobID} className="job-item">
              <h2>{job.jobTitle}</h2>
              <p>{job.shortDescription}</p>
              <p><strong>Remote:</strong> {job.remote ? 'Yes' : 'No'}</p>
              <p><strong>Posted on:</strong> {new Date(job.postingDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Listings;
