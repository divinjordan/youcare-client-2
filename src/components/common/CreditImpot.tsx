export default function CreditImpot() {
  return (
    <div className="bg-primary py-20 px-3 md:px-0" id="credit-impots">
      <div className="max-w-6xl mx-auto text-lg text-white">
        <h3 className="text-3xl md:text-4xl text-center font-semibold">
          Le crédit d&apos;impôt
        </h3>
        <p className="mt-6 text-center md:text-xl">
          Vous pouvez bénéficier d&apos;un crédit d&apos;impôt qui vous permet
          d'obtenir
          <strong>une reduction de 50%</strong> pour le financement de votre
          assistance à domicile. Vous profitez de 50% retenues dans une limite
          annuelle de 12 000 euros avec des possibilités de majoration. Pour
          cela vous devez déclarer le montant total des dépenses pour
          l&apos;assistance en ligne 7DB de la déclaration de revenus et
          reporter en ligne 7DR le montant des aides perçues (APA, PCH, CESU
          préfinancé...).
        </p>
        <div className="mt-6 md:mt-8 text-center">
          <a
            href="https://www.impots.gouv.fr/particulier/emploi-domicile"
            className="bg-secondary text-white px-5 py-2 text-lg rounded-full"
          >
            En savoir plus
          </a>
        </div>
      </div>
    </div>
  );
}
