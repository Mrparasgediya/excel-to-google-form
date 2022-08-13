import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="py-14 text-gray-900 bg-gradient-to-r from-cyan-500 to-blue-500  bg-repeate min-h-[calc(100vh-7rem)]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
