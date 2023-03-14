using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Entities
{
    public partial class Classroom
    {
        public Classroom()
        {
            Students = new HashSet<Student>();
            AllocateClassrooms = new HashSet<AllocateClassroom>();
        }

        public int ClassroomId { get; set; }
        public string ClassroomName { get; set; }

        public virtual ICollection<Student> Students { get; set; }

        public virtual ICollection<AllocateClassroom> AllocateClassrooms { get; set; }
    }
}
