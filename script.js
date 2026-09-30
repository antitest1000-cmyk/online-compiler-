/* ═══════════════════════════════════════════════════════════════
   KIDAN COMPILER — script.js
   Frontend-only AI-powered Multi-Language IDE
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════════════════════════════════════
   § LANGUAGES
════════════════════════════════════════════════════════════════ */
const LANGUAGES = {
  c:          { name: "C",          ext: ".c",     type: "compiled",    cmdRun: "./main", cmdComp: "gcc main.c -o main", starter: `#include <stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}` },
  cpp:        { name: "C++",        ext: ".cpp",   type: "compiled",    cmdRun: "./main", cmdComp: "g++ main.cpp -o main", starter: `#include <iostream>\n\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}` },
  cs:         { name: "C#",         ext: ".cs",    type: "runtime",     cmdRun: "dotnet run", cmdComp: "dotnet build", starter: `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello World");\n    }\n}` },
  java:       { name: "Java",       ext: ".java",  type: "compiled",    cmdRun: "java Main", cmdComp: "javac Main.java", starter: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}` },
  python:     { name: "Python",     ext: ".py",    type: "interpreted", cmdRun: "python main.py", starter: `print("Hello World")` },
  javascript: { name: "JavaScript", ext: ".js",    type: "browser",     cmdRun: "node main.js", starter: `console.log("Hello World");` },
  typescript: { name: "TypeScript", ext: ".ts",    type: "runtime",     cmdRun: "ts-node main.ts", starter: `const message: string = "Hello World";\nconsole.log(message);` },
  html:       { name: "HTML",       ext: ".html",  type: "browser",     starter: `<!DOCTYPE html>\n<html>\n<head>\n    <title>Kidan</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>` },
  css:        { name: "CSS",        ext: ".css",   type: "browser",     starter: `body {\n    font-family: Arial;\n}\n\nh1 {\n    color: blue;\n}` },
  php:        { name: "PHP",        ext: ".php",   type: "interpreted", cmdRun: "php main.php", starter: `<?php\necho "Hello World";\n?>` },
  sql:        { name: "SQL",        ext: ".sql",   type: "query",       cmdRun: "Execute SQL", starter: `SELECT 'Hello World' AS message;` },
  go:         { name: "Go",         ext: ".go",    type: "compiled",    cmdRun: "./main", cmdComp: "go build -o main", starter: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello World")\n}` },
  rust:       { name: "Rust",       ext: ".rs",    type: "compiled",    cmdRun: "./main", cmdComp: "rustc main.rs", starter: `fn main() {\n    println!("Hello World");\n}` },
  ruby:       { name: "Ruby",       ext: ".rb",    type: "interpreted", cmdRun: "ruby main.rb", starter: `puts "Hello World"` },
  kotlin:     { name: "Kotlin",     ext: ".kt",    type: "compiled",    cmdRun: "java -jar main.jar", cmdComp: "kotlinc Main.kt -include-runtime -d main.jar", starter: `fun main() {\n    println("Hello World")\n}` },
  swift:      { name: "Swift",      ext: ".swift", type: "compiled",    cmdRun: "./main", cmdComp: "swiftc main.swift -o main", starter: `print("Hello World")` },
  dart:       { name: "Dart",       ext: ".dart",  type: "runtime",     cmdRun: "dart run main.dart", starter: `void main() {\n    print("Hello World");\n}` },
  bash:       { name: "Bash",       ext: ".sh",    type: "interpreted", cmdRun: "bash main.sh", starter: `#!/bin/bash\necho "Hello World"` },
  r:          { name: "R",          ext: ".R",     type: "interpreted", cmdRun: "Rscript main.R", starter: `print("Hello World")` },
  lua:        { name: "Lua",        ext: ".lua",   type: "interpreted", cmdRun: "lua main.lua", starter: `print("Hello World")` },
  perl:       { name: "Perl",       ext: ".pl",    type: "interpreted", cmdRun: "perl main.pl", starter: `print "Hello World\\n";` },
  scala:      { name: "Scala",      ext: ".scala", type: "compiled",    cmdRun: "scala Main", cmdComp: "scalac Main.scala", starter: `object Main {\n    def main(args: Array[String]): Unit = {\n        println("Hello World")\n    }\n}` },
  objectivec: { name: "Objective-C",ext: ".m",     type: "compiled",    cmdRun: "./main", cmdComp: "gcc -framework Foundation main.m -o main", starter: `#import <Foundation/Foundation.h>\n\nint main(int argc, const char * argv[]) {\n    @autoreleasepool {\n        NSLog(@"Hello World");\n    }\n    return 0;\n}` },
  assembly:   { name: "Assembly",   ext: ".asm",   type: "compiled",    cmdRun: "./main", cmdComp: "nasm -f elf64 main.asm && ld main.o -o main", starter: `section .data\n    msg db 'Hello World', 0Ah\n\nsection .text\n    global _start\n\n_start:\n    mov eax, 4\n    mov ebx, 1\n    mov ecx, msg\n    mov edx, 12\n    int 80h\n\n    mov eax, 1\n    xor ebx, ebx\n    int 80h` },
  matlab:     { name: "MATLAB",     ext: ".m",     type: "runtime",     cmdRun: "main", starter: `disp('Hello World')` },
  json:       { name: "JSON",       ext: ".json",  type: "data",        cmdRun: "Parse JSON", starter: `{\n    "message": "Hello World"\n}` },
  xml:        { name: "XML",        ext: ".xml",   type: "data",        cmdRun: "Parse XML", starter: `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n    <message>Hello World</message>\n</root>` },
  yaml:       { name: "YAML",       ext: ".yaml",  type: "data",        cmdRun: "Parse YAML", starter: `message: Hello World` },
  aspnet:     { name: "ASP.NET",    ext: ".cs",    type: "framework",   cmdRun: "dotnet run", starter: `using Microsoft.AspNetCore.Builder;\nvar builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\napp.MapGet("/", () => "Hello World!");\napp.Run();` },
  vbnet:      { name: "VB.NET",     ext: ".vb",    type: "runtime",     cmdRun: "dotnet run", cmdComp: "dotnet build", starter: `Imports System\n\nModule Program\n    Sub Main()\n        Console.WriteLine("Hello World")\n    End Sub\nEnd Module` },
};

/* ════════════════════════════════════════════════════════════════
   § CONFIG
════════════════════════════════════════════════════════════════ */
const CONFIG = {
  GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
  DEFAULT_MODEL: 'openai/gpt-oss-120b',
  DEFAULT_THEME: 'dark',

  STORAGE_KEYS: {
    CODE:    'kidan_code_lang_', // appended with language
    STDIN:   'kidan_stdin',
    API_KEY: 'kidan_api_key',
    MODEL:   'kidan_model',
    THEME:   'kidan_theme',
    LANG:    'kidan_lang',
  },

  getSystemPrompt(langKey) {
    const lang = LANGUAGES[langKey];
    return `You are a deterministic AI compiler and runtime simulator for ${lang.name}.

Analyze the provided ${lang.name} program as if it were executed normally in its native environment.
You must NOT invent behavior.

Determine if there are syntax/compilation errors. If so, return standard error diagnostics in stderr.
If compilation/execution succeeds, determine the program's output based on the provided stdin.
If the program crashes, report a runtime error.

Return ONLY valid JSON using this exact schema:
{
  "status": "success" | "compile_error" | "runtime_error",
  "language": "${langKey}",
  "execution_type": "${lang.type}",
  "commands": ["${lang.cmdComp || ''}", "${lang.cmdRun || ''}"],
  "stdout": "program output",
  "stderr": "compiler or runtime errors",
  "preview": "rendered html/css for browser types",
  "exit_code": 0
}

For HTML, CSS, JavaScript and ASP.NET (browser/framework types), put the rendered output into the "preview" field.
The "commands" array should only include actual commands run (remove empty strings).
Do not wrap the JSON in markdown. Do not add \`\`\`. Be deterministic. Do not modify the user's program.`;
  },

  getDebugPrompt(langKey) {
    const lang = LANGUAGES[langKey];
    return `You are a senior ${lang.name} developer and static analysis expert.

Analyze the provided ${lang.name} code deeply and return a structured JSON object describing:
1. Syntax/Compilation issues
2. Potential runtime issues or memory bugs
3. Logic bugs (infinite loops, off-by-one errors)
4. Code quality observations
5. A brief description of what the program does

Return ONLY valid JSON:
{
  "summary": "brief description of what the program does",
  "issues": [
    {
      "severity": "error" | "warning" | "info",
      "category": "compile" | "runtime" | "logic" | "quality",
      "message": "human-readable description",
      "line": 5
    }
  ],
  "verdict": "ok" | "has_errors" | "has_warnings"
}

Do not wrap in markdown. Do not add \`\`\`. Be thorough but concise.`;
  }
};

/* ════════════════════════════════════════════════════════════════
   § STATE
════════════════════════════════════════════════════════════════ */
const STATE = {
  apiKey:       '',
  model:        CONFIG.DEFAULT_MODEL,
  theme:        CONFIG.DEFAULT_THEME,
  lang:         'c',
  isRunning:    false,
  isDebugging:  false,
  abortCtrl:    null,
  currentLine:  1,
  currentCol:   1,
  activeTab:    'input',
  fontSize:     13,
};

/* ════════════════════════════════════════════════════════════════
   § DOM ELEMENTS
════════════════════════════════════════════════════════════════ */
const DOM = {};

function cacheDOM() {
  const ids = [
    'toolbar', 'btn-new', 'btn-run', 'btn-debug', 'btn-stop',
    'btn-save', 'btn-beautify', 'btn-theme', 'btn-settings',
    'lang-select', 'theme-icon-dark', 'theme-icon-light',
    'run-spinner', 'cursor-pos', 'ai-indicator',
    'editor-body', 'line-numbers', 'editor-content',
    'highlight-layer', 'code-textarea', 'file-tab-name',
    'resize-handle', 'bottom-panel', 'editor-panel',
    'tab-input', 'tab-terminal', 'tab-preview', 'tab-debug',
    'panel-input', 'panel-terminal', 'panel-preview', 'panel-debug',
    'preview-iframe', 'preview-placeholder',
    'terminal-actions', 'terminal-body', 'debug-body',
    'stdin-area', 'stdin-interactive', 'stdin-text-mode',
    'btn-clear-terminal', 'btn-copy-terminal', 'btn-download-output',
    'modal-new', 'modal-new-cancel', 'modal-new-confirm',
    'modal-settings', 'modal-settings-close', 'modal-settings-save',
    'settings-apikey', 'settings-model',
    'btn-save-apikey', 'btn-clear-apikey', 'btn-toggle-apikey',
    'btn-save-apikey', 'btn-clear-apikey', 'btn-toggle-apikey',
    'apikey-status', 'theme-dark', 'theme-light',
    'toast-container', 'workspace', 'resize-handle-v', 'sidebar-left',
  ];
  ids.forEach(id => {
    const key = id.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
                   .replace(/^btn/, 'btn')
                   .replace(/^modal/, 'modal');
    DOM[id] = document.getElementById(id);
  });
  
  // Custom specific elements not cleanly ID mapped above
  DOM['file-tab-name'] = document.querySelector('.file-tab.active').lastChild;
}

/* ════════════════════════════════════════════════════════════════
   § STORAGE
════════════════════════════════════════════════════════════════ */
const Storage = {
  get(key, fallback = '') {
    try { return localStorage.getItem(key) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* ignore */ }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  },
  loadAll() {
    STATE.apiKey = Storage.get(CONFIG.STORAGE_KEYS.API_KEY, '');
    STATE.model  = Storage.get(CONFIG.STORAGE_KEYS.MODEL,   CONFIG.DEFAULT_MODEL);
    STATE.theme  = Storage.get(CONFIG.STORAGE_KEYS.THEME,   CONFIG.DEFAULT_THEME);
    STATE.lang   = Storage.get(CONFIG.STORAGE_KEYS.LANG,    'c');
    
    // Ensure lang is valid
    if (!LANGUAGES[STATE.lang]) STATE.lang = 'c';
    
    const code = Storage.get(CONFIG.STORAGE_KEYS.CODE + STATE.lang, LANGUAGES[STATE.lang].starter);
    const stdin  = Storage.get(CONFIG.STORAGE_KEYS.STDIN,   '');
    return { code, stdin };
  },
  saveCode(code) {
    Storage.set(CONFIG.STORAGE_KEYS.CODE + STATE.lang, code);
  },
  saveStdin(stdin) {
    Storage.set(CONFIG.STORAGE_KEYS.STDIN, stdin);
  },
};

/* ════════════════════════════════════════════════════════════════
   § TOAST NOTIFICATIONS
════════════════════════════════════════════════════════════════ */
function showToast(message, type = 'info', duration = 3000) {
  const icons = { success: '✓', error: '✗', warn: '⚠', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span style="font-size:14px">${icons[type] || 'ℹ'}</span><span>${escapeHtml(message)}</span>`;
  DOM['toast-container'].appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove());
  }, duration);
}

/* ════════════════════════════════════════════════════════════════
   § EDITOR — Syntax Highlighting
════════════════════════════════════════════════════════════════ */
const KEYWORDS = new Set([
  'int','char','float','double','void','return','if','else','for','while','do',
  'switch','case','break','continue','struct','typedef','const','static','class',
  'sizeof','unsigned','signed','long','short','enum','union','extern','public',
  'private','protected','interface','implements','extends','import','from','export',
  'var','let','const','function','async','await','try','catch','finally','throw',
  'new','delete','typeof','instanceof','yield','def','lambda','pass','elif',
  'using','namespace','template','typename','virtual','override','goto','default',
  'NULL','true','false','True','False','None','nil','null','fn','mut','impl',
  'match','loop','struct','trait','where','type','val','var','object','trait'
]);

const C_FUNCTIONS = new Set([
  'printf','scanf','puts','gets','getchar','putchar','fgets','fputs',
  'strlen','strcpy','strncpy','strcmp','strncmp','strcat','strncat',
  'malloc','calloc','realloc','free','memcpy','memmove','memset','memcmp',
  'fopen','fclose','fread','fwrite','fprintf','fscanf','fseek','ftell',
  'exit','abort','system','atoi','atof','atol','itoa','sprintf','sscanf',
  'console','log','error','warn','info','print','println','cout','cin','cerr'
]);

function tokenizeLine(line) {
  let result = '';
  const trimmed = line.trimStart();

  if (trimmed.startsWith('#')) {
    const match = line.match(/^(\s*)(#\w+)(.*)/s);
    if (match) {
      result = escapeHtml(match[1]) +
        `<span class="hl-preproc">${escapeHtml(match[2])}</span>` +
        tokenizeInlineContent(match[3]);
      return result;
    }
  }
  
  if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<?php') || trimmed.startsWith('?>')) {
      return `<span class="hl-preproc">${escapeHtml(line)}</span>`;
  }
  
  return tokenizeInlineContent(line);
}

function tokenizeInlineContent(src) {
  let i = 0;
  let result = '';

  while (i < src.length) {
    if ((src[i] === '/' && src[i+1] === '/') || (src[i] === '#' && STATE.lang === 'python')) {
      result += `<span class="hl-comment">${escapeHtml(src.slice(i))}</span>`;
      break;
    }
    if (src[i] === '<' && src[i+1] === '!' && src[i+2] === '-' && src[i+3] === '-') {
      result += `<span class="hl-comment">${escapeHtml(src.slice(i))}</span>`;
      break;
    }
    if (src[i] === '/' && src[i+1] === '*') {
      const end = src.indexOf('*/', i + 2);
      if (end === -1) {
        result += `<span class="hl-comment">${escapeHtml(src.slice(i))}</span>`;
        break;
      } else {
        result += `<span class="hl-comment">${escapeHtml(src.slice(i, end + 2))}</span>`;
        i = end + 2;
        continue;
      }
    }
    
    // HTML Tags loosely
    if (src[i] === '<' && /[a-zA-Z\/]/.test(src[i+1])) {
       let j = i + 1;
       while(j < src.length && src[j] !== '>') j++;
       if(src[j] === '>') j++;
       result += `<span class="hl-keyword">${escapeHtml(src.slice(i, j))}</span>`;
       i = j;
       continue;
    }

    if (src[i] === '"' || src[i] === "'" || src[i] === '`') {
      const quote = src[i];
      let j = i + 1;
      while (j < src.length && !(src[j] === quote && src[j-1] !== '\\')) j++;
      j++;
      result += `<span class="hl-string">${escapeHtml(src.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (/[0-9]/.test(src[i]) && (i === 0 || /\W/.test(src[i-1]))) {
      let j = i;
      while (j < src.length && /[0-9a-fA-FxX._]/.test(src[j])) j++;
      result += `<span class="hl-number">${escapeHtml(src.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (/[a-zA-Z_]/.test(src[i])) {
      let j = i;
      while (j < src.length && /[a-zA-Z0-9_]/.test(src[j])) j++;
      const word = src.slice(i, j);
      const after = src.slice(j).trimStart();
      if (KEYWORDS.has(word)) {
        result += `<span class="hl-keyword">${escapeHtml(word)}</span>`;
      } else if (C_FUNCTIONS.has(word) || after.startsWith('(')) {
        result += `<span class="hl-function">${escapeHtml(word)}</span>`;
      } else {
        result += escapeHtml(word);
      }
      i = j;
      continue;
    }
    if (/[+\-*/%=<>!&|^~?:,;]/.test(src[i])) {
      result += `<span class="hl-operator">${escapeHtml(src[i])}</span>`;
      i++;
      continue;
    }
    result += escapeHtml(src[i]);
    i++;
  }
  return result;
}

function highlightCode(code) {
  return code.split('\n').map(line => tokenizeLine(line)).join('\n');
}

/* ════════════════════════════════════════════════════════════════
   § EDITOR — Core
════════════════════════════════════════════════════════════════ */
const Editor = {
  get value() { return DOM['code-textarea'].value; },
  set value(v) { DOM['code-textarea'].value = v; },

  init(initialCode) {
    this.value = initialCode;
    this.update();
    this.syncScroll();
  },

  update() {
    const code = this.value;
    DOM['highlight-layer'].innerHTML = highlightCode(code);
    this.updateLineNumbers(code);
    this.updateCursorPos();
  },

  updateLineNumbers(code) {
    const lines = code.split('\n');
    const nums = lines.map((_, i) => {
      const n = i + 1;
      const active = n === STATE.currentLine ? ' active' : '';
      return `<span class="line-num${active}" data-line="${n}">${n}</span>`;
    });
    DOM['line-numbers'].innerHTML = nums.join('');
  },

  updateCursorPos() {
    const textarea = DOM['code-textarea'];
    const text = textarea.value.substring(0, textarea.selectionStart);
    const lines = text.split('\n');
    STATE.currentLine = lines.length;
    STATE.currentCol  = lines[lines.length - 1].length + 1;
    DOM['cursor-pos'].textContent = `Ln ${STATE.currentLine}, Col ${STATE.currentCol}`;
  },

  syncScroll() {
    const ta = DOM['code-textarea'];
    const hl = DOM['highlight-layer'];
    const ln = DOM['line-numbers'];

    ta.addEventListener('scroll', () => {
      hl.style.transform  = `translateY(-${ta.scrollTop}px) translateX(-${ta.scrollLeft}px)`;
      ln.scrollTop        = ta.scrollTop;
    });
  },

  handleTab(e) {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const ta = this._ta();
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const spaces = '    ';
    ta.value = ta.value.substring(0, start) + spaces + ta.value.substring(end);
    ta.selectionStart = ta.selectionEnd = start + 4;
    this.update();
  },

  handleEnter(e) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const ta = this._ta();
    const start  = ta.selectionStart;
    const before = ta.value.substring(0, start);
    const after  = ta.value.substring(ta.selectionEnd);
    const lastLine  = before.split('\n').pop();
    const match = lastLine.match(/^(\s*)/);
    const indent    = match ? match[1] : '';
    const extraIndent = /[{>(\[]\s*$/.test(lastLine) ? '    ' : '';
    const insertion = '\n' + indent + extraIndent;
    ta.value = before + insertion + after;
    ta.selectionStart = ta.selectionEnd = start + insertion.length;
    this.update();
  },

  _ta() { return DOM['code-textarea']; },
};

/* ════════════════════════════════════════════════════════════════
   § BEAUTIFY
════════════════════════════════════════════════════════════════ */
function beautifyCode(code) {
  // basic universal beautifier for C-like languages
  const cLike = new Set(['c', 'cpp', 'java', 'cs', 'javascript', 'typescript', 'php', 'rust', 'go']);
  if (!cLike.has(STATE.lang)) {
    throw new Error("Beautify is not currently available for this language.");
  }
  
  const lines = code.split('\n');
  let indent = 0;
  const result = [];
  const TAB = '    ';

  for (let raw of lines) {
    let line = raw.trim();
    if (!line) { result.push(''); continue; }

    if (line.startsWith('}')) indent = Math.max(0, indent - 1);
    let indented = TAB.repeat(indent) + line;
    indented = indented.replace(/\b(if|for|while|switch|catch)\s*\(/g, '$1 (');
    if (!line.startsWith('#') && !line.startsWith('//')) {
      indented = indented.replace(/([^!<>=\-+*\/&|^])([+\-*\/%=<>!&|^]{1,2})([^=>])/g, '$1 $2 $3');
    }
    indented = indented.replace(/  +/g, (m, offset) => {
      const before = indented.substring(0, offset);
      const quotes = (before.match(/["'`]/g) || []).length;
      return quotes % 2 === 0 ? ' ' : m;
    });

    result.push(indented);
    if (line.endsWith('{')) indent++;
  }
  return result.join('\n');
}

/* ════════════════════════════════════════════════════════════════
   § TERMINAL
════════════════════════════════════════════════════════════════ */
const Terminal = {
  _body: null,

  init() {
    this._body = DOM['terminal-body'];
  },

  clear() {
    this._body.innerHTML = '';
  },

  _append(html) {
    this._body.insertAdjacentHTML('beforeend', html);
    this._body.scrollTop = this._body.scrollHeight;
  },

  line(content, cssClass = 'term-text') {
    this._append(`<span class="term-line ${cssClass}">${content}\n</span>`);
  },

  prompt(cmd) {
    const lang = LANGUAGES[STATE.lang];
    let marker = '$';
    if (lang.type === 'query') marker = 'SQL>';
    if (lang.name === 'MATLAB') marker = '>>';
    
    this._append(`<div class="term-cmd-line">
      <span class="term-prompt">${marker}</span>
      <span class="term-text"> ${escapeHtml(cmd)}</span>
    </div>`);
  },

  output(text, cssClass = 'term-output') {
    if (!text) return;
    this._append(`<span class="term-line ${cssClass}">${escapeHtml(text)}</span>`);
  },

  error(text) {
    this.output(text, 'term-error');
  },

  success(text) {
    this.line(text, 'term-success');
  },

  info(text) {
    this.line(text, 'term-info');
  },

  muted(text) {
    this.line(text, 'term-muted');
  },

  showCompiling() {
    this.clear();
    const lang = LANGUAGES[STATE.lang];
    if (lang.cmdComp) {
        this.prompt(lang.cmdComp);
    } else {
        this.prompt(lang.cmdRun || 'execute');
    }
    this._append(`<span class="term-line term-info">Executing... <span class="term-cursor"></span></span>`);
  },

  showResult(result) {
    this.clear();
    const lang = LANGUAGES[STATE.lang];

    if (result.commands && Array.isArray(result.commands)) {
      for (const cmd of result.commands) {
        if (cmd) this.prompt(cmd);
      }
    } else {
      this.prompt(lang.cmdRun || 'execute');
    }

    if (result.status === 'success') {
      if (result.stdout) {
        this.output(result.stdout);
      }
      this._append(`<br/>`);
      this._append(`<span class="term-line term-exit-ok">Process exited with code ${result.exit_code ?? 0}</span>`);
      this._append(`<br/>`);
      this._append(`<span class="term-line term-exit-ok">Process exited with code ${result.exit_code ?? 0}</span>`);
      this._append(`<br/>`);
    } else if (result.status === 'compile_error') {
      if (result.stderr) this.error(result.stderr);
      this._append(`<br/>`);
      this._append(`<span class="term-line term-error">Compilation failed.</span>`);

    } else if (result.status === 'runtime_error') {
      if (result.stdout) this.output(result.stdout);
      this._append(`<br/>`);
      this._append(`<span class="term-line term-error">Runtime error:</span>`);
      if (result.stderr) this.error(result.stderr);
      this._append(`<span class="term-line term-exit-err">Process exited with code ${result.exit_code ?? 1}</span>`);
    }

    // Handle Previews for browser/framework types
    if (result.preview && (lang.type === 'browser' || lang.type === 'framework')) {
       switchTab('preview');
       DOM['preview-placeholder'].style.display = 'none';
       DOM['preview-iframe'].style.display = 'block';
       const iframeDoc = DOM['preview-iframe'].contentWindow.document;
       iframeDoc.open();
       iframeDoc.write(result.preview);
       iframeDoc.close();
    }
  },

  showError(title, detail) {
    this.clear();
    this._append(`<span class="term-line term-error">✗ ${escapeHtml(title)}</span>`);
    if (detail) {
      this._append(`<span class="term-line term-warn">${escapeHtml(detail)}</span>`);
    }
  },

  getText() {
    return this._body.innerText;
  },
};

/* ════════════════════════════════════════════════════════════════
   § DEBUG PANEL
════════════════════════════════════════════════════════════════ */
const DebugPanel = {
  _body: null,

  init() {
    this._body = DOM['debug-body'];
  },

  clear() {
    this._body.innerHTML = '';
  },

  showAnalyzing() {
    this._body.innerHTML = `
      <div class="debug-welcome">
        <span class="debug-icon" style="animation: spin 1s linear infinite">⚙</span>
        <p>Analyzing ${LANGUAGES[STATE.lang].name} code...</p>
      </div>`;
  },

  showResult(result) {
    this.clear();
    let html = '';

    if (result.summary) {
      html += `
        <div class="debug-section">
          <div class="debug-section-title">Program Summary</div>
          <div class="debug-item info">
            <span class="debug-item-icon">📝</span>
            <span class="debug-item-text">${escapeHtml(result.summary)}</span>
          </div>
        </div>`;
    }

    const issues = Array.isArray(result.issues) ? result.issues : [];
    const errors   = issues.filter(i => i.severity === 'error');
    const warnings = issues.filter(i => i.severity === 'warning');
    const infos    = issues.filter(i => i.severity === 'info');

    const renderIssues = (list, label, cssClass, icon) => {
      if (!list.length) return '';
      return `
        <div class="debug-section">
          <div class="debug-section-title">${label} (${list.length})</div>
          ${list.map(iss => `
            <div class="debug-item ${cssClass}">
              <span class="debug-item-icon">${icon}</span>
              <span class="debug-item-text">
                ${iss.line ? `<strong>Line ${iss.line}:</strong> ` : ''}${escapeHtml(iss.message)}
                ${iss.category ? `<br/><small style="opacity:0.6">[${iss.category}]</small>` : ''}
              </span>
            </div>`).join('')}
        </div>`;
    };

    html += renderIssues(errors,   'Errors',   'error',   '✗');
    html += renderIssues(warnings, 'Warnings', 'warning', '⚠');
    html += renderIssues(infos,    'Info',     'info',    'ℹ');

    if (!issues.length) {
      html += `
        <div class="debug-section">
          <div class="debug-item ok">
            <span class="debug-item-icon">✓</span>
            <span class="debug-item-text">No obvious issues found. Code looks clean!</span>
          </div>
        </div>`;
    }

    const verdictMap = {
      ok:           { color: '#22c55e', label: 'No Issues' },
      has_warnings: { color: '#f59e0b', label: 'Has Warnings' },
      has_errors:   { color: '#ef4444', label: 'Has Errors' },
    };
    const v = verdictMap[result.verdict] || verdictMap.ok;
    html += `<div style="padding-top:8px;font-size:11px;color:var(--text-muted)">
      Verdict: <span style="color:${v.color};font-weight:600">${v.label}</span>
    </div>`;

    this._body.innerHTML = html;
  },

  showError(msg) {
    this._body.innerHTML = `
      <div class="debug-item error">
        <span class="debug-item-icon">✗</span>
        <span class="debug-item-text">${escapeHtml(msg)}</span>
      </div>`;
  },
};

/* ════════════════════════════════════════════════════════════════
   § GROQ API
════════════════════════════════════════════════════════════════ */
async function callGroq(messages, abortSignal) {
  if (!STATE.apiKey) throw new Error('NO_API_KEY');

  const resp = await fetch(CONFIG.GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STATE.apiKey}`,
      'Content-Type':  'application/json',
    },
    signal: abortSignal,
    body: JSON.stringify({
      model:       STATE.model,
      messages,
      temperature: 0.1,
      max_tokens:  1500,
    }),
  });

  if (!resp.ok) {
    const body = await resp.json().catch(() => ({}));
    const code = resp.status;
    if (code === 401) throw new Error('AUTH_FAILED');
    if (code === 429) throw new Error('RATE_LIMIT');
    throw new Error(`API_ERROR:${code}:${body?.error?.message || 'Unknown error'}`);
  }

  const data = await resp.json();
  const raw  = data?.choices?.[0]?.message?.content ?? '';
  return raw.trim();
}

function parseGroqJSON(raw) {
  let text = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('MALFORMED_JSON');
  }
}

function getErrorMessage(err) {
  const msg = err.message || '';
  if (msg === 'NO_API_KEY')   return ['No API Key', 'Add your Groq API key in Settings before running code.'];
  if (msg === 'AUTH_FAILED')  return ['Authentication Failed', 'Groq authentication failed. Check your API key.'];
  if (msg === 'RATE_LIMIT')   return ['Rate Limit Reached', 'Groq rate limit reached. Try again later.'];
  if (msg === 'MALFORMED_JSON') return ['Invalid AI Response', 'The AI returned an invalid result.'];
  if (err.name === 'AbortError') return ['Stopped', 'Process terminated by user.'];
  if (msg.startsWith('API_ERROR:')) {
    const parts = msg.split(':');
    return [`Groq API Error (${parts[1]})`, parts.slice(2).join(':') || 'Unexpected API error.'];
  }
  return ['Error', msg];
}

/* ════════════════════════════════════════════════════════════════
   § COMPILER — Run Flow
════════════════════════════════════════════════════════════════ */
async function runCode() {
  if (STATE.isRunning) return;

  const code  = Editor.value.trim();
  const stdin = DOM['stdin-area'].value;

  if (!code) {
    showToast('Editor is empty. Write some code first.', 'warn');
    return;
  }

  STATE.isRunning = true;
  STATE.abortCtrl = new AbortController();

  setRunningState(true);
  switchTab('terminal');
  Terminal.showCompiling();

  try {
    const userContent = `Language:\n${LANGUAGES[STATE.lang].name}\n\nCode:\n${code}\n\nStandard Input:\n${stdin || '(none)'}`;
    const messages = [
      { role: 'system',  content: CONFIG.getSystemPrompt(STATE.lang) },
      { role: 'user',    content: userContent },
    ];

    const raw    = await callGroq(messages, STATE.abortCtrl.signal);
    const parsed = parseGroqJSON(raw);
    Terminal.showResult(parsed);
    
  } catch (err) {
    if (err.name === 'AbortError') {
      Terminal.clear();
      Terminal.error('Process terminated.');
      Terminal.muted('Stopped by user.');
    } else {
      const [title, detail] = getErrorMessage(err);
      Terminal.showError(title, detail);
    }
  } finally {
    STATE.isRunning  = false;
    STATE.abortCtrl  = null;
    setRunningState(false);
  }
}

/* ════════════════════════════════════════════════════════════════
   § DEBUGGER — Debug Flow
════════════════════════════════════════════════════════════════ */
async function debugCode() {
  if (STATE.isDebugging) return;

  const code = Editor.value.trim();
  if (!code) {
    showToast('Editor is empty. Write some code first.', 'warn');
    return;
  }

  STATE.isDebugging = true;
  STATE.abortCtrl   = new AbortController();

  DOM['btn-debug'].disabled = true;
  DOM['btn-stop'].disabled  = false;
  switchTab('debug');
  DebugPanel.showAnalyzing();

  try {
    const messages = [
      { role: 'system', content: CONFIG.getDebugPrompt(STATE.lang) },
      { role: 'user',   content: `Analyze this ${LANGUAGES[STATE.lang].name} code:\n\n${code}` },
    ];

    const raw    = await callGroq(messages, STATE.abortCtrl.signal);
    const parsed = parseGroqJSON(raw);
    DebugPanel.showResult(parsed);
  } catch (err) {
    if (err.name === 'AbortError') {
      DebugPanel.showError('Debug cancelled by user.');
    } else {
      const [title, detail] = getErrorMessage(err);
      DebugPanel.showError(`${title}: ${detail}`);
    }
  } finally {
    STATE.isDebugging = false;
    STATE.abortCtrl   = null;
    DOM['btn-debug'].disabled = false;
    DOM['btn-stop'].disabled  = true;
  }
}

/* ════════════════════════════════════════════════════════════════
   § UI HELPERS
════════════════════════════════════════════════════════════════ */
function setRunningState(running) {
  const btnRun  = DOM['btn-run'];
  const spinner = DOM['run-spinner'];
  btnRun.disabled = running;
  DOM['btn-stop'].disabled = !running;

  if (running) {
    spinner.classList.remove('hidden');
    btnRun.classList.add('running');
  } else {
    spinner.classList.add('hidden');
    btnRun.classList.remove('running');
  }
}

function switchTab(tabId) {
  const tabs     = ['input', 'terminal', 'preview', 'debug'];
  const tabEls   = { input: DOM['tab-input'], terminal: DOM['tab-terminal'], preview: DOM['tab-preview'], debug: DOM['tab-debug'] };
  const panelEls = { input: DOM['panel-input'], terminal: DOM['panel-terminal'], preview: DOM['panel-preview'], debug: DOM['panel-debug'] };

  tabs.forEach(t => {
    if(tabEls[t]) tabEls[t].classList.toggle('active', t === tabId);
    if(panelEls[t]) panelEls[t].classList.toggle('active', t === tabId);
  });

  STATE.activeTab = tabId;
  DOM['terminal-actions'].style.display = tabId === 'terminal' ? 'flex' : 'none';
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ════════════════════════════════════════════════════════════════
   § SETTINGS MODAL
════════════════════════════════════════════════════════════════ */
const Settings = {
  open() {
    DOM['settings-apikey'].value = STATE.apiKey ? '•'.repeat(20) : '';
    DOM['settings-apikey'].type  = 'password';
    DOM['settings-model'].value  = STATE.model;
    DOM['theme-dark'].checked    = STATE.theme === 'dark';
    DOM['theme-light'].checked   = STATE.theme === 'light';
    DOM['apikey-status'].textContent = STATE.apiKey ? '✓ API key is saved' : 'No API key saved.';
    DOM['apikey-status'].className = STATE.apiKey ? 'form-hint saved' : 'form-hint';

    DOM['settings-apikey'].addEventListener('focus', () => {
      if (DOM['settings-apikey'].value.startsWith('•')) DOM['settings-apikey'].value = '';
    }, { once: true });
    DOM['modal-settings'].classList.remove('hidden');
  },
  close() { DOM['modal-settings'].classList.add('hidden'); },
  save() {
    const modelVal = DOM['settings-model'].value;
    const themeVal = DOM['theme-dark'].checked ? 'dark' : 'light';
    STATE.model = modelVal;
    Storage.set(CONFIG.STORAGE_KEYS.MODEL, modelVal);
    applyTheme(themeVal);
    Settings.close();
    showToast('Settings saved.', 'success');
  },
  saveApiKey() {
    const key = DOM['settings-apikey'].value.trim();
    if (!key || key.startsWith('•')) { showToast('Please enter a valid API key.', 'warn'); return; }
    STATE.apiKey = key;
    Storage.set(CONFIG.STORAGE_KEYS.API_KEY, key);
    DOM['apikey-status'].textContent = '✓ API key saved!';
    DOM['apikey-status'].className   = 'form-hint saved';
    DOM['settings-apikey'].value     = '•'.repeat(20);
    DOM['settings-apikey'].type      = 'password';
    showToast('API key saved securely.', 'success');
  },
  clearApiKey() {
    STATE.apiKey = '';
    Storage.remove(CONFIG.STORAGE_KEYS.API_KEY);
    DOM['settings-apikey'].value     = '';
    DOM['apikey-status'].textContent = 'API key cleared.';
    DOM['apikey-status'].className   = 'form-hint cleared';
    showToast('API key cleared.', 'info');
  },
};

function applyTheme(theme) {
  STATE.theme = theme;
  Storage.set(CONFIG.STORAGE_KEYS.THEME, theme);
  document.body.className = `theme-${theme}`;
  const isDark = theme === 'dark';
  DOM['theme-icon-dark'].style.display  = isDark ? 'block' : 'none';
  DOM['theme-icon-light'].style.display = isDark ? 'none'  : 'block';
}

/* ════════════════════════════════════════════════════════════════
   § SAVE & DOWNLOAD
════════════════════════════════════════════════════════════════ */
function saveCode() {
  Storage.saveCode(Editor.value);
  showToast('Code saved.', 'success');
}

function downloadCode() {
  const ext = LANGUAGES[STATE.lang].ext;
  const blob = new Blob([Editor.value], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `main${ext}`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`Downloaded main${ext}`, 'success');
}

function downloadOutput() {
  const text = Terminal.getText();
  if (!text.trim()) { showToast('Terminal is empty.', 'warn'); return; }
  const blob = new Blob([text], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'output.txt';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Downloaded output.txt', 'success');
}

/* ════════════════════════════════════════════════════════════════
   § RESIZE HANDLE
════════════════════════════════════════════════════════════════ */
function initResizeHandle() {
  const handle   = DOM['resize-handle'];
  const workspace = DOM['workspace'];
  let dragging = false;
  let startY   = 0;
  let startH   = 0;

  handle.addEventListener('mousedown', e => {
    dragging = true;
    startY   = e.clientY;
    startH   = DOM['editor-panel'].offsetHeight;
    handle.classList.add('dragging');
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dy     = e.clientY - startY;
    const totalH = workspace.offsetHeight;
    const newH   = Math.min(Math.max(startH + dy, 120), totalH - 80);
    const pct    = (newH / totalH) * 100;
    DOM['editor-panel'].style.flex = `0 0 ${pct}%`;
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    handle.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });
}

function initResizeHandleV() {
  const handle  = DOM['resize-handle-v'];
  const sidebar = DOM['sidebar-left'];
  if (!handle || !sidebar) return;
  const layout = document.querySelector('.app-layout');
  let dragging = false;
  let startX   = 0;
  let startW   = 0;

  handle.addEventListener('mousedown', e => {
    dragging = true;
    startX   = e.clientX;
    startW   = sidebar.offsetWidth;
    handle.classList.add('dragging');
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const totalW = layout.offsetWidth;
    const newW = Math.min(Math.max(startW + dx, 150), totalW * 0.5);
    sidebar.style.width = `${newW}px`;
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    handle.classList.remove('dragging');
    document.body.style.cursor     = '';
    document.body.style.userSelect = '';
  });
}

/* ════════════════════════════════════════════════════════════════
   § NEW FILE & LANGUAGE SELECTOR
════════════════════════════════════════════════════════════════ */
function getLanguageFromExtension(ext) {
  for (const [key, lang] of Object.entries(LANGUAGES)) {
    if (lang.ext === ext) return key;
  }
  return null;
}

function openNewDialog() {
  const input = document.getElementById('new-file-input');
  const error = document.getElementById('new-file-error');
  if (input) input.value = '';
  if (error) error.style.display = 'none';
  DOM['modal-new'].classList.remove('hidden');
  if (input) setTimeout(() => input.focus(), 100);
}

function confirmNew() {
  const input = document.getElementById('new-file-input');
  const error = document.getElementById('new-file-error');
  const filename = input ? input.value.trim() : '';
  
  if (!filename) {
    if (error) { error.textContent = 'Please enter a file name.'; error.style.display = 'block'; }
    return;
  }
  
  const extMatch = filename.match(/\.[a-zA-Z0-9]+$/);
  if (!extMatch) {
    if (error) { error.textContent = 'Please include a file extension (e.g., .js, .py).'; error.style.display = 'block'; }
    return;
  }
  
  const ext = extMatch[0].toLowerCase();
  const langKey = getLanguageFromExtension(ext);
  
  if (!langKey) {
    if (error) { error.textContent = `Extension ${ext} is not supported by Kidan Compiler.`; error.style.display = 'block'; }
    return;
  }
  
  // Switch to the new language and clear code
  STATE.lang = langKey;
  DOM['lang-select'].value = langKey;
  Storage.set(CONFIG.STORAGE_KEYS.LANG, langKey);
  
  Editor.value = LANGUAGES[langKey].starter;
  Editor.update();
  Storage.saveCode(Editor.value);
  
  if (DOM['file-tab-name']) {
    DOM['file-tab-name'].nodeValue = ` ${filename}`;
  }
  document.querySelector('.editor-status span:nth-child(3)').textContent = LANGUAGES[langKey].name;
  
  DOM['modal-new'].classList.add('hidden');
  showToast(`Created ${filename}`, 'success');
}

function handleLangChange(e) {
  const newLang = e.target.value;
  if (!LANGUAGES[newLang]) return;
  
  STATE.lang = newLang;
  Storage.set(CONFIG.STORAGE_KEYS.LANG, newLang);
  
  // Load saved code for this lang, or starter code
  const code = Storage.get(CONFIG.STORAGE_KEYS.CODE + newLang, LANGUAGES[newLang].starter);
  Editor.value = code;
  Editor.update();
  
  // Update UI extension
  if (DOM['file-tab-name']) {
      DOM['file-tab-name'].nodeValue = ` main${LANGUAGES[newLang].ext}`;
  }
  document.querySelector('.editor-status span:nth-child(3)').textContent = LANGUAGES[newLang].name;
  
  showToast(`Switched to ${LANGUAGES[newLang].name}`, 'info');
}

/* ════════════════════════════════════════════════════════════════
   § ZOOM
════════════════════════════════════════════════════════════════ */
const ZOOM_MIN = 8;
const ZOOM_MAX = 28;
const ZOOM_STEP = 1;

function applyZoom(size) {
  STATE.fontSize = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, size));
  const px = `${STATE.fontSize}px`;
  const lh = `${Math.round(STATE.fontSize * 1.6)}px`;
  
  document.documentElement.style.setProperty('--font-size', px);
  document.documentElement.style.setProperty('--line-h', lh);
  
  const lvl = document.getElementById('zoom-level');
  if (lvl) lvl.textContent = `${Math.round((STATE.fontSize / 13) * 100)}%`;
  
  Editor.update();
}

function zoomIn()  { applyZoom(STATE.fontSize + ZOOM_STEP); }
function zoomOut() { applyZoom(STATE.fontSize - ZOOM_STEP); }
function zoomReset() { applyZoom(13); }

/* ════════════════════════════════════════════════════════════════
   § ENV LOADING (Local Dev)
════════════════════════════════════════════════════════════════ */
async function loadEnvFile() {
  try {
    const res = await fetch('/.env');
    if (res.ok) {
      const text = await res.text();
      const match = text.match(/GROQ_API_KEY\s*=\s*(.+)/);
      if (match && match[1]) {
        STATE.apiKey = match[1].trim();
        console.log('[Kidan Compiler] Successfully loaded API key from /.env file');
      }
    }
  } catch (err) {}
}

/* ════════════════════════════════════════════════════════════════
   § EVENT LISTENERS
════════════════════════════════════════════════════════════════ */
function attachEventListeners() {
  DOM['btn-new'].addEventListener('click', openNewDialog);
  DOM['btn-run'].addEventListener('click', runCode);
  DOM['btn-debug'].addEventListener('click', debugCode);
  DOM['btn-stop'].addEventListener('click', () => {
    if (STATE.abortCtrl) STATE.abortCtrl.abort();
  });
  DOM['btn-save'].addEventListener('click', saveCode);
  DOM['btn-beautify'].addEventListener('click', () => {
    try {
      Editor.value = beautifyCode(Editor.value);
      Editor.update();
      showToast('Code formatted.', 'success');
    } catch (err) {
      showToast(err.message, 'warn');
    }
  });
  DOM['btn-theme'].addEventListener('click', () => {
    applyTheme(STATE.theme === 'dark' ? 'light' : 'dark');
  });
  DOM['btn-settings'].addEventListener('click', Settings.open.bind(Settings));
  
  DOM['lang-select'].addEventListener('change', handleLangChange);

  document.getElementById('btn-zoom-in').addEventListener('click', zoomIn);
  document.getElementById('btn-zoom-out').addEventListener('click', zoomOut);

  DOM['modal-new-cancel'].addEventListener('click',  () => DOM['modal-new'].classList.add('hidden'));
  DOM['modal-new-confirm'].addEventListener('click', confirmNew);
  DOM['modal-new'].addEventListener('click', e => {
    if (e.target === DOM['modal-new']) DOM['modal-new'].classList.add('hidden');
  });

  DOM['modal-settings-close'].addEventListener('click', Settings.close.bind(Settings));
  DOM['modal-settings-save'].addEventListener('click', Settings.save.bind(Settings));
  DOM['btn-save-apikey'].addEventListener('click', Settings.saveApiKey.bind(Settings));
  DOM['btn-clear-apikey'].addEventListener('click', Settings.clearApiKey.bind(Settings));
  DOM['btn-toggle-apikey'].addEventListener('click', () => {
    const input = DOM['settings-apikey'];
    input.type = input.type === 'password' ? 'text' : 'password';
  });
  DOM['modal-settings'].addEventListener('click', e => {
    if (e.target === DOM['modal-settings']) Settings.close();
  });

  DOM['tab-input'].addEventListener('click',    () => switchTab('input'));
  DOM['tab-terminal'].addEventListener('click', () => switchTab('terminal'));
  DOM['tab-preview'].addEventListener('click',  () => switchTab('preview'));
  DOM['tab-debug'].addEventListener('click',   () => switchTab('debug'));

  DOM['btn-clear-terminal'].addEventListener('click', () => Terminal.clear());
  DOM['btn-copy-terminal'].addEventListener('click', () => {
    const text = Terminal.getText();
    if (!text.trim()) { showToast('Nothing to copy.', 'warn'); return; }
    navigator.clipboard.writeText(text).then(() => showToast('Copied.', 'success'));
  });
  DOM['btn-download-output'].addEventListener('click', downloadOutput);

  const ta = DOM['code-textarea'];
  ta.addEventListener('input', () => {
    Editor.update();
    Storage.saveCode(Editor.value);
  });
  ta.addEventListener('keydown', e => {
    Editor.handleTab(e);
    if (e.key === 'Enter') Editor.handleEnter(e);
    const ctrl = e.ctrlKey || e.metaKey;
    if (ctrl && e.key === 'Enter') { e.preventDefault(); runCode(); }
    if (ctrl && e.key === 's')     { e.preventDefault(); saveCode(); }
    if (ctrl && e.key === 'n')     { e.preventDefault(); openNewDialog(); }
  });
  ta.addEventListener('click',  () => Editor.updateCursorPos());
  ta.addEventListener('keyup',  () => Editor.updateCursorPos());
  ta.addEventListener('select', () => Editor.updateCursorPos());

  DOM['stdin-area'].addEventListener('input', () => {
    Storage.saveStdin(DOM['stdin-area'].value);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      DOM['modal-new'].classList.add('hidden');
      Settings.close();
    }
    const ctrl = e.ctrlKey || e.metaKey;
    if (ctrl && (e.key === '=' || e.key === '+')) { e.preventDefault(); zoomIn(); }
    if (ctrl && e.key === '-')                    { e.preventDefault(); zoomOut(); }
    if (ctrl && e.key === '0')                    { e.preventDefault(); zoomReset(); }
  });
}

/* ════════════════════════════════════════════════════════════════
   § INIT
════════════════════════════════════════════════════════════════ */
async function init() {
  cacheDOM();
  const { code, stdin } = Storage.loadAll();
  await loadEnvFile();
  applyTheme(STATE.theme);
  
  DOM['lang-select'].value = STATE.lang;
  if (DOM['file-tab-name']) DOM['file-tab-name'].nodeValue = ` main${LANGUAGES[STATE.lang].ext}`;
  document.querySelector('.editor-status span:nth-child(3)').textContent = LANGUAGES[STATE.lang].name;

  Editor.init(code);
  Terminal.init();
  DebugPanel.init();

  DOM['stdin-area'].value = '';
  Storage.remove(CONFIG.STORAGE_KEYS.STDIN);
  DOM['settings-model'].value = STATE.model;

  attachEventListeners();
  initResizeHandle();
  initResizeHandleV();
  applyZoom(STATE.fontSize);
  switchTab('terminal');
  DOM['code-textarea'].focus();

  Terminal.info('Kidan Compiler — Multi-Language IDE');
  Terminal.muted(`Currently selected language: ${LANGUAGES[STATE.lang].name}`);
  console.log('[Kidan Compiler] Initialized.');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
