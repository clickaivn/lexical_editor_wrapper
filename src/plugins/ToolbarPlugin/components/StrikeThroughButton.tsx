import { FORMAT_TEXT_COMMAND } from 'lexical';
import React from 'react';
import { useContext } from 'react';
import { IS_APPLE } from '../../../shared/src/environment';
import EditorContext from '../../../context/EditorContext';
import ToolbarContext from '../../../context/ToolbarContext';
import { useTranslation } from 'react-i18next';

const StrikeThroughButton = () => {
  const { activeEditor } = useContext(EditorContext);
  const { isStrikethrough } = useContext(ToolbarContext);
  const { t } = useTranslation('toolbar');

  return (
    <button
      onClick={() => {
        activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
      }}
      className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
      title={t('toolbar:textFormatDropdown.Options.Strikethrough.Label')}
      aria-label={t(
        'toolbar:textFormatDropdown.Options.Strikethrough.Description'
      )}
      type="button"
    >
      <i className="format strikethrough" />
    </button>
  );
};

export default StrikeThroughButton;
