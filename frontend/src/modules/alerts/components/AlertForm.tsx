"use client";

import { useState } from "react";
import { createAlert } from "../services/alerts.service";

export default function AlertForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    category: "PLASTIC",
    description: "",
    latitude: 0,
    longitude: 0,
  });

  const [message, setMessage] = useState("");

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      }
    );
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await createAlert(formData);

      setMessage(
        "Signalement envoyé avec succès."
      );

      setFormData({
        fullname: "",
        phone: "",
        category: "PLASTIC",
        description: "",
        latitude: 0,
        longitude: 0,
      });

    } catch (error) {
      setMessage(
        "Erreur lors de l'envoi."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        placeholder="Nom complet"
        value={formData.fullname}
        onChange={(e) =>
          setFormData({
            ...formData,
            fullname: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Téléphone"
        value={formData.phone}
        onChange={(e) =>
          setFormData({
            ...formData,
            phone: e.target.value,
          })
        }
      />

      <select
        value={formData.category}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value,
          })
        }
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
      </select>

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
      />

      <button
        type="button"
        onClick={getLocation}
      >
        Utiliser ma position
      </button>

      <p>
        Latitude :
        {formData.latitude}
      </p>

      <p>
        Longitude :
        {formData.longitude}
      </p>

      <button type="submit">
        Envoyer le signalement
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}