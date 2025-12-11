import React, { useState } from 'react';
import { FileText, Sparkles, Clipboard, Loader2 } from 'lucide-react';
import { analyzeDocumentText } from '../services/geminiService';

const DocumentAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const result = await analyzeDocumentText(text);
      setAnalysis(result);
    } catch (e) {
      setAnalysis("Error analyzing text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col h-full">
        <header className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="text-indigo-600" />
            Document Input
          </h2>
          <p className="text-slate-500 text-sm">Paste reports, emails, or policies here.</p>
        </header>
        
        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <textarea
            className="flex-1 w-full resize-none outline-none text-slate-600 text-sm font-mono p-2"
            placeholder="Paste business text here for extraction..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
             <button 
                onClick={() => setText('Revenue increased by 20% due to new AI implementation in logistics. However, employee onboarding time has increased by 5 days due to complex new software. We recommend streamlining the training module.')}
                className="text-xs text-indigo-600 font-medium hover:underline"
             >
                Insert Sample Text
             </button>
             <button
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              Analyze Document
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full">
        <header className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Clipboard className="text-emerald-600" />
            Insights & Action Items
          </h2>
          <p className="text-slate-500 text-sm">AI-generated executive summary.</p>
        </header>

        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-y-auto">
          {analysis ? (
             <div className="prose prose-sm prose-slate max-w-none">
               {analysis.split('\n').map((line, i) => (
                 <p key={i} className={`mb-2 ${line.startsWith('**') ? 'font-bold text-slate-800 mt-4' : ''} ${line.startsWith('-') ? 'pl-4' : ''}`}>
                   {line.replace(/\*\*/g, '')}
                 </p>
               ))}
             </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <FileText className="w-12 h-12 mb-2 opacity-20" />
              <p className="text-sm">Analysis will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;