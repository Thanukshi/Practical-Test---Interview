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

        public virtual DbSet<AllocateClassroom> AllocateClassrooms { get; set; } = null!;
        public virtual DbSet<AllocateSubject> AllocateSubjects { get; set; } = null!;
        public virtual DbSet<Classroom> Classrooms { get; set; } = null!;
        public virtual DbSet<Student> Students { get; set; } = null!;
        public virtual DbSet<Subject> Subjects { get; set; } = null!;
        public virtual DbSet<Teacher> Teachers { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-Q6KSKV4\\SQLEXPRESS;Database=SchoolManagementDB;Trusted_Connection=True;");
            }
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

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
