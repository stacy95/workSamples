--1st Stored Procedure
--This stored procedure is to allow the administrator to view all issues.
ALTER PROCEDURE [dbo].[IssueLog_SelectAll] 
	@Id INT,
	@PageNumber INT = 1,
	@StatusCode NVARCHAR(50) = 'Pending'
AS
BEGIN
SET NOCOUNT ON;

    --Pagination Start
	DECLARE @RecordCount INT = (SELECT DISTINCT COUNT(*) FROM 
	(SELECT DISTINCT IssueLog.Id FROM IssueLog WHERE IssueLog.StatusCode= @StatusCode ) AS tmp )
	
	DECLARE @PageCount INT = @RecordCount / 5 

	DECLARE @remainder INT = @RecordCount % 5
	IF (@remainder > 0) BEGIN
	SET @PageCount =  @PageCount + 1  
	END
    --Pagination End
	

	SELECT DISTINCT 
	ILog.Id,
	ILog.CreatedDate,
	ILog.IssueLogTypeId,
	ILog.IssueText,
	ILog.IssueTitle,
	ILog.ModifiedDate,
	ILog.StatusCode,
	ILog.SubmittedUserBaseId,
	UB.Id, UB.Email,  
	ILogType.Id,
	ILogType.LogTypeDesc,
	ILogType.LogTypeName, 
	UP.AvatarUrl, 
	UP.BgImageUrl,
	UP.Bio,
	UP.CreateDate,
	UP.FirstName,
	UP.Gender,
	UP.Id,
	UP.LastName,
	UP.MiddleName,
	UP.ModifiedDate,
	UP.UserBaseId,
	@PageCount AS PAGECOUNT,
    --To get and count the number of issues per response.
	(SELECT COUNT(NULLIF(IsRead,1)) FROM IssueLogResponse WHERE IssueLogResponse.IssueLogId = ILog.Id AND IssueLogResponse.CreatedByUserBaseId != @Id) AS IsReadTotalPerIssue
	FROM IssueLog AS ILog
	JOIN UserBase AS UB ON ILog.SubmittedUserBaseId = UB.Id
	JOIN IssueLogType AS ILogType ON ILog.IssueLogTypeId= ILogType.Id
	JOIN UserProfile AS UP ON UB.Id = UP.UserBaseId
	WHERE ILog.StatusCode = @StatusCode
	ORDER BY ILog.CreatedDate DESC
    --For Pagination
	OFFSET ((@PageNumber -1)*5) ROWS
	FETCH NEXT 5 ROWS ONLY

--2nd Stored Procedure
--This is to aide the count for IsRead on line 71
ALTER PROCEDURE [dbo].[IssueLogResponse_IsRead]
	@IssueLogId INT
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE IssueLogResponse SET IssueLogResponse.IsRead = 1
	WHERE IssueLogResponse.IssueLogId= @IssueLogId;
END