const JobDetailsItem = ({resume,ondelete}) => {
    return (<tr>
            <td>
                {resume.filename.split('$')[1]}
            </td>

            <td className="project_progress">
                <div className="progress progress-sm">
                    <div className="progress-bar bg-green" role="progressbar"
                         aria-valuenow="77" aria-valuemin="0"
                         aria-valuemax="100" style={{width: `${Math.round(resume.percentage * 100)}%`}}>
                    </div>
                </div>
                <small>
                    {Math.round(resume.percentage * 100)}%
                </small>
            </td>

            <td className="project-actions text-right">
                <button className="btn btn-primary btn-sm" onClick={()=> window.open(`http://localhost:3000/${resume.path}`, "_blank")}>
                    <i className="fas fa-folder">
                    </i>
                    View
                </button>
                <button className="btn btn-danger btn-sm" onClick={()=>ondelete(resume._id)}>
                    <i className="fas fa-trash">
                    </i>
                    Delete
                </button>
            </td>
        </tr>
    )
}
export default JobDetailsItem
