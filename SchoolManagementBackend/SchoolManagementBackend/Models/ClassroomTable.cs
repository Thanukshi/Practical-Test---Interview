using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Models
{
    public partial class ClassroomTable
    {
        public ClassroomTable()
        {
            AllocateClassroomTables = new HashSet<AllocateClassroomTable>();
            StudentTables = new HashSet<StudentTable>();
        }

        public string ClassroomId { get; set; } = null!;
        public string ClassroomName { get; set; } = null!;

        public virtual ICollection<AllocateClassroomTable> AllocateClassroomTables { get; set; }
        public virtual ICollection<StudentTable> StudentTables { get; set; }
    }
}
