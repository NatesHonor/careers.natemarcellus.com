import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Header.css';
import categories from '../components/Categories';

const Header = () => {
    const [newJob, setNewJob] = useState({
        jobTitle: '',
        remote: false,
        shortDescription: '',
        requirements: '',
        customQuestions: '',
        company: '',
        tags: [],
        category: '',
        positions: 1,
        salary: '',
        type: ''
    });
    const [isPosting, setIsPosting] = useState(false);
    const [postError, setPostError] = useState(null);
    const [showPostForm, setShowPostForm] = useState(false);
    const [username, setUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedUsername = Cookies.get('username');
        const token = Cookies.get('token');

        if (storedUsername) {
            setUsername(storedUsername);
        }

        const fetchUserRole = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/role`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': process.env.REACT_APP_API_KEY,
                        'Authorization': `Bearer ${token}`,
                      },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user role');
                }

                const data = await response.json();
                setIsAdmin(data.role === 'administrator');
            } catch (error) {
                console.error(error);
                setIsAdmin(false);
            }
        };

        if (token) {
            fetchUserRole();
        } else {
            setIsAdmin(false);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewJob((prevJob) => ({
            ...prevJob,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePositionChange = (e) => {
        setNewJob((prevJob) => ({
            ...prevJob,
            positions: Number(e.target.value)
        }));
    };

    const handleSalaryChange = (e) => {
        setNewJob((prevJob) => ({
            ...prevJob,
            salary: e.target.value
        }));
    };

    const handleLoginClick = () => {
        window.location.href = "https://natemarcellus.com/login"; 
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
            setNewJob({
                jobTitle: '',
                remote: false,
                shortDescription: '',
                requirements: '',
                customQuestions: '',
                company: '',
                tags: [],
                category: '',
                positions: 1,
                salary: '',
                type: ''
            });
            window.location.reload();
        } catch (error) {
            setPostError(error.message);
        } finally {
            setIsPosting(false);
        }
    };

    const togglePostForm = () => {
        setShowPostForm((prevShow) => !prevShow);
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1>Nates Services</h1>
            </div>
            <nav className="header-center">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/listings">Careers</Link></li>
                    <li><Link to="/staff">Current Staff</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            <div className="header-right">
                {username ? (
                    <span>Hello, {username}</span> 
                ) : (
                    <button className="login-button" onClick={handleLoginClick}>Login</button>
                )}
                {isAdmin && (
                    <button className="post-button" onClick={togglePostForm}>Post Job</button>
                )}
            </div>
            {showPostForm && (
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
                        Positions:
                        <input
                            type="number"
                            name="positions"
                            value={newJob.positions}
                            onChange={handlePositionChange}
                            min="1"
                            required
                        />
                    </label>
                    <label>
                        Salary:
                        <input
                            type="text"
                            name="salary"
                            value={newJob.salary}
                            onChange={handleSalaryChange}
                            required
                        />
                    </label>
                    <label>
                        Type:
                        <select
                            name="type"
                            value={newJob.type}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Job Type</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Seasonal">Seasonal</option>
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
                                <option key={category.name} value={category.name}>
                                    {category.name}
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
            )}
        </header>
    );
};

export default Header;
