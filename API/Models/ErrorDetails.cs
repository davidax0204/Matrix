using System;
using System.Text.Json;

namespace API.Models
{
    public class ErrorDetails
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Title { get; set; }
        public ErrorDetails(int statusCode = 200, string message = "")
        {
            StatusCode = statusCode;
            Message = message;
        }
        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
