//Creating an Issue Log Page for Admin(as well as the User) to then talk to the user via Redux.
const mapStateToProps = (state) => ({
    user: state.user
});

export interface IIssueLogAdminPage {
    oneSubmission: SubmissionEntity
    allSubmissionsArrayForResolved: SubmissionEntity[]
    allSubmissionsArrayForPending: SubmissionEntity[]
    categories: ITextValue[]
    maxPageForPending: number
    currentPageForPending: number
    maxPageForResolved: number
    currentPageForResolved: number
}

interface IMapStateToPropsForIssue extends RouteComponentProps<{}> {
    user: any
}

export interface SubmissionEntity {
    issueTitle: string
    issueText: string
    statusCode: string
    createdDate: string
    email: string
    logTypeDesc: string
    logTypeName: string
    issueLogTypeId: number
    id: number
    firstName: string
    lastName: string
    submittedUserBaseId: number
    isReadTotalPerIssue: number
    pageNumber: number
}
class IssueLogAdminPage extends React.Component<IMapStateToPropsForIssue, IIssueLogAdminPage> {
    constructor(props) {
        super(props);

        this.state = {
            oneSubmission: {
                issueTitle: "",
                issueText: "",
                statusCode: "Pending",
                createdDate: "",
                email: "",
                logTypeName: "",
                logTypeDesc: "",
                issueLogTypeId: 0,
                firstName: "",
                lastName: "",
                id: this.props.user.id,
                submittedUserBaseId: 0,
                isReadTotalPerIssue: 0,
                pageNumber: 1
            },
            allSubmissionsArrayForPending: [],
            allSubmissionsArrayForResolved: [],
            categories: [
                { value: "Pending", text: "Pending" },
                { value: "Resolved", text: "Resolved" }
            ],

            maxPageForPending: 0,
            currentPageForPending: 1,
            maxPageForResolved: 0,
            currentPageForResolved: 1

        }
    }

    componentDidMount() {
        this.getAllUsersSubmission();
        this.getAllUseresSubmissionsByResolved();
    }

    getAllUseresSubmissionsByResolved = () => {
        let model = {
            id: this.props.user.id,
            statusCode: "Resolved",
            pageNumber: this.state.currentPageForResolved
        }
        IssueLogApi.getAllUsersSubmissionByResolved(model)
            .then(response => {
                console.log(response);
                this.setState({
                    ...this.state,
                    allSubmissionsArrayForResolved: response.items,

                    maxPageForResolved: response.items[0].pageCount
                })
            })
    }

    getAllUsersSubmission = () => {
        let model = {
            id: this.props.user.id,
            statusCode: "Pending",
            pageNumber: this.state.currentPageForPending
        }

        IssueLogApi.getAllUsersSubmission(model)
            .then(response => {
                console.log("pending array", response);
                this.setState({
                    ...this.state,
                    allSubmissionsArrayForPending: response.items,

                    maxPageForPending: response.items[0].pageCount
                })
            })
            .catch(error => console.log(error))
    }
    onNavClick = (pgNum) => {
        this.setState({
            ...this.state,
            currentPageForPending: pgNum
        }
            , () => this.getAllUsersSubmission())
    }

    onPreviousClick = () => {
        this.setState({
            ...this.state,
            currentPageForPending: this.state.currentPageForPending - 1
        }, () => this.getAllUsersSubmission())
    }
    onForwardClick = () => {
        this.setState({
            ...this.state,
            currentPageForPending: this.state.currentPageForPending + 1

        }, () => this.getAllUsersSubmission())
    }

    //for Resolved

    onNavClickForResolved = (pgNum) => {
        this.setState({
            ...this.state,
            currentPageForResolved: pgNum
        }
            , () => this.getAllUseresSubmissionsByResolved())
    }

    onPreviousClickForResolved = () => {
        this.setState({
            ...this.state,
            currentPageForResolved: this.state.currentPageForResolved - 1
        }, () => this.getAllUseresSubmissionsByResolved())
    }
    onForwardClickForResolved = () => {
        this.setState({
            ...this.state,
            currentPageForResolved: this.state.currentPageForResolved + 1

        }, () => this.getAllUseresSubmissionsByResolved())
    }

    //End of Resolved
    onEdit = () => {
        let oneSubmissionObject = { ...this.state.oneSubmission }
        delete oneSubmissionObject.firstName;
        delete oneSubmissionObject.lastName;
        IssueLogApi.putIssueLog(oneSubmissionObject)
            .then(response => {
                console.log(response);
                this.getAllUsersSubmission();
                this.getAllUseresSubmissionsByResolved();
            })
            .catch(error => console.log(error))
    }
    onView = (id) => {
        IssueLogApi.getByIssueLogId(id)
            .then(response => {
                console.log(response.items);
                this.setState({
                    ...this.state,
                    oneSubmission: response.items[0]
                });
            })
            .catch(error => console.log(error));
    }

    onChange = (fieldName, fieldValue) => {
        let nextState = {
            ...this.state,
            oneSubmission: {
                ...this.state.oneSubmission,
                [fieldName]: fieldValue
            }
        }
        this.setState(nextState, () => {
            console.log(this.state);
        })
    }

    onRespond = (id) => {
        let object = this.state.oneSubmission.submittedUserBaseId
        this.props.history.push(
            `/super/issueLogResponse/${id}/${object}`,
        )
        IssueLogApi.putIsRead(id)
            .then(response => console.log(response)
            )
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <div className="card-header">
                    <h2>All Issue Logs</h2>
                </div>
                <Tabs
                    defaultActiveTabIndex={0} >
                    <Tab
                        tabHeader="Pending"
                        tabIndex={0}
                        linkClassName="nav-link" >
                        <br />
                        <Card>
                            <IssueLogAdminTableForm
                                allSubmissionsArray={this.state.allSubmissionsArrayForPending}
                                onRespond={this.onRespond}
                                onView={this.onView}
                                currentPage={this.state.currentPageForPending}
                                onNavClick={this.onNavClick}
                                onPreviousClick={this.onPreviousClick}
                                onForwardClick={this.onForwardClick}
                                totalPages={this.state.maxPageForPending}
                            />
                            <IssueLogModalForm
                                oneSubmission={this.state.oneSubmission}
                                allSubmissionsArray={this.state.allSubmissionsArrayForPending}
                                onEdit={this.onEdit}
                                options={this.state.categories}
                                onChange={this.onChange}
                                onRespond={this.onRespond}
                                idForModal="issue"
                            />
                        </Card>
                    </Tab>
                    <Tab
                        tabHeader="Resolved"
                        tabIndex={1}
                        linkClassName="nav-link" >
                        <br />
                        <Card>
                            <IssueLogAdminTableForm
                                allSubmissionsArray={this.state.allSubmissionsArrayForResolved}
                                onRespond={this.onRespond}
                                onView={this.onView}
                                currentPage={this.state.currentPageForResolved}
                                onNavClick={this.onNavClickForResolved}
                                onPreviousClick={this.onPreviousClickForResolved}
                                onForwardClick={this.onForwardClickForResolved}
                                totalPages={this.state.maxPageForResolved} />
                            <IssueLogModalForm
                                oneSubmission={this.state.oneSubmission}
                                allSubmissionsArray={this.state.allSubmissionsArrayForResolved}
                                onEdit={this.onEdit}
                                options={this.state.categories}
                                onChange={this.onChange}
                                onRespond={this.onRespond}
                                idForModal="issue"
                            />
                        </Card>
                    </Tab>
                </Tabs >
            </div >
        )
    }
}

export default connect(mapStateToProps, null)(IssueLogAdminPage);
