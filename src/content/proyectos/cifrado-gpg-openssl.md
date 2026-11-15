---
titulo: Cifrado asimétrico con GPG y OpenSSL
resumen: Generación, exportación e importación de pares de claves, cifrado y descifrado de ficheros entre dos identidades, y comprobación de que sin la clave privada no es posible descifrar.
area: ciberseguridad
categoria: cripto-gobierno
tipo: laboratorio
estado: B
destacado: false
orden: 1
fecha: Curso 2025–2026
contexto: Práctica del módulo de Bastionado de redes y sistemas sobre protección de la información.
objetivo: Entender el ciclo de vida de un par de claves y el uso de la criptografía asimétrica para enviar información confidencial.
entorno:
  - "Ubuntu Desktop 22.04."
herramientas: [GnuPG, OpenSSL]
resultados:
  - "Se generan dos pares de claves RSA con caducidad para simular emisor y receptor."
  - "Un PDF cifrado con la clave pública del receptor se descifra con su clave privada."
  - "Tras eliminar temporalmente la clave privada del receptor, el descifrado falla; se restaura desde una copia exportada."
  - "Las claves se eliminan en el orden correcto: primero la privada y después la pública."
decisiones:
  - "Definir una fecha de caducidad en las claves y hacer copia de la clave privada antes de cualquier prueba destructiva."
limitaciones:
  - "El informe original incluye la frase de paso usada en la práctica; por eso no se publica."
  - "Ambas identidades estaban en el mismo equipo, así que no se probó un intercambio real entre personas."
recomendaciones:
  - "No reutilizar nunca una frase de paso que haya aparecido en un documento."
competencias: [linux, metodologia]
pendiente:
  - Copia del informe sin la frase de paso y revisión de la parte de OpenSSL.
---

```bash
gpg --full-generate-key                      # RSA 3072, caducidad 1 mes
gpg --export -a "Emisor" > emisor.asc
gpg --import receptor.asc
gpg -e -u "Emisor" -r "Receptor" Apuntes.pdf
gpg -d Apuntes.pdf.gpg > apuntes_descifrado.pdf
gpg --export-secret-keys -a receptor > receptor_secret_backup.asc
gpg --delete-secret-key receptor && gpg -d Apuntes.pdf.gpg   # falla
gpg --import receptor_secret_backup.asc
```
