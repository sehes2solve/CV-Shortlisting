import {useEffect, useRef, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "./NavBar";

const JobCreate = () => {
    const navigate = useNavigate()
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDes] = useState("");
    const createJob = async () => {
        const data = new FormData()
        for (var x = 0; x < selectedFiles.length; x++) {
            data.append('filefield', selectedFiles[x])
        }
        data.append('description', description);
        data.append('title', title);
        axios.post("http://localhost:3000/jobs", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer "+Cookies.get('token')
            }
        }).then(res => { // then print response status
            console.log(res)
        })

    }

    const checkAuth = () => {
        const session = Cookies.get('token');
        if (typeof session === 'undefined')
            navigate('/login')
    }
    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <div>
            <NavBar/>
            <div className="wrapper">

                <div className="wrapper">

                    <div className="content-wrapper">
                        <section className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1>Job Create</h1>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <form onSubmit={() => createJob()}>
                            <section className="content">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card card-primary">
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="inputName">Job Name</label>
                                                    <input type="text" id="inputName"
                                                           onChange={c => setTitle(c.target.value)}
                                                           className="form-control"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputDescription">Job Description</label>
                                                    <textarea id="inputDescription" className="form-control" rows="4"
                                                              onChange={c => setDes(c.target.value)}/>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="file-upload">
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
                                </div>
                            </section>
                            <div className="row">
                                <div className="col-12">
                                    <input type="submit"
                                           value="Create new Job" className="btn btn-success float-right"
                                           style={{"margin-right": "115px"}}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default JobCreate
