using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Entities
{
    public partial class Classroom
    {
        public Classroom()
        {
            Students = new HashSet<Student>();
        }

        public int ClassroomId { get; set; }
        public string ClassroomName { get; set; } = null!;
        public DateTime DateCreated { get; set; }

        public virtual ICollection<Student> Students { get; set; }

        public virtual ICollection<AllocateClassroom> AllocateClassrooms { get; set; }
    }
}
