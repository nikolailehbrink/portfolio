export default function Page() {
  return (
    <>
      <header>
        <h1 className="mb-2">Legal notice</h1>
        <time
          dateTime="2023-07-23T23:03:30+02:00"
          itemProp="datePublished"
          className="text-sm"
        >
          23. Juli 2023
        </time>
      </header>

      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        Nikolai Lehbrink
        <br />
        Web-Entwicklung &amp; Design
        <br />
        Gertrudenstraße 32
        <br />
        28203 Bremen
      </p>
      <h2>Kontakt</h2>

      <p>
        Telefon: 01794393782
        <br />
        E-Mail: mail@nikolailehbr.ink
      </p>

      <h2>Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</h2>

      <p>
        Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </>
  );
}
