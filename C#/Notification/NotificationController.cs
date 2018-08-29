[RoutePrefix("api/notifications")]
    public class NotificationController : ApiController
    {
        private INotificationService _notificationService;
        private IAppLogService _appLogService;
        private IUserService _service;
        public NotificationController(INotificationService notificationService, IUserService service, IAppLogService appLogService)
        {
            _notificationService = notificationService;
            _appLogService = appLogService;
            _service = service;
        }

        [Route("{id:int}"), HttpGet]
        public IHttpActionResult ReadById(int id)
        {
            try
            {
                id = _service.GetCurrentUserId();
                ItemResponse<NotificationDomain> response = new ItemResponse<NotificationDomain>
                {
                    Item = _notificationService.ReadById(id)
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                int currentUser = _service.GetCurrentUserId();
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