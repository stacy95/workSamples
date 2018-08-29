  public class IssueLogForAdminUpdateRequest
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int IssueLogTypeId { get; set; }
        [Required]
        public string IssueTitle { get; set; }
        [Required]
        public string IssueText { get; set; }
        public string StatusCode { get; set; }
        [Required]
        public int SubmittedUserBaseId { get; set; }
    }