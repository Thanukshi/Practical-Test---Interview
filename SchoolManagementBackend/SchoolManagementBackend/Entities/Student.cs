using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Entities
{
    public partial class Student
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string ContactPersonName { get; set; } = null!;
        public string ContactNo { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Dbo { get; set; } = null!;
        public int Age { get; set; }
        public int ClassroomId { get; set; }

        public virtual Classroom Classroom { get; set; } = null!;
    }
}
