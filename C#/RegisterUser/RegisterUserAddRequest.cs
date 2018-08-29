 public class OrgMemRegAddRequest
    {
        public string Salt { get; set; }
        public string PasswordHash { get; set; }

        [Required]
        public string FirstName { get; set; }

        //not required
        public string MiddleName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public int UserBaseId { get; set; }

        public string TemporaryPassword { get; set; }

        public string OrgGroup { get; set; }

    }