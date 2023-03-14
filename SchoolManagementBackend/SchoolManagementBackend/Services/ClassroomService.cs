
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagementBackend.Entities;
using SchoolManagementBackend.Interfaces;
using SchoolManagementBackend.Models;
using SchoolManagementBackend.ResponseHandler;

namespace SchoolManagementBackend.Services
{
    public class ClassroomService : IClassroomService
    {
        private readonly MyDBContext _dbContext;
        public ClassroomService(MyDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<BaseResponse> AddClassroom(Classroom classroom)
        {
            try
            {
                var ClassDetails = _dbContext.Classrooms.Where(x => x.ClassroomName == classroom.ClassroomName).FirstOrDefault();
                if (ClassDetails != null)
                {
                    return new BaseResponseService().GetErrorResponse($"This {classroom.ClassroomName} is already used.");
                }
                else
                {
                    _dbContext.Classrooms.Add(classroom);
                    await _dbContext.SaveChangesAsync();

                    return new BaseResponseService().GetSuccessResponse(classroom, 201);
                }

            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }
        }

        public Task<BaseResponse> GetAllClassDetails()
        {
            try
            {
                var ClassDetails = _dbContext.Classrooms.ToList();
                if (ClassDetails == null)
                {
                    return Task.FromResult(new BaseResponseService().GetErrorResponse("Classrooms are not found"));
                }
                else
                {
                    return Task.FromResult(new BaseResponseService().GetSuccessResponse(ClassDetails));
                }

            }
            catch (Exception ex)
            {
                return Task.FromResult(new BaseResponseService().GetErrorResponse(ex));
            }
        }


        public Task<BaseResponse> GetClassroomByID(int id)
        {
            try
            {
                var ClassDetails = _dbContext.Classrooms.Where(x => x.ClassroomId == id).FirstOrDefault();
                if (ClassDetails == null)
                {
                    return Task.FromResult(new BaseResponseService().GetErrorResponse($"This {id} does not exist."));
                }
                else
                {
                    return Task.FromResult(new BaseResponseService().GetSuccessResponse(ClassDetails));
                }

            }
            catch (Exception ex)
            {
                return Task.FromResult(new BaseResponseService().GetErrorResponse(ex));
            }
        }


        public async Task<BaseResponse> RemoveClass(int id)
        {
            try
            {
                Classroom classroom = (Classroom)_dbContext.Classrooms.Where(x => x.ClassroomId == id).First();

                if (classroom == null)
                {
                    return new BaseResponseService().GetErrorResponse($"This {id} does not exist.");
                }
                else
                {
                    _dbContext.Classrooms.Remove(classroom);
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


        public async Task<BaseResponse> UpdateClassroom(Classroom classroom)
        {
            try
            {
                var className = _dbContext.Classrooms.AsNoTracking().Where(x => x.ClassroomName == classroom.ClassroomName).FirstOrDefault();
                if (className is null)
                {
                    _dbContext.Classrooms.Update(classroom);
                    await _dbContext.SaveChangesAsync();

                    return new BaseResponseService().GetSuccessResponse(classroom);
                }
                else
                {
                    return new BaseResponseService().GetSuccessResponse($"This {classroom.ClassroomName} is already used.");
                }


            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }
        }
    }
}