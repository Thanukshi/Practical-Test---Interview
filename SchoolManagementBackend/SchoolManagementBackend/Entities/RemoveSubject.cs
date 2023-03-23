using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Entities
{
    public partial class RemoveSubject
    {
        public int RemoveID { get; set; }
        public int? TeacherId { get; set; }
        public int? ClassroomId { get; set; }

        public virtual Classroom? Classroom { get; set; }
        public virtual Teacher? Teacher { get; set; }
    }
}
