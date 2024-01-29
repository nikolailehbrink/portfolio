import type { SanityDocument } from "next-sanity";
import Rocket from "@/public/icons/rocket.svg";

import { loadQuery } from "@/sanity/lib/store";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default async function ServiceSection() {
  const { data: services } = await loadQuery<SanityDocument[]>(SERVICES_QUERY);

  return (
    <section
      id="services"
      className="flex items-center bg-gradient-to-b from-transparent to-neutral-950 lg:py-24 xl:scroll-mt-16"
    >
      <div className="container grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="grid items-start gap-4 max-lg:order-1 xl:grid-cols-2">
          {services.map((service) => (
            <div
              key={service._id}
              className="service-box rounded-lg border-2 bg-gradient-to-tr from-neutral-900 to-neutral-800 p-4 even:xl:-mt-16"
            >
              <div className="mb-2 inline-flex rounded-lg bg-neutral-800 p-1 text-white">
                <Image
                  className="w-12 -hue-rotate-[50deg]"
                  src={urlFor(service.image).size(60, 60).quality(80).url()}
                  alt={service.image.alt}
                  height={60}
                  width={60}
                />
              </div>
              <h2 className="mb-2 text-xl font-bold">{service.title}</h2>
              <p className="line-clamp-6">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="service-content flex flex-col items-start gap-3 max-xl:relative lg:sticky lg:top-24">
          <div className="badge badge-orange">
            <Rocket className="w-5" />
            Leistungen
          </div>
          <h2 className="text-5xl font-bold">Precision &amp; Passion</h2>
          <p>
            Ob du ein Einzelunternehmer oder ein Unternehmen bist, meine Mission
            besteht darin, deine digitale Präsenz in etwas Einzigartiges und
            Wirkungsvolles zu verwandeln. Mit Perfektionismus und Leidenschaft
            bringe ich jedes Projekt zum Abschluss, sodass das Endergebnis uns
            beide stolz machen kann.
          </p>
          <p>
            <strong>
              Der Schlüssel zu meinem Ansatz liegt in der Zusammenarbeit.
            </strong>{" "}
            Ich bin davon überzeugt, dich in jeden Schritt einzubeziehen, um
            deine Vision präzise zu erfassen und in eine digitale Realität zu
            übersetzen. Ob es darum geht, eine beeindruckende Webseite zu
            erstellen, überzeugende Marken- und Printdesigns zu produzieren,
            deine lokale Suchpräsenz zu optimieren oder deiner Seite oder
            Anwendung ein frisches Aussehen zu verleihen - ich bin hier, um dir
            dabei zu helfen, ein digitales Erlebnis zu schaffen, das deine Marke
            wirklich widerspiegelt.
          </p>
        </div>
      </div>
    </section>
  );
}
