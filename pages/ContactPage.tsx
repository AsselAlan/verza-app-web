import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  message: string;
};

export const ContactPage: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('idle');
    try {
      const response = await fetch("https://formsubmit.co/ajax/hola@verza.app", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          _subject: `Nuevo contacto web de ${data.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="pt-40 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Info Side */}
          <div>
            <h1 className="text-5xl font-display font-bold mb-6">Hablemos</h1>
            <p className="text-brand-gray text-lg mb-12">
              ¿Tenés un proyecto en mente? Escribinos y te respondemos en menos de 24hs. Estamos listos para llevar tu negocio al siguiente nivel.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-dark rounded-lg border border-white/10">
                  <MapPin className="text-brand-cyan" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Ubicación</h3>
                  <p className="text-brand-gray">Buenos Aires, Argentina</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-dark rounded-lg border border-white/10">
                  <Mail className="text-brand-cyan" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Email</h3>
                  <a href="mailto:hola@verza.app" className="text-brand-gray hover:text-brand-cyan transition-colors">hola@verza.app</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-dark rounded-lg border border-white/10">
                  <Phone className="text-brand-cyan" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Horario</h3>
                  <p className="text-brand-gray">Lun-Vie: 9:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-brand-dark p-8 md:p-10 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                ¡Gracias! Hemos recibido tu mensaje. Te contactaremos pronto.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                Hubo un error al enviar el mensaje. Por favor intenta nuevamente o escribinos por email.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-2">Nombre Completo</label>
                <input
                  {...register("name", { required: true })}
                  className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-cyan transition-colors"
                  placeholder="Tu nombre"
                />
                {errors.name && <span className="text-red-500 text-xs mt-1">Requerido</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-gray mb-2">Email</label>
                  <input
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-cyan transition-colors"
                    placeholder="tu@email.com"
                  />
                  {errors.email && <span className="text-red-500 text-xs mt-1">Email inválido</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-gray mb-2">Teléfono</label>
                  <input
                    {...register("phone")}
                    className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-cyan transition-colors"
                    placeholder="+54 9..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-gray mb-2">Tipo de Negocio</label>
                <select
                  {...register("businessType", { required: true })}
                  className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-cyan transition-colors text-white"
                >
                  <option value="">Seleccioná una opción</option>
                  <option value="restaurante">Restaurante / Gastronomía</option>
                  <option value="inmobiliaria">Inmobiliaria</option>
                  <option value="clinica">Clínica / Salud</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-gray mb-2">Mensaje</label>
                <textarea
                  {...register("message", { required: true })}
                  rows={4}
                  className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-cyan transition-colors"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
                {errors.message && <span className="text-red-500 text-xs mt-1">Requerido</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-cyan text-brand-black font-bold py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : (
                  <>ENVIAR MENSAJE <Send size={18} /></>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};