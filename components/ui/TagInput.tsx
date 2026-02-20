"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface TagInputProps {
    label: string;
    tags: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    suggestions?: string[];
}

export function TagInput({ label, tags, onChange, placeholder = "Type and press Enter", suggestions = [] }: TagInputProps) {
    const [input, setInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const addTag = (tagToAdd?: string) => {
        const val = tagToAdd || input.trim();
        if (val && !tags.includes(val)) {
            onChange([...tags, val]);
        }
        setInput("");
        setShowSuggestions(false);
    };

    const removeTag = (idx: number) => {
        onChange(tags.filter((_, i) => i !== idx));
    };

    const filteredSuggestions = suggestions.filter(
        (s) => !tags.includes(s) && s.toLowerCase().includes(input.toLowerCase())
    );

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
            <div className="flex gap-2 relative">
                <input
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click
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
                    onClick={() => addTag()}
                    className="px-3 py-2 bg-white/10 text-neutral-300 rounded-lg hover:bg-white/15 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>

                {/* Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                        {filteredSuggestions.map((s) => (
                            <button
                                key={s}
                                onClick={() => addTag(s)}
                                className="w-full text-left px-3 py-2 text-sm text-neutral-300 hover:bg-white/10 transition-colors"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
