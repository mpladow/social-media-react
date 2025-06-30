import type { OutputBlockData } from '@editorjs/editorjs';
import parse from 'html-react-parser';

export const editorJStoHTML = (data: OutputBlockData) => {

  switch (data.type) {
    case 'paragraph':
      return parse(`<p>${data.data.text}</p>`);
    case 'header':
      switch (data.data.level) {
        case 1:
          return parse(`<h${data.data.level} className="font-bold">${data.data.text}</h${data.data.level}>`);
        case 2:
          return parse(
            `<h${data.data.level} className="text-2xl font-semibold">${data.data.text}</h${data.data.level}>`
          );
        case 3:
          return parse(`<h${data.data.level} className="text-xl font-medium">${data.data.text}</h${data.data.level}>`);
        default:
          return parse(`<h${data.data.level}>${data.data.text}</h${data.data.level}>`);
      }

    //  case 'list':
    //    const listItems = data.data.items.map((item: string) => {
    //      console.log('🚀 ~ listItems ~ item:', data.data.);
    //      return `<li>${item.content}</li>`;
    //    });
    //    return parse(`<ul>${listItems}</ul>`);
    case 'quote':
      return parse(
        `<blockquote className='border-l-2 border-purple-400  ml-4 p-4 mt-4'>${data.data.text} - <cite>${data.data.caption}</cite></blockquote>`
      );
    case 'image': {
      const {
        cropperFrameHeight,
        cropperFrameLeft,
        cropperFrameTop,
        cropperImageWidth,
        cropperImageHeight,
      } = data?.tunes?.imageResize;

      let containerStyle = '';
      if (data.tunes?.imageResize) {
        containerStyle += `style="margin-left: ${cropperFrameLeft}px; margin-top: ${cropperFrameTop}px; width: ${cropperImageWidth}px; height: ${cropperImageHeight}px;`;
      }
      containerStyle += `"`;
      //  return containerStyle;

      return parse(
        `<div style="overflow: hidden; ${
          data.tunes?.imageResize.crop == true ? 'height: ' + cropperFrameHeight + 'px;' : 'height: auto;'
        }"><img className="rounded-lg"${
          data?.tunes?.imageResize?.resizeSize
            ? `style="width: ${data.tunes.imageResize.resizeSize}px;"`
            : `${containerStyle}`
        } src="${data.data.file.url}" alt="${data.data.caption}" />${
          data.data.caption ? `<figcaption>${data.data.caption}</figcaption>` : ''
        }</div>`
      );
    }
    default:
      return '';
  }
};
