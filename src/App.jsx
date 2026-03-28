import { useEffect, useRef, useState } from 'react'
import './App.css'

// Static education content from content.md
const EDUCATION_CONTENT = `Indian Institute of Technology, Roorkee\nBachelor of Technology - BTech, Production and Industrial Technology · (July 2024 - August 2028)\nAllen , Kota\nJEE preparing | 11th and 12th Schooling \nAmity International School, Sec 46 Gurugram · (2022 - 2024)\nClass 10th schooling  · (2018 - 2021)`;

// File mapping for ls and cat
const FILE_MAP = [
  { label: 'About-Sanat-Jha.txt', file: 'About.txt', type: 'about' },
  { label: 'Projects.md', file: 'projects.txt', type: 'projects' },
  { label: 'Tech-Stack.list', file: 'tech.txt', type: 'tech' },
  { label: 'Education.bat', file: null, type: 'education' },
  { label: 'Experience.exp', file: 'Experince.txt', type: 'experience' },
  { label: 'Resume.pdf', file: 'Sanat_Jha_Resume.pdf', type: 'resume' },
  { label: 'Contact.ct', file: null, type: 'contact' },
];

// Load startpic.txt as a static asset (for Vite, use /content/startpic.txt)
async function fetchStartPic() {
  const res = await fetch('/content/startpic.txt');
  if (!res.ok) return '';
  return res.text();
}

// Helper to fetch file content (async)
async function fetchTextFile(path) {
  const res = await fetch(path);
  if (!res.ok) return '[Error loading file]';
  return res.text();
}



// Helper to parse projects/experience for view links
function parseViewLinks(text) {
  // Find lines with (http...) and extract title and link
  const lines = text.split(/\r?\n/);
  const views = [];
  lines.forEach(line => {
    const match = line.match(/^(.*?)\s*\((https?:\/\/[^)]+)\)/);
    if (match) {
      // Use the full line before the link as the title (including role, etc)
      views.push({ title: match[1].trim(), url: match[2] });
    }
  });
  return views;
}

function App() {
  const [history, setHistory] = useState([
    { type: 'system', value: 'Type "Start" to get started.' },
  ]);
  const [input, setInput] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [fileCache, setFileCache] = useState({});
  const [pendingView, setPendingView] = useState(null); // { type, views }
  const [lastCommand, setLastCommand] = useState('');
  const [showSplash, setShowSplash] = useState(false);
  const [splashText, setSplashText] = useState('');
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Preload all text files on mount
  useEffect(() => {
    async function loadFiles() {
      const cache = {};
      for (const entry of FILE_MAP) {
        if (entry.file && entry.type !== 'resume') {
          cache[entry.label.toLowerCase()] = await fetchTextFile(`/content/${entry.file}`);
        }
      }
      setFileCache(cache);
    }
    loadFiles();
  }, []);


  const executeCommand = async (rawCommand) => {
    const command = rawCommand.trim();
    const normalized = command.toLowerCase();

    if (!command) return;

    // Handle view <title> for projects/experience
    if (pendingView && normalized.startsWith('view ')) {
      const titleInput = command.slice(5).trim().toLowerCase();
      // Try to match the full title (ignoring case and whitespace)
      const found = pendingView.views.find(v => {
        // Remove extra spaces and compare
        const cleanTitle = v.title.replace(/\s+/g, ' ').trim().toLowerCase();
        return cleanTitle.includes(titleInput);
      });
      if (found) {
        window.open(found.url, '_blank');
        setHistory(prev => [...prev, { type: 'command', value: command }, { type: 'output', value: `Opening: ${found.url}` }]);
        setPendingView(null);
      } else {
        setHistory(prev => [...prev, { type: 'command', value: command }, { type: 'output', value: 'No matching title found.' }]);
      }
      return;
    }

    if (normalized === 'exit') {
      setHistory(prev => [...prev, { type: 'command', value: command }, { type: 'output', value: 'Closing tab...' }]);
      setTimeout(() => {
        window.close();
      }, 500);
      setIsClosed(true);
      return;
    }

    if (normalized === 'start') {
      setHistory(prev => [
        ...prev,
        { type: 'command', value: command },
      ]);
      (async () => {
        const splash = await fetchStartPic();
        const lines = splash.split(/\r?\n/);
        setShowSplash(true);
        // Animate line by line
        for (let i = 1; i <= lines.length; i++) {
          setSplashText(lines.slice(0, i).join('\n'));
          await new Promise(r => setTimeout(r, 10));
        }
        // Show full splash for 1s
        await new Promise(r => setTimeout(r, 2000));
        setShowSplash(false);
        setSplashText('');
        setHistory(prev => [
          ...prev,
          { type: 'output', value: 'Type ls to get the menu of portfolio' },
          { type: 'output', value: 'Type Port if you are not techy enough to use a terminal' },
          { type: 'output', value: 'Type exit to close this site.' },
        ]);
        setHasStarted(true);
      })();
      return;
    }

    if (!hasStarted) {
      setHistory(prev => [
        ...prev,
        { type: 'command', value: command },
        { type: 'output', value: 'Type "Start" to get started.' },
      ]);
      return;
    }


    if (normalized === 'port') {
      setHistory(prev => [
        ...prev,
        { type: 'command', value: command },
        { type: 'output', value: 'Opening portfolio website for you ....' },
      ]);
      setTimeout(() => {
        window.open('/normal-portfolio/index.html', '_blank');
      }, 500);
      return;
    }

    if (normalized === 'ls') {
      setHistory(prev => [
        ...prev,
        { type: 'command', value: command },
          { type: 'output', value: 'Type "cat <file-name>" to open any of these:' },
        ...FILE_MAP.map(f => ({ type: 'output', value: f.label })),
      ]);
      return;
    }


    if (normalized.startsWith('cat ')) {
      const arg = command.slice(4).trim();
      const entry = FILE_MAP.find(f => f.label.toLowerCase() === arg.toLowerCase());
      if (!entry) {
        setHistory(prev => [
          ...prev,
          { type: 'command', value: command },
          { type: 'output', value: 'File not found. Use ls to view available files.' },
        ]);
        return;
      }

      if (entry.type === 'contact') {
        setHistory(prev => [
          ...prev,
          { type: 'command', value: command },
          { type: 'output', value: 'Type "Copy Linkedin|Github|Email|Instagram" to copy the URLs' },
        ]);
        return;
      }
      // About, Tech, Experience, Projects, Education, Resume
      if (entry.type === 'about' || entry.type === 'tech') {
        setHistory(prev => [
          ...prev,
          { type: 'command', value: command },
          { type: 'output', value: fileCache[entry.label.toLowerCase()] || '[Loading...]' },
        ]);
        return;
      }
      if (entry.type === 'education') {
        setHistory(prev => [
          ...prev,
          { type: 'command', value: command },
          { type: 'output', value: EDUCATION_CONTENT },
        ]);
        return;
      }
      if (entry.type === 'experience' || entry.type === 'projects') {
        const text = fileCache[entry.label.toLowerCase()] || '[Loading...]';
        const views = parseViewLinks(text);
        setPendingView({ type: entry.type, views });
        setHistory(prev => [
          ...prev,
          { type: 'command', value: command },
          { type: 'output', value: `Type View 'Project Title' to have a look\n\n${text}` },
        ]);
        return;
      }
      if (entry.type === 'resume') {
        window.open('/content/Sanat_Jha_Resume.pdf', '_blank');
        setHistory(prev => [
          ...prev,
          { type: 'command', value: command },
          { type: 'output', value: 'Opening Resume.pdf in new tab...' },
        ]);
        return;
      }
    }

    // Handle Copy Linkedin|Github|Email|Instagram
    if (normalized.startsWith('copy ')) {
      const arg = command.slice(5).trim().toLowerCase();
      let url = '';
      if (arg === 'linkedin') url = 'https://linkedin.com/in/sanatjha4';
      else if (arg === 'github') url = 'http://github.com/Sanat-Jha';
      else if (arg === 'email') url = 'sanatjha4@gmail.com';
      else if (arg === 'instagram') url = 'https://www.instagram.com/sanatjha4';
      if (url) {
        try {
          await navigator.clipboard.writeText(url);
          setHistory(prev => [
            ...prev,
            { type: 'command', value: command },
            { type: 'output', value: `Copied ${arg.charAt(0).toUpperCase() + arg.slice(1)} (${url}) to clipboard!` },
          ]);
        } catch {
          setHistory(prev => [
            ...prev,
            { type: 'command', value: command },
            { type: 'output', value: 'Failed to copy to clipboard.' },
          ]);
        }
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'command', value: command },
          { type: 'output', value: 'Invalid copy target. Use Linkedin, Github, Email, or Instagram.' },
        ]);
      }
      return;
    }

    setHistory(prev => [
      ...prev,
      { type: 'command', value: command },
      { type: 'output', value: 'Invalid command. Use start, ls, cat <file-name>, or exit.' },
    ]);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim()) setLastCommand(input);
    await executeCommand(input);
    setInput('');
  };

  // Up arrow for last command
  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      if (lastCommand) setInput(lastCommand);
      e.preventDefault();
    }
  };

  return (
    <main className="terminal-shell" onClick={() => inputRef.current?.focus()}>
      {showSplash && (
        <div className="splash-overlay">
          <pre className="splash-ascii">{splashText}</pre>
        </div>
      )}
      <section className="terminal-window" aria-label="Terminal portfolio" style={{ display: showSplash ? 'none' : undefined }}>
        <header className="terminal-header">
          <div className="traffic-lights" aria-hidden="true">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <p className="terminal-title">SanatJha://portfolio</p>
        </header>

        <div className="terminal-body" ref={scrollRef}>
          {history.map((entry, index) => {
            if (entry.type === 'command') {
              return (
                <div className="line" key={index}>
                  <span className="prompt">Information@SanatJha</span>
                  <span className="symbol">:</span>
                  <span className="path">~/</span>
                  <span className="symbol">$</span>
                  <span>{entry.value}</span>
                </div>
              )
            }
            if (entry.type === 'ascii') {
              return (
                <pre className="line ascii-art" key={index} style={{ color: '#8ef58c', fontFamily: 'monospace', fontSize: '10px', lineHeight: '10px', margin: '8px 0' }}>{entry.value}</pre>
              );
            }
            return (
              <div className={`line ${entry.type}`} key={index}>
                {entry.value}
              </div>
            )
          })}

          {!isClosed ? (
            <form className="line input-row" onSubmit={handleSubmit} autoComplete="off">
              <span className="prompt">Information@SanatJha</span>
              <span className="symbol">:</span>
              <span className="path">~/</span>
              <span className="symbol">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                className="terminal-input"
                aria-label="Type terminal command"
                spellCheck={false}
              />
            </form>
          ) : (
            <div className="line output">Terminal is closed. Refresh to restart.</div>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
