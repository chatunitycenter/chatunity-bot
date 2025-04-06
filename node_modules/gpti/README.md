
# GPTI

![npm](https://img.shields.io/npm/dw/gpti?style=for-the-badge) ![License](https://img.shields.io/npm/l/gpti?style=for-the-badge) [![Contributors](https://img.shields.io/github/contributors/yandricr/gpti-js?style=for-the-badge)](https://github.com/yandricr/gpti-js/graphs/contributors) [![Size Package](https://img.shields.io/github/languages/code-size/yandricr/gpti-js?style=for-the-badge)](https://github.com/yandricr/gpti-js) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)


This package simplifies your interaction with various GPT models, eliminating the need for tokens or other methods to access GPT. It also allows you to use three artificial intelligences to generate images: DALL·E, Prodia, and more, some of which are premium while others are free, all of this without restrictions or limits.

## Installation

You can install the package via NPM

```bash
npm i gpti
```

## Buy code

Purchase my API code through [Patreon](https://www.patreon.com/yandricr) and use it without limitations on any model, hassle-free and with no restrictions.

## Available Models

GPTI provides access to a variety of artificial intelligence models to meet various needs. Currently, the available models include:

- [**ChatGPT**](#gpt)
- [**GPT-3.5-Turbo**](#gpt-v2)
- [**ChatGPT Web**](#gptweb)
- [**GPT-4o**](#gpt-4o)
- [**Bing**](#bing)
- [**LLaMA-3.1**](#llama-3.1)
- [**Blackbox**](#blackbox)
- [**AI Images**](#ai-images)

## Api key

If you want to access the premium models, enter your credentials. You can obtain them by [clicking here](https://nexra.aryahcr.cc/api-key/en).

```js
// import { nexra } from "gpti";
// const { nexra } = require("gpti");

const { nexra } = require("gpti");

nexra("user-xxxxxxxx", "nx-xxxxxxx-xxxxx-xxxxx");
```

<a id="gpt"></a>
## Usage GPT

```javascript
// import { gpt } from "gpti";
const { gpt } = require("gpti");

let data = await gpt.v1({
    messages: [
        {
            role: "assistant",
            content: "Hello! How are you today?"
        },
        {
            role: "user",
            content: "Hello, my name is Yandri."
        },
        {
            role: "assistant",
            content: "Hello, Yandri! How are you today?"
        }
    ],
    prompt: "Can you repeat my name?",
    model: "GPT-4",
    markdown: false
});

console.log(data);
```

#### Models

Select one of these available models in the API to enhance your experience.

- gpt-4
- gpt-4-0613
- gpt-4-32k
- gpt-4-0314
- gpt-4-32k-0314
- gpt-3.5-turbo
- gpt-3.5-turbo-16k
- gpt-3.5-turbo-0613
- gpt-3.5-turbo-16k-0613
- gpt-3.5-turbo-0301
- text-davinci-003
- text-davinci-002
- code-davinci-002
- gpt-3
- text-curie-001
- text-babbage-001
- text-ada-001
- davinci
- curie
- babbage
- ada
- babbage-002
- davinci-002

<a id="gpt-v2"></a>
## Usage GPT v2

It's quite similar, with the difference that it has the capability to generate real-time responses via streaming using gpt-3.5-turbo.

```javascript
// import { gpt } from "gpti";
const { gpt } = require("gpti");

let messages = [
    {
        "role": "assistant",
        "content": "Hello! How are you today?"
    },
    {
        "role": "user",
        "content": "Hello, my name is Yandri."
    },
    {
        "role": "assistant",
        "content": "Hello, Yandri! How are you today?"
    },
    {
        "role": "user",
        "content": "Can you repeat my name?"
    }
];

let data = await gpt.v2({
    messages: messages,
    markdown: false,
    stream: false
});

console.log(data);

/*
// Streaming

gpt.v2({
    messages: messages,
    stream: true,
    markdown: false,
    results: (err, data) => {
        console.log(err, data);
    }
});
*/
```

<a id="gptweb"></a>
## Usage GPT Web

GPT-4 has been enhanced by me, but errors may arise due to technological complexity. It is advisable to exercise caution when relying entirely on its accuracy for online queries.

```javascript
// import { gpt } from "gpti";
const { gpt } = require("gpti");

let data = await gpt.web({
    prompt: "Are you familiar with the movie Wonka released in 2023?",
    markdown: false
});

console.log(data);
```

<a id="gpt-4o"></a>
## Usage GPT-4o

```javascript
// import { gpt } from "gpti";
const { gpt } = require("gpti");

let history = [
    {
        "role": "user",
        "content": "Hello! How are you? Could you tell me your name?"
    }
];

let data = await gpt.v3({
    messages: history,
    markdown: false,
    stream: false
});

console.log(data);

/*
// Streaming

gpt.v3({
    messages: history,
    stream: true,
    markdown: false,
    results: (err, data) => {
        console.log(err, data);
    }
});
*/
```

<a id="bing"></a>
## Usage Bing

```javascript
// import { bing } from "gpti";
const { bing } = require("gpti");

let history = [
    {
        role: "assistant",
        content: "Hello! How can I help you today? 😊"
    },
    {
        role: "user",
        content: "Hi, tell me the names of the movies released in 2023."
    },
    {
        role: "assistant",
        content: "Certainly! Here are some movies that were released in 2023:\n\n1.  **About My Father** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n2.  **The Little Mermaid** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n3.  **Fast X** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n4.  **Spider-Man: Across the Spider-Verse** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n5.  **The Machine** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n6.  **Book Club: The Next Chapter** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n7.  **Guardians of the Galaxy Vol. 3** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n8.  **John Wick: Chapter 4** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n9.  **Are You There God? It's Me, Margaret** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n10.  **Evil Dead Rise** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n11.  **The Super Mario Bros. Movie** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n12.  **Love Again** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n13.  **Kandahar** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n14.  **Dungeons & Dragons: Honor Among Thieves** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n15.  **Shin Kamen Rider** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n16.  **Knights of the Zodiac** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n17.  **The Pope's Exorcist** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n18.  **Shazam! Fury of the Gods** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n19.  **All That Breathes** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n20.  **Sailor Moon Cosmos** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n21.  **Hypnotic** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n22.  **Sound of Freedom** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n23.  **The Boogeyman** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n24.  **Chicken Run: Dawn of the Nugget** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n25.  **A Lot of Nothing** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n26.  **Followers** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n27.  **Big George Foreman** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n28.  **Asterix & Obelix: The Middle Kingdom** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n29.  **Ant-Man and the Wasp: Quantumania** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n30.  **Transformers: Rise of the Beasts** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n31.  **Follow Her** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n32.  **Prom Pact** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n33.  **God Is a Bullet** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n34.  **Still: A Michael J. Fox Movie** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n35.  **Nefarious** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n36.  **Nanny Dearest** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n37.  **Monica** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n38.  **Wild Life** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n39.  **Palm Trees and Power Lines** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n40.  **What's Love Got to Do with It?** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n41.  **Creed III** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n42.  **One True Loves** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n43.  **BlackBerry** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n44.  **Suzume** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n45.  **Rock Dog 3: Battle the Beat** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n46.  **Gridman Universe** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n47.  **Digimon Adventure 02: The Beginning** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n48.  **Woman of the Photographs** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n49.  **El Tonto** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n50.  **Seriously Red** [^1^](https://editorial.rottentomatoes.com/guide/best-movies-of-2023/)\n\nI hope this helps! Let me know if you have any other questions."
    },
    {
        role: "user",
        content: "Can you tell me how many movies you've told me about?"
    }
];

let data = await bing({
    messages: history,
    conversation_style: "Balanced",
    markdown: false,
    stream: false
});

console.log(data);

/*
// Streaming

bing({
    messages: history,
    conversation_style: "Balanced",
    stream: true,
    markdown: false,
    results: (err, data) => {
        console.log(err, data);
    }
});
*/
```

#### Parameters

| Parameter          | Default  | Description                                                                                             |
|--------------------|----------|---------------------------------------------------------------------------------------------------------|
| conversation_style | Balanced | You can use between: "Balanced", "Creative" and "Precise"                                               |
| markdown           | false    | You can convert the dialogues into continuous streams or not into Markdown                                |
| stream             | false    | You are given the option to choose whether you prefer the responses to be in real-time or not            |

<a id="llama-3.1"></a>
## Usage LLaMA 3.1

```javascript
// import { llama } from "gpti";
const { llama } = require("gpti");

let history = [
    {
        "role": "user",
        "content": "Hello! How are you? Could you tell me your name?"
    }
];

let data = await llama({
    messages: history,
    markdown: false,
    stream: false
});

console.log(data);

/*
// Streaming

llama({
    messages: history,
    stream: true,
    markdown: false,
    results: (err, data) => {
        console.log(err, data);
    }
});
*/
```

<a id="blackbox"></a>
## Usage Blackbox

```javascript
// import { blackbox } from "gpti";
const { blackbox } = require("gpti");

let history = [
    {
        "role": "user",
        "content": "Hello! How are you? Could you tell me your name?"
    }
];

let data = await blackbox({
    messages: history,
    markdown: false,
    stream: false
});

console.log(data);

/*
// Streaming

blackbox({
    messages: history,
    stream: true,
    markdown: false,
    results: (err, data) => {
        console.log(err, data);
    }
});
*/
```

<a id="ai-images"></a>
## AI Images

Check the documentation [here](https://nexra.aryahcr.cc/documentation/en) to learn how to use the different image generation models.

```javascript
// import { imageai } from "gpti";
const { imageai } = require("gpti");

let data = await imageai({
    prompt: "cat color red",
    model: "dalle",
    response: "url" | "base64",
    data: {}
});

console.log(data);
```

## API Reference

Currently, some models require your credentials to access them, while others are free. For more details and examples, please refer to the complete [documentation](https://nexra.aryahcr.cc/).

#### Code Errors

These are the error codes that will be presented in case the API fails.

| Code |                 Error | Description                                    |
|------|----------------------:|------------------------------------------------|
| 400  | BAD_REQUEST           | Not all parameters have been entered correctly |
| 500  | INTERNAL_SERVER_ERROR | The server has experienced failures            |
| 200  |                       | The API worked without issues                  |
| 403  | FORBIDDEN             | The API credentials are not valid              |
| 401  | UNAUTHORIZED          | API credentials are required                   |