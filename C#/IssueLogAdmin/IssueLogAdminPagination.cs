   public class IssueLogForAdminPagination
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string StatusCode { get; set; }
        [Required]
        public int PageNumber { get; set; }
    }