﻿
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


        //public Task<BaseResponse> GetAllocateSubjectByID(int id)
        //{
        //    try
        //    {
        //        var ClassDetails = _dbContext.Classrooms.Where(x => x.ClassroomId == id).FirstOrDefault();
        //        if (ClassDetails == null)
        //        {
        //            return Task.FromResult(new BaseResponseService().GetErrorResponse($"This {id} does not exist."));
        //        }
        //        else
        //        {
        //            return Task.FromResult(new BaseResponseService().GetSuccessResponse(ClassDetails));
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return Task.FromResult(new BaseResponseService().GetErrorResponse(ex));
        //    }
        //}


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

        //public async Task<BaseResponse> UpdateClassroom(Classroom classroom)
        //{
        //    try
        //    {
        //        var className = _dbContext.Classrooms.AsNoTracking().Where(x => x.ClassroomName == classroom.ClassroomName).FirstOrDefault();
        //        if(className is null)
        //        {
        //            _dbContext.Classrooms.Update(classroom);
        //            await _dbContext.SaveChangesAsync();

        //            return new BaseResponseService().GetSuccessResponse(classroom);
        //        }
        //        else
        //        {
        //            return new BaseResponseService().GetSuccessResponse($"This {classroom.ClassroomName} is already used.");
        //        }


        //    }
        //    catch (Exception ex)
        //    {
        //        return new BaseResponseService().GetErrorResponse(ex);
        //    }
        //}
    }
}