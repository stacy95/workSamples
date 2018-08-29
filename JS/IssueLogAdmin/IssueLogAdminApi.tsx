const getAllUsersSubmissionByResolved = (model) => {
    return apiExecute(`${baseUrlAdmin}/all/resolved`, "POST", model)
}

const getAllUsersSubmission = (model) => {
    return apiExecute(`${baseUrlAdmin}/all`, "POST", model)
}
const putIssueLog = (model) => {
    return apiExecute(`${baseUrlAdmin}/${model.id}`, "PUT", model)
}

const getByIssueLogId = (id) => {
    return apiExecute(`${baseUrlAdmin}/${id}`, "GET", null)
}