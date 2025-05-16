import React from 'react';
import { HiMail, HiDocumentText } from 'react-icons/hi';

const ContactSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Contact */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <HiMail className="w-6 h-6 text-purple-600" />
          Contactez-nous
        </h2>
        <p className="text-gray-600 mb-4">
          Vous n'avez pas trouvé votre réponse ? Notre équipe est là pour vous aider.
        </p>
        <a
          href="mailto:support@gsb.com"
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Envoyer un email
        </a>
      </div>

      {/* Documentation */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <HiDocumentText className="w-6 h-6 text-purple-600" />
          Documentation
        </h2>
        <p className="text-gray-600 mb-4">
          Consultez notre guide complet pour en savoir plus sur l'utilisation de l'application.
        </p>
        <a
          href="/docs/guide-utilisateur.pdf"
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Télécharger le guide
        </a>
      </div>
    </div>
  );
};

export default ContactSection; 