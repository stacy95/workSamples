 [RoutePrefix("api/utilities/issueForAdmins")]
    public class IssueLogForAdminController : ApiController
    {
        private IIssueLogForAdminService _issueLogForAdminService;
        private IAppLogService _appLogService;
        IUserService _userService;
        IEmailTemplateService _emailTemplateService;
        IEmailMessenger _emailMessenger;
        public IssueLogForAdminController(IIssueLogForAdminService issueLogForAdminService, IAppLogService appLogService, IUserService userService, IEmailMessenger emailMessenger, IEmailTemplateService emailTemplateService)
        {
            _issueLogForAdminService = issueLogForAdminService;
            _appLogService = appLogService;
            _userService = userService;
            _emailMessenger = emailMessenger;
            _emailTemplateService = emailTemplateService;
        }

        [Route("all/resolved"), HttpPost]
        public IHttpActionResult ReadAllForResolved(IssueLogForAdminPagination model)
        {
            try
            {
                model.Id = _userService.GetCurrentUserId();

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                ItemsResponse<IssueLogForAdminDomain> response = new ItemsResponse<IssueLogForAdminDomain>
                {
                    Items = _issueLogForAdminService.ReadAllForResolved(model)
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                _appLogService.Insert(new AppLogAddRequest
                {
                    AppLogTypeId = 1,
                    Message = ex.Message,
                    StackTrace = ex.StackTrace,
                    Title = "Error in " + GetType().Name + " " + System.Reflection.MethodBase.GetCurrentMethod().Name,

                });
                return BadRequest(ex.Message);
            }
        }

        [Route("all"), HttpPost]
        public IHttpActionResult GetAllIssues(IssueLogForAdminPagination model)
        {
            try
            {
                model.Id = _userService.GetCurrentUserId();

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                ItemsResponse<IssueLogForAdminDomain> response = new ItemsResponse<IssueLogForAdminDomain>
                {
                    Items = _issueLogForAdminService.ReadAll(model)
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                _appLogService.Insert(new AppLogAddRequest
                {
                    AppLogTypeId = 1,
                    Message = ex.Message,
                    StackTrace = ex.StackTrace,
                    Title = "Error in " + GetType().Name + " " + System.Reflection.MethodBase.GetCurrentMethod().Name,
                });
                return BadRequest(ex.Message);
            }
        }

        [Route("{id:int}"), HttpPut]
        public IHttpActionResult Put(IssueLogForAdminUpdateRequest model)
        {
            try
            {
                _issueLogForAdminService.Update(model);
                return Ok(new SuccessResponse());
            }
            catch (Exception ex)
            {
                _appLogService.Insert(new AppLogAddRequest
                {
                    AppLogTypeId = 1,
                    Message = ex.Message,
                    StackTrace = ex.StackTrace,
                    Title = "Error in " + GetType().Name + " " + System.Reflection.MethodBase.GetCurrentMethod().Name,
                });
                return BadRequest(ex.Message);
            }
        }

        [Route("{id:int}"), HttpGet]
        public IHttpActionResult GetById(int id)
        {
            try
            {
                ItemsResponse<IssueLogForAdminDomain> response = new ItemsResponse<IssueLogForAdminDomain>
                {
                    Items = _issueLogForAdminService.ReadById(id)
                };
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
    }
}