"use client";

import { useState } from "react";

import {
  createContact,
} from "../services/contact.service";

export default function ContactForm() {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {

      await createContact(
        formData
      );

      setSuccess(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (err) {

      console.error(err);

      setError(
        "Une erreur est survenue."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div
      className="
        bg-slate-800
        border
        border-slate-700
        rounded-2xl
        p-8
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Envoyer un message
      </h2>

      {success && (
        <div
          className="
            mb-6
            p-4
            rounded-xl
            bg-green-600/20
            border
            border-green-500
          "
        >
          ✅ Votre message a été envoyé.
        </div>
      )}

      {error && (
        <div
          className="
            mb-6
            p-4
            rounded-xl
            bg-red-600/20
            border
            border-red-500
          "
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          required
          placeholder="Nom complet"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
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
          required
          placeholder="Adresse email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
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
          type="text"
          required
          placeholder="Sujet"
          value={formData.subject}
          onChange={(e) =>
            setFormData({
              ...formData,
              subject: e.target.value,
            })
          }
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
          required
          placeholder="Votre message..."
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value,
            })
          }
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
          disabled={loading}
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
          {loading
            ? "Envoi..."
            : "Envoyer le message"}
        </button>

      </form>

    </div>
  );
}