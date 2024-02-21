# Cipher

This is a web application for you to try out several cipher strategies (vigenere with its' variants, playfair, affine, hill, and a combination of vigenere + transposition). All of them are written from scratch in TypeScript. *All the use cases at the backend side are unit tested!*

## How to run

Make sure you have Node.js installed on your system. **You need to run both the backend and frontend to run this program**.

### 1st step: Running the backend

1. Navigate to the backend directory, i.e. `cd backend`
2. Install the required modules, i.e. `npm install`
3. Run the command `npm run dev`. Make sure you have no other applications running at port 3000.
4. Congratulations, you got the backend server running!

### 2nd step: Running the frontend

1. Navigate to the frontend directory, i.e. `cd frontend`, or if you're from the backend folder, do `cd ../frontend`
2. Install the required modules, i.e. `npm install`
3. Run the command `npm run dev`. Make sure you have no other applications running at port 5173.
4. Congratulations, you got the frontend server running! **You can access the application at http://localhost:5173**.

## Project structure
```
├── README.md
├── backend
│   ├── jest.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── cipher
│   │   │   ├── controller
│   │   │   │   ├── affine.ts
│   │   │   │   ├── auto-key-vigenere.ts
│   │   │   │   ├── extended-vigenere.ts
│   │   │   │   ├── hill.ts
│   │   │   │   ├── playfair.ts
│   │   │   │   ├── standard-vigenere.ts
│   │   │   │   └── super.ts
│   │   │   ├── input-dto
│   │   │   │   └── index.ts
│   │   │   ├── io-boundary
│   │   │   │   └── index.ts
│   │   │   ├── output-dto
│   │   │   │   └── index.ts
│   │   │   ├── request
│   │   │   │   └── index.ts
│   │   │   ├── response
│   │   │   │   └── index.ts
│   │   │   └── use-case
│   │   │       ├── affine.test.ts
│   │   │       ├── affine.ts
│   │   │       ├── auto-key-vigenere.test.ts
│   │   │       ├── auto-key-vigenere.ts
│   │   │       ├── extended-vigenere.test.ts
│   │   │       ├── extended-vigenere.ts
│   │   │       ├── hill.test.ts
│   │   │       ├── hill.ts
│   │   │       ├── playfair.test.ts
│   │   │       ├── playfair.ts
│   │   │       ├── standard-vigenere.test.ts
│   │   │       ├── standard-vigenere.ts
│   │   │       ├── super.test.ts
│   │   │       ├── super.ts
│   │   │       ├── transposition.test.ts
│   │   │       └── transposition.ts
│   │   ├── index.ts
│   │   └── util
│   │       ├── alphabetic-cipher
│   │       │   ├── index.test.ts
│   │       │   └── index.ts
│   │       ├── extended-cipher
│   │       │   ├── index.test.ts
│   │       │   └── index.ts
│   │       ├── matrix
│   │       │   ├── matrix.test.ts
│   │       │   └── matrix.ts
│   │       ├── modulo
│   │       │   ├── index.test.ts
│   │       │   └── index.ts
│   │       └── sanitizer
│   │           ├── index.test.ts
│   │           └── index.ts
│   ├── tsconfig.json
│   └── uploads
├── frontend
│   ├── README.md
│   ├── components.json
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.tsx
│   │   ├── components
│   │   │   └── ui
│   │   │       ├── button.tsx
│   │   │       ├── input.tsx
│   │   │       ├── label.tsx
│   │   │       ├── radio-group.tsx
│   │   │       ├── select.tsx
│   │   │       ├── sonner.tsx
│   │   │       └── textarea.tsx
│   │   ├── hooks
│   │   │   └── use-cipher-form.ts
│   │   ├── index.css
│   │   ├── lib
│   │   │   ├── constants.ts
│   │   │   └── utils.ts
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── testcase
    ├── audio.mp3
    ├── image_1.png
    ├── image_2.png
    └── text.txt
```
