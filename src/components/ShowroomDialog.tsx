'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export function ShowroomDialog({ title, onClose, children, side = false, wide = false }: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  side?: boolean;
  wide?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      className={`fixed border-0 p-0 backdrop:bg-black/75 backdrop:backdrop-blur-sm ${side
        ? 'inset-y-0 left-0 m-0 h-dvh max-h-none w-[min(92vw,24rem)] max-w-none bg-[#252525] text-white'
        : `inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl bg-white text-zinc-900 ${wide ? 'max-w-4xl' : 'max-w-lg'}`}`}
    >
      <div className={`flex items-center justify-between border-b px-6 py-5 ${side ? 'border-white/10' : 'border-zinc-200'}`}>
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        <button onClick={onClose} aria-label={`Tutup ${title.toLowerCase()}`} className="rounded-lg p-2 transition-colors hover:bg-zinc-500/15 focus-visible:outline-2 focus-visible:outline-amber-500">
          <X className="h-5 w-5" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
