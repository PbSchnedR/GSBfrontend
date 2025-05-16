import React, { useState } from 'react';
import { HiQuestionMarkCircle, HiChevronDown, HiChevronUp } from 'react-icons/hi';

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "Comment créer une nouvelle note de frais ?",
      answer: "Pour créer une nouvelle note de frais, cliquez sur le bouton '+ Nouvelle note de frais' dans le tableau de bord. Vous pourrez ensuite remplir les informations nécessaires et téléverser les justificatifs."
    },
    {
      question: "Quels types de justificatifs sont acceptés ?",
      answer: "Nous acceptons les fichiers PDF, JPG, PNG et JPEG. La taille maximale par fichier est de 10MB."
    },
    {
      question: "Dans quels délais serai-je remboursé ?",
      answer: "Le remboursement est effectué sous 5 jours ouvrés après validation de votre note de frais par votre responsable."
    },
    {
      question: "Comment modifier une note de frais déjà soumise ?",
      answer: "Vous pouvez modifier une note de frais tant qu'elle n'a pas été validée. Allez dans la liste des notes de frais, trouvez la note concernée et cliquez sur le bouton 'Modifier'."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-8">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <HiQuestionMarkCircle className="w-6 h-6 text-purple-600" />
          Questions fréquentes
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {faqs.map((faq, index) => (
          <div key={index} className="p-6">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="font-medium">{faq.question}</span>
              {openFaq === index ? (
                <HiChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <HiChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openFaq === index && (
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ; 