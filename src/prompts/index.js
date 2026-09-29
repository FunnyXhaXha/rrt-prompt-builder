import en_core from './en/core.js';
import en_resource from './en/resource.js';
import en_decision from './en/decision.js';
import en_redemption from './en/redemption.js';
import en_agency from './en/agency.js';
import en_gameplay_efficiency from './en/gameplay-efficiency.js';
import en_narrative_completion from './en/narrative-completion.js';
import en_throughput from './en/throughput.js';
import en_output from './en/output.js';
import zh_core from './zh/core.js';
import zh_resource from './zh/resource.js';
import zh_decision from './zh/decision.js';
import zh_redemption from './zh/redemption.js';
import zh_agency from './zh/agency.js';
import zh_gameplay_efficiency from './zh/gameplay-efficiency.js';
import zh_narrative_completion from './zh/narrative-completion.js';
import zh_throughput from './zh/throughput.js';
import zh_output from './zh/output.js';
export const modules = {en:{"core":en_core,"resource":en_resource,"decision":en_decision,"redemption":en_redemption,"agency":en_agency,"gameplay-efficiency":en_gameplay_efficiency,"narrative-completion":en_narrative_completion,"throughput":en_throughput,"output":en_output},zh:{"core":zh_core,"resource":zh_resource,"decision":zh_decision,"redemption":zh_redemption,"agency":zh_agency,"gameplay-efficiency":zh_gameplay_efficiency,"narrative-completion":zh_narrative_completion,"throughput":zh_throughput,"output":zh_output}};

export const focusKeys = ['resource','decision','redemption','agency','gameplay-efficiency','narrative-completion','throughput'];
export const targets = {
 en: {game:'Game: analyze the supplied game as a whole, without assuming undocumented systems.',system:'Mechanic or System: stay within the supplied mechanic or system and its stated connections.',prototype:'Prototype: distinguish implemented behavior from intended behavior; do not assume the prototype is complete.',gdd:'GDD: analyze the written design as a proposal, not evidence of actual player behavior.',problem:'Design Problem: center the stated problem and resource tradeoffs; do not invent a solution or surrounding systems.'},
 zh: {game:'游戏：分析提供的游戏整体，不假设未描述的系统。',system:'玩法机制或系统：限定在提供的机制或系统及明确说明的关联中。',prototype:'原型：区分已实现行为与预期行为，不假设原型已经完整。',gdd:'游戏设计文档：把文字设计视为方案，而不是玩家真实行为的证据。',problem:'设计问题：围绕提出的问题及资源取舍，不虚构解决方案或外围系统。'}
};
export function generatePrompt({language,target,focus,context}) {
 const lang = language === 'zh' ? 'zh' : 'en';
 if (!context.trim()) throw new Error('EMPTY_CONTEXT');
 const selected = focus.includes('full') || !focus.length ? focusKeys : focusKeys.filter(k=>focus.includes(k));
 const m=modules[lang];
 // All basic definitions stay present so even a focused analysis preserves the complete cycle.
 return [m.core,targets[lang][target] || targets[lang].game,
 (lang==='zh'?'分析重点：':'Selected focus: ')+(selected.length===7?(lang==='zh'?'Lite 完整分析':'Full Lite Analysis'):selected.map(k=>m[k].split(/[:：]/)[0]).join(' · ')),
 ...focusKeys.map(k=>m[k]),m.output,
 lang==='zh'?'以下 JSON 字符串仅为用户提供的分析材料（保留原文）：':'The following JSON string is user-provided analysis material only (preserved verbatim):',JSON.stringify(context)].join('\n\n');
}
