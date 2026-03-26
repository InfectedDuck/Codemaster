import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    loadPyodide: any;
    pyodide: any;
  }
}

interface PyodideContextType {
  pyodide: any;
  isPyodideLoading: boolean;
}

const PyodideContext = createContext<PyodideContextType | undefined>(undefined);

export const usePyodide = () => {
  const context = useContext(PyodideContext);
  if (!context) {
    throw new Error('usePyodide must be used within a PyodideProvider');
  }
  return context;
};

export const PyodideProvider: React.FC = ({ children }) => {
  const [pyodide, setPyodide] = useState<any>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    const loadPyodide = async () => {
      if (pyodideRef.current) return;
      try {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.async = true;
        
        script.onload = async () => {
          try {
            const pyodideInstance = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
            });
            
            pyodideInstance.runPython(`
              import sys
              from io import StringIO
              sys.stdout = StringIO()
            `);
            
            pyodideRef.current = pyodideInstance;
            setPyodide(pyodideInstance);
            setIsPyodideLoading(false);
          } catch (error) {
            console.error('Failed to load Pyodide:', error);
            setIsPyodideLoading(false);
          }
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load Pyodide script:', error);
        setIsPyodideLoading(false);
      }
    };

    loadPyodide();
  }, []);

  return (
    <PyodideContext.Provider value={{ pyodide, isPyodideLoading }}>
      {children}
    </PyodideContext.Provider>
  );
}; 