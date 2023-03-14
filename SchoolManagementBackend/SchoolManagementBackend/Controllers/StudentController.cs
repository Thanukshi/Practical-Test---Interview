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
    public class StudentController : ControllerBase
    {
        private readonly IStudentsService _studentsService;
        public StudentController(IStudentsService studentsService)
        {
            _studentsService = studentsService;

        }

        [HttpPost("AddStudent")]
        public async Task<ActionResult> AddStudent(Student student)
        {
            try
            {
                var result = await _studentsService.AddStudent(student);
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

        [HttpGet("GetStudent")]
        public async Task<ActionResult> GetStudent()
        {
            try
            {
                var result = await _studentsService.GetAllStudentsDetails();
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


        [HttpGet("GetStudentById/{id}")]
        public async Task<ActionResult> GetStudentById(int id)
        {
            try
            {
                var result = await _studentsService.GetStudentByID(id);
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


        [HttpDelete("RemoveStudent/{id}")]
        public async Task<ActionResult> RemoveStudent(int id)
        {
            try
            {
                var result = await _studentsService.RemoveStudent(id);
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


        [HttpPut("UpdateStudent")]
        public async Task<ActionResult> UpdateStudent(Student student)
        {
            try
            {
                var result = await _studentsService.UpdateStudent(student);
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

