using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Entities
{
    public partial class Subject
    {
        public Subject()
        {
            AllocateSubjects = new HashSet<AllocateSubject>();
        }

        public int SubjectId { get; set; }
        public string SubjectName { get; set; } = null!;
        public DateTime DateCreated { get; set; }

        public virtual ICollection<AllocateSubject> AllocateSubjects { get; set; }
    }
}
