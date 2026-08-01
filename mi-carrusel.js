(function () {
  const dominiosAutorizados = [
    "avinasco-bot.github.io",
    "localhost",
    "127.0.0.1"
  ];

  const dominioActual = window.location.hostname;

  const esAutorizado = dominiosAutorizados.some(dominio => 
    dominioActual === dominio || dominioActual.endsWith("." + dominio)
  );

  if (!esAutorizado) {
    console.error("❌ Error de Licencia: Este carrusel no está autorizado para ejecutarse en el dominio: " + dominioActual);
    return;
  }

  class MiCarruselComponent extends HTMLElement {
    connectedCallback() {
      const colorTexto = this.getAttribute("color-texto") || "#ffffff";
      const tamanoTexto = this.getAttribute("tamano-texto") || "16px";
      const velocidad = parseInt(this.getAttribute("velocidad")) || 3000;

      const slidesHTML = Array.from(this.querySelectorAll("slide")).map(slide => {
        const img = slide.getAttribute("img");
        const caption = slide.getAttribute("caption") || "";
        return `
          <div class="swiper-slide">
            <img src="${img}" alt="Imagen">
            <div class="slide-caption" style="color: ${colorTexto}; font-size: ${tamanoTexto};">
              ${caption}
            </div>
          </div>
        `;
      }).join("");

      this.innerHTML = `
        <div class="swiper-container">
          <div class="swiper-wrapper">
            ${slidesHTML}
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      `;

      if (typeof Swiper !== "undefined") {
        new Swiper(this.querySelector('.swiper-container'), {
          slidesPerView: 1,
          loop: true,
          autoplay: { delay: velocidad, disableOnInteraction: false },
          pagination: { el: this.querySelector('.swiper-pagination'), clickable: true },
          navigation: { 
            nextEl: this.querySelector('.swiper-button-next'), 
            prevEl: this.querySelector('.swiper-button-prev') 
          }
        });
      } else {
        console.error("La librería Swiper.js no se ha cargado correctamente.");
      }
    }
  }

  customElements.define("mi-carrusel", MiCarruselComponent);
})();
