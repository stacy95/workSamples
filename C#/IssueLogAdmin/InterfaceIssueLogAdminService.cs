   public interface IIssueLogForAdminService
    {
        List<IssueLogForAdminDomain> ReadAll(IssueLogForAdminPagination model);
        List<IssueLogForAdminDomain> ReadAllForResolved(IssueLogForAdminPagination model);
        void Update(IssueLogForAdminUpdateRequest model);
        List<IssueLogForAdminDomain> ReadById(int id);
    }