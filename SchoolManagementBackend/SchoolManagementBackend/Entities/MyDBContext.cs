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

        public virtual DbSet<AllocateSubject> AllocateSubjects { get; set; }
        public virtual DbSet<AllocateClassroom> AllocateClassrooms { get; set; }
        public virtual DbSet<Classroom> Classrooms { get; set; }
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }
        public virtual DbSet<Teacher> Teachers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AllocateSubject>(entity =>
            {
                entity.Property(e => e.AllocateSubjectId).HasColumnName("AllocateSubjectID");

                entity.Property(e => e.DateCreated).HasColumnType("datetime");

                entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

                entity.Property(e => e.TeacherId).HasColumnName("TeacherID");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.AllocateSubjects)
                    .HasForeignKey(d => d.SubjectId)
                    .HasConstraintName("FK__AllocateS__Subje__1B29035F");

                entity.HasOne(d => d.Teacher)
                    .WithMany(p => p.AllocateSubjects)
                    .HasForeignKey(d => d.TeacherId)
                    .HasConstraintName("FK__AllocateS__Teach__1C1D2798");
            });

            modelBuilder.Entity<AllocateClassroom>(entity =>
            {
                entity.Property(e => e.AllocateClassroomID).HasColumnName("AllocateClassroomID");

                entity.Property(e => e.DateCreated).HasColumnType("datetime");

                entity.Property(e => e.ClassroomID).HasColumnName("ClassroomID");

                entity.Property(e => e.TeacherId).HasColumnName("TeacherID");

                entity.HasOne(d => d.Classroom)
                    .WithMany(p => p.AllocateClassrooms)
                    .HasForeignKey(d => d.ClassroomID)
                    .HasConstraintName("FK__AllocateC__Class__1B29035F");

                entity.HasOne(d => d.Teacher)
                    .WithMany(p => p.AllocateClassrooms)
                    .HasForeignKey(d => d.TeacherId)
                    .HasConstraintName("FK__AllocateC__Teach__1C1D2798");
            });

            modelBuilder.Entity<Classroom>(entity =>
            {
                entity.ToTable("Classroom");

                entity.Property(e => e.ClassroomId).HasColumnName("ClassroomID");

                entity.Property(e => e.ClassroomName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DateCreated).HasColumnType("datetime");
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

                entity.Property(e => e.DateCreated).HasColumnType("datetime");

                entity.Property(e => e.Dbo)
                    .HasColumnType("date")
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
                    .HasConstraintName("FK__Student__Classro__147C05D0");
            });

            modelBuilder.Entity<Subject>(entity =>
            {
                entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

                entity.Property(e => e.DateCreated).HasColumnType("datetime");

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

                entity.Property(e => e.DateCreated).HasColumnType("datetime");

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

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
