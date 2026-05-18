"use client";

import { Share2 } from "lucide-react";
import toast from "react-hot-toast";

interface ShareButtonProps {
  title: string;
  id: string;
}

const ShareButton = ({ title, id }: ShareButtonProps) => {
  const handleShare = async () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;

    const url = `${baseUrl}/blogpage/bloghero/${id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this blog: ${title}`,
          url,
        });
      } catch (err) {
        console.log("Share cancelled or failed", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
    >
      <Share2 size={18} />
      Share
    </button>
  );
};

export default ShareButton;