interface IOrgMemRegPage {
    registerObject: IOrgMemRegEntity
    gender: ITextValue[]
    isFormValid: boolean
    error: any
    LoggedInUserBaseId: number
    orgGroupDropDown: ITextValue[]
    UserAccountState: number
    orgId: number
}

class OrgMemRegPage extends React.Component<any, IOrgMemRegPage> {
    constructor(props) {
        super(props);
        this.state = {
            registerObject: {
                firstName: "",
                middleName: "",
                lastName: "",
                email: "",
                orgGroup: "",
                orgType: "",
                gender: "",
                phoneNumber: ""
            },
            LoggedInUserBaseId: 0,
            isFormValid: false,

            error: {
                firstName: "",
                lastName: "",
                email: "",
                orgGroup: "",
                orgType: "",
                gender: "",
                phoneNumber: ""
            },
            gender:
                [{ value: "", text: "Please select a gender" },
                { value: "Female", text: "Female" },
                { value: "Male", text: "Male" },
                { value: "Other", text: "Other" }],

            orgGroupDropDown: [{ value: "", text: "Please select a user group" }],
            UserAccountState: 0,
            orgId: props.match.params.id
        }
    }

    resetForm = () => {
        this.setState({
            ...this.state,
            registerObject: {
                firstName: "",
                middleName: "",
                lastName: "",
                email: "",
                orgGroup: "",
                orgType: "",
                gender: "",
                phoneNumber: ""
            },
            LoggedInUserBaseId: 0,
            isFormValid: false,
        })
    }

    componentDidMount() {
        if (this.state.orgId) {
            this.getOrgTypeByOrgId();
            this.getOrgGroupsByOrgId();
        } else {
            this.getOrganizationUserGroupGroupNameById();
            this.getOrganizationType();
        }
    }

    getOrgTypeByOrgId = () => {
        OrganizationMemApi.getOrgTypeByOrgId(this.state.orgId)
            .then(res => {
                this.setState({
                    registerObject: {
                        ...this.state.registerObject,
                        orgType: res.item.typeName
                    }
                })
            })
            .catch(err => console.log(err))
    }

    getOrgGroupsByOrgId = () => {
        OrganizationMemApi.getOrgGroupsByOrgId(this.state.orgId)
            .then(response => {
                let newOrgOptions = [{ value: "", text: "Please select a user group" }]
                response.items.map(items => {
                    newOrgOptions.push({ value: items.id, text: items.groupName })
                });
                this.setState({
                    ...this.state,
                    orgGroupDropDown: newOrgOptions,
                })
            })
            .catch(err => console.log(err))
    }

    getOrganizationUserGroupGroupNameById = () => {
        OrganizationMemApi.getOrganizationUserGroupGroupNameById()
            .then(response => {
                let newOrgOptions = [{ value: "", text: "Please select a user group" }]
                response.items.map(items => {
                    newOrgOptions.push({ value: items.id, text: items.groupName })
                });
                this.setState({
                    ...this.state,
                    orgGroupDropDown: newOrgOptions
                })
            })
            .catch(error => console.log(error))
    }

    getOrganizationType = () => {
        OrganizationMemApi.getOrganizationType()
            .then(response => {
                this.setState({
                    registerObject: {
                        ...this.state.registerObject,
                        orgType: response.items[0].typeName
                    }
                })
            })
            .catch(error => console.log(error))
    }

    onChange = (fieldName, fieldValue) => {
        let nextState = {
            ...this.state,

            registerObject: {
                ...this.state.registerObject,
                [fieldName]: fieldValue
            }
        }
        this.setState(nextState, () => {
            this.validateFields(this.state.registerObject, fieldName);
        });
    }

    validateFields = (form: any, fieldName: string) => {
        if (this.state.error[fieldName] !== undefined) {
            let tests: ITestCase[] = new Array<ITestCase>();
            for (let field in this.state.error) {
                let rules = {};
                switch (field) {
                    case "firstName":
                        rules = {
                            minLength: 2,
                            maxLength: 50
                        }
                        break;
                    case "lastName":
                        rules = {
                            minLength: 2,
                            macLength: 100
                        }
                        break;
                    case "email":
                        rules = {
                            validEmail: true
                        }
                        break;
                    case "orgGroupDropDown":
                        rules = {
                            validDropDown: true
                        }
                        break;
                    case "gender":
                        rules = {
                            validDropDown: true
                        }
                        break;
                    case "phoneNumber":
                        rules = {
                            isNumber: true,
                            minLength: 10,
                            maxLength: 10
                        }
                        break;
                    default:
                        break;
                }
                tests.push(formatTestCase(form[field], field, rules, new Array<string>()))
            }
            tests = validateFields(tests);

            let newErrMsgs = { ...this.state.error };
            let currentFieldTest = tests.find(test => test.field == fieldName);
            if (currentFieldTest.errMsg.length > 0 && currentFieldTest.value)
                newErrMsgs = { ...this.state.error, [fieldName]: currentFieldTest.errMsg[0] };
            else newErrMsgs = { ...this.state.error, [fieldName]: "" }
            this.setState({ ...this.state, isFormValid: tests.every(test => test.errMsg.length == 0), error: newErrMsgs }, () => console.log(this.state))
        }
    }

    postMember = () => {
        OrganizationMemApi.postMember(this.state.registerObject)
            .then(response => {
                if (response.item === "") {
                    alert("Oops, this email is already registered! Please include a new one.")
                    return;
                } else {
                    this.resetForm();
                    toastr.success(`Registered user successfully!`);
                }
            })
            .catch(error => {
                console.log(error);
                toastr.error(`There was an error!`);
            })

    }

    postOrgMember = () => {
        let object = { ...this.state.registerObject }
        delete object.orgGroup;
        delete object.orgType;
        OrganizationMemApi.postOrgMember(object)
            .then(response => {
                if (response.item === "") {
                    alert("Oops, this email is already registered! Please include a new one.")
                    return;
                } else {
                    this.resetForm();
                    toastr.success(`Registered user successfully!`);
                }
            })
            .catch(error => {
                console.log(error);
                toastr.error(`There was an error!`);
            })

    }

    onClick = () => {
        let orgId = this.state.orgId;
        let model = this.state.registerObject;
        if (orgId) {
            this.postMember();
        } else {
            this.postOrgMember();
        }
    }


    render() {
        return (
            <React.Fragment>
                <h2 className="card-header mb-4">Organization Member Registration</h2>
                <div>
                    <div className="card">
                        <div className="card-body">
                            <OrgMemRegForm
                                onChange={this.onChange}
                                registerObject={this.state.registerObject}
                                options={this.state.gender}
                                optionsOrgGroup={this.state.orgGroupDropDown}
                                onClick={this.onClick}
                                error={this.state.error}
                                disabled={!this.state.isFormValid}
                            />
                            <Button
                                label="Register"
                                className="btn btn-primary"
                                onClick={this.onClick}
                                disabled={!this.state.isFormValid}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default OrgMemRegPage;