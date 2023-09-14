import { api } from "@/lib/axios";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Prompt {
  id: string;
  title: string;
  template: string;
}

interface PromptSelecteProps {
  onPromptSelected: (template: string) => void
}

export function PromptSelect(props: PromptSelecteProps) {

  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  useEffect(() => {

    api.get('/prompts').then(response => {
      setPrompts(response.data)
    })
  }, [])

  function handlePromptSelected(promptId: string){
    const selectedPrompt = prompts?.find(prompt => prompt.id == promptId)

  if(!selectedPrompt){
    return
  }
  props.onPromptSelected(selectedPrompt.template)
  }


  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um Prompt..."/>
      </SelectTrigger>
      <SelectContent>
        {prompts?.map(prompt => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}