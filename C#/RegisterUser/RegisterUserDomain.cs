   public class OrgMemRegDomain
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Salt { get; set; }
        public string PasswordHash { get; set; }
        public string OrgGroup { get; set; }
        public string OrgType { get; set; }
        public string Gender { get; set; }
        public int PhoneNumber { get; set; }
        public int LoggedInUserBaseId { get; set; }
        public string TemporaryPassword { get; set; }
        public int OrganizationId { get; set; }
    }