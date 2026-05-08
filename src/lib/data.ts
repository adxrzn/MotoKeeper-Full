export interface Mantenimiento {
  id: string;
  titulo: string;
  moto: string;
  descripcion: string;
  imagen: string;
  materiales: string[];
  fecha: string;
}

export const mantenimientos: Mantenimiento[] = [
  {
    id: "cambio-aceite-mt07",
    titulo: "Cambio de Aceite y Filtro",
    moto: "Yamaha MT-07",
    descripcion: "Mantenimiento preventivo de los 10.000km. Se utilizó aceite sintético de alta calidad.",
    imagen: "/aceite.jpg", 
    materiales: ["Aceite 10W40", "Filtro K&N", "Arandela cárter"],
    fecha: "2024-03-20"
  },
  {
    id: "limpieza-cadena",
    titulo: "Limpieza y Tensado",
    moto: "Honda CB650R",
    descripcion: "Limpieza profunda con cepillo y desengrasante tras ruta lluviosa.",
    imagen: "/cadena.jpg",
    materiales: ["Limpiador Motul", "Grasa de litio", "Cepillo"],
    fecha: "2024-03-25"
  }
];