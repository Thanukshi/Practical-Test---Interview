CREATE TABLE ClassroomTable (
    ClassroomID varchar(10) NOT NULL,
    ClassroomName varchar(50) NOT NULL,
    PRIMARY KEY (ClassroomID)
);

CREATE TABLE StudentTable (
	StudentID varchar(10) NOT NULL,
    FirstName varchar(50) NOT NULL,
    LastName varchar(50) NOT NULL,
    ContactPersonName varchar(100) NOT NULL,
    ContactNo varchar(10) NOT NULL,
	Email varchar(100) NOT NULL,
	DBO Date NOT NULL,
	Age int NOT NULL,

    PRIMARY KEY (StudentID),
	ClassroomID varchar(10) FOREIGN KEY REFERENCES ClassroomTable(ClassroomID)	
)

CREATE TABLE TeacherTable (
	TeacherID varchar(10) NOT NULL,
    FirstName varchar(50) NOT NULL,
    LastName varchar(50) NOT NULL,
    ContactNo varchar(10) NOT NULL,
	Email varchar(100) NOT NULL,

    PRIMARY KEY (TeacherID)
)

CREATE TABLE SubjectTable (
    SubjectID varchar(10) NOT NULL,
    SubjectName varchar(50) NOT NULL,
    PRIMARY KEY (SubjectID)
);

CREATE TABLE AllocateSubjectsTable (
    AllocateSubjectID varchar(10) NOT NULL,	
    PRIMARY KEY (AllocateSubjectID),	
	SubjectID varchar(10) FOREIGN KEY REFERENCES SubjectTable(SubjectID),	
	TeacherID varchar(10) FOREIGN KEY REFERENCES TeacherTable(TeacherID)
);

CREATE TABLE AllocateClassroomTable (
    AllocateClassroomID varchar(10) NOT NULL,	
    PRIMARY KEY (AllocateClassroomID),	
	ClassroomID varchar(10) FOREIGN KEY REFERENCES ClassroomTable(ClassroomID),	
	TeacherID varchar(10) FOREIGN KEY REFERENCES TeacherTable(TeacherID)
);
