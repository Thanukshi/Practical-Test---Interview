using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Entities
{
    public partial class Teacher
    {
        public Teacher()
        {
            AllocateSubjects = new HashSet<AllocateSubject>();
            AllocateClassrooms = new HashSet<AllocateClassroom>();
        }

        public int TeacherId { get; set; }
        public string FirstName { get; set; } 
        public string LastName { get; set; }
        public string ContactNo { get; set; } 
        public string Email { get; set; }

        public virtual ICollection<AllocateSubject> AllocateSubjects { get; set; }

        public virtual ICollection<AllocateClassroom> AllocateClassrooms { get; set; }
    }
}
