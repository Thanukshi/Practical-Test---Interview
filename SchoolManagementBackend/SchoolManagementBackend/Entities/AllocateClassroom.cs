using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Entities
{
    public partial class AllocateClassroom
    {
        public int AllocateClassroomID { get; set; }
        
        public int? TeacherId { get; set; }

        public int? ClassroomID { get; set; }

        public virtual Classroom? Classroom { get; set; }
        public virtual Teacher? Teacher { get; set; }
    }
}
