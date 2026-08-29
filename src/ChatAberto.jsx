import { useState, useRef, useEffect } from 'react';
import {
  FiArrowLeft,
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiPaperclip,
  FiMic,
  FiSend
} from 'react-icons/fi';

export default function ChatAberto({ contato, onVoltar }) {
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([
    { id: 1, texto: 'Olá! Tudo bem com você?', remetente: 'outro', hora: '12:40' },
    { id: 2, texto: 'Tudo sim! E por aí, como estão as coisas?', remetente: 'eu', hora: '12:42' },
    { id: 3, texto: 'Estão indo muito bem. Passando para confirmar nossa reunião de logo mais.', remetente: 'outro', hora: '12:45' },
  ]);

  const fimMensagensRef = useRef(null);

  // Rola até o final sempre que uma mensagem for enviada/recebida
  useEffect(() => {
    fimMensagensRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  const enviarMensagem = (e) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    const novaMensagem = {
      id: Date.now(),
      texto: mensagem,
      remetente: 'eu',
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMensagens((prev) => [...prev, novaMensagem]);
    setMensagem('');
  };

  return (
    <div className="bg-black text-white h-full flex flex-col font-sans relative overflow-hidden">

      {/* --- TOPO DO CHAT ABERTO --- */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={onVoltar} className="text-zinc-300 hover:text-purple-500 transition cursor-pointer">
            <FiArrowLeft size={22} />
          </button>

          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src={contato?.foto || 'https://via.placeholder.com/100'}
              alt={contato?.nome || 'Contato'}
              className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
            />
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">{contato?.nome || 'Usuário'}</h2>
              <span className="text-[10px] text-purple-400 font-medium">{contato?.status || 'Offline'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-zinc-300">
          <button className="hover:text-purple-500 transition cursor-pointer"><FiVideo size={20} /></button>
          <button className="hover:text-purple-500 transition cursor-pointer"><FiPhone size={18} /></button>
          <button className="hover:text-purple-500 transition cursor-pointer"><FiMoreVertical size={18} /></button>
        </div>
      </header>

      {/* --- CORPO / LISTA DE MENSAGENS --- */}
      <main className="flex-1 px-4 py-4 space-y-3 overflow-y-auto pb-20">
        {mensagens.map((msg) => {
          const ehMeu = msg.remetente === 'eu';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${ehMeu ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  ehMeu
                    ? 'bg-purple-600 text-white rounded-br-none shadow-lg shadow-purple-950/40'
                    : 'bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-bl-none'
                }`}
              >
                <p>{msg.texto}</p>
              </div>
              <span className="text-[10px] text-zinc-500 mt-1 px-1">{msg.hora}</span>
            </div>
          );
        })}
        <div ref={fimMensagensRef} />
      </main>

      {/* --- RODAPÉ / INPUT DE DIGITAÇÃO --- */}
      <footer className="shrink-0 p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2 z-50">
        <button className="text-zinc-400 hover:text-purple-500 transition p-2 cursor-pointer">
          <FiPaperclip size={20} />
        </button>

        <form onSubmit={enviarMensagem} className="flex-1 flex items-center bg-zinc-900 rounded-full px-4 py-2 border border-zinc-800 focus-within:border-purple-600 transition">
          <input
            type="text"
            placeholder="Digite uma mensagem..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none w-full"
          />
        </form>

        {mensagem.trim() ? (
          <button
            onClick={enviarMensagem}
            className="bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-full transition shadow-md shadow-purple-900/50 cursor-pointer"
          >
            <FiSend size={18} />
          </button>
        ) : (
          <button className="text-zinc-400 hover:text-purple-500 transition p-2 cursor-pointer">
            <FiMic size={20} />
          </button>
        )}
      </footer>
    </div>
  );
}