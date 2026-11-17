"use client";
import { useState } from "react";
import { Share2 } from "lucide-react";
export function ShareArticle({ title }: { title: string }) {
  const [message, setMessage] = useState("");
  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        setMessage("Article link copied.");
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        setMessage("Copy the address from your browser to share this article.");
    }
  }
  return (
    <div className="share-article">
      <button className="text-link" onClick={share}>
        <Share2 size={16} aria-hidden="true" /> Share this story
      </button>
      <span role="status">{message}</span>
    </div>
  );
}
