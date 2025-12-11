import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Target, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
    return (
        <div className="pt-32 pb-24">
            {/* Hero */}
            <section className="container mx-auto px-6 mb-32 text-center">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-6xl md:text-8xl font-display font-bold mb-8"
                >
                    Somos <span className="text-brand-cyan">VERZA</span>
                </motion.h1>
                <p className="text-xl md:text-2xl text-brand-gray max-w-3xl mx-auto leading-relaxed">
                    Ayudamos a negocios a escalar con inteligencia artificial. No somos solo una agencia de software, somos tu socio tecnológico estratégico.
                </p>
            </section>

            {/* Mission / Vision */}
            <section className="container mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-brand-dark p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-brand-cyan/5 blur-[80px] rounded-full group-hover:bg-brand-cyan/10 transition-colors"></div>
                        <div className="relative z-10">
                            <Target className="text-brand-cyan mb-6" size={48} />
                            <h2 className="text-3xl font-display font-bold mb-6">Nuestra Misión</h2>
                            <p className="text-brand-gray text-lg leading-relaxed">
                                Democratizar el acceso a la automatización y la inteligencia artificial para negocios de todos los tamaños. Creemos que la IA no debe ser un lujo de grandes corporaciones, sino una herramienta accesible para potenciar a cualquier emprendedor.
                            </p>
                        </div>
                    </div>
                    <div className="bg-brand-dark p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-brand-violet/5 blur-[80px] rounded-full group-hover:bg-brand-violet/10 transition-colors"></div>
                        <div className="relative z-10">
                            <Zap className="text-brand-violet mb-6" size={48} />
                            <h2 className="text-3xl font-display font-bold mb-6">Nuestra Visión</h2>
                            <p className="text-brand-gray text-lg leading-relaxed">
                                Ser la agencia de automatización líder en Latinoamérica, logrando que cada negocio, sin importar su rubro, cuente con un asistente virtual inteligente que le permita a sus dueños enfocarse en lo que realmente importa: crecer y vivir mejor.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder */}
            <section className="container mx-auto px-6 mb-32">
                <div className="bg-gradient-to-br from-brand-dark to-black p-12 md:p-20 rounded-[3rem] border border-white/10 relative overflow-hidden">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                        <div className="order-2 md:order-1">
                            <h2 className="text-sm font-bold text-brand-cyan tracking-wider mb-2">FOUNDER & CEO</h2>
                            <h3 className="text-4xl md:text-5xl font-display font-bold mb-8">Alan Assel</h3>
                            <div className="space-y-6 text-brand-gray text-lg leading-relaxed mb-10">
                                <p>
                                    Desarrollador y arquitecto de software apasionado por la inteligencia artificial y la optimización de procesos.
                                </p>
                                <p>
                                    "Creé Verza porque vi demasiados dueños de negocios esclavizados por tareas repetitivas. La tecnología hoy nos permite liberar ese tiempo. Mi objetivo es darte esa libertad."
                                </p>
                            </div>
                            <div className="flex gap-6">
                                <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-brand-cyan transition-colors"><Linkedin size={24} /></a>
                                <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-brand-cyan transition-colors"><Twitter size={24} /></a>
                                <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-brand-cyan transition-colors"><Github size={24} /></a>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 flex justify-center">
                            <div className="relative w-72 h-72 md:w-96 md:h-96">
                                <div className="absolute inset-0 bg-brand-cyan/20 blur-[50px] rounded-full animate-blob"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    alt="Alan Assel"
                                    className="w-full h-full object-cover rounded-full border-4 border-brand-dark/50 relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-display font-bold mb-4">Nuestros Valores</h2>
                    <p className="text-brand-gray">Los pilares que sostienen cada línea de código que escribimos.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Innovación Constante', desc: 'Nunca dejamos de aprender. Si sale una nueva tecnología, la probamos.' },
                        { title: 'Transparencia Total', desc: 'Sin letras chicas. Te decimos qué se puede hacer y qué no.' },
                        { title: 'Resultados Reales', desc: 'No vendemos humo. Vendemos eficiencia medible en números.' },
                        { title: 'Soporte Humano', desc: 'Vendemos bots, pero nos comportamos como humanos. Siempre vamos a estar ahí.' },
                        { title: 'Calidad Premium', desc: 'No hacemos "MVPs" feos. Entregamos productos pulidos y hermosos.' },
                        { title: 'Foco en el Cliente', desc: 'Tu negocio es único, y nuestra solución se adapta a vos, no al revés.' }
                    ].map((val, i) => (
                        <div key={i} className="p-8 bg-brand-dark rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                            <Heart className="text-brand-violet mb-4" size={24} />
                            <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                            <p className="text-brand-gray text-sm leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-6 mt-32 text-center">
                <div className="p-16 rounded-[3rem] bg-brand-cyan/10 border border-brand-cyan/20">
                    <h2 className="text-4xl font-display font-bold mb-8">¿Querés formar parte de esta revolución?</h2>
                    <div className="flex justify-center gap-6">
                        <Link to="/contacto" className="px-8 py-4 bg-brand-cyan text-black font-bold rounded-full hover:scale-105 transition-transform">
                            Trabajá con nosotros
                        </Link>
                        <Link to="/contacto" className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors">
                            Contactanos
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
