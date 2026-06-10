type CodeBlockProps = {
  code: string;
  highlightedLine?: number;
};

export function CodeBlock({ code, highlightedLine }: CodeBlockProps) {
  return (
    <pre className="codeBlock">
      {code.split('\n').map((line, index) => {
        const lineNumber = index + 1;
        return (
          <code className={lineNumber === highlightedLine ? 'codeLine active' : 'codeLine'} key={`${lineNumber}-${line}`}>
            <span className="lineNumber">{lineNumber}</span>
            <span>{line || ' '}</span>
          </code>
        );
      })}
    </pre>
  );
}
