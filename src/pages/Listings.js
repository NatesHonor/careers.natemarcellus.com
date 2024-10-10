import React, { useEffect, useState } from 'react';
import './styles/Listings.css';
import { useNavigate } from 'react-router-dom';
import categories from '../components/Categories';

const Listings = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        category: '',
        experience: '',
        jobType: ''
    });

    const navigate = useNavigate();

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleResetFilters = () => {
        setFilters({
            keyword: '',
            location: '',
            category: '',
            experience: '',
            jobType: ''
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options).replace(',', '');
        return `Date Posted ${formattedDate}`;
    };

    const getCategoryIcon = (categoryName) => {
        const category = categories.find((cat) => cat.name === categoryName);
        return category ? category.icon : null;
    };

    const handleApplyClick = (jobID) => {
        navigate(`/jobs/${jobID}`);
    };

    if (loading) {
        return <div className="loading">Loading job listings...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="listings-container">
            <div classname="listings-title">
            <h2>Careers</h2>
            </div>
            <div className="filter-section">
                <h2>Filter</h2>
                <label>
                    Search Keyword:
                    <input
                        type="text"
                        name="keyword"
                        value={filters.keyword}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={filters.location}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Category:
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.name} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Experience:
                    <input
                        type="text"
                        name="experience"
                        value={filters.experience}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Job Type:
                    <input
                        type="text"
                        name="jobType"
                        value={filters.jobType}
                        onChange={handleInputChange}
                    />
                </label>

                <button type="button" onClick={handleResetFilters}>Reset</button>
            </div>

            <div className="job-listings-section">
                {jobs.length === 0 ? (
                    <p className="no-jobs">No job listings available at the moment.</p>
                ) : (
                    <ul className="job-list">
                        {jobs.map((job) => (
                            <li key={job.jobID} className="job-item">
                                <div className="job-info">
                                    {getCategoryIcon(job.category) && (
                                        <div className="job-icon">
                                            {getCategoryIcon(job.category)} {}
                                        </div>
                                    )}
                                    <h2 className="job-title">{job.jobTitle}</h2>
                                    <p className="job-location">{job.location}</p>
                                    <p className="job-remote">
                                        {job.remote ? "Remote" : "On-site"}
                                    </p>
                                    <p className="job-date">{formatDate(job.postingDate)}</p>
                                </div>
                                <div className="job-actions">
                                    <button
                                        className="apply-button"
                                        onClick={() => handleApplyClick(job.jobID)}
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Listings;
