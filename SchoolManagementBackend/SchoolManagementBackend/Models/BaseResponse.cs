namespace SchoolManagementBackend.Models
{
    public class BaseResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string ErrorType { get; set; }
        public object Data { get; set; }
        public int ExceptionNumber { get; set; }
        public int StatusCode { get; set; }
    }
}