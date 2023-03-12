using Microsoft.Data.SqlClient;
using SchoolManagementBackend.Entities;
using SchoolManagementBackend.ErrorHandler;
using SchoolManagementBackend.Models;

namespace SchoolManagementBackend.ResponseHandler
{
    public class BaseResponseService
    {
        public BaseResponse GetSuccessResponse()
        {
            return new BaseResponse() { StatusCode = CommonErrors.CodeOk, Success = true, Message = CommonErrors.GlobalSuccess, ErrorType = CommonErrors.GlobalErrorType };
        }

        public BaseResponse GetSuccessResponse(object data)
        {
            return new BaseResponse() { StatusCode = CommonErrors.CodeOk, Success = true, Message = CommonErrors.GlobalSuccess, ErrorType = CommonErrors.GlobalErrorType, Data = data };
        }

        public BaseResponse GetSuccessResponse(object data, int code)
        {
            return new BaseResponse() { StatusCode = code, Success = true, Message = CommonErrors.GlobalSuccess, ErrorType = CommonErrors.GlobalErrorType, Data = data };
        }

        public BaseResponse GetErrorResponse(string message)
        {
            return new BaseResponse() { StatusCode = CommonErrors.CodeBadReq, Success = false, Message = CommonErrors.GlobalBad, ErrorType = CommonErrors.GlobalErrorType, Data = message };
        }

        public BaseResponse GetErrorResponse(string message, int code)
        {
            return new BaseResponse() { StatusCode = code, Success = false, Message = CommonErrors.GlobalBad, ErrorType = CommonErrors.GlobalErrorType, Data = message };
        }

        public BaseResponse GetErrorResponse(SqlException ex)
        {
            if (ex.Number == 50005)
            {
                return new BaseResponse() { StatusCode = CommonErrors.CodeInternal, Success = false, Message = ex.Message,  ErrorType = CommonErrors.GlobalInternal, Data = ex, ExceptionNumber = ex.Number };
            }
            return GetErrorResponse((Exception)ex);
        }

        public BaseResponse GetErrorResponse(Exception ex)
        {
            return new BaseResponse() { StatusCode = CommonErrors.CodeInternal, Success = false, Message = ex.Message, ErrorType = CommonErrors.GlobalAction };
        }
    }
}
