<template>
  <div class="text-end">
    <button type="button" class="" @click="saveEditor()">
      SAVE
    </button>
  </div>
  <div id="editorjs" class="border"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 500,
  },
  height: {
    type: Number,
    default: 500,
  },
});
const emit = defineEmits(['update:modelValue'])
const editor = ref(null);

const testData = {
        blocks: [
          {
            type: "header",
            data: {
              text: "Editor.js",
              level: 2
            }
          },
          {
            type : 'paragraph',
            data : {
              text : 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.'
            }
          },
          {
            type: "header",
            data: {
              text: "Key features",
              level: 3
            }
          },
          {
            type : 'list',
            data : {
              items : [
                'It is a block-styled editor',
                'It returns clean data output in JSON',
                'Designed to be extendable and pluggable with a simple API',
              ],
              style: 'unordered'
            }
          },
          {
            type: "header",
            data: {
              text: "What does it mean «block-styled editor»",
              level: 3
            }
          },
          {
            type : 'paragraph',
            data : {
              text : 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
            }
          },
          {
            type : 'paragraph',
            data : {
              text : `There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.`
            }
          },
          {
            type: "header",
            data: {
              text: "What does it mean clean data output",
              level: 3
            }
          },
          {
            type : 'paragraph',
            data : {
              text : 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below'
            }
          },
          {
            type : 'paragraph',
            data : {
              text : `Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.`
            }
          },
          {
            type : 'paragraph',
            data : {
              text : 'Clean data is useful to sanitize, validate and process on the backend.'
            }
          },
          {
            type : 'delimiter',
            data : {}
          },
          {
            type : 'paragraph',
            data : {
              text : 'We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it\'s core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏'
            }
          },
          {
            type: 'image',
            data: {
              url: 'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',
              caption: '',
              stretched: false,
              withBorder: true,
              withBackground: false,
            }
          },
          
        ]
      }

const testData2 = {
  blocks: [
    {
        "id": "0bp7ifHZbK",
        "type": "header",
        "data": {
            "text": "Hello World !!",
            "level": 1
        }
    },
    {
        "id": "djlIoUh7HW",
        "type": "code",
        "data": {
            "code": "<template>\n<h1>hello world</h1>\n</template>"
        }
    }
]
}
onMounted(async () => {
  if (typeof window !== 'undefined') {
    //
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const List = (await import('@editorjs/list')).default;
    const Paragraph = (await import('@editorjs/paragraph')).default;
    const RawTool = (await import('@editorjs/raw')).default;
    const Quote = (await import('@editorjs/quote')).default;
    const Image = (await import('@editorjs/image')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const Code = (await import('@editorjs/code')).default;
    const Delimiter = (await import('@editorjs/delimiter')).default;

    editor.value = new EditorJS({
      holder: 'editorjs',
      autofocus: true,
      placeholder: '',
      i18n: {
        messages: {}
      },
      logLevel: 'VERBOSE',
      readOnly: false,
      tools: {
        header: { 
          class: Header, 
          config: { 
            placeholder: 'Enter a header', 
            levels: [1, 2, 3, 4, 5, 6], 
            inlineToolbar: ['link', 'marker', 'bold', 'italic',] 
          } 
        },
        list: { class: List, inlineToolbar: true },
        paragraph: { class: Paragraph, inlineToolbar: true },
        raw: { class: RawTool, inlineToolbar: true},
        quote: { class: Quote, inlineToolbar: true },
        image: { class: Image, inlineToolbar: true },
        embed: { class: Embed, inlineToolbar: true },
        table: { class: Table, inlineToolbar: true },
        code: { class: Code, inlineToolbar: true },
        delimiter: { class: Delimiter, inlineToolbar: true }
      },
      // data: testData2,
      data: '',
      onReady: () => {
        console.log('Editor.js is ready to work!');
      }
    });
  }
});

const saveEditor = () => {
  editor.value.save().then((outputData) => {
    console.log(outputData);
  }).catch((error) => {
    console.log(error);
  });
};

onUnmounted(() => {
  if (editor.value) {
    editor.value.destroy();
  }
})
</script>

<!-- <script setup> -->
<!-- import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import RawTool from '@editorjs/raw';
import Quote from '@editorjs/quote';
import Image from '@editorjs/image';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 500,
  },
  height: {
    type: Number,
    default: 500,
  },
});
const emit = defineEmits(['update:modelValue'])
const editor = ref(null);
const data = ref(props.modelValue);

const saveEditor = () => {
  editor.value.save().then((outputData) => {
    console.log(outputData);
  }).catch((error) => {
    console.log(error);
  });
};

onMounted(() => {
  editor.value = new EditorJS({
    holder: 'editorjs',
    autofocus: true,
    placeholder: '',
    i18n: {
      messages: {
        zh: {
          //
        }
      }
    },
    logLevel: 'VERBOSE',
    readOnly: false,
    tools: {
      header: {
        class: Header,
        config: {
        placeholder: 'Enter a header',
        levels: [1, 2, 3, 4, 5, 6],
        inlineToolbar: ['link', 'marker', 'bold', 'italic'],
        }
      },
      list: {
        class: List,
        inlineToolbar: true
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true
      },
      raw: RawTool,
      quote: {
        class: Quote,
        inlineToolbar: true
      },
      image: {
        class: Image,
        inlineToolbar: true
      },
      embed: {
        class: Embed,
        inlineToolbar: true
      },
      table: {
        class: Table,
        inlineToolbar: true
      },
      code: {
        class: Code,
        inlineToolbar: true
      },
      delimiter: {
        class: Delimiter,
        inlineToolbar: true
      }
    },
    data: {
        blocks: [
          {
            type: "header",
            data: {
              text: "Editor.js",
              level: 2
            }
          },
          {
            type : 'paragraph',
            data : {
              text : 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.'
            }
          },
          {
            type: "header",
            data: {
              text: "Key features",
              level: 3
            }
          },
          {
            type : 'list',
            data : {
              items : [
                'It is a block-styled editor',
                'It returns clean data output in JSON',
                'Designed to be extendable and pluggable with a simple API',
              ],
              style: 'unordered'
            }
          },
          {
            type: "header",
            data: {
              text: "What does it mean «block-styled editor»",
              level: 3
            }
          },
          {
            type : 'paragraph',
            data : {
              text : 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
            }
          },
          {
            type : 'paragraph',
            data : {
              text : `There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.`
            }
          },
          {
            type: "header",
            data: {
              text: "What does it mean clean data output",
              level: 3
            }
          },
          {
            type : 'paragraph',
            data : {
              text : 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below'
            }
          },
          {
            type : 'paragraph',
            data : {
              text : `Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.`
            }
          },
          {
            type : 'paragraph',
            data : {
              text : 'Clean data is useful to sanitize, validate and process on the backend.'
            }
          },
          {
            type : 'delimiter',
            data : {}
          },
          {
            type : 'paragraph',
            data : {
              text : 'We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it\'s core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏'
            }
          },
          {
            type: 'image',
            data: {
              url: 'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',
              caption: '',
              stretched: false,
              withBorder: true,
              withBackground: false,
            }
          },
          
        ]
      },
    onReady: () => {
      console.log('Editor.js is ready to work!');
    }
  });
  console.log(editor.value);
})

onUnmounted(() => {
  editor.value.destroy()
})
</script> -->