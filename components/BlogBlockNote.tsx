"use client";

export default function BlockNoteProductViewer({
  content,
}: {
  content: string;
}) {
  return (
    <div
      className="blocknote-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}