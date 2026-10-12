/* Conservative OCR query cleanup; raw diagnostics remain untouched. */
(()=>{
window.vinylOCRLines=text=>String(text||'').split(/\r?\n|[■▪●]/).map(s=>s.replace(/^\s*(?:side\s*(?:one|two|[ab12])\s*[:.-]?|[ab]?\d{1,2}[.)]\s*)/i,'').replace(/^(?:\s*[B-HJ-Z]\s+)+/,'').replace(/\s+\d{1,2}:\d{2}\s*$/,'').replace(/\s+/g,' ').trim()).filter(s=>{if(s.length<5||s.length>90||/(copyright|produced|published|manufactured|distributed|reserved|engineer|\brpm\b)/i.test(s))return false;const words=s.match(/[A-Za-zÀ-ž]+|\d+/g)||[];return words.length>=2&&words.some(w=>/^[A-Za-zÀ-ž]{5,}$/.test(w))&&words.filter(w=>w.length>=3||/^(?:I|A|\d{1,2})$/.test(w)).length/words.length>=.7});
window.vinylOCRQuery=text=>{const lines=window.vinylOCRLines(text);return lines.find(s=>/\b\d{1,2}\b/.test(s)&&!/^\d|\d{3}/.test(s))||lines[0]||''};
const before=buildQueries;buildQueries=text=>{const cats=before(text).filter(p=>p.catno),query=window.vinylOCRQuery(text);return [...cats,...(query?[{q:query}]:[])].slice(0,5)};
const css=document.createElement('style');css.textContent='#mgo{overflow:hidden;padding:4px 10px;gap:8px;min-height:44px;min-width:124px}#mgo img{width:33.6px!important;height:33.6px!important;object-fit:contain;flex:none;max-width:100%}';document.head.append(css);
})();
