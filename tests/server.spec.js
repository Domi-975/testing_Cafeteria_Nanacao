const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    // Test 1: GET /cafes devuelve status 200 y un arreglo con al menos 1 objeto
    it("GET /cafes devuelve status 200 y un arreglo con al menos 1 objeto", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test 2: DELETE /cafes/:id devuelve 404 si el id no existe (requiere token)
    it("DELETE /cafes/:id devuelve 404 si el id no existe", async () => {
        const response = await request(server)
            .delete("/cafes/999")  // ID que no existe
            .set("Authorization", "Bearer token");  // Agregar token para pasar la validación inicial
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("No se encontró ningún cafe con ese id");
    });

    // Test 3: POST /cafes agrega un nuevo café y devuelve 201
    it("POST /cafes agrega un nuevo café y devuelve 201", async () => {
        const nuevoCafe = { id: 5, nombre: "Latte" };
        const response = await request(server)
            .post("/cafes")
            .send(nuevoCafe);
        expect(response.status).toBe(201);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toContainEqual(nuevoCafe);  
    });

    // Test 4: PUT /cafes/:id devuelve 400 si el id del param no coincide con el id del body
    it("PUT /cafes/:id devuelve 400 si el id del param no coincide con el id del body", async () => {
        const cafeActualizado = { id: 2, nombre: "Americano Actualizado" };  // ID en body es 2
        const response = await request(server)
            .put("/cafes/1")  // ID en param es 1 (diferente)
            .send(cafeActualizado);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("El id del parámetro no coincide con el id del café recibido");
    });
});
});

