using SchoolManagementBackend.Entities;
using SchoolManagementBackend.Models;

namespace SchoolManagementBackend.Interfaces
{
    public interface IClassroomService
    {
        Task<BaseResponse> AddClassroom(Classroom classroom);

        Task<BaseResponse> GetAllClassDetails();

        Task<BaseResponse> GetClassroomByID(int id);

        Task<BaseResponse> RemoveClass(int id);

        Task<BaseResponse> UpdateClassroom(Classroom classroom);
    }
}
