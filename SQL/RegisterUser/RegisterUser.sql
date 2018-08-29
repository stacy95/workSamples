--To register a new organization member
CREATE PROCEDURE [dbo].[OrganizationRegisterMember] 
--BEGINNING OF PARAMETERS 

--User Base Table
	@Email NVARCHAR(128),
	@Salt NVARCHAR(128) ,
	@PasswordHash NVARCHAR(128),
	@UsingTempPassword BIT = 1,

-- User Profile Table
	@FirstName NVARCHAR(50),
	@MiddleName NVARCHAR(50) = NULL,
	@LastName NVARCHAR(100),
	@Gender NVARCHAR(20),

--UserContactPhone Table
	@PhoneNumber NVARCHAR(20),

--Current Logged In User Parameter
	@LoggedInUserBaseId INT,

--GUID
	@GUID nvarchar(150) OUTPUT

--END OF PARAMETERS

AS 
BEGIN 

/*

USE [C56_Eleveight]
GO

DECLARE	@return_value int,
		@GUID nvarchar(150)

EXEC	@return_value = [dbo].[OrganizationRegisterMember]
		@Email = N'Hihi@gmail.com',
		@Salt = N'password123',
		@PasswordHash = N'password123',
		@FirstName = N'Random',
		@MiddleName = N'K',
		@LastName = N'Halksdfj',
		@Gender = N'Female',
		@PhoneNumber = N'1231231234',
		@LoggedInUserBaseId = 53,
		@GUID = @GUID OUTPUT

SELECT	@GUID as N'@GUID'

SELECT	'Return Value' = @return_value

GO

*/

SET NOCOUNT ON; 

DECLARE @NewUserBaseId INT 
DECLARE @CurrentOrganizationUserGroupId INT 
DECLARE @CurrentOrganizationId INT
DECLARE @OrganizationUserGroupUserId INT

IF EXISTS (SELECT Ub.CreatedDate,
Ub.Email,
Ub.Id,
Ub.IsAccountLocked,
Ub.IsEmailConfirmed,
Ub.LoginAttempts,
Ub.PasswordHash,
Ub.Salt,
Ub.UsingTempPassword
FROM UserBase AS Ub 
WHERE Ub.email = @Email)

BEGIN
RETURN 
END

 EXEC dbo.UserBase_InsertOrgMem
 @Id = @NewUserBaseId OUTPUT,
 @Email = @Email,
 @PasswordHash= @PasswordHash, 
 @Salt = @Salt,
 @UsingTempPassword= 1

 EXEC dbo.UserProfile_Insert
 @Id = 1,
 @UserBaseId = @NewUserBaseId,
 @FirstName= @FirstName,
 @MiddleName= @MiddleName,
 @LastName= @LastName,
 @Gender = @Gender,
 @AvatarUrl = NULL,
 @BgImageUrl = NULL,
 @Bio = NULL

 EXEC dbo.UserContactPhone_Insert 
 @UserbaseId = @NewUserBaseId,
 @PhoneNumber = @PhoneNumber,
 @PhoneTypeId = 1,
 @CreatedById = @NewUserBaseId,
 @ModifiedById = @NewUserBaseId,
 @Id= 1

--this is retrieving the currented logged in user's organization id
SELECT @CurrentOrganizationId = OUG.OrganizationId
FROM OrganizationUserGroup AS OUG
JOIN OrganizationUserGroupUser AS OUGU
ON OUG.Id = OUGU.OrganizationUserGroupId
WHERE OUGU.UserBaseId=@LoggedInUserBaseId

--setting Current Org User Group Id 
SELECT @CurrentOrganizationUserGroupId = OrganizationUserGroup.Id  
FROM OrganizationUserGroup 
WHERE OrganizationUserGroup.OrganizationId= @CurrentOrganizationId

--insert a new user in that org base off of new user base id
 EXEC dbo.OrganizationUserGroupUser_Insert
 @Id= @OrganizationUserGroupUserId OUTPUT,
 @OrganizationUserGroupId = @CurrentOrganizationUserGroupId,
 @UserBaseId = @NewUserBaseId  

SET @GUID = NEWID()
EXEC dbo.AppToken_Insert
		@UserBaseID = @NewUserBaseId,
		@Token = @GUID,
		@AppTokenTypeId = 1
        
END 
