import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Target,
  Zap,
  Cpu,
  Award,
  Mail,
  Phone,
  Moon,
  Image as ImageIcon,
  FileText,
  Loader2,
  Database,
  Server,
} from "lucide-react";

// --- TYPESCRIPT INTERFACES ---
interface Ventaja {
  titulo: string;
  items: string[];
}

interface Tecnologia {
  nombre: string;
  desc: string;
}

interface CasoExito {
  titulo: string;
  etiqueta: string;
  desc: string;
}

interface OnePagerData {
  nombre: string;
  rol: string;
  propuestaValor: string;
  ventajas: Ventaja[];
  tecnologias: Tecnologia[];
  casosExito: CasoExito[];
}

interface FormParams {
  cliente: string;
  rubro: string;
  problema: string;
  tono: string;
}
// -----------------------------

export default function App() {
  // Le avisamos a TypeScript que esta referencia es para un Div (HTMLDivElement)
  const onePagerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Estado con los datos por defecto (usando la interfaz OnePagerData)
  const [data, setData] = useState<OnePagerData>({
    nombre: "NEHUEN MESIAS",
    rol: "Desarrollador Web Full Stack",
    propuestaValor:
      "Transformación del manejo operativo tradicional hacia un sistema web a medida, seguro y en tiempo real. El objetivo es eliminar la pérdida de información, optimizar los tiempos de cada empleado y maximizar la rentabilidad del negocio mediante datos precisos.",
    ventajas: [
      {
        titulo: "Stock y Estadística",
        items: [
          "Visualización exacta del inventario al instante.",
          "Panel de control para identificar productos de mayor o menor rotación.",
        ],
      },
      {
        titulo: "Trazabilidad Total",
        items: [
          "Registro detallado del flujo de mercadería.",
          "Sistema intuitivo y estructurado para que cualquier empleado lo aprenda a usar rápido.",
        ],
      },
    ],
    tecnologias: [
      {
        nombre: "Bases de Datos Robustas (MySQL):",
        desc: "Para garantizar que no se pierda ni un solo dato de stock o facturación.",
      },
      {
        nombre: "Entornos Rápidos y Seguros:",
        desc: "Uso de React y Node.js para que el sistema responda al instante, sin tiempos de carga eternos.",
      },
    ],
    casosExito: [
      {
        titulo: "Sistema de Caja y Stock",
        etiqueta: "(Cafetería)",
        desc: "Desarrollo de una aplicación que conecta en tiempo real la toma de pedidos con el área de preparación, automatizando el control de inventario y agilizando el flujo de trabajo.",
      },
      {
        titulo: "Portal de Contenidos",
        etiqueta: "(Gestión)",
        desc: "Desarrollo de una plataforma web integrada con servicios en la nube para la gestión, almacenamiento seguro y distribución eficiente de archivos digitales.",
      },
    ],
  });

  // Estado para el formulario de la diseñadora
  const [formParams, setFormParams] = useState<FormParams>({
    cliente: "",
    rubro: "",
    problema: "",
    tono: "Ejecutivo",
  });

  // Simulación de la llamada al backend/IA
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Hacemos el llamado a nuestro nuevo backend
      const response = await fetch("http://localhost:3000/api/generar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formParams),
      });

      if (!response.ok) throw new Error("Error en el servidor");

      const dataIA = await response.json();

      // Actualizamos el estado con los datos mágicos de la IA
      setData({
        ...data,
        propuestaValor: dataIA.propuestaValor,
        ventajas: dataIA.ventajas,
        tecnologias: dataIA.tecnologias,
        casosExito: dataIA.casosExito,
      });
    } catch (error) {
      console.error("Fallo la matrix:", error);
      alert(
        "No se pudo generar la propuesta. Revisa que el backend esté corriendo.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPNG = () => {
    if (!onePagerRef.current) return;
    html2canvas(onePagerRef.current, {
      scale: 2,
      backgroundColor: isDarkMode ? "#0d0d0d" : "#ffffff",
      useCORS: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `Propuesta-${formParams.cliente || "LightAndCode"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div
      className={`flex h-screen w-full overflow-hidden ${isDarkMode ? "dark bg-neutral-900" : "bg-neutral-100"}`}
    >
      {/* PANEL IZQUIERDO: Controles */}
      <aside className="w-1/4 min-w-[320px] max-w-[400px] bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 flex flex-col shadow-xl z-20">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            Generador L&C
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Configura la propuesta para el cliente
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Nombre del Cliente / Empresa
            </label>
            <input
              type="text"
              placeholder="Ej: Cafetería El Grano"
              className="w-full p-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm dark:text-white focus:ring-2 focus:ring-[#8b5cf6] outline-none"
              onChange={(e) =>
                setFormParams({ ...formParams, cliente: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Rubro
            </label>
            <input
              type="text"
              placeholder="Ej: Gastronomía"
              className="w-full p-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm dark:text-white focus:ring-2 focus:ring-[#8b5cf6] outline-none"
              onChange={(e) =>
                setFormParams({ ...formParams, rubro: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Problema a resolver
            </label>
            <textarea
              rows={3}
              placeholder="Ej: Pierden el control del stock y el sistema actual es muy lento..."
              className="w-full p-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm dark:text-white focus:ring-2 focus:ring-[#8b5cf6] outline-none resize-none"
              onChange={(e) =>
                setFormParams({ ...formParams, problema: e.target.value })
              }
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Tono de la Propuesta
            </label>
            <select
              className="w-full p-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm dark:text-white focus:ring-2 focus:ring-[#8b5cf6] outline-none"
              onChange={(e) =>
                setFormParams({ ...formParams, tono: e.target.value })
              }
            >
              <option>Ejecutivo / Formal</option>
              <option>Creativo / Dinámico</option>
              <option>Técnico / Detallado</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 bg-[#8b5cf6] text-white px-4 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-[#7c3aed] transition-all disabled:opacity-70"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Zap className="w-5 h-5" />
            )}
            {isGenerating ? "Generando con IA..." : "Generar Propuesta con IA"}
          </button>
        </div>
      </aside>

      {/* PANEL DERECHO: Vista Previa y Exportación */}
      <main className="flex-1 relative flex flex-col bg-neutral-200 dark:bg-neutral-900 transition-colors duration-300">
        {/* Herramientas */}
        <div className="absolute top-6 right-6 flex gap-3 z-50">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-2 bg-white dark:bg-white/10 border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-neutral-50 transition-all shadow-sm"
          >
            <Moon className="w-4 h-4" /> Tema
          </button>
          <button
            onClick={downloadPNG}
            className="flex items-center gap-2 bg-[#8b5cf6] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:bg-[#7c3aed] transition-all"
          >
            <ImageIcon className="w-4 h-4" /> PNG
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white dark:bg-white/10 border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-neutral-50 transition-all shadow-sm"
          >
            <FileText className="w-4 h-4" /> Imprimir / PDF
          </button>
        </div>

        {/* Contenedor scrolleable del One Pager */}
        <div className="flex-1 overflow-y-auto py-10 px-4 flex items-start justify-center">
          <div
            id="one-pager"
            ref={onePagerRef}
            className="relative w-[210mm] h-[297mm] bg-white dark:bg-[#0d0d0d] rounded-2xl border border-neutral-200 dark:border-white/10 shadow-2xl flex flex-col shrink-0 print:border-none print:rounded-none print:shadow-none print:w-full print:h-full transition-colors duration-300 overflow-hidden"
          >
            {/* Background Effects */}
            <div
              className="absolute inset-0 pointer-events-none opacity-50 z-0"
              style={{
                backgroundImage: isDarkMode
                  ? "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)"
                  : "linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            ></div>
            <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#8b5cf6] opacity-[0.20] dark:opacity-[0.25] blur-[100px] rounded-full pointer-events-none z-0"></div>
            <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#6d28d9] opacity-[0.15] dark:opacity-[0.20] blur-[100px] rounded-full pointer-events-none z-0"></div>

            {/* Header */}
            <header className="relative z-10 px-10 pt-12 pb-8 border-b border-neutral-200 dark:border-white/10 flex justify-between items-start">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#8b5cf6]/10 border border-[#8b5cf6]/25 rounded-full px-3 py-1 mb-4">
                  <div className="w-1.5 h-1.5 bg-[#8b5cf6] dark:bg-[#a78bfa] rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-purple-700 dark:text-[#c084fc] tracking-wide uppercase">
                    Propuesta Ejecutiva
                  </span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-neutral-900 dark:text-white mb-2 leading-none">
                  {data.nombre}
                </h1>
                <h2 className="text-xl font-medium text-neutral-500 dark:text-white/60">
                  {data.rol}
                </h2>

                <div className="flex items-center gap-4 mt-6 text-xs text-neutral-500 dark:text-white/50 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#8b5cf6]" />
                    <a
                      href="mailto:nehuenmesiasrios@gmail.com"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      nehuenmesiasrios@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#8b5cf6]" />
                    +54 9 2901 63-2153
                  </div>
                </div>
              </div>

              {/* QR Block */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "#6d28d9",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    textAlign: "center",
                    marginBottom: "6px",
                    lineHeight: 1.5,
                  }}
                >
                  ¿Querés ver
                  <br />
                  estos proyectos
                  <br />
                  funcionando?
                </div>
                <div
                  style={{
                    width: "88px",
                    height: "88px",
                    background: "white",
                    border: "2px solid #7c3aed",
                    borderRadius: "8px",
                    padding: "4px",
                    position: "relative",
                  }}
                >
                  <img
                    src="/api/placeholder/88/88"
                    alt="QR"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: "7px",
                    background: "#7c3aed",
                    color: "white",
                    fontSize: "8px",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                >
                  Escaneá este QR
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 px-10 py-8 flex flex-col gap-8">
              <section className="flex gap-6">
                <div className="w-1/3 shrink-0">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#8b5cf6]" /> Propuesta de
                    Valor
                  </h3>
                </div>
                <div
                  className="w-2/3 text-neutral-600 dark:text-white/70 text-sm leading-relaxed"
                  contentEditable
                  suppressContentEditableWarning
                >
                  {data.propuestaValor}
                </div>
              </section>

              <div className="w-full h-px bg-neutral-200 dark:bg-white/5"></div>

              <section className="flex gap-6">
                <div className="w-1/3 shrink-0">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#8b5cf6]" /> Ventajas Clave
                  </h3>
                </div>
                <div className="w-2/3 grid grid-cols-2 gap-x-6 gap-y-4">
                  {data.ventajas.map((ventaja, idx) => (
                    <div key={idx}>
                      <h4
                        className="text-sm font-semibold text-neutral-900 dark:text-white mb-1"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        {ventaja.titulo}
                      </h4>
                      <ul className="text-xs text-neutral-600 dark:text-white/60 space-y-1.5 list-disc pl-3 marker:text-[#8b5cf6]">
                        {ventaja.items.map((item, i) => (
                          <li
                            key={i}
                            contentEditable
                            suppressContentEditableWarning
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <div className="w-full h-px bg-neutral-200 dark:bg-white/5"></div>

              <section className="flex gap-6">
                <div className="w-1/3 shrink-0">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-[#8b5cf6]" /> Tecnologías
                  </h3>
                </div>
                <div className="w-2/3 space-y-3">
                  {data.tecnologias.map((tech, idx) => (
                    <div className="flex items-start gap-3" key={idx}>
                      <div className="mt-0.5 w-5 h-5 rounded bg-[#8b5cf6]/10 flex items-center justify-center shrink-0 border border-[#8b5cf6]/20">
                        {idx === 0 ? (
                          <Database className="w-3 h-3 text-purple-600 dark:text-[#c084fc]" />
                        ) : (
                          <Server className="w-3 h-3 text-purple-600 dark:text-[#c084fc]" />
                        )}
                      </div>
                      <div>
                        <span
                          className="text-sm font-semibold text-neutral-900 dark:text-white"
                          contentEditable
                          suppressContentEditableWarning
                        >
                          {tech.nombre}
                        </span>
                        <p
                          className="text-xs text-neutral-500 dark:text-white/60 mt-0.5"
                          contentEditable
                          suppressContentEditableWarning
                        >
                          {tech.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="w-full h-px bg-neutral-200 dark:bg-white/5"></div>

              <section className="flex gap-6">
                <div className="w-1/3 shrink-0">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#8b5cf6]" /> Casos de Éxito
                  </h3>
                </div>
                <div className="w-2/3 space-y-4">
                  {data.casosExito.map((caso, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-200 dark:bg-white/5 border border-neutral-300 dark:border-white/10 rounded-lg p-3"
                    >
                      <h4
                        className="text-sm font-semibold text-neutral-900 dark:text-white mb-1"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        {caso.titulo}{" "}
                        <span className="text-purple-600 dark:text-[#a78bfa] font-mono text-xs ml-1">
                          {caso.etiqueta}
                        </span>
                      </h4>
                      <p
                        className="text-xs text-neutral-600 dark:text-white/60"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        {caso.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </main>

            {/* Footer */}
            <footer className="relative z-10 px-10 py-6 mt-auto bg-neutral-100 dark:bg-black/40 border-t border-neutral-200 dark:border-white/10 flex justify-between items-center">
              <div className="text-[10px] text-neutral-500 dark:text-white/40 font-mono">
                DESARROLLO WEB A MEDIDA · ARQUITECTURA MERN
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    color: "#9ca3af",
                    fontStyle: "italic",
                  }}
                >
                  ¿Querés ver el código?
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 900,
                    color: "#8b5cf6",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Escaneá el QR ↑
                </span>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
