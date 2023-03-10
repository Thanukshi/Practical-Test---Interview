using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Models
{
    public partial class SubjectTable
    {
        public SubjectTable()
        {
            AllocateSubjectsTables = new HashSet<AllocateSubjectsTable>();
        }

        public string SubjectId { get; set; } = null!;
        public string SubjectName { get; set; } = null!;

        public virtual ICollection<AllocateSubjectsTable> AllocateSubjectsTables { get; set; }
    }
}
