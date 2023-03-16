USE SchoolManagementDB
GO
/****** Object:  StoredProcedure [dbo].[GetAllEmployees]    Script Date: 3/15/2023 6:04:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE GetAllAllocateClassroomList 
    -- Add the parameters for the stored procedure here

AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON;

 

    -- Insert statements for procedure here
    SELECT AL.AllocateClassroomID, C.ClassroomID, C.ClassroomName, T.TeacherID, T.FirstName, T.LastName
	FROM AllocateClassroom as AL
	INNER JOIN  Classroom as C ON AL.ClassroomID = C.ClassroomID 
	INNER JOIN Teacher as T ON AL.TeacherID = T.TeacherID
END