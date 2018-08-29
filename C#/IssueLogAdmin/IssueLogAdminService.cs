public class IssueLogForAdminService : BaseService, IIssueLogForAdminService
    {
        public List<IssueLogForAdminDomain> ReadAll(IssueLogForAdminPagination model)
        {
            List<IssueLogForAdminDomain> response = new List<IssueLogForAdminDomain>();
            DataProvider.ExecuteCmd("dbo.IssueLog_SelectAll",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@Id", model.Id, SqlDbType.Int));

                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@StatusCode", "Pending", SqlDbType.NVarChar, 50));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@PageNumber", model.PageNumber, SqlDbType.Int));
                }
            ,
                singleRecordMapper: (IDataReader reader, short resultSet) =>
                {
                    response.Add(DataMapper<IssueLogForAdminDomain>.Instance.MapToObject(reader));
                });
            return response;
        }

        public List<IssueLogForAdminDomain> ReadAllForResolved(IssueLogForAdminPagination model)
        {
            List<IssueLogForAdminDomain> response = new List<IssueLogForAdminDomain>();
            DataProvider.ExecuteCmd("dbo.IssueLog_SelectAllByResolved",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@Id", model.Id, SqlDbType.Int));

                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@StatusCode", "Resolved", SqlDbType.NVarChar, 50));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@PageNumber", model.PageNumber, SqlDbType.Int));
                }
            ,
                singleRecordMapper: (IDataReader reader, short resultSet) =>
                {
                    response.Add(DataMapper<IssueLogForAdminDomain>.Instance.MapToObject(reader));
                });
            return response;
        }

        public void Update(IssueLogForAdminUpdateRequest model)
        {
            DataProvider.ExecuteNonQuery("dbo.IssueLogForUsers_Update",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@Id", model.Id, SqlDbType.Int));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@IssueLogTypeId", model.IssueLogTypeId, SqlDbType.Int));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@IssueTitle", model.IssueTitle, SqlDbType.NVarChar, 100));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@IssueText", model.IssueText, SqlDbType.NVarChar, 4000));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@StatusCode", model.StatusCode, SqlDbType.NVarChar, 50));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@SubmittedUserBaseId", model.SubmittedUserBaseId, SqlDbType.Int));
                });
        }

        public List<IssueLogForAdminDomain> ReadById(int id)
        {
            List<IssueLogForAdminDomain> group = new List<IssueLogForAdminDomain>();
            DataProvider.ExecuteCmd("dbo.IssueLog_SelectById",
               inputParamMapper: (SqlParameterCollection inputs) =>
               {
                   inputs.AddWithValue("@IssueLogId", id);
               }, singleRecordMapper:
               (IDataReader reader, short resultSet) =>
               {
                   group.Add(DataMapper<IssueLogForAdminDomain>.Instance.MapToObject(reader));
               });
            return group;
      }
    }