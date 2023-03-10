
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagementBackend.Entities;
using SchoolManagementBackend.Interfaces;
using SchoolManagementBackend.Models;
using SchoolManagementBackend.ResponseHandler;

namespace SchoolManagementBackend.Services
{
    public class TeacherService : ITeacherService
    {
        private readonly MyDBContext _dbContext;
        public TeacherService(MyDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<BaseResponse> AddTeacher(Teacher teacher)
        {
            try
            {
                var TeacherName = _dbContext.Teachers.Where(x => x.FirstName == teacher.FirstName && x.LastName == teacher.LastName).FirstOrDefault();
                var TeacherContact = _dbContext.Teachers.Where(x => x.ContactNo == teacher.ContactNo).FirstOrDefault();
                var TeacherEmail = _dbContext.Teachers.Where(x => x.Email == teacher.Email).FirstOrDefault();

                if (TeacherName != null)
                {
                    return new BaseResponseService().GetErrorResponse($"This {teacher.FirstName} {teacher.LastName} is already used.");
                }
                else if (TeacherContact != null)
                {
                    return new BaseResponseService().GetErrorResponse($"This {teacher.ContactNo} is already used.");
                }
                else if (TeacherEmail != null)
                {
                    return new BaseResponseService().GetErrorResponse($"This {teacher.Email} is already used.");
                }
                else
                {
                    _dbContext.Teachers.Add(teacher);
                    await _dbContext.SaveChangesAsync();

                    return new BaseResponseService().GetSuccessResponse(teacher, 201);
                }

            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }
        }

        public Task<BaseResponse> GetAllTeacherDetails()
        {
            try
            {
                var TeacherDetails = _dbContext.Teachers.ToList();
                if (TeacherDetails is null)
                {
                    return Task.FromResult(new BaseResponseService().GetErrorResponse("Teacher List not found"));
                }
                else
                {
                    return Task.FromResult(new BaseResponseService().GetSuccessResponse(TeacherDetails));
                }

            }
            catch (Exception ex)
            {
                return Task.FromResult(new BaseResponseService().GetErrorResponse(ex));
            }
        }


        public Task<BaseResponse> GetTeacherByID(int id)
        {
            try
            {
                var TeacherDetails = _dbContext.Teachers.Where(x => x.TeacherId == id).FirstOrDefault();
                if (TeacherDetails is null)
                {
                    return Task.FromResult(new BaseResponseService().GetErrorResponse($"This {id} does not exist."));
                }
                else
                {
                    return Task.FromResult(new BaseResponseService().GetSuccessResponse(TeacherDetails));
                }

            }
            catch (Exception ex)
            {
                return Task.FromResult(new BaseResponseService().GetErrorResponse(ex));
            }
        }


        public async Task<BaseResponse> RemoveTeacher(int id)
        {
            try
            {
                Teacher teacher = (Teacher)_dbContext.Teachers.Where(x => x.TeacherId == id).First();

                if (teacher is null)
                {
                    return new BaseResponseService().GetErrorResponse($"This {id} does not exist.");
                }
                else
                {
                    _dbContext.Teachers.Remove(teacher);
                    await _dbContext.SaveChangesAsync();

                    var teacherList = _dbContext.Teachers.ToList();

                    return new BaseResponseService().GetSuccessResponse(teacherList);
                }
            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }

        }


        public async Task<BaseResponse> UpdateTeacher(Teacher teacher)
        {
            try
            {
                if (teacher is null)
                {

                    return new BaseResponseService().GetSuccessResponse("Invalid Inputs. Please check.");
                }
                else
                {
                    _dbContext.Teachers.Update(teacher);
                    await _dbContext.SaveChangesAsync();

                    return new BaseResponseService().GetSuccessResponse(teacher);
                }


            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }
        }
    }
}