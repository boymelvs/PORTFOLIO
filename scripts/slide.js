let indexValue = 0;

function slideShow() {
   setTimeout(slideShow, 2500);

   const cardSlide = document.querySelectorAll(".card-slide");

   for (let x = 0; x < cardSlide.length; x++) {
      cardSlide[x].style.display = "none";
   }

   indexValue += 1;

   if (indexValue > cardSlide.length) {
      indexValue = 1;
   }

   cardSlide[indexValue].style.display = "flex";

   console.log("tst");
}

slideShow();
