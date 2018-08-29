export interface IOrgMemRegEntity {
    firstName: string
    middleName: string
    lastName: string
    email: string
    orgGroup: any;
    orgType: string
    phoneNumber: any
    gender: string
}

interface IOrgMemRegFormProps {
    onChange: (fieldName: string, value: string) => void;
    registerObject: IOrgMemRegEntity
    options: ITextValue[];
    onClick: () => void;
    error?: any,
    disabled?: Boolean
    optionsOrgGroup: ITextValue[]
}

export const OrgMemRegForm = (props: IOrgMemRegFormProps) => (
    <div>
        <form>
            <Input
                type="text"
                name="firstName"
                label="First Name"
                value={props.registerObject.firstName}
                onChange={props.onChange}
                error={props.error.firstName}
            />
            <Input
                type="text"
                name="middleName"
                label="Middle Name"
                value={props.registerObject.middleName}
                onChange={props.onChange}
            />

            <Input
                type="text"
                name="lastName"
                label="Last Name"
                value={props.registerObject.lastName}
                onChange={props.onChange}
                error={props.error.lastName}
            />
            <DropDownList
                name="gender"
                label="Gender"
                selectedValue={props.registerObject.gender}
                options={props.options}
                onChange={props.onChange}
            />
            <Input
                type="number"
                name="phoneNumber"
                label="Phone Number"
                value={props.registerObject.phoneNumber}
                onChange={props.onChange}
                error={props.error.phoneNumber}
            />
            <Input
                type="email"
                name="email"
                label="Email"
                value={props.registerObject.email}
                onChange={props.onChange}
                error={props.error.email}
            />

            <DropDownList
                name="orgGroup"
                label="User Group"
                selectedValue={props.registerObject.orgGroup}
                options={props.optionsOrgGroup}
                onChange={props.onChange}
            />

        </form>

    </div>

)