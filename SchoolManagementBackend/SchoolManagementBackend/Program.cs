using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SchoolManagementBackend.Entities;
using SchoolManagementBackend.Interfaces;
using SchoolManagementBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllers();

//Dependency Injection
builder.Services.AddTransient<IClassroomService, ClassroomService>();
builder.Services.AddTransient<ISubjectService, SubjectService>();
builder.Services.AddTransient<ITeacherService, TeacherService>();
builder.Services.AddTransient<IStudentsService, StudentsService>();

//Add db context
builder.Services.AddDbContext<MyDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("db_con")));


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
