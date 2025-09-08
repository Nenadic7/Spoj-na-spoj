function dodajGalerijuUBazu() {
  const galerija = {
    fasade: {
      naziv: "Fasade",
      slike: [
        { src: "assets/Izrada-fasade.jpg", alt: "fasada1" },
        {
          src: "assets/Molersko gipsarski i fasaderski radovi Vlasotince (24).jpg.webp",
          alt: "fasada2",
        },
        { src: "assets/fasada-20.jpg", alt: "fasada3" },
        { src: "assets/fasada4.jpg", alt: "fasada4" },
      ],
    },
    knauf: {
      naziv: "Knauf‑ gipskartonski radovi",
      slike: [
        { src: "assets/gips-kartonski-radovi.jpg", alt: "knauf1" },
        {
          src: "assets/KNAUF-GIPS-KARTONSKI-RADOVI-OBITELJSKE-KUCE-1.jpg",
          alt: "knauf2",
        },
        {
          src: "assets/KNAUF-GIPS-KARTONSKI-RADOVI-OBITELJSKE-KUCE-11.jpg",
          alt: "knauf3",
        },
        {
          src: "assets/l_knauf-spusteni-strop-u-potkrovlju-19-.jpg",
          alt: "knauf4",
        },
      ],
    },
    soboslikarski: {
      naziv: "Soboslikarski radovi",
      slike: [
        { src: "assets/1000000946.jpg", alt: "Dekorativne1" },
        { src: "assets/5641.jpg", alt: "Dekorativne2" },
        { src: "assets/GrandColor.jpg.webp", alt: "Dekorativne3" },
        {
          src: "assets/ffd63ee7-8bff-4d3f-8830-3c568cfd3b69.jpg",
          alt: "Dekorativne4",
        },
      ],
    },
  };

  firebase
    .database()
    .ref("galerija")
    .set(galerija)
    .then(() => console.log("Galerija uspješno dodana u bazu!"))
    .catch((err) => console.error("Greška pri dodavanju galerije:", err));
}

// dodajGalerijuUBazu();

function prikaziGaleriju() {
  const ref = firebase.database().ref("galerija");
  const container = document.getElementById("galerija-kontejner");
  if (!container) return console.error("Nema kontejnera za galeriju");

  container.innerHTML = "";

  ref.once("value").then((snapshot) => {
    const data = snapshot.val();
    if (!data) {
      container.innerHTML = "<p>Galerija nije dostupna.</p>";
      return;
    }

    Object.entries(data).forEach(([key, sekcija]) => {
      // 1. Naslov
      const h3 = document.createElement("h3");
      h3.classList.add("h3galerija");
      h3.textContent = sekcija.naziv;
      container.appendChild(h3);

      // 2. Slajder struktura (isti kao u statičkom HTML-u)
      const slajder = document.createElement("div");
      slajder.classList.add("slajder");
      slajder.id = `slajder-${key}`;

      const prev = document.createElement("button");
      prev.classList.add("prev");
      prev.innerHTML = "&#10094;";
      slajder.appendChild(prev);

      const wrap = document.createElement("div");
      wrap.classList.add("slajd-wrapper");
      const slajdovi = document.createElement("div");
      slajdovi.classList.add("slajdovi");

      sekcija.slike.forEach(({ src, alt }) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        slajdovi.appendChild(img);
      });

      wrap.appendChild(slajdovi);
      slajder.appendChild(wrap);

      const next = document.createElement("button");
      next.classList.add("next");
      next.innerHTML = "&#10095;";
      slajder.appendChild(next);

      container.appendChild(slajder);

      // Inicijalizacija
      napraviSlajder(slajder);
    });
  });
}

function napraviSlajder(slider) {
  const track = slider.querySelector(".slajdovi");
  const slides = track.querySelectorAll("img");
  let current = 0;

  //stil
  track.style.display = "flex";
  track.style.transition = "transform 0.5s ease";
  slider.querySelector(".slajd-wrapper").style.overflow = "hidden";

  function show(n) {
    current = (n + slides.length) % slides.length;
    const offset = -current * 100;
    track.style.transform = `translateX(${offset}%)`;
  }

  show(0);

  slider.querySelector(".prev").onclick = () => show(current - 1);
  slider.querySelector(".next").onclick = () => show(current + 1);

  setInterval(() => show(current + 1), 3000);
}

document.addEventListener("DOMContentLoaded", prikaziGaleriju);
