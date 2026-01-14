import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/bootstrap.min.css';
import './styles/owl.carousel.min.css';
import './styles/slicknav.css';
import './styles/animate.min.css';
import './styles/magnific-popup.css';
import './styles/themify-icons.css';
import './styles/slick.css';
import './styles/nice-select.css';
import './styles/style.css';
import categories from '../components/Categories';
import './styles/JobPage.css';

const getCategoryIcon = (categoryName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.icon : null;
};

const JobPage = () => {
    const { jobID } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        discord: '',
        age: '',
        email: '',
        website: '',
        coverLetter: '',
        resume: null,
    });

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

    useEffect(() => {
        if (job) {
            document.title = job.jobTitle;

            const metaTitle = document.querySelector('meta[property="og:title"]');
            const metaDescription = document.querySelector('meta[property="og:description"]');
            const metaUrl = document.querySelector('meta[property="og:url"]');

            if (metaTitle) metaTitle.setAttribute('content', job.jobTitle);
            if (metaDescription) metaDescription.setAttribute('content', job.shortDescription);
            if (metaUrl) metaUrl.setAttribute('content', window.location.href);
        }
    }, [job]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/apply`, formDataToSubmit, {
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Application submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
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

    const logoSrc = getCategoryIcon(job.category);

    return (
        <div>
            <header>
                <div className="header-area header-transparent">
                    <div className="main-header header-sticky sticky-bar">
                        <div className="container"></div>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Area Start */}
                <div className="slider-area gray-bg position-relative">
                    <div className="single-slider d-flex align-items-center slider-height2">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="hero-caption hero-caption2">
                                        <h2>{job.jobTitle}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Hero Area End */}

                <div className="job_details_area section-bg2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="job_details_header">
                                    <div className="single_jobs white-bg d-flex justify-content-between">
                                        <div className="jobs_left d-flex align-items-center">
                                            <div className="thumb">
                                                {logoSrc}
                                            </div>
                                            <div className="jobs_content">
                                                <h4>{job.jobTitle}</h4>
                                                <div className="links_locat d-flex align-items-center">
                                                    <div className="location">
                                                        <p><i className="fas fa-map-marker-alt"></i> {job.remote ? "Remote" : "On-site"}</p>
                                                    </div>
                                                    <div className="location">
                                                        <p><i className="far fa-clock"></i> {job.type || "Type not specified"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="jobs_right">
                                            <div className="apply_now">
                                                <a className="heart_mark" href="#!"><i className="ti-heart"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="descript_wrap white-bg">
                                    <div className="single_wrap">
                                        <h4>Job Description</h4>
                                        <p>
                                            {job.shortDescription.split('\n').map((line, index) => (
                                                <span key={index}>
                                                    {line}
                                                    <br />
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                    <div className="single_wrap">
                                        <h4>Responsibilities</h4>
                                        <ul>
                                            {job.responsibilities.split('\n').map((line, index) => (
                                                <li key={index}>{line}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="single_wrap">
                                        <h4>Requirements</h4>
                                        <ul>
                                            {job.requirements.split('\n').map((line, index) => (
                                                <li key={index}>{line}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="single_wrap">
                                        <h4>Benefits</h4>
                                        <ul>
                                            {job.benefits.split('\n').map((line, index) => (
                                                <li key={index}>{line}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="apply_job_form white-bg">
                                    <h4>Apply for the job</h4>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input_field">
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        placeholder="Firstname/Nickname"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input_field">
                                                    <input
                                                        type="text"
                                                        name="discord"
                                                        placeholder="Discord"
                                                        value={formData.discord}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input_field">
                                                    <input
                                                        type="text"
                                                        name="age"
                                                        placeholder="Age"
                                                        value={formData.age}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input_field">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input_field">
                                                    <input
                                                        type="text"
                                                        name="website"
                                                        placeholder="Website/Portfolio link"
                                                        value={formData.website}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="input_field">
                                                    <textarea
                                                        name="coverLetter"
                                                        cols="30"
                                                        rows="10"
                                                        placeholder="Cover letter"
                                                        value={formData.coverLetter}
                                                        onChange={handleChange}
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="input_field">
                                                    <input
                                                        type="file"
                                                        name="resume"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="submit_btn">
                                                    <button className="boxed-btn3 w-100" type="submit">Apply Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="job_sumary">
                                    <div className="summery_header">
                                        <h3>Job Summary</h3>
                                    </div>
                                    <div className="job_content">
                                        <ul>
                                            <li>Published on: <span>{formatDate(job.postingDate)}</span></li>
                                            <li>Vacancy: <span>{job.positions || "Not specified"}</span></li>
                                            <li>Salary: <span>{job.salary || "Not specified"}</span></li>
                                            <li>Job type: <span>{job.type || "Not specified"}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JobPage;
