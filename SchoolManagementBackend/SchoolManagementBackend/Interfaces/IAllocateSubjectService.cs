using SchoolManagementBackend.Entities;
using SchoolManagementBackend.Models;

namespace SchoolManagementBackend.Interfaces
{
    public interface IAllocateSubjectService
    {
        Task<BaseResponse> AddAllocateSubject(AllocateSubject allocateSubject);

        Task<BaseResponse> GetAllAllocateSubjectDetails();

        //    Task<BaseResponse> GetAllocateSubjectByID(int id);

        //    Task<BaseResponse> RemoveAllocateSubject(int id);

        //    Task<BaseResponse> UpdateAllocateSubject(AllocateSubject allocateSubject);
        //}
    }
}
