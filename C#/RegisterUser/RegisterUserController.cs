[RoutePrefix("api/organization/organizationRegistrationMembers")]
    public class OrgMemRegController : ApiController
    {
        private IOrgMemRegService _orgMemRegService;
        private IUserService _userService;
        private IEmailMessenger _emailMessenger;
        private IEmailTemplateService _emailTemplateService;
        private IAppLogService _appLogService;
        public OrgMemRegController(IOrgMemRegService orgMemRegService, IUserService userService, IEmailMessenger emailMessenger, IEmailTemplateService emailTemplateService, IAppLogService appLogService)
        {
            _orgMemRegService = orgMemRegService;
            _userService = userService;
            _emailMessenger = emailMessenger;
            _emailTemplateService = emailTemplateService;
            _appLogService = appLogService;
        }

        //get by user base id
        [Route("baseId"), HttpGet]
        [Route("baseId/{id:int}")]
        public IHttpActionResult GetByUserBaseId(int? id = null)
        {
            try
            {
                ItemsResponse<OrganizationUserGroup> response = new ItemsResponse<OrganizationUserGroup>
                {
                    Items = _orgMemRegService.ReadByUserBaseId(id.HasValue ? id.Value : _userService.GetCurrentUserId())
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route(), HttpPost]
        public IHttpActionResult Post(OrgMemRegAddRequest model)
        {
            string temppw = Membership.GeneratePassword(8, 1);
            temppw = Regex.Replace(temppw, @"[^a-zA-Z0-9]", m => "9");
            model.TemporaryPassword = temppw;
            model.UserBaseId = _userService.GetCurrentUserId(); //setting model.UserBaseId with the current LoggedinUserBase from this function
            System.Diagnostics.Debug.WriteLine(model);
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                ItemResponse<string> response = new ItemResponse<string>
                {
                    Item = _orgMemRegService.Insert(model)
                };

                if (response.Item != "") //if there is a GUID,execute this
                {
                    Email eml = new Email();

                    MessageAddress msgAdd = new MessageAddress
                    {
                        Email = model.Email,

                        Name = model.FirstName
                    };

                    List<MessageAddress> list = new List<MessageAddress>
                    {
                        msgAdd 
                    };

                    eml.To = list;
                    eml.FromAddress = "Eleveightc56@gmail.com";
                    eml.FromName = "Eleveight";
                    eml.Subject = "Confirm your account...";
                    eml.HtmlBody = _emailTemplateService.CreateConfirmEmail(new EmailTemplateInput
                    {
                        Name = msgAdd.Name,
                        Token = response.Item,
                        ExtraInfo = "Here is your temporary password: " + model.TemporaryPassword + "<br>Please login and change the password.</br>"
                    });

                    _emailMessenger.SendMail(eml);
                }

                return Ok(response);
            }
            catch (Exception ex)
            {
                int currentUser = _userService.GetCurrentUserId();
                _appLogService.Insert(new AppLogAddRequest
                {
                    AppLogTypeId = 1,
                    Message = ex.Message,
                    StackTrace = ex.StackTrace,
                    Title = "Error in " + GetType().Name + " " + System.Reflection.MethodBase.GetCurrentMethod().Name,
                    UserBaseId = currentUser
                });
                return BadRequest(ex.Message);
            }
        }

        //get by user base id for type name
        [Route("baseId/orgType"), HttpGet]
        public IHttpActionResult GetByUserBaseIdType(int? id = null)
        {
            try
            {
                ItemsResponse<OrganizationType> response = new ItemsResponse<OrganizationType>
                {
                    Items = _orgMemRegService.ReadTypeNameByUserBaseId(id.HasValue ? id.Value : _userService.GetCurrentUserId())
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }      
    }