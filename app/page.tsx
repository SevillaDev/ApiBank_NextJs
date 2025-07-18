"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    first_Name: "",
    second_Name: "",
    last_Name: "",
    second_Last_Name: "",
    id_Number: "",
    email: "",
  });

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({
        first_Name: "",
        second_Name: "",
        last_Name: "",
        second_Last_Name: "",
        id_Number: "",
        email: "",
      });
      fetchUsers();
    }else{
      console.error("Error al registrar usuario");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;

    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setForm({
          first_Name: "",
          second_Name: "",
          last_Name: "",
          second_Last_Name: "",
          id_Number: "",
          email: "",
        });
        fetchUsers();
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-indigo-600 shadow-md py-4 px-8 flex items-center justify-between">
        <div className="text-white text-2xl font-bold tracking-tight">
          Gestión de Usuarios
        </div>
        
        {/* Puedes agregar más elementos aquí si lo deseas */}
      </nav>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-white py-10">
        {/* Card del formulario con mismo tamaño que la tabla */}
        <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md p-10 rounded-xl shadow-2xl border border-indigo-100">
          <h1 className="text-3xl font-bold mb-8 text-center text-indigo-800 tracking-tight">
            Registro de Usuario
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8 mb-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Primer Nombre */}
              <div>
                <label
                  htmlFor="first_Name"
                  className="block text-indigo-700 font-semibold mb-2"
                >
                  Primer Nombre
                </label>
                <input
                  name="first_Name"
                  id="first_Name"
                  value={form.first_Name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-indigo-50 px-4 py-3 text-gray-900 transition placeholder:text-indigo-300 shadow-sm"
                  placeholder="Ej: Juan"
                  required
                  autoComplete="off"
                />
              </div>
              {/* Segundo Nombre */}
              <div>
                <label
                  htmlFor="second_Name"
                  className="block text-indigo-700 font-semibold mb-2"
                >
                  Segundo Nombre
                </label>
                <input
                  name="second_Name"
                  id="second_Name"
                  value={form.second_Name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-indigo-50 px-4 py-3 text-gray-900 transition placeholder:text-indigo-300 shadow-sm"
                  placeholder="Ej: Carlos"
                  required
                  autoComplete="off"
                />
              </div>
              {/* Primer Apellido */}
              <div>
                <label
                  htmlFor="last_Name"
                  className="block text-indigo-700 font-semibold mb-2"
                >
                  Primer Apellido
                </label>
                <input
                  name="last_Name"
                  id="last_Name"
                  value={form.last_Name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-indigo-50 px-4 py-3 text-gray-900 transition placeholder:text-indigo-300 shadow-sm"
                  placeholder="Ej: Pérez"
                  required
                  autoComplete="off"
                />
              </div>
              {/* Segundo Apellido */}
              <div>
                <label
                  htmlFor="second_Last_Name"
                  className="block text-indigo-700 font-semibold mb-2"
                >
                Segundo Apellido
                </label>
                <input
                  name="second_Last_Name"
                  id="second_Last_Name"
                  value={form.second_Last_Name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-indigo-50 px-4 py-3 text-gray-900 transition placeholder:text-indigo-300 shadow-sm"
                  placeholder="Ej: Gómez"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            {/* Número de Identificación */}
            <div>
              <label
                htmlFor="id_Number"
                className="block text-indigo-700 font-semibold mb-2"
              >
                Número de Identificación
              </label>
              <input
                name="id_Number"
                id="id_Number"
                value={form.id_Number}
                onChange={handleChange}
                className="w-full rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-indigo-50 px-4 py-3 text-gray-900 transition placeholder:text-indigo-300 shadow-sm"
                placeholder="Ej: 123456789"
                required
                autoComplete="off"
              />
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-indigo-700 font-semibold mb-2"
              >
                Correo Electrónico
              </label>
              <input
                name="email"
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-indigo-50 px-4 py-3 text-gray-900 transition placeholder:text-indigo-300 shadow-sm"
                placeholder="Ej: correo@dominio.com"
                required
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-600 transition text-lg mt-4"
            >
              Registrar Usuario
            </button>
          </form>
        </div>

        {/* Tabla de usuarios abajo de la tarjeta */}
        <div className="w-full max-w-4xl mt-12 px-2">
          <div className="rounded-2xl bg-white shadow-xl border border-indigo-100 p-6 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="hidden md:flex items-center justify-center rounded-full bg-indigo-100 border-2 border-indigo-400 w-16 h-16">
                <svg
                  className="w-8 h-8 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 5.87V17a4 4 0 00-3-3.87M12 12a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-indigo-800">
                  Usuarios Registrados
                </h2>
                
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-indigo-100">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                      Primer Nombre
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                      Segundo Nombre
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                      Primer Apellido
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                      Segundo Apellido
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                      Identificación
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                      Eliminar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-50">
                  {users.map((user: any) => (
                    <tr key={user.id} className="hover:bg-indigo-50 transition">
                      <td className="px-4 py-2">{user.first_Name}</td>
                      <td className="px-4 py-2">{user.second_Name}</td>
                      <td className="px-4 py-2">{user.last_Name}</td>
                      <td className="px-4 py-2">{user.second_Last_Name}</td>
                      <td className="px-4 py-2">{user.id_Number}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                        No hay usuarios registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
