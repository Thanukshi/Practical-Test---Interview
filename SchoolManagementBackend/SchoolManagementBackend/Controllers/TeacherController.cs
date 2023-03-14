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
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _teacherService;
        public TeacherController(ITeacherService teacherService)
        {
            _teacherService = teacherService;

        }

        [HttpPost("AddTeacher")]
        public async Task<ActionResult> AddTeacher(Teacher teacher)
        {
            try
            {
                var result = await _teacherService.AddTeacher(teacher);
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

        [HttpGet("GetTeachers")]
        public async Task<ActionResult> GetTeachers()
        {
            try
            {
                var result = await _teacherService.GetAllTeacherDetails();
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


        [HttpGet("GetTeacherById/{id}")]
        public async Task<ActionResult> GetTeacherById(int id)
        {
            try
            {
                var result = await _teacherService.GetTeacherByID(id);
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


        [HttpDelete("RemoveTeacher/{id}")]
        public async Task<ActionResult> RemoveTeacher(int id)
        {
            try
            {
                var result = await _teacherService.RemoveTeacher(id);
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


        [HttpPut("UpdateTeacher")]
        public async Task<ActionResult> UpdateTeacher(Teacher teacher)
        {
            try
            {
                var result = await _teacherService.UpdateTeacher(teacher);
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

