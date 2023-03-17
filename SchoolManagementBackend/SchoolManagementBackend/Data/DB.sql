CREATE TABLE Classroom (
    ClassroomID int NOT NULL Identity(1,1),
    ClassroomName varchar(50) NOT NULL,
    PRIMARY KEY (ClassroomID)
);

CREATE TABLE Student (
	StudentID int NOT NULL Identity(1,1),
    FirstName varchar(50) NOT NULL,
    LastName varchar(50) NOT NULL,
    ContactPersonName varchar(100) NOT NULL,
    ContactNo varchar(10) NOT NULL,
	Email varchar(100) NOT NULL,
	DBO varchar(20) NOT NULL,
	Age int NOT NULL,

    PRIMARY KEY (StudentID),
	ClassroomID int FOREIGN KEY REFERENCES Classroom(ClassroomID)
)

CREATE TABLE Teacher (
	TeacherID int NOT NULL Identity(1,1),
    FirstName varchar(50) NOT NULL,
    LastName varchar(50) NOT NULL,
    ContactNo varchar(10) NOT NULL,
	Email varchar(100) NOT NULL,

    PRIMARY KEY (TeacherID)
)

CREATE TABLE Subjects (
    SubjectID int NOT NULL Identity(1,1),
    SubjectName varchar(50) NOT NULL,

    PRIMARY KEY (SubjectID)
);

CREATE TABLE AllocateSubjects (
    AllocateSubjectID int NOT NULL Identity(1,1),

    PRIMARY KEY (AllocateSubjectID),	
	SubjectID int FOREIGN KEY REFERENCES Subjects(SubjectID),	
	TeacherID int FOREIGN KEY REFERENCES Teacher(TeacherID)
);

CREATE TABLE AllocateClassroom (
    AllocateClassroomID int NOT NULL Identity(1,1),

    PRIMARY KEY (AllocateClassroomID),	
	TeacherID int FOREIGN KEY REFERENCES Teacher(TeacherID),
	ClassroomID int FOREIGN KEY REFERENCES Classroom(ClassroomID)
);
 