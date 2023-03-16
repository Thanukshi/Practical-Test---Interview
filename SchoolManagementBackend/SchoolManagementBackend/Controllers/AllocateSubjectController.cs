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
    public class AllocateSubjectController : ControllerBase
    {
        private readonly IAllocateSubjectService _allocateSubjectService;
        public AllocateSubjectController(IAllocateSubjectService allocateSubjectService)
        {
            _allocateSubjectService = allocateSubjectService;

        }

        [HttpPost("AddAllocateSubject")]
        public async Task<ActionResult> AddAllocateSubject(AllocateSubject allocateSubject)
        {
            try
            {
                var result = await _allocateSubjectService.AddAllocateSubject(allocateSubject);
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

        [HttpGet("GetAllocateSubject")]
        public async Task<ActionResult> GetAllocateSubject()
        {
            try
            {
                var result = await _allocateSubjectService.GetAllAllocateSubjectDetails();
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


        [HttpGet("GetAllocateSubjectByID/{id}")]
        public async Task<ActionResult> GetAllocateSubjectByID(int id)
        {
            try
            {
                var result = await _allocateSubjectService.GetAllocateSubjectByID(id);
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


        [HttpDelete("RemoveAllAlocateSubject/{id}")]
        public async Task<ActionResult> RemoveAllAlocateSubject(int id)
        {
            try
            {
                var result = await _allocateSubjectService.RemoveAllAlocateSubject(id);
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


        [HttpPut("UpdateAllocateSubject")]
        public async Task<ActionResult> UpdateAllocateSubject(AllocateSubject allocateSubject)
        {
            try
            {
                var result = await _allocateSubjectService.UpdateAllocateSubject(allocateSubject);
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

