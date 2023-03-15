namespace SchoolManagementBackend.Entities
{
    public class AllocateClassroomList
    {
        public int AllocateClassroomID { get; set; }
        public int ClassroomID { get; set; }
        public string ClassroomName { get; set; }
        public int TeacherID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
