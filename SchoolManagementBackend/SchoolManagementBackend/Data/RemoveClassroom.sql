USE SchoolManagementDB
GO
/****** Object:  StoredProcedure [dbo].[GetAllEmployees]    Script Date: 3/15/2023 6:04:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE RemoveClassrooms 
    -- Add the parameters for the stored procedure here

AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON;

	DECLARE @id int; 

    -- Insert statements for procedure here
	UPDATE Student
	SET ClassroomID = 0
	WHERE ClassroomID = @id

	UPDATE AllocateClassroom
	SET ClassroomID = 0
	WHERE ClassroomID = @id

	DELETE 
	FROM Classroom
	WHERE ClassroomID = @id 

END