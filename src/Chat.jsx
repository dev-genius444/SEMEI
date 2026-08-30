import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMenu,
  FiSearch,
  FiUsers,
  FiMessageSquare,
  FiList
} from 'react-icons/fi';

export default function Chat({ onAbrirConversa, onMudarTela }) {
  const [filtroAtivo, setFiltroAtivo] = useState('todas');
  const [busca, setBusca] = useState('');
  const [tabAtiva, setTabAtiva] = useState('chat'); // Começa na aba chat

  const conversas = [
    {
      id: 1,
      nome: 'Ana Souza',
      ultimaMensagem: 'Oi, tudo bem?',
      hora: '12:45',
      naoLidas: 2,
      favorita: true,
      grupo: false,
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
      status: 'Online'
    },
    {
      id: 2,
      nome: 'Grupo da Igreja',
      ultimaMensagem: 'Amém irmãos!',
      hora: '11:20',
      naoLidas: 5,
      favorita: true,
      grupo: true,
      foto: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=faces',
      status: '45 membros'
    },
    {
      id: 3,
      nome: 'Carlos Eduardo',
      ultimaMensagem: 'Até mais tarde.',
      hora: 'Ontem',
      naoLidas: 0,
      favorita: false,
      grupo: false,
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
      status: 'Visto por último às 10:12'
    },
    {
      id: 4,
      nome: 'Equipe de Jovens',
      ultimaMensagem: 'Reunião confirmada.',
      hora: 'Ontem',
      naoLidas: 0,
      favorita: false,
      grupo: true,
      foto: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop&crop=faces',
      status: '12 membros'
    },
  ];

  const conversasFiltradas = conversas.filter(c => {
    const correspondeBusca = c.nome.toLowerCase().includes(busca.toLowerCase());
    if (!correspondeBusca) return false;

    if (filtroAtivo === 'nao lidas') return c.naoLidas > 0;
    if (filtroAtivo === 'grupos') return c.grupo;
    if (filtroAtivo === 'favoritos') return c.favorita;
    return true;
  });

  return (
    <div className="bg-black text-white h-full flex flex-col font-sans relative overflow-hidden">

      {/* --- TOPO --- */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-zinc-800">
        <button className="text-zinc-300 hover:text-purple-500 transition cursor-pointer">
          <FiMenu size={24} />
        </button>
        <h1 className="text-lg font-bold tracking-wide text-purple-400">SEMEI</h1>
        
        {/* Botão de Editar com o seu SVG personalizado em Roxo */}
        <button 
          className="text-purple-400 hover:text-purple-300 transition cursor-pointer p-1" 
          title="Editar"
        >
          <svg 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            className="w-5 h-5 stroke-purple-400 hover:stroke-purple-300 transition"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none"></path>
            <polygon points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" fill="none"></polygon>
          </svg>
        </button>
      </header>

      {/* --- FILTROS --- */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar shrink-0">
        {['todas', 'nao lidas', 'grupos', 'favoritos'].map((filtro) => (
          <button
            key={filtro}
            onClick={() => setFiltroAtivo(filtro)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition cursor-pointer ${
              filtroAtivo === filtro
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            {filtro}
          </button>
        ))}
      </div>

      {/* --- PESQUISA --- */}
      <div className="px-4 py-2 shrink-0">
        <div className="flex items-center bg-zinc-900 rounded-xl px-3 py-2 border border-zinc-800 focus-within:border-purple-600 transition">
          <FiSearch className="text-zinc-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Buscar conversas..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* --- LISTA DE CONVERSAS --- */}
      <main className="flex-1 px-4 py-2 space-y-2 overflow-y-auto pb-24">
        {conversasFiltradas.length > 0 ? (
          conversasFiltradas.map((conversa) => (
            <motion.div
              whileTap={{ scale: 0.97 }}
              key={conversa.id}
              onClick={() => onAbrirConversa(conversa)}
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-zinc-900/60 transition cursor-pointer border border-transparent hover:border-zinc-800"
            >
              <div className="flex items-center gap-3">
                <img
                  src={conversa.foto}
                  alt={conversa.nome}
                  className="w-12 h-12 rounded-full object-cover border border-purple-500/30"
                />
                <div>
                  <h2 className="text-sm font-semibold text-zinc-100">{conversa.nome}</h2>
                  <p className="text-xs text-zinc-400 truncate max-w-[180px]">{conversa.ultimaMensagem}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] text-zinc-500">{conversa.hora}</span>
                {conversa.naoLidas > 0 && (
                  <span className="bg-purple-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md shadow-purple-900/40">
                    {conversa.naoLidas}
                  </span>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 text-zinc-500 text-sm">
            Nenhuma conversa encontrada.
          </div>
        )}
      </main>

      {/* --- TABBAR FLUTUANTE --- */}
      <nav className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl z-50">
        <button
          onClick={() => {
            setTabAtiva('comunidade');
            if (onMudarTela) onMudarTela('comunidade');
          }}
          className={`flex flex-col items-center gap-1 transition cursor-pointer ${tabAtiva === 'comunidade' ? 'text-purple-500' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <FiUsers size={20} />
          <span className="text-[10px] font-medium">Comunidade</span>
        </button>

        <button
          onClick={() => {
            setTabAtiva('chat');
            if (onMudarTela) onMudarTela('chat');
          }}
          className={`flex flex-col items-center gap-1 transition cursor-pointer ${tabAtiva === 'chat' ? 'text-purple-500' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <FiMessageSquare size={20} />
          <span className="text-[10px] font-medium">Chat</span>
        </button>

        <button
          onClick={() => {
            setTabAtiva('lista');
            if (onMudarTela) onMudarTela('lista');
          }}
          className={`flex flex-col items-center gap-1 transition cursor-pointer ${tabAtiva === 'lista' ? 'text-purple-500' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <FiList size={20} />
          <span className="text-[10px] font-medium">Lista</span>
        </button>
      </nav>
    </div>
  );
}