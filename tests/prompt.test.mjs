import test from 'node:test';
import assert from 'node:assert/strict';
import { generatePrompt, focusKeys, targets } from '../src/prompts/index.js';
test('every language, target and focus retains evidence and the full cycle',()=>{for(const language of ['en','zh'])for(const target of Object.keys(targets[language]))for(const f of ['full',...focusKeys]){const context='A shop: spend 2 coins to earn trust.\n<script>example</script>';const p=generatePrompt({language,target,focus:[f],context});assert.ok(p.includes(JSON.stringify(context)));assert.ok(p.includes('ₜ₊₁'));assert.ok(p.includes('9.'));assert.ok(p.includes(targets[language][target]));assert.ok(p.includes(language==='en'?'what is known from what is inferred':'已知信息'));}});
test('empty material rejected',()=>assert.throws(()=>generatePrompt({language:'en',target:'game',focus:['full'],context:'  '})));
test('focus changes emphasis',()=>{const base={language:'en',target:'game',context:'Spend time or money.'};assert.match(generatePrompt({...base,focus:['agency']}),/Selected focus: Agency/);assert.match(generatePrompt({...base,focus:['full']}),/Selected focus: Full Lite Analysis/);});
