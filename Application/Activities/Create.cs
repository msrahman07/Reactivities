using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
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

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Activities.Add(request.Activity);
                await context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}