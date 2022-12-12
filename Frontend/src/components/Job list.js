import ScriptTag from "react-script-tag";
import navBar from "./NavBar";
import JobDetailsItem from "./JobDetailsItem";
import JobListItem from "./JobListItem";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "./NavBar";
import ReactSession from 'react-client-session';
// Authorization
const JobList = ({}) => {
    const [jobs, setJobs] = useState([])

    const fetchJobs = async () => {
        const res = await fetch('http://localhost:3000/jobs', {
            method: "get",
            headers: {
                'Authorization': "Bearer " + Cookies.get('token')
            }
        });
        const jobs = await res.json();
        console.log(jobs)
        return jobs;
    }
    const deleteJob = async (id) => {
        const response = await fetch(`http://localhost:3000/jobs/${id}`, {
            method: 'delete',
            headers: {
                'Authorization': "Bearer " + Cookies.get('token')
            }
        });
        const json = await response.json()
        console.log(json)
        setJobs(jobs.filter((job) => job._id !== id));
    }
    const navigate = useNavigate();

    const checkAuth = () => {
        const session = Cookies.get('token');
        console.log(session)
        if (typeof session === 'undefined' || session === 'undefined')
            navigate('/login')
    }
    // this will happen once the page is loaded
    useEffect(() => {
        checkAuth()
        const getJobs = async () => {
            const jobsFromServer = await fetchJobs();
            setJobs(jobsFromServer);
        };
        getJobs()
    }, [])

    return (
        <div>
            <NavBar/>
            <div className="wrapper">

                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Jobs</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="content">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Jobs</h3>
                            </div>
                            <div className="card-body p-0">
                                <table className="table table-striped projects">
                                    <thead>
                                    <tr>
                                        <th style={{width: "20%"}}>
                                            Job title
                                        </th>
                                        <th>
                                            Number of uploaded CVs
                                        </th>
                                        <th style={{width: "20%"}}>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        jobs.map(job => (
                                                <JobListItem job={job} onDelete={deleteJob}/>
                                            )
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>

                        </div>


                    </section>

                </div>
                <aside className="control-sidebar control-sidebar-dark">

                </aside>

                <ScriptTag type="text/javascript" src="assets/plugins/jquery/jquery.min.js"/>

                <ScriptTag type="text/javascript" src="assets/plugins/jquery-ui/jquery-ui.min.js"/>

                <ScriptTag type="text/javascript" src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"/>

                <ScriptTag type="text/javascript" src="assets/plugins/chart.js/Chart.min.js"/>

                <ScriptTag type="text/javascript" src="assets/plugins/sparklines/sparkline.js"/>
                <ScriptTag type="text/javascript" src="assets/plugins/jqvmap/jquery.vmap.min.js"/>

                <ScriptTag type="text/javascript" src="assets/plugins/jqvmap/maps/jquery.vmap.usa.js"/>

                <ScriptTag type="text/javascript" src="assets/plugins/jquery-knob/jquery.knob.min.js"/>

                <script src="assets/plugins/moment/moment.min.js"/>
                <ScriptTag type="text/javascript" src="assets/plugins/moment/moment.min.js"/>

                <ScriptTag type="text/javascript" src="assets/plugins/daterangepicker/daterangepicker.js"/>

                <ScriptTag type="text/javascript"
                           src="assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"/>

                <ScriptTag type="text/javascript" src="assets/plugins/summernote/summernote-bs4.min.js"/>

                <ScriptTag type="text/javascript"
                           src="assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"/>

                <ScriptTag type="text/javascript" src="assets/dist/js/adminlte.js"/>

                <ScriptTag type="text/javascript" src="assets/dist/js/demo.js"/>

                <ScriptTag type="text/javascript" src="assets/dist/js/pages/dashboard.js"/>
            </div>
        </div>
    )
}
export default JobList
