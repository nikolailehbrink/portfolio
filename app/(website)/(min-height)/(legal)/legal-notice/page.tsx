import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice",
  description:
    "Legal Notice of Nikolai Lehbrink - Conception, Design and Development",
  keywords: ["Legal Notice", "Imprint", "Impressum"],
};

export default function Page() {
  return (
    <>
      <header>
        <h1>Legal Notice</h1>
        <p>
          This website is operated by{" "}
          <strong>Nikolai Lehbrink - Conception, Design and Development</strong>
          .
        </p>
        <time dateTime="2024-02-09T23:03:30+02:00" itemProp="datePublished">
          09. February 2024
        </time>
      </header>
      <h2>Contact Information:</h2>
      <address>
        Nikolai Lehbrink
        <br />
        28203 Bremen
        <br />
        Germany
        <br />
        Email: <a href="mailto:mail@nikolailehbr.ink">mail@nikolailehbr.ink</a>
        <br />
        Phone: <a href="tel:+00491794393782">+49 (0) 1794393782</a>
      </address>

      <h2>Responsible for Content:</h2>
      <p>
        According to Section 5 of TMG, I, Nikolai Lehbrink, am responsible for
        the content on this website, address as above.
      </p>

      <h2>Disclaimer:</h2>
      <p>
        The contents of my pages have been created with the utmost care.
        However, I cannot guarantee the contents&apos; accuracy, completeness,
        or topicality. According to statutory provisions, I am furthermore
        responsible for my own content on these web pages. In this context,
        please note that I am accordingly not obliged to monitor merely the
        transmitted or saved information of third parties, or investigate
        circumstances pointing to illegal activity. My obligations to remove or
        block the use of information under generally applicable laws remain
        unaffected by this as per §§ 8 to 10 of the Telemediengesetz (TMG).
      </p>

      <h2>Copyright Notice:</h2>
      <p>
        All content and works on this website created by me are subject to
        Germanys copyright law. Duplication, processing, distribution, or any
        form of commercialization of such material beyond the scope of the
        copyright law shall require my prior written consent.
      </p>

      <h2>External Links:</h2>
      <p>
        My website contains links to external websites of third parties on whose
        contents I have no influence. Therefore, I cannot assume any liability
        for these external contents. The respective provider or operator of the
        pages is always responsible for the contents of the linked pages. The
        linked pages were checked for possible legal violations at the time of
        linking. Illegal content was not recognizable at the time of linking.
      </p>
    </>
  );
}
