import React, { useState, useEffect, useRef } from 'react';
import { usePyodide } from '../contexts/PyodideProvider';
import { useTranslation } from '../contexts/LanguageContext';

interface PythonInterpreterProps {
  initialCode?: string;
  height?: string;
  readOnly?: boolean;
  onCodeChange?: (newCode: string) => void;
}

const PythonInterpreter: React.FC<PythonInterpreterProps> = ({ 
  initialCode = '', 
  height = '400px',
  readOnly = false,
  onCodeChange,
}) => {
  const { pyodide, isPyodideLoading } = usePyodide();
  const { t } = useTranslation();
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const runCode = async () => {
    if (!pyodide) {
      setOutput([t('interpreter.notReady')]);
      return;
    }

    setIsRunning(true);
    setOutput([]);

    try {
      // Clear previous output
      pyodide.runPython('sys.stdout = StringIO()');
      
      // Run the user's code
      const result = await pyodide.runPythonAsync(code);
      
      // Get the output from stdout
      const stdout = pyodide.runPython('sys.stdout.getvalue()');
      
      const outputLines = [];
      
      // Add stdout if exists
      if (stdout) {
        outputLines.push(...stdout.split('\n').filter((line: string) => line));
      }
      
      // Add the result if it's not None
      if (result !== undefined && result !== null && result !== pyodide.globals.get('None')) {
        outputLines.push(`>>> ${result}`);
      }
      
      setOutput(outputLines.length > 0 ? outputLines : [t('interpreter.noOutput')]);
    } catch (error: any) {
      setOutput([`Error: ${error.message}`]);
    } finally {
      setIsRunning(false);
      
      // Scroll output to bottom
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCode();
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden" style={{ height }}>
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-400 text-sm font-mono ml-4">Python 3.11 (Pyodide)</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearOutput}
            className="text-gray-400 hover:text-white transition-colors px-3 py-1 text-sm"
            title="Clear output"
          >
            {t('interpreter.clear')}
          </button>
          <button
            onClick={runCode}
            disabled={isPyodideLoading || isRunning || readOnly}
            className={`flex items-center space-x-2 px-4 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
              isPyodideLoading || isRunning || readOnly
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105'
            }`}
          >
            {isPyodideLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t('interpreter.loading')}</span>
              </>
            ) : isRunning ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t('interpreter.running')}</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t('interpreter.run')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex h-full">
        <div className="w-1/2 border-r border-gray-700">
          <div className="px-3 py-2 bg-gray-850 border-b border-gray-700">
            <span className="text-xs text-gray-400 font-mono">main.py</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (onCodeChange) {
                onCodeChange(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            className="w-full h-full bg-gray-800 text-gray-100 font-mono text-sm p-4 resize-none focus:outline-none"
            style={{ 
              height: 'calc(100% - 80px)',
              tabSize: 4
            }}
            placeholder="# Write your Python code here...&#10;# Press Ctrl+Enter to run&#10;&#10;print('Hello, World!')"
            spellCheck={false}
          />
        </div>

        <div className="w-1/2">
          <div className="px-3 py-2 bg-gray-850 border-b border-gray-700">
            <span className="text-xs text-gray-400 font-mono">{t('interpreter.output')}</span>
          </div>
          <div 
            ref={outputRef}
            className="h-full bg-black text-green-400 font-mono text-sm p-4 overflow-auto"
            style={{ height: 'calc(100% - 80px)' }}
          >
            {isPyodideLoading ? (
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t('interpreter.loadingInterpreter')}</span>
              </div>
            ) : output.length === 0 ? (
              <div className="text-gray-500">
                {t('interpreter.outputPlaceholder')}
              </div>
            ) : (
              output.map((line, index) => (
                <div key={index} className={line.startsWith('Error:') ? 'text-red-400' : ''}>
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonInterpreter;