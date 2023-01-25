import { useRef, useState } from "react";

interface IProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit:  (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean
}

export const Form = ({ prompt, setPrompt, handleSubmit, isLoading }: IProps): JSX.Element => {
  const characterLimit = useRef(32);
  const [isPromptValid, setIsPromptValid] = useState(prompt.length <= 32)

  const inputPromptHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPromptValid(e.currentTarget.value.length <= 32);
    console.log(isPromptValid);
    if (e.currentTarget.value.length > 32) return;
    setPrompt(e.currentTarget.value);
  };

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <p>Tell me what your brand is about and I will generate copy and keywords for your.</p>
        <input type="text" placeholder='Product...' value={prompt} onChange={inputPromptHandler} />
        <div>
          <p>{prompt.length}/{characterLimit.current}</p>
        </div>
        <button disabled={!(isPromptValid) || isLoading} type='submit'>Submit</button>
      </form>
    </div>
  )
}
