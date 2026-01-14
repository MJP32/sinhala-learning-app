import React, { useState } from "react";

const ShareButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: "Learn Sinhala - සිංහල ඉගෙන ගන්න",
    text: "Learn Sinhala language online for free! Interactive lessons covering alphabet, vocabulary, grammar, and pronunciation.",
    url: "https://sinhala-learning.web.app/",
  };

  const handleShare = async () => {
    // Use native Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error - show dropdown instead
        if (err.name !== "AbortError") {
          setShowDropdown(true);
        }
      }
    } else {
      // Fallback to dropdown menu
      setShowDropdown(!showDropdown);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareData.url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
    window.open(url, "_blank", "width=550,height=420");
    setShowDropdown(false);
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
    window.open(url, "_blank", "width=550,height=420");
    setShowDropdown(false);
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`;
    window.open(url, "_blank");
    setShowDropdown(false);
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`;
    window.open(url, "_blank", "width=550,height=420");
    setShowDropdown(false);
  };

  return (
    <div className="share-button-container">
      <button className="share-btn" onClick={handleShare} title="Share this app">
        <span className="share-icon">📤</span>
        <span className="share-label">Share</span>
      </button>

      {showDropdown && (
        <>
          <div className="share-backdrop" onClick={() => setShowDropdown(false)} />
          <div className="share-dropdown">
            <button onClick={copyLink} className="share-option">
              <span>{copied ? "✓" : "🔗"}</span>
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
            <button onClick={shareToWhatsApp} className="share-option">
              <span>💬</span>
              <span>WhatsApp</span>
            </button>
            <button onClick={shareToFacebook} className="share-option">
              <span>📘</span>
              <span>Facebook</span>
            </button>
            <button onClick={shareToTwitter} className="share-option">
              <span>🐦</span>
              <span>Twitter</span>
            </button>
            <button onClick={shareToLinkedIn} className="share-option">
              <span>💼</span>
              <span>LinkedIn</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;
