using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnBoardingTaskApp.Models;

namespace OnBoardingTaskApp.Controllers
{
    public class SalesController : ControllerBase
    {
        private readonly OnBoardingTaskDBContext _context  = new OnBoardingTaskDBContext();


        // GET: api/Sales
        [Route("api/Sales/GetSales")]
        [HttpGet]
        public IEnumerable<object> GetSales()
        {
            try
            {
                var list = from s in _context.Set<Sales>()
                           join c in _context.Set<Customer>()
                           on s.CustomerId equals c.Id
                           join p in _context.Set<Product>()
                           on s.ProductId equals p.Id
                           join st in _context.Set<Store>()
                           on s.StoreId equals st.Id                           
                           select new { s.Id, ProductName = p.Name, CustomerName = c.Name, StoreName = st.Name, s.DateSold};
                return list.ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return _context.Sales.ToList();
            }
        }

        // GET: api/Sales/5
        [Route("api/Sales/GetSales/{id}")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Sales>> GetSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);

            if (sales == null)
            {
                return NotFound();
            }

            return sales;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("api/Sales/PutSales")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSales(int id, Sales sales)
        {
            if (id != sales.Id)
            {
                return BadRequest();
            }

            _context.Entry(sales).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sales
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("api/Sales/PostSales")]
        [HttpPost]
        public async Task<ActionResult<Sales>> PostSales(Sales sales)
        {
            _context.Sales.Add(sales);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SalesExists(sales.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSales", new { id = sales.Id }, sales);
        }

        // DELETE: api/Sales/5
        [Route("api/Sales/DeleteSales/{id}")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sales>> DeleteSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return sales;
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
