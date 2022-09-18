using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cores;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<Activity>> 
        {
            public Guid Id {get; set;}

            // public Query(Guid id)
            // {
            //     Id = id;
            // }
        }

        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await this.context.Activities.FindAsync(request.Id);
                return Result<Activity>.Success(activity!);
            }
        }
    }
}