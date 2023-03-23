using Microsoft.EntityFrameworkCore;
using SchoolManagementBackend.Entities;
using SchoolManagementBackend.Interfaces;
using SchoolManagementBackend.Models;
using SchoolManagementBackend.ResponseHandler;

namespace SchoolManagementBackend.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly MyDBContext _dbContext;
        public SubjectService(MyDBContext myDBContext)
        {
            _dbContext = myDBContext;
        }
        public async Task<BaseResponse> AddSubject(Subject subject)
        {
            try
            {
                var SubDetails = _dbContext.Subjects.Where(x => x.SubjectName == subject.SubjectName).FirstOrDefault();
                if (SubDetails != null)
                {
                    return new BaseResponseService().GetErrorResponse($"This {subject.SubjectName} is already used.");
                }
                else
                {
                    _dbContext.Subjects.Add(subject);
                    await _dbContext.SaveChangesAsync();

                    return new BaseResponseService().GetSuccessResponse(subject, 201);
                }

            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }
        }

        public Task<BaseResponse> GetAllSubjectDetails()
        {
            try
            {
                var SubDetails = _dbContext.Subjects.ToList();
                if (SubDetails is null)
                {
                    return Task.FromResult(new BaseResponseService().GetErrorResponse("Subject list not found"));
                }
                else
                {
                    return Task.FromResult(new BaseResponseService().GetSuccessResponse(SubDetails));
                }

            }
            catch (Exception ex)
            {
                return Task.FromResult(new BaseResponseService().GetErrorResponse(ex));
            }
        }

        public Task<BaseResponse> GetSubjectByID(int id)
        {
            try
            {
                var SubDetails = _dbContext.Subjects.Where(x => x.SubjectId == id).FirstOrDefault();
                if (SubDetails is null)
                {
                    return Task.FromResult(new BaseResponseService().GetErrorResponse($"This {id} does not exist."));
                }
                else
                {
                    return Task.FromResult(new BaseResponseService().GetSuccessResponse(SubDetails));
                }

            }
            catch (Exception ex)
            {
                return Task.FromResult(new BaseResponseService().GetErrorResponse(ex));
            }
        }

        public Task<BaseResponse> RemoveSubject(int id)
        {
            try
            {
                Subject subjects = (Subject)_dbContext.Subjects.Where(x => x.SubjectId == id).First();

                var subDetails = _dbContext.RemoveSubjectList.FromSqlRaw($"Exec RemoveSubjectList @id = {id}").ToList();

                if (subjects is null)
                {
                    return Task.FromResult(new BaseResponseService().GetErrorResponse($"This {id} does not exist."));
                }
                else
                {

                    var SubjectList = _dbContext.Subjects.ToList();

                    return Task.FromResult(new BaseResponseService().GetSuccessResponse(SubjectList));
                }
            }
            catch (Exception ex)
            {
                return Task.FromResult(new BaseResponseService().GetErrorResponse(ex));
            }
        }

        public async Task<BaseResponse> UpdateSubject(Subject subject)
        {
            try
            {
                var SubDetails = _dbContext.Subjects.Where(x => x.SubjectName == subject.SubjectName).FirstOrDefault();

                if (SubDetails is null)
                {
                    _dbContext.Subjects.Update(subject);
                    await _dbContext.SaveChangesAsync();

                    return new BaseResponseService().GetSuccessResponse(subject);

                }
                else
                {
                    return new BaseResponseService().GetErrorResponse($"This {subject.SubjectName} is already used.", 400);
                }

            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }
        }

    }
}
