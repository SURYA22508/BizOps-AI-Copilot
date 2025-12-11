import React, { useState } from 'react';
import { Target, ArrowRight, CheckCircle2, DollarSign, Layers, Loader2 } from 'lucide-react';
import { generateStrategyPlan } from '../services/geminiService';
import { StrategyPlan } from '../types';

const StrategyBuilder: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [plan, setPlan] = useState<StrategyPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    setError(null);
    setPlan(null);
    try {
      const result = await generateStrategyPlan(goal);
      setPlan(result);
    } catch (e) {
      setError("Failed to generate strategy. Please verify your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-8">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Target className="text-indigo-600" />
          Strategy Builder
        </h2>
        <p className="text-slate-500 mt-1">Define a high-level business goal, and AI will structure an implementation plan.</p>
      </header>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-4xl mx-auto mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Business Objective</label>
        <div className="flex gap-4">
          <input 
            type="text" 
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Increase market share in the APAC region by 15% within Q3"
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
          <button 
            onClick={handleGenerate}
            disabled={loading || !goal.trim()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            Generate Plan
          </button>
        </div>
      </div>

      {error && (
        <div className="max-w-4xl mx-auto p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-8">
          {error}
        </div>
      )}

      {plan && (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{plan.executiveSummary}</p>
            </div>
            
            <div className="p-6 border-b border-slate-100 flex items-center gap-2 text-emerald-700 bg-emerald-50/50">
              <DollarSign className="w-5 h-5" />
              <span className="font-semibold">Projected ROI:</span>
              <span>{plan.roiEstimate}</span>
            </div>

            <div className="p-6">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Implementation Roadmap
              </h4>
              <div className="space-y-4">
                {plan.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-slate-800">{step.phase}</span>
                        <span className="text-xs font-semibold bg-slate-200 text-slate-600 px-2 py-1 rounded">
                          Owner: {step.owner}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-2">{step.action}</p>
                      <p className="text-sm text-indigo-600 font-medium">Impact: {step.estimatedImpact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyBuilder;