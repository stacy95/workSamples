--Redux Notification Implementation. Here I get the number of notifications based off of who is logged in.
ALTER PROCEDURE [dbo].[Notifications_SelectByUserBaseId]

@Id INT

AS
BEGIN
SET NOCOUNT ON;

    SELECT DISTINCT (SELECT  COUNT(NULLIF(IsRead,1)) FROM IssueLogResponse AS ILogRes
    JOIN IssueLog AS ILog ON ILog.SubmittedUserBaseId =@Id
    WHERE ILogRes.IssueLogId = ILog.Id
    AND ILogRes.CreatedByUserBaseId !=@Id) AS NotifForIssue,
    (SELECT COUNT(NULLIF(IsRead,1)) FROM IssueLogResponse
    JOIN IssueLog ON IssueLog.Id = IssueLogResponse.IssueLogId
    AND IssueLogResponse.CreatedByUserBaseId !=@Id) 
    AS NotifForIssueForAdmin
    FROM IssueLog
    WHERE IssueLog.SubmittedUserBaseId = @Id

END
