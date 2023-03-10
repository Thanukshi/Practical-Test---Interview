using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Models
{
    public partial class AllocateSubjectsTable
    {
        public string AllocateSubjectId { get; set; } = null!;
        public string? SubjectId { get; set; }
        public string? TeacherId { get; set; }

        public virtual SubjectTable? Subject { get; set; }
        public virtual TeacherTable? Teacher { get; set; }
    }
}
