import { useState } from "react";

const PHONE_NUMBER = "923214472719"; // 🔴 put your WhatsApp number here (no +)

const questions = [
    "Which content system is best for my business?",
  "Can you help me choose the right template bundle?",
  "What’s included in your Content Calendar Templates?",
  "Are these templates proven to convert?",
  "Do you offer bundle pricing or discounts?"
];

const WhatsAppSticky = () => {
  const [open, setOpen] = useState(false);

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
      `Hi Usama,\n\n${message}`
    )}`;
    window.open(url, "_blank");
    setOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-[#25D366]"
      >
        <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor">
          <path d="M19.11 17.47c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.54-.45-.47-.61-.48h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.93 2.95 4.68 4.14z" />
        </svg>
        Chat on WhatsApp
      </button>

      {/* Question Popup */}
      {open && (
        <div className="fixed bottom-20 right-6 z-[9999] w-72 rounded-2xl bg-white p-4 shadow-2xl">
          <p className="mb-3 text-sm font-semibold text-neutral-800">
            How can I help you?
          </p>

          <div className="space-y-2">
            {questions.map((q, i) => (
              <button
                key={i}
                onClick={() => openWhatsApp(q)}
                className="w-full rounded-xl bg-neutral-100 px-3 py-2 text-left text-sm text-neutral-700 transition hover:bg-neutral-200"
              >
                {q}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpen(false)}
            className="mt-3 w-full text-xs text-neutral-400 hover:text-neutral-600"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default WhatsAppSticky;
