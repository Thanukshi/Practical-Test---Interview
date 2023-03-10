using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SchoolManagementBackend.Models
{
    public partial class SchoolManagementDBContext : DbContext
    {
        public SchoolManagementDBContext()
        {
        }

        public SchoolManagementDBContext(DbContextOptions<SchoolManagementDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AllocateClassroomTable> AllocateClassroomTables { get; set; } = null!;
        public virtual DbSet<AllocateSubjectsTable> AllocateSubjectsTables { get; set; } = null!;
        public virtual DbSet<ClassroomTable> ClassroomTables { get; set; } = null!;
        public virtual DbSet<StudentTable> StudentTables { get; set; } = null!;
        public virtual DbSet<SubjectTable> SubjectTables { get; set; } = null!;
        public virtual DbSet<TeacherTable> TeacherTables { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AllocateClassroomTable>(entity =>
            {
                entity.HasKey(e => e.AllocateClassroomId)
                    .HasName("PK__Allocate__8D6E39391926A651");

                entity.ToTable("AllocateClassroomTable");

                entity.Property(e => e.AllocateClassroomId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("AllocateClassroomID");

                entity.Property(e => e.ClassroomId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ClassroomID");

                entity.Property(e => e.TeacherId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("TeacherID");

                entity.HasOne(d => d.Classroom)
                    .WithMany(p => p.AllocateClassroomTables)
                    .HasForeignKey(d => d.ClassroomId)
                    .HasConstraintName("FK__AllocateC__Class__30F848ED");

                entity.HasOne(d => d.Teacher)
                    .WithMany(p => p.AllocateClassroomTables)
                    .HasForeignKey(d => d.TeacherId)
                    .HasConstraintName("FK__AllocateC__Teach__31EC6D26");
            });

            modelBuilder.Entity<AllocateSubjectsTable>(entity =>
            {
                entity.HasKey(e => e.AllocateSubjectId)
                    .HasName("PK__Allocate__1B5A411036ACC450");

                entity.ToTable("AllocateSubjectsTable");

                entity.Property(e => e.AllocateSubjectId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("AllocateSubjectID");

                entity.Property(e => e.SubjectId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("SubjectID");

                entity.Property(e => e.TeacherId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("TeacherID");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.AllocateSubjectsTables)
                    .HasForeignKey(d => d.SubjectId)
                    .HasConstraintName("FK__AllocateS__Subje__2D27B809");

                entity.HasOne(d => d.Teacher)
                    .WithMany(p => p.AllocateSubjectsTables)
                    .HasForeignKey(d => d.TeacherId)
                    .HasConstraintName("FK__AllocateS__Teach__2E1BDC42");
            });

            modelBuilder.Entity<ClassroomTable>(entity =>
            {
                entity.HasKey(e => e.ClassroomId)
                    .HasName("PK__Classroo__11618E8A5E6A16FA");

                entity.ToTable("ClassroomTable");

                entity.Property(e => e.ClassroomId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ClassroomID");

                entity.Property(e => e.ClassroomName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<StudentTable>(entity =>
            {
                entity.HasKey(e => e.StudentId)
                    .HasName("PK__StudentT__32C52A7955CF328A");

                entity.ToTable("StudentTable");

                entity.Property(e => e.StudentId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("StudentID");

                entity.Property(e => e.ClassroomId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ClassroomID");

                entity.Property(e => e.ContactNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ContactPersonName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

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
                    .WithMany(p => p.StudentTables)
                    .HasForeignKey(d => d.ClassroomId)
                    .HasConstraintName("FK__StudentTa__Class__267ABA7A");
            });

            modelBuilder.Entity<SubjectTable>(entity =>
            {
                entity.HasKey(e => e.SubjectId)
                    .HasName("PK__SubjectT__AC1BA38809F9A8E9");

                entity.ToTable("SubjectTable");

                entity.Property(e => e.SubjectId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("SubjectID");

                entity.Property(e => e.SubjectName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TeacherTable>(entity =>
            {
                entity.HasKey(e => e.TeacherId)
                    .HasName("PK__TeacherT__EDF25944271BCDAB");

                entity.ToTable("TeacherTable");

                entity.Property(e => e.TeacherId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("TeacherID");

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
