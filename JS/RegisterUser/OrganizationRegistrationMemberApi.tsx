const baseUrl = "/api/organization/organizationRegistrationMembers"

const getOrganizationUserGroupGroupNameById = () => {
    return apiExecute(`${baseUrl}/baseId`, "GET", null)
}

const postOrgMember = (model) => {
    return apiExecute(`${baseUrl}`, "POST", model)
}

const postMember = (model) => {
    return apiExecute(`${baseUrl}/org/`, "POST", model)
}
const getOrganizationType = () => {
    return apiExecute(`${baseUrl}/baseId/orgType`, "GET", null)
}
const sendEmail = (email) => {
    return apiExecute(`${baseUrl}`, "POST", email)
}

const getOrgTypeByOrgId = (id) => {
    return apiExecute(`/api/common/organizationtypes/orgid/${id}`, "GET", null)
}

const getOrgGroupsByOrgId = (id) => {
    return apiExecute(`/api/organization/OrganizationUserGroups/orgid/${id}`, "GET", null)
}

export const OrganizationMemApi = {
    getOrganizationUserGroupGroupNameById,
    postOrgMember,
    getOrganizationType,
    sendEmail,
    getOrgTypeByOrgId,
    getOrgGroupsByOrgId,
    postMember
}