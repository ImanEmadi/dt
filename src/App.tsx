import { useState } from 'react'
import { MantineProvider } from '@mantine/core';
import { Header } from './components/header/header';
import { Todo } from './components/todo';
import './App.css'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

function App() {

  return (
    <>
      <MantineProvider defaultColorScheme='dark'>
        <Header />
        <Todo />
      </MantineProvider>
    </>
  )
}

export default App
