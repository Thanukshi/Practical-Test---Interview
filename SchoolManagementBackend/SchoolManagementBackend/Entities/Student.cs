using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Entities
{
    public partial class Student
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; } 
        public string LastName { get; set; } 
        public string ContactPersonName { get; set; } 
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string Dbo { get; set; } 
        public int Age { get; set; }
        public int ClassroomId { get; set; }

        public virtual Classroom? Classroom { get; set; }
    }
}
