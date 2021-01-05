;(function() 
{
    'use strict';
    angular.module('dash').factory('ForgotPasswordService', ForgotPasswordService);
    function ForgotPasswordService($q, $http, BACKEND_URL, HttpService) 
    {
        var service = 
        {
            getQuestions: getQuestions,
            sendAnswers: sendAnswers,
            sendPassword: sendPassword
        };
        return service;
        function getQuestions(data)
        {
//          var response = undefined;
//          var questionString = 
//          {
//              q1: 
//              {
//                  question: "How do you spell oneone?",
//                  id: "10000001"
//              },
//              q2:
//              {
//                  question: "How do you spell twotwo?",
//                  id: "10000002"
//              }
//          }
//          if(data.emailAddress == "error@error.error")
//          {
//              response = 
//              {
//                  code: "404"
//              }
//          }
//          else
//          {
//              response = 
//              {
//                  code: "200",
//                  questions: questionString
//              }
//          }
//          return response;
            return HttpService.httpPost('/dash/v1/password/getQuestions', data)
            .then(function(response)
            {
                return response.data;
            })
            .catch(function(error)
            {
                return $q.reject(error);
            });
        }
        function sendAnswers(data)
        {
//          var response = undefined;
//          var atempts = true;
//          var correct = 
//          {
//              q1: 
//              {
//                  answer: "oneone",
//                  id: "10000001"
//              },
//              q2:
//              {
//                  answer: "twotwo",
//                  id: "10000002"
//              }
//          }
//          var referenceNumber = "123456789";
//          if(atempts == true)
//          {
//              console.log(data);
//              if(data == null)
//              {
//                  response = 
//                  {
//                      code: "404"
//                  }
//              }
//              else if(data.q1.answer == correct.q1.answer && data.q1.id == correct.q1.id && data.q2.answer == correct.q2.answer && data.q2.id == correct.q2.id)
//              {
//                  response = 
//                  {
//                      code: "200",
//                      ref: referenceNumber
//                  }
//              }
//              else
//              {
//                  response = 
//                  {
//                      code: "491"
//                  }
//              }
//          }
//          else
//          {
//              response = 
//              {
//                  code: "492"
//              }
//          }
//          return response;
            return HttpService.httpPost('/dash/v1/password/sendAnswers', data)
            .then(function(response)
            {
                return response.data;
            })
            .catch(function(error)
            {
                return $q.reject(error);
            });
        }
        function sendPassword(data)
        {
//          var referenceNumber = "123456789";
//          var response = undefined;
//          if(data == null)
//          {
//              response = 
//              {
//                  code: "404"
//              }
//          }
//          else if(data.ref == referenceNumber)
//          {
//              var password = data.password;
//              response =
//              {
//                  code: "200"
//              }
//          }
//          else
//          {
//              response =
//              {
//                  code: "493"
//              }
//          }
//          return response;
            return HttpService.httpPost('/dash/v1/password/sendPassword', data)
            .then(function(response)
            {
                return response.data;
            })
            .catch(function(error)
            {
                return $q.reject(error);
            });
        }
    }
})();