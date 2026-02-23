"use client";

import React, { useState, useRef } from "react";
import { GripVertical, ChevronUp, ChevronDown, X, Plus } from "lucide-react";

interface SortableTagListProps {
    label: string;
    tags: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    description?: string;
}

export function SortableTagList({
    label,
    tags,
    onChange,
    placeholder = "Add item...",
    description,
}: SortableTagListProps) {
    const [newValue, setNewValue] = useState("");
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [overIndex, setOverIndex] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // ── Add / Remove ──────────────────────────────────────────
    const addTag = () => {
        const trimmed = newValue.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onChange([...tags, trimmed]);
            setNewValue("");
        }
    };

    const removeTag = (index: number) => {
        onChange(tags.filter((_, i) => i !== index));
    };

    // ── Reorder ───────────────────────────────────────────────
    const moveItem = (from: number, to: number) => {
        if (from === to) return;
        const updated = [...tags];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);
        onChange(updated);
    };

    const moveUp = (index: number) => {
        if (index > 0) moveItem(index, index - 1);
    };

    const moveDown = (index: number) => {
        if (index < tags.length - 1) moveItem(index, index + 1);
    };

    // ── Drag handlers ─────────────────────────────────────────
    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDragIndex(index);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        if (dragIndex !== null && dragIndex !== index) {
            setOverIndex(index);
        }
    };

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (dragIndex !== null && dragIndex !== index) {
            moveItem(dragIndex, index);
        }
        setDragIndex(null);
        setOverIndex(null);
    };

    const handleDragEnd = () => {
        setDragIndex(null);
        setOverIndex(null);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                {label}
            </label>
            {description && (
                <p className="text-xs text-neutral-500 mb-2">{description}</p>
            )}

            {/* Sortable tags */}
            {tags.length > 0 && (
                <div className="space-y-1.5 mb-3">
                    {tags.map((tag, index) => {
                        const isOver = overIndex === index && dragIndex !== index;
                        const isDragging = dragIndex === index;

                        return (
                            <div
                                key={`${tag}-${index}`}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragEnd={handleDragEnd}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragLeave={() => setOverIndex(null)}
                                className={`
                  relative flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-all duration-150
                  ${isDragging ? "opacity-40 scale-[0.98] border-neutral-700 bg-neutral-800/50" : "border-neutral-700 bg-neutral-800/50 hover:border-neutral-600"}
                  ${isOver ? "ring-2 ring-blue-500/30 ring-offset-1 ring-offset-neutral-950" : ""}
                `}
                            >
                                {/* Drop line */}
                                {isOver && (
                                    <div className="absolute -top-[2px] left-0 right-0 h-[3px] bg-blue-500 rounded-full z-10" />
                                )}

                                {/* Grip */}
                                <div className="cursor-grab active:cursor-grabbing text-neutral-500 hover:text-neutral-300 transition-colors shrink-0">
                                    <GripVertical className="w-3.5 h-3.5" />
                                </div>

                                {/* Rank */}
                                <span className="w-5 h-5 flex items-center justify-center rounded bg-white/[0.06] text-[10px] font-semibold text-neutral-400 tabular-nums shrink-0">
                                    {index + 1}
                                </span>

                                {/* Tag name */}
                                <span className="flex-1 text-sm text-neutral-200 min-w-0 truncate">
                                    {tag}
                                </span>

                                {/* Up/Down */}
                                <div className="flex items-center gap-0.5 shrink-0">
                                    <button
                                        onClick={() => moveUp(index)}
                                        disabled={index === 0}
                                        className="p-0.5 rounded hover:bg-white/10 text-neutral-500 hover:text-neutral-200 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                                        title="Move up"
                                    >
                                        <ChevronUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => moveDown(index)}
                                        disabled={index === tags.length - 1}
                                        className="p-0.5 rounded hover:bg-white/10 text-neutral-500 hover:text-neutral-200 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                                        title="Move down"
                                    >
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => removeTag(index)}
                                    className="p-0.5 rounded hover:bg-red-500/20 text-neutral-500 hover:text-red-400 transition-colors shrink-0"
                                    title="Remove"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Add input */}
            <div className="flex gap-2">
                <input
                    ref={inputRef}
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                        }
                    }}
                    placeholder={placeholder}
                    className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
                />
                <button
                    onClick={addTag}
                    className="px-3 py-2 bg-white/10 text-neutral-300 hover:bg-white/15 rounded-lg transition-colors flex items-center gap-1.5 text-sm shrink-0"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                </button>
            </div>
        </div>
    );
}
