using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Entities
{
    public partial class Teacher
    {
        public Teacher()
        {
            AllocateSubjects = new HashSet<AllocateSubject>();
        }

        public int TeacherId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string ContactNo { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime DateCreated { get; set; }

        public virtual ICollection<AllocateSubject> AllocateSubjects { get; set; }

        public virtual ICollection<AllocateClassroom> AllocateClassrooms { get; set; }
    }
}
