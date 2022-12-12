import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import NavBar from "./NavBar";

const JobEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [job, setJob] = useState({title: '', description: ''})
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

    const checkAuth = () => {
        const session = Cookies.get('token');
        if (typeof session === 'undefined')
            navigate('/login')
    }
    useEffect(() => {
        checkAuth()
        const getJob = async () => {
            const job = await fetchJob();
            setJob(job);
        };
        getJob();
    }, []);

    const updateJob = async () => {
        const res = await fetch(`http://localhost:3000/jobs/${id}`, {
            method: "put",
            headers: {
                'Content-type': 'application/json',
                'Authorization': "Bearer "+Cookies.get('token')
            },
            body: JSON.stringify(job)
        })
        const jobUpdated=await res.json();
        console.log(jobUpdated)
        setJob(jobUpdated)
        navigate(`/view/${id}`);
    }
    return (
        <div className="wrapper">
            <NavBar/>
            <div className="wrapper">

                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Job Edit</h1>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="content">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card card-primary">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="inputName">Job Name</label>
                                            <input type="text" id="inputName" value={job.title}
                                                   onChange={(c) => setJob({
                                                       title: c.target.value,
                                                       description: job.description
                                                   })} className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputDescription">Job Description</label>
                                            <textarea id="inputDescription" className="form-control"
                                                      value={job.description} onChange={(c) => setJob({
                                                description: c.target.value,
                                                title: job.title
                                            })} rows="4"/>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="row">
                        <div className="col-12">
                            <input onClick={updateJob} value="Save" className="btn btn-success float-left"
                                   style={{"margin-left": "10px"}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default JobEdit
