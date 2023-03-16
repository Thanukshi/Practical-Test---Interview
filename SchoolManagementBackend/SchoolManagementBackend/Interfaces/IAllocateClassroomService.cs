using SchoolManagementBackend.Entities;
using SchoolManagementBackend.Models;

namespace SchoolManagementBackend.Interfaces
{
    public interface IAllocateClassroomService
    {
        Task<BaseResponse> AddAllocateClassroom(AllocateClassroom allocateClassroom);

        Task<BaseResponse> GetAllAllocateClassroomDetails();

        //Task<BaseResponse> GetAllocateSubjectByID(int id);

        Task<BaseResponse> RemoveAllAlocateClassroom(int id);

        Task<BaseResponse> UpdateAllocateClassroom(AllocateClassroom allocateClassroom);
        //}
    }
}
