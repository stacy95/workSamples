 public class IssueLogForAdminDomain
    {
        public int Id { get; set; }
        public int IssueLogTypeId { get; set; }
        public string IssueText { get; set; }
        public string StatusCode { get; set; }
        public DateTime CreatedDate { get; set; }
        public int SubmittedUserBaseId { get; set; }
        public string Email { get; set; }
        public string LogTypeName { get; set; }
        public string LogTypeDesc { get; set; }
        public string IssueTitle { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int IsReadTotalPerIssue { get; set; }
        public int PageCount { get; set; }
    }