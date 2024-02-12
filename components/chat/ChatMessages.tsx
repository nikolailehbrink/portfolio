import type { UseChatHelpers } from "ai/react";
import SpinnerAlt from "@/assets/icons/unicons/spinner-alt.svg";
import { useEffect, useRef } from "react";
import ChatActions from "./ChatActions";

export default function ChatMessages({
  messages,
  isLoading,
  reload,
  stop,
}: Pick<UseChatHelpers, "messages" | "isLoading" | "reload" | "stop">) {
  const scrollableChatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessage = messages[messages.length - 1];

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current) {
      scrollableChatContainerRef.current.scrollTop =
        scrollableChatContainerRef.current.scrollHeight;
    }
  };

  const isLastMessageFromAssistant =
    messages.length > 0 && lastMessage?.role !== "user";
  const showReload = !isLoading && isLastMessageFromAssistant;
  const isPending = isLoading && !isLastMessageFromAssistant;

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, lastMessage]);

  return (
    <div className="flex grow flex-col">
      <div
        className="flex max-h-[calc(100vh-theme(spacing.96))] flex-col gap-5 divide-y overflow-y-auto rounded-2xl bg-neutral-800 p-8 pb-4 scrollbar-thin"
        ref={scrollableChatContainerRef}
      >
        <p>
          Über das Thema "Natur und Umweltschutz" Die Natur ist ein wundervolles
          Geschenk, das wir Menschen auf unserem Planeten erhalten haben. Sie
          bietet uns eine Vielzahl von Ressourcen und ist Heimat unzähliger
          Tier- und Pflanzenarten. Doch leider sind wir Menschen auch die größte
          Bedrohung für die Natur und ihre Vielfalt. Der Umweltschutz ist
          deshalb von großer Bedeutung, um die Schönheit und den Wert der Natur
          zu erhalten. Denn nur wenn wir bewusst mit unseren Ressourcen umgehen,
          nachhaltig wirtschaften und die Auswirkungen unserer Handlungen auf
          die Umwelt berücksichtigen, können wir eine gesunde und lebenswerte
          Umwelt für uns und die kommenden Generationen sicherstellen. Es gibt
          viele Möglichkeiten, wie wir unseren Beitrag zum Umweltschutz leisten
          können. Angefangen bei kleinen Maßnahmen im Alltag wie der
          Mülltrennung, dem sparsamen Wasserverbrauch oder dem Verzicht auf
          Plastiktüten, bis hin zu größeren Entscheidungen wie dem Kauf von
          energieeffizienten Geräten oder dem Umstieg auf erneuerbare Energien.
          Auch die Unterstützung von Umweltorganisationen oder die Teilnahme an
          Aktionen und Protesten kann einen großen Beitrag leisten. Denn nur
          gemeinsam können wir den Druck auf Politik und Wirtschaft erhöhen und
          nachhaltigere Lösungen fordern. Der Natur- und Umweltschutz ist jedoch
          kein einmaliger Akt, sondern ein fortlaufender Prozess. Es ist
          wichtig, dass wir unser Bewusstsein für die Umwelt stärken, uns
          kontinuierlich informieren und auch andere dazu animieren,
          umweltbewusst zu handeln. Denn nur wenn wir alle Verantwortung
          übernehmen, können wir die Natur für zukünftige Generationen erhalten
          und unseren Planeten weiterhin als lebenswerten Ort genießen.
        </p>
        <p>
          Über das Thema "Natur und Umweltschutz" Die Natur ist ein wundervolles
          Geschenk, das wir Menschen auf unserem Planeten erhalten haben. Sie
          bietet uns eine Vielzahl von Ressourcen und ist Heimat unzähliger
          Tier- und Pflanzenarten. Doch leider sind wir Menschen auch die größte
          Bedrohung für die Natur und ihre Vielfalt. Der Umweltschutz ist
          deshalb von großer Bedeutung, um die Schönheit und den Wert der Natur
          zu erhalten. Denn nur wenn wir bewusst mit unseren Ressourcen umgehen,
          nachhaltig wirtschaften und die Auswirkungen unserer Handlungen auf
          die Umwelt berücksichtigen, können wir eine gesunde und lebenswerte
          Umwelt für uns und die kommenden Generationen sicherstellen. Es gibt
          viele Möglichkeiten, wie wir unseren Beitrag zum Umweltschutz leisten
          können. Angefangen bei kleinen Maßnahmen im Alltag wie der
          Mülltrennung, dem sparsamen Wasserverbrauch oder dem Verzicht auf
          Plastiktüten, bis hin zu größeren Entscheidungen wie dem Kauf von
          energieeffizienten Geräten oder dem Umstieg auf erneuerbare Energien.
          Auch die Unterstützung von Umweltorganisationen oder die Teilnahme an
          Aktionen und Protesten kann einen großen Beitrag leisten. Denn nur
          gemeinsam können wir den Druck auf Politik und Wirtschaft erhöhen und
          nachhaltigere Lösungen fordern. Der Natur- und Umweltschutz ist jedoch
          kein einmaliger Akt, sondern ein fortlaufender Prozess. Es ist
          wichtig, dass wir unser Bewusstsein für die Umwelt stärken, uns
          kontinuierlich informieren und auch andere dazu animieren,
          umweltbewusst zu handeln. Denn nur wenn wir alle Verantwortung
          übernehmen, können wir die Natur für zukünftige Generationen erhalten
          und unseren Planeten weiterhin als lebenswerten Ort genießen.
        </p>
        <p>
          Über das Thema "Natur und Umweltschutz" Die Natur ist ein wundervolles
          Geschenk, das wir Menschen auf unserem Planeten erhalten haben. Sie
          bietet uns eine Vielzahl von Ressourcen und ist Heimat unzähliger
          Tier- und Pflanzenarten. Doch leider sind wir Menschen auch die größte
          Bedrohung für die Natur und ihre Vielfalt. Der Umweltschutz ist
          deshalb von großer Bedeutung, um die Schönheit und den Wert der Natur
          zu erhalten. Denn nur wenn wir bewusst mit unseren Ressourcen umgehen,
          nachhaltig wirtschaften und die Auswirkungen unserer Handlungen auf
          die Umwelt berücksichtigen, können wir eine gesunde und lebenswerte
          Umwelt für uns und die kommenden Generationen sicherstellen. Es gibt
          viele Möglichkeiten, wie wir unseren Beitrag zum Umweltschutz leisten
          können. Angefangen bei kleinen Maßnahmen im Alltag wie der
          Mülltrennung, dem sparsamen Wasserverbrauch oder dem Verzicht auf
          Plastiktüten, bis hin zu größeren Entscheidungen wie dem Kauf von
          energieeffizienten Geräten oder dem Umstieg auf erneuerbare Energien.
          Auch die Unterstützung von Umweltorganisationen oder die Teilnahme an
          Aktionen und Protesten kann einen großen Beitrag leisten. Denn nur
          gemeinsam können wir den Druck auf Politik und Wirtschaft erhöhen und
          nachhaltigere Lösungen fordern. Der Natur- und Umweltschutz ist jedoch
          kein einmaliger Akt, sondern ein fortlaufender Prozess. Es ist
          wichtig, dass wir unser Bewusstsein für die Umwelt stärken, uns
          kontinuierlich informieren und auch andere dazu animieren,
          umweltbewusst zu handeln. Denn nur wenn wir alle Verantwortung
          übernehmen, können wir die Natur für zukünftige Generationen erhalten
          und unseren Planeten weiterhin als lebenswerten Ort genießen.
        </p>
        <p>
          Über das Thema "Natur und Umweltschutz" Die Natur ist ein wundervolles
          Geschenk, das wir Menschen auf unserem Planeten erhalten haben. Sie
          bietet uns eine Vielzahl von Ressourcen und ist Heimat unzähliger
          Tier- und Pflanzenarten. Doch leider sind wir Menschen auch die größte
          Bedrohung für die Natur und ihre Vielfalt. Der Umweltschutz ist
          deshalb von großer Bedeutung, um die Schönheit und den Wert der Natur
          zu erhalten. Denn nur wenn wir bewusst mit unseren Ressourcen umgehen,
          nachhaltig wirtschaften und die Auswirkungen unserer Handlungen auf
          die Umwelt berücksichtigen, können wir eine gesunde und lebenswerte
          Umwelt für uns und die kommenden Generationen sicherstellen. Es gibt
          viele Möglichkeiten, wie wir unseren Beitrag zum Umweltschutz leisten
          können. Angefangen bei kleinen Maßnahmen im Alltag wie der
          Mülltrennung, dem sparsamen Wasserverbrauch oder dem Verzicht auf
          Plastiktüten, bis hin zu größeren Entscheidungen wie dem Kauf von
          energieeffizienten Geräten oder dem Umstieg auf erneuerbare Energien.
          Auch die Unterstützung von Umweltorganisationen oder die Teilnahme an
          Aktionen und Protesten kann einen großen Beitrag leisten. Denn nur
          gemeinsam können wir den Druck auf Politik und Wirtschaft erhöhen und
          nachhaltigere Lösungen fordern. Der Natur- und Umweltschutz ist jedoch
          kein einmaliger Akt, sondern ein fortlaufender Prozess. Es ist
          wichtig, dass wir unser Bewusstsein für die Umwelt stärken, uns
          kontinuierlich informieren und auch andere dazu animieren,
          umweltbewusst zu handeln. Denn nur wenn wir alle Verantwortung
          übernehmen, können wir die Natur für zukünftige Generationen erhalten
          und unseren Planeten weiterhin als lebenswerten Ort genießen.
        </p>
        <p>
          Über das Thema "Natur und Umweltschutz" Die Natur ist ein wundervolles
          Geschenk, das wir Menschen auf unserem Planeten erhalten haben. Sie
          bietet uns eine Vielzahl von Ressourcen und ist Heimat unzähliger
          Tier- und Pflanzenarten. Doch leider sind wir Menschen auch die größte
          Bedrohung für die Natur und ihre Vielfalt. Der Umweltschutz ist
          deshalb von großer Bedeutung, um die Schönheit und den Wert der Natur
          zu erhalten. Denn nur wenn wir bewusst mit unseren Ressourcen umgehen,
          nachhaltig wirtschaften und die Auswirkungen unserer Handlungen auf
          die Umwelt berücksichtigen, können wir eine gesunde und lebenswerte
          Umwelt für uns und die kommenden Generationen sicherstellen. Es gibt
          viele Möglichkeiten, wie wir unseren Beitrag zum Umweltschutz leisten
          können. Angefangen bei kleinen Maßnahmen im Alltag wie der
          Mülltrennung, dem sparsamen Wasserverbrauch oder dem Verzicht auf
          Plastiktüten, bis hin zu größeren Entscheidungen wie dem Kauf von
          energieeffizienten Geräten oder dem Umstieg auf erneuerbare Energien.
          Auch die Unterstützung von Umweltorganisationen oder die Teilnahme an
          Aktionen und Protesten kann einen großen Beitrag leisten. Denn nur
          gemeinsam können wir den Druck auf Politik und Wirtschaft erhöhen und
          nachhaltigere Lösungen fordern. Der Natur- und Umweltschutz ist jedoch
          kein einmaliger Akt, sondern ein fortlaufender Prozess. Es ist
          wichtig, dass wir unser Bewusstsein für die Umwelt stärken, uns
          kontinuierlich informieren und auch andere dazu animieren,
          umweltbewusst zu handeln. Denn nur wenn wir alle Verantwortung
          übernehmen, können wir die Natur für zukünftige Generationen erhalten
          und unseren Planeten weiterhin als lebenswerten Ort genießen.
        </p>
        {messages.map((m) => (
          <p key={m.id}>{m.content}</p>
        ))}
        {isPending && (
          <div className="flex items-center justify-center pt-10">
            <SpinnerAlt className="size-6 animate-spin" />
          </div>
        )}
      </div>
      <div className="flex justify-end py-4">
        <ChatActions
          reload={reload}
          stop={stop}
          showReload={showReload}
          showStop={isLoading}
        />
      </div>
    </div>
  );
}
