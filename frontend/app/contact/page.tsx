export default function ContactPage() {
  return (
    <main className="container mx-auto px-6 py-16">

      <div className="text-center mb-16">

        <h1 className="text-5xl font-bold mb-6">
          Contactez-nous
        </h1>

        <p className="text-xl text-slate-400">
          Une question, une proposition ou un partenariat ?
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        <div
          className="
            bg-slate-800
            border
            border-slate-700
            rounded-2xl
            p-8
          "
        >

          <h2 className="text-3xl font-bold mb-8">
            Informations
          </h2>

          <div className="space-y-6">

            <div>
              <h3 className="font-semibold">
                📞 Téléphone
              </h3>

              <p className="text-slate-300">
                +221 77 484 82 49
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                📧 Email
              </h3>

              <p className="text-slate-300">
                contact@ekofutura.org
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                📍 Adresse
              </h3>

              <p className="text-slate-300">
                Dakar, Sénégal
              </p>
            </div>

          </div>

        </div>

        <div className="mt-10 rounded-2xl overflow-hidden">

            <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-16.95%2C14.75%2C-16.90%2C14.82&layer=mapnik"
                width="100%"
                height="300"
                loading="lazy"
            />

        </div>

        <div
          className="
            bg-slate-800
            border
            border-slate-700
            rounded-2xl
            p-8
          "
        >

          <h2 className="text-3xl font-bold mb-8">
            Envoyer un message
          </h2>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Nom complet"
              className="
                w-full
                p-4
                rounded-xl
                bg-slate-900
                border
                border-slate-700
              "
            />

            <input
              type="email"
              placeholder="Adresse email"
              className="
                w-full
                p-4
                rounded-xl
                bg-slate-900
                border
                border-slate-700
              "
            />

            <textarea
              rows={6}
              placeholder="Votre message..."
              className="
                w-full
                p-4
                rounded-xl
                bg-slate-900
                border
                border-slate-700
              "
            />

            <button
              type="submit"
              className="
                w-full
                bg-green-600
                hover:bg-green-700
                py-4
                rounded-xl
                font-semibold
                transition
              "
            >
              Envoyer le message
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}