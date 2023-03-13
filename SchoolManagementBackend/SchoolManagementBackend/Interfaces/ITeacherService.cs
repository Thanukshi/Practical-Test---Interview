using SchoolManagementBackend.Entities;
using SchoolManagementBackend.Models;

namespace SchoolManagementBackend.Interfaces
{
    public interface ITeacherService
    {
        Task<BaseResponse> AddTeacher(Teacher teacher);

        Task<BaseResponse> GetAllTeacherDetails();

        Task<BaseResponse> GetTeacherByID(int id);

        Task<BaseResponse> RemoveTeacher(int id);

        Task<BaseResponse> UpdateTeacher(Teacher teacher);
    }
}
