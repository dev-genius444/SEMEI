import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMenu, 
  FiSearch, 
  FiUsers, 
  FiMessageSquare, 
  FiList,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';

export default function Lista({ onMudarTela }) {
  const [busca, setBusca] = useState('');
  const [tabAtiva, setTabAtiva] = useState('lista');

  // Exemplo de dados para a sua lista de frequência
  const [frequencia, setFrequencia] = useState([
    { id: 1, nome: 'Ana Souza', presente: true, cargo: 'Membro' },
    { id: 2, nome: 'Carlos Eduardo', presente: false, cargo: 'Líder' },
    { id: 3, nome: 'Mariana Lima', presente: true, cargo: 'Visitante' },
    { id: 4, nome: 'João Pedro', presente: true, cargo: 'Membro' },
  ]);

  const frequenciaFiltrada = frequencia.filter(item => 
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const alternarPresenca = (id) => {
    setFrequencia(frequencia.map(item => 
      item.id === id ? { ...item, presente: !item.presente } : item
    ));
  };

  return (
    <motion.div
      key="lista-frequencia"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col pb-24 bg-black text-white h-full overflow-hidden"
    >
      {/* TOPO */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-zinc-800">
        <button className="text-zinc-300 hover:text-purple-500 transition cursor-pointer">
          <FiMenu size={24} />
        </button>
        <h1 className="text-lg font-bold tracking-wide text-purple-400">FREQUÊNCIA</h1>
        
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

      {/* PESQUISA */}
      <div className="px-4 py-3 shrink-0">
        <div className="flex items-center bg-zinc-900 rounded-xl px-3 py-2 border border-zinc-800 focus-within:border-purple-600 transition">
          <FiSearch className="text-zinc-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Buscar na lista..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* LISTA DE DADOS */}
      <main className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
        {frequenciaFiltrada.length > 0 ? (
          frequenciaFiltrada.map((item) => (
            <div 
              key={item.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/60"
            >
              <div>
                <h2 className="text-sm font-semibold text-zinc-100">{item.nome}</h2>
                <span className="text-[10px] text-purple-400 font-medium">{item.cargo}</span>
              </div>

              <button 
                onClick={() => alternarPresenca(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  item.presente 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {item.presente ? (
                  <>
                    <FiCheckCircle size={14} /> Presente
                  </>
                ) : (
                  <>
                    <FiXCircle size={14} /> Ausente
                  </>
                )}
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-zinc-500 text-sm">
            Nenhum registro encontrado.
          </div>
        )}
      </main>

      {/* TABBAR FLUTUANTE */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl z-50">
        <button 
          onClick={() => {
            setTabAtiva('comunidade');
            // if (onMudarTela) onMudarTela('comunidade');
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
    </motion.div>
  );
}