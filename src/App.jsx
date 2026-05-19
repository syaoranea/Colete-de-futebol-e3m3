import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Upload, Truck, CheckCircle, User, 
  Plus, Minus, CreditCard, Copy, ChevronRight, 
  Check, RotateCcw, Package 
} from 'lucide-react';
import LandingPage from './components/LandingPage';

const COLORS = [
  { name: 'Teal', hex: '#008080' },
  { name: 'Grafite', hex: '#333333' },
  { name: 'Branco', hex: '#F3F4F6' },
  { name: 'Verde', hex: '#10B981' },
  { name: 'Azul', hex: '#0EA5E9' },
  { name: 'Vermelho', hex: '#DC2626' }
];

const ACCENT_COLORS = [
  { name: 'Laranja', hex: '#ff8c00' },
  { name: 'Verde Neon', hex: '#84cc16' },
  { name: 'Ouro', hex: '#FBBF24' },
  { name: 'Preto', hex: '#000000' },
  { name: 'Branco', hex: '#FFFFFF' }
];

const STATUS_TIMELINE = [
  "Pedido Recebido",
  "Arte Aprovada",
  "Em Produção",
  "Despachado",
  "Entregue"
];

// Reusable Colete Mockup Component
const ColeteMockup = ({ pedido, isBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-[300px] aspect-[4/5] mx-auto drop-shadow-2xl"
    >
      <svg viewBox="0 0 200 250" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
        {/* Base do Colete */}
        <motion.path 
          d="M50 10 L70 10 Q100 40 130 10 L150 10 C180 10 180 50 180 80 L170 230 C170 240 30 240 30 230 L20 80 C20 50 20 10 50 10 Z" 
          fill={pedido.corBase}
          animate={{ fill: pedido.corBase }}
          transition={{ duration: 0.3 }}
        />
        {/* Gola / Collar */}
        <motion.path 
          d="M70 10 Q100 60 130 10" 
          fill="none" 
          stroke={pedido.corAcentos} 
          strokeWidth="8"
          animate={{ stroke: pedido.corAcentos }}
          transition={{ duration: 0.3 }}
        />
        {/* Cavas / Armholes */}
        <motion.path 
          d="M20 80 Q50 80 50 10" 
          fill="none" 
          stroke={pedido.corAcentos} 
          strokeWidth="6"
          animate={{ stroke: pedido.corAcentos }}
          transition={{ duration: 0.3 }}
        />
        <motion.path 
          d="M180 80 Q150 80 150 10" 
          fill="none" 
          stroke={pedido.corAcentos} 
          strokeWidth="6"
          animate={{ stroke: pedido.corAcentos }}
          transition={{ duration: 0.3 }}
        />

        {/* Dynamic Elements based on Front/Back */}
        <AnimatePresence mode="wait">
          {!isBack ? (
            <motion.g 
              key="front"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Escudo / Arte Placeholder */}
              {pedido.arteUrl ? (
                <g transform="translate(120, 60)">
                  <circle cx="15" cy="15" r="15" fill="rgba(255,255,255,0.9)" />
                  <text x="15" y="19" fontSize="10" textAnchor="middle" fill="#000" fontWeight="bold">ARTE</text>
                </g>
              ) : (
                <circle cx="135" cy="75" r="12" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="2 2" />
              )}
              {/* Patrocinador Placeholder / Detalhe */}
              <rect x="60" y="120" width="80" height="20" rx="4" fill="rgba(255,255,255,0.15)" />
            </motion.g>
          ) : (
            <motion.g 
              key="back"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Nome */}
              {pedido.nome && (
                <text x="100" y="90" fontSize="18" textAnchor="middle" fill={pedido.corAcentos} fontWeight="900" style={{ textTransform: 'uppercase', letterSpacing: '2px' }}>
                  {pedido.nome}
                </text>
              )}
              {/* Número */}
              {pedido.numero && (
                <text x="100" y="170" fontSize="70" textAnchor="middle" fill={pedido.corAcentos} fontWeight="900" style={{ fontFamily: 'Impact, sans-serif' }}>
                  {pedido.numero}
                </text>
              )}
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
};

// Animated Background Balls
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full blur-[150px]" />
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)] flex items-center justify-center backdrop-blur-sm"
          style={{
            width: Math.random() * 100 + 50 + 'px',
            height: Math.random() * 100 + 50 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-[80%] h-[80%] border border-white/5 rounded-full" />
        </motion.div>
      ))}
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [pedido, setPedido] = useState({
    id: "#SPF-2026",
    corBase: "#008080",
    corAcentos: "#ff8c00",
    arteUrl: null,
    arteNome: "",
    numero: "7",
    nome: "SILVA",
    grade: { M: 10, G: 5, GG: 3 },
    statusAtual: "Pedido Recebido",
  });
  const [isBackView, setIsBackView] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Derived state
  const totalColetes = useMemo(() => {
    return Object.values(pedido.grade).reduce((a, b) => a + b, 0);
  }, [pedido.grade]);

  const precoUnitario = 45.00;
  const temDesconto = totalColetes >= 15;
  const subtotal = totalColetes * precoUnitario;
  const desconto = temDesconto ? subtotal * 0.10 : 0;
  const frete = 25.00;
  const totalGeral = subtotal - desconto + frete;

  const handleGradeChange = (tamanho, delta) => {
    setPedido(prev => ({
      ...prev,
      grade: {
        ...prev.grade,
        [tamanho]: Math.max(0, prev.grade[tamanho] + delta)
      }
    }));
  };

  const simulateUpload = () => {
    setTimeout(() => {
      setPedido(prev => ({
        ...prev,
        arteUrl: 'mock-url',
        arteNome: 'escudo_time.png'
      }));
    }, 800);
  };

  const addToCart = () => {
    setCartItems([{ ...pedido, totalColetes, totalGeral }]);
    setActiveTab('carrinho');
  };

  const handleCheckout = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPedido(prev => ({ ...prev, statusAtual: "Pedido Recebido" }));
        setActiveTab('status');
      }, 3000);
    }, 3000);
  };

  const advanceTimeline = () => {
    const currentIndex = STATUS_TIMELINE.indexOf(pedido.statusAtual);
    if (currentIndex < STATUS_TIMELINE.length - 1) {
      setPedido(prev => ({ ...prev, statusAtual: STATUS_TIMELINE[currentIndex + 1] }));
    }
  };

  return (
    <div className="min-h-screen text-gray-100 flex flex-col relative overflow-hidden font-sans">
      <AnimatedBackground />

      {/* Header */}
      <header className="glass-panel sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 text-2xl font-black italic tracking-tighter cursor-pointer"
            onClick={() => setActiveTab('home')}
          >
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white"
            >
              V
            </motion.div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              VEST.IO <span className="text-emerald-500 text-lg">Pro</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
            {[
              { id: 'home', label: 'Página Inicial' },
              { id: 'simulador', label: 'Simulador' },
              { id: 'carrinho', label: 'Carrinho' },
              { id: 'status', label: 'Acompanhar Pedido' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-2 py-1 transition-colors ${activeTab === item.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div layoutId="nav-indicator" className="absolute bottom-[-8px] left-0 right-0 h-[2px] bg-emerald-500" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('carrinho')}
              className="relative p-2 rounded-full hover:bg-white/5 transition"
            >
              <ShoppingCart className="w-6 h-6 text-gray-300" />
              {cartItems.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute top-0 right-0 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                >
                  {cartItems.length}
                </motion.span>
              )}
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600">
              <User className="w-5 h-5 text-gray-300" />
            </div>
          </div>
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden flex overflow-x-auto px-4 py-3 gap-4 border-t border-white/5 bg-gray-900/50">
          {[
            { id: 'home', label: 'Página Inicial' },
            { id: 'simulador', label: 'Simulador' },
            { id: 'carrinho', label: 'Carrinho' },
            { id: 'status', label: 'Acompanhar Pedido' }
          ].map(item => (
             <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === item.id ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-gray-800 text-gray-400'
                }`}
              >
                {item.label}
              </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`flex-grow relative z-10 flex flex-col ${activeTab !== 'home' ? 'container mx-auto px-4 py-8' : ''}`}>
        <AnimatePresence mode="wait">
          
          {/* HOME / LANDING PAGE */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <LandingPage onStartCustomization={() => setActiveTab('simulador')} />
            </motion.div>
          )}

          {/* SIMULADOR TAB */}
          {activeTab === 'simulador' && (
            <motion.div 
              key="simulador"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full"
            >
              {/* Left Column: Controls */}
              <div className="lg:col-span-5 space-y-6">
                <div className="glass-panel rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Package className="text-emerald-500" /> Personalize seu Colete
                  </h2>
                  
                  {/* Cores Base */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-3">Cor Base do Colete</label>
                    <div className="flex gap-3 flex-wrap">
                      {COLORS.map(c => (
                        <button
                          key={c.hex}
                          onClick={() => setPedido({ ...pedido, corBase: c.hex })}
                          className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${pedido.corBase === c.hex ? 'border-emerald-500 scale-110 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'border-transparent'}`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Cores Acentos */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-3">Cor dos Detalhes (Gola, Cavas, Textos)</label>
                    <div className="flex gap-3 flex-wrap">
                      {ACCENT_COLORS.map(c => (
                        <button
                          key={c.hex}
                          onClick={() => setPedido({ ...pedido, corAcentos: c.hex })}
                          className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${pedido.corAcentos === c.hex ? 'border-orange-500 scale-110 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'border-gray-600'}`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Upload Arte */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-3">Escudo do Time (Frente)</label>
                    <button 
                      onClick={simulateUpload}
                      className="w-full flex items-center justify-center gap-3 border-2 border-dashed border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/5 rounded-xl p-4 transition text-sm font-medium"
                    >
                      {pedido.arteUrl ? (
                        <><CheckCircle className="text-emerald-500 w-5 h-5" /> {pedido.arteNome}</>
                      ) : (
                        <><Upload className="w-5 h-5 text-gray-400" /> Fazer upload de arquivo (PNG/SVG)</>
                      )}
                    </button>
                  </div>

                  {/* Textos: Nome e Número */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Número (Costas)</label>
                      <input 
                        type="text" 
                        maxLength={2}
                        value={pedido.numero}
                        onChange={(e) => setPedido({ ...pedido, numero: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Nome (Costas)</label>
                      <input 
                        type="text" 
                        maxLength={12}
                        value={pedido.nome}
                        onChange={(e) => setPedido({ ...pedido, nome: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* Grade de Tamanhos */}
                <div className="glass-panel rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">Grade de Lote (Quantidades)</h3>
                  <div className="space-y-4">
                    {['M', 'G', 'GG'].map(tamanho => (
                      <div key={tamanho} className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                        <span className="font-bold text-lg w-8 text-center">{tamanho}</span>
                        <div className="flex items-center gap-4">
                          <button onClick={() => handleGradeChange(tamanho, -1)} className="p-1 rounded-md bg-gray-700 hover:bg-gray-600 transition"><Minus className="w-4 h-4" /></button>
                          <span className="w-8 text-center font-bold">{pedido.grade[tamanho]}</span>
                          <button onClick={() => handleGradeChange(tamanho, 1)} className="p-1 rounded-md bg-emerald-500 hover:bg-emerald-600 transition text-white"><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-end">
                    <div>
                      <p className="text-sm text-gray-400">Total de peças: <span className="font-bold text-white text-lg">{totalColetes}</span></p>
                      {totalColetes >= 15 ? (
                        <p className="text-xs text-emerald-400 font-medium">✨ 10% de desconto aplicado!</p>
                      ) : (
                        <p className="text-xs text-gray-500">Adicione {15 - totalColetes} para ter 10% off</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-emerald-400">R$ {totalGeral.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addToCart}
                    disabled={totalColetes === 0}
                    className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Adicionar ao Carrinho <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Right Column: Preview */}
              <div className="lg:col-span-7 relative flex items-center justify-center min-h-[500px]">
                {/* Switcher Frente/Costas */}
                <div className="absolute top-0 right-0 bg-gray-800/80 backdrop-blur-md p-1 rounded-lg border border-gray-700 flex z-10">
                  <button 
                    onClick={() => setIsBackView(false)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${!isBackView ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                  >
                    Frente
                  </button>
                  <button 
                    onClick={() => setIsBackView(true)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${isBackView ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                  >
                    Costas
                  </button>
                </div>
                
                {/* 3D Mockup Area */}
                <div className="relative w-full max-w-lg mx-auto flex items-center justify-center h-full">
                  {/* Decorative glowing behind mockup */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent rounded-full blur-[80px]"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  <ColeteMockup pedido={pedido} isBack={isBackView} />
                </div>
              </div>
            </motion.div>
          )}

          {/* CARRINHO E CHECKOUT TAB */}
          {activeTab === 'carrinho' && (
             <motion.div 
              key="carrinho"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto w-full h-full"
            >
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-emerald-500" /> Seu Carrinho
              </h2>

              {cartItems.length === 0 ? (
                <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center h-[50vh]">
                  <ShoppingCart className="w-20 h-20 text-gray-600 mb-6" />
                  <p className="text-xl text-gray-400 mb-6">Seu carrinho está vazio.</p>
                  <button 
                    onClick={() => setActiveTab('simulador')}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-bold transition"
                  >
                    Ir para o Simulador
                  </button>
                </div>
              ) : paymentSuccess ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass-panel border-emerald-500/50 rounded-2xl p-12 text-center flex flex-col items-center justify-center relative overflow-hidden"
                >
                  {/* Confetti effect placeholder */}
                  <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjMiIGZpbGw9IiMxMEI5ODEiIC8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNCIgZmlsbD0iI0Y5NzMxNiIgLz48L3N2Zz4=')] bg-repeat" />
                  
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                    className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                  >
                    <Check className="w-12 h-12 text-white" strokeWidth={4} />
                  </motion.div>
                  <h2 className="text-4xl font-black text-white mb-2">Pagamento Confirmado!</h2>
                  <p className="text-gray-400 text-lg mb-8">Seu pedido foi processado e já entrou na fila de produção.</p>
                  <button 
                    onClick={() => { setPaymentSuccess(false); setActiveTab('status'); setCartItems([]); }}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-bold transition border border-gray-600"
                  >
                    Acompanhar Pedido
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Itens do carrinho */}
                  <div className="md:col-span-2 space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="glass-panel rounded-2xl p-6 flex items-center gap-6">
                        <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                          <svg viewBox="0 0 200 250" className="w-full h-full scale-[1.5] translate-y-2">
                             <path d="M50 10 L70 10 Q100 40 130 10 L150 10 C180 10 180 50 180 80 L170 230 C170 240 30 240 30 230 L20 80 C20 50 20 10 50 10 Z" fill={item.corBase}/>
                             <path d="M70 10 Q100 60 130 10" fill="none" stroke={item.corAcentos} strokeWidth="8"/>
                          </svg>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-white mb-1">Lote Coletes Personalizados</h3>
                          <p className="text-sm text-gray-400 mb-2">Cores Base/Detalhe, {item.totalColetes} un.</p>
                          <div className="flex gap-2 text-xs">
                            <span className="px-2 py-1 bg-gray-800 rounded text-gray-300">M: {item.grade.M}</span>
                            <span className="px-2 py-1 bg-gray-800 rounded text-gray-300">G: {item.grade.G}</span>
                            <span className="px-2 py-1 bg-gray-800 rounded text-gray-300">GG: {item.grade.GG}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-emerald-400">R$ {subtotal.toFixed(2).replace('.', ',')}</p>
                          <button onClick={() => setCartItems([])} className="text-sm text-red-500 hover:text-red-400 mt-2">Remover</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Resumo Financeiro e Checkout */}
                  <div className="glass-panel rounded-2xl p-6 h-fit sticky top-24">
                    <h3 className="text-xl font-bold mb-6">Resumo do Pedido</h3>
                    
                    <div className="space-y-3 text-sm text-gray-300 mb-6 border-b border-gray-700 pb-6">
                      <div className="flex justify-between">
                        <span>Subtotal ({totalColetes} itens)</span>
                        <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                      </div>
                      {temDesconto && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Desconto Lote (10%)</span>
                          <span>- R$ {desconto.toFixed(2).replace('.', ',')}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Frete Expresso</span>
                        <span>R$ {frete.toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mb-8">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-3xl font-black text-emerald-400">R$ {totalGeral.toFixed(2).replace('.', ',')}</span>
                    </div>

                    {/* Simulação PIX */}
                    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-6 text-center">
                      <div className="flex justify-center mb-3 text-teal-400"><CreditCard /></div>
                      <p className="text-sm text-gray-300 mb-4">Pagamento via PIX</p>
                      <div className="w-32 h-32 bg-white mx-auto p-2 rounded-lg mb-4">
                        {/* Mock QR Code com SVG */}
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <rect width="100" height="100" fill="#fff"/>
                          <path d="M10 10h20v20h-20zM20 20h-10v-10h10zM70 10h20v20h-20zM80 20h-10v-10h10zM10 70h20v20h-20zM20 80h-10v-10h10zM40 10h20v10h-20zM40 30h10v20h-10zM60 40h30v10h-30zM10 40h20v10h-20zM40 60h20v30h-20z" fill="#000"/>
                        </svg>
                      </div>
                      <button 
                        onClick={handleCheckout}
                        disabled={isProcessingPayment}
                        className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition font-medium"
                      >
                        {isProcessingPayment ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          <><Copy className="w-4 h-4" /> Copiar Código PIX</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STATUS TAB */}
          {activeTab === 'status' && (
            <motion.div 
              key="status"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-3xl mx-auto w-full h-full flex flex-col justify-center"
            >
              <div className="glass-panel rounded-3xl p-8 md:p-12">
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h2 className="text-3xl font-black text-white mb-2">Acompanhe seu Pedido</h2>
                    <p className="text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1 rounded-md inline-block">ID: {pedido.id}</p>
                  </div>
                  <Truck className="w-12 h-12 text-gray-600" />
                </div>

                <div className="relative py-4">
                  {/* Timeline Background Line */}
                  <div className="absolute left-6 md:left-[50%] top-0 bottom-0 w-1 bg-gray-800 -translate-x-[2px]" />
                  
                  {/* Timeline Progress Line */}
                  <div 
                    className="absolute left-6 md:left-[50%] top-0 w-1 bg-emerald-500 -translate-x-[2px] transition-all duration-700 ease-in-out" 
                    style={{ height: `${(STATUS_TIMELINE.indexOf(pedido.statusAtual) / (STATUS_TIMELINE.length - 1)) * 100}%` }}
                  />

                  {/* Timeline Nodes */}
                  <div className="space-y-12">
                    {STATUS_TIMELINE.map((status, index) => {
                      const isCompleted = STATUS_TIMELINE.indexOf(pedido.statusAtual) >= index;
                      const isCurrent = pedido.statusAtual === status;
                      
                      return (
                        <div key={status} className="relative flex items-center md:justify-center">
                          <div className={`md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end md:pr-12' : 'md:hidden'}`}>
                            {index % 2 === 0 && (
                              <div className={`hidden md:block text-right ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                                <h4 className="font-bold text-lg">{status}</h4>
                                {isCurrent && <p className="text-sm text-emerald-400 mt-1">Status atual do pedido</p>}
                              </div>
                            )}
                          </div>

                          <div className="absolute left-6 md:left-[50%] -translate-x-[50%] flex items-center justify-center z-10">
                            <motion.div 
                              initial={false}
                              animate={{ 
                                backgroundColor: isCompleted ? '#10B981' : '#1F2937',
                                borderColor: isCurrent ? '#34D399' : isCompleted ? '#10B981' : '#374151',
                                scale: isCurrent ? 1.2 : 1
                              }}
                              className={`w-6 h-6 rounded-full border-4 flex items-center justify-center ${isCurrent ? 'shadow-[0_0_20px_rgba(16,185,129,0.5)]' : ''}`}
                            >
                              {isCompleted && !isCurrent && <Check className="w-3 h-3 text-white" />}
                            </motion.div>
                          </div>

                          <div className={`ml-16 md:ml-0 md:w-1/2 flex ${index % 2 !== 0 ? 'md:justify-start md:pl-12' : ''}`}>
                            <div className={`${index % 2 === 0 ? 'md:hidden' : ''} ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                               <h4 className="font-bold text-lg">{status}</h4>
                               {isCurrent && <p className="text-sm text-emerald-400 mt-1">Status atual</p>}
                            </div>
                            {index % 2 !== 0 && (
                               <div className={`hidden md:block ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                                  <h4 className="font-bold text-lg">{status}</h4>
                                  {isCurrent && <p className="text-sm text-emerald-400 mt-1">Status atual do pedido</p>}
                               </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Control to test animation */}
                <div className="mt-16 pt-8 border-t border-gray-700 flex justify-between items-center bg-gray-800/30 p-4 rounded-xl">
                  <span className="text-sm text-gray-400 italic">Área de Teste (Mock):</span>
                  <button 
                    onClick={advanceTimeline}
                    disabled={pedido.statusAtual === "Entregue"}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
                  >
                    Simular Avanço <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
