using System.Collections.Generic;
using Trumpery.Models;

namespace Trumpery.DTOs
{
    public class CaffsResponse
    {
        public List<CaffResponse> Caffs { get; set; }

        public CaffsResponse(List<Caff> caffs)
        {
            Caffs = new List<CaffResponse>();
            foreach (Caff c in caffs)
            {
                Caffs.Add(new CaffResponse(c));
            }
        }
    }
}
