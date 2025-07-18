let mockUsers: any[] = [];
let mockCreatedUser: any = {};
let mockDeletedUser: any = {};

vi.mock("@/app/generated/prisma", () => ({
  PrismaClient: class {
    user = {
      findMany: vi.fn(() => Promise.resolve(mockUsers)),
      create: vi.fn(() => Promise.resolve(mockCreatedUser)),
      delete: vi.fn(() => Promise.resolve(mockDeletedUser)),
    };
  },
}));

import { createServer } from "http";
import request from "supertest";
import { GET as getUsers, POST as postUser, DELETE as deleteUser } from "@/app/api/users/route";
import { describe, it, vi, expect, beforeEach } from "vitest";

// Inicializa los mocks antes de cada test
beforeEach(() => {
  mockUsers = [
    {
      id: 1,
      first_Name: "Juan",
      second_Name: "P",
      last_Name: "Perez",
      second_Last_Name: "Lopez",
      id_Number: "1234",
      email: "juan@test.com",
    },
  ];
  mockCreatedUser = {
    id: 2,
    first_Name: "Ana",
    second_Name: "M",
    last_Name: "Garcia",
    second_Last_Name: "Diaz",
    id_Number: "5678",
    email: "ana@test.com",
  };
  mockDeletedUser = mockUsers[0];
});

// Helper para simular NextRequest
function mockNextRequest(jsonData: any) {
  return {
    json: async () => jsonData,
  } as any;
}

// GET test (ya existente)
const getServer = createServer(async (_req, res) => {
  const response = await getUsers();
  const body = await response.json();
  res.writeHead(response.status || 200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
});

describe("GET /api/users", () => {
  it("debe retornar una lista de usuarios", async () => {
    const res = await request(getServer).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers);
  });
});

// POST test
describe("POST /api/users", () => {
  it("debe crear un usuario y devolverlo", async () => {
    const postServer = createServer(async (req, res) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", async () => {
        const json = JSON.parse(body || "{}");
        const response = await postUser(mockNextRequest(json));
        const data = await response.json();
        res.writeHead(response.status || 201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      });
    });

    const res = await request(postServer)
      .post("/api/users")
      .send({
        first_Name: "Ana",
        second_Name: "M",
        last_Name: "Garcia",
        second_Last_Name: "Diaz",
        id_Number: "5678",
        email: "ana@test.com",
      });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockCreatedUser);
  });
});

// DELETE test
describe("DELETE /api/users", () => {
  it("debe eliminar un usuario por id", async () => {
    const deleteServer = createServer(async (req, res) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", async () => {
        const json = JSON.parse(body || "{}");
        const response = await deleteUser(mockNextRequest(json));
        const data = await response.json();
        res.writeHead(response.status || 200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      });
    });

    const res = await request(deleteServer)
      .delete("/api/users")
      .send({ id: 1 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockDeletedUser);
  });

  it("debe retornar 400 si no se envía id", async () => {
    const deleteServer = createServer(async (req, res) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", async () => {
        const json = JSON.parse(body || "{}");
        const response = await deleteUser(mockNextRequest(json));
        const data = await response.json();
        res.writeHead(response.status || 400, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      });
    });

    const res = await request(deleteServer)
      .delete("/api/users")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "ID requerido" });
  });
});
