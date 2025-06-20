import EditorJS, { type BlockToolConstructable, type OutputData, type ToolSettings } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Paragraph from '@editorjs/paragraph';
import { memo, useEffect, useRef } from 'react';
import './editor.css';
import { supabase } from '../../../supabase-client';
import ImageTool from '@editorjs/image';
import { ImageToolTune } from 'editorjs-image-resize-crop';
import EditorjsList from '@editorjs/list';

const Editor = ({
  data,
  onChange,
  editorBlock,
}: {
  data: string;
  onChange: (data: OutputData) => void;
  editorBlock: string;
}) => {
  const ref = useRef<EditorJS>(null);

  const handleImageUpload = async (file: File): Promise<any> => {
    console.log('🚀 ~ handleImageUpload ~ file:', file);
    // validate photo size
    const filePath = `post/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage.from('post-images').upload(filePath, file, { cacheControl: '3600' });
    if (error) {
      throw new Error(error.message);
    }
    const { data: uploadedImage } = await supabase.storage.from('post-images').getPublicUrl(filePath);

    return {
      success: 1,
      file: {
        url: uploadedImage.publicUrl,
        name: file.name,
        size: file.size,
      },
    };
  };
  const handleImageRetrieval = async (url: string): Promise<any> => {
    console.log('🚀 ~ handleImageRetrieval ~ url:', url);
    const { data } = await supabase.storage.from('post-image').getPublicUrl(url);

    return {
      success: 1,
      file: { url: data.publicUrl },
    };
  };

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: {
            class: Header as any,
            shortcut: 'CTRL+SHIFT+H', // Optional: Add a shortcut for the header tool
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3, 4], // Optional: Specify allowed heading levels (e.g., H2, H3, H4)
              defaultLevel: 3, // Optional: Set a default heading level
              inlineToolbar: true, // Enable inline toolbar for the header
            },
          },
          image: {
            class: ImageTool,
            tunes: ['imageResize'],
            config: {
              uploader: {
                uploadByFile(file: File) {
                  return handleImageUpload(file);
                },
                uploadByUrl(url: string) {
                  return handleImageRetrieval(url);
                },
              },
            },
          },
          imageResize: { class: ImageToolTune as BlockToolConstructable, config: { resize: true, crop: false } },
          list: {
            class: EditorjsList as any,
            inlineToolbar: true,
            config: { defaultStyle: 'unordered' },
          },
          //  list: { class: List, inlineToolbar: true },
          quote: { class: Quote, inlineToolbar: true } as ToolSettings<Quote>,
          paragraph: {
            class: Paragraph as any,
            config: {
              placeholder: 'Type your text here...',
            },
          },
        },
        hideToolbar: false,
        /** previously saved data */
        // data: {},
        onReady: () => {
          console.log('Editor.js is ready');
        },
        async onChange(api, e) {
          const data = await api.saver.save();
          onChange(data);
        },
        data: data ? JSON.parse(data) : {},
      });

      ref.current = editor;
    }
  }, []);

  return <div className="shadow p-12 bg-gray-200 text-gray-800 rounded-lg" id={editorBlock} />;
};

export default memo(Editor);
