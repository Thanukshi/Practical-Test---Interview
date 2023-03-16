USE SchoolManagementDB
GO
/****** Object:  StoredProcedure [dbo].[GetAllEmployees]    Script Date: 3/15/2023 6:04:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE GetAllStudentList
    -- Add the parameters for the stored procedure here

AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON;

 

    -- Insert statements for procedure here
    SELECT S.*, C.ClassroomName
	FROM Student as S
	INNER JOIN  Classroom as C ON C.ClassroomID = S.ClassroomID 
END