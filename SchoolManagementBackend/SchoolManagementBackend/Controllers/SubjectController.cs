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
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectService _subjectService;
        public SubjectController(ISubjectService subjectService)
        {
            _subjectService = subjectService;

        }

        [HttpPost("AddSubject")]
        public async Task<ActionResult> AddSubject(Subject subject)
        {
            try
            {
                var result = await _subjectService.AddSubject(subject);
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

        [HttpGet("GetSubjectList")]
        public async Task<ActionResult> GetSubjectList()
        {
            try
            {
                var result = await _subjectService.GetAllSubjectDetails();
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


        [HttpGet("GetSubjectById/{id}")]
        public async Task<ActionResult> GetSubjectById(int id)
        {
            try
            {
                var result = await _subjectService.GetSubjectByID(id);
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


        [HttpDelete("RemoveSubject/{id}")]
        public async Task<ActionResult> RemoveSubject(int id)
        {
            try
            {
                var result = await _subjectService.RemoveSubject(id);
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


        [HttpPut("UpdateSubject")]
        public async Task<ActionResult> UpdateSubject(Subject subject)
        {
            try
            {
                var result = await _subjectService.UpdateSubject(subject);
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

