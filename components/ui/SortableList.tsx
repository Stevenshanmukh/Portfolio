"use client";

import React, { useState, useRef, useCallback } from "react";
import { GripVertical, ChevronUp, ChevronDown } from "lucide-react";

interface SortableListProps<T> {
    items: T[];
    onChange: (items: T[]) => void;
    renderItem: (item: T, index: number) => React.ReactNode;
    keyExtractor: (item: T, index: number) => string | number;
    /** Optional label shown as a small rank badge */
    showRank?: boolean;
}

export function SortableList<T>({
    items,
    onChange,
    renderItem,
    keyExtractor,
    showRank = true,
}: SortableListProps<T>) {
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [overIndex, setOverIndex] = useState<number | null>(null);
    const dragNode = useRef<HTMLDivElement | null>(null);

    // ── Move helpers ──────────────────────────────────────────
    const moveItem = useCallback(
        (from: number, to: number) => {
            if (from === to) return;
            const updated = [...items];
            const [moved] = updated.splice(from, 1);
            updated.splice(to, 0, moved);
            onChange(updated);
        },
        [items, onChange]
    );

    const moveUp = useCallback(
        (index: number) => {
            if (index > 0) moveItem(index, index - 1);
        },
        [moveItem]
    );

    const moveDown = useCallback(
        (index: number) => {
            if (index < items.length - 1) moveItem(index, index + 1);
        },
        [items.length, moveItem]
    );

    // ── Drag handlers ─────────────────────────────────────────
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        setDragIndex(index);
        dragNode.current = e.currentTarget;
        e.dataTransfer.effectAllowed = "move";
        // Make the drag image slightly transparent
        requestAnimationFrame(() => {
            if (dragNode.current) {
                dragNode.current.style.opacity = "0.4";
            }
        });
    };

    const handleDragEnd = () => {
        if (dragNode.current) {
            dragNode.current.style.opacity = "1";
        }
        setDragIndex(null);
        setOverIndex(null);
        dragNode.current = null;
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        if (dragIndex === null || dragIndex === index) return;
        setOverIndex(index);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        if (dragIndex !== null && dragIndex !== index) {
            moveItem(dragIndex, index);
        }
        setDragIndex(null);
        setOverIndex(null);
    };

    const handleDragLeave = () => {
        setOverIndex(null);
    };

    return (
        <div className="space-y-2">
            {items.map((item, index) => {
                const isOver = overIndex === index && dragIndex !== index;
                const isDragging = dragIndex === index;

                return (
                    <div
                        key={keyExtractor(item, index)}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragLeave={handleDragLeave}
                        className={`
              relative flex items-stretch rounded-lg transition-all duration-150
              ${isDragging ? "opacity-40 scale-[0.98]" : ""}
              ${isOver ? "ring-2 ring-white/20 ring-offset-1 ring-offset-neutral-950" : ""}
            `}
                    >
                        {/* Drop indicator line */}
                        {isOver && (
                            <div className="absolute -top-[2px] left-0 right-0 h-[3px] bg-blue-500 rounded-full z-10" />
                        )}

                        {/* Drag handle + rank */}
                        <div className="flex items-center gap-1.5 pr-2 shrink-0">
                            <div
                                className="cursor-grab active:cursor-grabbing p-1.5 rounded-md hover:bg-white/5 text-neutral-500 hover:text-neutral-300 transition-colors"
                                title="Drag to reorder"
                            >
                                <GripVertical className="w-4 h-4" />
                            </div>

                            {showRank && (
                                <span className="w-6 h-6 flex items-center justify-center rounded-md bg-white/[0.06] text-[11px] font-semibold text-neutral-400 tabular-nums shrink-0">
                                    {index + 1}
                                </span>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">{renderItem(item, index)}</div>

                        {/* Up/Down arrows */}
                        <div className="flex flex-col justify-center gap-0.5 pl-2 shrink-0">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    moveUp(index);
                                }}
                                disabled={index === 0}
                                className="p-1 rounded hover:bg-white/10 text-neutral-500 hover:text-neutral-200 disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                                title="Move up"
                            >
                                <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    moveDown(index);
                                }}
                                disabled={index === items.length - 1}
                                className="p-1 rounded hover:bg-white/10 text-neutral-500 hover:text-neutral-200 disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                                title="Move down"
                            >
                                <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
