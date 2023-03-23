
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
//using Newtonsoft.Json;
using System.Text.Json;
using SchoolManagementBackend.Entities;
using SchoolManagementBackend.Interfaces;
using SchoolManagementBackend.Models;
using SchoolManagementBackend.ResponseHandler;

namespace SchoolManagementBackend.Services
{
    public class AllocateSubjectService : IAllocateSubjectService
    {
        private readonly MyDBContext _dbContext;
        public AllocateSubjectService(MyDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<BaseResponse> AddAllocateSubject(AllocateSubject allocateSubject)
        {
            try
            {
                var ASDetails = _dbContext.AllocateSubjects.Where(x => x.TeacherId == allocateSubject.TeacherId && x.SubjectId == allocateSubject.SubjectId).FirstOrDefault();
                if (ASDetails != null)
                {
                    return new BaseResponseService().GetErrorResponse("This subject is already allocated to this teacher.");
                }
                else
                {
                    _dbContext.AllocateSubjects.Add(allocateSubject);
                    await _dbContext.SaveChangesAsync();

                    return new BaseResponseService().GetSuccessResponse(allocateSubject, 201);
                }

            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }
        }

        public Task<BaseResponse> GetAllAllocateSubjectDetails()
        {
            try
            {
                var ASDetails = _dbContext.GetAllAllocateSubjectList.FromSqlRaw("Exec GetAllAllocateSubjectList").ToList();
                if (ASDetails == null)
                {
                    return Task.FromResult(new BaseResponseService().GetErrorResponse("Allocate Subject List Not Found"));
                }
                else
                {
                    return Task.FromResult(new BaseResponseService().GetSuccessResponse(ASDetails));
                }

            }
            catch (Exception ex)
            {
                return Task.FromResult(new BaseResponseService().GetErrorResponse(ex));
            }
        }


        public Task<BaseResponse> GetAllocateSubjectByID(int id)
        {
            try
            {
                var ASDetails = _dbContext.GetAllAllocateSubjectList.FromSqlRaw("Exec GetAllAllocateSubjectList").ToList();
                var newASDetails = ASDetails.Find(x => x.AllocateSubjectId == id);

                if (newASDetails == null)
                {
                    return Task.FromResult(new BaseResponseService().GetErrorResponse($"This {id} does not exist."));
                }
                else
                {
                    return Task.FromResult(new BaseResponseService().GetSuccessResponse(newASDetails));
                }

            }
            catch (Exception ex)
            {
                return Task.FromResult(new BaseResponseService().GetErrorResponse(ex));
            }
        }


        public async Task<BaseResponse> RemoveAllAlocateSubject(int id)
        {
            try
            {
                AllocateSubject allocateSubject = (AllocateSubject)_dbContext.AllocateSubjects.Where(x => x.AllocateSubjectId == id).First();

                if (allocateSubject is null)
                {
                    return new BaseResponseService().GetErrorResponse($"This {id} does not exist.");
                }
                else
                {
                    _dbContext.AllocateSubjects.Remove(allocateSubject);
                    await _dbContext.SaveChangesAsync();

                    var classess = _dbContext.Classrooms.ToList();

                    return new BaseResponseService().GetSuccessResponse(classess);
                }
            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }

        }

        public async Task<BaseResponse> UpdateAllocateSubject(AllocateSubject allocateSubject)
        {
            try
            {
                var subName = _dbContext.AllocateSubjects.Where(x => x.SubjectId == allocateSubject.SubjectId && x.TeacherId == x.TeacherId).FirstOrDefault();
                if (subName is null)
                {
                    _dbContext.AllocateSubjects.Update(allocateSubject);
                    await _dbContext.SaveChangesAsync();

                    return new BaseResponseService().GetSuccessResponse(allocateSubject);
                }
                else
                {
                    return new BaseResponseService().GetErrorResponse($"This subject allocation is already used.", 400);
                }


            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }
        }
    }
}