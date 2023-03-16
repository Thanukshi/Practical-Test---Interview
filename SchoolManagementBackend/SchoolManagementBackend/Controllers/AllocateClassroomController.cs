using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementBackend.Entities;
using SchoolManagementBackend.ErrorHandler;
using SchoolManagementBackend.Interfaces;
using SchoolManagementBackend.Models;
using SchoolManagementBackend.ResponseHandler;
using System.Net;

namespace SchoolManagementBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AllocateClassroomController : ControllerBase
    {
        private readonly IAllocateClassroomService _allocateClassroomService;
        public AllocateClassroomController(IAllocateClassroomService allocateClassroomService)
        {
            _allocateClassroomService = allocateClassroomService;

        }

        [HttpPost("AddAllocateClassroom")]
        public async Task<ActionResult> AddAllocateClassroom(AllocateClassroom allocateClassroom)
        {
            try
            {
                var result = await _allocateClassroomService.AddAllocateClassroom(allocateClassroom);
                if (result.Success)
                    return Ok(result);
                else
                {
                    int error = result.StatusCode;
                    switch (error)
                    {
                        case ((int)HttpStatusCode.NotFound):
                            return StatusCode((int)HttpStatusCode.NotFound, result);
                        case ((int)HttpStatusCode.Unauthorized):
                            return StatusCode((int)HttpStatusCode.Unauthorized, result);
                        case (int)HttpStatusCode.BadRequest:
                            return StatusCode((int)HttpStatusCode.BadRequest, result);
                        default:
                            return StatusCode(StatusCodes.Status500InternalServerError, result);
                    }
                }
            }
            catch (Exception ex)
            {
                return new OkObjectResult(new
                {
                    code = (int)HttpStatusCode.InternalServerError,
                    message = ex.Message,
                });
            }
        }

        [HttpGet("GetAllAllocateClassroomDetails")]
        public async Task<ActionResult> GetAllAllocateClassroomDetails()
        {
            try
            {
                var result = await _allocateClassroomService.GetAllAllocateClassroomDetails();
                if (result.Success)
                    return Ok(result);
                else
                {
                    int error = result.StatusCode;
                    switch (error)
                    {
                        case ((int)HttpStatusCode.NotFound):
                            return StatusCode((int)HttpStatusCode.NotFound, result);
                        case ((int)HttpStatusCode.Unauthorized):
                            return StatusCode((int)HttpStatusCode.Unauthorized, result);
                        case (int)HttpStatusCode.BadRequest:
                            return StatusCode((int)HttpStatusCode.BadRequest, result);
                        default:
                            return StatusCode(StatusCodes.Status500InternalServerError, result);
                    }
                }
            }
            catch (Exception ex)
            {
                return new OkObjectResult(new
                {
                    code = (int)HttpStatusCode.InternalServerError,
                    message = ex.Message,
                });
            }
        }


        //[HttpGet("GetAllocateSubjectById/{id}")]
        //public async Task<ActionResult> GetTeacherById(int id)
        //{
        //    try
        //    {
        //        var result = await _teacherService.GetTeacherByID(id);
        //        if (result.Success)
        //            return Ok(result);
        //        else
        //        {
        //            int error = result.StatusCode;
        //            switch (error)
        //            {
        //                case ((int)HttpStatusCode.NotFound):
        //                    return StatusCode((int)HttpStatusCode.NotFound, result);
        //                case ((int)HttpStatusCode.Unauthorized):
        //                    return StatusCode((int)HttpStatusCode.Unauthorized, result);
        //                case (int)HttpStatusCode.BadRequest:
        //                    return StatusCode((int)HttpStatusCode.BadRequest, result);
        //                default:
        //                    return StatusCode(StatusCodes.Status500InternalServerError, result);
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return new OkObjectResult(new
        //        {
        //            code = (int)HttpStatusCode.InternalServerError,
        //            message = ex.Message,
        //        });
        //    }
        //}


        [HttpDelete("RemoveAllAlocateClassroom/{id}")]
        public async Task<ActionResult> RemoveAllAlocateClassroom(int id)
        {
            try
            {
                var result = await _allocateClassroomService.RemoveAllAlocateClassroom(id);
                if (result.Success)
                    return Ok(result);
                else
                {
                    int error = result.StatusCode;
                    switch (error)
                    {
                        case ((int)HttpStatusCode.NotFound):
                            return StatusCode((int)HttpStatusCode.NotFound, result);
                        case ((int)HttpStatusCode.Unauthorized):
                            return StatusCode((int)HttpStatusCode.Unauthorized, result);
                        case (int)HttpStatusCode.BadRequest:
                            return StatusCode((int)HttpStatusCode.BadRequest, result);
                        default:
                            return StatusCode(StatusCodes.Status500InternalServerError, result);
                    }
                }
            }
            catch (Exception ex)
            {
                return new OkObjectResult(new
                {
                    code = (int)HttpStatusCode.InternalServerError,
                    message = ex.Message,
                });
            }
        }


        [HttpPut("UpdateAllocateClassroom")]
        public async Task<ActionResult> UpdateAllocateClassroom(AllocateClassroom allocateClassroom)
        {
            try
            {
                var result = await _allocateClassroomService.UpdateAllocateClassroom(allocateClassroom);
                if (result.Success)
                    return Ok(result);
                else
                {
                    int error = result.StatusCode;
                    switch (error)
                    {
                        case ((int)HttpStatusCode.NotFound):
                            return StatusCode((int)HttpStatusCode.NotFound, result);
                        case ((int)HttpStatusCode.Unauthorized):
                            return StatusCode((int)HttpStatusCode.Unauthorized, result);
                        case (int)HttpStatusCode.BadRequest:
                            return StatusCode((int)HttpStatusCode.BadRequest, result);
                        default:
                            return StatusCode(StatusCodes.Status500InternalServerError, result);
                    }
                }
            }
            catch (Exception ex)
            {
                return new OkObjectResult(new
                {
                    code = (int)HttpStatusCode.InternalServerError,
                    message = ex.Message,
                });
            }
        }
    }
}

