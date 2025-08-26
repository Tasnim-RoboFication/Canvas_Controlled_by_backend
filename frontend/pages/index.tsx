/**
 * Main page for Canvas 2 application
 * React Flow + FastAPI integration demo
 */

import React from 'react';
import Head from 'next/head';
import Canvas from '../components/Canvas';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Canvas 2 - React Flow + FastAPI</title>
        <meta name="description" content="Dynamic node and edge creation with React Flow and FastAPI backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <Canvas />
      </main>
    </>
  );
};

export default Home;
