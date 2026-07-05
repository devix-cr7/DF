import { motion } from "framer-motion";

const ARABIC_RE = /[\u0600-\u06FF]/;

export function AnimatedText({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const words = text.split(" ");

  return (
    <Tag className={className} dir="auto">
      {words.map((word, wi) => {
        // Each word gets its own isolated bidi context — otherwise splitting
        // a word into per-character spans lets the browser's bidi algorithm
        // reorder those spans when the word sits inside an RTL sentence,
        // scrambling Latin brand names/technical words (e.g. "DevForge").
        const wordIsRTL = ARABIC_RE.test(word);
        return (
          <span
            key={wi}
            dir={wordIsRTL ? "rtl" : "ltr"}
            style={{ unicodeBidi: "isolate" }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((char, ci) => (
              <motion.span
                key={ci}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.5,
                  delay: delay + (wi * 6 + ci) * 0.02,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            {"\u00A0"}
          </span>
        );
      })}
    </Tag>
  );
}
