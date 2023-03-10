using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Models
{
    public partial class AllocateClassroomTable
    {
        public string AllocateClassroomId { get; set; } = null!;
        public string? ClassroomId { get; set; }
        public string? TeacherId { get; set; }

        public virtual ClassroomTable? Classroom { get; set; }
        public virtual TeacherTable? Teacher { get; set; }
    }
}
