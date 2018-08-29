 public class OrgMemRegService : BaseService, IOrgMemRegService
    {
        private IUserService _userService;

        public OrgMemRegService(IUserService userService)
        {
            _userService = userService;
        }

        public List<OrganizationUserGroup> ReadByUserBaseId(int id)
        {
            List<OrganizationUserGroup> groups = new List<OrganizationUserGroup>();

            DataProvider.ExecuteCmd("dbo.OrganizationUserGroupUser_SelectByUserBaseId",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.AddWithValue("@LoggedInUserBaseId", id);
                }, singleRecordMapper:
                (IDataReader reader, short resultSet) =>
                {
                    groups.Add(DataMapper<OrganizationUserGroup>.Instance.MapToObject(reader));
                });
            return groups;
        }

        //Get by userbaseId Type Name
 public List<OrganizationType> ReadTypeNameByUserBaseId(int id)
        {
            List<OrganizationType> groups = new List<OrganizationType>();

            DataProvider.ExecuteCmd("dbo.OrganizationType_SelectByUserBaseId",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.AddWithValue("@LoggedInUserBaseId", id);
                }, singleRecordMapper:
                (IDataReader reader, short resultSet) =>
                {
                    groups.Add(DataMapper<OrganizationType>.Instance.MapToObject(reader));
                });
            return groups;
        }

        //registering a new user

        public string Insert(OrgMemRegAddRequest model)
        {
            string GUID = "";

            UserSaltPasswordHash saltHashObject = new UserSaltPasswordHash();
            saltHashObject = _userService.CreateSaltandHash(model.TemporaryPassword);
            model.Salt = saltHashObject.salt;
            model.PasswordHash = saltHashObject.passwordHash;
            DataProvider.ExecuteNonQuery("dbo.OrganizationRegisterMember",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@Email", model.Email, SqlDbType.NVarChar, 128));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@Salt", model.Salt, SqlDbType.NVarChar, 128));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@PasswordHash", model.PasswordHash, SqlDbType.NVarChar, 128));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@FirstName", model.FirstName, SqlDbType.NVarChar, 50));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@MiddleName", model.MiddleName, SqlDbType.NVarChar, 50));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@LastName", model.LastName, SqlDbType.NVarChar, 50));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@Gender", model.Gender, SqlDbType.NVarChar, 20));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@PhoneNumber", model.PhoneNumber, SqlDbType.NVarChar, 20));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@LoggedInUserBaseId", model.UserBaseId, SqlDbType.Int));

                    SqlParameter guidOut = new SqlParameter("@GUID", SqlDbType.NVarChar, 128);

                    guidOut.Direction = ParameterDirection.Output;
                    inputs.Add(guidOut);
                },
            returnParameters: (SqlParameterCollection inputs) =>
            {
                GUID = inputs["@GUID"].Value.ToString();
            });

            return GUID;
        }
  }