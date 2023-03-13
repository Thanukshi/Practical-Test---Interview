using SchoolManagementBackend.Entities;
using SchoolManagementBackend.Models;

namespace SchoolManagementBackend.Interfaces
{
    public interface IStudentsService
    {
        Task<BaseResponse> AddStudent(Student student);

        Task<BaseResponse> GetAllStudentsDetails();

        Task<BaseResponse> GetStudentByID(int id);

        Task<BaseResponse> RemoveStudent(int id);

        Task<BaseResponse> UpdateStudent(Student student);
    }
}
