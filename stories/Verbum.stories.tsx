import React from 'react';
import { Divider, Editor, EditorComposer } from '../src';
import ToolbarPlugin from '../src/plugins/ToolbarPlugin/ToolbarPlugin';

import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import {
  AlignDropdown,
  BackgroundColorPicker,
  BoldButton,
  CodeFormatButton,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  PasteFromChatButton,
  TextColorPicker,
  UnderlineButton,
} from '../src/plugins/ToolbarPlugin/components';

export default {
  title: 'clk-lexical',
};

const initialState = () => {
  const paragraph = $createParagraphNode();
  const text = $createTextNode('Hello World!');
  paragraph.append(text);
  const root = $getRoot();
  root.append(paragraph);
  root.selectEnd();
};

export const FullEditor = () => (
  <EditorComposer initialEditorState={initialState}>
    <Editor>
      <ToolbarPlugin>
        <FontFamilyDropdown />
        <FontSizeDropdown />
        <Divider />
        <BoldButton />
        <ItalicButton />
        <UnderlineButton />
        <CodeFormatButton />
        <InsertLinkButton />
        <TextColorPicker />
        <BackgroundColorPicker />
        <Divider />
        <InsertDropdown enableEquations enableYoutube />
        <Divider />
        <AlignDropdown />
        <PasteFromChatButton />
      </ToolbarPlugin>
    </Editor>
  </EditorComposer>
);
