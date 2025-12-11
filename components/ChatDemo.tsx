import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Utensils, Home, Stethoscope, ShoppingBag } from 'lucide-react';
import { ChatScenario, ChatMessage } from '../types';

const SCENARIOS: Record<string, ChatScenario> = {
  restaurant: {
    id: 'restaurant',
    name: 'Restaurante',
    businessName: 'La Buena Mesa',
    color: '#F97316', // Orange
    initialMessage: "¡Hola! Soy el asistente virtual de La Buena Mesa. ¿En qué puedo ayudarte hoy?",
    suggestions: ["Ver menú", "Hacer reserva", "Horarios"],
    responses: {
      "menú": "¡Por supuesto! Aquí tienes nuestro menú digital actualizado: [Link Menú]. Te recomiendo especialmente nuestro ojo de bife a las brasas.",
      "reserva": "¡Genial! Para agendar tu reserva, ¿para cuántas personas sería y qué día prefieres?",
      "horarios": "Estamos abiertos de Martes a Domingo de 19:00 a 00:00hs. ¿Te gustaría reservar?",
      "personas": "Perfecto. ¿A qué hora te gustaría venir?",
      "mesa": "Perfecto. ¿A qué hora te gustaría venir?",
    },
    fallback: "Entiendo. ¿Te gustaría que te comunique con un humano o prefieres ver nuestras opciones de reserva?"
  },
  realestate: {
    id: 'realestate',
    name: 'Inmobiliaria',
    businessName: 'Inmobiliaria Centro',
    color: '#3B82F6', // Blue
    initialMessage: "Hola, soy el asistente de Inmobiliaria Centro. ¿Estás buscando comprar, alquilar o vender?",
    suggestions: ["Alquilar depto", "Comprar casa", "Tasación"],
    responses: {
      "alquilar": "Tenemos excelentes opciones de alquiler. ¿Qué zona te interesa y cuál es tu presupuesto aproximado?",
      "comprar": "¡Perfecto! Contamos con un amplio catálogo. ¿Buscas casa o departamento?",
      "zona": "Esa es una zona muy solicitada. Tengo 3 opciones disponibles allí. ¿Te gustaría coordinar una visita?",
      "visita": "¡Excelente! ¿Te queda bien este Jueves a las 16hs?",
    },
    fallback: "Puedo tomar tus datos para que un agente te contacte a la brevedad."
  },
  clinic: {
    id: 'clinic',
    name: 'Clínica',
    businessName: 'Clínica Sonrisas',
    color: '#06B6D4', // Cyan
    initialMessage: "Bienvenido a Clínica Sonrisas. ¿Necesitas agendar un turno o tienes una consulta?",
    suggestions: ["Agendar turno", "Cancelar turno", "Precios"],
    responses: {
      "turno": "Claro. ¿Para qué especialidad necesitas el turno? (Odontología, Ortodoncia, Limpieza)",
      "precios": "Los precios varían según el tratamiento. La consulta inicial bonificada. ¿Quieres agendar?",
      "odontología": "Tengo disponibilidad para mañana a las 15:00hs o el Jueves a las 10:00hs. ¿Cuál prefieres?",
      "ortodoncia": "Tengo disponibilidad para el viernes por la mañana. ¿Te sirve?",
    },
    fallback: "Si es una urgencia, por favor llama al 0800-URGENCIA."
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-commerce',
    businessName: 'TechStore',
    color: '#8B5CF6', // Violet
    initialMessage: "¡Hola! Soy el asistente de TechStore. ¿En qué puedo ayudarte con tu compra?",
    suggestions: ["Estado de pedido", "Recomendación", "Devoluciones"],
    responses: {
      "pedido": "Por favor indícame tu número de pedido para verificar el estado.",
      "recomendación": "¿Qué tipo de producto estás buscando hoy? (Laptops, Audio, Accesorios)",
      "laptops": "Para trabajo pesado te recomiendo la Pro X1. ¿Te gustaría ver las especificaciones?",
      "audio": "Tenemos los nuevos NoiseCancelling 500 en oferta. ¿Te interesa?",
    },
    fallback: "Puedo pasarte con un asesor humano si tu consulta es muy específica."
  }
};

const ICONS = {
  restaurant: Utensils,
  realestate: Home,
  clinic: Stethoscope,
  ecommerce: ShoppingBag,
};

export const ChatDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('restaurant');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentScenario = SCENARIOS[activeTab];

  useEffect(() => {
    // Reset chat when tab changes
    setMessages([{ id: 'init', role: 'bot', text: currentScenario.initialMessage }]);
  }, [activeTab]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    /* 
       NOTE FOR DEVELOPERS:
       To integrate with a real N8N webhook, replace the simulation code below with:

       try {
         const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
           method: 'POST',
           body: JSON.stringify({ message: text, scenario: activeTab })
         });
         const data = await response.json();
         // Add data.response to messages
       } catch (error) {
         // Handle error
       }
    */

    // Simulate AI Processing Time (randomized)
    const delay = Math.floor(Math.random() * 1000) + 1000;

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = currentScenario.fallback;

      // Improved keyword matching
      const keywords = Object.keys(currentScenario.responses);
      for (const key of keywords) {
        if (lowerText.includes(key)) {
          responseText = currentScenario.responses[key];
          break;
        }
      }

      // Generic positive fillers if no match but sounds positive
      if (responseText === currentScenario.fallback && (lowerText.includes('si') || lowerText.includes('ok') || lowerText.includes('gracias'))) {
        responseText = "¡Perfecto! ¿Hay algo más en lo que pueda ayudarte?";
      }

      const newBotMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'bot', text: responseText };
      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <div className="w-full max-w-sm md:max-w-md mx-auto bg-brand-dark rounded-[2.5rem] border-8 border-brand-black shadow-2xl overflow-hidden flex flex-col h-[800px] relative">
      {/* Dynamic Island Notch imitation */}
      <div className="absolute top-0 left-0 right-0 mx-auto w-32 h-7 bg-brand-black rounded-b-xl z-20 flex items-center justify-center">
        <div className="w-16 h-1 bg-white/10 rounded-full"></div>
      </div>

      {/* Header and Switcher */}
      <div className="bg-[#1A1A1A] pt-12 pb-2 px-4 border-b border-white/5 relative z-10 transition-colors duration-500">
        {/* Industry Switcher */}
        <div className="flex justify-between items-center mb-4 px-2">
          {Object.keys(SCENARIOS).map((key) => {
            const Icon = ICONS[key as keyof typeof ICONS];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  // Optional: scroll to the corresponding service card
                  // Optional: scroll to the corresponding service card
                  // Logic removed to prevent page scrolling as per user request
                }}
                className={`relative p-3 rounded-2xl transition-all duration-300 ${isActive
                  ? 'bg-white text-black scale-110 shadow-lg'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <Icon size={20} />
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Chat Header Info */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-2 pb-2"
        >
          <div className="relative">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: currentScenario.color || '#06B6D4' }}
            >
              {React.createElement(ICONS[activeTab as keyof typeof ICONS], { size: 24 })}
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#1A1A1A] rounded-full"></div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg leading-tight">{currentScenario.businessName}</h3>
            <p className="text-brand-gray text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              En línea ahora
            </p>
          </div>
        </motion.div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#0B0B0E] relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className="text-center text-xs text-brand-gray/50 my-2">Hoy</div>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                ? 'bg-brand-cyan text-brand-black rounded-2xl rounded-tr-sm'
                : 'bg-brand-dark border border-white/10 text-white rounded-2xl rounded-tl-sm'
                }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-brand-dark border border-white/10 p-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
              <span className="w-2 h-2 bg-brand-gray/50 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-brand-gray/50 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-brand-gray/50 rounded-full animate-bounce delay-200"></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {!isTyping && messages[messages.length - 1]?.role === 'bot' && (
        <div className="px-4 py-3 flex gap-2 overflow-x-auto hide-scrollbar bg-[#0B0B0E]/50 backdrop-blur-sm">
          {currentScenario.suggestions.map((sugg, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(sugg)}
              className="whitespace-nowrap px-4 py-2 rounded-full bg-brand-cyan/5 border border-brand-cyan/30 text-brand-cyan text-xs font-medium hover:bg-brand-cyan/20 transition-all hover:scale-105"
            >
              {sugg}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-brand-dark border-t border-white/5">
        <div className="flex items-center gap-2 bg-[#0B0B0E] p-1.5 rounded-full border border-white/10 focus-within:border-brand-cyan/50 transition-colors">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-grow bg-transparent text-white text-sm px-4 py-2 focus:outline-none placeholder:text-brand-gray/50"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                handleSendMessage(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
          <button
            className="p-2.5 bg-brand-cyan text-brand-black rounded-full hover:bg-white transition-colors hover:scale-105 active:scale-95"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              handleSendMessage(input.value);
              input.value = '';
            }}
          >
            <Send size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};