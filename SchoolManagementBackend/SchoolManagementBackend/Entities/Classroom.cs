using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Entities
{
    public partial class Classroom
    {
        public Classroom()
        {
            AllocateClassrooms = new HashSet<AllocateClassroom>();
            Students = new HashSet<Student>();
        }

        public int ClassroomId { get; set; }
        public string ClassroomName { get; set; } = null!;

        public virtual ICollection<AllocateClassroom> AllocateClassrooms { get; set; }
        public virtual ICollection<Student> Students { get; set; }
    }
}
