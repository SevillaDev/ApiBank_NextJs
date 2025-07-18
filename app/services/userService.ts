// services/userService.ts

export const getUsers = async () => {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
};

export const createUser = async (data: any) => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear usuario");
  return res.json();
};

export const deleteUser = async (id: number) => {
  const res = await fetch("/api/users", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Error al eliminar usuario");
  return res.json();
};
