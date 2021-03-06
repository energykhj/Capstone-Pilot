﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthDemo.Helpers
{
    public class ErrorManager
    { public int Code { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }

        private Dictionary<int, string> codeList = new Dictionary<int, string>()
        {
             {-1, "General error"},
        };

        public ErrorManager()
        {
        }

        public ErrorManager(int code)
        {
            SetError(code);
        }

        public ErrorManager(Exception ex)
        {
            Code = 0;
            Message = "Internal Error: " + ex.Message;
            StackTrace = ex.StackTrace;
        }

        public void SetError(int code)
        {
            var currentMessage = codeList.FirstOrDefault(c => c.Key == code);
            Code = currentMessage.Key;
            Message = currentMessage.Value;
            StackTrace = "N/A";
        }

        public string ErrorList(List<int> errors)
        {
            string result = string.Empty;
            foreach (var error in errors)
            {
                result += JsonConvert.SerializeObject(new ErrorManager(error));
            }
            return result;
        }
    }
}
