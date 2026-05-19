import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ShieldCheck, Zap, Droplets, 
  ArrowRight, Star, Quote, Palette, TrendingUp, CheckCircle
} from 'lucide-react';

const LandingPage = ({ onStartCustomization }) => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Qual é o pedido mínimo?",
      answer: "Para manter nossos preços de atacado, o pedido mínimo é de 10 peças. Ideal para times e escolinhas!"
    },
    {
      question: "Qual é o prazo de entrega?",
      answer: "Nosso prazo médio é de 7 a 10 dias úteis para produção, mais o tempo da transportadora até a sua região."
    },
    {
      question: "E se a minha imagem estiver em baixa qualidade?",
      answer: "Fique tranquilo! Nossa equipe de designers revisa e vetoriza sua arte (escudo/logo) antes de estampar. Enviamos uma prévia no WhatsApp para sua aprovação final."
    },
    {
      question: "A estampa desbota com o tempo?",
      answer: "Não! Utilizamos estamparia digital de alta definição (sublimação total) que penetra nas fibras do tecido. Você pode lavar na máquina milhares de vezes."
    }
  ];

  return (
    <div className="w-full flex flex-col font-sans relative">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee7c532066d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900/80 via-gray-900/95 to-gray-900"></div>
        
        {/* Parallax elements */}
        <motion.div 
          animate={{ y: [-20, 20, -20], rotate: [0, 5, -5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] z-0"
        />
        <motion.div 
          animate={{ y: [30, -30, 30], rotate: [0, -10, 10, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 w-48 h-48 bg-teal-500/10 rounded-full blur-[60px] z-0"
        />

        <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium text-sm mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              🚀 A Revolução dos Coletes Personalizados
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tighter" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              Vista o Seu Time Como um <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Clube Profissional</span>.
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              O colete perfeito para o seu futebol de várzea ou arena. Simulador rápido, tecido premium dry-fit, sem burocracia e direto da fábrica.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartCustomization}
              className="relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg px-8 py-4 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center gap-3 transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">Criar Meu Colete Agora <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              <motion.div 
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity z-0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </motion.button>
            
            <div className="mt-8 flex items-center gap-4 text-sm text-gray-400">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-8 h-8 rounded-full border-2 border-gray-900" />
                ))}
              </div>
              <p>Mais de <strong className="text-white">5.000+</strong> atletas já usam.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Efeito de Parallax Flutuante do Colete Hero */}
            <motion.div
              animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[400px] z-10 drop-shadow-2xl"
            >
              <svg viewBox="0 0 200 250" className="w-full h-auto drop-shadow-[0_20px_50px_rgba(16,185,129,0.3)]">
                <path d="M50 10 L70 10 Q100 40 130 10 L150 10 C180 10 180 50 180 80 L170 230 C170 240 30 240 30 230 L20 80 C20 50 20 10 50 10 Z" fill="#10B981"/>
                <path d="M70 10 Q100 60 130 10" fill="none" stroke="#F97316" strokeWidth="8"/>
                <path d="M20 80 Q50 80 50 10" fill="none" stroke="#F97316" strokeWidth="6"/>
                <path d="M180 80 Q150 80 150 10" fill="none" stroke="#F97316" strokeWidth="6"/>
                {/* Detalhe "Pro" no centro */}
                <text x="100" y="140" fontSize="30" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontStyle="italic" opacity="0.9">PRO</text>
                <text x="100" y="160" fontSize="12" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" opacity="0.8">VEST.IO</text>
              </svg>
            </motion.div>
            
            {/* Bola de Futebol Desfocada ao fundo */}
            <motion.div
              animate={{ x: [-20, 20, -20], rotate: [0, 180, 360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -right-10 bottom-10 w-32 h-32 rounded-full border-[8px] border-dashed border-gray-700/30 blur-[4px] z-0"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. BENEFÍCIOS */}
      <section className="py-24 bg-gray-900 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Por Que Escolher a VEST.IO?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Desenvolvido por quem joga, para quem joga. Não abrimos mão de qualidade, agilidade e estilo em cada peça produzida.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Droplets className="w-8 h-8 text-emerald-400" />, title: "Tecnologia Dry-Fit", desc: "Tecido super leve, respirável e com tecnologia anti-suor para máximo desempenho." },
              { icon: <Zap className="w-8 h-8 text-emerald-400" />, title: "Simulador Realista", desc: "Veja exatamente como vai ficar. Crie, ajuste cores e adicione o escudo online." },
              { icon: <Palette className="w-8 h-8 text-emerald-400" />, title: "Sem Limite de Cores", desc: "Estamparia digital de alta definição (sublimação total) que não desbota na lavagem." },
              { icon: <TrendingUp className="w-8 h-8 text-emerald-400" />, title: "Desconto Progressivo", desc: "Compre em lote para o seu time inteiro e garanta os melhores preços de fábrica." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl hover:bg-gray-800 transition-colors"
              >
                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMO FUNCIONA (Timeline Horizontal) */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">É Fácil Escalar o Seu Time</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Esqueça a burocracia de orçamentos lentos por WhatsApp. Em 3 passos o uniforme está garantido.</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between relative max-w-5xl mx-auto">
            {/* Linha conectora desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 z-0" />

            {[
              { step: 1, title: "Personalize", desc: "Escolha cores, modelos e faça upload do escudo no simulador online." },
              { step: 2, title: "Monte o Lote", desc: "Defina a quantidade exata de tamanhos P, M, G, GG para a equipe." },
              { step: 3, title: "Receba Rápido", desc: "Pague com segurança via PIX e acompanhe a produção até a entrega." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center max-w-xs mb-12 lg:mb-0"
              >
                <div className="w-16 h-16 bg-gray-900 border-4 border-emerald-500 rounded-full flex items-center justify-center text-2xl font-black text-emerald-400 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartCustomization}
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-bold px-8 py-3 rounded-full transition-colors inline-flex items-center gap-2"
            >
              Começar Passo 1 <ChevronDown className="w-5 h-5 -rotate-90" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* 4. PROVA SOCIAL E FOTOS REAIS */}
      <section className="py-24 bg-gray-800/30 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Quem Veste VEST.IO Pro</h2>
            <p className="text-gray-400 text-lg">A qualidade aprovada pelas melhores arenas e times amadores do Brasil.</p>
          </div>

          {/* Galeria Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1516731415730-0c37b108f4d7?auto=format&fit=crop&q=80&w=400"
            ].map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative aspect-square rounded-2xl overflow-hidden group"
              >
                <img src={src} alt="Futebol Amador" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> <span className="text-xs font-bold">Entrega Premium</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Depoimentos */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { nome: "Renato - Técnico Barcelona da Cohab", texto: "Qualidade surreal! Os coletes aguentam tranco, não desbotaram nada nas primeiras lavagens e o tecido é super leve.", img: 32 },
              { nome: "Arena Gol de Placa", texto: "Compramos 50 peças para nossa arena. O simulador ajudou muito a decidir as cores. Entrega antes do prazo estipulado.", img: 45 },
              { nome: "Thiago - Cap. Resenha FC", texto: "O fato de já vir com nosso escudo e os números nas costas sem cobrar absurdo a mais salvou a nossa vaquinha. Recomendo d++!", img: 59 }
            ].map((dep, i) => (
              <div key={i} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 relative mt-8">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-gray-900">
                  <Quote className="w-5 h-5 text-white" />
                </div>
                <div className="flex text-yellow-400 mb-4 mt-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-300 mb-6 italic">"{dep.texto}"</p>
                <div className="flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/100?img=${dep.img}`} alt={dep.nome} className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="text-white font-bold text-sm">{dep.nome}</h4>
                    <span className="text-emerald-400 text-xs">Cliente Verificado</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ (Perguntas Frequentes) */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Dúvidas Frequentes</h2>
            <p className="text-gray-400">Ainda está com o pé atrás? A gente joga limpo com você.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-800 transition-colors"
                >
                  <span className="font-bold text-lg text-white">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-gray-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-2 text-gray-400 leading-relaxed border-t border-gray-700/50 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL DE URGÊNCIA */}
      <section className="py-16 bg-emerald-500 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Não jogue com colete rasgado ou sem escudo.
          </h2>
          <p className="text-xl text-emerald-900 font-medium mb-10 max-w-2xl mx-auto">
            Mostre a força do seu time. Monte o uniforme completo hoje e receba na sua arena!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartCustomization}
            className="bg-gray-900 text-white font-black text-xl px-12 py-5 rounded-full shadow-xl hover:bg-gray-800 transition-colors flex items-center gap-3 mx-auto"
          >
            Ir para o Simulador Agora <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-gray-950 py-12 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-2xl font-black italic tracking-tighter mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white">V</div>
              <span className="text-white">VEST.IO <span className="text-emerald-500 text-lg">Pro</span></span>
            </div>
            <p className="text-gray-500 max-w-sm mb-6">A maior plataforma de personalização de coletes para times de várzea, escolinhas e arenas do Brasil.</p>
            <div className="flex gap-4">
               {/* Ícones de redes sociais genéricos */}
               <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition cursor-pointer">IG</div>
               <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition cursor-pointer">FB</div>
               <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition cursor-pointer">TT</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-emerald-400 transition">Rastrear Pedido</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Tabela de Medidas</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Política de Trocas</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Contato / WhatsApp</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Compra Segura</h4>
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> Site Protegido SSL
            </div>
            <p className="text-sm text-gray-600">Pagamentos processados via PIX, Cartão de Crédito ou Boleto. 100% de segurança garantida.</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pt-8 border-t border-gray-900 text-center text-sm text-gray-600">
          <p>© 2026 VEST.IO Pro - Indústria de Artigos Esportivos LTDA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
