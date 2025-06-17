import {
  $createTextNode,
  $getSelection,
  $insertNodes,
  COMMAND_PRIORITY_HIGH,
  PASTE_COMMAND,
} from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

/**
 * EmojiSanitizePlugin
 *
 * This plugin intercepts paste events that contain HTML with image tags (often emoji as images)
 * and instead inserts the plain text version, which typically contains Unicode emoji.
 *
 * This helps ensure emojis are consistently represented as Unicode characters rather than images.
 */
export function EmojiSanitizePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand<ClipboardEvent>(
      PASTE_COMMAND,
      (event) => {
        const clipboardData = event.clipboardData;
        if (!clipboardData) {
          return false;
        }

        const html = clipboardData.getData('text/html');
        const text = clipboardData.getData('text/plain');

        // Skip if there's no HTML or no text alternative
        if (!html || !text) {
          return false;
        }

        // Check if HTML contains images that are likely emojis
        const containsEmojiImages =
          // Look for img tags
          (html.includes('<img') &&
            // Common emoji image patterns
            (html.includes('emoji') ||
              html.includes('emoticon') ||
              // Check for small image dimensions (typical for emojis)
              html.includes('width="16"') ||
              html.includes('width="18"') ||
              html.includes('height="16"') ||
              html.includes('height="18"'))) ||
          // Microsoft Outlook/Office specific emoji format
          html.includes('data-emoticon');

        if (containsEmojiImages) {
          // Prevent default paste behavior
          event.preventDefault();

          // Insert the plain text which should contain Unicode emoji characters
          editor.update(() => {
            // Get the current selection
            const selection = $getSelection();

            if (selection) {
              // If multiple emojis were pasted, split them and create separate text nodes
              // This ensures proper rendering and spacing
              if (text.length <= 4) {
                // For single or few emojis, insert as is
                $insertNodes([$createTextNode(text)]);
              } else {
                // For longer text that might contain multiple emojis
                // Check if text contains mostly emoji characters
                const emojiPattern = /[\p{Emoji}]/u;
                const isMainlyEmojis =
                  Array.from(text).filter((char) => emojiPattern.test(char))
                    .length >
                  text.length / 3;

                if (isMainlyEmojis) {
                  // Insert character by character to preserve emoji formatting
                  Array.from(text).forEach((char) => {
                    $insertNodes([$createTextNode(char)]);
                  });
                } else {
                  // If not mainly emojis, insert as a single text node
                  $insertNodes([$createTextNode(text)]);
                }
              }
            }
          });

          return true;
        }

        return false; // allow normal handling
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);

  return null;
}

export default EmojiSanitizePlugin;
