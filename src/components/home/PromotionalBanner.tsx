import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import cardBanner from "../../assets/images/card.png";
import pixBanner from "../../assets/images/pix.png";

interface Banner {
  id: number;
  image: string;
  alt: string;
}

const banners: Banner[] = [
  {
    id: 1,
    image: cardBanner,
    alt: "Parcelamento no cartão em compras acima de R$ 100",
  },
  {
    id: 2,
    image: pixBanner,
    alt: "5% de desconto em pagamentos via Pix",
  },
];

const SLIDE_INTERVAL = 5000;

export default function PromotionalBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection("right");

    setCurrentSlide((current) => {
      return (current + 1) % banners.length;
    });
  }, []);

  const previousSlide = useCallback(() => {
    setDirection("left");

    setCurrentSlide((current) => {
      return (current - 1 + banners.length) % banners.length;
    });
  }, []);

  function goToSlide(index: number) {
    if (index === currentSlide) {
      return;
    }

    setDirection(index > currentSlide ? "right" : "left");
    setCurrentSlide(index);
  }

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      nextSlide();
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="w-full bg-[#f7f7f7] py-6 md:py-14"
      aria-label="Ofertas e condições de pagamento"
    >
      <div className="mx-auto w-full max-w-[1217px] px-4 md:px-8">
        <div
          className="group relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative mx-auto aspect-[1153/311] w-full max-w-[1153px] overflow-hidden rounded-2xl bg-white shadow-md md:rounded-[22px]">
            {banners.map((banner, index) => {
              const isActive = index === currentSlide;

              return (
                <img
                  key={banner.id}
                  src={banner.image}
                  alt={banner.alt}
                  draggable={false}
                  className={`absolute inset-0 h-full w-full select-none object-cover object-center transition-all duration-700 ease-in-out ${
                    isActive
                      ? "z-10 translate-x-0 opacity-100"
                      : direction === "right"
                        ? "z-0 translate-x-full opacity-0"
                        : "z-0 -translate-x-full opacity-0"
                  }`}
                />
              );
            })}
          </div>

          {/* Botão anterior */}
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Banner anterior"
            className="absolute left-1 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#2E3192]/20 bg-white text-[#2E3192] shadow-lg transition duration-300 hover:scale-105 hover:bg-[#2E3192] hover:text-white sm:left-2 md:-left-1 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Botão próximo */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Próximo banner"
            className="absolute right-1 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#2E3192]/20 bg-white text-[#2E3192] shadow-lg transition duration-300 hover:scale-105 hover:bg-[#2E3192] hover:text-white sm:right-2 md:-right-1 md:h-12 md:w-12"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        {/* Indicadores */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Ir para o banner ${index + 1}`}
              aria-current={index === currentSlide ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-[#2E3192]"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
