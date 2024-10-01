import { $generateNodesFromDOM } from '@lexical/html';
import { $getSelection } from 'lexical';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import showdown from 'showdown';
import EditorContext from '../../../context/EditorContext';
import ToolbarContext from '../../../context/ToolbarContext';

const converter = new showdown.Converter();

const PasteFromChatButton = () => {
  const { initialEditor } = useContext(EditorContext);
  const { blockType } = useContext(ToolbarContext);
  const { t } = useTranslation('toolbar');

  const formatMarkdown = () => {
    if (blockType !== 'markdown') {
      navigator.clipboard
        .readText()
        .then((textContent) => {
          initialEditor.update(() => {
            const html = converter.makeHtml(textContent);
            const parser = new DOMParser();
            const dom = parser.parseFromString(html, 'text/html');
            const nodes = $generateNodesFromDOM(initialEditor, dom);
            const selection = $getSelection();

            selection.insertNodes(nodes);
          });
        })
        .catch((err) => {
          console.error('Error reading clipboard contents:', err);
        });
    }
  };

  return (
    <button
      className="toolbar-item spaced alignment"
      onClick={formatMarkdown}
      type="button"
    >
      <i className="icon paste-markdown"></i>
      <span className="text">{t('action:Paste_From_Chat')}</span>
      {blockType === 'markdown' && <span className="active" />}
    </button>
  );
};

export default PasteFromChatButton;
