"use client";

import { useEffect, useState } from "react";
import { createAlert } from "../services/alerts.service";

export default function AlertForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    category: "PLASTIC",
    description: "",
    latitude: 0,
    longitude: 0,
  });

  const [photo, setPhoto] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      () => { }
    );
  }, []);

  async function getLocation() {

    if (!navigator.geolocation) {
      setMessage(
        "La géolocalisation n'est pas supportée."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {

        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        setFormData((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));

        try {

          const response =
            await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );

          const data =
            await response.json();

          setLocationName(
            data.display_name || ""
          );

        } catch (error) {

          console.error(error);

        }
      },
      () => {
        setMessage(
          "Impossible de récupérer votre position."
        );
      }
    );
  }
  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const data = new FormData();

      data.append(
        "fullname",
        formData.fullname
      );

      data.append(
        "phone",
        formData.phone
      );

      data.append(
        "email",
        formData.email
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "latitude",
        String(formData.latitude)
      );

      data.append(
        "longitude",
        String(formData.longitude)
      );

      if (photo) {
        data.append("photo", photo);
      }

      await createAlert(data);

      setSuccess(true);

      setFormData({
        fullname: "",
        phone: "",
        email: "",
        category: "PLASTIC",
        description: "",
        latitude: 0,
        longitude: 0,
      });

      setPhoto(null);
      setPreview("");
    } catch (error) {
      console.error(error);

      setMessage(
        "❌ Une erreur est survenue lors de l'envoi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <div
        className="
          bg-slate-800/50
          border
          border-slate-700
          rounded-2xl
          p-8
          shadow-xl
        "
      >
        <h1
          className="
            text-4xl
            font-bold
            text-center
            mb-8
          "
        >
          Signaler un problème environnemental
        </h1>

        {success && (
          <div
            className="
              mb-6
              bg-green-600/20
              border
              border-green-500
              text-green-300
              p-4
              rounded-xl
            "
          >
            ✅ Votre signalement a été envoyé avec succès.
            Il sera examiné par notre équipe.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">
                Nom complet
              </label>

              <input
                type="text"
                required
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullname: e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-600
                  bg-slate-900
                  px-4
                  py-3
                "
              />
            </div>

            <div>
              <label className="block mb-2">
                Téléphone
              </label>

              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-600
                  bg-slate-900
                  px-4
                  py-3
                "
              />
            </div>

            <div>
              <label className="block mb-2">
                Email (optionnel)
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-600
                  bg-slate-900
                  px-4
                  py-3
                "
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">
              Catégorie
            </label>

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              className="
                w-full
                rounded-lg
                border
                border-slate-600
                bg-slate-900
                px-4
                py-3
              "
            >
              <option value="PLASTIC">
                Pollution plastique
              </option>

              <option value="EROSION">
                Érosion côtière
              </option>

              <option value="WASTE">
                Déchets sauvages
              </option>

              <option value="FLOOD">
                Inondation
              </option>

              <option value="WATER">
                Pollution de l'eau
              </option>

              <option value="AIR">
                Pollution de l'air
              </option>

              <option value="OTHER">
                Autre
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Description
            </label>

            <textarea
              rows={6}
              required
              placeholder="Décrivez le problème observé..."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="
                w-full
                rounded-lg
                border
                border-slate-600
                bg-slate-900
                px-4
                py-3
              "
            />
          </div>

          <div>
            <label className="block mb-2">
              Photo (optionnelle)
            </label>

            <input
              type="file"
              accept="image/*"
              className="
                w-full
                border
                border-slate-600
                rounded-lg
                p-3
              "
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                if (file) {
                  setPhoto(file);
                  setPreview(
                    URL.createObjectURL(file)
                  );
                }
              }}
            />

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Aperçu"
                  className="
                    rounded-xl
                    border
                    border-slate-700
                    max-h-80
                    object-cover
                  "
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={getLocation}
              className="
                bg-blue-600
                hover:bg-blue-700
                px-4
                py-2
                rounded-lg
                transition
              "
            >
              📍 Utiliser ma position
            </button>

            {locationName && (
              <div
                className="
                  mt-4
                  p-4
                  rounded-xl
                  bg-green-600/10
                  border
                  border-green-600/30
                "
              >
                📍 {locationName}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-green-600
              hover:bg-green-700
              py-4
              rounded-xl
              font-semibold
              text-lg
              transition
              disabled:opacity-50
            "
          >
            {loading
              ? "Envoi en cours..."
              : "Envoyer le signalement"}
          </button>

          {message && (
            <div
              className="
                mt-4
                p-4
                rounded-lg
                bg-slate-700
                text-center
              "
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}