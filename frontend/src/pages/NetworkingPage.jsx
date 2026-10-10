import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/networking/Hero'
import ActividadesProximas from '../components/networking/ActividadesProximas'
import CourseCard from '../components/cursos/CourseCard'
import TallerCard from '../components/talleres/TallerCard'
import EventoRow from '../components/eventos/EventoRow'
import Contacto from '../components/Contacto'
import { useTitulo } from '../hooks/useTitulo'

export default function NetworkingPage() {
  useTitulo(null)

  return (
    <div className="tw:flex tw:min-h-screen tw:flex-col">
      <Navbar />
      <main className="tw:flex-1">
        <Hero />

        <ActividadesProximas
          id="cursos"
          tipo="curso"
          label="Cursos"
          title="Próximos cursos"
          description="Aprende con los mejores. Elige tu modalidad y empieza."
          textoVerTodos="Ver todos los cursos"
          destino="/cursos"
          Tarjeta={CourseCard}
          propTarjeta="curso"
          vacio="Pronto habrá nuevos cursos."
        />

        <div className="tw:bg-fondo-claro-secciones">
          <ActividadesProximas
            id="talleres"
            tipo="taller"
            label="Talleres"
            title="Próximos talleres"
            description="Manos a la obra: presencial u online, aparta tu lugar hoy."
            textoVerTodos="Ver todos los talleres"
            destino="/talleres"
            Tarjeta={TallerCard}
            propTarjeta="taller"
            vacio="Pronto habrá nuevos talleres."
            diseno="carrusel"
            claseTarjeta="tw:w-72 tw:shrink-0 tw:snap-start tw:sm:w-80 tw:md:w-auto tw:md:min-w-0 tw:md:shrink tw:md:flex-1"
          />
        </div>

        <ActividadesProximas
          id="eventos"
          tipo="evento"
          label="Eventos"
          title="Próximos eventos"
          description="Fechas confirmadas. Elige el tuyo y regístrate."
          textoVerTodos="Ver todos los eventos"
          destino="/eventos"
          Tarjeta={EventoRow}
          propTarjeta="evento"
          vacio="Pronto habrá nuevos eventos."
        />

        <div className="tw:bg-fondo-claro-secciones">
          <Contacto />
        </div>
      </main>
      <Footer />
    </div>
  )
}
