import React, { useRef, useState } from 'react';
import { BankDocument, FormField } from '../types';
import { Edit3, CheckCircle2, Mic, Eye, Sparkles } from 'lucide-react';

interface FormDocumentViewerProps {
  document: BankDocument;
  onEditField?: (field: FormField) => void;
  showFieldOutlines?: boolean;
  highlightKey?: string;
  readOnly?: boolean;
}

export const FormDocumentViewer: React.FC<FormDocumentViewerProps> = ({
  document,
  onEditField,
  showFieldOutlines = true,
  highlightKey,
  readOnly = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredFieldKey, setHoveredFieldKey] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
          <span className="truncate">{document.name}</span>
        </div>
        <div className="shrink-0 text-slate-300 text-xs">
          Original Form Preserved
        </div>
      </div>

      {/* Document Viewport with Overlay Fields */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[800/1100] bg-slate-100 select-none overflow-hidden"
      >
        {/* The Original Uploaded Bank Form */}
        <img
          src={document.previewUrl}
          alt={document.name}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        {/* Dynamic Overlaid Fields Placed on the Original Form */}
        {document.fields.map((field) => {
          const isHighlighted = highlightKey === field.key;
          const isHovered = hoveredFieldKey === field.key;
          const hasValue = Boolean(field.value && field.value.trim().length > 0);

          return (
            <div
              key={field.key}
              onClick={() => {
                if (!readOnly && onEditField) {
                  onEditField(field);
                }
              }}
              onMouseEnter={() => setHoveredFieldKey(field.key)}
              onMouseLeave={() => setHoveredFieldKey(null)}
              style={{
                left: `${field.box.x}%`,
                top: `${field.box.y}%`,
                width: `${field.box.width}%`,
                height: `${field.box.height}%`,
              }}
              className={`absolute flex items-center px-2 py-0.5 rounded-sm transition-all duration-150 ${
                !readOnly ? 'cursor-pointer' : ''
              } ${
                isHighlighted
                  ? 'bg-amber-300/40 ring-2 ring-amber-500 z-30 shadow-md'
                  : isHovered && !readOnly
                  ? 'bg-blue-300/30 ring-2 ring-blue-500 z-20 shadow-xs'
                  : showFieldOutlines
                  ? hasValue
                    ? 'bg-blue-50/70 border border-blue-400/60'
                    : 'bg-amber-50/40 border border-dashed border-amber-400/80'
                  : ''
              }`}
              title={!readOnly ? `Click to edit ${field.label}` : field.label}
            >
              {/* Overlaid Filled Text (Official Deep Navy Ink style) */}
              {hasValue ? (
                <span className="text-blue-950 font-bold text-xs sm:text-sm tracking-wide truncate font-mono">
                  {field.value}
                </span>
              ) : (
                <span className="text-amber-800/70 italic text-[10px] sm:text-xs truncate">
                  [ {field.label} ]
                </span>
              )}

              {/* Source Icon / Edit indicator on hover */}
              {!readOnly && isHovered && (
                <div className="absolute -top-3 -right-2 bg-blue-700 text-white rounded-full p-1 shadow-sm">
                  <Edit3 className="w-2.5 h-2.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Helper Footer for Elderly Users */}
      {!readOnly && (
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Tap any field to edit via voice or touch</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-blue-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Auto-Aligned</span>
          </div>
        </div>
      )}
    </div>
  );
};
