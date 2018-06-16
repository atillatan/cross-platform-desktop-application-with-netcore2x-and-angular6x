using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace coreapi.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<dynamic> Get()
        {
            return new List<dynamic> {
                new { Name = "Bob", FamilyName = "Smith", Age = 32, email = "test1" },
                new { Name = "Alice", FamilyName = "Smith", Age = 33, email = "test2" },
                new { Name = "Amy", FamilyName = "Smith", Age = 32, email = "test3" },
                new { Name = "Adam", FamilyName = "Smith", Age = 32, email = "test4" }
             };
        } 

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
