// Animación de entrada al hacer scroll.
//
// Los bloques que llevan el atributo data-aparece (títulos de sección, tarjetas, pasos...)
// quedan ocultos hasta que entran en pantalla y entonces aparecen con una animación
// (ver estilos/animaciones.css). Esto solo funciona si el navegador sabe observar la
// visibilidad (IntersectionObserver); si no, no se oculta nada y la página se ve normal.
//
// Los bloques que aparecen después (por ejemplo las tarjetas, cuando llegan del servidor,
// o al cambiar de página) se detectan solos. Los que entran a la vez aparecen escalonados.
export function iniciarAnimaciones() {
  if (typeof IntersectionObserver === 'undefined') return

  document.documentElement.classList.add('anim')

  const observador = new IntersectionObserver(
    (entradas) => {
      const entrando = entradas
        .filter((e) => e.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left,
        )

      entrando.forEach((entrada, i) => {
        entrada.target.style.setProperty('--escalon', Math.min(i, 5))
        entrada.target.setAttribute('data-visible', '')
        observador.unobserve(entrada.target)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )

  const vigilar = () => {
    document.querySelectorAll('[data-aparece]:not([data-vigilado])').forEach((el) => {
      el.setAttribute('data-vigilado', '')
      observador.observe(el)
    })
  }

  vigilar()

  // El contenido de React cambia con la navegación y las cargas: se revisa una vez por cuadro
  let pendiente = false
  new MutationObserver(() => {
    if (pendiente) return
    pendiente = true
    requestAnimationFrame(() => {
      pendiente = false
      vigilar()
    })
  }).observe(document.body, { childList: true, subtree: true })
}
