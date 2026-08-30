import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chat from './Chat';
import ChatAberto from './ChatAberto';
import Lista from './Lista';
import Comunidade from './Comunidade';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('chat'); // 'chat', 'lista', 'comunidade', 'chat-aberto'
  const [contatoAtivo, setContatoAtivo] = useState(null);

  const abrirConversa = (conversa) => {
    setContatoAtivo(conversa);
    setTelaAtual('chat-aberto');
  };

  return (
    <div className="bg-black text-white h-screen w-full relative font-sans max-w-md mx-auto overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {telaAtual === 'chat-aberto' ? (
          <motion.div
            key="chat-aberto"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full h-full absolute inset-0 z-40 bg-black"
          >
            <ChatAberto contato={contatoAtivo} onVoltar={() => setTelaAtual('chat')} />
          </motion.div>
        ) : telaAtual === 'lista' ? (
          <motion.div
            key="lista"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full absolute inset-0 bg-black"
          >
            <Lista onMudarTela={setTelaAtual} />
          </motion.div>
        ) : telaAtual === 'comunidade' ? (
          <motion.div
            key="comunidade"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full absolute inset-0 bg-black"
          >
            <Comunidade onMudarTela={setTelaAtual} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full absolute inset-0 bg-black"
          >
            <Chat onAbrirConversa={abrirConversa} onMudarTela={setTelaAtual} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}