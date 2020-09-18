using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnBoardingTaskApp.Models;
using System.Text.Json;
using System.Linq.Expressions;
using Microsoft.Data.SqlClient;
using System.Security.Principal;

namespace OnBoardingTaskApp.ControllersBase
{
    public class CustomersController : ControllerBase
    {
        private readonly OnBoardingTaskDBContext _context = new OnBoardingTaskDBContext();

        // GET: api/Customers
        [Route("api/Customers/GetCustomer")]
        [HttpGet]
        public  IEnumerable<Customer> GetCustomer()
        {
            try
            {

                return _context.Customer.ToList();
            }catch(Exception e)
                {
                Console.WriteLine(e.Message);
                return _context.Customer.ToList();
            }
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        [Route("api/Customers/GetCustomer/{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customer.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        [Route("api/Customers/PutCustomer")]
        public int PutCustomer(Customer customer)
        {
            int id = customer.Id;

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                 _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return 0;
                }
                else
                {
                    throw;
                }
            }

            return 1;
        }

        // POST: api/Customers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("api/Customers/PostCustomer")]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            _context.Customer.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        [Route("api/Customers/DeleteCustomer/{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(int id)
        {
            try
            {
                var customer = await _context.Customer.FindAsync(id);
                if (customer == null)
                {
                    return NotFound();
                }

                _context.Customer.Remove(customer);
                await _context.SaveChangesAsync();
                
                return customer;

            }
            catch (SqlException e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
           
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.Id == id);
        }
    }
}
