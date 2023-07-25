using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PracticaFinalJuanVerdin.Models;

public partial class TareasdbContext : DbContext
{
    public TareasdbContext()
    {
    }

    public TareasdbContext(DbContextOptions<TareasdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<RegTarea> RegTareas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB; DataBase=TAREASDB;Integrated Security=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RegTarea>(entity =>
        {
            entity.HasKey(e => e.IdTarea).HasName("PK__RegTarea__756A54024935308F");

            entity.Property(e => e.IdTarea).HasColumnName("idTarea");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(300)
                .HasColumnName("descripcion");
            entity.Property(e => e.Iscompleted)
                .HasMaxLength(50)
                .HasColumnName("iscompleted");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .HasColumnName("nombre");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
