const db = firebase.database();

function prikaziJednuUslugu(usluga, container, index = 0) {
  const div = document.createElement("div");
  div.classList.add("usluga");

  const img = document.createElement("img");
  img.src = usluga.slika;
  img.alt = usluga.naziv;
  img.width = 50;
  img.height = 50;

  const naslov = document.createElement("h4");
  naslov.textContent = usluga.naziv;
  naslov.classList.add("naslov-usluge");

  div.appendChild(img);
  div.appendChild(naslov);

  if (Array.isArray(usluga.stavke)) {
    usluga.stavke.forEach((stavka) => {
      const p = document.createElement("p");
      p.textContent = stavka;
      div.appendChild(p);
    });
  }

  setTimeout(() => div.classList.add("visible"), index * 100);

  container.appendChild(div);
}

function prikaziUsluge() {
  const uslugeRef = db.ref("usluge");

  uslugeRef
    .once("value")
    .then((snapshot) => {
      const usluge = snapshot.val();
      const container = document.getElementById("usluge-kontenjer");

      if (!usluge) {
        container.innerHTML = "<p>Nema dostupnih usluga.</p>";
        return;
      }

      container.innerHTML = "";
      container.classList.add("usluge2");

      const listaUsluga = Array.isArray(usluge)
        ? usluge.filter((u) => u)
        : Object.values(usluge);

      listaUsluga.forEach((usluga, index) =>
        prikaziJednuUslugu(usluga, container, index)
      );
    })
    .catch((err) => {
      console.error("Greška pri dohvaćanju usluga:", err);
    });
}

document.addEventListener("DOMContentLoaded", prikaziUsluge);

document.addEventListener("DOMContentLoaded", function () {
  const elementi = document.querySelectorAll(".usluge2 div");
  elementi.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, index * 200); // kašnjenje po elementu (200ms)
  });
});

// // Funkcija za prikaz usluga na stranici
// function prikaziUsluge() {
//   const uslugeRef = db.ref("usluge");

//   uslugeRef
//     .once("value")
//     .then((snapshot) => {
//       const usluge = snapshot.val();
//       const container = document.getElementById("usluge-kontenjer");

//       if (!usluge) {
//         container.innerHTML = "<p>Nema dostupnih usluga.</p>";
//         return;
//       }

//       container.innerHTML = ""; // Očisti sadržaj

//       if (Array.isArray(usluge)) {
//         usluge.forEach((usluga) => {
//           if (usluga) prikaziJednuUslugu(usluga, container);
//         });
//       } else {
//         Object.values(usluge).forEach((usluga) => {
//           prikaziJednuUslugu(usluga, container);
//         });
//       }
//     })
//     .catch((err) => {
//       console.error("Greška pri dohvaćanju usluga:", err);
//     });
// }

// // Pomoćna funkcija koja prikazuje jednu uslugu
// function prikaziUsluge() {
//   const uslugeRef = db.ref("usluge");

//   uslugeRef
//     .once("value")
//     .then((snapshot) => {
//       const usluge = snapshot.val();
//       const container = document.getElementById("usluge-kontenjer");

//       if (!usluge) {
//         container.innerHTML = "<p>Nema dostupnih usluga.</p>";
//         return;
//       }

//       container.innerHTML = ""; // Očisti sadržaj
//       container.classList.add("usluge2");

//       const listaUsluga = Array.isArray(usluge)
//         ? usluge.filter((u) => u)
//         : Object.values(usluge);

//       listaUsluga.forEach((usluga, index) => {
//         const div = document.createElement("div");

//         div.classList.add("usluga");

//         const img = document.createElement("img");
//         img.src = usluga.slika;
//         img.alt = usluga.naziv;
//         img.width = 50;
//         img.height = 50;

//         const naslov = document.createElement("h4");
//         naslov.textContent = usluga.naziv;
//         naslov.classList.add("naslov-usluge");

//         div.appendChild(img);
//         div.appendChild(naslov);

//         if (Array.isArray(usluga.stavke)) {
//           usluga.stavke.forEach((stavka) => {
//             const p = document.createElement("p");
//             p.textContent = stavka;
//             div.appendChild(p);
//           });
//         }

//         setTimeout(() => div.classList.add("visible"), index * 100);

//         container.appendChild(div);
//       });
//     })
//     .catch((err) => {
//       console.error("Greška pri dohvaćanju usluga:", err);
//     });
// }

// Poziv funkcije kada se DOM učita
//document.addEventListener("DOMContentLoaded", prikaziUsluge);

// ⚠️ Funkcija za dodavanje usluga u bazu — pokreni SAMO JEDNOM ako je potrebno
/*
function dodajUsluge() {
  const usluge = {
    1: {
      naziv: "Gipskartonski radovi",
      slika: "assets/hammer.svg",
      stavke: ["Pregradni zidovi", "Spušteni stropovi", "Dekorativni elementi"],
    },
    2: {
      naziv: "Soboslikarski i ličilački radovi",
      slika: "assets/paint-roller-bucket-icon.webp",
      stavke: [
        "Klasično bojanje zidova",
        "Strojno bojanje zidova",
        "Dekorativne tehnike",
      ],
    },
    3: {
      naziv: "Fasaderski radovi",
      slika: "assets/kuca.png",
      stavke: [
        "Izrada i obnova fasada",
        "Dekorativne fasade",
        "Završni slojevi",
      ],
    },
  };

  db.ref("usluge")
    .set(usluge)
    .then(() => {
      console.log("Usluge su uspješno postavljene u Realtime Database!");
    })
    .catch((error) => {
      console.error("Greška pri postavljanju usluga:", error);
    });
}
*/
