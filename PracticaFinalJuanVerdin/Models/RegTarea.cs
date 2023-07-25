using System;
using System.Collections.Generic;

namespace PracticaFinalJuanVerdin.Models;

public partial class RegTarea
{
    public int IdTarea { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public string? Iscompleted { get; set; }
}
