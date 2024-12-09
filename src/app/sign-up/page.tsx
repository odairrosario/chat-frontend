"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { usersHttpService } from "@/services/http/users-http.service";
import toast from "react-hot-toast";
import Link from "next/link";

interface SignUpForm {
  name: string;
  username: string;
  password: string;
}

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpForm>({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await usersHttpService.create(formData);
      
      toast.success("Cadastro realizado com sucesso!");
      router.push("/sign-in");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao cadastrar");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-slate-700 text-2xl font-semibold mb-6">Sign Up</h1>
        <form className="flex flex-col w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-slate-500 mb-2 font-medium">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              className="text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="username" className="text-slate-500 mb-2 font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Digite seu username"
              className="text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-slate-500 mb-2 font-medium">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              className="text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="p-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Cadastrar
          </button>
          
          <Link
            href="/sign-in"
            className="p-2 justify-center text-center bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Voltar
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
