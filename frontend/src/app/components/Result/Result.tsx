interface IProps {
  snippet: string;
  prompt: string;
  keywords: Array<string>;
  handleBack: () => void
}

export const Result = ({ snippet, keywords, handleBack, prompt }: IProps): JSX.Element => {
  return (
    <div>
      <div>
        <div>
          <h3>Your Prompt</h3>
          <p>{prompt}</p>
        </div>
        <div>
          <h3>Branding Snippet</h3>
          <p>{snippet}</p>
        </div>
        <div>
          <h3>Keywords</h3>
          {keywords.map(el => (
            <span key={el}>#{el}</span>
          ))}
        </div>
      </div>
      <button type="button" onClick={handleBack}>Back</button>
    </div>
  )
}
