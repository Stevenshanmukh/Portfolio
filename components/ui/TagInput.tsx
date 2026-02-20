"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface TagInputProps {
    label: string;
    tags: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
}

export function TagInput({ label, tags, onChange, placeholder = "Type and press Enter" }: TagInputProps) {
    const [input, setInput] = useState("");

    const addTag = () => {
        const trimmed = input.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onChange([...tags, trimmed]);
        }
        setInput("");
    };

    const removeTag = (idx: number) => {
        onChange(tags.filter((_, i) => i !== idx));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1.5">{label}</label>
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 text-neutral-200 text-sm rounded-md"
                    >
                        {tag}
                        <button
                            onClick={() => removeTag(i)}
                            className="hover:text-red-400 transition-colors"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                        }
                    }}
                    placeholder={placeholder}
                    className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
                />
                <button
                    onClick={addTag}
                    className="px-3 py-2 bg-white/10 text-neutral-300 rounded-lg hover:bg-white/15 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
