const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = { currentIndex: 0, maxIndex: 861 };
let imagesLoaded = 0;
let images = [];

function preloadImages() {
  for (let i = 1; i <= frames.maxIndex; i++) {
    let imageUrl = `./public/extracted-frames/frame_${i
      .toString()
      .padStart(4, "0")}.jpg`;

    let img = new Image();
    img.src = imageUrl;

    img.onload = function () {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex) {
        loadImage(frames.currentIndex);
        startAnimation();
      }
    };
    images.push(img);
  }
}

function loadImage(index) {
  if (index >= 0 && index <= frames.maxIndex) {
    const img = images[index];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;

    const scale = Math.max(scaleX, scaleY);

    const newWidth = scale * img.width;
    const newHeight = scale * img.height;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.height, canvas.width);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight); //bg cover

    frames.currentIndex = index;
  }
}

function startAnimation() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
    },
  });

  function updateFrames(index) {
    return {
      currentIndex: index,
      ease: "linear",
      onUpdate: function () {
        loadImage(Math.floor(frames.currentIndex));
      },
    };
  }

  tl.to(frames, updateFrames(50), "one")
    .to(".text1", { opacity: 0, ease: "linear" }, "one")

    .to(frames, updateFrames(100), "two")
    .to(".text2", { opacity: 1, ease: "linear" }, "two")

    .to(frames, updateFrames(150), "three")
    .to(".text2", { opacity: 1, ease: "linear" }, "three")

    .to(frames, updateFrames(200), "four")
    .to(".text2", { opacity: 0, ease: "linear" }, "four")

    .to(frames, updateFrames(250), "five")
    .to(".text3", { opacity: 1, ease: "linear" }, "five")

    .to(frames, updateFrames(300), "six")
    .to(".text3", { opacity: 1, ease: "linear" }, "six")

    .to(frames, updateFrames(350), "seven")
    .to(".text3", { opacity: 0, ease: "linear" }, "seven")

    .to(frames, updateFrames(400), "eight")
    .to(".panel", { x: "0%", ease: "expo" }, "eight")

    .to(frames, updateFrames(480), "nine")
    .to(".panel", { x: "0%", ease: "circ-in-out" }, "nine")

    .to(frames, updateFrames(510), "ten")
    .to(".panel", { x: "100%", ease: "circ-in-out" }, "ten")

    .to(frames, updateFrames(560), "eleven")
    .to("canvas", { scale: 0.5, ease: "expo" }, "eleven")

    .to(frames, updateFrames(610), "twelve")
    .to(".panelism", { opacity: 1, ease: "expo" }, "twelve")

    .to(frames, updateFrames(680), "twelve")
    .to(".panelism span", { width: 200, ease: "linear" }, "twelve")

    .to(frames, updateFrames(760), "thirteen")
    .to("canvas", { scale: 1, ease: "linear" }, "thirteen")

    .to(frames, updateFrames(800), "fourteen")
    .to(".panelism", { opacity: 1, scale: 2, ease: "circ" }, "fourteen")

    .to(frames, updateFrames(860), "fifteen")
    .to(".panelism", { opacity: 1, scale: 2, ease: "circ" }, "fifteen");
}

preloadImages();

function smoothScroll() {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}
smoothScroll()

window.addEventListener("resize", function () {
  loadImage(Math.floor(frames.currentIndex));
});

document.querySelectorAll(".headings h3").forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top bottom",
      end: "bottom 30%",
      scrub: 2,
    },
    opacity: 0,
  });
});
