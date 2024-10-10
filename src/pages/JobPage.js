import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles/JobPage.css';

const JobPage = () => {
    const { jobID } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/careers/details/${jobID}`, {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch job details');
                }

                const data = await response.json();
                setJob(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [jobID]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    if (loading) {
        return <div className="loading">Loading job details...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!job) {
        return <div className="error">Job not found</div>;
    }

    return (
        <div className="job-page-container">
            <div className="job-header">
                <h1 className="job-title">{job.jobTitle}</h1>
                <p className="company-name">{job.company}</p>
                <p className="posting-date">Posted on: {formatDate(job.postingDate)}</p>
                <p className={`job-remote ${job.remote ? 'remote' : 'on-site'}`}>
                    {job.remote ? 'Remote' : 'On-site'}
                </p>
                <div className="job-tags">
                    {job.tags.map((tag, index) => (
                        <span key={index} className="job-tag">{tag}</span>
                    ))}
                </div>
            </div>

            <div className="job-details">
                <h2>Job Description</h2>
                <p>{job.shortDescription}</p>

                <h2>Requirements</h2>
                <p>{job.requirements}</p>

                {job.customQuestions.length > 0 && (
                    <div className="custom-questions">
                        <h2>Custom Questions</h2>
                        <ul>
                            {job.customQuestions.map((question, index) => (
                                <li key={index}>{question}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobPage;
