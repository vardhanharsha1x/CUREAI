import React from 'react';

const AiResponseFormatter = ({ text }: { text: string }) => {
  if (!text) return null;

  const lines = text.toLowerCase().split('\n').filter(line => line.trim() !== '');

  const parseLineForFormatting = (line: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = line.split(boldRegex);

    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-semibold text-foreground">{part}</strong>;
      }
      return part;
    });
  };
  
  const renderLine = (line: string, index: number) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('###')) {
      return (
        <h3 key={index} className="text-lg font-bold mt-4 mb-2 lowercase text-foreground">
          {parseLineForFormatting(trimmedLine.replace('###', '').trim())}
        </h3>
      );
    }
    
    if (trimmedLine.startsWith('##')) {
      return (
        <h2 key={index} className="text-xl font-bold mt-4 mb-2 lowercase text-foreground">
          {parseLineForFormatting(trimmedLine.replace('##', '').trim())}
        </h2>
      );
    }
    
    if (trimmedLine.startsWith('#')) {
      return (
        <h1 key={index} className="text-2xl font-bold mt-4 mb-2 lowercase text-foreground">
          {parseLineForFormatting(trimmedLine.replace('#', '').trim())}
        </h1>
      );
    }

    if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
      return (
        <li key={index} className="text-base">
          {parseLineForFormatting(trimmedLine.substring(2))}
        </li>
      );
    }
    
    return <p key={index} className="text-base my-1">{parseLineForFormatting(trimmedLine)}</p>;
  };

  const formattedElements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    const isListItem = trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ');

    if (isListItem) {
      currentList.push(renderLine(line, index));
    } else {
      if (currentList.length > 0) {
        formattedElements.push(
          <ul key={`ul-${index}`} className="list-disc pl-5 space-y-1 my-2">
            {currentList}
          </ul>
        );
        currentList = [];
      }
      formattedElements.push(renderLine(line, index));
    }
  });

  if (currentList.length > 0) {
    formattedElements.push(
      <ul key="ul-last" className="list-disc pl-5 space-y-1 my-2">
        {currentList}
      </ul>
    );
  }

  return <div className="prose prose-base max-w-none text-muted-foreground lowercase">{formattedElements}</div>;
};

export default AiResponseFormatter;
