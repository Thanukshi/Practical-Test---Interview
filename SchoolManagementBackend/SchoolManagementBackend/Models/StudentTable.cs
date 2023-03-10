using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Models
{
    public partial class StudentTable
    {
        public string StudentId { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string ContactPersonName { get; set; } = null!;
        public string ContactNo { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime Dbo { get; set; }
        public int Age { get; set; }
        public string? ClassroomId { get; set; }

        public virtual ClassroomTable? Classroom { get; set; }
    }
}
