const WhatsAppSticky = () => {
  return (
    <a
      href="https://wa.me/923214472719"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-[#25D366]"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor">
        <path d="M19.11 17.47c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.54-.45-.47-.61-.48h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.27.23-.61.23-1.14.16-1.27-.07-.14-.25-.2-.52-.34z" />
      </svg>

      <span>Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppSticky;
