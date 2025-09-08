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
    }, index * 200);
  });
});

//  Funkcija za dodavanje usluga u bazu
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
//najam dodavanje u database
function dodajNajamArtikle() {
  const najamArtikli = [
    {
      naziv: "Isušivač zraka DH44",
      opis: "Profesionalni isušivač DH44 idealan je za brzo uklanjanje vlage iz prostora.",
      kapacitet: "40 L/dan",
      cijena: "25€/dan",
      detalji:
        "Energetski efikasan i pouzdan. Isušivači se koriste tamo gdje postoji višak vlage.",
      slika: "assets/Isusivac-zraka-profesionalni-DH44-565x565.jpg",
    },
    {
      naziv: "DeWalt aku brusilica DCE800T2",
      opis: "DeWalt aku brusilica za zidove – žirafa DCE800T2 18/54V",
      cijena: "45€/dan",
      detalji: "Brusilica s dugim vratom, idealna za veće površine.",
      slika: "assets/žirafa.jpg",
    },
    {
      naziv: "Alu DG skela",
      opis: "Skela sa dvostrukom ogradom u aluminijskoj izvedbi.",
      cijena: "Cijena na upit",
      detalji: "Brza i jednostavna montaža. Mogućnost transporta i demontaže.",
      slika: "assets/skela.jpg",
    },
  ];

  najamArtikli.forEach((artikal) => {
    const novaRef = firebase.database().ref("najam").push();
    novaRef
      .set(artikal)
      .then(() => console.log("✅ Artikal dodan:", artikal.naziv))
      .catch((err) => console.error("❌ Greška:", err));
  });
}

// POZOVI SAMO JEDNOM
//dodajNajamArtikle();

//prikaz na str
// function prikaziNajamArtikle() {
//   const najamRef = firebase.database().ref("najam");
//   const najamContainer = document.querySelector(".najam");
//   najamContainer.innerHTML = "";

//   najamRef
//     .once("value")
//     .then((snapshot) => {
//       const data = snapshot.val();
//       if (!data) {
//         najamContainer.innerHTML = "<p>Nema dostupnih artikala za najam.</p>";
//         return;
//       }

//       Object.values(data).forEach((artikal) => {
//         const div = document.createElement("div");
//         div.classList.add("tekst-kutija");

//         div.innerHTML = `
//           <img src="${artikal.slika}" alt="${
//           artikal.naziv
//         }" width="300" height="250" />
//           <p>${artikal.opis}${
//           artikal.kapacitet ? ` Kapacitet: ${artikal.kapacitet}.` : ""
//         }<br>Najam: ${artikal.cijena}</p>
//           <div class="sakriveni-tekst" style="display:none;">
//             <p>${artikal.detalji}</p>
//           </div>
//           <button class="dugme" onclick="prikaziTekst(this)">Saznaj više</button>
//         `;

//         najamContainer.appendChild(div);
//       });
//     })
//     .catch((err) => {
//       console.error("Greška pri dohvaćanju najma:", err);
//     });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   prikaziNajamArtikle();
// });

function prikaziNajamArtikle() {
  const najamRef = firebase.database().ref("najam");
  const najamContainer = document.querySelector(".najam");
  najamContainer.innerHTML = "";

  najamRef
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      if (!data) {
        najamContainer.innerHTML = "<p>Nema dostupnih artikala za najam.</p>";
        return;
      }

      Object.values(data).forEach((artikal, index) => {
        const div = document.createElement("div");
        div.classList.add("tekst-kutija", "visible");

        div.innerHTML = `
          <img src="${artikal.slika}" alt="${
          artikal.naziv
        }" width="300" height="250" />
          <h4>${artikal.naziv}</h4>
          <p>${artikal.opis}${
          artikal.kapacitet ? ` Kapacitet: ${artikal.kapacitet}.` : ""
        }</p>
          <p>Najam: ${artikal.cijena}</p>
          <div class="sakriveni-tekst" style="display:none;">
            <p>${artikal.detalji}</p>
          </div>
          <button class="dugme" onclick="prikaziTekst(this)">Saznaj više</button>
        `;

        setTimeout(() => div.classList.add("visible"), index * 100);

        najamContainer.appendChild(div);
      });
    })
    .catch((err) => {
      console.error("Greška pri dohvaćanju najma:", err);
    });
}
document.addEventListener("DOMContentLoaded", () => {
  prikaziNajamArtikle();
});

//sakriveni tekst
function prikaziTekst(dugme) {
  const roditelj = dugme.parentElement;
  const skriveniTekst = roditelj.querySelector(".sakriveni-tekst");

  if (
    skriveniTekst.style.display === "none" ||
    skriveniTekst.style.display === ""
  ) {
    skriveniTekst.style.display = "block";
    dugme.textContent = "Sakrij";
  } else {
    skriveniTekst.style.display = "none";
    dugme.textContent = "Saznaj više";
  }
}
