export interface IIssueLogModalForm {
    oneSubmission: SubmissionEntity
    allSubmissionsArray: SubmissionEntity[]
    onEdit: () => void;
    options: ITextValue[];
    onChange: (fieldName: any, fieldValue: any) => void;
    onRespond: (any) => void;
    idForModal: string
    children?: any
}

export const IssueLogModalForm = (props: IIssueLogModalForm) => {
    return (
        <React.Fragment>
            <div className="modal fade show" id={props.idForModal} style={{ display: "none", ariaHidden: "true" }}>
                <div className="modal-dialog ">

                    <div className="modal-content">

                        <div className="modal-header" >
                            <h5 className="modal-title">{props.oneSubmission.issueTitle} </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" >×</button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Issue Text:  </strong>{props.oneSubmission.issueText} </p>
                            <p><strong>Name:</strong> {props.oneSubmission.firstName} {props.oneSubmission.lastName}</p>
                            <p><strong>Created Date:</strong> {moment(props.oneSubmission.createdDate).format('MM-DD-YYYY')} </p>

                            {props.children}
                            <DropDownList
                                label="Change status"
                                name="statusCode"
                                selectedValue={props.oneSubmission.statusCode}
                                options={props.options}
                                onChange={props.onChange}
                            />
                            <div className="modal-footer">
                                <button className="btn btn-sm  btn-secondary float-right" onClick={() => props.onEdit()} data-toggle="modal" data-target="#issue" >Change Status</button>
                                <button className="btn btn-sm  btn-primary float-right " onClick={() => props.onRespond(props.oneSubmission.id)} data-toggle="modal" data-target="#issue">Send a Question</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </React.Fragment>
    )

}
