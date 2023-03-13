using SchoolManagementBackend.Entities;
using SchoolManagementBackend.Models;

namespace SchoolManagementBackend.Interfaces
{
    public interface ISubjectService
    {
        Task<BaseResponse> AddSubject(Subject subject);

        Task<BaseResponse> GetAllSubjectDetails();

        Task<BaseResponse> GetSubjectByID(int id);

        Task<BaseResponse> RemoveSubject(int id);

        Task<BaseResponse> UpdateSubject(Subject subject);
    }
}
