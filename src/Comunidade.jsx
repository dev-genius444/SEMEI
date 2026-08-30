import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMenu, 
  FiSearch, 
  FiUsers, 
  FiMessageSquare, 
  FiList,
  FiHeart,
  FiShare2,
  FiPlus
} from 'react-icons/fi';

export default function Comunidade({ onMudarTela }) {
  const [tabAtiva, setTabAtiva] = useState('comunidade');
  const [busca, setBusca] = useState('');

  // Exemplo de postagens/avisos da comunidade
  const [posts, setPosts] = useState([
    {
      id: 1,
      autor: 'Pr. João Silva',
      cargo: 'Liderança',
      tempo: 'Há 2 horas',
      conteúdo: 'Atenção irmãos! Teremos nosso culto de jovens nesta sexta-feira às 19:30h. Venham participar e traga um convidado!',
      curtidas: 24,
      curtido: false,
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
    },
    {
      id: 2,
      autor: 'Departamento de Louvor',
      cargo: 'Ministério',
      tempo: 'Ontem',
      conteúdo: 'Novas escalas de ensaio já estão disponíveis no grupo de música. Verifiquem os horários!',
      curtidas: 15,
      curtido: true,
      foto: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=faces'
    }
  ]);

  const curtirPost = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          curtido: !post.curtido,
          curtidas: post.curtido ? post.curtidas - 1 : post.curtidas + 1
        };
      }
      return post;
    }));
  };

  const postsFiltrados = posts.filter(p => 
    p.conteúdo.toLowerCase().includes(busca.toLowerCase()) ||
    p.autor.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <motion.div
      key="comunidade"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col pb-24 bg-black text-white h-full overflow-hidden relative"
    >
      {/* TOPO */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-zinc-800">
        <button className="text-zinc-300 hover:text-purple-500 transition cursor-pointer">
          <FiMenu size={24} />
        </button>
        <h1 className="text-lg font-bold tracking-wide text-purple-400">COMUNIDADE</h1>
        
        <button 
          className="text-purple-400 hover:text-purple-300 transition cursor-pointer p-1" 
          title="Nova Publicação"
        >
          <FiPlus size={22} />
        </button>
      </header>

      {/* PESQUISA */}
      <div className="px-4 py-3 shrink-0">
        <div className="flex items-center bg-zinc-900 rounded-xl px-3 py-2 border border-zinc-800 focus-within:border-purple-600 transition">
          <FiSearch className="text-zinc-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Buscar avisos e publicações..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* FEED DE PUBLICAÇÕES */}
      <main className="flex-1 px-4 py-2 space-y-3 overflow-y-auto">
        {postsFiltrados.length > 0 ? (
          postsFiltrados.map((post) => (
            <div 
              key={post.id}
              className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 space-y-3"
            >
              {/* Cabeçalho do Post */}
              <div className="flex items-center gap-3">
                <img 
                  src={post.foto} 
                  alt={post.autor} 
                  className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
                />
                <div>
                  <h2 className="text-sm font-semibold text-zinc-100">{post.autor}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-purple-400 font-medium">{post.cargo}</span>
                    <span className="text-[10px] text-zinc-500">• {post.tempo}</span>
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <p className="text-xs text-zinc-300 leading-relaxed">
                {post.conteúdo}
              </p>

              {/* Ações (Curtir / Compartilhar) */}
              <div className="flex items-center gap-4 pt-2 border-t border-zinc-800/40">
                <button 
                  onClick={() => curtirPost(post.id)}
                  className={`flex items-center gap-1.5 text-xs transition cursor-pointer ${
                    post.curtido ? 'text-purple-500 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <FiHeart size={16} className={post.curtido ? 'fill-purple-500' : ''} />
                  <span>{post.curtidas}</span>
                </button>

                <button className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition cursor-pointer">
                  <FiShare2 size={16} />
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-zinc-500 text-sm">
            Nenhuma publicação encontrada.
          </div>
        )}
      </main>

      {/* TABBAR FLUTUANTE */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl z-50">
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
    </motion.div>
  );
}