
const NavBar = () =>{
    return (
        <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="info">
                        <p style={{color:"white"}}>CV shortlisting</p>
                    </div>
                </div>


                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">

                        <li className="nav-item">
                            <a href="/" className="nav-link">
                                <p style={{color:"white"}}>Jobs</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href='/create' className="nav-link">
                                <p style={{color:"white"}}>Create Job</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
        </div>
    )
}

export default NavBar
