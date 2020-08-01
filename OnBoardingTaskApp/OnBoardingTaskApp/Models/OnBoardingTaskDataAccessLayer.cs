using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace OnBoardingTaskApp.Models
{
    public class OnBoardingTaskDataAccessLayer
    {
        OnBoardingTaskDBContext MyDBContext = new OnBoardingTaskDBContext();

        public IEnumerable<Customer> GetAllCustomers()
        {
            try
            {
                return MyDBContext.Customer.ToList();
            }
            catch(Exception e){
                throw;
            }
        }
    }
}
