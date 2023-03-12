using System;
using System.Collections.Generic;

namespace SchoolManagementBackend.Entities
{
    public partial class AllocateSubject
    {
        public int AllocateSubjectId { get; set; }
        public int? SubjectId { get; set; }
        public int? TeacherId { get; set; }
        public DateTime DateCreated { get; set; }

        public virtual Subject? Subject { get; set; }
        public virtual Teacher? Teacher { get; set; }
    }
}
