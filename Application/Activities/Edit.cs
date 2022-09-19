using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Cores;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; } = null!;
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(command => command.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Activity.Id);
                // context.Activities.Update(request.Activity);
                if(activity == null){
                    return null!;
                }
                mapper.Map(request.Activity, activity);
                var result = await context.SaveChangesAsync() > 0;

                if(!result){
                    return Result<Unit>.Failure("Failed to edit");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}