
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagementBackend.Entities;
using SchoolManagementBackend.Interfaces;
using SchoolManagementBackend.Models;
using SchoolManagementBackend.ResponseHandler;

namespace SchoolManagementBackend.Services
{
    public class StudentsService : IStudentsService
    {
        private readonly MyDBContext _dbContext;
        public StudentsService(MyDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<BaseResponse> AddStudent(Student student)
        {
            try
            {
                var StudentName = _dbContext.Students.Where(x => x.FirstName == student.FirstName && x.LastName == student.LastName).FirstOrDefault();

                if (StudentName != null)
                {
                    return new BaseResponseService().GetErrorResponse($"This {student.FirstName} {student.LastName} is already used.");
                }
                else
                {
                    _dbContext.Students.Add(student);
                    await _dbContext.SaveChangesAsync();

                    return new BaseResponseService().GetSuccessResponse(student, 201);
                }

            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }
        }

        public Task<BaseResponse> GetAllStudentsDetails()
        {
            try
            {
                var StudentDetails = _dbContext.GetAllStudentList.FromSqlRaw("Exec GetAllStudentList").ToList();

                if (StudentDetails is null)
                {
                    return Task.FromResult(new BaseResponseService().GetErrorResponse("Student List not found"));
                }
                else
                {
                    return Task.FromResult(new BaseResponseService().GetSuccessResponse(StudentDetails));
                }

            }
            catch (Exception ex)
            {
                return Task.FromResult(new BaseResponseService().GetErrorResponse(ex));
            }
        }


        public Task<BaseResponse> GetStudentByID(int id)
        {
            try
            {
                var StudentDetails = _dbContext.Students.Where(x => x.StudentId == id).FirstOrDefault();
                if (StudentDetails is null)
                {
                    return Task.FromResult(new BaseResponseService().GetErrorResponse($"This {id} does not exist."));
                }
                else
                {
                    return Task.FromResult(new BaseResponseService().GetSuccessResponse(StudentDetails));
                }

            }
            catch (Exception ex)
            {
                return Task.FromResult(new BaseResponseService().GetErrorResponse(ex));
            }
        }


        public async Task<BaseResponse> RemoveStudent(int id)
        {
            try
            {
                Student student = (Student)_dbContext.Students.Where(x => x.StudentId == id).First();

                if (student is null)
                {
                    return new BaseResponseService().GetErrorResponse($"This {id} does not exist.");
                }
                else
                {
                    _dbContext.Students.Remove(student);
                    await _dbContext.SaveChangesAsync();

                    var studentList = _dbContext.Students.ToList();

                    return new BaseResponseService().GetSuccessResponse(studentList);
                }
            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }

        }


        public async Task<BaseResponse> UpdateStudent(Student student)
        {
            try
            {
                if (student is null)
                {

                    return new BaseResponseService().GetSuccessResponse("Invalid Inputs. Please check.");
                }
                else
                {
                    _dbContext.Students.Update(student);
                    await _dbContext.SaveChangesAsync();

                    return new BaseResponseService().GetSuccessResponse(student);
                }


            }
            catch (Exception ex)
            {
                return new BaseResponseService().GetErrorResponse(ex);
            }
        }
    }
}