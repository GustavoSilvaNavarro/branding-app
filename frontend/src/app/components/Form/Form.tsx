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
    if (e.currentTarget.value.length > 32) return;
    setPrompt(e.currentTarget.value);
  };

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <p className='mb-6 text-slate-400'>Tell me what your brand is about and I will generate copy and keywords for your.</p>
        <input className='text-black w-full p-2 rounded-md focus:outline-teal-500' type="text" placeholder='Product...' value={prompt} onChange={inputPromptHandler} />
        <div className={`flex justify-between my-2 mb-6 ${isPromptValid ? 'text-slate-400' : 'text-red-600'}`}>
          <p className={`${isPromptValid ? 'opacity-0' : 'opacity-100'}`}>Input must be less than 32 characters</p>
          <p>{prompt.length}/{characterLimit.current}</p>
        </div>
        <button className='bg-[#65f003] w-full rounded-md py-2 text-lg cursor-pointer' disabled={!(isPromptValid) || isLoading} type='submit'>Submit</button>
      </form>
    </div>
  )
}
