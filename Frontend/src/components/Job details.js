import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import JobDetailsItem from "./JobDetailsItem";
import axios from "axios";
import Cookies from "js-cookie";
import NavBar from "./NavBar";

function JobDetails() {
    const {id} = useParams();
    const [job, setJob] = useState({resumes: [], title: '', description: ''})
    const [selectedFiles, setSelectedFiles] = useState(null);

    const fetchJob = async () => {
        const res = await fetch(`http://localhost:3000/jobs/${id}`, {
            method: "get",
            headers: {
                'Authorization': "Bearer "+Cookies.get('token')
            }
        });
        const job = await res.json();
        console.log(job);
        return job;
    }
    const deleteCV = async (cvId) => {
        const response = await fetch(`http://localhost:3000/jobs/${id}/resumes/${cvId}`, {
            method: 'delete',
            headers: {
                'Authorization': "Bearer "+Cookies.get('token')
            }
        });
        const json = await response.json()
        console.log(json)
        setJob({
            resumes: job.resumes.filter((resume) => resume._id !== cvId),
            title: job.title,
            description: job.description
        });
    }
    const navigate = useNavigate();

    const checkAuth = () => {
        const session = Cookies.get('token');
        if (typeof session === 'undefined')
            navigate('/login')
    }
    useEffect(() => {
        checkAuth()
        const getJob = async () => {
            const job = await fetchJob();
            job.resumes.sort((a, b) => (a.percentage > b.percentage) ? -1 : ((b.percentage > a.percentage) ? 1 : 0))

            setJob(job);
        };
        getJob();
    }, []);

    const addCVs = async () => {
        const data = new FormData()
        for (var x = 0; x < selectedFiles.length; x++) {
            data.append('filefield', selectedFiles[x])
        }
        axios.post(`http://localhost:3000/jobs/${id}/resumes`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer "+Cookies.get('token')
            }
        }).then(res => { // then print response status
            console.log(res)
        })
    }
    return (
        <div>
            <NavBar/>
            <div className="content-wrapper">

                <section className="content">
                    <form onSubmit={() => addCVs()}>
                        <div className="file-upload">
                            <button className="file-upload-btn" type="submit"
                            >Add more CV(s)
                            </button>

                            <div className="image-upload-wrap">
                                <input className="file-upload-input" type="file"
                                       multiple
                                       accept=".pdf , .docx"
                                       onChange={(e) => setSelectedFiles(e.target.files)}/>
                                <div className="drag-text">
                                    <h3>{selectedFiles ? `selected ${selectedFiles.length} file(s)` : "Drag and drop or select cv(s)"}</h3>
                                </div>
                            </div>

                        </div>
                    </form>
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Job Detail</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="card-body p-0">
                                    <table className="table table-striped projects">
                                        <thead>
                                        <tr>
                                            <th style={{width: "20%"}}>
                                                CV Name
                                            </th>
                                            <th>
                                                Similarity degree
                                            </th>
                                            <th style={{width: "20%"}}>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            job.resumes.length > 0 ? job.resumes.map(resume => (
                                                <JobDetailsItem resume={resume} ondelete={deleteCV}/>
                                            )) : ""
                                        }

                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                                    <h3 className="text-primary">{job.title}</h3>
                                    <p className="text-muted">{job.description}</p>
                                    <br/>
                                    <div className="text-center mt-5 mb-3">
                                        <Link className="btn btn-info btn-sm" to={`/edit/${id}`}>
                                            <i className="fas fa-pencil-alt">
                                            </i>
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default JobDetails
