import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle, BarChart2, Calendar, Sparkles, Stethoscope, ArrowRight } from 'lucide-react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import RestoHome from '@/assets/resto/home.png';
import RestoBot from '@/assets/resto/bot.png';
import RestoReservas from '@/assets/resto/reservaslive.png';

import InmoHome from '@/assets/inmo/home.png';
import InmoAgenda from '@/assets/inmo/agenda.png';
import InmoPipeline from '@/assets/inmo/pipeline.png';
import InmoCampanas from '@/assets/inmo/campañas.png';
import InmoCliente from '@/assets/inmo/cliente.png';
import InmoContacto from '@/assets/inmo/contacto.png';
import InmoPropiedades from '@/assets/inmo/propiedades.png';

import ClinicaHome from '@/assets/clinica/home.png';
import ClinicaAgenda from '@/assets/clinica/agenda.png';
import ClinicaBot from '@/assets/clinica/bot.png';
import ClinicaInbox from '@/assets/clinica/inbox.png';

import EcomHome from '@/assets/ecom/home.png';
import EcomInbox from '@/assets/ecom/inbox.png';
import EcomPedidos from '@/assets/ecom/pedidos.png';
import EcomProductos from '@/assets/ecom/productos.png';

import CustomUnique from '@/assets/unicos/unica.jpg';

const SERVICES_DETAILED = [
  {
    id: 'restaurantes',
    title: 'Verza para Restaurantes',
    subtitle: 'Llena tus mesas automáticamente, 24/7',
    description: 'Dejá de perder reservas por no atender el teléfono en hora pico. Verza atiende a cientos de comensales simultáneamente, gestiona cambios de horario, muestra tu menú visualmente y asegura que cada mesa se ocupe. Olvídate del "no-show" con nuestro sistema de reconfirmación inteligente.',
    features: [
      'Reservas 100% integradas a tu calendario actual',
      'Menú visual interactivo (fotos, precios, alérgenos)',
      'Recordatorios automáticos por WhatsApp',
      'Gestión de lista de espera y aviso de disponibilidad',
      'Respuesta a preguntas frecuentes (horarios, parking)',
      'Encuestas de satisfacción post-cena automáticas'
    ],
    metrics: ['+30% de reservas directas', '-80% llamadas telefónicas', '-40% ausentismo garantizado'],
    color: 'from-orange-400 to-red-500',
    icon: Calendar,
    images: [
      { src: RestoHome, caption: "Panel principal: Control total de reservas y estado del salón en tiempo real." },
      { src: RestoBot, caption: "Chat Inteligente: Verza sugiere platos, muestra fotos y cierra la reserva solo." },
      { src: RestoReservas, caption: "Calendario Live: Visualiza ocupación y gestiona bloqueos de mesas al instante." }
    ]
  },
  {
    id: 'inmobiliarias',
    title: 'Verza Inmobiliario',
    subtitle: 'Convierte consultas en visitas calificadas',
    description: 'Tu equipo pierde horas respondiendo "¿sigue disponible?" a curiosos. Verza califica automáticamente a cada interesado según presupuesto, zona y garantía, filtrando leads de baja calidad y agendando visitas directamente solo con compradores reales.',
    features: [
      'Respuesta inmediata a leads de portales (24/7)',
      'Pre-calificación avanzada (Filtro de curiosos)',
      'Envío inmediato de fichas técnicas y videos',
      'Agenda sincronizada automáticamente con cada agente',
      'Seguimiento (Follow-up) de leads inactivos',
      'Base de datos de propiedades consultable por IA'
    ],
    metrics: ['Respuesta en <1 min', 'x3 Visitas concretadas', 'Ahorro de 20hs/semana por agente'],
    color: 'from-blue-400 to-indigo-500',
    icon: CheckCircle,
    images: [
      { src: InmoHome, caption: "CRM Inmobiliario: Pipeline visual de leads clasificados por temperatura." },
      { src: InmoPropiedades, caption: "Catálogo Inteligente: Gestión centralizada de tus propiedades." },
      { src: InmoPipeline, caption: "Embudo de Ventas: Control total del proceso desde la consulta hasta la seña." },
      { src: InmoAgenda, caption: "Agenda Automática: Visitas coordinadas sin intervención humana." },
      { src: InmoCampanas, caption: "Campañas: Reactivación de base de datos de antiguos interesados." },
      { src: InmoCliente, caption: "Perfil de Cliente 360: Historial completo de chats y preferencias." },
      { src: InmoContacto, caption: "Omnicanalidad: Centraliza WhatsApp, Instagram y Portales." }
    ]
  },
  {
    id: 'clinicas',
    title: 'Verza para Clínicas',
    subtitle: 'Optimiza tu agenda y cuida al paciente',
    description: 'Reduce el ausentismo drásticamente y mejora la experiencia del paciente. Permite agendar, reprogramar o cancelar turnos sin espera telefónica. Libera a tus secretarias de tareas repetitivas para que puedan brindar una atención personal de calidad en la clínica.',
    features: [
      'Agendamiento 24/7 integrado a tu sistema médico',
      'Recordatorios y confirmación de asistencia',
      'Gestión automática de reprogramaciones',
      'Instrucciones pre-estudio (ayunos, preparaciones)',
      'Respuestas sobre obras sociales y reintegros',
      'Triaje básico y derivación a urgencias'
    ],
    metrics: ['-40% Ausentismo', '+25% Turnos recuperados', 'Atención inmediata 24/7'],
    color: 'from-teal-400 to-emerald-500',
    icon: Stethoscope,
    images: [
      { src: ClinicaHome, caption: "Portal Paciente: Autogestión simple y rápida." },
      { src: ClinicaAgenda, caption: "Agenda Médica: Visualización clara de disponibilidad por especialista." },
      { src: ClinicaBot, caption: "Triaje IA: Verza identifica urgencias y deriva correctamente." },
      { src: ClinicaInbox, caption: "Recepción Digital: Panel de control para secretarias." }
    ]
  },
  {
    id: 'ecommerce',
    title: 'Verza E-commerce',
    subtitle: 'Vende mientras duermes',
    description: 'El 70% de los carritos se abandonan. Verza contacta proactivamente a esos clientes por WhatsApp, resuelve sus dudas sobre talles o envíos y cierra la venta. Funciona como un vendedor experto que conoce cada detalle de tu catálogo.',
    features: [
      'Recuperación proactiva de carritos abandonados',
      'Asesoramiento de productos y recomendaciones IA',
      'Rastreo de pedidos (Tracking) automático',
      'Gestión de cambios y devoluciones automatizada',
      'Venta cruzada (Upselling) inteligente',
      'Soporte técnico y FAQs de primer nivel'
    ],
    metrics: ['+15% Ventas recuperadas', '-50% Tickets de soporte', 'ROI superior a 5x'],
    color: 'from-purple-400 to-pink-500',
    icon: BarChart2,
    images: [
      { src: EcomHome, caption: "Dashboard de Conversión: Métricas claras de ventas recuperadas." },
      { src: EcomProductos, caption: "Catálogo IA: Sincronización automática con tu tienda." },
      { src: EcomInbox, caption: "Soporte Unificado: Atiende consultas de compra en un solo lugar." },
      { src: EcomPedidos, caption: "Logística: Información de envíos en tiempo real para el cliente." }
    ]
  },
  {
    id: 'custom',
    title: 'Soluciones a Medida',
    subtitle: 'Automatización corporativa a escala',
    description: 'Diseñamos cerebros digitales para procesos complejos. Desde on-boarding de empleados y soporte técnico interno, hasta gestión logística y reportes automatizados. Si es un proceso repetitivo basado en comunicación, Verza puede hacerlo más rápido, escalar infinitamente y reducir costos operativos.',
    features: [
      'Integración vía API con cualquier ERP/CRM (SAP, Salesforce)',
      'Despliegue en servidores propios (On-premise) o Cloud',
      'Entrenamiento de modelos (Fine-tuning) con data propietaria',
      'SLA de nivel empresarial y soporte prioritario',
      'Seguridad avanzada y cumplimiento de normativas',
      'Dashboards de analítica a medida'
    ],
    metrics: ['Escalabilidad infinita', 'Reducción de costos operativos', 'Precisión >99%'],
    color: 'from-blue-500 to-violet-600',
    icon: Sparkles,
    images: [
      { src: CustomUnique, caption: "Arquitectura Enterprise: Soluciones robustas para grandes volúmenes." }
    ]
  }
];

const Carousel: React.FC<{ images: { src: string; caption: string }[], title: string, subtitle: string }> = ({ images, title, subtitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-brand-black aspect-video shadow-2xl">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <img
              src={images[currentIndex].src}
              alt={`${title} view ${currentIndex + 1}`}
              className="w-full h-full object-cover object-top"
            />

          </motion.div>
        </AnimatePresence>

        {/* Text Readability Gradient */}
        <div className="absolute -bottom-15 left-0 right-0 h-50 bg-gradient-to-t from-black/0 via-black/50 to-transparent pointer-events-none z-10"></div>

        {/* Navigation Buttons */}
        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <div className="absolute inset-y-0 left-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={prevSlide} className="p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md border border-white/10 transition-colors">
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={nextSlide} className="p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md border border-white/10 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}

        {/* Caption & Indicators */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-sm font-medium mb-3 shadow-black drop-shadow-md"
          >
            {images[currentIndex].caption}
          </motion.p>

          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-brand-cyan' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Expand Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-brand-cyan/20 text-white hover:text-brand-cyan rounded-full backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 z-30"
        title="Ampliar vista"
      >
        <Maximize2 size={20} />
      </button>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setIsModalOpen(false)}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-50"
            >
              <X size={32} />
            </button>

            <div className="relative w-full max-w-7xl max-h-full flex flex-col items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>

              {/* Modal Header */}
              <div className="text-center mb-6">
                <h3 className="text-3xl font-display font-bold text-white mb-2">{title}</h3>
                <p className="text-brand-cyan text-lg">{subtitle}</p>
              </div>

              <div className="relative relative w-full flex justify-center">
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].caption}
                  className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
                />

                {/* Modal Navigation (if > 1) */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/40 hover:bg-brand-cyan text-white hover:text-black rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 group/nav"
                    >
                      <ChevronLeft size={32} className="group-hover/nav:-translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/40 hover:bg-brand-cyan text-white hover:text-black rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 group/nav"
                    >
                      <ChevronRight size={32} className="group-hover/nav:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}
              </div>

              <p className="mt-6 text-center text-white/90 font-medium text-lg bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm border border-white/5">
                {images[currentIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
};

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-40 pb-20">
      <div className="container mx-auto px-6 mb-20 text-center">
        <h1 className="text-5xl font-display font-bold mb-6">Nuestros Servicios</h1>
        <p className="text-xl text-brand-gray max-w-2xl mx-auto">
          Tecnología de punta adaptada a las necesidades reales de tu industria.
        </p>
      </div>

      <div className="container mx-auto px-6 space-y-32">
        {SERVICES_DETAILED.map((service, idx) => (
          <motion.div
            id={service.id}
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}
          >
            {/* Content */}
            <div className="flex-1">
              <div className={`inline-block p-3 rounded-2xl bg-gradient-to-br ${service.color} mb-6`}>
                <service.icon className="text-white" size={32} />
              </div>
              <h2 className="text-4xl font-display font-bold mb-4">{service.title}</h2>
              <h3 className="text-xl text-brand-cyan mb-6">{service.subtitle}</h3>
              <p className="text-brand-gray text-lg mb-8 leading-relaxed">
                {service.description}
              </p>

              {/* Metrics */}
              {service.metrics && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {service.metrics.map((metric, mIdx) => (
                    <span key={mIdx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-brand-cyan tracking-wide uppercase">
                      {metric}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-brand-cyan" size={18} />
                    <span className="text-sm">{feat}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-cyan text-brand-black font-bold text-lg rounded-xl hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:scale-105 transition-all duration-300"
              >
                Solicitar Demo
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Carousel Visual */}
            <div className="flex-1 relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 blur-[100px] rounded-full`}></div>

              {service.images && service.images.length > 0 ? (
                <Carousel images={service.images} title={service.title} subtitle={service.subtitle} />
              ) : (
                <div className="relative bg-brand-dark border border-white/10 rounded-2xl p-6 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle size={64} className="mx-auto text-brand-gray mb-4 opacity-50" />
                    <p className="text-brand-gray">Demo Visual de {service.title} (Proximamente)</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};