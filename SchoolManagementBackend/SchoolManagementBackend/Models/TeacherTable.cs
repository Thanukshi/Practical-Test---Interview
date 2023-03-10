using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Models
{
    public partial class TeacherTable
    {
        public TeacherTable()
        {
            AllocateClassroomTables = new HashSet<AllocateClassroomTable>();
            AllocateSubjectsTables = new HashSet<AllocateSubjectsTable>();
        }

        public string TeacherId { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string ContactNo { get; set; } = null!;
        public string Email { get; set; } = null!;

        public virtual ICollection<AllocateClassroomTable> AllocateClassroomTables { get; set; }
        public virtual ICollection<AllocateSubjectsTable> AllocateSubjectsTables { get; set; }
    }
}
