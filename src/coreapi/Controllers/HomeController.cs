using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller{

        public IActionResult Index()
        {
            return File("index.html", "text/html");
        }
        // GET api/values
        [HttpGet]
        public IEnumerable<dynamic> Users()
        {   
            return new List<dynamic> {
                new { Name = "Bob", FamilyName = "Smith", Age = 32, email = "test1" },
                new { Name = "Alice", FamilyName = "Smith", Age = 33, email = "test2" },
                new { Name = "Amy", FamilyName = "Smith", Age = 32, email = "test3" },
                new { Name = "Adam", FamilyName = "Smith", Age = 32, email = "test4" }
             };
        }
}