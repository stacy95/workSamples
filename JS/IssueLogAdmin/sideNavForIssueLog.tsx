//Here is the notification badge to show in the side navigation for the admin and student. I am using Redux and Bootstrap as the badge icon. 
//The role for admin is "super" and the user is "student".
{
    props.user.roleRoutes.includes("/super") ?
        <li className="sidenav-item">
            <Link to={`/super/issueLogsForAdmin`} className="sidenav-link">
                <i className="sidenav-icon ion ion-md-apps"></i>

                <div>View Issues {props.notification.notifForIssueForAdmin != 0 ?
                    <span className="badge badge-pill badge-danger">{props.notification.notifForIssueForAdmin}</span> : ""}</div>
            </Link>
        </li>
        : <React.Fragment>
            {props.user.roleRoutes.includes("/student") ?
                <li className="sidenav-item">
                    <Link to={`/viewAllSubmissionsFromUser`} className="sidenav-link">
                        <i className="sidenav-icon ion ion-md-apps"></i>

                        <div>My Issues {props.notification.notifForIssue != 0 ? <span className="badge badge-pill badge-danger">{props.notification.notifForIssue} </span> : ""}</div>
                    </Link>
                </li> : ""}
        </React.Fragment>
}
