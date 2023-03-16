
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
    public class AllocateClassroomService : IAllocateClassroomService
    {
        private readonly MyDBContext _dbContext;
        public AllocateClassroomService(MyDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<BaseResponse> AddAllocateClassroom(AllocateClassroom allocateClassroom)
        {
            try
            {
                var ASDetails = _dbContext.AllocateClassrooms.Where(x => x.TeacherId == allocateClassroom.TeacherId && x.ClassroomId == allocateClassroom.ClassroomId).FirstOrDefault();
                if (ASDetails != null)
                {
                    return new BaseResponseService().GetErrorResponse("This classroom is already allocated to this teacher.");
                }
                else
                {
                    _dbContext.AllocateClassrooms.Add(allocateClassroom);
                    await _dbContext.SaveChangesAsync();

                    return new BaseResponseService().GetSuccessResponse(allocateClassroom, 201);
                }

            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }
        }

        public Task<BaseResponse> GetAllAllocateClassroomDetails()
        {
            try
            {
                var ASDetails = _dbContext.GetAllAllocateClassroomList.FromSqlRaw("Exec GetAllAllocateClassroomList").ToList();
                if (ASDetails is null)
                {
                    return Task.FromResult(new BaseResponseService().GetErrorResponse("Allocate Classroom List Not Found"));
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


        public Task<BaseResponse> GetAllocateClassroomByID(int id)
        {
            try
            {
                var ASDetails = _dbContext.GetAllAllocateClassroomList.FromSqlRaw("Exec GetAllAllocateClassroomList").ToList();
                var newASDetails = ASDetails.Find(x => x.AllocateClassroomID == id);
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


        public async Task<BaseResponse> RemoveAllAlocateClassroom(int id)
        {
            try
            {
                AllocateClassroom allocateClassroom = (AllocateClassroom)_dbContext.AllocateClassrooms.Where(x => x.AllocateClassroomId == id).First();

                if (allocateClassroom is null)
                {
                    return new BaseResponseService().GetErrorResponse($"This {id} does not exist.");
                }
                else
                {
                    _dbContext.AllocateClassrooms.Remove(allocateClassroom);
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

        public async Task<BaseResponse> UpdateAllocateClassroom(AllocateClassroom allocateClassroom)
        {
            try
            {
                var className = _dbContext.AllocateClassrooms.AsNoTracking().Where(x => x.ClassroomId == allocateClassroom.ClassroomId).FirstOrDefault();
                if (className is null)
                {
                    _dbContext.AllocateClassrooms.Update(allocateClassroom);
                    await _dbContext.SaveChangesAsync();

                    return new BaseResponseService().GetSuccessResponse(allocateClassroom);
                }
                else
                {
                    return new BaseResponseService().GetSuccessResponse($"This allocation is already used.");
                }


            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }
        }
    }
}