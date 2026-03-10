import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/generar", async (req, res) => {
  try {
    const { cliente, rubro, problema, tono } = req.body;

    // El modelo a usar (Flash es rapidísimo y barato para texto)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Actúa como un experto en ventas de software B2B para la agencia de desarrollo web "Light & Code".
      Necesito que redactes el contenido comercial para una propuesta tipo One-Pager.
      
      DATOS DEL CLIENTE:
      - Empresa: ${cliente || "Empresa Genérica"}
      - Rubro: ${rubro || "General"}
      - Problema a resolver: ${problema || "Necesitan modernizar su sistema actual"}
      - Tono: ${tono}
      
      REGLAS ESTRICTAS:
      1. No uses nombres de personas físicas, todo debe ser a nombre de la agencia "Light & Code".
      2. Sé directo, persuasivo y resalta el valor de negocio (tiempo, dinero, optimización).
      3. Devuelve ÚNICAMENTE un objeto JSON válido con la siguiente estructura exacta, sin texto extra, sin formato markdown (\`\`\`json):
      
      {
        "propuestaValor": "Un párrafo persuasivo de máximo 4 líneas sobre cómo Light & Code resolverá el problema.",
        "ventajas": [
          { "titulo": "Ventaja 1", "items": ["Punto clave 1", "Punto clave 2"] },
          { "titulo": "Ventaja 2", "items": ["Punto clave 1", "Punto clave 2"] }
        ],
        "tecnologias": [
          { "nombre": "Nombre Tech 1", "desc": "Por qué es útil para este cliente" },
          { "nombre": "Nombre Tech 2", "desc": "Por qué es útil para este cliente" }
        ],
        "casosExito": [
          { "titulo": "Proyecto similar", "etiqueta": "(Rubro)", "desc": "Qué se logró en 2 líneas" },
          { "titulo": "Otro proyecto", "etiqueta": "(Rubro)", "desc": "Qué se logró en 2 líneas" }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    let textoRespuesta = result.response.text();

    // Limpieza por si la IA devuelve los backticks de markdown
    textoRespuesta = textoRespuesta
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonIA = JSON.parse(textoRespuesta);

    res.json(jsonIA);
  } catch (error) {
    console.error("Error en la IA:", error);
    res.status(500).json({ error: "Error al generar la propuesta" });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Backend de Light & Code corriendo en http://localhost:${PORT}`),
);
