import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/common/components/ui/button";
import { Label } from "@/common/components/ui/label";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  error,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Contenido (Markdown)</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant={activeTab === "edit" ? "default" : "outline"}
            onClick={() => setActiveTab("edit")}
          >
            Editar
          </Button>
          <Button
            type="button"
            size="sm"
            variant={activeTab === "preview" ? "default" : "outline"}
            onClick={() => setActiveTab("preview")}
          >
            Vista Previa
          </Button>
        </div>
      </div>

      {activeTab === "edit" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[400px] p-4 rounded-lg border border-border bg-background font-mono text-sm resize-y"
          placeholder="Escribe tu contenido en Markdown..."
        />
      ) : (
        <div className="w-full min-h-[400px] p-4 rounded-lg border border-border bg-background prose prose-gray dark:prose-invert max-w-none overflow-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {value || "*Vista previa vacía*"}
          </ReactMarkdown>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
