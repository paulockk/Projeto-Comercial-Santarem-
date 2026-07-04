export const COMPANY = {
  name: import.meta.env.VITE_COMPANY_NAME || "Comercial Santarém",
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || "",
  phone: "(14) 3264-1886",
  address:
    "Av. Padre Salustio Rodrigues Machado, 485 - Centro, Lençóis Paulista - SP, 18682-080",
  openingHours: "Seg a Sex: 07h30-18h | Sáb: 07h30-12h",
  mapsEmbedUrl:
    "https://www.google.com/maps/place/Comercial+Santarem/@-22.6055727,-48.8036712,16.32z/data=!4m6!3m5!1s0x94c0b760744d506d:0xec0e71a91b230a89!8m2!3d-22.6053516!4d-48.8029387!16s%2Fg%2F11xkg45fqz?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D",
  developer: {
    name: "Arthur / Paulo",
    url: "#",
  },
} as const;
