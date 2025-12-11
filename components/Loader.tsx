import React from 'react';
import { motion } from 'framer-motion';
import VerzaLogo from '@/assets/verza-logo.svg';

export const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0F] overflow-hidden">
            {/* Background Effects (Same as Hero) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.1),transparent_50%)]"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-violet/5 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <img src={VerzaLogo} alt="Verza Loading" className="w-32 md:w-40 h-auto" />
                </motion.div>

                <div className="relative w-12 h-12">
                    <div className="absolute w-12 h-12 border-4 border-brand-cyan/20 rounded-full"></div>
                    <div className="absolute w-12 h-12 border-4 border-brand-cyan rounded-full border-t-transparent animate-spin"></div>
                </div>
            </div>
        </div>
    );
};
