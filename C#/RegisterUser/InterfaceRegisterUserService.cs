 public interface IOrgMemRegService
    {
        string Insert(OrgMemRegAddRequest model); //post

        List<OrganizationUserGroup> ReadByUserBaseId(int id);

        List<OrganizationType> ReadTypeNameByUserBaseId(int id);
        string InsertByOrg(OrgMemRegAddRequest model);
    }