interface IssueLogAdminTableFormProps {
    allSubmissionsArray: SubmissionEntity[]
    onView: (any) => void
    onRespond: (any) => void
    currentPage: number
    onPreviousClick: () => void,
    onForwardClick: () => void,
    onNavClick: (any) => void,
    totalPages: number

}

export const IssueLogAdminTableForm = (props: IssueLogAdminTableFormProps) => {

    return (
        <React.Fragment>
            <div className="card-datatable table-responsive">
                < table className="table table-striped table-bordered dataTable no-footer" role="grid" >
                    <thead>
                        <tr>
                            <th style={{ width: "10%", textAlign: "center" }}>Ticket Number</th>
                            <th style={{ width: "10%", textAlign: "center" }}>Issue Type</th>
                            <th style={{ width: "10%", textAlign: "center" }}>Issue Title</th>
                            <th style={{ textAlign: "center" }}>Issue Text</th>
                            <th style={{ width: "10%", textAlign: "center" }}>Status Code</th>
                            <th style={{ width: "10%", textAlign: "center" }}>Created Date</th>
                            <th style={{ width: "10%", textAlign: "center" }}>Submitted User's Name</th>
                            <th style={{ width: "10%", textAlign: "center" }}>Details</th>

                        </tr>
                    </thead>
                    <tbody>
                        {props.allSubmissionsArray.map((itm, index) => {
                            return (
                                <tr key={index}>
                                    <td>{itm.id}</td>
                                    <td>{itm.logTypeName}</td>
                                    <td>{itm.issueTitle}</td>
                                    <td className="text-left">{itm.issueText}</td>
                                    <td>{itm.statusCode}</td>
                                    <td>{moment(moment.utc(itm.createdDate).toDate()).local().format('MM-DD-YYYY')}
                                        <br />
                                        <small className="text-muted">{moment(moment.utc(itm.createdDate).toDate()).local().fromNow()}</small></td>
                                    <td>{itm.firstName}<span> </span>{itm.lastName}</td>
                                    <td className="d-flex justify-content-center align-items-center"><button data-target="#issue" data-toggle="modal" className="btn btn-xs icon-btn oi oi-pencil btn-outline-secondary borderless" onClick={() => props.onView(itm.id)}></button>
                                        {(itm.isReadTotalPerIssue != 0) ?
                                            <button onClick={() => props.onRespond(itm.id)} className=" btn btn-xs ion ion-md-mail-unread d-block btn-outline-danger borderless"><span className="badge">{itm.isReadTotalPerIssue}</span></button>
                                            : null
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                < Pagination
                    currentPage={props.currentPage}
                    onNavClick={props.onNavClick}
                    onPreviousClick={props.onPreviousClick}
                    onForwardClick={props.onForwardClick}
                    totalPages={props.totalPages} />
            </div>
        </React.Fragment >
    )

}