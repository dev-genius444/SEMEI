import  { useState } from 'react';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticação futura
    console.log('Login efetuado com:', { email, senha });
  };

  return (
    <div className="bg-[#000000] text-white min-h-screen flex flex-col justify-between px-6 py-8 relative font-sans max-w-md mx-auto">
      
      {/* --- TOPO / CABEÇALHO --- */}
      <div className="pt-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-wider text-purple-400 mb-2">SEMEI</h1>
        <p className="text-sm text-zinc-400">Entre na sua conta para continuar</p>
      </div>

      {/* --- FORMULÁRIO DE LOGIN --- */}
      <form onSubmit={handleSubmit} className="space-y-4 my-auto">
        
        {/* Campo de E-mail */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-400 ml-1">E-mail</label>
          <div className="flex items-center bg-zinc-900 rounded-xl px-3 py-3 border border-zinc-800 focus-within:border-purple-600 transition">
            <FiMail className="text-zinc-400 mr-3" size={18} />
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent text-sm text-white placeholder-zinc-600 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Campo de Senha */}
        <div className="space-y-1">
          <div className="flex justify-between items-center ml-1">
            <label className="text-xs font-medium text-zinc-400">Senha</label>
            <a href="#recuperar" className="text-xs text-purple-400 hover:underline">Esqueceu?</a>
          </div>
          <div className="flex items-center bg-zinc-900 rounded-xl px-3 py-3 border border-zinc-800 focus-within:border-purple-600 transition">
            <FiLock className="text-zinc-400 mr-3" size={18} />
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="bg-transparent text-sm text-white placeholder-zinc-600 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Botão de Entrar */}
        <button
          type="submit"
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50 cursor-pointer"
        >
          <span>Entrar</span>
          <FiArrowRight size={18} />
        </button>

      </form>

      {/* --- RODAPÉ DO LOGIN --- */}
      <div className="text-center pb-4">
        <p className="text-xs text-zinc-500">
          Não tem uma conta?{' '}
          <a href="#cadastro" className="text-purple-400 font-medium hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>

    </div>
  );
}