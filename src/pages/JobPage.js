import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

    const logoSrc = getCategoryIcon(job.category);
    return (
        <div>
            <header>
                <div className="header-area header-transparent">
                    <div className="main-header header-sticky sticky-bar">
                        <div className="container">
                        </div>
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
                                    {job.customQuestions.length > 0 && (
                                        <div className="single_wrap">
                                            <h4>Custom Questions</h4>
                                            <ul>
                                                {job.customQuestions.map((question, index) => (
                                                    <li key={index}>{question}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
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
                                    <form action="#!">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input_field">
                                                    <input type="text" placeholder="Your name" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input_field">
                                                    <input type="email" placeholder="Email" required />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="input_field">
                                                    <input type="text" placeholder="Website/Portfolio link" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <button type="button" id="inputGroupFileAddon03">
                                                            <i className="fas fa-cloud-upload-alt" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                    <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" />
                                                        <label className="custom-file-label" htmlFor="inputGroupFile03">Upload CV</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="input_field">
                                                    <textarea name="#" id="" cols="30" rows="10" placeholder="Cover letter" required></textarea>
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
