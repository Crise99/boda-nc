# Boda de Cristian y Nuria

¡Bienvenidos a la página oficial de la boda de Cristian y Nuria!

## ⚙️ Frontmatter de las Experiencias

```yaml
---
# Campos obligatorios
title: "Título de la experiencia"
description: "Descripción detallada de la experiencia"
heroImage: "@assets/experiences/ejemplo/hero.jpg"
clients: ["Cliente 1", "Cliente 2"]
location: "Ubicación de la experiencia"
images:
  [
    ["@assets/experiences/ejemplo/img1.jpg"],
    ["@assets/experiences/ejemplo/img2-1.jpg", "@assets/experiences/ejemplo/img2-2.jpg"],
    [
      "@assets/experiences/ejemplo/img3-1.jpg",
      "@assets/experiences/ejemplo/img3-2.jpg",
      "@assets/experiences/ejemplo/img3-3.jpg",
    ],
  ]
date: 2025-06-25
order: 1

# Campos opcionales
headerImage: "@assets/experiences/ejemplo/header.jpg"
draft: false
---
```

> Nota: Cada array dentro de `images` debe contener 1, 2 o 3 imágenes.
