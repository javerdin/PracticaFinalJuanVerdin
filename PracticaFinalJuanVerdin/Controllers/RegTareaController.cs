using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PracticaFinalJuanVerdin.Models;

namespace PracticaFinalJuanVerdin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegTareaController : ControllerBase
    {
        private readonly TareasdbContext _dbcontext;

        public RegTareaController(TareasdbContext context)
        {
            _dbcontext = context;
        }

        [HttpGet]
        [Route("Lista")]

        public async Task<IActionResult> Lista()
        {
            List<RegTarea> lista = await _dbcontext.RegTareas.OrderByDescending(c => c.IdTarea).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] RegTarea request)
        {
            await _dbcontext.RegTareas.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] RegTarea request)
        {
            _dbcontext.RegTareas.Update(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            RegTarea tarea = _dbcontext.RegTareas.Find(id);
            _dbcontext.RegTareas.Remove(tarea);

            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
