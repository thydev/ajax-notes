using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using DbConnection;

namespace notes.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            var notes = DbConnector.Query("Select * from notes order by created_at desc");
            ViewBag.notes = notes;
            return View();
        }

        [HttpPost]
        [Route("activity/add")]
        public IActionResult CreateNote(string title)
        {
            string Status;
            string ErrorMessage = "";
            Note note = new Note();

            if(title == null || title.Trim() == "") {
                Status = "Error";
                ErrorMessage = "Can not accept empty title";
            } else {
                DbConnector.Execute($"Insert into notes(title, created_at) values('{title}', Now())");
                var notes = DbConnector.Query("Select * from notes order by created_at desc limit 1");
                foreach(var n in notes){
                    note.Id = (int)n["id"];
                    note.Title = (string)n["title"];
                    note.Description = Convert.IsDBNull(n["description"]) ? "" : (string)n["description"];
                    note.Created_at = (DateTime)n["created_at"];
                }
                Status = "Ok";
                
            }
            // Make Note class ===> It's a must?
            var response = new {
                status = Status,
                note = note,
                error = ErrorMessage
            };

            return Json(response);
        }

        [HttpPost]
        [Route("activity/update/{id}")]
        public IActionResult UpdateNote(int id, string description)
        {
            string query = $"Update notes set description='{description}' where id={id}";
            DbConnector.Execute(query);
            var note = DbConnector.Query($"select * from notes where id={id}");
            var res = new {
                status = "Ok",
                note = note,
                message = "Updated Successfully",
                error = ""
            };
            
            return Json(res);
        }

        [HttpPost]
        [Route("activity/delete/{id}")]
        public IActionResult DeleteNote(int id)
        {
            var note = DbConnector.Query($"select * from notes where id={id}");
            string query = $"delete from notes where id={id}";
            DbConnector.Execute(query);
            var res = new {
                status = "Ok",
                note = note,
                message = "Deleted Successfully",
                error = ""
            };
            
            return Json(res);
        }

        [HttpGet]
        [Route("apinotes")]
        IActionResult Notes_Json(){

            var notes = DbConnector.Query("Select * from notes order by created_at desc");
            var response = new {
                status = "Ok",
                notes = notes,
                error = "ErrorMessage"
            };

            return Json(response);
        }
    }
}