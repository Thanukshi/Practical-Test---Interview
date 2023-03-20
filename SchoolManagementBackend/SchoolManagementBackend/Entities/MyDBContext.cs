using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SchoolManagementBackend.Entities
{
    public partial class MyDBContext : DbContext
    {
        public MyDBContext()
        {
        }

        public MyDBContext(DbContextOptions<MyDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AllocateClassroom> AllocateClassrooms { get; set; } 
        public virtual DbSet<AllocateSubject> AllocateSubjects { get; set; }
        public virtual DbSet<Classroom> Classrooms { get; set; } 
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }
        public virtual DbSet<Teacher> Teachers { get; set; } 

        public DbSet<AllocateSubjectList> GetAllAllocateSubjectList { get; set; }
        public DbSet<AllocateClassroomList> GetAllAllocateClassroomList { get; set; }
        public DbSet<StudentList> GetAllStudentList { get; set; }
        public DbSet<Classroom> RemoveClassrooms { get; set; }
        public DbSet<Teacher> RemoveTeachers { get; set; }

        public DbSet<AllocateSubject> RemoveSubjectList { get; set; }
        //public DbSet<Subject> RemoveSubjects { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AllocateClassroom>(entity =>
            {
                entity.ToTable("AllocateClassroom");

                entity.Property(e => e.AllocateClassroomId).HasColumnName("AllocateClassroomID");

                entity.Property(e => e.ClassroomId).HasColumnName("ClassroomID");

                entity.Property(e => e.TeacherId).HasColumnName("TeacherID");

                entity.HasOne(d => d.Classroom)
                    .WithMany(p => p.AllocateClassrooms)
                    .HasForeignKey(d => d.ClassroomId)
                    .HasConstraintName("FK_AllocateClassroom");

                entity.HasOne(d => d.Teacher)
                    .WithMany(p => p.AllocateClassrooms)
                    .HasForeignKey(d => d.TeacherId)
                    .HasConstraintName("FK_TeachertAllocateClassroom");
            });

            modelBuilder.Entity<AllocateSubject>(entity =>
            {
                entity.Property(e => e.AllocateSubjectId).HasColumnName("AllocateSubjectID");

                entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

                entity.Property(e => e.TeacherId).HasColumnName("TeacherID");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.AllocateSubjects)
                    .HasForeignKey(d => d.SubjectId)
                    .HasConstraintName("FK_SubjectAllocate");

                entity.HasOne(d => d.Teacher)
                    .WithMany(p => p.AllocateSubjects)
                    .HasForeignKey(d => d.TeacherId)
                    .HasConstraintName("FK_TeacherAllocateSubject");
            });

            modelBuilder.Entity<Classroom>(entity =>
            {
                entity.ToTable("Classroom");

                entity.Property(e => e.ClassroomId).HasColumnName("ClassroomID");

                entity.Property(e => e.ClassroomName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.ToTable("Student");

                entity.Property(e => e.StudentId).HasColumnName("StudentID");

                entity.Property(e => e.ClassroomId).HasColumnName("ClassroomID");

                entity.Property(e => e.ContactNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ContactPersonName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Dbo)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("DBO");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Classroom)
                    .WithMany(p => p.Students)
                    .HasForeignKey(d => d.ClassroomId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentClassroom");
            });

            modelBuilder.Entity<Subject>(entity =>
            {
                entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

                entity.Property(e => e.SubjectName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Teacher>(entity =>
            {
                entity.ToTable("Teacher");

                entity.Property(e => e.TeacherId).HasColumnName("TeacherID");

                entity.Property(e => e.ContactNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AllocateSubjectList>(entity =>
            {
                entity.HasKey(e => e.AllocateSubjectId)
                 .HasName("AllocateSubjectID");

                entity.Property(e => e.SubjectID).HasColumnName("SubjectID");

                entity.Property(e => e.SubjectName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TeacherID).HasColumnName("TeacherID");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AllocateClassroomList>(entity =>
            {
                entity.HasKey(e => e.AllocateClassroomID)
                 .HasName("AllocateClassroomID");

                entity.Property(e => e.ClassroomID).HasColumnName("ClassroomID");

                entity.Property(e => e.ClassroomName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TeacherID).HasColumnName("TeacherID");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<StudentList>(entity =>
            {
                entity.HasKey(e => e.StudentID)
                 .HasName("StudentID");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ContactPersonName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ContactNo)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.DBO)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Age).HasColumnName("Age");

                entity.Property(e => e.ClassroomID).HasColumnName("ClassroomId");

                entity.Property(e => e.ClassroomName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
