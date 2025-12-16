import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Zap, Phone, Settings, Rocket, Plus, Minus, Sparkles, Factory, Scale, Truck, GraduationCap, Briefcase, Users, Calendar, Image as ImageIcon, BarChart3, Clock, Brain, FileText, Sliders, Puzzle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Service, Testimonial } from '../types';

// Data
const TECHNOLOGIES = ['OpenAI', 'Anthropic', 'WhatsApp', 'Instagram', 'Google Calendar', 'Stripe', 'MercadoPago', 'HubSpot', 'Salesforce', 'Make', 'Zapier'];

import RestoHome from '@/assets/resto/home.png';
import RestoBot from '@/assets/resto/bot.png';
import RestoReservas from '@/assets/resto/reservaslive.png';
import InmoHome from '@/assets/inmo/home.png';
import InmoAgenda from '@/assets/inmo/agenda.png';
import InmoPipeline from '@/assets/inmo/pipeline.png';
import InmoContacto from '@/assets/inmo/contacto.png';
import ClinicaHome from '@/assets/clinica/home.png';
import ClinicaAgenda from '@/assets/clinica/agenda.png';
import EcomHome from '@/assets/ecom/home.png';
import EcomProductos from '@/assets/ecom/productos.png';
import InmoCampanas from '@/assets/inmo/campañas.png';

const SERVICES: Service[] = [
    {
        id: 'restaurant',
        title: 'Restaurantes',
        description: 'Toma reservas, muestra el menú y gestiona horarios automáticamente.',
        icon: UtensilsIcon,
        features: ['Reservas 24/7', 'Menú interactivo', 'Recordatorios'],
        link: '/servicios#restaurantes',
        images: [RestoHome, RestoBot, RestoReservas]
    },
    {
        id: 'realestate',
        title: 'Inmobiliarias',
        description: 'Califica leads, agenda visitas y responde consultas sobre propiedades.',
        icon: HomeIcon,
        features: ['Filtro de leads', 'Agenda visitas', 'CRM integrado'],
        link: '/servicios#inmobiliarias',
        images: [InmoHome, InmoAgenda, InmoPipeline]
    },
    {
        id: 'clinic',
        title: 'Clínicas',
        description: 'Agenda turnos médicos, envía recordatorios y gestiona cancelaciones.',
        icon: StethoscopeIcon,
        features: ['Gestión de turnos', 'Historial pacientes', 'Multiespecialidad'],
        link: '/servicios#clinicas',
        images: [ClinicaHome, ClinicaAgenda]
    },
    {
        id: 'ecommerce',
        title: 'E-commerce',
        description: 'Asesora en compras, resuelve dudas y recupera carritos abandonados.',
        icon: ShoppingBagIcon,
        features: ['Recupero carritos', 'Recomendaciones', 'Seguimiento'],
        link: '/servicios#ecommerce',
        images: [EcomHome, EcomProductos]
    },
];

const CUSTOM_SOLUTIONS_EXAMPLES = [
    { icon: GraduationCap, title: 'Educación', desc: 'Inscripciones y consultas académicas.' },
    { icon: Scale, title: 'Legal', desc: 'Agenda y calificación de consultas.' },
    { icon: Factory, title: 'Manufactura', desc: 'Reportes de producción integrados a ERP.' },
    { icon: Truck, title: 'Logística', desc: 'Tracking y notificaciones automáticas.' },
];

const STATS = [
    { value: '+500', label: 'Negocios Automatizados' },
    { value: '+50k', label: 'Clientes Atendidos/mes' },
    { value: '97%', label: 'Satisfacción' },
    { value: '24/7', label: 'Disponibilidad' },
];

const TESTIMONIALS: Testimonial[] = [
    {
        name: 'Martín Ramirez',
        role: 'Socio Fundador',
        business: 'El Gran Bodegón',
        content: 'Pasamos de perder 30% de reservas a tener 98% de ocupación. Verza responde al instante y la gente ama la inmediatez.',
        stars: 5,
        image: 'https://randomuser.me/api/portraits/men/41.jpg'
    },
    {
        name: 'Sofía Ferrari',
        role: 'Gerente Comercial',
        business: 'Ferrari Propiedades',
        content: 'Antes tardaba 2hs diarias en responder consultas. Ahora Verza califica los leads y solo me reúno con clientes reales.',
        stars: 5,
        image: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    {
        name: 'Dr. Alejandro Viale',
        role: 'Director Médico',
        business: 'Centro Médico Vitalis',
        content: 'El ROI fue inmediato. Redujimos el ausentismo un 40% gracias a los recordatorios automáticos de turnos.',
        stars: 5,
        image: 'https://randomuser.me/api/portraits/men/62.jpg'
    },
];

const STEPS = [
    { icon: Phone, title: "Consultá", desc: "Agendá una llamada de 15 min gratis donde analizamos tus necesidades.", time: "15 min" },
    { icon: Settings, title: "Configuramos", desc: "Adaptamos Verza a tu negocio, entrenamos la IA y configuramos tu dashboard.", time: "24-48 hs" },
    { icon: Rocket, title: "Activamos", desc: "Conectamos Verza a tu WhatsApp y comenzás a recibir clientes atendidos automáticamente.", time: "Inmediato" },
];

const FAQS = [
    { question: "¿Cómo funciona la integración con WhatsApp?", answer: "Nos conectamos directamente a la API oficial de WhatsApp Business, permitiendo que Verza responda automáticamente sin que tengas que tener el celular prendido." },
    { question: "¿Qué tipo de proyectos personalizados pueden desarrollar?", answer: "Desarrollamos asistentes para cualquier industria y flujo de trabajo. Hemos creado soluciones para educación, legal, manufactura, logística, hotelería y más. Si tenés una necesidad específica, agendá una llamada y analizamos juntos cómo resolverla." },
    { question: "¿Cuánto tiempo toma un proyecto a medida?", answer: "Depende de la complejidad. Proyectos simples pueden estar listos en 1-2 semanas. Proyectos más complejos con múltiples integraciones pueden tomar 4-8 semanas. En la llamada de discovery te damos un timeline específico." },
    { question: "¿Pueden integrarse con mi software actual?", answer: "Sí, nos integramos con la mayoría de sistemas: ERPs (SAP, Odoo), CRMs (Salesforce, HubSpot), sistemas de gestión propios, bases de datos, APIs externas y más." },
    { question: "¿Necesito conocimientos técnicos?", answer: "No, nosotros nos encargamos de toda la implementación técnica. Vos solo necesitás contarnos sobre tu negocio y en 48hs tenés tu asistente funcionando." },
    { question: "¿Qué pasa si Verza no sabe responder algo?", answer: "Verza está entrenado para detectar cuándo no sabe una respuesta y derivar la conversación a un humano, o pedirte que intervengas, notificándote al instante." },
    { question: "¿Cómo es el proceso de un proyecto personalizado?", answer: "1. Llamada de discovery (gratis). 2. Propuesta técnica y comercial. 3. Desarrollo iterativo con tu feedback. 4. Testing con tu equipo. 5. Deploy, capacitación y soporte continuo." },
    { question: "¿Tienen período de prueba?", answer: "Ofrecemos una demo gratuita y garantías de satisfacción en el primer mes. Si no estás conforme, revisamos la implementación." },
];

// Icons wrappers for Services
function UtensilsIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg> }
function HomeIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> }
function StethoscopeIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" /><path d="M8 15v6" /><path d="M16 15v6" /><path d="M12 3v13" /><path d="M12 21v2" /></svg> }
function ShoppingBagIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg> }

const FLOATING_CHATS = [
    { left: '5%', delay: 0, duration: 25, scale: 0.8 },
    { left: '85%', delay: 5, duration: 28, scale: 0.7 },
    { left: '15%', delay: 10, duration: 30, scale: 0.6 },
    { left: '75%', delay: 2, duration: 22, scale: 0.9 },
    { left: '45%', delay: 15, duration: 35, scale: 0.5 },
    { left: '60%', delay: 8, duration: 26, scale: 0.8 },
    { left: '25%', delay: 18, duration: 29, scale: 0.7 },
    { left: '90%', delay: 12, duration: 24, scale: 0.6 },
];

const Typewriter = ({ words, wait = 3000 }: { words: string[], wait?: number }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const timeout2 = setTimeout(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearTimeout(timeout2);
    }, [blink]);

    useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
            setReverse(true);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 75 : subIndex === words[index].length ? wait : 150, parseInt(String(Math.random() * 350))));

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words, wait]);

    return (
        <span className="text-brand-cyan inline-block min-w-[2ch] align-bottom">
            {words[index].substring(0, subIndex)}
            <span className={`${blink ? "opacity-100" : "opacity-0"} transition-opacity duration-100 ml-1 text-white`}>|</span>
        </span>
    );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group hover:text-brand-cyan transition-colors"
            >
                <span className="text-lg font-medium pr-8">{question}</span>
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-cyan' : 'text-brand-gray'}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-brand-gray leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const Home: React.FC = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 md:pt-48 pb-20">
                {/* Abstract BacFverkground */}
                <div className="absolute inset-0 bg-[#0A0A0F]">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.1),transparent_50%)]"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[100px] animate-blob"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-violet/5 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                    {/* Grid effect */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="absolute inset-0 animate-grid-move" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    {/* Floating Chat Bubbles Effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {FLOATING_CHATS.map((chat, i) => (
                            <motion.div
                                key={i}
                                className="absolute bottom-[-150px] w-64 p-4 rounded-2xl rounded-bl-sm bg-white/[0.1] border border-white/[0.2] backdrop-blur-[1px]"
                                style={{
                                    left: chat.left,
                                    scale: chat.scale,
                                }}
                                animate={{
                                    y: [-50, -1200],
                                    opacity: [0, 5, 0],
                                }}
                                transition={{
                                    duration: chat.duration,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    ease: "linear",
                                    delay: chat.delay,
                                }}
                            >
                                <div className="flex gap-3 text-white/40">
                                    <div className="w-8 h-8 rounded-full bg-current opacity-50" />
                                    <div className="flex-1 space-y-2 py-1">
                                        <div className="h-2 w-3/4 bg-current opacity-50 rounded" />
                                        <div className="h-2 w-1/2 bg-current opacity-50 rounded" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-transparent to-[#0A0A0F]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.2,
                                    delayChildren: 0.1
                                }
                            }
                        }}
                        className="flex flex-col items-center"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: -20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-dark/50 border border-white/10 mb-8 backdrop-blur-md shadow-lg"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
                            </span>
                            <span className="text-sm font-medium text-white tracking-wide">🚀 +80.000 respuestas automatizadas</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-8 tracking-tight"
                        >
                            LA PLATAFORMA QUE<br />
                            <Typewriter words={['AGILIZA', 'CENTRALIZA', 'POTENCIA', 'ESCALA']} /> TU NEGOCIO
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { duration: 0.8 } }
                            }}
                            className="text-lg md:text-xl text-brand-gray mb-10 max-w-2xl mx-auto leading-relaxed"
                        >
                            Verza atiende, reserva, vende y fideliza clientes mientras vos dormís. Sin código. Implementación en 48hs.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                            className="flex flex-col sm:flex-row gap-4 mb-20"
                        >
                            <Link
                                to="/contacto"
                                className="px-8 py-4 rounded-lg bg-brand-cyan text-brand-black font-bold text-lg hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all text-center min-w-[200px] hover:scale-105"
                            >
                                Agendar Demo Gratis
                            </Link>
                            <Link
                                to="#como-funciona"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="px-8 py-4 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2 min-w-[200px]"
                            >
                                Ver Cómo Funciona
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Chat Demo */}

                </div>
            </section>

            {/* Tech Stack Bar */}
            <section className="py-10 border-y border-white/5 bg-brand-dark overflow-hidden relative z-20">
                <div className="container mx-auto px-6 mb-6 text-center">
                    <p className="text-brand-gray text-xs font-bold uppercase tracking-[0.2em]">Potenciado por las mejores tecnologías</p>
                </div>
                <div className="relative w-full overflow-hidden mask-gradient-x">
                    <div className="flex animate-scroll whitespace-nowrap">
                        {[...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
                            <div key={index} className="mx-8 text-2xl font-display font-bold text-white/20 hover:text-brand-cyan transition-colors cursor-default">
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Versa Detailed Features (ZigZag) */}
            <section className="py-24 bg-brand-black border-t border-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">

                    {/* Feature 1: Intro / Video */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer">
                                <div className="absolute inset-0 bg-brand-cyan/20 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                {/* Video Placeholder Mock */}
                                <div className="aspect-video bg-brand-dark flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-black/80 to-transparent"></div>
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform z-10">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                            <div className="h-full w-1/3 bg-brand-cyan"></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-white/60 mt-2 font-mono">
                                            <span>00:24</span>
                                            <span>01:30</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold uppercase tracking-wider mb-6 border border-blue-500/20">
                                <span className="flex items-center gap-2"><Zap size={16} /> VIDEO DEMO</span>
                            </div>
                            <h3 className="text-4xl font-display font-bold mb-6">¿Qué es Verza?</h3>
                            <p className="text-brand-gray text-lg leading-relaxed mb-6">
                                Verza no es solo un chatbot; es una plataforma de <strong>Marketing Conversacional</strong> diseñada para convertir. Transformamos tus canales de atención en máquinas automáticas de ventas y reservas, manteniendo siempre un trato cálido y humano que fideliza a tus clientes.
                            </p>
                        </motion.div>
                    </div>

                    {/* Feature 2: Omnichannel (Reversed) - REDESIGNED */}
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24 mb-32 relative">
                        {/* Background Element for this section */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2 relative perspective-1000"
                        >
                            {/* Dashboard Container with 3D feel */}
                            <div className="relative transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-[0deg] hover:rotate-x-[0deg] transition-transform duration-700 preserve-3d">

                                {/* Glow behind */}
                                <div className="absolute inset-0 bg-brand-cyan/20 blur-2xl -z-10 transform translate-z-[-20px]"></div>

                                {/* Main Dashboard Image */}
                                <div className="relative rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-[#0F0F13]">
                                    <div className="absolute top-0 left-0 right-0 h-6 bg-[#1A1A23] flex items-center px-4 gap-2 border-b border-white/5 z-20">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                    </div>
                                    <img
                                        src={InmoContacto}
                                        alt="Versa Omnicanal Dashboard"
                                        className="w-full h-auto pt-6 opacity-90"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent pointer-events-none"></div>
                                </div>

                                {/* Floating Elements - Connected Nodes */}
                                <div className="absolute -right-8 top-20 z-30 transform translate-z-[30px] animate-float">
                                    <div className="flex items-center gap-3 bg-[#25D366]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl border border-white/10">
                                        <div className="bg-white text-[#25D366] p-1 rounded-full"><Phone size={14} fill="currentColor" /></div>
                                        <span className="font-bold text-sm">WhatsApp</span>
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                                    </div>
                                </div>

                                <div className="absolute -left-8 bottom-32 z-30 transform translate-z-[40px] animate-float animation-delay-2000">
                                    <div className="flex items-center gap-3 bg-gradient-to-tr from-[#FF903E] via-[#FF0663] to-[#9934B8] backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl border border-white/10">
                                        <div className="bg-white/20 p-1 rounded-full"><ImageIcon size={14} /></div>
                                        <span className="font-bold text-sm">Instagram</span>
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Live Status Badge */}
                                <div className="absolute bottom-6 right-6 z-20 bg-brand-black/80 backdrop-blur-md border border-brand-cyan/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></div>
                                    <span className="text-xs font-mono text-brand-cyan tracking-wider">SYSTEM ONLINE</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-1 bg-brand-cyan rounded-full"></div>
                                <span className="text-brand-cyan font-bold tracking-widest text-sm uppercase">Central Unificada</span>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                                Todo tu equipo en <br />
                                <span className="text-brand-cyan">una sola pantalla</span>
                            </h3>

                            <p className="text-brand-gray text-lg leading-relaxed mb-10">
                                Olvidate de las pestañas infinitas. Verza fusiona WhatsApp, Instagram y Web en una <strong>central de mando inteligente</strong>. Visualizá todas las conversaciones en tiempo real y asigná tareas automáticamente.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors group">
                                    <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mb-3 group-hover:scale-110 transition-transform">
                                        <Users size={20} />
                                    </div>
                                    <h4 className="font-bold text-white mb-1">Inbox Colaborativo</h4>
                                    <p className="text-sm text-brand-gray">Múltiples agentes respondiendo al mismo tiempo.</p>
                                </div>

                                <div className="bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors group">
                                    <div className="w-10 h-10 rounded-lg bg-brand-violet/10 flex items-center justify-center text-brand-violet mb-3 group-hover:scale-110 transition-transform">
                                        <Brain size={20} />
                                    </div>
                                    <h4 className="font-bold text-white mb-1">IA + Humanos</h4>
                                    <p className="text-sm text-brand-gray">La IA responde lo simple, vos cerrás lo importante.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Feature 3: Audit (Normal) - REDESIGNED */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative">
                        {/* Background Splashes */}
                        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-violet/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2 relative perspective-1000"
                        >
                            <div className="relative transform rotate-y-[5deg] rotate-x-[5deg] hover:rotate-y-[0deg] hover:rotate-x-[0deg] transition-transform duration-700 preserve-3d">
                                {/* Glow behind */}
                                <div className="absolute inset-0 bg-brand-violet/20 blur-2xl -z-10 transform translate-z-[-20px]"></div>

                                <div className="relative rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-[#0F0F13]">
                                    <div className="absolute top-0 left-0 right-0 h-6 bg-[#1A1A23] flex items-center px-4 gap-2 border-b border-white/5 z-20">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                    </div>
                                    <img
                                        src={RestoHome}
                                        alt="Verza Dashboard Audit"
                                        className="w-full h-auto pt-6 opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent pointer-events-none"></div>
                                </div>

                                {/* Floating Stats Card */}
                                <div className="absolute -right-6 bottom-12 z-30 transform translate-z-[50px] animate-float">
                                    <div className="bg-[#1A1A23]/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl min-w-[180px]">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-brand-gray font-bold">Rendimiento</span>
                                            <BarChart3 size={14} className="text-green-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">+124%</div>
                                        <div className="text-xs text-green-400 font-medium flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> Optimizado
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Live Badge */}
                                <div className="absolute -left-4 top-24 z-30 transform translate-z-[30px] animate-float animation-delay-2000">
                                    <div className="bg-brand-violet/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-xl border border-white/10 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                                        <span className="text-sm font-bold text-white">Auditoría en Vivo</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-1 bg-brand-violet rounded-full"></div>
                                <span className="text-brand-violet font-bold tracking-widest text-sm uppercase">Control & Métricas</span>
                            </div>

                            <h3 className="text-4xl font-display font-bold mb-6">Control total, <br /><span className="text-brand-cyan">en tiempo real</span></h3>

                            <p className="text-brand-gray text-lg leading-relaxed mb-10">
                                Ganale a la incertidumbre. Visualizá cada conversación activa, detectá cuellos de botella y auditá el rendimiento de tu equipo comercial al instante. Con Verza, las decisiones se toman con datos.
                            </p>

                            <Link
                                to="/contacto"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-cyan text-brand-black font-bold text-lg rounded-xl hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:scale-105 transition-all duration-300"
                            >
                                Agendar Demo Gratis
                                <ArrowRight size={20} />
                            </Link>

                        </motion.div>
                    </div>

                </div>
            </section>

            {/* Marketing Campaigns Section */}
            <section id="campanas" className="py-24 bg-brand-dark relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-sm tracking-wider mb-6"
                        >
                            <span className="flex items-center gap-2"><Zap size={16} /> NUEVO: MARKETING POR WHATSAPP</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-display font-bold mb-6"
                        >
                            <span className="text-brand-cyan">Campañas Masivas</span> que convierten
                        </motion.h2>
                        <p className="text-xl text-brand-gray max-w-2xl mx-auto">
                            Llegá directo al bolsillo de tus clientes. Comunicá promociones, novedades y publicidad con una tasa de apertura del 98%.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                        {/* Campaign Feature 1: Multimedia & Massive */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-brand-black/50 border border-white/5 rounded-3xl p-8 overflow-hidden relative group"
                        >
                            <div className="absolute top-0 right-0 p-20 bg-brand-cyan/5 blur-[60px] rounded-full group-hover:bg-brand-cyan/10 transition-colors"></div>

                            <div className="mb-8 relative z-10">
                                <div className="p-3 bg-brand-cyan/10 rounded-xl w-fit mb-6 text-brand-cyan">
                                    <ImageIcon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white">Impacto Visual Inmediato</h3>
                                <p className="text-brand-gray leading-relaxed mb-6">
                                    No envíes solo texto aburrido. Con Verza podés adjuntar <strong>imágenes promocionales, flyers o catálogos</strong> a tus difusiones. Ideal para lanzamientos de productos, menús especiales o liquidaciones.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-brand-gray/80">
                                        <Check className="text-green-400" size={16} /> Envío de imágenes y PDFs
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-brand-gray/80">
                                        <Check className="text-green-400" size={16} /> Botones de acción (Call-to-Action)
                                    </li>
                                </ul>
                            </div>

                            {/* Mini UI Mockup */}
                            <div className="relative bg-[#1A1A23] rounded-xl p-4 border border-white/5 shadow-2xl skew-y-2 transform translate-y-4 group-hover:translate-y-2 transition-transform">
                                <div className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded-full bg-brand-cyan"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="bg-[#2a2a35] rounded-lg rounded-tl-none p-3 text-sm text-white/90">
                                            <div className="w-full h-32 bg-brand-dark rounded-md mb-2 overflow-hidden relative">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-transparent"></div>
                                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-[10px] text-white font-bold">50% OFF</div>
                                            </div>
                                            <p>¡Hola Ana! 👋 Llegó la nueva colección de verano. Aprovechá el descuento exclusivo para clientes VIP.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Campaign Feature 2: Segmentation & Scheduling */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-brand-black/50 border border-white/5 rounded-3xl p-8 overflow-hidden relative group"
                        >
                            <div className="absolute top-0 right-0 p-20 bg-brand-violet/5 blur-[60px] rounded-full group-hover:bg-brand-violet/10 transition-colors"></div>

                            <div className="mb-8 relative z-10">
                                <div className="p-3 bg-brand-violet/10 rounded-xl w-fit mb-6 text-brand-violet">
                                    <Users size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white">Segmentación y Programación</h3>
                                <p className="text-brand-gray leading-relaxed mb-6">
                                    La clave es la relevancia. Filtrá tu base de datos por <strong>etiquetas (Vips, Nuevos, Deudores)</strong> y programá el envío para el momento exacto donde tu cliente está activo.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-brand-gray/80">
                                        <Clock className="text-brand-violet" size={16} /> Programación de fecha y hora
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-brand-gray/80">
                                        <Users className="text-brand-violet" size={16} /> Filtros por etiquetas y comportamiento
                                    </li>
                                </ul>
                            </div>

                            {/* Scheduler UI Mockup */}
                            <div className="relative mt-auto">
                                <img
                                    src={InmoCampanas}
                                    alt="Panel de Campañas"
                                    className="rounded-xl border border-white/10 shadow-2xl w-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute -bottom-4 -right-4 bg-brand-dark p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-4 animate-bounce hover:pause">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <Rocket size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-brand-gray font-bold">Campaña Enviada</div>
                                        <div className="text-white font-bold">1,240 Destinatarios</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Smart Bot Configuration Section */}
            <section id="bots" className="py-24 bg-black relative border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <div className="inline-block px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan font-bold text-sm tracking-wider mb-6">
                            <span className="flex items-center gap-2"><Brain size={16} /> CEREBRO ENTRENADO</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Un cerebro entrenado <br className="hidden md:block" /> a la medida de tu negocio
                        </h2>
                        <p className="text-xl text-brand-gray max-w-2xl mx-auto">
                            Verza no es un bot genérico. Lo configurás con tu información, tus reglas y las acciones específicas que necesitás que realice.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Knowledge Base */}
                        <div className="bg-brand-dark border border-white/5 rounded-3xl p-8 hover:border-brand-violet/50 transition-colors group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-brand-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="w-14 h-14 rounded-2xl bg-brand-violet/10 flex items-center justify-center text-brand-violet mb-6 group-hover:scale-110 transition-transform duration-300">
                                <FileText size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Base de Conocimiento</h3>
                            <p className="text-brand-gray mb-6 leading-relaxed">
                                Cargá tus menús, listas de precios, preguntas frecuentes y manuales operativos. Verza lee y procesa documentos (PDF, Doc) para responder con la precisión de un experto.
                            </p>
                            <div className="bg-black/50 rounded-xl p-4 border border-white/5">
                                <div className="flex items-center gap-3 text-sm text-white/70 mb-2">
                                    <FileText size={14} className="text-brand-cyan" /> menu_invierno_2025.pdf
                                </div>
                                <div className="flex items-center gap-3 text-sm text-white/70">
                                    <FileText size={14} className="text-brand-cyan" /> politicas_de_envio.pdf
                                </div>
                            </div>
                        </div>

                        {/* Rules & Logic */}
                        <div className="bg-brand-dark border border-white/5 rounded-3xl p-8 hover:border-brand-cyan/50 transition-colors group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Sliders size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Reglas e Instrucciones</h3>
                            <p className="text-brand-gray mb-6 leading-relaxed">
                                Definí el comportamiento. ¿Qué tono de voz usar? ¿Qué hacer si un cliente está enojado? ¿Cuándo derivar a un humano? Vos tenés el control total de las directivas.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-sm text-brand-gray">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    Hablar siempre de "vos"
                                </li>
                                <li className="flex items-center gap-2 text-sm text-brand-gray">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                    Nunca ofrecer descuentos {'>'} 20%
                                </li>
                                <li className="flex items-center gap-2 text-sm text-brand-gray">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    Priorizar productos en stock
                                </li>
                            </ul>
                        </div>

                        {/* Actions & Tools */}
                        <div className="bg-brand-dark border border-white/5 rounded-3xl p-8 hover:border-white/30 transition-colors group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Puzzle size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Acciones y Herramientas</h3>
                            <p className="text-brand-gray mb-6 leading-relaxed">
                                Verza no solo chatea, <strong>ejecuta</strong>. Conectalo a tus sistemas para agendar citas, chequear stock en tiempo real, generar links de pago o guardar leads en tu CRM.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-brand-cyan">crear_reserva()</span>
                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-brand-cyan">consultar_stock()</span>
                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-brand-cyan">enviar_catalogo()</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <motion.section
                id="industrias"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-24 bg-brand-dark relative"
            >
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <div className="inline-block px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan font-bold text-sm tracking-wider mb-6">
                            <span className="flex items-center gap-2"><Briefcase size={16} /> SOLUCIONES POR INDUSTRIA</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight relative z-10">
                            Verza se adapta <br className="hidden md:block" /> a <span className="text-brand-cyan">tu industria</span>
                        </h2>
                        <p className="text-xl text-brand-gray max-w-2xl mx-auto leading-relaxed">
                            Cada asistente está entrenado específicamente con datos de tu vertical de negocio.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {SERVICES.map((service) => (
                            <Link
                                id={service.id}
                                key={service.id}
                                to={service.link}
                                className="group relative bg-[#0F0F13] border border-white/5 rounded-[2rem] overflow-hidden hover:border-brand-cyan/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,245,255,0.1)] flex flex-col h-full"
                            >
                                {/* Image Preview / Header */}
                                <div className="h-80 overflow-hidden relative bg-brand-dark/50">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-[#0F0F13]/20 to-transparent z-10"></div>
                                    <div className="absolute inset-0 bg-brand-cyan/5 mix-blend-overlay z-10"></div>

                                    {service.images && service.images.length > 0 ? (
                                        <div className="flex transition-transform duration-700 hover:scale-105 h-full w-full">
                                            <img src={service.images[0]} alt={service.title} className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-brand-dark/50">
                                            <service.icon className="text-brand-gray/20" size={80} />
                                        </div>
                                    )}

                                    {/* Floating Icon */}
                                    <div className="absolute top-8 left-8 z-20">
                                        <div className="w-16 h-16 bg-brand-black/40 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                            <service.icon size={32} />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-10 pt-2 flex flex-col flex-grow relative z-20">
                                    <h3 className="text-4xl font-display font-bold text-white mb-4 group-hover:text-brand-cyan transition-colors">{service.title}</h3>
                                    <p className="text-brand-gray/80 mb-8 leading-relaxed text-lg font-medium">{service.description}</p>

                                    <ul className="space-y-4 mb-10 flex-grow">
                                        {service.features.map((feat, i) => (
                                            <li key={i} className="flex items-center gap-3 text-base text-brand-gray group/item">
                                                <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(0,245,255,0.5)] group-hover/item:scale-150 transition-transform"></div>
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center gap-2 text-brand-cyan font-bold text-lg group-hover:gap-4 transition-all duration-300">
                                        Ver solución completa <ArrowRight size={20} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.section>



            {/* Custom Solutions Section (NEW) */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-24 bg-brand-black relative"
            >
                <div className="container mx-auto px-6">
                    <div className="relative rounded-3xl overflow-hidden border border-brand-cyan/30 bg-gradient-to-br from-brand-dark to-brand-black p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        {/* Background effects */}
                        <div className="absolute top-0 right-0 p-40 bg-brand-violet/20 blur-[100px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-violet text-sm font-bold mb-4">
                                    <Sparkles size={16} /> SOLUCIONES A MEDIDA
                                </div>
                                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">¿Tu negocio es único? <span className="text-brand-cyan">Tu solución también.</span></h2>
                                <p className="text-brand-gray max-w-2xl mx-auto text-lg">Desarrollamos asistentes 100% personalizados para industrias y flujos de trabajo que van más allá de lo convencional.</p>
                            </div>

                            {/* Grid of Industries */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                                {CUSTOM_SOLUTIONS_EXAMPLES.map((item, i) => (
                                    <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors group">
                                        <item.icon className="text-brand-cyan mb-3 group-hover:scale-110 transition-transform" size={28} />
                                        <h3 className="font-bold mb-1 text-white">{item.title}</h3>
                                        <p className="text-sm text-brand-gray">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-t border-white/10 pt-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 w-full md:w-auto">
                                    <ul className="space-y-2">
                                        <li className="font-bold text-white mb-2 uppercase text-xs tracking-wider">Ideal Para:</li>
                                        <li className="text-sm text-brand-gray flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-violet rounded-full" /> Industrias especializadas</li>
                                        <li className="text-sm text-brand-gray flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-violet rounded-full" /> Flujos complejos</li>
                                        <li className="text-sm text-brand-gray flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-violet rounded-full" /> Integraciones ERP/CRM</li>
                                    </ul>
                                    <ul className="space-y-2">
                                        <li className="font-bold text-white mb-2 uppercase text-xs tracking-wider">Incluye:</li>
                                        <li className="text-sm text-brand-gray flex items-center gap-2"><Check className="text-brand-cyan" size={14} /> Análisis de requerimientos</li>
                                        <li className="text-sm text-brand-gray flex items-center gap-2"><Check className="text-brand-cyan" size={14} /> Integración custom</li>
                                        <li className="text-sm text-brand-gray flex items-center gap-2"><Check className="text-brand-cyan" size={14} /> SLA Garantizado</li>
                                    </ul>
                                </div>
                                <Link to="/contacto" className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-violet text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 transition-all whitespace-nowrap text-center">
                                    Agendar Discovery Call
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* How It Works */}
            <motion.section
                id="como-funciona"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-24 bg-brand-dark border-y border-white/5"
            >
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold mb-4">De cero a automatizado en 3 simples pasos</h2>
                        <p className="text-brand-gray">Proceso simplificado para que no pierdas tiempo.</p>
                    </div>

                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-brand-cyan/20 via-brand-cyan to-brand-cyan/20 z-0"></div>

                        {STEPS.map((step, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-24 h-24 rounded-2xl bg-brand-dark border border-brand-cyan/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,245,255,0.1)] group-hover:shadow-[0_0_40px_rgba(0,245,255,0.3)] transition-all duration-300 group-hover:-translate-y-2">
                                    <step.icon size={40} className="text-brand-cyan" />
                                </div>
                                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-brand-cyan mb-4">
                                    PASO 0{idx + 1}
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4">{step.title}</h3>
                                <p className="text-brand-gray mb-4 leading-relaxed max-w-xs">{step.desc}</p>
                                <div className="flex items-center gap-2 text-sm font-bold text-white">
                                    <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
                                    {step.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>



            {/* Testimonials */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-24 bg-brand-black"
            >
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-display font-bold text-center mb-16">Lo que dicen nuestros clientes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((testi, idx) => (
                            <div key={idx} className="bg-brand-dark p-8 rounded-2xl border border-white/5 relative hover:border-brand-cyan/30 transition-colors">
                                <div className="flex gap-1 text-yellow-400 mb-6">
                                    {[...Array(testi.stars)].map((_, i) => <span key={i}>★</span>)}
                                </div>
                                <p className="text-white mb-6 leading-relaxed">"{testi.content}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-cyan/20">
                                        {testi.image ? (
                                            <img src={testi.image} alt={testi.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-tr from-brand-cyan to-brand-violet"></div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">{testi.name}</div>
                                        <div className="text-brand-gray text-xs">{testi.role}, {testi.business}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* FAQ Section */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-24 bg-brand-dark"
            >
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold mb-4">Preguntas Frecuentes</h2>
                        <p className="text-brand-gray">Todo lo que necesitás saber antes de empezar.</p>
                    </div>

                    <div className="space-y-2">
                        {FAQS.map((faq, idx) => (
                            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* CTA Final */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto px-6 relative z-10 text-center"
                >
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">¿Listo para automatizar?</h2>
                    <p className="text-xl text-brand-gray mb-12 max-w-2xl mx-auto">
                        Agendá una demo gratuita de 15 minutos y descubrí cómo multiplicar tus resultados sin aumentar tu equipo.
                    </p>
                    <Link
                        to="/contacto"
                        className="inline-block px-12 py-5 rounded-full bg-brand-cyan text-brand-black font-bold text-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all duration-300"
                    >
                        AGENDAR DEMO GRATIS
                    </Link>
                    <p className="mt-6 text-sm text-brand-gray">Sin compromiso • Implementación en 48hs</p>
                </motion.div>
            </section>
        </>
    );
};