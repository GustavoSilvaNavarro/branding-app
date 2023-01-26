interface IProps {
  snippet: string;
  prompt: string;
  keywords: Array<string>;
  handleBack: () => void
}

export const Result = ({ snippet, keywords, handleBack, prompt }: IProps): JSX.Element => {

  const displaySections = (title: string, result: JSX.Element) => {
    return (
      <div className="bg-slate-700 py-2 px-4 rounded-md mb-4">
        <h3 className="text-slate-400 font-bold text-sm mb-2">{title}</h3>
        {result}
      </div>
    )
  };


  return (
    <div>
      <div className="mb-4">
        {displaySections('Prompt', <p className="text-lg font-bold">{prompt}</p>)}
        {displaySections('Branding Snippet', <p>&quot;{snippet}&quot;</p>)}
        {displaySections('Keywords', <div className="flex flex-wrap my-4">
            {keywords.map(el => (
              <p key={el} className="mr-2 bg-[#65f003] px-2 py-1 mb-3 text-sm rounded-md">#{el}</p>
            ))}
          </div>)
        }
      </div>
      <button className='bg-[#65f003] w-full rounded-md py-2 text-lg cursor-pointer' type="button" onClick={handleBack}>Back</button>
    </div>
  )
}
