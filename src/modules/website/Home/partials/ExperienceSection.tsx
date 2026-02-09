import { ExperienceCard } from "../components/ExperienceCard";
import { experiences } from "../data/experience";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/common/components/ui/carousel";

export function ExperienceSection() {
  return (
    <div className="w-full overflow-x-hidden">
      <Carousel
        opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }}
        className="w-full max-w-full"
      >
        <CarouselContent className="relative w-full ml-0 gap-4 cursor-grab select-none active:cursor-grabbing">
          {experiences.map((exp, index) => (
            <CarouselItem
              key={index}
              className="pl-0 basis-[80%] md:basis-[44.444%] max-w-full relative z-10"
            >
              <ExperienceCard {...exp} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
