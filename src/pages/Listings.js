    import React, { useEffect, useState } from 'react';
    import './styles/Listings.css';

    const Listings = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newJob, setNewJob] = useState({
        jobTitle: '',
        remote: false,
        shortDescription: '',
        requirements: '',
        customQuestions: '',
        company: '', 
        tags: [],
        category: ''
    });
    const [isPosting, setIsPosting] = useState(false);
    const [postError, setPostError] = useState(null);
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        category: '',
        experience: '',
        jobType: ''
    });

    const categories = [
        'Design and Creative',
        'Software Engineering',
        'Marketing and Sales',
        'Finance and Accounting',
        'Human Resources',
        'Operations and Management',
        'Customer Service',
        'Product Management',
        'Data Science and Analytics',
        'Information Technology',
        'Education and Training',
        'Healthcare',
        'Legal Services',
        'Manufacturing and Production',
        'Research and Development',
        'Administration and Support',
        'Project Management',
        'Cybersecurity',
        'UX/UI Design',
        'Web Development',
        'Mobile Development',
        'Game Development',
        'Social Media Management',
        'Content Creation',
        'E-commerce',
        'Consulting',
        'Supply Chain Management',
        'Telecommunications',
        'Real Estate',
        'Nonprofit and Community Services'
    ];

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
        const { name, value, type, checked } = e.target;
        if (name in filters) {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
        } else {
        setNewJob((prevJob) => ({
            ...prevJob,
            [name]: type === 'checkbox' ? checked : value
        }));
        }
    };

    const handleTagChange = (e) => {
        const value = e.target.value;
        if (value.endsWith(',')) {
        const tag = value.slice(0, -1).trim();
        if (tag && !newJob.tags.includes(tag)) {
            setNewJob((prevJob) => ({
            ...prevJob,
            tags: [...prevJob.tags, tag]
            }));
        }
        e.target.value = '';
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setNewJob((prevJob) => ({
        ...prevJob,
        tags: prevJob.tags.filter((tag) => tag !== tagToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPosting(true);
        setPostError(null);

        try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/careers/post`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.REACT_APP_API_KEY
            },
            body: JSON.stringify(newJob)
        });

        if (!response.ok) {
            throw new Error('Failed to post the job listing');
        }

        const data = await response.json();
        setJobs((prevJobs) => [...prevJobs, data]);
        setNewJob({
            jobTitle: '',
            remote: false,
            shortDescription: '',
            requirements: '',
            customQuestions: '',
            company: '',
            tags: [],
            category: ''
        });
        } catch (error) {
        setPostError(error.message);
        } finally {
        setIsPosting(false);
        }
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

    if (loading) {
        return <div className="loading">Loading job listings...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="listings-page">
        <h1 className="listings-title">Browse Careers</h1>

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
                <option key={category} value={category}>
                    {category}
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

        <form className="post-job-form" onSubmit={handleSubmit}>
            <h2>Post a New Job</h2>

            <label>
            Job Title:
            <input
                type="text"
                name="jobTitle"
                value={newJob.jobTitle}
                onChange={handleInputChange}
                required
            />
            </label>

            <label>
            Remote:
            <input
                type="checkbox"
                name="remote"
                checked={newJob.remote}
                onChange={handleInputChange}
            />
            </label>

            <label>
            Short Description:
            <textarea
                name="shortDescription"
                value={newJob.shortDescription}
                onChange={handleInputChange}
                required
            />
            </label>

            <label>
            Requirements:
            <textarea
                name="requirements"
                value={newJob.requirements}
                onChange={handleInputChange}
                required
            />
            </label>

            <label>
            Custom Questions:
            <textarea
                name="customQuestions"
                value={newJob.customQuestions}
                onChange={handleInputChange}
            />
            </label>

            <label>
            Company:
            <select
                name="company"
                value={newJob.company}
                onChange={handleInputChange}
                required
            >
                <option value="">Select a company</option>
                <option value="FakeNetwork">Fake Network</option>
                <option value="Nates Services">Nates Services</option>
            </select>
            </label>

            <label>
            Category:
            <select
                name="category"
                value={newJob.category}
                onChange={handleInputChange}
                required
            >
                <option value="">Select a category</option>
                {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
                ))}
            </select>
            </label>

            <label>
            Tags:
            <input
                type="text"
                onKeyUp={handleTagChange}
                placeholder="Press enter to add tags, separate by commas"
            />
            <div className="tag-container">
                {newJob.tags.map((tag) => (
                <span key={tag} className="tag">
                    {tag}
                    <button type="button" onClick={() => handleTagRemove(tag)}>x</button>
                </span>
                ))}
            </div>
            </label>

            <button type="submit" disabled={isPosting}>
            {isPosting ? 'Posting...' : 'Post Job'}
            </button>

            {postError && <div className="error">{postError}</div>}
        </form>

        {jobs.length === 0 ? (
            <p className="no-jobs">No job listings available at the moment.</p>
        ) : (
            <ul className="job-list">
            {jobs.map((job) => (
                <li key={job.jobID} className="job-item">
                <div className="job-info">
                    <h2 className="job-title">{job.jobTitle}</h2>
                    <p className="job-location">{job.location}</p>
                    <p className="job-description">{job.shortDescription}</p>
                    <p className="job-requirements">Requirements: {job.requirements}</p>
                </div>
                <div className="job-actions">
                    <button className="apply-button">Apply Now</button>
                </div>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
    };

    export default Listings;
