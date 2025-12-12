import React, { useState, useEffect, useRef } from 'react';
import { LESSONS, KANA_CHART_DATA } from './data';
import { Lesson, ViewState, Word, UserProgress } from './types';
import { Button, Card, Header, TabBar } from './components/UI';
import { sendChatMessage, generateIllustration, generateExplanation, analyzeSelection } from './services/geminiService';
import { GenerateContentResponse } from '@google/genai';
import ReactMarkdown from 'react-markdown';

// --- Utility: Simple Hepburn Romaji Converter ---
const toRomaji = (kana: string): string => {
  const map: Record<string, string> = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'o', 'ん': 'n',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
    'っ': '(double consonant)'
  };
  
  let res = '';
  for (let i = 0; i < kana.length; i++) {
    const c = kana[i];
    const next = kana[i+1];
    const combo = c + (next || '');
    if (map[combo]) {
      res += map[combo];
      i++;
    } else if (c === 'っ' && next) {
      const nextRomaji = map[next] || map[next + (kana[i+2]||'')] || '';
      if(nextRomaji) res += nextRomaji[0];
    } else {
      res += map[c] || c;
    }
  }
  return res;
};

// --- Utility: Verb Conjugation Engine ---
const getVerbConjugations = (word: Word): { name: string; form: string }[] => {
  if (!word.kana || !word.group) return [];
  const k = word.kana;
  const g = word.group;
  const forms: { name: string; form: string }[] = [];

  // 1. Basic / Dictionary
  forms.push({ name: '基本形 (辞書形)', form: k });

  if (g === 3) {
     // Group 3 Irregular
     if (k === 'する' || k.endsWith('する')) { 
       const stem = k.slice(0, -2);
       forms.push({ name: 'ます形 (丁寧)', form: stem + 'します' });
       forms.push({ name: 'ない形 (否定)', form: stem + 'しない' });
       forms.push({ name: 'て形 (接続)', form: stem + 'して' });
       forms.push({ name: 'た形 (过去)', form: stem + 'した' });
       forms.push({ name: '可能形', form: stem + 'できる' });
       forms.push({ name: '意向形 (意志)', form: stem + 'しよう' });
       forms.push({ name: '命令形', form: stem + 'しろ' });
       forms.push({ name: '假定形 (条件)', form: stem + 'すれば' });
       forms.push({ name: '受身形 (被动)', form: stem + 'される' });
       forms.push({ name: '使役形', form: stem + 'させる' });
     } else if (k === 'くる') {
       forms.push({ name: 'ます形', form: 'きます' });
       forms.push({ name: 'ない形', form: 'こない' });
       forms.push({ name: 'て形', form: 'きて' });
       forms.push({ name: 'た形', form: 'きた' });
       forms.push({ name: '可能形', form: 'こられる' });
       forms.push({ name: '意向形', form: 'こよう' });
       forms.push({ name: '命令形', form: 'こい' });
       forms.push({ name: '假定形', form: 'くれば' });
       forms.push({ name: '受身形', form: 'こられる' });
       forms.push({ name: '使役形', form: 'こさせる' });
     }
  } else if (g === 2) {
    // Group 2 Ichidan (drop ru)
    const stem = k.slice(0, -1);
    forms.push({ name: 'ます形', form: stem + 'ます' });
    forms.push({ name: 'ない形', form: stem + 'ない' });
    forms.push({ name: 'て形', form: stem + 'て' });
    forms.push({ name: 'た形', form: stem + 'た' });
    forms.push({ name: '可能形', form: stem + 'られる' });
    forms.push({ name: '意向形', form: stem + 'よう' });
    forms.push({ name: '命令形', form: stem + 'ろ' });
    forms.push({ name: '假定形', form: stem + 'れば' });
    forms.push({ name: '受身形', form: stem + 'られる' });
    forms.push({ name: '使役形', form: stem + 'させる' });
  } else if (g === 1) {
    // Group 1 Godan
    const last = k.slice(-1);
    const stem = k.slice(0, -1);
    
    // Masu (u -> i)
    const uToI: Record<string, string> = { 'う':'い', 'く':'き', 'ぐ':'ぎ', 'す':'し', 'つ':'ち', 'ぬ':'に', 'ぶ':'び', 'む':'み', 'る':'り' };
    forms.push({ name: 'ます形', form: stem + uToI[last] + 'ます' });

    // Nai (u -> a)
    const uToA: Record<string, string> = { 'う':'わ', 'く':'か', 'ぐ':'が', 'す':'さ', 'つ':'た', 'ぬ':'な', 'ぶ':'ば', 'む':'ま', 'る':'ら' };
    forms.push({ name: 'ない形', form: stem + uToA[last] + 'ない' });

    // Te/Ta (Euphonic changes)
    let teEnd = '';
    if (['う', 'つ', 'る'].includes(last)) teEnd = 'って';
    else if (['む', 'ぶ', 'ぬ'].includes(last)) teEnd = 'んで';
    else if (last === 'く') teEnd = k === 'いく' ? 'って' : 'いて'; // Exception iku
    else if (last === 'ぐ') teEnd = 'いで';
    else if (last === 'す') teEnd = 'して';
    forms.push({ name: 'て形', form: stem + teEnd });
    forms.push({ name: 'た形', form: stem + teEnd.replace('て', 'た').replace('で', 'だ') });

    // Potential (u -> eru)
    const uToE: Record<string, string> = { 'う':'え', 'く':'け', 'ぐ':'げ', 'す':'せ', 'つ':'て', 'ぬ':'ね', 'ぶ':'べ', 'む':'め', 'る':'れ' };
    forms.push({ name: '可能形', form: stem + uToE[last] + 'る' });

    // Volitional (u -> ou)
    const uToO: Record<string, string> = { 'う':'おう', 'く':'こう', 'ぐ':'ごう', 'す':'そう', 'つ':'とう', 'ぬ':'のう', 'ぶ':'ぼう', 'む':'もう', 'る':'ろう' };
    forms.push({ name: '意向形', form: stem + uToO[last] });

    // Imperative (u -> e)
    forms.push({ name: '命令形', form: stem + uToE[last] });

    // Conditional (u -> eba)
    forms.push({ name: '假定形', form: stem + uToE[last] + 'ば' });
    
    // Passive (u -> areru)
    forms.push({ name: '受身形', form: stem + uToA[last] + 'れる' });

    // Causative (u -> aseru)
    forms.push({ name: '使役形', form: stem + uToA[last] + 'せる' });
  }

  return forms;
};

const playAudio = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }
};

// --- Selection Popover Component ---
const SelectionManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selection, setSelection] = useState<{ text: string, x: number, y: number } | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const handleSelection = () => {
      const sel = window.getSelection();
      if (sel && sel.toString().trim().length > 0) {
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelection({
          text: sel.toString().trim(),
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY - 10
        });
        setAnalysis(null);
      } else {
        setSelection(null);
        setAnalysis(null);
      }
    };
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
    };
  }, []);

  const handleAnalyze = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selection) return;
    setAnalyzing(true);
    const result = await analyzeSelection(selection.text);
    setAnalysis(result);
    setAnalyzing(false);
  };

  return (
    <>
      {children}
      {selection && (
        <div 
          className="fixed z-[100] transform -translate-x-1/2 -translate-y-full bg-anime-dark text-white rounded-lg shadow-xl p-2 max-w-xs animate-fade-in"
          style={{ left: selection.x, top: selection.y, pointerEvents: 'auto' }}
        >
          {!analysis ? (
             <button 
               onClick={handleAnalyze}
               className="flex items-center gap-2 px-3 py-1 bg-anime-pink text-black font-bold rounded-md hover:brightness-110 whitespace-nowrap"
             >
               {analyzing ? '🤔 分析中...' : '🔍 AI 分析选中内容'}
             </button>
          ) : (
            <div className="bg-white text-black p-3 rounded-md text-xs max-h-60 overflow-y-auto w-64 shadow-2xl border-2 border-gray-200">
               <div className="flex justify-between items-center mb-2 border-b pb-1">
                 <span className="font-bold text-gray-500">AI 分析结果</span>
                 <button onClick={() => setSelection(null)} className="text-lg leading-none text-gray-400 hover:text-black">&times;</button>
               </div>
               <div className="prose prose-xs">
                 <ReactMarkdown>{analysis}</ReactMarkdown>
               </div>
               <button 
                 onClick={(e) => { e.stopPropagation(); playAudio(selection.text); }}
                 className="mt-3 w-full py-2 bg-anime-blue/20 hover:bg-anime-blue/40 font-bold rounded text-center transition-colors flex items-center justify-center gap-2"
               >
                 🔊 朗读原文
               </button>
            </div>
          )}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-anime-dark"></div>
        </div>
      )}
    </>
  );
};

// --- Sub-components for specific views ---

const FlashCard: React.FC<{ word: Word, onNext: () => void, isLast: boolean }> = ({ word, onNext, isLast }) => {
  const [flipped, setFlipped] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [showConjugation, setShowConjugation] = useState(false);

  useEffect(() => {
    setFlipped(false);
    setImageUrl(null);
    setAiExplanation(null);
    setShowConjugation(false);
  }, [word]);

  const handleGenerateImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingImage(true);
    const url = await generateIllustration(word.jp);
    if (url) setImageUrl(url);
    setLoadingImage(false);
  };

  const handleExplain = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = await generateExplanation(word.jp, 'word');
    setAiExplanation(text);
  };

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    playAudio(word.jp);
  }

  const romaji = word.kana ? toRomaji(word.kana) : toRomaji(word.jp);
  const conjugations = (word.pos?.includes('动') || word.group) ? getVerbConjugations(word) : [];

  return (
    <div className="flex flex-col items-center h-full p-4 gap-6 overflow-y-auto w-full">
      <div 
        className="w-full max-w-sm perspective cursor-pointer group shrink-0"
        onClick={() => !showConjugation && setFlipped(!flipped)}
      >
        <div className={`relative w-full transition-all duration-500 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
          
          {/* --- Front Side --- */}
          <div className={`${flipped ? 'absolute top-0 left-0 opacity-0 pointer-events-none' : 'relative'} w-full backface-hidden bg-white dark:bg-gray-800 border-4 border-anime-blue rounded-3xl flex flex-col items-center p-6 shadow-pop min-h-[450px]`}>
            {/* Tone & POS Badges */}
            <div className="w-full flex justify-between items-start mb-4">
              <span className="text-xs text-gray-400 uppercase tracking-widest">Japanese</span>
              <div className="flex gap-1 flex-wrap justify-end">
                {word.tone && (
                  <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-xs rounded-md font-mono font-bold text-gray-600 dark:text-gray-300">
                    声调: {word.tone}
                  </span>
                )}
                {word.pos && (
                  <span className="px-2 py-0.5 bg-anime-purple/50 text-xs rounded-md font-bold text-purple-900 dark:text-purple-100 border border-purple-200">
                    {word.pos}
                  </span>
                )}
                {word.transitivity && (
                  <span className={`px-2 py-0.5 text-xs rounded-md font-bold border ${word.transitivity.includes('他') ? 'bg-red-100 text-red-800 border-red-200' : 'bg-green-100 text-green-800 border-green-200'}`}>
                    {word.transitivity === '自' ? '自动词' : word.transitivity === '他' ? '他动词' : '自·他'}
                  </span>
                )}
              </div>
            </div>
            
            {/* Main Word */}
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 dark:text-white text-center break-words mb-2 mt-2">{word.jp}</h2>
            
            {/* Reading */}
            <div className="flex flex-col items-center gap-1 mb-6">
              {word.kana && <p className="text-xl text-gray-600 dark:text-gray-300 font-bold">{word.kana}</p>}
              <p className="text-sm text-gray-400 font-mono tracking-wide">{romaji}</p>
              <button 
                onClick={handleAudio}
                className="mt-2 w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-anime-pink hover:text-white transition-all active:scale-90"
                title="播放发音"
              >
                🔊
              </button>
            </div>
            
            {/* Image Area */}
            <div className="w-full mb-4 flex justify-center flex-1 min-h-[160px]">
              {loadingImage ? (
                 <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300">
                   <div className="animate-spin text-2xl">⏳</div>
                 </div>
              ) : imageUrl ? (
                 <img src={imageUrl} alt="AI illustration" className="w-full h-48 object-cover rounded-xl border-2 border-black shadow-sm" />
              ) : (
                 <button 
                   onClick={handleGenerateImage}
                   className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-400 hover:border-anime-pink hover:text-anime-pink hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors flex flex-col items-center justify-center gap-2"
                 >
                   <span className="text-3xl">🖼️</span>
                   <span className="text-xs">生成写实配图 (AI)</span>
                 </button>
              )}
            </div>

            {/* Verb Conjugation Toggle */}
            {conjugations.length > 0 && (
              <button 
                 onClick={(e) => { e.stopPropagation(); setShowConjugation(true); }}
                 className="w-full py-2 mb-2 bg-anime-yellow border-2 border-black rounded-lg font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                📜 查看活用变形 (10种)
              </button>
            )}
            
            <p className="text-gray-300 text-xs mt-2">(点击卡片翻转)</p>
          </div>

          {/* --- Back Side --- */}
          <div className={`${flipped ? 'relative' : 'absolute top-0 left-0 opacity-0 pointer-events-none'} w-full rotate-y-180 bg-anime-blue dark:bg-blue-900 border-4 border-black dark:border-white rounded-3xl flex flex-col items-center p-6 shadow-pop min-h-[450px]`}>
            <span className="text-sm text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-4">Meaning</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center break-words">{word.cn}</h2>
            
            {!aiExplanation && (
              <button 
                onClick={handleExplain}
                className="mt-8 text-sm bg-white/50 px-4 py-2 rounded-full border border-black hover:bg-white transition-all font-bold"
              >
                🧠 AI 深度解析 (中文)
              </button>
            )}
            
            {aiExplanation && (
              <div className="mt-6 w-full text-left text-sm bg-white/90 p-4 rounded-xl text-black max-h-[250px] overflow-y-auto border-2 border-black/10">
                <ReactMarkdown>{aiExplanation}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Conjugation Modal / Overlay --- */}
      {showConjugation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowConjugation(false)}>
           <div className="bg-white dark:bg-gray-800 w-full max-w-md max-h-[80vh] overflow-y-auto rounded-2xl border-4 border-anime-purple shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
             <div className="flex justify-between items-center mb-4">
               <div>
                 <h3 className="text-2xl font-black dark:text-white">{word.jp}</h3>
                 <span className="text-sm text-gray-500">{word.pos} • {word.group === 1 ? '一类动词 (五段)' : word.group === 2 ? '二类动词 (一段)' : '三类动词 (不规则)'}</span>
               </div>
               <button onClick={() => setShowConjugation(false)} className="bg-gray-200 dark:bg-gray-600 w-8 h-8 rounded-full font-bold">✕</button>
             </div>
             
             <div className="grid grid-cols-1 gap-2">
               {conjugations.map((c, idx) => (
                 <div key={idx} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wide w-1/3">{c.name}</span>
                   <div className="flex items-center gap-2">
                     <span className="text-lg font-bold text-anime-dark dark:text-anime-blue">{c.form}</span>
                     <button onClick={() => playAudio(c.form)} className="text-xs opacity-50 hover:opacity-100">🔊</button>
                   </div>
                 </div>
               ))}
             </div>
             <div className="mt-4 text-center">
                <p className="text-xs text-red-400">* 变形仅供参考，基于规则生成 (AI辅助)</p>
             </div>
           </div>
        </div>
      )}

      <div className="flex gap-4 pb-20 mt-auto">
        <Button variant="secondary" onClick={() => setFlipped(!flipped)}>
          {flipped ? '看单词' : '看意思'}
        </Button>
        <Button variant="primary" onClick={onNext}>
          {isLast ? '完成' : '下一个'}
        </Button>
      </div>
    </div>
  );
};

const GrammarView: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [aiContent, setAiContent] = useState<Record<number, string>>({});
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleAiAnalyze = async (idx: number, title: string) => {
    if (aiContent[idx]) {
      setExpandedId(expandedId === idx ? null : idx);
      return;
    }
    setLoadingId(idx);
    const text = await generateExplanation(title, 'grammar');
    setAiContent(prev => ({ ...prev, [idx]: text }));
    setLoadingId(null);
    setExpandedId(idx);
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs px-4 py-2 rounded-lg text-center">
        💡 提示：长按或选中任意文字，可使用 AI 翻译和注音
      </div>

      {lesson.grammar.map((g, idx) => (
        <Card key={idx} className="bg-white dark:bg-gray-800">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <span className="bg-anime-pink text-xs font-bold px-2 py-1 rounded border border-black text-black">
                POINT {idx + 1}
              </span>
              <h3 className="font-bold text-lg dark:text-white">{g.title}</h3>
            </div>
            <button 
              onClick={() => handleAiAnalyze(idx, g.title)}
              className="text-xs flex items-center gap-1 bg-anime-purple px-2 py-1 rounded border border-black hover:bg-purple-300 transition-colors"
            >
              {loadingId === idx ? '🤖 分析中...' : '🤖 AI 详解'}
            </button>
          </div>
          
          {g.construction && (
             <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg mb-3 font-mono text-sm text-red-500 dark:text-red-300">
               {g.construction}
             </div>
          )}

          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {g.explanation}
          </p>

          <div className="space-y-2 mb-4">
            {g.examples.map((ex, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-anime-blue dark:text-blue-400 font-bold">Ex:</span>
                <span className="dark:text-gray-200">{ex}</span>
              </div>
            ))}
          </div>

          {expandedId === idx && aiContent[idx] && (
            <div className="mt-4 border-t-2 border-dashed border-gray-200 pt-4 animate-fade-in">
              <h4 className="font-bold text-anime-purple mb-2">💡 AI 助教笔记:</h4>
              <div className="prose prose-sm dark:prose-invert max-w-none text-sm bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                 <ReactMarkdown>{aiContent[idx]}</ReactMarkdown>
              </div>
            </div>
          )}
        </Card>
      ))}
      <div className="text-center text-gray-400 text-sm mt-8">
        (End of Lesson)
      </div>
    </div>
  );
};

const LessonDetail: React.FC<{ lesson: Lesson, onBack: () => void }> = ({ lesson, onBack }) => {
  const [mode, setMode] = useState<'MENU' | 'WORDS' | 'GRAMMAR'>('MENU');
  const [wordIndex, setWordIndex] = useState(0);

  if (mode === 'WORDS') {
    return (
      <div className="h-[calc(100vh-60px)] flex flex-col">
        <div className="p-4 flex justify-between items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <button onClick={() => setMode('MENU')} className="font-bold text-gray-600 dark:text-gray-300">Close</button>
          <span className="font-bold dark:text-white">{wordIndex + 1} / {lesson.words.length}</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <FlashCard 
            word={lesson.words[wordIndex]} 
            isLast={wordIndex === lesson.words.length - 1}
            onNext={() => {
              if (wordIndex < lesson.words.length - 1) {
                setWordIndex(prev => prev + 1);
              } else {
                setMode('MENU');
                setWordIndex(0);
              }
            }}
          />
        </div>
      </div>
    );
  }

  if (mode === 'GRAMMAR') {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 flex items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-14 z-40">
           <button onClick={() => setMode('MENU')} className="font-bold text-anime-pink mr-4">← Back</button>
           <h2 className="font-bold truncate dark:text-white">语法: {lesson.title}</h2>
        </div>
        <GrammarView lesson={lesson} />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 animate-fade-in pb-24">
      <div className="bg-anime-green/50 dark:bg-green-900/30 p-6 rounded-2xl border-2 border-anime-green dark:border-green-700 text-center mb-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-20 rotate-45 transform translate-x-10 -translate-y-10"></div>
        <h2 className="text-2xl font-black mb-2 dark:text-white">{lesson.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">选择学习内容</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card onClick={() => setMode('WORDS')} className="cursor-pointer group hover:bg-yellow-50 dark:hover:bg-gray-700">
          <div className="flex items-center gap-4">
            <div className="bg-anime-yellow w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 border-black group-hover:scale-110 transition-transform">
              🔤
            </div>
            <div>
              <h3 className="font-bold text-xl dark:text-white group-hover:text-anime-pink transition-colors">重点单词</h3>
              <p className="text-gray-500 text-sm">{lesson.words.length} words</p>
            </div>
          </div>
        </Card>

        <Card onClick={() => setMode('GRAMMAR')} className="cursor-pointer group hover:bg-blue-50 dark:hover:bg-gray-700">
          <div className="flex items-center gap-4">
            <div className="bg-anime-blue w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 border-black group-hover:scale-110 transition-transform">
              📘
            </div>
            <div>
              <h3 className="font-bold text-xl dark:text-white group-hover:text-anime-blue transition-colors">语法 & 句型</h3>
              <p className="text-gray-500 text-sm">{lesson.grammar.length} grammar points</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const KanaChart: React.FC = () => {
  return (
    <div className="p-4 pb-24 overflow-x-auto animate-fade-in">
      <div className="min-w-[300px]">
         <Card className="bg-white dark:bg-gray-800 mb-6 text-center">
           <h2 className="text-xl font-bold dark:text-white">五十音图 (Gojūon)</h2>
           <p className="text-sm text-gray-500 mb-2">点击发音 / Click to pronounce</p>
           <a 
             href="https://www.nhk.or.jp/lesson/zh/letters/hiragana.html" 
             target="_blank" 
             rel="noreferrer"
             className="text-xs text-anime-pink underline"
           >
             🔗 跳转至 NHK 权威发音表
           </a>
         </Card>
         <div className="grid grid-cols-5 gap-2">
           {KANA_CHART_DATA.map((row, rIdx) => (
             row.map((char, cIdx) => (
               <div key={`${rIdx}-${cIdx}`} 
                 onClick={() => char && playAudio(char.h)}
                 className={`
                 aspect-[3/4] flex flex-col items-center justify-center rounded-lg border-2 border-gray-100 dark:border-gray-700
                 transition-all active:scale-95 cursor-pointer hover:border-anime-pink
                 ${char ? 'bg-white dark:bg-gray-800 shadow-sm' : 'bg-transparent border-none pointer-events-none'}
               `}>
                 {char && (
                   <>
                     <span className="text-xl font-black text-gray-800 dark:text-white">{char.h}</span>
                     <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{char.k}</span>
                     <span className="text-xs text-gray-400 mt-1">{char.r}</span>
                   </>
                 )}
               </div>
             ))
           ))}
         </div>
      </div>
    </div>
  );
};

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: '你好！我是你的日语AI助教。关于这次期末考试的内容，有什么不懂的可以问我哦！(Ganbatte!)' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const streamResult = await sendChatMessage(userMsg, history);
      
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]); 

      for await (const chunk of streamResult) {
        const text = (chunk as GenerateContentResponse).text;
        if (text) {
           fullResponse += text;
           setMessages(prev => {
             const newArr = [...prev];
             newArr[newArr.length - 1].text = fullResponse;
             return newArr;
           });
        }
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error connecting to the AI service. Please check your API key." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
              ${m.role === 'user' 
                ? 'bg-anime-blue text-black rounded-br-none border-2 border-black shadow-pop-sm' 
                : 'bg-white dark:bg-gray-700 dark:text-white rounded-bl-none border-2 border-gray-200 dark:border-gray-600'}
            `}>
              <ReactMarkdown>{m.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && <div className="text-center text-gray-400 text-xs animate-pulse">AI is typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2 pb-24 lg:pb-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="输入问题..."
          className="flex-1 bg-gray-100 dark:bg-gray-900 border-2 border-transparent focus:border-anime-pink rounded-xl px-4 py-2 outline-none dark:text-white transition-colors"
        />
        <Button size="sm" onClick={handleSend} disabled={isLoading}>发送</Button>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'HOME' | 'AI_TUTOR' | 'KANA'>('HOME');
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);
  
  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('japaneseApp_theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    
    const savedLesson = localStorage.getItem('japaneseApp_lastLesson');
    if (savedLesson) {
       // Optional: Could prompt to restore, currently just ready to use
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('japaneseApp_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('japaneseApp_theme', 'light');
    }
  };

  const handleLessonSelect = (id: number) => {
    setSelectedLessonId(id);
    localStorage.setItem('japaneseApp_lastLesson', id.toString());
  };

  // Render View Logic
  const renderContent = () => {
    if (activeTab === 'KANA') {
      return <KanaChart />;
    }
    
    if (activeTab === 'AI_TUTOR') {
      return <AIChat />;
    }

    if (selectedLessonId !== null) {
      const lesson = LESSONS.find(l => l.id === selectedLessonId);
      if (lesson) {
        return <LessonDetail lesson={lesson} onBack={() => setSelectedLessonId(null)} />;
      }
    }

    // Default Home View (Lesson List)
    return (
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-24 animate-fade-in">
        <div className="col-span-1 sm:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-black shadow-pop mb-4 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-anime-yellow rounded-full blur-xl opacity-50 pointer-events-none"></div>
          <h2 className="text-2xl font-black mb-2 dark:text-white">欢迎回来, 陈真同学!</h2>
          <p className="text-gray-600 dark:text-gray-300">期末考试加油！今天想复习哪里？</p>
        </div>
        
        {LESSONS.map((lesson) => (
          <Card 
            key={lesson.id} 
            onClick={() => handleLessonSelect(lesson.id)}
            className="cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="bg-anime-purple text-xs font-bold px-2 py-0.5 rounded text-black border border-black/20">
                Lesson {lesson.id}
              </span>
              <span className="text-xs text-gray-400 group-hover:text-anime-pink transition-colors">Start →</span>
            </div>
            <h3 className="font-bold text-lg leading-tight dark:text-white">{lesson.title}</h3>
            <div className="mt-4 flex gap-2">
              <span className="text-xs bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-md">{lesson.words.length} 单词</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-md">{lesson.grammar.length} 语法</span>
            </div>
          </Card>
        ))}

        <div className="col-span-1 sm:col-span-2 text-center text-xs text-gray-400 mt-8">
          Producer: Chen Zhen &bull; University Japanese II Exam Prep
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-white transition-colors duration-300 selection:bg-anime-pink selection:text-white">
       <Header 
         title={activeTab === 'HOME' ? (selectedLessonId ? "学习模式" : "课程列表") : (activeTab === 'KANA' ? "五十音" : "AI 助教")} 
         onBack={selectedLessonId && activeTab === 'HOME' ? () => setSelectedLessonId(null) : undefined}
         toggleTheme={toggleTheme}
         isDark={isDark}
       />
       
       <SelectionManager>
         <main className="max-w-3xl mx-auto">
           {renderContent()}
         </main>
       </SelectionManager>

       <TabBar activeTab={activeTab} setTab={(t) => {
         setActiveTab(t);
         if (t !== 'HOME') setSelectedLessonId(null);
       }} />
    </div>
  );
};

export default App;